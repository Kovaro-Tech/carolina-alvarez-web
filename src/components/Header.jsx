import { NavLink, Link, useLocation } from 'react-router-dom'
import { useState, useSyncExternalStore } from 'react'
import Brand from './Brand'
import Icon from './Icon'

const subscribeScroll = (onChange) => {
  window.addEventListener('scroll', onChange, { passive: true })
  return () => window.removeEventListener('scroll', onChange)
}
const isScrolled = () => window.scrollY > 24

export default function Header() {
  const { key, pathname } = useLocation()
  const scrolled = useSyncExternalStore(subscribeScroll, isScrolled, () => false)
  const [menu, setMenu] = useState({ key, open: false })
  // Reset during render so history navigation never paints an old open menu.
  if (menu.key !== key) setMenu({ key, open: false })
  const open = menu.key === key && menu.open
  const close = () => setMenu({ key, open: false })
  const solid = scrolled || open
  const overHero = pathname === '/' && !solid

  return <header onKeyDown={(event) => { if (event.key === 'Escape' && open) { close(); event.currentTarget.querySelector('.menu-toggle').focus() } }} className={`header${solid ? ' header--solid' : ''}${overHero ? ' header--over-hero' : ''}`}>
    <div className="container nav">
      <Brand showName={false} />
      <button type="button" className="menu-toggle" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setMenu({ key, open: !open })}><span /><span /></button>
      <nav id="main-navigation" className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal" onKeyDown={(event) => { if (event.key === 'Escape') { close(); event.currentTarget.previousElementSibling.focus() } }}>
        <NavLink to="/" end onClick={close}>Inicio</NavLink>
        <NavLink to="/sobre-mi" onClick={close}>Sobre mí</NavLink>
        <NavLink to="/servicios" onClick={close}>Servicios</NavLink>
        <NavLink to="/publicaciones" onClick={close}>Publicaciones</NavLink>
        <NavLink to="/contacto" onClick={close}>Contacto</NavLink>
        <Link className="nav-cta" to="/contacto" onClick={close}>Agendar una consulta <Icon name="arrow" /></Link>
      </nav>
    </div>
  </header>
}
