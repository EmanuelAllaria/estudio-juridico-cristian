/**
 * TRACKING — Google Ads / Analytics
 *
 * En producción:
 * 1. Descomentar el snippet gtag.js en index.html <head>
 * 2. Reemplazar AW-XXXXXXXXX con tu ID de conversión
 * 3. Opcional: descomentar la conversión en trackWhatsAppConversion()
 */

function trackEvent(action, label) {
  if (typeof gtag === "function") {
    gtag("event", action, {
      event_category: "CTA",
      event_label: label,
    });
  }
}

function trackWhatsAppConversion(label) {
  trackEvent("click", label);

  // Descomentar en producción para registrar conversión de Google Ads:
  // if (typeof gtag === "function") {
  //   gtag("event", "conversion", {
  //     send_to: "AW-XXXXXXXXX/CONVERSION_LABEL",
  //   });
  // }
}

function initTracking() {
  document.querySelectorAll("[data-track]").forEach((el) => {
    el.addEventListener("click", () => {
      const label = el.dataset.track;

      if (label && (label.includes("whatsapp") || label.includes("-wa"))) {
        trackWhatsAppConversion(label);
      } else {
        trackEvent("click", label);
      }
    });
  });
}
