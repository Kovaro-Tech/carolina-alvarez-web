import { Link } from 'react-router-dom'
import './Brand.css'

export default function Brand({ showName = true }) {
  return <Link className="logo" to="/" aria-label="Carolina Álvarez, ir al inicio">
    <img className="logo-image" src="/images/logo.png" alt="" width="1600" height="752" />
    {showName && <span className="logo-name"><b>Carolina</b><strong>Álvarez</strong><i>Abogada</i></span>}
  </Link>
}
