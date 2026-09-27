# Pasada de producción — 27 de septiembre de 2026

## Auditoría real

- No hay formulario, backend, envío simulado, API de consultas, credenciales en frontend ni base de datos. Contacto usa `wa.me` y `mailto:`. El visitante confirma el envío en su aplicación. No se añadió formulario ni checkbox.
- No se encontraron cookies propias, GA, GTM, Meta Pixel, analítica, publicidad, mapas, iframes o scripts externos en el código. No se detectó `Set-Cookie` en la respuesta HEAD del dominio público durante la revisión. Esto no equivale a una inspección de la configuración privada del hosting ni de todos los flujos de sus servicios.
- Existe `sessionStorage` con clave `carolina-navigation-v1`: desplazamiento y acordeón de Servicios por entrada del historial. No existe `localStorage`. No se envía ese estado a servidores.
- Google Fonts era una conexión externa real. Se descargaron las mismas familias, estilos y pesos en WOFF2 (latín y latín extendido), con sus licencias OFL, para servirlos desde el mismo dominio. No se cambió la tipografía.
- WhatsApp, Gmail y LinkedIn son destinos de enlaces; no son embeds. Vercel está confirmado por los encabezados `Server: Vercel` y `X-Vercel-Id` del dominio HTTPS. No se accedió a su cuenta administrativa.
- Las imágenes activas ya tienen dimensiones, alt descriptivo (o vacío en arquitectura decorativa), prioridad en la apertura y lazy loading en la fotografía inferior. Se conservaron sin cambios.

## Privacidad y consentimiento

Las políticas describen contacto directo y almacenamiento técnico. Sin tecnologías opcionales, no hay banner, categorías ficticias, preferencia persistida ni enlace de configuración vacío. Los avisos de finalidad y confidencialidad están junto a los canales reales.

Antes de añadir analítica: actualizar inventario y políticas, implementar Aceptar/Rechazar/Configurar con opciones desactivadas por defecto, impedir la descarga e inicialización del servicio hasta consentimiento, permitir revocación desde el footer y revisar CSP. No basta con que un tracker deje de enviar eventos: tampoco debe cargarse antes del permiso. No se instaló analítica ni un sistema de consentimiento sin uso.

Fuentes consultadas: [LOPDP](https://www.gob.ec/regulaciones/ley-organica-proteccion-datos-personales), [Reglamento General](https://gobec-dev02.gobiernoelectronico.gob.ec/regulaciones/reglamento-general-ley-organica-proteccion-datos-personales-0), [información al titular del artículo 12](https://www.registroficial.gob.ec/267223-2/), [normativa SPDP sobre transferencias](https://spdp.gob.ec/resolucion_0024/), [Vercel](https://vercel.com/legal/privacy-notice), [Google](https://policies.google.com/privacy?hl=es) y [WhatsApp](https://www.whatsapp.com/legal/privacy-policy). Son textos informativos; no una certificación de cumplimiento.

## SEO, generación y despliegue

`src/data/siteConfig.js` centraliza dominio, contactos, LinkedIn, iconos e imagen social. `src/data/seo.js` define metadatos y datos estructurados compartidos por build y navegación cliente.

`npm run build` genera HTML completo por ruta mediante React y Vite, sin navegador ni screenshots. Cada documento contiene title, description, canonical individual, Open Graph, Twitter Card y robots antes de ejecutar JavaScript. El cliente monta la aplicación sobre la salida estática; no usa hidratación, porque la query de Contacto y el estado de historial pueden diferir del documento generado.

La portada contiene Person y [LegalService](https://schema.org/LegalService), sin dirección inventada, ratings ni artículos ficticios. LinkedIn queda fuera de `sameAs` mientras `linkedinVerified` sea falso. Las páginas legales y 404 tienen noindex; las cinco rutas comerciales están en sitemap, sin fechas inventadas.

`scripts/prerender.mjs` genera en `dist/`:

- `index.html`, `sobre-mi.html`, `servicios.html`, `contacto.html`, `publicaciones.html`.
- `politica-de-privacidad.html`, `politica-de-cookies.html`, `404.html`.
- `robots.txt`, `sitemap.xml`, `site.webmanifest`.

Vercel sirve las páginas con `cleanUrls: true`; no hace falta reescribir todo a Home. Las URL desconocidas usan `404.html` con el comportamiento 404 del alojamiento ([documentación de Vercel](https://vercel.com/blog/changelog-june-2020)). Confirmar esto después del deploy; el fallback del servidor de desarrollo de Vite no reproduce todos los estados HTTP de Vercel.

`vercel.json` configura CSP, protección de frames, nosniff, política de referer, restricciones de permisos y HSTS. CSP solo permite recursos del propio origen; los estilos inline son necesarios para la navegación animada existente. No hay backend al que aplicar validación o rate limiting. Las medidas de cuenta/hosting deben gestionarse en esos servicios.

## Imagen social y favicon

La imagen social temporal es la fotografía profesional existente `public/images/carolina_3.jpeg` (1074 × 1074, unos 150 kB). No se alteraron fotos ni se generó arte nuevo. Puede sustituirse por una versión aprobada de 1200 × 630 actualizando `socialImage`.

Se mantiene `public/favicon.svg`, que todavía es el icono de plantilla, porque no existe un archivo final del logo. `siteConfig.icons` prepara `ico`, `png32`, `png16` y `apple`; están a `null` para no enlazar recursos inexistentes. Al recibir los archivos, colocarlos en `public/`, actualizar esas rutas y reconstruir. El manifest utiliza el icono disponible. No se generó un logo nuevo.

## Publicaciones reales futuras

Añadir entradas aprobadas a `src/data/publications.js` con slug, title, description, datePublished y paragraphs; dateModified e image son opcionales. Se crean la página `/publicaciones/slug`, el enlace en el índice, los metadatos, BlogPosting y la entrada en sitemap durante build. No añadir entradas de ejemplo ni fechas estimadas. Al publicar el primer artículo, actualizar también la descripción del índice que actualmente dice «Próximamente».

## Datos pendientes con Carolina / administrador

- URL exacta de LinkedIn: el valor heredado contiene «áálvarez». No se adivinó una identidad alternativa. Corregir el valor y activar `linkedinVerified` solo tras confirmación.
- Logo final e iconos; imagen social horizontal aprobada si se desea.
- Domicilio legal para completar la información del responsable, sin inventar una dirección pública.
- Condiciones reales de las cuentas Gmail/WhatsApp y alojamiento: accesos autorizados, conservación/borrado, registros técnicos, encargados, destinos y garantías de transferencias internacionales. No se inventaron plazos ni acuerdos.
- Confirmar si existe una obligación de designar delegado de protección de datos para su actividad y, si aplica, facilitar su contacto. No se presume su existencia.

## Pasos posteriores al deploy

1. Publicar `dist` usando la configuración incluida y comprobar HTTPS, entrada directa y refresco de las siete rutas, y status 404 en una URL inexistente.
2. Revisar las cabeceras de seguridad, carga de fuentes locales, imagen social, favicon, manifest, robots y sitemap. Verificar que el panel del hosting no inyecte analítica o servicios adicionales; si lo hace, actualizar inventario, políticas y consentimiento antes de habilitarlos.
3. Comprobar WhatsApp, correo y LinkedIn confirmado; verificar teclado, menú móvil y enlaces legales en dispositivos reales.
4. En Google Search Console: verificar dominio/subdominio, enviar `https://carolinaalvarez.kovarotech.com/sitemap.xml`, inspeccionar Home, solicitar indexación y revisar el informe de páginas/cobertura. Las legales deben constar como excluidas por noindex.
5. Revisar las tarjetas en los depuradores de redes y el JSON-LD en un validador. No se conectó Search Console ni se desplegó desde esta sesión.
