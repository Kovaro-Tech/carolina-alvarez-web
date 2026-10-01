# Optimización dirigida de renderizado — 1 de octubre de 2026

Cambios locales, sin deploy ni screenshots. Se conservan diseño, copy, SEO,
imágenes, animaciones, Router y configuración de Cloudflare.

## CSS bloqueante y solución

El recurso bloqueante del build previo era `/assets/index-DXPMO9o-.css`:
41.535 bytes, 8.618 bytes gzip con Node. Agrupa index/fonts, App, site,
photo-layout, navigation, production, inner-pages y Brand. El `@import`
de fuentes se resuelve durante el build; no produce otra petición CSS.

El prerender ahora reemplaza el enlace de stylesheet **solo en Home** por
un `<style>` con ese mismo CSS completo y minificado. No hay una segunda
copia ni una descarga diferida del CSS en Home. Las páginas internas conservan
el recurso externo cacheable. La CSP existente admite estilos inline.
Los preloads de hero y serif aparecen antes del bloque de estilos.

Dividir manualmente CSS crítico, overrides responsive y estilos internos
complica la cascada para ahorrar parte de apenas 8,4 KiB comprimidos.
Se conserva la cascada completa para evitar estados sin estilos, FOUC y
saltos al cargar estilos posteriores. El coste es añadir esos estilos al
HTML de Home y perder allí la caché independiente del CSS. No se retiraron
selectores sin evidencia de cobertura de todas las rutas y estados.

## Forced reflow

NavigationShell leía `header.offsetHeight` en un layout effect y en cada
callback de ResizeObserver, escribía `--navigation-header-height`, y después
consultaba `getComputedStyle` incluso sin ancla. Esto puede exigir resolver
layout y estilos durante el commit inicial.

Ahora recibe la altura ya medida mediante `ResizeObserverEntry.borderBoxSize`,
guarda el valor y solo escribe cuando cambia. No consulta estilos para
navegaciones sin ancla. Para anclas mantiene las lecturas necesarias de
posición y altura del documento, antes de las escrituras de animación.

Las lecturas de anclas y opacidad al salir de una ruta son puntuales.
El scroll animado ya usa requestAnimationFrame y no mide geometría por frame.
El listener del header es pasivo; useSyncExternalStore solo cambia su estado
al cruzar el umbral de 24 px. El listener de historial guarda scrollY en memoria.
El acordeón usa CSS grid, sin medir scrollHeight. No se eliminaron animaciones
ni se añadieron envolturas rAF sin una causa concreta.

Se eliminó un patrón que puede forzar layout; no se dispone de la traza del
PageSpeed original para afirmar que fuese su único origen.

## Cadena crítica y fuentes

Antes: HTML → CSS → DM Sans Latin y DM Serif Display italic Latin.
El serif normal del título y el hero ya tenían preload desde HTML.
Ahora los font-face se descubren directamente en HTML, sin esperar la petición
CSS. En la prueba local, Sans/italic iniciaron a ~374 ms frente a ~693 ms.

En la cadena serial de fuentes, DM Sans fue el último recurso en terminar:
~1.745 ms antes, ~1.440 ms después. En la carga total, hero y JS finalizaron
más tarde (~1.758 y ~1.811 ms después). El hero domina el LCP de imagen;
el JS no bloquea el primer render del HTML prerenderizado. No hay fundamento
para identificar un único recurso dominante en el informe de producción
sin su waterfall/traza.

Home necesita Sans en texto/botones, serif normal en el título y serif italic
en «estrategia», todos sobre el primer pliegue. Se mantiene solo el preload
serif normal, los restantes bajo demanda y `font-display: swap`.
Las declaraciones Sans de varios pesos comparten URL; la prueba registra una
sola descarga Latin, no una por peso. No se descargaron subsets Latin-ext ni
fuentes exclusivas de páginas internas. No se añadieron preloads competidores.

## Tarea larga y JavaScript sin usar

La entrada usaba createRoot sobre HTML ya prerenderizado: React descartaba y
reconstruía el árbol. Home ahora usa hydrateRoot; desarrollo y rutas internas
mantienen createRoot. Esto evita cambiar el render inicial de páginas que
dependen de query, hash o estado de historial, como contacto por área.

La traza local muestra trabajo inicial ejecutado desde el scheduler de React,
con recálculo de estilos/layout dentro del commit. No se encontró una operación
larga independiente en metadata, acordeones o listeners. La hidratación reduce
trabajo redundante, pero no elimina el runtime ni todas las tareas largas.

Bundle final: 316,88 kB sin comprimir / 99,77 kB gzip según Vite.
Cobertura local de Home: ~225,6 kB de código sin ejecutar en esa visita.
Esto **no equivale** a los ~52 KiB transferidos estimados por PageSpeed:
cobertura mide rangos del código sin comprimir y depende del recorrido.

Un build diagnóstico con sourcemaps en Temp, fuera del artefacto de producción,
permitió atribuir aproximadamente los rangos sin ejecutar:

| Grupo | Código sin ejecutar, sin comprimir |
| --- | ---: |
| React DOM | 164,6 kB |
| React Router | 23,7 kB |
| React | 5,8 kB |
| Scheduler | 1,5 kB |
| Componentes de páginas | 25,3 kB |
| App, componentes compartidos y datos | 4,0 kB |

El framework representa ~87% del código sin ejecutar; incluye soporte que
puede utilizarse al interactuar. Las páginas completas aportan ~28 kB del
bundle sin comprimir. Contacto, legales, About y publicaciones sí entran en el
bundle por imports estáticos. Los datos de publicaciones también sirven a
metadata y al contenido compartido; separar solo componentes no elimina esos datos.

No se aplicó lazy por ruta: el ahorro potencial de componentes es pequeño y
el scroll manager necesita DOM de destino disponible al restaurar historial
y medir anclas. Coordinar Suspense, carga de rutas y prerender excede esta
optimización dirigida. No se cambió ni reemplazó React/Router.

## Medición y validación

Chromium local, viewport 390×844, CPU ×4, latencia 150 ms y descarga
200.000 bytes/s, contextos nuevos. PerformanceObserver, CDP tracing sin
categorías de screenshots y cobertura JS; no Lighthouse ni PageSpeed remoto.
La instrumentación y los tiempos locales tienen variabilidad.

| Métrica | Antes | Versión final |
| --- | ---: | ---: |
| FCP | 988 ms | 612 ms |
| LCP | 1.848 ms | 1.772 ms |
| CLS, excluyendo interacción reciente | 0,00657 | 0,00657 |
| Peticiones CSS en Home | 1 | 0 |
| Tareas >50 ms observadas | 56 y 106 ms | 74 ms |

En otra ejecución posterior se observaron tareas de 90 y 70 ms: no debe
interpretarse la diferencia de una ejecución como una garantía estadística.
La petición bloqueante desapareció y FCP mejoró ~376 ms en la comparación
mostrada. No se puede prometer recuperar los ~600 ms ni una puntuación 95–100
de producción sin una nueva medición allí.

- `npm run build`: OK; prerender de ocho páginas y 404.
- `npm run lint`: OK.
- `npx wrangler deploy --dry-run`: OK; sin deploy.
- Navegador a 390 y 1440 px: nueve rutas prerenderizadas, entradas directas con
  query/hash, menú, Escape, navegación SPA, ancla de servicios, acordeón móvil
  e historial; sin errores de consola/hidratación. Altura de header: 72/92 px.
- Se mantuvieron imágenes: ahorro reportado de ~6 KiB no justifica intervenir.

Referencias de implementación:
[CSS y ruta crítica](https://web.dev/articles/critical-rendering-path/page-speed-rules-and-recommendations),
[coste de inline CSS](https://github.com/GoogleChrome/web.dev/blob/main/src/site/content/en/fast/extract-critical-css/index.md),
[borderBoxSize](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/borderBoxSize).

Commit sugerido: `Optimize critical rendering and runtime performance`.
