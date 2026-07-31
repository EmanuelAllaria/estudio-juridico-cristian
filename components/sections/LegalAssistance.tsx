import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function LegalAssistance() {
  return (
    <section
      id="asistencia-legal"
      className="section section--warm legal-assistance"
      aria-labelledby="asistencia-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Accidentes de tránsito</span>
          <h2 id="asistencia-title" className="section-title">
            ¿Por qué es importante la asistencia legal?
          </h2>
          <p className="section-subtitle">
            {SITE_CONFIG.legalAssistanceIntro}
          </p>
        </header>

        <ul className="legal-assistance__grid">
          {SITE_CONFIG.legalAssistancePoints.map((point) => (
            <li key={point.title} className="legal-point">
              <h3 className="legal-point__title">{point.title}</h3>
              <p className="legal-point__text">{point.description}</p>
            </li>
          ))}
        </ul>

        <div className="legal-assistance__cta">
          <a
            href={getWhatsAppUrl(
              SITE_CONFIG,
              "Hola, sufrí un accidente de tránsito y necesito asistencia legal."
            )}
            className="btn btn--whatsapp"
            data-track="cta-asistencia-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Hablar con un abogado ahora
          </a>
        </div>
      </div>
    </section>
  );
}
