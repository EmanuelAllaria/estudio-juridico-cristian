"use client";

import { useEffect } from "react";
import { WhatsAppIcon, PhoneIcon } from "@/components/ui/Icon";
import { getPhoneUrl, getWhatsAppUrl } from "@/lib/urls";

export function FloatCta() {
  useEffect(() => {
    const floatCta = document.getElementById("float-cta");
    const hero = document.getElementById("inicio");

    if (!floatCta || !hero) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      floatCta.classList.add("float-cta--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        floatCta.classList.toggle("float-cta--visible", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="float-cta" id="float-cta" aria-label="Contacto rápido">
      <a
        href={getPhoneUrl()}
        className="float-cta__btn float-cta__btn--call"
        data-track="cta-float-call"
        aria-label="Llamar por teléfono"
      >
        <PhoneIcon size={22} />
      </a>
      <a
        href={getWhatsAppUrl()}
        className="float-cta__btn float-cta__btn--wa"
        data-track="cta-float-wa"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
      >
        <WhatsAppIcon size={24} />
      </a>
    </aside>
  );
}
