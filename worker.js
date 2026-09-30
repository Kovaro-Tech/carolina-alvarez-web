import { SITE_URL } from './src/data/siteConfig.js'

const canonicalHost = new URL(SITE_URL).hostname
const securityHeaders = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-src 'none'; frame-ancestors 'none'; form-action 'none'; upgrade-insecure-requests",
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'X-Frame-Options': 'DENY',
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const productionHost = url.hostname === canonicalHost || url.hostname === `www.${canonicalHost}`
    // Let local development use HTTP. Production redirects preserve the path and query.
    const result = productionHost && url.origin !== SITE_URL
      ? Response.redirect(`${SITE_URL}${url.pathname}${url.search}`, 308)
      : await env.ASSETS.fetch(request)
    const response = new Response(result.body, result)
    for (const [name, value] of Object.entries(securityHeaders)) response.headers.set(name, value)
    if (response.status === 200 && url.pathname.startsWith('/assets/')) {
      response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
    }
    if (response.status === 404) response.headers.set('X-Robots-Tag', 'noindex')
    // Preserve the temporary host's HSTS policy on HTTPS, without affecting local HTTP.
    if (url.protocol === 'https:') response.headers.set('Strict-Transport-Security', 'max-age=31536000')
    return response
  },
}
