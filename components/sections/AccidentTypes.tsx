import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function AccidentTypes() {
  return (
    <section
      id="accidentes"
      className="section section--white accident-types"
      aria-labelledby="accidentes-title"
    >
      <div className="container">
        <div className="accident-types__intro">
          <div className="accident-types__copy">
            <span className="section-label">Accidentes de tránsito</span>
            <h2 id="accidentes-title" className="section-title">
              Tipos de accidentes de tránsito
            </h2>
            <p className="section-subtitle">{SITE_CONFIG.accidentIntro}</p>
            <p className="accident-types__support">
              {SITE_CONFIG.accidentIntroSupport}
            </p>
            <a
              href={getWhatsAppUrl(
                SITE_CONFIG,
                "Hola, tuve un accidente de tránsito y quiero iniciar un reclamo."
              )}
              className="btn btn--whatsapp"
              data-track="cta-accidentes-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Consultá tu reclamo por WhatsApp
            </a>
          </div>
          <div className="accident-types__media">
            <Image
              src="/images/accidentes-transito.webp"
              alt="Accidente de tránsito en Mendoza — reclamo e indemnización con abogado especializado"
              className="accident-types__img"
              width={640}
              height={480}
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>
        </div>

        <ul className="accident-types__grid">
          {SITE_CONFIG.accidentTypes.map((item) => (
            <li key={item.title} className="accident-type-card">
              <h3 className="accident-type-card__title">{item.title}</h3>
              <p className="accident-type-card__text">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
