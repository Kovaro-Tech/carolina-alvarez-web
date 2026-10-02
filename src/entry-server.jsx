import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
export { preloadAllRoutes } from './routes'

// Call preloadAllRoutes() first: route chunks then render synchronously.
export function render(path) {
  return renderToString(<StaticRouter location={path}><App /></StaticRouter>)
}
