import { NavLink, Link } from 'react-router-dom'
import { useState } from 'react'
import Brand from './Brand'
import Icon from './Icon'
export default function Header() { const [open, setOpen] = useState(false); const close = () => setOpen(false); return <header className="header"><div className="container nav"><Brand /><button className="menu-toggle" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button><nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Navegación principal"><NavLink to="/" end onClick={close}>Inicio</NavLink><NavLink to="/sobre-mi" onClick={close}>Sobre mí</NavLink><NavLink to="/servicios" onClick={close}>Servicios</NavLink><NavLink to="/contacto" onClick={close}>Contacto</NavLink><Link className="nav-cta" to="/contacto" onClick={close}>Agendar una consulta <Icon name="arrow" /></Link></nav></div></header> }
