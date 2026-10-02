# Bundle inicial y recursos críticos — 1 de octubre de 2026

Cambios locales, sin deploy ni screenshots. Se conservan diseño, copy, SEO,
prerender, rutas directas, CSP y configuración de Cloudflare.

## Arranque de JavaScript

Todas las páginas se importaban de forma estática en `App.jsx` y el HTML
de Home cargaba un único módulo de 316,9 kB (98,4 kB gzip) en paralelo con
el hero y las fuentes.

- `src/main.jsx` es ahora un entry de 2,5 kB (1,2 kB gzip) con todo el CSS
  global, en el mismo orden de cascada. Importa `src/client.jsx` (React,
  router y App) tras el evento `load`, en la primera interacción
  (`pointerdown`, `keydown`, `touchstart`, `wheel`, `scroll`) o a los 4 s.
- Antes de eso la página prerenderizada es funcional como HTML: los enlaces
  navegan por completo. El botón de menú y el header sólido al hacer scroll
  esperan a React; el scroll temprano dispara su carga.
- `client.jsx` precarga el chunk de la ruta actual y monta dentro de
  `startTransition`: la hidratación de Home se trocea en lugar de ser una
  tarea larga. Si el chunk no carga, queda el HTML prerenderizado.

## Code splitting por ruta

`src/routes.js` define los imports dinámicos de About, Services, Contact,
Publications, Publication, Privacy y Cookies. Home y NotFound siguen en el
bundle principal. Cada página precargada se renderiza directamente; nunca
se muestra el fallback de `Suspense`, que está fuera del `<main>` con key para
que las transiciones de React Router conserven la página actual.

`NavigationShell` precarga el chunk al mostrar intención (hover, foco,
touch) y en el clic, en paralelo a la animación de salida; el scroll a anclas
mide siempre contenido real. Un chunk que falla abre la URL de forma nativa.
El prerender llama a `preloadAllRoutes()` y comprueba que no haya marcas de
Suspense pendientes.

`PageMeta` no reescribe el `<head>` en la carga inicial de producción: el
prerender ya lo trae correcto para cada URL, incluida la 404. `seo.js` y
el texto del artículo se cargan solo en navegaciones SPA.

## Resultado del bundle

| | Antes | Después |
| --- | ---: | ---: |
| JS antes de `load` en Home | 316,9 kB / 98,4 kB gzip | 2,5 kB / 1,2 kB gzip |
| JS total que ejecuta Home | 316,9 kB / 98,4 kB gzip | 286,2 kB / 91,3 kB gzip |
| Chunks JS | 1 | 12 |
| Código de páginas internas en Home | ~25 kB + 9 kB de datos | 0 |

Composición del JS de Home después: react-dom 207,5 kB, react-router 38,1 kB,
react 8,3 kB, scheduler 3,5 kB y código propio ~22 kB (sin comprimir).
React DOM y el router son ~92% y no se pueden reducir sin cambiar de
framework; Lighthouse seguirá marcando JS sin usar, pero ya no compite con
el LCP. No se reemplazó React Router (ahorro ~13 kB gzip) por el riesgo
sobre historial, claves y restauración de scroll.

## Fuentes

`scripts/subset-fonts.py` (fonttools + brotli) genera un archivo "core" por
cada fuente latina: ASCII, letras y signos del español y puntuación
tipográfica. `fonts.css` lo sirve con su `unicode-range` y mantiene el archivo
original de Google para el resto de caracteres latinos. Los contornos y
avances son idénticos en los pesos 400–700; se conserva el kerning.

| Fuente en Home | Antes | Después |
| --- | ---: | ---: |
| DM Serif Display, título (preload) | 24.744 B | 18.720 B |
| DM Serif Display italic, «estrategia» | 24.572 B | 18.760 B |
| DM Sans, texto y navegación | 36.932 B | 27.720 B |

Si se publica texto con un carácter latino fuera del core, se descarga el
archivo original automáticamente; el script avisa al ejecutarlo.

## Imágenes

- Logo: AVIF calidad 85 en `<picture>` con el WebP sin pérdida de respaldo:
  10.130 → 5.178 B (220w) y 29.878 → 10.353 B (440w), PSNR ≥ 44,9 dB sobre
  los fondos del header. `picture { display: contents }` mantiene cada imagen
  como ítem del grid.
- Hero: variantes AVIF con la calidad mínima cuya PSNR iguala o supera la del
  WebP de cada tamaño (q70–74). Móvil 1408w: 143.820 → 117.841 B. Los preloads
  usan `type="image/avif"`; los navegadores sin AVIF usan el WebP sin preload.
  Se conservan dimensiones, `sizes`, `fetchpriority` y medias excluyentes.

## CSS

Se eliminaron 84 selectores de una plantilla anterior (`.hero`, `.services`,
`.consultation`, `.contact-form`…) que ninguna página renderiza. Las 507 reglas
vivas del CSS compilado son idénticas en contenido y orden. CSS: 41,5 kB / 8,7
kB gzip → 39,9 kB / 7,8 kB gzip. No se separó CSS por ruta: cargar estilos de
página después del global altera el orden de la cascada y no se puede
verificar sin capturas.

## Corrección de scroll en entradas directas

Toda carga completa sin estado de historial comparte la clave `default`.
Visitar `/servicios#derecho-tributario` en la misma pestaña tras otra carga
completa restauraba la posición de la página anterior (también antes de
estos cambios). Ahora la primera restauración solo ocurre en recarga o
atrás/adelante. Si el visitante ya hizo scroll antes de que React arranque,
se mantiene su posición.

## Validación

Chrome local por CDP (sin screenshots ni Lighthouse), Worker de Wrangler,
412 × 823 DPR 1,75, RTT 150 ms, 1,6 Mbps, CPU ×4, sin caché. Mediana de 5:

| Métrica | Antes | Después |
| --- | ---: | ---: |
| FCP | 808 ms | 764 ms |
| LCP (imagen hero) | 2.072 ms | 1.348 ms |
| TBT (long tasks tras FCP) | 77 ms | 56 ms |
| CLS | 0,0058 | 0 |
| Bytes hasta el LCP | 346 KB | 199 KB |
| Evento `load` | 2.053 ms | 1.318 ms |

- Geometría, fuente, color y opacidad de cada elemento idénticos frente al
  build anterior: 9 rutas × 412/900/1440 px, más Home con scroll.
- 42 comprobaciones funcionales: rutas directas, 404, query/hash, menú,
  Escape, navegación SPA, anclas, historial, recarga, metadata y consola.
- `npm run build` (8 páginas + 404), `npm run lint`, `npm run dev` y
  `npx wrangler deploy --dry-run`: OK.

Son mediciones locales; la puntuación real requiere PageSpeed tras el deploy.
