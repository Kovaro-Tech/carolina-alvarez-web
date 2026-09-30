# Preparación final de producción — Carolina Álvarez

> Actualización de despliegue (29 de septiembre de 2026): esta revisión se conserva como registro histórico. La configuración vigente y los pasos de Workers Builds están en [README.md](../README.md). Wrangler ya no declara Custom Domains; workers.dev y previews están habilitados. El Worker conserva los headers y añade HSTS en HTTPS, por lo que no debe duplicarse desde el panel. Las indicaciones anteriores sobre dominios declarados, previews deshabilitados y HSTS pendiente quedan sustituidas por el README.

Revisión: 28 de septiembre de 2026. **Código preparado para Cloudflare Workers + Static Assets; no desplegado.** No se modificaron DNS, cuentas, correo ni Search Console. Sin screenshots, trackers o rediseño.

## A. Cambios realizados

### Identidad, contacto y privacidad

La configuración central está en `src/data/siteConfig.js`:

- Nombre legal: Carolina Anabel Álvarez Espinoza.
- Nombre profesional: Carolina Álvarez.
- Domicilio profesional/legal: IQON, Av. Shyris y Suecia, Quito, Ecuador.
- Teléfono: 0994568705; internacional +593994568705; WhatsApp 593994568705.
- Correo único publicado: contacto@carolinaalvarez.ec. **Debe crearse y probarse antes del lanzamiento.**
- LinkedIn confirmado: https://www.linkedin.com/in/carolina-%C3%A1lvarez-2231402a1/; `linkedinVerified: true`.
- Dominio principal: https://carolinaalvarez.ec, sin www.

Privacidad usa el nombre completo y domicilio confirmado; Contacto, footer, mailto y JSON-LD usan el correo profesional. LinkedIn aparece en footer, Contacto y sameAs. No se inventó oficina, piso, RUC, código postal, horario o coordenadas.

La política describe Cloudflare como alojamiento del dominio principal y WhatsApp como canal. No atribuye el correo a un proveedor todavía no elegido: deberá completarse cuando se active. Se mantienen derechos, finalidades, conservación por finalidad, seguridad y transferencias; aún faltan plazos operativos y garantías concretas. No se presenta esta preparación técnica como certificación jurídica.

No hay formulario ni API de consultas. Los visitantes abren WhatsApp o correo y confirman allí el envío. Se mantienen minimización, enlace a Privacidad y aviso de que la consulta no crea una relación profesional.

### Artículo

La tarjeta y página individual muestran Carolina Álvarez y **15 de junio de 2025**. `datePublished: 2025-06-15` se refleja en BlogPosting y Open Graph. No se añadió dateModified sin fecha real.

Se conserva title/description pertinentes y se propagan dominio, imagen social y autoría confirmada. Person usa nombre legal y alternateName profesional. La publicación completa está autorizada por Carolina.

El PDF fuente contenía atribución y branding de un tercero. Se archivó, sin modificarlo, en `docs/sources/ARTICULO-CAROLINA-ALVAREZ.pdf`, fuera de public/dist, y se retiró su referencia de los datos del artículo. El sitio publica únicamente el contenido atribuido a Carolina; el original no se distribuye como asset.

### Iconos e imágenes

Exportados desde el isotipo existente, preservando proporciones y transparencia y recortando márgenes prácticamente transparentes:

- favicon.ico (16, 32 y 48 px).
- favicon-16x16.png y favicon-32x32.png.
- apple-touch-icon.png (180 × 180).
- icon-192.png e icon-512.png.

Head y manifest apuntan a esos recursos; no quedan iconos de plantilla. El manifest usa identidad, colores existentes y display browser, sin añadir service worker o complejidad PWA.

Retrato de Sobre mí: WebP de 380, 760 y 1140 px, calidad 90, con srcset/sizes y las mismas proporciones. Pesos: **14.776, 38.502 y 83.074 bytes**, frente a 804.550 bytes del WebP anterior. Los originales JPEG/WebP se conservan. El navegador móvil de prueba eligió 380 px para una anchura visible de 340 px; pantallas de más densidad pueden elegir variantes mayores.

Imagen social: `public/images/og-carolina-alvarez.png`, 1200 × 630, 67.999 bytes. Composición sobria con el logo, nombre y paleta existentes. No modifica la web.

Exportación reproducible opcional: `python scripts/export-assets.py`, con Pillow y Georgia instalada en Windows (fallback serif existente). Los assets exportados quedan versionados: el build y Cloudflare no necesitan Python.

### Cloudflare y seguridad

`wrangler.jsonc` configura `dist`, binding ASSETS, los dos Custom Domains, rutas limpias sin barra final y `404-page`. El sitio ya genera HTML por ruta; un fallback SPA indiscriminado convertiría errores reales en páginas 200. [Documentación de SSG y 404](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

`worker.js` ejecuta antes de los assets para redirigir HTTP y www hacia el origen canónico con **308**, preservando path/query. Luego sirve los assets y aplica CSP, nosniff, Referrer-Policy, Permissions-Policy y X-Frame-Options. También aplica noindex HTTP a respuestas 404 y caché larga solo a bundles con hash. No hay backend de consultas ni almacenamiento añadido.

Los headers de Cloudflare se establecen en el Worker, sin duplicarlos en un _headers. CSP permite recursos propios y estilos inline necesarios; bloquea scripts externos, frames, objetos y envíos de formularios. [Headers de Static Assets y respuestas Worker](https://developers.cloudflare.com/workers/static-assets/headers/).

HSTS del dominio nuevo queda pendiente de comprobar HTTPS; no se activa preload ni includeSubDomains. Los entornos workers.dev y previews están deshabilitados para evitar otra copia pública indexable.

`.gitignore` cubre .env*, .vercel, .wrangler, .dev.vars*, dist, node_modules, logs, screenshots, browser-data y temporales. No se añadieron credenciales. Wrangler está instalado solo como herramienta de desarrollo/despliegue.

### Cookies y trackers

**¿Hace falta banner de cookies? No.**

No se detectan Google Analytics, GTM, Meta Pixel, Hotjar, Clarity, embeds, CAPTCHA, fuentes externas, cookies opcionales o localStorage de tracking. Se mantiene exclusivamente `sessionStorage: carolina-navigation-v1` para restaurar scroll y acordeón. Políticas y enlaces permanecen accesibles.

La navegación probada en el runtime local de Cloudflare no creó cookies ni localStorage ni solicitó terceros. Repetir después del deploy porque el panel de Cloudflare podría activar servicios no representados en el repositorio. No habilitar Web Analytics u otras inyecciones sin reauditar.

## B. Todo listo para deploy — alcance técnico

- [x] Build: ocho páginas públicas y 404; sitemap con seis URL.
- [x] Todas las canonical, og:url, JSON-LD, imágenes sociales, sitemap y robots usan carolinaalvarez.ec.
- [x] Políticas noindex fuera del sitemap; robots permite indexación pública y assets.
- [x] Article con fecha confirmada, autora, metadatos y LinkedIn.
- [x] Iconos, manifest e imagen social exportados y enlazados.
- [x] npm run build y npm run lint correctos.
- [x] npm audit: cero vulnerabilidades.
- [x] npm run check:cloudflare: dry-run correcto con Wrangler 4.143.0; no publica.
- [x] Runtime local de Cloudflare: ocho rutas 200 y 404 reales para ruta/artículo inexistentes y antiguo PDF.
- [x] Doce casos de redirección HTTP/www del Worker, con rutas, caracteres codificados y parámetros repetidos, conservan path/query.
- [x] Normalización de .html/barra final del servidor de assets conserva query (307); la redirección de dominio es 308.
- [x] Headers comprobados en respuestas 200/404.
- [x] Dieciocho comprobaciones Axe (nueve rutas × escritorio/móvil) sin infracciones; sin overflow, imágenes rotas o errores JavaScript/CSP.
- [x] Menú móvil, Escape/devolución de foco y navegación con reduced motion comprobados.
- [ ] Activar el dominio, certificado y correo y repetir comprobaciones públicas.
- [ ] Completar condiciones reales del proveedor de correo y conservación.

El 28 de septiembre, la consulta DNS de A, NS y MX de carolinaalvarez.ec devolvió ENOTFOUND desde este entorno. No se afirma que esté registrado, conectado o que el buzón funcione. La prueba local tampoco valida certificados o recepción de correo.

### Comandos preparados

```sh
npm ci
npm run build
npm run lint
npm audit
npm run check:cloudflare
npm run preview:cloudflare
```

Preview ejecuta Wrangler local con upstream localhost para evitar que los dominios configurados conviertan la redirección HTTPS en un bucle de desarrollo.

Solo cuando dominio y cuenta estén listos:

```sh
npx wrangler login
npm run deploy
```

Deploy usa el dist ya construido. En Workers Builds con Git: repositorio actual, directorio raíz, rama de producción confirmada, build `npm run build` y deploy `npm run deploy`. No elegir un preset que sustituya nuestro build por solo vite build, porque se perdería el prerender. No se ejecutó login/deploy en esta sesión.

## C. Pasos manuales en Cloudflare

1. Registrar o comprobar la titularidad de **carolinaalvarez.ec**.
2. En Cloudflare, añadir/conectar el dominio a la cuenta que alojará el Worker. Revisar los registros importados antes de cambiar nada. Si el registrador es externo, sustituir los nameservers por los dos exactos indicados para esa zona. Si ya está gestionado en Cloudflare, no cambiarlos innecesariamente. Revisar DNSSEC/DS durante una migración. [Alta de dominio](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/).
3. Preservar los MX y TXT de correo existentes (SPF, DKIM, DMARC y verificaciones). No sustituirlos para conectar la web.
4. Con la zona activa en la misma cuenta, desplegar el Worker. `wrangler.jsonc` declara Custom Domains **carolinaalvarez.ec** y **www.carolinaalvarez.ec**. Cloudflare crea los registros y certificados correspondientes; **no inventar A/CNAME ni apuntar a una IP de Vercel**. Si existe un registro web conflictivo, revisar y retirar solo ese registro, conservando correo. [Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
5. En Workers & Pages → carolina-alvarez-web → Settings → Domains & Routes, comprobar ambos dominios. Si se conectan desde el panel, elegir Custom Domain con esos mismos nombres, sin rutas wildcard.
6. El Worker ya hace **www → sin www con 308**. No crear otra regla equivalente. Verificar que `https://www.carolinaalvarez.ec/contacto?area=penal` apunta a `https://carolinaalvarez.ec/contacto?area=penal`.
7. Comprobar certificado activo en raíz y www, HTTPS y HTTP → HTTPS. El Worker cubre ambos hosts; Always Use HTTPS de la zona es una opción adicional, no necesaria para duplicar la regla existente. No configurar modo Flexible para un origen externo. Este despliegue sirve directamente desde Workers/Static Assets. [HTTPS en Cloudflare](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https/).
8. Tras verificar HTTPS, evaluar HSTS en SSL/TLS → Edge Certificates, inicialmente con plazo prudente, **sin preload/includeSubDomains**. No duplicar el header en Worker y panel.
9. Repetir rutas 200/404, headers, cookies, iconos, teléfonos, correo, LinkedIn, sitemap y canonical en el dominio final. Probar lectura/teclado en dispositivos reales y revisar el artículo.
10. Mantener Vercel solo temporalmente. Después de comprobar el dominio final, redirigir permanentemente el subdominio temporal al definitivo en el hosting que lo sirve, conservando path/query, o retirarlo de forma controlada.

### Referencias a Vercel y al temporal

- Se conserva `vercel.json` sin borrarlo: sirve al entorno temporal y Cloudflare no lo usa. Su HSTS existente no se traslada automáticamente al dominio nuevo.
- No quedan referencias a Vercel o al subdominio temporal en el código público ni en los metadatos generados.
- El temporal `carolinaalvarez.kovarotech.com` solo se menciona aquí para documentar su retirada/redirección; no es canonical.
- Tras retirar definitivamente el entorno temporal se puede eliminar vercel.json. No es necesario hacerlo ahora.
- El enlace de crédito a kovarotech.com se conserva: es un enlace comercial existente, no el subdominio temporal.

## D. Crear contacto@carolinaalvarez.ec

1. Elegir si se necesita solo recepción/reenvío o un buzón con envío.
2. Para recepción: Cloudflare → Email Service / Email Routing → incorporar carolinaalvarez.ec. Verificar la dirección de destino autorizada por Carolina.
3. Crear la dirección personalizada **contacto@carolinaalvarez.ec** y la regla de reenvío al destino verificado. Revisar los MX/TXT exactos que Cloudflare propone. Si existe otro proveedor de correo, resolver esa migración antes de reemplazar MX; no mantener SPF duplicados.
4. Probar recepción desde una cuenta externa y comprobar spam, entrega y respuesta. No se enviaron correos de prueba automáticamente.
5. **Email Routing por sí solo no es un buzón SMTP completo.** Para enviar como contacto@ se necesita un servicio de envío/buzón adecuado y configurar autenticación SPF/DKIM/DMARC según ese proveedor. No confundir reenvío con una identidad de remitente ya operativa.
6. Registrar proveedor elegido, destino del reenvío, personas con acceso, retención y garantías de transferencias. Actualizar Privacidad para describir esa operación real antes del lanzamiento.

Referencias: [configurar Email Routing](https://developers.cloudflare.com/email-service/get-started/route-emails/) y [registros para enviar/recibir correo](https://developers.cloudflare.com/dns/manage-dns-records/how-to/email-records/). No se instaló ni contrató ningún servicio de correo.

## E. Search Console — manual

1. Desplegar carolinaalvarez.ec.
2. Comprobar HTTPS y acceso público sin autenticación.
3. Crear propiedad de tipo **Dominio** en Google Search Console.
4. Verificar con el TXT exacto proporcionado por Google.
5. Enviar **https://carolinaalvarez.ec/sitemap.xml**.
6. Inspeccionar **https://carolinaalvarez.ec/**.
7. Inspeccionar **https://carolinaalvarez.ec/publicaciones/cooperacion-internacional-asistencia-judicial-lavado-activos-ecuador**.
8. Solicitar indexación de ambas.
9. Revisar posteriormente indexación y canonical elegida. La solicitud no garantiza indexación inmediata; las políticas deben seguir excluidas por noindex.

[Documentación de Google](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl). No se configuró Search Console automáticamente.

## F. Datos que siguen faltando

- Acceso/estado real del dominio y cuenta Cloudflare; rama de despliegue confirmada.
- Activación del correo, proveedor de envío si se necesita y destino autorizado del reenvío.
- Plazos operativos de conservación/borrado, personas autorizadas y garantías contractuales de transferencias.
- Confirmar si corresponde delegado de protección de datos para la actividad y, si aplica, sus datos.
- No faltan nombre, domicilio, teléfono, LinkedIn, fecha ni autorización del artículo: ya están confirmados.

Commit sugerido: `Prepare Carolina Alvarez site for production launch`.
