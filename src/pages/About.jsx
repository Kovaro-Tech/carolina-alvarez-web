import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

const qualifications = [
  ['Título profesional', ['Abogada']],
  ['Maestrías', ['Magíster en Derecho Penal', 'Magíster en Derecho Penal Económico', 'Magíster en Tributación']],
  ['Formación complementaria', ['Diplomado en Gestión Pública', 'Diplomado en Ciencias Políticas']],
]

export default function About() {
  return <>
    <section className="about-open">
      <div className="container about-open__layout">
        <div className="about-open__copy">
          <p className="section-label">Sobre mí · Abogada</p>
          <h1>Carolina <em>Álvarez.</em></h1>
          <p className="about-open__intro">Una trayectoria que reúne formación de posgrado, experiencia en el sistema de justicia y ejercicio de la defensa.</p>
          <p>Su práctica se concentra en el Derecho Penal, el Derecho Penal Económico y la Tributación: tres áreas que permiten abordar las relaciones entre responsabilidad, actividad empresarial y patrimonio.</p>
          <a className="text-link" href="#formacion">Explorar trayectoria <Icon name="arrow" /></a>
        </div>
        <figure className="about-open__figure">
          <img src="/images/carolina_4.webp" alt="Carolina Álvarez sentada en un retrato de estudio" width="4160" height="6240" fetchPriority="high" />
          <figcaption>Carolina Álvarez <span>Abogada</span></figcaption>
        </figure>
      </div>
    </section>
    <section className="about-education" id="formacion" tabIndex={-1} aria-labelledby="education-title">
      <div className="container about-education__layout">
        <div className="about-education__intro">
          <p className="section-label">01 / Formación académica</p>
          <h2 id="education-title">Tres maestrías.<br />Una visión <em>integral.</em></h2>
          <p>Su formación de posgrado reúne tres áreas que convergen especialmente en asuntos de alta complejidad: Derecho Penal, Derecho Penal Económico y Tributación.</p>
          <p>Esta preparación aporta herramientas para analizar la dimensión penal de un caso junto con sus implicaciones empresariales, patrimoniales y tributarias. Los diplomados en Gestión Pública y Ciencias Políticas complementan esa base con una perspectiva sobre las instituciones y la gestión de lo público.</p>
        </div>
        <div className="qualifications">
          {qualifications.map(([label, titles]) => <div className="qualification-group" key={label}>
            <h3>{label}</h3>
            <ul>{titles.map((title) => <li key={title}>{title}</li>)}</ul>
          </div>)}
        </div>
      </div>
    </section>
    <section className="about-institutional">
      <div className="container about-institutional__layout">
        <div>
          <p className="section-label">02 / Experiencia institucional</p>
          <h2>Acceso a los servicios de <em>justicia.</em></h2>
          <p>Carolina trabajó en la Dirección Nacional de Acceso a los Servicios de Justicia del Consejo de la Judicatura. Su experiencia en esta dirección incluyó las siguientes subdirecciones:</p>
        </div>
        <ol className="institutional-areas">
          <li><span>01</span><h3>Subdirección de Género</h3></li>
          <li><span>02</span><h3>Subdirección de Acceso a los Servicios de Justicia y Pluralismo Jurídico</h3></li>
          <li><span>03</span><h3>Subdirección de Centros de Mediación y Justicia de Paz</h3></li>
        </ol>
      </div>
    </section>
    <section className="about-defense">
      <div className="container about-defense__layout">
        <div className="about-defense__copy">
          <p className="section-label">03 / Experiencia en defensa</p>
          <h2>Defensa de altos cargos públicos y <em>empresas.</em></h2>
          <div className="defense-case">
            <h3>Caso Apagón</h3>
            <p>Ha participado en la defensa de altos cargos públicos en el Caso Apagón, como parte de su experiencia en el ejercicio de la defensa penal.</p>
          </div>
          <div className="defense-companies">
            <h3>Sectores y organizaciones</h3>
            <p>Su experiencia en el ejercicio de la defensa comprende también la representación de organizaciones pertenecientes a distintos sectores empresariales, tanto nacionales como internacionales.</p>
            <ul>
              <li>Empresas multinacionales e internacionales</li>
              <li>Compañías aseguradoras y de salud</li>
              <li>Medios de comunicación y entretenimiento</li>
              <li>Empresas de telecomunicaciones y tecnología</li>
              <li>Organizaciones deportivas</li>
              <li>Empresas inmobiliarias y de servicios</li>
              <li>Empresas comerciales e industriales</li>
              <li>Empresas de producción y servicios especializados</li>
            </ul>
          </div>
          <Link className="text-link" to="/contacto">Coordinar una consulta <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  </>
}
