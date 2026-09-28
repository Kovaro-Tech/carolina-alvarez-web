# Carolina Álvarez — sitio profesional

React, Vite y React Router con HTML prerenderizado. Producción: Cloudflare Workers + Static Assets en https://carolinaalvarez.ec.

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

Una vez activados dominio y correo, autenticar con `npx wrangler login` y ejecutar `npm run deploy` sobre el build validado. Estos comandos no se ejecutaron automáticamente. En Workers Builds: build `npm run build`, deploy `npm run deploy`.

SITE_URL, identidad, contactos, LinkedIn, iconos e imagen social se centralizan en src/data/siteConfig.js. Añadir artículos aprobados a src/data/publications.js; build integra sus rutas, JSON-LD y sitemap.

Los assets exportados están versionados. Solo para regenerarlos: `python scripts/export-assets.py` (Pillow y Georgia de Windows); el deploy no requiere Python. Los originales se conservan. El PDF fuente se archiva en docs/sources y no se publica.

vercel.json se conserva exclusivamente para el entorno temporal. No configura la producción en Cloudflare.

Consultar la [checklist final](docs/production.md) para DNS, correo, HTTPS, privacidad, Search Console y resultados de validación.
