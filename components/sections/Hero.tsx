"use client";

import { GoogleBadge } from "@/components/ui/GoogleBadge";
import { PhoneIcon } from "@/components/ui/Icon";
import { WhatsAppCtaLink } from "@/components/ui/WhatsAppCtaLink";
import { useGoogleReviews } from "@/components/GoogleReviewsProvider";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPhoneUrl } from "@/lib/urls";

export function Hero() {
  const { data } = useGoogleReviews();

  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title" className="reveal reveal--left">
            Especialistas en Defensa de Trabajadores
          </h1>
          <p className="hero__subtitle reveal reveal--left">
            Si te despidieron, trabajás en negro o sufriste un accidente de
            trabajo, nuestro equipo de Abogados Laboralistas te ayuda a cobrar
            la indemnización que te corresponde.
          </p>

          <div className="hero__cta-group reveal reveal--left">
            <WhatsAppCtaLink
              className="btn btn--whatsapp btn--wrap btn--lg-mobile"
              track="cta-hero-whatsapp"
              pulse
            />
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
            <GoogleBadge rating={data.rating} variant="hero" />
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__stats reveal reveal--scale reveal--right">
            <h2 className="hero__stats-title">{SITE_CONFIG.heroStatsTitle}</h2>
            <ul className="hero__stats-list">
              {SITE_CONFIG.heroStats.map((item) => (
                <li key={item} className="hero__stats-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
