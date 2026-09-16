export const siteConfig = {
  name: 'Carolina Álvarez',
  phone: '0994568705',
  email: 'carolinaanaalvarez15@gmail.com',
  location: 'Quito, Ecuador',
  modality: 'Atención presencial y virtual',
  whatsapp: '593994568705',
  whatsappMessage: 'Hola Carolina, visité tu página web y quisiera realizar una consulta.',
  linkedin: 'https://www.linkedin.com/in/carolina-á\u00e1lvarez-2231402a1',
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
