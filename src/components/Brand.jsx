import { Link } from 'react-router-dom'
import './Brand.css'

// Replace these sources with /images/logo-light.png and /images/logo-dark.png
// when the equivalent transparent assets are available. The light filter only
// applies to the temporary original; a dedicated light asset keeps its colors.
const logoSources = {
  light: '/images/logo.png',
  dark: '/images/logo.png',
}

export default function Brand({ showName = true, variant = 'dark' }) {
  return <Link className={`logo logo--${variant}`} to="/" aria-label="Carolina Álvarez, ir al inicio">
    <span className="logo-artwork" aria-hidden="true">
      <img className="logo-image logo-image--dark" src={logoSources.dark} alt="" width="729" height="342" />
      <img className={`logo-image logo-image--light${logoSources.light === '/images/logo.png' ? ' logo-image--temporary-light' : ''}`} src={logoSources.light} alt="" width="729" height="342" />
    </span>
    {showName && <span className="logo-name"><b>Carolina</b><strong>Álvarez</strong><i>Abogada</i></span>}
  </Link>
}
