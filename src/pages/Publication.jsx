import { Link, useParams } from 'react-router-dom'
import { publications } from '../data/publications'
import NotFound from './NotFound'

export default function Publication() {
  const { slug } = useParams()
  const article = publications.find((item) => item.slug === slug)
  if (!article) return <NotFound />
  return <article className="legal-page publication-detail container">
    <Link className="text-link publication-back" to="/publicaciones">Volver a publicaciones</Link>
    <header className="publication-heading">
      <p className="section-label">Publicaciones / Carolina Álvarez</p>
      <h1>{article.title}</h1>
      {article.datePublished && <time className="publication-date" dateTime={article.datePublished}>{new Date(`${article.datePublished}T12:00:00Z`).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}
      <p className="publication-summary">{article.description}</p>
    </header>
    <div className="publication-body">
      {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {article.sections?.map((section, index) => <section key={index}>
        <h2>{section.title}</h2>
        {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      </section>)}
    </div>
    {article.sourcePdf && <p><a href={article.sourcePdf} target="_blank" rel="noopener noreferrer">Consultar el artículo original (PDF)</a></p>}
    <Link className="text-link publication-back" to="/publicaciones">Ver todas las publicaciones</Link>
  </article>
}
