# Carolina Álvarez — sitio profesional

React, Vite y React Router con HTML prerenderizado. Preparado para Cloudflare Workers + Static Assets; el dominio final se conectará después desde Cloudflare.

```sh
npm ci
npm run dev
npm run build
npm run lint
npm audit
npm run check:cloudflare
npm run preview:cloudflare
```

Build genera dist con ocho páginas públicas, 404, sitemap, robots y manifest. Cloudflare usa wrangler.jsonc y worker.js para rutas, redirección permanente www/HTTPS y headers. No hay formulario ni API de consultas; Contacto abre WhatsApp o correo.

En Cloudflare Workers Builds, conectar el repo `Kovaro-Tech/carolina-alvarez-web`, seleccionar la rama de producción y usar la raíz del repositorio como directorio:

- Worker: `carolina-alvarez-web`.
- Build command: `npm run build`.
- Deploy command: `npx wrangler deploy`.
- Preview command: `npx wrangler preview`.
- Enable Preview builds: **ON** para las ramas que se quieran probar.

Wrangler ya es una devDependency y `package-lock.json` fija su versión para CI (`npm ci`). El comando `npx wrangler preview` publica un preview de rama; `npm run preview:cloudflare` solo ejecuta el runtime local. La conexión de GitHub y la activación de builds se realizan en el panel; no se ejecutó ningún deploy ni preview remoto durante esta preparación. [Previews de ramas](https://developers.cloudflare.com/workers/ci-cd/builds/build-branches/).

`wrangler.jsonc` sirve `./dist` mediante el binding `ASSETS`, habilita workers.dev y URLs de preview y no declara dominios ni routes. Se retiraron los Custom Domains anteriores porque el deploy base no debe conectar todavía el dominio final. La redirección existente del Worker solo afecta a esos hosts finales, no a workers.dev ni a previews.

Se conserva `not_found_handling: "404-page"` y `html_handling: "drop-trailing-slash"`: el build genera HTML para todas las rutas válidas, incluidos los slugs publicados. Las entradas directas reciben 200 y React Router mantiene la navegación SPA; las rutas o slugs inexistentes reciben `404.html` con HTTP 404 y la 404 de React. Nuevas publicaciones requieren un build. Un fallback global `single-page-application` convertiría esas respuestas en 200, por eso no corresponde al prerender existente. [SSG y 404 de Cloudflare](https://developers.cloudflare.com/workers/static-assets/routing/static-site-generation/).

Se conserva el Worker existente con `run_worker_first: true` para mantener headers en todas las respuestas, `X-Robots-Tag: noindex` condicionado al estado 404 y caché larga solo para bundles que responden 200. No se añade otro Worker ni `_headers`: este último no permite condicionar reglas al estado HTTP. CSP, nosniff, Referrer-Policy, Permissions-Policy y X-Frame-Options permanecen; HTTPS también conserva el HSTS de Vercel (`max-age=31536000`, sin preload/includeSubDomains). No duplicar estos headers desde el panel. [Headers de Static Assets](https://developers.cloudflare.com/workers/static-assets/headers/).

SITE_URL, identidad, contactos, LinkedIn, iconos e imagen social se centralizan en src/data/siteConfig.js. Añadir artículos aprobados a src/data/publications.js; build integra sus rutas, JSON-LD y sitemap.

El dominio definitivo es **https://carolinaalvareze.com**, sin www. El Worker redirige **https://www.carolinaalvareze.com** al dominio principal con **308**, conservando ruta y parámetros, cuando ambos dominios estén conectados desde Cloudflare. No se configura DNS desde código.

El único correo público activo es **carolinaanaalvarez15@gmail.com**. Cuando Carolina configure correo profesional con el dominio, reemplazar el Gmail centralizado en siteConfig.

Los assets exportados están versionados. Solo para regenerarlos: `python scripts/export-assets.py` (Pillow y Georgia de Windows); el deploy no requiere Python. Los originales se conservan. El PDF fuente se archiva en docs/sources y no se publica.

vercel.json se conserva exclusivamente para el entorno temporal. No configura la producción en Cloudflare.

Consultar la [checklist histórica](docs/production.md) para DNS, correo, HTTPS, privacidad, Search Console y resultados de la revisión anterior; para el deploy base y previews prevalecen las instrucciones de este README.
