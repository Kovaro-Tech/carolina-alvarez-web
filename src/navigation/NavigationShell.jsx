import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { persistEntries, readEntry, saveEntry } from './historyState'
import { preloadRoute } from '../routes'

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
const jump = (top) => window.scrollTo({ top, left: 0, behavior: 'instant' })
const bounded = (top) => Math.max(0, Math.min(top, document.documentElement.scrollHeight - window.innerHeight))
const findAnchor = (hash) => {
  try { return hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null }
  catch { return null }
}

// One rAF-driven scroll, cancellable by user input or a newer navigation.
// Unlike native smooth scroll, completion and cancellation are explicit.
function moveTo(top, signal) {
  const start = window.scrollY
  const distance = bounded(top) - start
  if (reducedMotion() || Math.abs(distance) < 1) {
    jump(top)
    return Promise.resolve()
  }
  const mobile = window.matchMedia('(max-width: 760px)').matches
  const duration = Math.min(mobile ? 380 : 480, 260 + Math.abs(distance) * .12)
  return new Promise((resolve) => {
    let frame
    let started
    const finish = () => {
      cancelAnimationFrame(frame)
      signal.removeEventListener('abort', finish)
      resolve()
    }
    const tick = (time) => {
      started ??= time
      const progress = Math.min(1, (time - started) / duration)
      const eased = progress * progress * (3 - 2 * progress)
      jump(start + distance * eased)
      if (progress < 1 && !signal.aborted) frame = requestAnimationFrame(tick)
      else finish()
    }
    signal.addEventListener('abort', finish, { once: true })
    frame = requestAnimationFrame(tick)
  })
}

export default function NavigationShell({ children }) {
  const location = useLocation()
  const action = useNavigationType()
  const navigate = useNavigate()
  const shell = useRef(null)
  const previous = useRef(null)
  const activeKey = useRef(location.key)
  const sequence = useRef(0)
  const motion = useRef(null)
  const exit = useRef(null)
  const headerHeight = useRef(null)

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const remember = () => saveEntry(activeKey.current, { y: window.scrollY })
    const persist = () => { remember(); persistEntries() }
    const header = shell.current.querySelector('.header')
    const measureHeader = ([entry]) => {
      // ResizeObserver already measured the border box: no synchronous layout read.
      const height = entry.borderBoxSize?.[0]?.blockSize
      if (!Number.isFinite(height) || height === headerHeight.current) return
      headerHeight.current = height
      document.documentElement.style.setProperty('--navigation-header-height', `${height}px`)
    }
    const observer = new ResizeObserver(measureHeader)
    observer.observe(header, { box: 'border-box' })
    window.addEventListener('scroll', remember, { passive: true })
    window.addEventListener('pagehide', persist)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', remember)
      window.removeEventListener('pagehide', persist)
      window.history.scrollRestoration = original
    }
  }, [])

  useLayoutEffect(() => {
    const main = shell.current.querySelector('main')
    const oldLocation = previous.current
    const newPage = !oldLocation || oldLocation.pathname !== location.pathname
    const saved = readEntry(location.key)
    // Every full page load without history state shares the "default" key.
    // On first mount, only a reload or back/forward visit restores its position.
    const revisit = oldLocation || ['reload', 'back_forward'].includes(performance.getEntriesByType('navigation')[0]?.type)
    const restore = action === 'POP' && revisit && Number.isFinite(saved?.y)
    const controller = new AbortController()
    motion.current?.abort()
    motion.current = controller
    sequence.current += 1
    exit.current?.cancel()
    exit.current = null
    activeKey.current = location.key
    previous.current = location
    let entryAnimation
    let frame

    // This layout effect runs after all route DOM (including accordion state)
    // is committed and before paint. No timed guess about mounting is needed.
    const target = findAnchor(location.hash)
    // Only anchors need geometry; ordinary navigation needs no style/layout read.
    const offset = target ? (headerHeight.current ?? Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navigation-header-height'))) + 24 : 0
    const destination = target ? bounded(target.getBoundingClientRect().top + window.scrollY - offset) : 0
    const animate = !reducedMotion() && action !== 'POP'
    // React starts after the prerendered page loads. If the visitor has
    // already scrolled it, keep their position instead of restoring or resetting.
    const keepInitialScroll = !oldLocation && !target && window.scrollY > 0

    if (keepInitialScroll) {
      // The browser's current position already belongs to this entry.
    } else if (restore) {
      jump(saved.y)
    } else if (!animate) {
      jump(destination)
    } else if (newPage) {
      // Stage close to the anchor with a soft fade. The visible journey is a
      // short continuous scroll, not top-of-page followed by a teleport.
      main.style.opacity = '.45'
      jump(target ? Math.max(0, destination - window.innerHeight * .45) : 0)
    } else {
      // Replacing keyed content can reset the browser's focused scroll node.
      // Keep the departure position before paint for same-page anchors.
      jump(readEntry(oldLocation.key)?.y ?? window.scrollY)
    }

    const interrupt = (event) => {
      if (event.type === 'keydown' && !['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) return
      controller.abort()
    }
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchstart', interrupt, { passive: true })
    window.addEventListener('keydown', interrupt)

    frame = requestAnimationFrame(async () => {
      if (controller.signal.aborted) { main.style.opacity = ''; return }
      if (animate && newPage && main.animate) {
        entryAnimation = main.animate([
          { opacity: .45, transform: 'translateY(4px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ], { duration: 280, easing: 'cubic-bezier(.22,1,.36,1)' })
      }
      main.style.opacity = ''
      if (!restore && animate && target) await moveTo(destination, controller.signal)
      if (controller.signal.aborted) return
      if (action !== 'POP') {
        const focusTarget = target || main
        focusTarget.focus({ preventScroll: true })
      }
      saveEntry(location.key, { y: window.scrollY })
    })

    return () => {
      controller.abort()
      cancelAnimationFrame(frame)
      entryAnimation?.cancel()
      main.style.opacity = ''
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchstart', interrupt)
      window.removeEventListener('keydown', interrupt)
    }
  }, [location, action])

  const followLink = async (event) => {
    const link = event.target.closest('a[href]')
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.hasAttribute('download') || (link.target && link.target !== '_self') || link.hasAttribute('data-native-navigation')) return
    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin) return
    event.preventDefault()
    saveEntry(location.key, { y: window.scrollY })
    motion.current?.abort()
    exit.current?.cancel()
    const task = ++sequence.current
    // The destination chunk loads during the exit fade; navigation commits complete content.
    const ready = preloadRoute(url.pathname).then(() => true, () => false)
    const main = shell.current.querySelector('main')
    if (url.pathname !== location.pathname && !reducedMotion() && main.animate) {
      exit.current = main.animate([
        { opacity: getComputedStyle(main).opacity, transform: 'translateY(0)' },
        { opacity: .45, transform: 'translateY(-2px)' },
      ], { duration: 140, easing: 'ease-out', fill: 'forwards' })
      try { await exit.current.finished } catch { return }
    }
    const loaded = await ready
    if (task !== sequence.current) return
    // A chunk that cannot load (offline, replaced deploy) falls back to the prerendered page.
    if (!loaded) { window.location.assign(url.href); return }
    navigate(`${url.pathname}${url.search}${url.hash}`)
  }

  // Fetch a page's chunk as soon as a visitor shows intent to open it.
  const prefetchLink = (event) => {
    const link = event.target.closest?.('a[href]')
    if (!link) return
    const url = new URL(link.href, window.location.href)
    if (url.origin === window.location.origin) preloadRoute(url.pathname).catch(() => {})
  }

  return <div ref={shell} onClickCapture={followLink} onPointerOverCapture={prefetchLink} onFocusCapture={prefetchLink} onTouchStartCapture={prefetchLink} className={`site-shell ${location.pathname === '/' ? 'home-page' : ''} ${location.pathname === '/sobre-mi' ? 'about-page' : ''}`}>{children}</div>
}
