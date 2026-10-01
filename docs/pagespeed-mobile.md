# Optimización mobile — 1 de octubre de 2026

Cambios locales, sin deploy ni screenshots. Se conserva el diseño, copy,
estructura visual, accesibilidad y SEO. No se modificó el CSS ni el Worker.
La puntuación mobile 92 corresponde al diagnóstico aportado; no se obtuvo
una nueva puntuación de PageSpeed de producción.

## Logo

Original: `public/images/logo.png`, RGBA, 729 × 342, **103.915 bytes
(101,5 KiB)**. Se conserva como fuente de los exports de favicon y social.
Regeneración: `python scripts/export-logo.py`, usando el Pillow ya disponible.

| Variante WebP | Dimensiones | Bytes | KiB | Ahorro respecto al PNG |
| --- | --- | --- | --- | --- |
| `logo-220.webp` | 220 × 103 | 10.130 | 9,9 | 90,3% |
| `logo-440.webp` | 440 × 206 | 29.878 | 29,2 | 71,2% |

Ambas conservan todo el canvas, sin recortar, con transparencia y compresión
lossless. Se comprobó que los píxeles decodificados son exactamente iguales
al original escalado con Lanczos. No se añadió AVIF: el pipeline existente
usa WebP y esta mejora no requiere otro formato ni dependencias.

Brand comparte `srcset` entre sus dos estados de color y navbar/footer.
`sizes` coincide con el CSS real: navbar 111 px en mobile y 136 px en desktop;
footer 111 px. Se conservan las dimensiones explícitas, `object-fit`, filtro
blanco y transición originales. En Chrome, el caso mobile DPR 1,75 descargó
solo el WebP de 220 px; DPR 3 seleccionó solo el de 440 px. No se descargó
el PNG ni se duplicó la descarga al cambiar de color al hacer scroll.

## Fuentes

El hero necesita estas tres fuentes Latin (los acentos españoles están
incluidos en ese subset):

| Archivo en `/fonts/` | Uso | Bytes |
| --- | --- | --- |
| `-nFnOHM81r4j6k0gjAW3mujVU2B2G_Bx0g.woff2` | DM Serif Display normal, título | 24.744 |
| `-nFhOHM81r4j6k0gjAW3mujVU2B2G_VB0PD2.woff2` | DM Serif Display italic, énfasis del título | 24.572 |
| `rP2Yp2ywxg089UriI5-g4vlH9VoD8Cmcqbu0-K4.woff2` | DM Sans, nombre, navegación y acciones | 36.932 |

Se añade **un solo preload**, para DM Serif Display normal, únicamente en
el head de Home, con `crossorigin="anonymous"` y tipo WOFF2. Antes se
descubría desde el CSS; ahora Chrome confirma iniciador `link`, sin descarga
duplicada. Se mantiene `font-display: swap` en todas las declaraciones.
DM Sans e italic siguen bajo demanda del CSS: ambas ya se necesitan en el
hero, no son fuentes exclusivas de contenido bajo el fold. No se preloadean
pesos adicionales ni los subsets Latin-ext; estos últimos no se solicitaron
en las visitas verificadas. Las declaraciones de DM Sans para varios pesos
referencian el mismo archivo, y Chrome descarga ese archivo una sola vez.

## CSS y JavaScript

El CSS bloquea el render porque Vite genera un `<link rel="stylesheet">`
normal. Los imports se integran en **un único bundle**, sin solicitudes CSS
anidadas ni imports de fuentes externos. Build local: 41,53 kB sin comprimir,
8,68 kB gzip; no equivale necesariamente al tamaño transferido del informe.
Su hash sigue siendo `index-DXPMO9o-.css`, idéntico al build anterior.

Se conserva su carga normal: las hojas actuales mezclan estilos globales,
hero y otras rutas, con overrides dependientes del orden de cascada. No hay
una separación pequeña y evidente que permita diferir CSS sin arriesgar
FOUC, duplicar reglas o alterar el layout. No se introdujo CSS crítico inline.

Las únicas dependencias de runtime son React, React DOM y React Router.
No se encontraron imports muertos ni librerías adicionales prescindibles.
Las rutas actualmente se importan de forma eager; dividirlas exige coordinar
el prerender síncrono y la navegación. Se conserva ese modelo para esta
optimización pequeña. El bundle pasa de 316.001 a 316.093 bytes por los nuevos
atributos responsive; gzip queda en 99,51 kB. No se reclama ahorro de JS.

## Validación

- `npm run build`: OK, 8 páginas públicas y 404; 6 URLs en sitemap.
- `npm run lint`: OK.
- `npx wrangler deploy --dry-run`: OK; no publicó nada.
- Verificación de los 9 HTML: logo responsive, un preload de fuente solo en
  Home, CSS idéntico y preloads responsive del hero intactos.
- Chrome sin screenshots: dimensiones del logo intactas, cambio a estado
  oscuro al hacer scroll, una sola solicitud de logo y ningún error JavaScript.
- Hero conserva `<picture>`, `srcset`, `sizes`, dimensiones, preload por
  media, `fetchPriority="high"`, `loading="eager"` y `decoding="async"`.

Comparación local de una visita por configuración, caché desactivada,
latencia 150 ms, descarga 200.000 bytes/s y CPU 4×. El LCP final sigue siendo
`img.home-hero__architecture` y descarga la misma variante que antes.

| Configuración | LCP antes / después | CLS antes / después |
| --- | --- | --- |
| Mobile 412 × 823, DPR 1,75 | 4,236 / 3,968 s | 0,00808 / 0,00582 |
| Mobile 390 × 844, DPR 3 | 4,136 / 3,912 s | 0,00807 / 0,00599 |
| Desktop 1440 × 900, DPR 1 | 3,872 / 3,464 s | 0,00189 / 0,00117 |

Son observaciones individuales de laboratorio, no una garantía de mejora
de puntuación. El objetivo 95+ deberá comprobarse con PageSpeed tras un
despliegue autorizado por separado.

Commit sugerido: `Optimize logo assets and critical rendering path`.
