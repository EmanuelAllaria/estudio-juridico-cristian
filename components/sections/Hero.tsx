"use client";

import Image from "next/image";
import { Icon, PhoneIcon } from "@/components/ui/Icon";
import { WhatsAppCtaLink } from "@/components/ui/WhatsAppCtaLink";
import { SITE_CONFIG } from "@/lib/site-config";
import { getPhoneUrl } from "@/lib/urls";

export function Hero() {
  return (
    <section id="inicio" className="hero section" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Image
          src="/images/hero-justicia.webp"
          alt="Estudio jurídico Hidalgo & Crifo — defensa penal urgente en Mendoza"
          fill
          priority
          sizes="100vw"
          className="hero__media-img"
        />
      </div>
      <div className="hero__accent-bar" aria-hidden="true" />
      <div className="hero__bg-glow" aria-hidden="true" />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow reveal reveal--left">
            Hidalgo & Crifo Abogados
          </span>
          <h1 id="hero-title" className="hero__title reveal reveal--left">
            Defensa penal urgente las 24 hs
          </h1>
          <p className="hero__subtitle reveal reveal--left">
            Actuamos inmediatamente ante detenciones, allanamientos o
            imputaciones. También reclamos por accidentes de tránsito en
            Mendoza.
          </p>
          <ul className="hero__focus reveal reveal--left">
            <li>Abogados penalistas en Mendoza</li>
            <li>Abogados especialistas en Accidentes de tránsito</li>
          </ul>

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
          <p className="hero__trust-panel-title" style={{ marginBottom: 0 }}>
            {SITE_CONFIG.heroStatsTitle}
          </p>
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
