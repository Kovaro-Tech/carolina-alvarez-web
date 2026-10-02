import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

// Production pages ship prerendered metadata for their own URL, including 404.
// Metadata code and article data load only when a client navigation needs them.
const prerenderedHead = import.meta.env.PROD

export default function PageMeta() {
  const { pathname } = useLocation()
  const initial = useRef(prerenderedHead)
  useEffect(() => {
    if (initial.current) { initial.current = false; return }
    let current = true
    import('../data/seo').then(({ getPageMeta, headEntries, structuredData, serializeJsonLd }) => {
      if (!current) return
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
    })
    return () => { current = false }
  }, [pathname])
  return null
}
