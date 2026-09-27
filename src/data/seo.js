import { SITE_URL, siteConfig } from './siteConfig.js'
import { publications, publicationPath } from './publications.js'

export const pageMeta = {
  '/': { title: 'Carolina Álvarez | Abogada en Derecho Penal, Penal Económico y Tributario', description: 'Carolina Álvarez brinda asesoría y defensa en Derecho Penal, Derecho Penal Económico y Tributario en Quito y mediante atención virtual.' },
  '/sobre-mi': { title: 'Carolina Álvarez | Trayectoria y Formación Profesional', description: 'Conoce la formación de posgrado y la trayectoria de Carolina Álvarez en el sistema de justicia y la defensa jurídica en Ecuador.' },
  '/servicios': { title: 'Servicios Jurídicos | Carolina Álvarez', description: 'Asesoría y defensa en Derecho Penal, Derecho Penal Económico y Derecho Tributario para personas y empresas. Atención en Quito y virtual.' },
  '/contacto': { title: 'Contacto | Carolina Álvarez Abogada', description: 'Contacta a Carolina Álvarez por WhatsApp o correo para coordinar una consulta jurídica en Quito, Ecuador, o mediante atención virtual.' },
  '/publicaciones': { title: 'Publicaciones Jurídicas | Carolina Álvarez', description: 'Espacio de artículos y análisis jurídicos de Carolina Álvarez sobre Derecho Penal, Penal Económico y Tributación. Próximamente.' },
  '/politica-de-privacidad': { title: 'Política de Privacidad | Carolina Álvarez', description: 'Información sobre los datos de contacto, las finalidades del tratamiento y el ejercicio de tus derechos ante Carolina Álvarez.', noindex: true },
  '/politica-de-cookies': { title: 'Política de Cookies | Carolina Álvarez', description: 'Conoce el almacenamiento técnico de navegación del sitio de Carolina Álvarez y cómo gestionarlo desde tu navegador.', noindex: true },
}

export const normalizePath = (path) => path === '/' ? '/' : path.replace(/\/+$/, '')
export const publicPaths = () => [...Object.keys(pageMeta), ...publications.map(publicationPath)]

export function getPageMeta(pathname) {
  const path = normalizePath(pathname)
  const article = publications.find((item) => publicationPath(item) === path)
  const meta = article ? { title: `${article.title} | Carolina Álvarez`, description: article.description, article } : pageMeta[path]
  if (!meta) return { title: 'Página no encontrada | Carolina Álvarez', description: 'La página solicitada no existe. Vuelve al inicio para conocer los servicios jurídicos de Carolina Álvarez.', noindex: true }
  return { ...meta, canonical: new URL(path, SITE_URL).href }
}

export function structuredData(pathname) {
  const meta = getPageMeta(pathname)
  const person = { '@type': 'Person', '@id': `${SITE_URL}/#carolina`, name: siteConfig.name, jobTitle: 'Abogada', url: SITE_URL, email: siteConfig.email, telephone: siteConfig.telephone,
    ...(siteConfig.linkedinVerified ? { sameAs: [siteConfig.linkedin] } : {}) }
  if (normalizePath(pathname) === '/') return { '@context': 'https://schema.org', '@graph': [person, {
    '@type': 'LegalService', '@id': `${SITE_URL}/#servicio-juridico`, name: siteConfig.name,
    url: `${SITE_URL}/`, email: siteConfig.email, telephone: siteConfig.telephone,
    description: pageMeta['/'].description, image: new URL(siteConfig.socialImage.path, SITE_URL).href,
    address: { '@type': 'PostalAddress', addressLocality: 'Quito', addressCountry: 'EC' },
    ...(siteConfig.linkedinVerified ? { sameAs: [siteConfig.linkedin] } : {}),
  }] }
  if (meta.article) return { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: meta.article.title,
    description: meta.description, mainEntityOfPage: meta.canonical, url: meta.canonical,
    author: person, datePublished: meta.article.datePublished,
    ...(meta.article.dateModified ? { dateModified: meta.article.dateModified } : {}),
    image: new URL(meta.article.image || siteConfig.socialImage.path, SITE_URL).href, inLanguage: 'es-EC' }
  return null
}

export function headEntries(pathname) {
  const meta = getPageMeta(pathname)
  const socialImage = new URL(meta.article?.image || siteConfig.socialImage.path, SITE_URL).href
  const entries = [
    ['name', 'description', meta.description], ['name', 'robots', meta.noindex ? 'noindex, follow' : 'index, follow'],
    ['property', 'og:title', meta.title], ['property', 'og:description', meta.description],
    ['property', 'og:type', meta.article ? 'article' : 'website'], ['property', 'og:site_name', siteConfig.name],
    ['property', 'og:locale', 'es_EC'], ['property', 'og:image', socialImage],
    ['property', 'og:image:alt', siteConfig.socialImage.alt],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', meta.title],
    ['name', 'twitter:description', meta.description], ['name', 'twitter:image', socialImage],
    ['name', 'twitter:image:alt', siteConfig.socialImage.alt],
  ]
  if (meta.canonical) entries.push(['property', 'og:url', meta.canonical])
  if (!meta.article?.image) entries.push(['property', 'og:image:width', String(siteConfig.socialImage.width)], ['property', 'og:image:height', String(siteConfig.socialImage.height)], ['property', 'og:image:type', siteConfig.socialImage.type])
  return entries
}

const escapeHtml = (text) => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
export const serializeJsonLd = (data) => JSON.stringify(data).replaceAll('<', '\\u003c')

export function renderHead(pathname) {
  const meta = getPageMeta(pathname)
  const data = structuredData(pathname)
  const icons = siteConfig.icons
  return [
    `<title>${escapeHtml(meta.title)}</title>`,
    ...headEntries(pathname).map(([kind, key, content]) => `<meta data-page-meta ${kind}="${key}" content="${escapeHtml(content)}" />`),
    meta.canonical ? `<link data-page-meta rel="canonical" href="${escapeHtml(meta.canonical)}" />` : '',
    data ? `<script data-page-meta type="application/ld+json">${serializeJsonLd(data)}</script>` : '',
    `<link rel="icon" type="image/svg+xml" href="${icons.svg}" />`,
    icons.ico ? `<link rel="icon" sizes="any" href="${icons.ico}" />` : '',
    icons.png32 ? `<link rel="icon" type="image/png" sizes="32x32" href="${icons.png32}" />` : '',
    icons.png16 ? `<link rel="icon" type="image/png" sizes="16x16" href="${icons.png16}" />` : '',
    icons.apple ? `<link rel="apple-touch-icon" sizes="180x180" href="${icons.apple}" />` : '',
    '<link rel="manifest" href="/site.webmanifest" />',
  ].filter(Boolean).join('\n    ')
}
