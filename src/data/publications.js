// Add only approved, real articles. Dates must describe actual publication/revision.
// { slug, title, description, datePublished: 'YYYY-MM-DD', dateModified?,
//   image?: '/images/...', paragraphs: ['...'] }
export const publications = []

export const publicationPath = (article) => `/publicaciones/${article.slug}`
