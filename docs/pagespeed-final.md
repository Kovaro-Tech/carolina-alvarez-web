# Optimización final de PageSpeed — 30 de septiembre de 2026

Preparada localmente, sin deploy, screenshots, trackers, cookies opcionales,
cambios de diseño, copy o metadatos SEO. La CSP del Worker no se modificó:
`script-src 'self'` sigue vigente.

## LCP identificado y cambios

Un `PerformanceObserver` en Chrome sobre la Home de producción confirmó que
el último elemento LCP es `img.home-hero__architecture`, antes servido desde
`/images/institutional-architecture.webp`: WebP, 1920 × 1280, 260.014 bytes.
El H1 aparece como candidato previo, pero la imagen es el LCP final en móvil
y escritorio. Ya era un `<img>` con prioridad alta, no un background CSS.
React prerenderizaba su preload dentro del body.

Se añadieron variantes WebP en `<picture>` con `srcset` y `sizes`,
`loading="eager"`, `decoding="async"` y `fetchPriority="high"`. El preload
responsive ahora está en el head, solo en Home, con condiciones de media
mutuamente excluyentes: se descarga una sola variante, incluido el límite
de 760 px. Los atributos de dimensiones y todo el CSS se mantienen.

En móvil se exportan solo los píxeles que pueden aparecer en el encuadre:
1408 × 1280 desde la posición horizontal existente del 72%, con versiones
de 704, 1056 y 1408 px. `object-fit: cover` y la posición original conservan
la composición visible. Escritorio usa versiones completas de 1056, 1440
y 1920 px. El original se conserva. Regenerar con
`python scripts/export-hero.py` (Pillow).

En el móvil medido (412 × 823, DPR 1,75) se seleccionó el WebP de 143.820
bytes: reducción del 44,7%. En escritorio de 1440 px con DPR 1 se seleccionó
el WebP de 109.006 bytes. Las fuentes locales ya usan `font-display: swap`;
no se añadieron preloads de fuentes. El CSS compilado conserva exactamente
el mismo hash y no contiene imports de fuentes externos pendientes.

Comparación local de builds antes/después, caché desactivada, latencia de
150 ms, descarga de 200.000 bytes/s y CPU ralentizada 4×:

| Caso | LCP anterior | LCP optimizado | CLS anterior / optimizado |
| --- | --- | --- | --- |
| Móvil 412 × 823, DPR 1,75 | 3,168 s | 2,588 s | 0,00847 / 0,00847 |
| Escritorio 1440 × 900, DPR 1 | 3,176 s | 2,528 s | 0,00189 / 0,00189 |

Son mediciones de laboratorio individuales, no una nueva puntuación de
PageSpeed de producción. Hay que repetir PageSpeed después del despliegue.

## Beacon y acción manual en Cloudflare

La revisión del repositorio no encontró `beacon.min.js`,
`static.cloudflareinsights.com` ni `data-cf-beacon` en index.html, React,
Worker, scripts o templates. Las menciones en este documento son informativas.
El error de PageSpeed aportado es consistente con la inyección automática
desde Cloudflare, no con un script agregado por la aplicación.

En las visitas de verificación actuales (HTML y Chrome móvil/escritorio)
no apareció el beacon ni el error de CSP. Por tanto, no se reprodujo en esas
visitas y no se verificó el estado del dashboard. Esa ausencia no permite
confirmar que la inyección esté desactivada para todos los visitantes.

**Cloudflare Web Analytics debe desactivarse desde el dashboard para eliminar
el beacon bloqueado por CSP.**

Revisar **Analytics / Web Analytics / Browser Insights** para
**carolinaalvareze.com**. En **Web Analytics → Manage site**, seleccionar
**Disable** para desactivar la inyección automática. Si RUM está habilitado
desde Observatory, revisar también esa configuración del mismo hostname.
No añadir el dominio del beacon, `unsafe-inline` ni `unsafe-eval` a script-src.
La documentación de Cloudflare confirma que Disable impide la inyección:
https://developers.cloudflare.com/web-analytics/get-started/#sites-proxied-through-cloudflare

Después de desactivarlo, repetir PageSpeed y comprobar la desaparición del
error de consola/CSP relacionado; no se garantiza una puntuación antes de
esa nueva medición.

## Validación

- `npm run build`: correcto, ocho rutas públicas y 404 prerenderizadas.
- `npm run lint`: correcto.
- `npm run check:cloudflare`: dry-run correcto, sin deploy real.
- Chrome a 320, 412, 760, 761, 1000 y 1440 px, varios DPR: sin overflow,
  imágenes rotas ni errores JS; una sola descarga de hero por carga inicial.
- Navegación Home → Servicios → Home comprobada.
- Preload del hero ausente en las demás rutas revisadas.

Commit sugerido: `Optimize LCP and remove Cloudflare analytics conflict`.
