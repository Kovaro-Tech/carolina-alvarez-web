import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

export default function Privacy() {
  return <article className="legal-page container">
    <p className="section-label">Información legal</p>
    <h1>Política de <em>privacidad.</em></h1>
    <p className="legal-date">Última actualización: {siteConfig.legalUpdated}</p>
    <p>Esta política explica el tratamiento de datos relacionado con este sitio y los canales de contacto de Carolina Álvarez, con referencia a la Ley Orgánica de Protección de Datos Personales del Ecuador (LOPDP), su Reglamento General y la normativa aplicable.</p>

    <h2>Responsable del tratamiento</h2>
    <p>{siteConfig.legalName}, conocida profesionalmente como {siteConfig.name}. Domicilio profesional y legal: {siteConfig.legalAddress}. Puedes dirigir tus consultas sobre privacidad a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> o al teléfono <a href={`tel:${siteConfig.telephone}`}>+593 99 456 8705</a>.</p>

    <h2>Datos y canales de contacto</h2>
    <p>El sitio no tiene un formulario de envío ni una base de datos de consultas. Los botones de contacto abren WhatsApp o tu aplicación de correo; el mensaje solo se envía cuando decides hacerlo en ese servicio. Elegir un área de práctica prepara un texto de consulta, sin enviarlo automáticamente. Las comunicaciones enviadas pueden quedar almacenadas en las cuentas de WhatsApp y correo utilizadas para atenderte.</p>
    <p>Si escribes por esos canales, Carolina puede recibir tu nombre o identificación de perfil, teléfono o correo, el área de consulta y el contenido que decidas comunicar. La información procede de ti; no se obtienen datos de fuentes externas a través del sitio.</p>
    <p>Comparte únicamente lo necesario para coordinar la atención. Evita incluir información sensible o confidencial innecesaria. Los detalles del caso podrán tratarse posteriormente por un canal adecuado.</p>

    <h2>Finalidades y base del tratamiento</h2>
    <p>Los datos de contacto y el mensaje se utilizan para responder tu consulta, contactarte, coordinar una asesoría y gestionar las comunicaciones que solicites. Cuando la consulta busca contratar una asesoría, el tratamiento necesario para atenderla se apoya en las medidas precontractuales solicitadas por ti. Cuando un tratamiento requiera consentimiento, deberá solicitarse de forma específica e informada y podrás revocarlo.</p>
    <p>No hay suscripciones comerciales, campañas de marketing, elaboración de perfiles ni decisiones automatizadas en el sitio. Una eventual prestación de servicios jurídicos podrá requerir información adicional sobre el tratamiento correspondiente.</p>
    <p>Contactar es voluntario. Sin un medio de respuesta o sin información suficiente puede no ser posible atender la consulta; los datos incorrectos pueden impedir el contacto. No necesitas compartir detalles del caso para navegar por la web.</p>

    <h2>Almacenamiento técnico</h2>
    <p>El navegador conserva localmente posiciones de desplazamiento y el área desplegada en Servicios para restaurar tu navegación. Ese estado no contiene mensajes, teléfonos ni correos y el código del sitio no lo envía a un servidor. Se describe en la <Link to="/politica-de-cookies">Política de Cookies</Link>.</p>
    <p>El código de la web no incorpora herramientas de analítica ni registros propios de actividad. El alojamiento del dominio principal utiliza Cloudflare, que procesa datos técnicos de las solicitudes, como la dirección IP y datos del dispositivo o navegador, para entregar las páginas y mantener la operación y seguridad de su infraestructura. La configuración y conservación de sus registros dependen del servicio contratado.</p>

    <h2>Conservación</h2>
    <p>Los datos se conservarán únicamente durante el tiempo necesario para atender la finalidad correspondiente y cumplir las obligaciones aplicables. No se establece un plazo fijo sin conocer la naturaleza de la consulta o las obligaciones asociadas. El almacenamiento técnico de navegación dura la sesión de la pestaña, sujeto a las funciones de restauración del navegador.</p>

    <h2>Servicios de terceros y transferencias</h2>
    <p>El alojamiento del dominio principal utiliza Cloudflare y el contacto utiliza WhatsApp y la dirección de contacto <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Las comunicaciones por correo se gestionan mediante Gmail (Google). Puedes solicitar información sobre los proveedores y destinatarios de tu comunicación a través de los canales indicados. Las fotografías y las fuentes se sirven desde el propio sitio. LinkedIn es un enlace externo: no hay un perfil incrustado ni un píxel de seguimiento.</p>
    <p>Cloudflare y WhatsApp operan infraestructura internacional, por lo que la navegación y el uso de los canales de contacto pueden implicar tratamiento fuera de Ecuador, incluido Estados Unidos. Puedes consultar la <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer">política de Cloudflare</a> y la <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">política de WhatsApp</a>. Las transferencias relacionadas con el correo dependen del proveedor y los servicios de reenvío efectivamente utilizados. Puedes solicitar al correo indicado información sobre los destinatarios y las garantías aplicables a tu comunicación. No se han incorporado servicios de publicidad ni venta de datos.</p>

    <h2>Tus derechos</h2>
    <p>En los supuestos previstos por la normativa ecuatoriana puedes solicitar acceso, rectificación y actualización, eliminación, oposición, portabilidad, suspensión o limitación del tratamiento, y ejercer los demás derechos aplicables, incluido no ser objeto de decisiones basadas únicamente en valoraciones automatizadas. Cuando el tratamiento se base en consentimiento, puedes revocarlo sin afectar la licitud del tratamiento anterior.</p>
    <p>Escribe a <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> indicando el derecho que deseas ejercer y la información necesaria para identificar tu solicitud. Si hace falta comprobar tu identidad, se solicitará únicamente lo necesario. Las solicitudes se atenderán conforme a los requisitos y plazos legales aplicables.</p>
    <p>También puedes presentar reclamos ante la <a href="https://spdp.gob.ec/" target="_blank" rel="noopener noreferrer">Superintendencia de Protección de Datos Personales</a>.</p>

    <h2>Seguridad y actualizaciones</h2>
    <p>La configuración del sitio limita conexiones externas y evita almacenar consultas en la web. Estas medidas razonables de protección no permiten prometer seguridad absoluta; la protección de las cuentas de contacto también depende de su administración.</p>
    <p>Esta política puede actualizarse si cambian los canales, servicios o tratamientos. La fecha al inicio identifica la última revisión.</p>
  </article>
}
