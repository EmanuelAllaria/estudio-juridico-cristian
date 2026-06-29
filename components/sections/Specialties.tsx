import { Icon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function Specialties() {
  const waUrl = getWhatsAppUrl();

  return (
    <section
      id="servicios"
      className="section section--white"
      aria-labelledby="servicios-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Áreas de especialización</span>
          <h2 id="servicios-title" className="section-title">
            ¿En qué podemos ayudarte?
          </h2>
          <p className="section-subtitle">
            Somos un equipo de abogados laboralistas dedicados a la defensa de
            los derechos de los trabajadores en Buenos Aires.
          </p>
        </header>

        <div className="specialties-grid" id="specialties-grid">
          {SITE_CONFIG.specialties.map((spec) => (
            <article key={spec.id} className="card specialty-card">
              <div className="card__icon" aria-hidden="true">
                <Icon name={spec.icon} />
              </div>
              <h3 className="card__title">{spec.title}</h3>
              <p className="card__text">{spec.description}</p>
              <a
                href={waUrl}
                className="btn--link"
                data-track={spec.track}
                target="_blank"
                rel="noopener noreferrer"
              >
                Consultá tu caso
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
