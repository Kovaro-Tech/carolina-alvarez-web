import { useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { persistEntries, readEntry, saveEntry } from './historyState'

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

  useLayoutEffect(() => {
    const original = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    const remember = () => saveEntry(activeKey.current, { y: window.scrollY })
    const persist = () => { remember(); persistEntries() }
    const header = shell.current.querySelector('.header')
    const measureHeader = () => {
      document.documentElement.style.setProperty('--navigation-header-height', `${header.offsetHeight}px`)
    }
    const observer = new ResizeObserver(measureHeader)
    observer.observe(header)
    measureHeader()
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
    const restore = action === 'POP' && Number.isFinite(saved?.y)
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
    const offset = Number.parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navigation-header-height')) + 24
    const destination = target ? bounded(target.getBoundingClientRect().top + window.scrollY - offset) : 0
    const animate = !reducedMotion() && action !== 'POP'

    if (restore) {
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
    const main = shell.current.querySelector('main')
    if (url.pathname !== location.pathname && !reducedMotion() && main.animate) {
      exit.current = main.animate([
        { opacity: getComputedStyle(main).opacity, transform: 'translateY(0)' },
        { opacity: .45, transform: 'translateY(-2px)' },
      ], { duration: 140, easing: 'ease-out', fill: 'forwards' })
      try { await exit.current.finished } catch { return }
    }
    if (task !== sequence.current) return
    navigate(`${url.pathname}${url.search}${url.hash}`)
  }

  return <div ref={shell} onClickCapture={followLink} className={`site-shell ${location.pathname === '/' ? 'home-page' : ''} ${location.pathname === '/sobre-mi' ? 'about-page' : ''}`}>{children}</div>
}
