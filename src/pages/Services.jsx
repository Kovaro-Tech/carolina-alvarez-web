import { useSyncExternalStore } from 'react'
import { useHistoryState } from '../navigation/useHistoryState'
import { Link, useLocation } from 'react-router-dom'
import Icon from '../components/Icon'
import { practiceAreas } from '../data/practiceAreas'

const mobileQuery = '(max-width: 760px)'
const subscribeMobile = (callback) => {
  const query = window.matchMedia(mobileQuery)
  query.addEventListener('change', callback)
  return () => query.removeEventListener('change', callback)
}
const isMobile = () => window.matchMedia(mobileQuery).matches

export default function Services() {
  const { hash } = useLocation()
  const mobile = useSyncExternalStore(subscribeMobile, isMobile, () => false)
  const [openArea, setOpenArea] = useHistoryState('serviceArea', practiceAreas.find((area) => `#${area.slug}` === hash)?.slug || practiceAreas[0].slug)

  return <>
    <section className="services-hero">
      <div className="container">
        <h1>Áreas de <em>práctica</em></h1>
        <p>Derecho Penal, Derecho Penal Económico y Tributación.</p>
        <nav className="services-index" aria-label="Índice de áreas de práctica">
          {practiceAreas.map((area) => <Link key={area.slug} to={`#${area.slug}`}>
            <span>{area.number}</span>{area.title}
          </Link>)}
        </nav>
      </div>
    </section>

    <div className="service-chapters">
      {practiceAreas.map((area) => {
        const expanded = !mobile || openArea === area.slug
        return <section className={`service-chapter service-chapter--${area.slug}`} id={area.slug} key={area.slug} aria-labelledby={`${area.slug}-title`} tabIndex={-1}>
          <div className="container service-chapter__layout">
            <header className="service-chapter__heading">
              <span className="service-chapter__number">{area.number}</span>
              <h2 id={`${area.slug}-title`}>{area.title}</h2>
              <button className="service-chapter__toggle" type="button"
                aria-expanded={expanded}
                aria-controls={`${area.slug}-content`}
                aria-label={`${expanded ? 'Cerrar' : 'Ver'} detalles de ${area.title}`}
                onClick={() => setOpenArea(expanded ? null : area.slug)}>
                {expanded ? 'Cerrar detalles' : 'Ver detalles'}
                <span aria-hidden="true">{expanded ? '−' : '+'}</span>
              </button>
            </header>
            <div className="service-chapter__panel" id={`${area.slug}-content`} data-expanded={expanded} inert={!expanded} aria-hidden={!expanded}>
              <div className="service-chapter__panel-inner">
                <div className="service-chapter__body">
                  <p>{area.text}</p>
                  {/* Only display specific scopes once Carolina has validated them. */}
                  {area.points?.length > 0 && <ul>{area.points.map((point) => <li key={point}>{point}</li>)}</ul>}
                  <Link className="text-link" to="/contacto">Consultar sobre esta área <Icon name="arrow" /></Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      })}
    </div>
  </>
}
