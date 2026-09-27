import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="legal-page container">
    <p className="section-label">Error 404</p>
    <h1>Página no <em>encontrada.</em></h1>
    <p>La página que buscas no existe o ha cambiado de dirección.</p>
    <Link className="button button--primary" to="/">Volver al inicio</Link>
  </section>
}
