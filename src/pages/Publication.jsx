import { Link, useParams } from 'react-router-dom'
import { publications } from '../data/publications'
import NotFound from './NotFound'

export default function Publication() {
  const { slug } = useParams()
  const article = publications.find((item) => item.slug === slug)
  if (!article) return <NotFound />
  return <article className="publication-detail">
    <div className="container publication-detail__return">
      <Link className="text-link publication-back" to="/publicaciones">Volver a publicaciones</Link>
    </div>
    <header className="publication-heading">
      <div className="container publication-detail__heading-inner">
      <p className="section-label">Publicación</p>
      <h1>{article.title}</h1>
      <p className="publication-author">{article.author}</p>
      {article.datePublished && <time className="publication-date" dateTime={article.datePublished}>{new Date(`${article.datePublished}T12:00:00Z`).toLocaleDateString('es-EC', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}</time>}
      <p className="publication-summary">{article.description}</p>
      </div>
    </header>
    <div className="container publication-body">
      {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {article.sections?.map((section, index) => <section key={index}>
        <h2>{section.title}</h2>
        {section.paragraphs.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
      </section>)}
    </div>
    <div className="container publication-detail__return">
      <Link className="text-link publication-back" to="/publicaciones">Ver todas las publicaciones</Link>
    </div>
  </article>
}
