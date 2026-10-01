import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <BrowserRouter><App /></BrowserRouter>
  </StrictMode>
)

// Reuse Home's build-time HTML instead of discarding and rebuilding it.
// Inner pages retain client rendering for query/hash/history-dependent content.
// Vite development serves an empty root and also uses ordinary client rendering.
if (root.hasChildNodes() && window.location.pathname === '/') hydrateRoot(root, app)
else createRoot(root).render(app)
