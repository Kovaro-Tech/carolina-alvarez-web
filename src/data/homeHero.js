// Match the existing object-fit: cover geometry, including the tall mobile
// hero. Using only 100vw here would undersize the source behind that crop.
const srcSet = (prefix, widths, format) => widths.map((width) => `/images/${prefix}-${width}.${format} ${width}w`).join(', ')
const widths = [1056, 1440, 1920]
const mobileWidths = [704, 1056, 1408]

// AVIF variants match or exceed each WebP's fidelity at fewer bytes (see
// scripts/export-hero.py). WebP remains the fallback for older browsers.
export const homeHero = {
  src: '/images/hero-architecture-1920.webp',
  srcSet: srcSet('hero-architecture', widths, 'webp'),
  avifSrc: '/images/hero-architecture-1920.avif',
  avifSrcSet: srcSet('hero-architecture', widths, 'avif'),
  sizes: '(max-width: 1000px) max(100vw, 1068px), max(100vw, min(1233px, 150svh))',
  mobileSrcSet: srcSet('hero-architecture-mobile', mobileWidths, 'webp'),
  mobileAvifSrc: '/images/hero-architecture-mobile-1408.avif',
  mobileAvifSrcSet: srcSet('hero-architecture-mobile', mobileWidths, 'avif'),
  mobileSizes: 'max(100vw, 761.2px)',
}

export function renderHomeHeroPreload(pathname) {
  if (pathname !== '/') return ''
  // Mutually exclusive media queries preload just the selected hero source.
  // Browsers without AVIF skip these by type and use the WebP <source>.
  return [
    `<link rel="preload" as="image" type="image/avif" media="(max-width: 760px)" href="${homeHero.mobileAvifSrc}" imagesrcset="${homeHero.mobileAvifSrcSet}" imagesizes="${homeHero.mobileSizes}" fetchpriority="high" />`,
    `<link rel="preload" as="image" type="image/avif" media="(width > 760px)" href="${homeHero.avifSrc}" imagesrcset="${homeHero.avifSrcSet}" imagesizes="${homeHero.sizes}" fetchpriority="high" />`,
  ].join('\n    ')
}
