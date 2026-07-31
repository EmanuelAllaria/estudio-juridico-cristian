import { Icon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function Specialties() {
  return (
    <section
      id="servicios"
      className="section section--warm"
      aria-labelledby="servicios-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Áreas de especialización</span>
          <h2 id="servicios-title" className="section-title">
            ¿En qué situación te encontrás?
          </h2>
          <p className="section-subtitle">
            Defensa penal urgente: tocá tu situación y escribinos por WhatsApp.
          </p>
        </header>

        <div className="specialties-grid" id="specialties-grid">
          {SITE_CONFIG.specialties.map((spec) => (
            <a
              key={spec.id}
              href={getWhatsAppUrl(SITE_CONFIG, spec.whatsappMessage)}
              className="card specialty-card specialty-card--link"
              data-track={spec.track}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="card__icon" aria-hidden="true">
                <Icon name={spec.icon} />
              </div>
              <h3 className="card__title">{spec.title}</h3>
              <p className="card__text">{spec.description}</p>
              <span className="btn--link specialty-card__cta">
                Consultá tu caso →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
