// Match the existing object-fit: cover geometry, including the tall mobile
// hero. Using only 100vw here would undersize the source behind that crop.
export const homeHero = {
  src: '/images/hero-architecture-1920.webp',
  srcSet: [1056, 1440, 1920].map((width) => `/images/hero-architecture-${width}.webp ${width}w`).join(', '),
  sizes: '(max-width: 1000px) max(100vw, 1068px), max(100vw, min(1233px, 150svh))',
  mobileSrc: '/images/hero-architecture-mobile-1408.webp',
  mobileSrcSet: [704, 1056, 1408].map((width) => `/images/hero-architecture-mobile-${width}.webp ${width}w`).join(', '),
  mobileSizes: 'max(100vw, 761.2px)',
}

export function renderHomeHeroPreload(pathname) {
  if (pathname !== '/') return ''
  // Mutually exclusive media queries preload just the selected hero source.
  return [
    `<link rel="preload" as="image" type="image/webp" media="(max-width: 760px)" href="${homeHero.mobileSrc}" imagesrcset="${homeHero.mobileSrcSet}" imagesizes="${homeHero.mobileSizes}" fetchpriority="high" />`,
    `<link rel="preload" as="image" type="image/webp" media="(width > 760px)" href="${homeHero.src}" imagesrcset="${homeHero.srcSet}" imagesizes="${homeHero.sizes}" fetchpriority="high" />`,
  ].join('\n    ')
}
