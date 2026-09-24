import { Link } from 'react-router-dom'
import Icon from './Icon'

export default function CTASection() {
  return <section className="final-cta"><div className="container final-cta__layout">
    <div><p className="section-label">Consulta jurídica</p><h2>El primer paso: <em>conocer tu caso.</em></h2><p>Atención presencial en Quito y virtual.</p></div>
    <Link to="/contacto" className="button button--primary">Agendar consulta <Icon name="arrow" /></Link>
  </div></section>
}
