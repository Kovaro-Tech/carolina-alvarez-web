import CTASection from '../components/CTASection'

export default function About() { return <>
  <section className="about-open">
    <div className="container">
      <div className="about-open__copy">
        <p className="about-open__label">Carolina Álvarez <span>·</span> Abogada</p>
        <h1>Una trayectoria entre el sistema de justicia y el ejercicio de la <em>defensa.</em></h1>
        <p className="about-open__intro">Magíster en Derecho Penal, en Derecho Penal Económico y en Tributación. Su recorrido reúne el trabajo en la Dirección Nacional de Acceso a los Servicios de Justicia y la defensa jurídica de altos cargos públicos y organizaciones.</p>
      </div>
    </div>
    <figure className="about-open__figure">
      <img src="/images/about-portrait.webp" alt="Retrato editorial de Carolina Álvarez" width="1400" height="1522" fetchPriority="high" />
    </figure>
  </section>

  <section className="about-education" id="formacion">
    <div className="container">
      <p className="section-label">Formación</p>
      <h2>Posgrados en las tres áreas de su práctica.</h2>
      <div className="about-masters">
        <p className="about-masters__label">Magíster en</p>
        <ul className="about-masters__list">
          <li>Derecho Penal</li>
          <li>Derecho Penal Económico</li>
          <li>Tributación</li>
        </ul>
      </div>
      <p className="about-diplomas">Diplomado en Gestión Pública y Diplomado en Ciencias Políticas.</p>
    </div>
  </section>

  <section className="about-institutional">
    <div className="container">
      <p className="section-label">Experiencia institucional</p>
      <h2>Dirección Nacional de Acceso a los Servicios de Justicia.</h2>
      <p className="institutional-areas">Su trabajo allí abordó asuntos de género, acceso a la justicia, pluralismo jurídico, mediación y justicia de paz.</p>
    </div>
  </section>

  <section className="about-defense">
    <div className="container">
      <p className="section-label">Ejercicio de la defensa</p>
      <h2>Defensa jurídica de altos cargos públicos y organizaciones en asuntos de especial complejidad.</h2>
    </div>
  </section>

  <CTASection />
</> }
