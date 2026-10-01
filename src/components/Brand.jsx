import { Link } from 'react-router-dom'
import './Brand.css'

// Both color states share one responsive download. Keep the existing light
// filter and opacity transition so scrolling preserves the approved artwork.
const logoImage = {
  src: '/images/logo-220.webp',
  srcSet: '/images/logo-220.webp 220w, /images/logo-440.webp 440w',
}

export default function Brand({ showName = true, variant = 'dark' }) {
  return <Link className={`logo logo--${variant}`} to="/" aria-label="Carolina Álvarez, ir al inicio">
    <span className="logo-artwork" aria-hidden="true">
      <img className="logo-image logo-image--dark" {...logoImage} sizes={showName ? '111px' : '(max-width: 760px) 111px, 136px'} alt="" width="729" height="342" />
      <img className="logo-image logo-image--light logo-image--temporary-light" {...logoImage} sizes={showName ? '111px' : '(max-width: 760px) 111px, 136px'} alt="" width="729" height="342" />
    </span>
    {showName && <span className="logo-name"><b>Carolina</b><strong>Álvarez</strong><i>Abogada</i></span>}
  </Link>
}
