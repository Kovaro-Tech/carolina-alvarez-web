import { Link, useSearchParams } from 'react-router-dom'
import Icon from '../components/Icon'
import { practiceAreas } from '../data/practiceAreas'
import { siteConfig, whatsappUrl } from '../data/siteConfig'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const area = practiceAreas.find((item) => item.slug === searchParams.get('area'))
  const message = area ? `Hola Carolina, quisiera coordinar una consulta sobre ${area.title}.` : siteConfig.whatsappMessage
  const contactUrl = area ? `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}` : whatsappUrl
  const emailUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(area ? `Consulta sobre ${area.title}` : 'Consulta jurídica')}`

  return <section className="contact-page">
    <div className="container">
      <p className="section-label">Contacto</p>
      <h1>Coordinar una <em>consulta.</em></h1>
      <div className="contact-page__layout">
        <div className="contact-page__intro">
          {area && <p className="contact-area">Consulta sobre {area.title}</p>}
          <p>Escribe a Carolina para comentar brevemente el motivo de tu consulta y coordinar una cita.</p>
          <a className="button button--primary" href={contactUrl} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp <Icon name="arrow" /></a>
          <p className="contact-page__note">Al escribir, indica el área de consulta, si existe alguna fecha próxima que debamos considerar y tu disponibilidad.</p>
          <div className="contact-privacy">
            <p>Los datos enviados serán utilizados únicamente para atender tu solicitud. Consulta la <Link to="/politica-de-privacidad">Política de Privacidad</Link>.</p>
            <p>Evita incluir información sensible o confidencial innecesaria en tu mensaje. Los detalles del caso podrán tratarse posteriormente por un canal adecuado.</p>
            <p>El enlace abre WhatsApp o tu aplicación de correo. Tú decides cuándo enviar el mensaje.</p>
            <p>El contenido de este sitio tiene fines informativos y no constituye asesoría jurídica para un caso específico. El envío de una consulta no implica por sí solo el establecimiento de una relación profesional.</p>
          </div>
        </div>
        <div className="contact-details">
          <a href={contactUrl} target="_blank" rel="noopener noreferrer"><Icon name="phone" /><span><small>WhatsApp</small>{siteConfig.phone}</span></a>
          <a href={emailUrl}><Icon name="mail" /><span><small>Correo electrónico</small>{siteConfig.email}</span></a>
          <div><Icon name="pin" /><span><small>Ubicación y modalidad</small>{siteConfig.legalAddress}<span className="contact-modality">{siteConfig.modality}</span></span></div>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer"><Icon name="arrow" /><span><small>Perfil profesional</small>LinkedIn</span></a>
        </div>
      </div>
    </div>
  </section>
}
