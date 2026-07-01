"use client";

import { Icon, PhoneIcon } from "@/components/ui/Icon";
import { WhatsAppCtaLink } from "@/components/ui/WhatsAppCtaLink";
import { useGoogleReviews } from "@/components/GoogleReviewsProvider";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPhoneUrl } from "@/lib/urls";

export function Hero() {
  const { data } = useGoogleReviews();

  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="hero__accent-bar" aria-hidden="true" />
      <div className="hero__bg-glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow reveal reveal--left">
            Abogados laboralistas
          </span>
          <h1 id="hero-title" className="hero__title reveal reveal--left">
            Defendemos tus derechos{" "}
          </h1>
          <p className="hero__subtitle reveal reveal--left">
            Despidos, trabajo en negro y accidentes laborales. Consultá sin
            cargo y recibí orientación de abogados laboralistas las 24 horas.
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
        </div>

        <div className="hero__trust-panel reveal reveal--scale reveal--right">
          <p className="hero__trust-panel-title">
            {SITE_CONFIG.heroStatsTitle}
          </p>
          <ul className="hero__trust-list">
            {SITE_CONFIG.trustBadges.map((badge) => (
              <li key={badge.text} className="hero__trust-item">
                <span className="hero__trust-icon" aria-hidden="true">
                  <Icon name={badge.icon} />
                </span>
                <span className="hero__trust-text">{badge.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="hero__stats-bar">
        <div className="container">
          <ul className="hero__stats-list">
            {SITE_CONFIG.heroStats.map((item) => (
              <li key={item} className="hero__stats-item">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
