import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'

const homeAreas = [
  ['01', 'Derecho Penal', 'Actuación jurídica desde las primeras decisiones de un asunto penal.'],
  ['02', 'Derecho Penal Económico', 'Análisis de responsabilidad penal en contextos empresariales y patrimoniales.'],
  ['03', 'Derecho Tributario', 'Orientación ante decisiones y controversias con implicaciones tributarias.'],
]

export default function Home() { return <>
  <section className="home-hero">
    {/* hero-stage trae el degradado beige horneado (escritorio);
        hero-portrait es el retrato limpio para la versión apilada. */}
    <picture className="home-hero__stage">
      <source media="(max-width: 760px)" srcSet="/images/hero-portrait.webp" width="1074" height="1122" />
      <img src="/images/hero-stage.webp" alt="Carolina Álvarez, abogada" width="1448" height="1122" fetchPriority="high" />
    </picture>
    <div className="home-hero__inner">
      <div className="home-hero__copy">
        <h1>Defensa jurídica con <em>estrategia</em> y criterio.</h1>
        <p className="home-hero__areas">
          <span>Derecho Penal</span>{' '}
          <span>Derecho Penal Económico</span>{' '}
          <span>Tributación</span>
        </p>
        <div className="actions">
          <Link className="button button--primary" to="/contacto">Agendar consulta <Icon name="arrow" /></Link>
          <Link className="home-hero__link" to="/servicios">Conocer servicios <Icon name="arrow" /></Link>
        </div>
      </div>
    </div>
  </section>
  <section className="home-intro"><div className="container"><h2>Preparación para asuntos de alta exigencia.</h2><p>Carolina Álvarez combina estudios de posgrado con trabajo dentro del sistema de justicia y en el ejercicio profesional.</p><p className="education-summary">Magíster en tres áreas jurídicas · Diplomados en Gestión Pública y Ciencias Políticas</p><Link className="text-link" to="/sobre-mi">Conocer trayectoria <Icon name="arrow" /></Link></div></section>
  <section className="practice-list"><div className="container">{homeAreas.map(([number,title,text]) => <Link className="practice-row" to="/servicios" key={number}><span>{number}</span><h2>{title}</h2><p>{text}</p><Icon name="arrow" /></Link>)}</div></section>
  <section className="selected-experience"><div className="container"><p>Experiencia en defensa jurídica de altos cargos públicos y organizaciones en asuntos de especial complejidad.</p></div></section>
  <CTASection />
</> }
