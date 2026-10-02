// Inner pages are separate chunks. Home and NotFound stay in the main bundle:
// Home hydrates its prerendered HTML and NotFound is shared by two routes.
const routes = {
  about: { path: '/sobre-mi', load: () => import('./pages/About') },
  services: { path: '/servicios', load: () => import('./pages/Services') },
  contact: { path: '/contacto', load: () => import('./pages/Contact') },
  publications: { path: '/publicaciones', load: () => import('./pages/Publications') },
  publication: { path: '/publicaciones/:slug', load: () => import('./pages/Publication') },
  privacy: { path: '/politica-de-privacidad', load: () => import('./pages/Privacy') },
  cookies: { path: '/politica-de-cookies', load: () => import('./pages/Cookies') },
}

const loaded = {}
const pending = {}

export const routeNames = Object.keys(routes)
export const routePath = (name) => routes[name].path
export const loadedRoute = (name) => loaded[name]

export function loadRoute(name) {
  pending[name] ??= routes[name].load().then((module) => {
    loaded[name] = module.default
    return module
  }, (error) => {
    // Allow a later attempt, for example after a temporary network failure.
    delete pending[name]
    throw error
  })
  return pending[name]
}

// Mirrors React Router's default matching: case-insensitive, optional trailing slash.
function routeName(pathname) {
  const path = pathname.toLowerCase().replace(/\/+$/, '')
  if (/^\/publicaciones\/[^/]+$/.test(path)) return 'publication'
  return routeNames.find((name) => routes[name].path === path)
}

// Resolve before rendering or navigating, so a route never commits a
// Suspense fallback and the scroll controller always measures real content.
export function preloadRoute(pathname) {
  const name = routeName(pathname)
  return name ? loadRoute(name) : Promise.resolve()
}

export const preloadAllRoutes = () => Promise.all(routeNames.map(loadRoute))
