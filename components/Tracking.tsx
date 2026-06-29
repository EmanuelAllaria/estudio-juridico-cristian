"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function trackEvent(action: string, label: string) {
  if (typeof window.gtag === "function") {
    window.gtag("event", action, {
      event_category: "CTA",
      event_label: label,
    });
  }
}

function trackWhatsAppConversion(label: string) {
  trackEvent("click", label);
}

export function Tracking() {
  useEffect(() => {
    const elements = document.querySelectorAll("[data-track]");

    const handlers = Array.from(elements).map((el) => {
      const handler = () => {
        const label = (el as HTMLElement).dataset.track;
        if (!label) return;

        if (label.includes("whatsapp") || label.includes("-wa")) {
          trackWhatsAppConversion(label);
        } else {
          trackEvent("click", label);
        }
      };

      el.addEventListener("click", handler);
      return { el, handler };
    });

    return () => {
      handlers.forEach(({ el, handler }) => {
        el.removeEventListener("click", handler);
      });
    };
  }, []);

  return null;
}
