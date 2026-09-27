import { Link } from 'react-router-dom'
import Icon from './Icon'
import { practiceAreas } from '../data/practiceAreas'

const serviceArtwork = {
  'derecho-penal': <>
    <path className="service-card__wash" d="M84 22h68l22 22v88H84Z" />
    <path className="service-card__guide" d="M76 36v104h62" />
    <path className="service-card__line" d="M84 22h68l22 22v88H84ZM152 22v22h22" />
    <path className="service-card__axis" d="M100 54h30" />
    <path className="service-card__guide" d="M100 68h48M100 80h35M100 104h23M100 114h16" />
    <path className="service-card__paper" d="M178 70c10 7 22 11 34 13v23c0 18-14 30-34 39-20-9-34-21-34-39V83c12-2 24-6 34-13Z" />
    <path className="service-card__wash" d="M178 70c10 7 22 11 34 13v23c0 18-14 30-34 39V70Z" />
    <path className="service-card__line" d="M178 70c10 7 22 11 34 13v23c0 18-14 30-34 39-20-9-34-21-34-39V83c12-2 24-6 34-13Z" />
    <path className="service-card__guide" d="M178 82c7 4 15 7 23 9v15c0 12-9 21-23 28-14-7-23-16-23-28V91c8-2 16-5 23-9Z" />
  </>,
  'penal-economico': <>
    <path className="service-card__wash" d="M102 32l60-12v120h-60ZM162 54h32v86h-32Z" />
    <path className="service-card__line" d="M102 140V32l60-12v120M162 54h32v86M102 78H82v62" />
    <path className="service-card__guide" d="M118 46v52M134 42v56M146 40v58M112 62h40M112 80h40M174 68h8M174 82h8M90 92v34M70 140h145" />
    <path className="service-card__axis" d="M124 140v-28h18v28" />
    <path className="service-card__paper" d="M192 94c7 5 16 8 24 9v16c0 12-10 20-24 27-14-7-24-15-24-27v-16c8-1 17-4 24-9Z" />
    <path className="service-card__wash" d="M192 94c7 5 16 8 24 9v16c0 12-10 20-24 27V94Z" />
    <path className="service-card__line" d="M192 94c7 5 16 8 24 9v16c0 12-10 20-24 27-14-7-24-15-24-27v-16c8-1 17-4 24-9Z" />
  </>,
  'derecho-tributario': <>
    <path className="service-card__wash" d="M94 18h74l22 22v100H94Z" />
    <path className="service-card__line" d="M94 18h74l22 22v100H94ZM168 18v22h22" />
    <path className="service-card__axis" d="M110 48h32" />
    <path className="service-card__guide" d="M110 60h62M110 76h62M110 90h62M110 104h62M110 76v28M146 76v28M172 76v28M110 124h22" />
    <circle className="service-card__paper" cx="184" cy="110" r="30" />
    <circle className="service-card__wash" cx="184" cy="110" r="30" />
    <circle className="service-card__line" cx="184" cy="110" r="30" />
    <path className="service-card__axis" d="M174 122l20-24" />
    <circle className="service-card__line" cx="175" cy="101" r="4" />
    <circle className="service-card__line" cx="193" cy="119" r="4" />
  </>,
}

export default function ServiceCards() {
  return <div className="service-cards">
    {practiceAreas.map((area) => <Link className={`service-card service-card--${area.slug}`} to={`/servicios#${area.slug}`} key={area.slug} aria-label={`Conocer ${area.title}`}>
      <span className="service-card__number">{area.number}</span>
      <svg className="service-card__shape" viewBox="0 0 240 160" fill="none" aria-hidden="true" focusable="false">
        {serviceArtwork[area.slug]}
      </svg>
      <div className="service-card__content">
        <h3>{area.title}</h3>
        <p>{area.summary}</p>
      </div>
      <span className="service-card__action">Conocer área <Icon name="arrow" /></span>
    </Link>)}
  </div>
}
