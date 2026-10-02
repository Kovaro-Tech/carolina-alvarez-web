import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import CTASection from '../components/CTASection'
import ServiceCards from '../components/ServiceCards'
import { homeHero } from '../data/homeHero'

export default function Home() {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <picture>
        <source media="(max-width: 760px)" type="image/avif" srcSet={homeHero.mobileAvifSrcSet} sizes={homeHero.mobileSizes} width="1408" height="1280" />
        <source media="(max-width: 760px)" type="image/webp" srcSet={homeHero.mobileSrcSet} sizes={homeHero.mobileSizes} width="1408" height="1280" />
        <source type="image/avif" srcSet={homeHero.avifSrcSet} sizes={homeHero.sizes} width="1920" height="1280" />
        <img className="home-hero__architecture" src={homeHero.src} srcSet={homeHero.srcSet} sizes={homeHero.sizes} alt="" width="1920" height="1280" fetchPriority="high" loading="eager" decoding="async" />
      </picture>
      <div className="container home-hero__inner">
        <div className="home-hero__copy">
          <p className="home-hero__name">Carolina Álvarez <span>Abogada</span></p>
          <h1 id="home-title">Defensa jurídica con <em>estrategia</em> y criterio.</h1>
          <ul className="home-hero__areas"><li>Derecho Penal</li><li>Derecho Penal Económico</li><li>Tributación</li></ul>
          <div className="actions">
            <Link className="button button--light" to="/contacto">Agendar consulta <Icon name="arrow" /></Link>
            <Link className="home-hero__link" to="/servicios">Conocer servicios <Icon name="arrow" /></Link>
          </div>
        </div>
      </div>
    </section>
    <section className="home-services-preview">
      <div className="container">
        <div className="home-services-preview__heading"><p className="section-label">Servicios jurídicos</p><h2>Tres áreas de <em>práctica.</em></h2></div>
        <ServiceCards />
      </div>
    </section>
    <section className="home-profile">
      <div className="container home-profile__layout">
        <div><p className="section-label">Sobre Carolina</p><h2>Formación jurídica.<br /><em>Experiencia en defensa.</em></h2></div>
        <div className="home-profile__copy">
          <p>Abogada con tres maestrías y experiencia en la Dirección Nacional de Acceso a los Servicios de Justicia. Su ejercicio profesional comprende la defensa de altos cargos públicos y de empresas nacionales e internacionales.</p>
          <Link className="text-link" to="/sobre-mi">Conocer su trayectoria <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
    <CTASection />
  </>
}
