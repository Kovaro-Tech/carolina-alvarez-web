import { Link } from 'react-router-dom'
import Brand from './Brand'
import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  return <footer>
    <div className="container footer-top">
      <Brand variant="light" />
      <p>{siteConfig.location}<br />{siteConfig.modality}</p>
      <nav aria-label="Navegación del pie">
        <Link to="/">Inicio</Link><Link to="/sobre-mi">Sobre mí</Link><Link to="/servicios">Servicios</Link><Link to="/publicaciones">Publicaciones</Link><Link to="/contacto">Contacto</Link>
        <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link to="/politica-de-privacidad">Política de privacidad</Link>
        <Link to="/politica-de-cookies">Política de cookies</Link>
      </nav>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} Carolina Álvarez. Todos los derechos reservados.</span><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href="https://kovarotech.com" target="_blank" rel="noopener noreferrer">Sitio desarrollado por Kovaro Tech ↗</a></div>
  </footer>
}
