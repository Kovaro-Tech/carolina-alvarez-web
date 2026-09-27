export const SITE_URL = 'https://carolinaalvarez.kovarotech.com'

export const siteConfig = {
  url: SITE_URL,
  name: 'Carolina Álvarez',
  phone: '0994568705',
  telephone: '+593994568705',
  email: 'carolinaanaalvarez15@gmail.com',
  location: 'Quito, Ecuador',
  modality: 'Atención presencial y virtual',
  whatsapp: '593994568705',
  whatsappMessage: 'Hola Carolina, visité tu página web y quisiera realizar una consulta.',
  linkedin: 'https://www.linkedin.com/in/carolina-á\u00e1lvarez-2231402a1',
  // Confirm the existing profile URL before publishing it as a verified identity.
  linkedinVerified: false,
  socialImage: { path: '/images/carolina_3.jpeg', width: 1074, height: 1074, type: 'image/jpeg', alt: 'Carolina Álvarez, abogada' },
  // Keep the existing icon until Carolina supplies the final logo files.
  icons: { svg: '/favicon.svg', ico: null, png32: null, png16: null, apple: null },
  legalUpdated: '27 de septiembre de 2026',
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
