import { Link } from 'react-router-dom'

// Both color states share one responsive download. Keep the existing light
// filter and opacity transition so scrolling preserves the approved artwork.
// AVIF is preferred; the lossless WebP remains the fallback. Brand.css loads
// from the entry with the other global styles.
const logoAvifSrcSet = '/images/logo-220.avif 220w, /images/logo-440.avif 440w'
const logoImage = {
  src: '/images/logo-220.webp',
  srcSet: '/images/logo-220.webp 220w, /images/logo-440.webp 440w',
}

function LogoImage({ className, sizes }) {
  return <picture>
    <source type="image/avif" srcSet={logoAvifSrcSet} sizes={sizes} />
    <img className={className} {...logoImage} sizes={sizes} alt="" width="729" height="342" />
  </picture>
}

export default function Brand({ showName = true, variant = 'dark' }) {
  const sizes = showName ? '111px' : '(max-width: 760px) 111px, 136px'
  return <Link className={`logo logo--${variant}`} to="/" aria-label="Carolina Álvarez, ir al inicio">
    <span className="logo-artwork" aria-hidden="true">
      <LogoImage className="logo-image logo-image--dark" sizes={sizes} />
      <LogoImage className="logo-image logo-image--light logo-image--temporary-light" sizes={sizes} />
    </span>
    {showName && <span className="logo-name"><b>Carolina</b><strong>Álvarez</strong><i>Abogada</i></span>}
  </Link>
}
