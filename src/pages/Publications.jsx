import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

export default function Publications() {
  return <section className="publications-page">
    <div className="container">
      <p className="section-label">Carolina Álvarez / Análisis jurídico</p>
      <h1>Publicaciones<span>.</span></h1>
      <p className="publications-page__intro">Este espacio estará dedicado a artículos, análisis y publicaciones jurídicas.</p>
      <div className="publications-pending">
        <span className="publications-pending__rule" aria-hidden="true" />
        <div><h2>Próximamente</h2><p>Las nuevas publicaciones estarán disponibles aquí.</p></div>
      </div>
      <Link className="text-link" to="/sobre-mi">Conocer la trayectoria de Carolina <Icon name="arrow" /></Link>
    </div>
  </section>
}
