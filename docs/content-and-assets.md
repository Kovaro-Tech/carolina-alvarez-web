# Contenido y recursos visuales

## Criterio editorial

Los títulos, la experiencia institucional, la participación en la defensa de altos cargos públicos en el Caso Apagón y la intervención en la defensa de Novacero, LALIGA de España, DirecTV y Saludsa proceden de la información suministrada para esta iteración. No se añaden fechas, universidades, cargos, resultados procesales ni relaciones profesionales actuales.

La vinculación de la Dirección Nacional de Acceso a los Servicios de Justicia con el Consejo de la Judicatura se contrastó con su [estructura orgánica oficial](https://www.funcionjudicial.gob.ec/lotaip/documentosdirecciones/planificacion/2019/NOVIEMBRE/DNA8-0025-2019.pdf). Esta fuente respalda la relación institucional, no acredita por sí sola la trayectoria personal de Carolina.

Las descripciones de servicios desarrollan las tres áreas indicadas. No incluyen promesas de resultados ni especialidades adicionales.

La [referencia de David Celi Lupera](https://davidcelilupera.ec/) se utilizó como guía de claridad y jerarquía. Los textos y la composición de Carolina son propios.

## Imágenes

- `public/images/institutional-architecture.webp`: fotografía de arquitectura contemporánea de volúmenes angulares descargada de [Unsplash](https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1920&q=85&fm=webp), guardada localmente. Es una imagen ambiental; no representa la oficina de Carolina ni se identifica como una ubicación ecuatoriana.
- `public/images/carolina_3.webp`: fotografía real existente, utilizada en la apertura de Sobre mí.
- `public/images/carolina_4.webp`: segunda fotografía real existente, utilizada junto a la experiencia en defensa, con carga diferida.

## Contacto y publicaciones

Contacto usa los datos existentes de `src/data/siteConfig.js`. Los CTA de Servicios conservan el área elegida y preparan el texto de WhatsApp y el asunto del correo. El formulario anterior solo simulaba una confirmación de envío; se sustituyó por estos canales directos.

`/publicaciones` presenta el primer artículo real de Carolina sobre cooperación internacional y lavado de activos, con página individual y metadatos. Carolina confirmó el 15 de junio de 2025 como fecha real y autorizó el texto completo. El PDF fuente se conserva en `docs/sources/`, fuera de los assets públicos, porque contiene atribución y branding de terceros.

## Exportaciones de producción

`scripts/export-assets.py` exporta iconos cuadrados transparentes desde el logo existente, variantes WebP del retrato de Sobre mí y una imagen social 1200 × 630 con logo y nombre. Los originales se conservan y el diseño de las páginas no cambia. Los archivos exportados están versionados; Python/Pillow y Georgia de Windows solo se necesitan para regenerarlos, no para el build.
