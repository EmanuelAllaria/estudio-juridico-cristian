import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function WhyUs() {
  return (
    <section className="section section--warm why-us" aria-labelledby="porque-title">
      <div className="container">
        <div className="why-grid">
          <div className="why-grid__content">
            <span className="section-label">Por qué elegirnos</span>
            <h2 id="porque-title" className="section-title">
              Un estudio preparado para actuar de inmediato
            </h2>
            <p className="section-subtitle">
              Especialistas en derecho penal y accidentes de tránsito en
              Mendoza. Experiencia, velocidad, eficacia y confidencialidad.
            </p>

            <ul className="why-list" id="why-list">
              {SITE_CONFIG.whyReasons.map((item) => (
                <li key={item.text} className="why-list__item">
                  <span className="why-list__icon" aria-hidden="true">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span
                    className="why-list__text"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppUrl()}
              className="btn btn--whatsapp"
              data-track="cta-why-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Consultá por WhatsApp
            </a>
          </div>

          <div className="why-grid__stats">
            <div className="stat-card stat-card--highlight">
              <span className="stat-card__number">20+</span>
              <span className="stat-card__label">Años de trayectoria</span>
            </div>
            <div className="stat-card stat-card--highlight">
              <span className="stat-card__number">24hs</span>
              <span className="stat-card__label">Defensa penal urgente</span>
            </div>
            <div className="stat-card stat-card--highlight">
              <span className="stat-card__number">2</span>
              <span className="stat-card__label">Áreas de especialización</span>
            </div>
            <div className="stat-card stat-card--highlight">
              <span className="stat-card__number">MDZ</span>
              <span className="stat-card__label">Mendoza y Justicia Federal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
