import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icon";
import { formatRating, renderStars } from "@/lib/stars";
import { getPhoneUrl, getWhatsAppUrl } from "@/lib/urls";

interface HeroProps {
  rating: number;
  reviewCount: number;
}

export function Hero({ rating, reviewCount }: HeroProps) {
  const ratingText = formatRating(rating);

  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow reveal reveal--left">
            Abogados Laborales en CABA
          </p>
          <h1 id="hero-title" className="reveal reveal--left">
            Defendemos tus derechos laborales — consulta sin cargo
          </h1>
          <p className="hero__subtitle reveal reveal--left">
            Equipo de abogados laboralistas especializados en despidos,
            accidentes de trabajo, trabajo en negro e indemnizaciones.
            Atención 24 horas por WhatsApp.
          </p>

          <div className="hero__cta-group reveal reveal--left">
            <a
              href={getWhatsAppUrl()}
              className="btn btn--whatsapp btn--wrap"
              data-track="cta-hero-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Consultá gratis por WhatsApp
            </a>
            <a
              href={getPhoneUrl()}
              className="btn btn--outline btn--wrap"
              data-track="cta-hero-call"
            >
              <PhoneIcon />
              Llamanos ahora
            </a>
          </div>

          <div
            className="hero__rating reveal reveal--left"
            aria-label="Calificación en Google"
            id="hero-rating"
          >
            <div className="stars" aria-hidden="true">
              <span className="stars__icon">{renderStars(rating)}</span>
            </div>
            <span className="hero__rating-text" id="hero-rating-text">
              <strong>{ratingText}</strong> · {reviewCount} reseñas en Google
            </span>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="hero__card reveal reveal--scale reveal--right">
            <div className="hero__card-icon">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="hero__card-title">Tu defensa laboral</p>
            <p className="hero__card-text">
              Equipo de abogados laboralistas en Tucumán 1668, CABA
            </p>
            <ul className="hero__card-list">
              <li>Consulta sin cargo</li>
              <li>Honorarios por resultado</li>
              <li>Atención 24 horas</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
