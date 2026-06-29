import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatRating } from "@/lib/stars";
import { getWhatsAppUrl } from "@/lib/urls";

interface WhyUsProps {
  rating: number;
  reviewCount: number;
}

export function WhyUs({ rating, reviewCount }: WhyUsProps) {
  const ratingText = formatRating(rating);

  return (
    <section className="section section--slate" aria-labelledby="porque-title">
      <div className="container">
        <div className="why-grid">
          <div className="why-grid__content">
            <span className="section-label">Por qué elegirnos</span>
            <h2 id="porque-title" className="section-title">
              Un estudio que pone al trabajador primero
            </h2>
            <p className="section-subtitle">
              A diferencia de estudios tradicionales, nos enfocamos en
              resultados concretos para vos, sin letra chica ni costos
              ocultos.
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
              Consultá tu caso ahora
            </a>
          </div>

          <div className="why-grid__stats">
            <div className="stat-card">
              <span className="stat-card__number">{ratingText}</span>
              <span className="stat-card__label">Estrellas en Google</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">{reviewCount}</span>
              <span className="stat-card__label">Opiniones verificadas</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">24hs</span>
              <span className="stat-card__label">Atención disponible</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__number">$0</span>
              <span className="stat-card__label">Consulta sin cargo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
