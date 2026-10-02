// The entry keeps every global stylesheet, in the original cascade order,
// so the build still emits one stylesheet. React itself loads separately.
import './index.css'
import './components/Brand.css'
import './App.css'
import './site.css'
import './photo-layout.css'
import './navigation/navigation.css'
import './production.css'
import './inner-pages.css'

// Every page is already prerendered and its links work as plain HTML.
// Start React after the page's own resources (hero, fonts) have loaded, or
// sooner on the first interaction, so the bundle never competes with the LCP.
const triggers = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'scroll']
let started = false
function start() {
  if (started) return
  started = true
  window.removeEventListener('load', start)
  for (const type of triggers) window.removeEventListener(type, start, { capture: true })
  import('./client.jsx')
}

if (document.readyState === 'complete') start()
else {
  window.addEventListener('load', start, { once: true })
  for (const type of triggers) window.addEventListener(type, start, { capture: true, passive: true, once: true })
  // Safety net when a slow resource delays the load event.
  setTimeout(start, 4000)
}
