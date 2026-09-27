import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { publications, publicationPath } from '../data/publications'

export default function Publications() {
  return <section className="publications-page">
    <div className="container">
      <p className="section-label">Carolina Álvarez / Análisis jurídico</p>
      <h1>Publicaciones<span>.</span></h1>
      <p className="publications-page__intro">{publications.length ? 'Artículos, análisis y publicaciones jurídicas.' : 'Este espacio estará dedicado a artículos, análisis y publicaciones jurídicas.'}</p>
      {publications.length ? <ul className="publications-list">{publications.map((article) => <li key={article.slug}>
        <article>
          {article.datePublished && <time className="publication-date" dateTime={article.datePublished}>{new Date(`${article.datePublished}T12:00:00Z`).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}
          <h2><Link to={publicationPath(article)}>{article.title}</Link></h2>
          <p>{article.description}</p>
          <Link className="text-link" to={publicationPath(article)} aria-label={`Leer artículo: ${article.title}`}>Leer artículo <Icon name="arrow" /></Link>
        </article>
      </li>)}</ul> : <div className="publications-pending">
        <span className="publications-pending__rule" aria-hidden="true" />
        <div><h2>Próximamente</h2><p>Las nuevas publicaciones estarán disponibles aquí.</p></div>
      </div>}
      <Link className="text-link" to="/sobre-mi">Conocer la trayectoria de Carolina <Icon name="arrow" /></Link>
    </div>
  </section>
}
