import { Link } from 'react-router-dom'
import Icon from './Icon'
import { practiceAreas } from '../data/practiceAreas'

export default function ServiceCards() {
  return <div className="service-cards">
    {practiceAreas.map((area) => <Link className="service-card" to={`/servicios#${area.slug}`} key={area.slug} aria-label={`Conocer ${area.title}`}>
      <span className="service-card__number">{area.number}</span>
      <span className="service-card__shape" aria-hidden="true" />
      <div className="service-card__content">
        <h3>{area.title}</h3>
        <p>{area.summary}</p>
      </div>
      <span className="service-card__action">Conocer área <Icon name="arrow" /></span>
    </Link>)}
  </div>
}
