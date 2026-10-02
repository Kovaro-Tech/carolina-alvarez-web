import { StrictMode, startTransition } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { preloadRoute } from './routes'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </StrictMode>
)

// The current route's chunk is ready before the first render: no fallback
// replaces the prerendered page. A transition lets React yield while it
// renders, instead of one long main-thread task.
preloadRoute(window.location.pathname).then(() => startTransition(() => {
  // Reuse Home's build-time HTML instead of discarding and rebuilding it.
  // Inner pages retain client rendering for query/hash/history-dependent content.
  // Vite development serves an empty root and also uses ordinary client rendering.
  if (root.hasChildNodes() && window.location.pathname === '/') hydrateRoot(root, app)
  else createRoot(root).render(app)
}), () => {
  // Without its chunk, keep the prerendered page: its links still navigate.
})
