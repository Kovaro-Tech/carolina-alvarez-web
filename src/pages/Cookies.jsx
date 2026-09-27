import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

export default function Cookies() {
  return <article className="legal-page container">
    <p className="section-label">Información legal</p>
    <h1>Política de <em>cookies.</em></h1>
    <p className="legal-date">Última actualización: {siteConfig.legalUpdated}</p>
    <h2>Qué es una cookie</h2>
    <p>Una cookie es un pequeño archivo que un sitio guarda en el navegador y que puede enviarse al servidor en visitas posteriores. El almacenamiento de sesión (sessionStorage) es distinto: guarda información local de una pestaña y no se envía automáticamente con las solicitudes.</p>
    <h2>Qué utiliza esta web</h2>
    <p>El código del sitio no crea cookies propias ni integra Google Analytics, Google Tag Manager, Meta Pixel, publicidad, mapas o contenidos de terceros incrustados. Tampoco utiliza localStorage. Las fuentes y fotografías se cargan desde el propio sitio.</p>
    <p>Solo se utiliza almacenamiento técnico de sesión para restablecer la navegación:</p>
    <dl className="legal-storage">
      <dt>Nombre</dt><dd><code>carolina-navigation-v1</code></dd>
      <dt>Tipo y categoría</dt><dd>sessionStorage propio; funcionalidad técnica de navegación.</dd>
      <dt>Responsable</dt><dd>{siteConfig.name}, en este sitio.</dd>
      <dt>Finalidad y contenido</dt><dd>Restaurar la posición de desplazamiento y el área de Servicios abierta al volver a una página. Guarda identificadores de entradas del historial, posiciones y el estado de esa sección; no almacena el contenido de consultas ni datos de contacto.</dd>
      <dt>Duración</dt><dd>La sesión de la pestaña. Normalmente se elimina al cerrarla; el navegador puede conservarlo si restaura una sesión anterior.</dd>
    </dl>
    <h2>Cómo gestionarlo</h2>
    <p>No se solicita consentimiento para analítica o publicidad porque esas tecnologías no están instaladas. No hay preferencias opcionales que aceptar o rechazar ni se guarda una decisión de consentimiento.</p>
    <p>Puedes borrar los datos de este sitio o bloquear el almacenamiento desde los ajustes de tu navegador. La web sigue siendo accesible, aunque puede dejar de recordar la posición o las secciones abiertas entre visitas al historial. Consulta la ayuda de tu navegador para gestionar y eliminar sus datos de sitios web.</p>
    <h2>Enlaces externos y cambios</h2>
    <p>Al abrir WhatsApp o LinkedIn sales a servicios con sus propias políticas. El enlace de correo abre la aplicación que tengas configurada. Esos servicios pueden utilizar cookies o almacenamiento propios fuera de esta web.</p>
    <p>Esta descripción corresponde a la aplicación publicada desde este proyecto. Si el alojamiento incorpora servicios adicionales, o se añade analítica o publicidad, será necesario revisar esta política y bloquear cualquier tecnología opcional hasta obtener el consentimiento correspondiente.</p>
    <p>Para información sobre el tratamiento de tus datos y los canales para ejercer tus derechos, consulta la <Link to="/politica-de-privacidad">Política de Privacidad</Link>.</p>
  </article>
}
