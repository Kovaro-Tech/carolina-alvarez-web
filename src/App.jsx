import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import { whatsappUrl } from './data/siteConfig'
import './App.css'
import './site.css'

const pageMeta = {
  '/': ['Carolina Álvarez | Abogada', 'Asesoría y defensa jurídica con estrategia, criterio y compromiso.'],
  '/sobre-mi': ['Sobre Carolina Álvarez | Abogada', 'Conozca el enfoque profesional de Carolina Álvarez.'],
  '/servicios': ['Servicios Jurídicos | Carolina Álvarez', 'Áreas de práctica: Derecho Penal, Penal Económico y Tributario.'],
  '/contacto': ['Contacto | Carolina Álvarez', 'Coordine una consulta jurídica con Carolina Álvarez.'],
}
function PageMeta() { const { pathname } = useLocation(); useEffect(() => { const [title, description] = pageMeta[pathname] || pageMeta['/']; document.title = title; document.querySelector('meta[name="description"]')?.setAttribute('content', description); window.scrollTo(0, 0) }, [pathname]); return null }
function App() { return <BrowserRouter><PageMeta /><div className="site-shell"><Header /><main><Routes><Route path="/" element={<Home />} /><Route path="/sobre-mi" element={<About />} /><Route path="/servicios" element={<Services />} /><Route path="/contacto" element={<Contact />} /><Route path="*" element={<Home />} /></Routes></main><Footer /><a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11 19.9L3.5 29l6.3-1.5A13 13 0 1 0 16 3Zm0 23.7a10.7 10.7 0 0 1-5.4-1.5l-.4-.2-3.7.9.9-3.6-.2-.4a10.7 10.7 0 1 1 8.8 4.8Zm5.9-8c-.3-.2-2-1-2.3-1.1s-.5-.2-.7.2-.8 1.1-1 1.3-.4.3-.8.1a8.7 8.7 0 0 1-2.6-1.6 9.8 9.8 0 0 1-1.8-2.3c-.2-.4 0-.6.1-.8l.5-.6c.2-.2.2-.4.3-.6s0-.4 0-.6l-1.1-2.5c-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.9s1.2 3.4 1.3 3.6a12.4 12.4 0 0 0 4.8 4.2c.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 2-.8 2.2-1.6.3-.8.3-1.5.2-1.6s-.3-.2-.6-.4Z" /></svg></a></div></BrowserRouter> }
export default App
