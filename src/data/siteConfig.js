export const siteConfig = {
  name: 'Carolina Álvarez',
  phone: '+593 XXX XXX XXX',
  email: 'correo@pendiente.ec',
  location: 'Quito, Ecuador',
  whatsapp: '593000000000',
  whatsappMessage: 'Hola Carolina, visité tu página web y quisiera realizar una consulta.',
}

export const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
