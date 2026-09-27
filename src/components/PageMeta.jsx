import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageMeta, headEntries, structuredData, serializeJsonLd } from '../data/seo'

export default function PageMeta() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageMeta(pathname)
    document.title = meta.title
    document.head.querySelectorAll('[data-page-meta]').forEach((node) => node.remove())
    const append = (tag, attributes, content) => {
      const node = document.createElement(tag)
      node.setAttribute('data-page-meta', '')
      Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value))
      if (content) node.textContent = content
      document.head.append(node)
    }
    headEntries(pathname).forEach(([kind, key, content]) => append('meta', { [kind]: key, content }))
    if (meta.canonical) append('link', { rel: 'canonical', href: meta.canonical })
    const data = structuredData(pathname)
    if (data) append('script', { type: 'application/ld+json' }, serializeJsonLd(data))
  }, [pathname])
  return null
}
