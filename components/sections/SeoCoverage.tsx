import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

/**
 * Bloque de cobertura local orientado a intención de búsqueda
 * (penal urgente + accidentes) sin keyword stuffing.
 */
export function SeoCoverage() {
  return (
    <section
      id="cobertura"
      className="section section--warm seo-coverage"
      aria-labelledby="cobertura-title"
    >
      <div className="container seo-coverage__inner">
        <header className="section-header">
          <span className="section-label">Cobertura en Mendoza</span>
          <h2 id="cobertura-title" className="section-title">
            Abogados penalistas y accidentes de tránsito en Mendoza
          </h2>
        </header>

        <div className="seo-coverage__grid">
          <article className="seo-coverage__card">
            <h3 className="seo-coverage__subtitle">
              Abogados penalistas en Mendoza
            </h3>
            <p>
              Si vos o un familiar enfrentan una{" "}
              <strong>detención, allanamiento, citación judicial</strong> o una
              investigación en curso, el tiempo importa. En{" "}
              <strong>Hidalgo &amp; Crifo Abogados</strong> brindamos{" "}
              <strong>defensa penal urgente en Mendoza</strong> y ante la{" "}
              <strong>Justicia Federal</strong>, con estrategia preventiva desde
              el primer contacto para proteger libertad, patrimonio y derechos
              procesales.
            </p>
            <p>
              Atendemos causas penales complejas —delitos económicos, robos,
              narcotráfico, ciberdelitos, violencia de género, querellas y
              recursos— con confidencialidad absoluta y respuesta inmediata por
              WhatsApp o teléfono.
            </p>
            <a href="#penal" className="btn--link">
              Ver situaciones penales →
            </a>
          </article>

          <article className="seo-coverage__card">
            <h3 className="seo-coverage__subtitle">
              Abogados especialistas en Accidentes de tránsito
            </h3>
            <p>
              Un <strong>abogado de accidentes de tránsito en Mendoza</strong>{" "}
              ayuda a determinar la responsabilidad, calcular una{" "}
              <strong>indemnización completa</strong> (daños materiales,
              lesiones, lucro cesante y daño moral) y negociar con la
              aseguradora. Si no hay acuerdo justo, impulsamos el reclamo
              judicial.
            </p>
            <p>
              Trabajamos choques en cadena, frontales, traseros, atropellos y
              vuelcos. Podés consultar aunque todavía no tengas toda la
              documentación: te indicamos qué fotos, certificados médicos y
              papeles conviene reunir.
            </p>
            <a href="#accidentes" className="btn--link">
              Ver accidentes de tránsito →
            </a>
          </article>
        </div>

        <p className="seo-coverage__local">
          Estudio en <strong>Mitre 535, 1° piso, of. 43 y 44, Ciudad de Mendoza</strong>.
          Consultas presenciales o virtuales. Teléfonos:{" "}
          {SITE_CONFIG.phones.join(" / ")}.
        </p>

        <div className="seo-coverage__cta">
          <a
            href={getWhatsAppUrl()}
            className="btn btn--whatsapp"
            data-track="cta-cobertura-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar ahora por WhatsApp
          </a>
          <a href="#faq" className="btn--link">
            Leer preguntas frecuentes →
          </a>
        </div>
      </div>
    </section>
  );
}
