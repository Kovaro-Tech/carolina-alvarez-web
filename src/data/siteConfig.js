// Canonical production origin, shared by metadata, prerendering and the Worker.
export const SITE_URL = 'https://carolinaalvarez.ec'

export const siteConfig = {
  url: SITE_URL,
  name: 'Carolina Álvarez',
  legalName: 'Carolina Anabel Álvarez Espinoza',
  legalAddress: 'IQON, Av. Shyris y Suecia, Quito, Ecuador',
  phone: '0994568705',
  telephone: '+593994568705',
  // Activate and test this address before launching the final domain.
  email: 'contacto@carolinaalvarez.ec',
  location: 'Quito, Ecuador',
  modality: 'Atención presencial y virtual',
  whatsapp: '593994568705',
  whatsappMessage: 'Hola Carolina, visité tu página web y quisiera realizar una consulta.',
  linkedin: 'https://www.linkedin.com/in/carolina-%C3%A1lvarez-2231402a1/',
  linkedinVerified: true,
  socialImage: { path: '/images/og-carolina-alvarez.png', width: 1200, height: 630, type: 'image/png', alt: 'Carolina Álvarez, abogada' },
  icons: { ico: '/favicon.ico', png32: '/favicon-32x32.png', png16: '/favicon-16x16.png', apple: '/apple-touch-icon.png', icon192: '/icon-192.png', icon512: '/icon-512.png' },
  legalUpdated: '28 de septiembre de 2026',
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
