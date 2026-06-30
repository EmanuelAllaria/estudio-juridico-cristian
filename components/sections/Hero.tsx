"use client";

import Image from "next/image";
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
      <div className="hero__accent-bar" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title reveal reveal--left">
            Defendemos tus derechos{" "}
            <span className="hero__title-accent">sin adelantos</span>
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

          <div
            className="hero__rating reveal reveal--left"
            aria-label="Calificación en Google"
            id="hero-rating"
          >
            <GoogleBadge rating={data.rating} variant="hero" />
          </div>
        </div>

        <div className="hero__media reveal reveal--scale reveal--right">
          <Image
            src="/images/hero-lawyer.webp"
            alt="Abogado laboralista asesorando a un trabajador en CABA"
            className="hero__photo"
            width={640}
            height={720}
            priority
            sizes="(max-width: 1023px) 100vw, 48vw"
          />
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
