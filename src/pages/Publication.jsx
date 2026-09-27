import { useParams } from 'react-router-dom'
import { publications } from '../data/publications'
import NotFound from './NotFound'

export default function Publication() {
  const { slug } = useParams()
  const article = publications.find((item) => item.slug === slug)
  if (!article) return <NotFound />
  return <article className="legal-page container">
    <p className="section-label">Publicaciones / Carolina Álvarez</p>
    <h1>{article.title}</h1>
    <p>{article.description}</p>
    {article.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
  </article>
}
