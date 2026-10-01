import { renderHomeHeroPreload } from './homeHero.js'

export function renderPageResources(pathname) {
  if (pathname !== '/') return ''
  // Only the normal Latin serif used by the main hero title is preloaded.
  // Its italic companion and DM Sans remain requested on demand by the CSS.
  return [
    renderHomeHeroPreload(pathname),
    '<link rel="preload" as="font" type="font/woff2" href="/fonts/-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2" crossorigin="anonymous" />',
  ].join('\n    ')
}
