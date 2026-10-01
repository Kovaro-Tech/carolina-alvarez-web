import { readFile, writeFile, mkdir, access } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { publicPaths, getPageMeta, renderHead, structuredData } from '../src/data/seo.js'
import { publications } from '../src/data/publications.js'
import { SITE_URL, siteConfig } from '../src/data/siteConfig.js'
import { renderHomeHeroPreload } from '../src/data/homeHero.js'

// Render at build time, with no browser and no production server process.
const output = resolve('dist')
const template = await readFile(resolve(output, 'index.html'), 'utf8')
assert(template.includes('<!--page-head-->'), 'Missing metadata placeholder')
const siteOrigin = new URL(SITE_URL)
assert(siteOrigin.protocol === 'https:' && siteOrigin.origin === SITE_URL, 'SITE_URL must be an HTTPS origin without a trailing slash, path or credentials')
for (const article of publications) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug), 'Use a URL-safe article slug')
  assert(article.title && article.description && article.paragraphs?.length, 'Articles need approved content')
  if (article.datePublished) assert(/^\d{4}-\d{2}-\d{2}$/.test(article.datePublished) && Number.isFinite(Date.parse(article.datePublished)), 'Use the actual publication date')
}
assert.equal(new Set(publications.map((article) => article.slug)).size, publications.length, 'Duplicate article slug')
await access(resolve(output, siteConfig.socialImage.path.slice(1)))
for (const icon of Object.values(siteConfig.icons).filter(Boolean)) await access(resolve(output, icon.slice(1)))

const vite = await createServer({ server: { middlewareMode: true, hmr: false }, appType: 'custom', logLevel: 'error' })
try {
  const { render } = await vite.ssrLoadModule('/src/entry-server.jsx')
  for (const path of [...publicPaths(), '/404']) {
    const head = renderHead(path)
    const body = render(path)
    assert.equal((body.match(/<h1(?:\s|>)/g) || []).length, 1, `Expected one H1: ${path}`)
    assert.equal((head.match(/<title>/g) || []).length, 1)
    const data = structuredData(path)
    if (data) JSON.parse(head.match(/<script[^>]*>(.*?)<\/script>/s)[1])
    const html = template.replace('<!--page-head-->', () => head)
      .replace('<!--page-resources-->', () => renderHomeHeroPreload(path))
      .replace('<div id="root"></div>', () => `<div id="root">${body}</div>`)
    // Cloudflare Static Assets serves /sobre-mi.html at /sobre-mi with HTTP 200.
    const file = resolve(output, path === '/' ? 'index.html' : `${path.slice(1)}.html`)
    await mkdir(dirname(file), { recursive: true })
    await writeFile(file, html)
  }
} finally {
  await vite.close()
}

const indexable = publicPaths().filter((path) => !getPageMeta(path).noindex)
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((path) => `  <url><loc>${getPageMeta(path).canonical}</loc></url>`).join('\n')}\n</urlset>\n`
await writeFile(resolve(output, 'sitemap.xml'), sitemap)
await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`)
await writeFile(resolve(output, 'site.webmanifest'), JSON.stringify({
  id: '/', name: `${siteConfig.name} | Abogada`, short_name: siteConfig.name,
  lang: 'es', start_url: '/', scope: '/', display: 'browser',
  background_color: '#ffffff', theme_color: '#071b33',
  icons: [
    { src: siteConfig.icons.icon192, sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: siteConfig.icons.icon512, sizes: '512x512', type: 'image/png', purpose: 'any' },
  ],
}, null, 2))
console.log(`Rendered ${publicPaths().length} public pages and 404; sitemap contains ${indexable.length} URLs.`)
