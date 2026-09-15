import { Link } from 'react-router-dom'
import Icon from './Icon'
import { whatsappUrl } from '../data/siteConfig'
export default function CTASection() { return <section className="consultation"><div className="container consultation-inner"><div><p className="eyebrow eyebrow--light"><span /> Consulta inicial</p><h2>Cada situación jurídica merece ser analizada <em>a tiempo.</em></h2><p>Si necesita orientación sobre su caso, podemos revisar su situación y definir los siguientes pasos.</p></div><div className="consultation-actions"><Link to="/contacto" className="button button--light">Solicitar una consulta <Icon name="arrow" /></Link><a href={whatsappUrl} target="_blank" rel="noreferrer" className="whatsapp-link">Escribir por WhatsApp <Icon name="arrow" /></a></div></div></section> }
