import { Link } from 'react-router-dom'
import Icon from './Icon'
import { whatsappUrl } from '../data/siteConfig'
export default function CTASection() { return <section className="final-cta"><div className="container"><h2>Hablemos sobre tu <em>caso.</em></h2><p>Una conversación inicial para comprender tu situación.</p><div><Link to="/contacto" className="button button--primary">Agendar consulta <Icon name="arrow" /></Link><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-link">WhatsApp <Icon name="arrow" /></a></div></div></section> }
