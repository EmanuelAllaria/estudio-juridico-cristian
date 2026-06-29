(function () {
"use strict";

function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function hasContent(id) {
  const el = document.getElementById(id);
  return el && el.innerHTML.trim().length > 0;
}

function populateLinks() {
  const waUrl = getWhatsAppUrl();
  const phoneUrl = getPhoneUrl();

  const waIds = [
    "cta-hero-wa",
    "cta-header-wa",
    "cta-why-wa",
    "cta-footer-wa",
    "cta-float-wa",
  ];

  waIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.href = waUrl;
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  });

  const phoneIds = [
    "cta-hero-call",
    "cta-footer-call",
    "cta-float-call",
    "footer-phone",
  ];

  phoneIds.forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.href = phoneUrl;
  });

  const addressEl = document.getElementById("footer-address");
  if (addressEl) {
    addressEl.href = SITE_CONFIG.mapsUrl;
    addressEl.textContent = SITE_CONFIG.address;
    addressEl.setAttribute("target", "_blank");
    addressEl.setAttribute("rel", "noopener noreferrer");
  }

  const googleReviewsLink = document.getElementById("reviews-google-link");
  if (googleReviewsLink) {
    googleReviewsLink.href =
      SITE_CONFIG.googleMapsUrl || SITE_CONFIG.mapsUrl;
  }

  const emailEl = document.getElementById("footer-email");
  if (emailEl) {
    emailEl.href = `mailto:${SITE_CONFIG.email}`;
    emailEl.textContent = SITE_CONFIG.email;
  }

  const phoneDisplay = document.getElementById("footer-phone");
  if (phoneDisplay) {
    phoneDisplay.textContent = SITE_CONFIG.phone;
  }

  document.querySelectorAll("#specialties-grid .btn--link").forEach((link) => {
    link.href = waUrl;
  });
}

function populateBrand() {
  document.querySelectorAll("[data-config='brand']").forEach((el) => {
    el.textContent = SITE_CONFIG.brand;
  });
}

function populateRatings() {
  const ratingText = document.querySelector(".hero__rating-text");
  if (ratingText) {
    ratingText.innerHTML = `<strong>${SITE_CONFIG.googleRating}</strong> · ${SITE_CONFIG.reviewCount} reseñas en Google`;
  }

  const heroStars = document.querySelector(".hero__rating .stars__icon");
  if (heroStars) {
    heroStars.textContent = renderStars(SITE_CONFIG.googleRating);
  }

  const reviewCount = document.getElementById("review-count");
  if (reviewCount) reviewCount.textContent = SITE_CONFIG.reviewCount;

  const reviewsScore = document.querySelector(".reviews-panel__rating strong");
  if (reviewsScore) reviewsScore.textContent = SITE_CONFIG.googleRating;

  const panelStars = document.querySelector(".reviews-panel__score .stars");
  if (panelStars) panelStars.textContent = renderStars(SITE_CONFIG.googleRating);
}

function renderTrustBadges() {
  if (hasContent("trust-badges")) return;
  const container = document.getElementById("trust-badges");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.trustBadges
    .map(
      (badge) => `
      <li class="trust-badge">
        <span class="trust-badge__icon" aria-hidden="true">${getIcon(badge.icon)}</span>
        <span class="trust-badge__text">${badge.text}</span>
      </li>`
    )
    .join("");
}

function renderSpecialties() {
  if (hasContent("specialties-grid")) return;
  const container = document.getElementById("specialties-grid");
  if (!container) return;

  const waUrl = getWhatsAppUrl();

  container.innerHTML = SITE_CONFIG.specialties
    .map(
      (spec) => `
      <article class="card specialty-card">
        <div class="card__icon" aria-hidden="true">${getIcon(spec.icon)}</div>
        <h3 class="card__title">${spec.title}</h3>
        <p class="card__text">${spec.description}</p>
        <a href="${waUrl}" class="btn--link" data-track="${spec.track}" target="_blank" rel="noopener noreferrer">
          Consultá tu caso
        </a>
      </article>`
    )
    .join("");
}

function renderReviews() {
  if (hasContent("reviews-container")) return;
  const container = document.getElementById("reviews-container");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.reviews
    .map(
      (review) => `
      <article class="review-card" role="listitem">
        <div class="review-card__header">
          <div class="avatar" aria-hidden="true">${review.initials}</div>
          <div class="review-card__meta">
            <p class="review-card__name">${review.name}</p>
            <p class="review-card__date">${review.date}</p>
          </div>
        </div>
        <div class="review-card__stars stars stars--sm" aria-label="${review.rating} de 5 estrellas">
          ${renderStars(review.rating)}
        </div>
        <p class="review-card__text">${review.text}</p>
      </article>`
    )
    .join("");
}

function renderProcessSteps() {
  if (hasContent("process-steps")) return;
  const container = document.getElementById("process-steps");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.processSteps
    .map(
      (step, i) => `
      <li class="process-step">
        <span class="process-step__number" aria-hidden="true">${i + 1}</span>
        <h3 class="process-step__title">${step.title}</h3>
        <p class="process-step__text">${step.text}</p>
      </li>`
    )
    .join("");
}

function renderWhyList() {
  if (hasContent("why-list")) return;
  const container = document.getElementById("why-list");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.whyReasons
    .map(
      (item) => `
      <li class="why-list__item">
        <span class="why-list__icon" aria-hidden="true">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <span class="why-list__text">${item.text}</span>
      </li>`
    )
    .join("");
}

function renderFaq() {
  if (hasContent("faq-list")) return;
  const container = document.getElementById("faq-list");
  if (!container) return;

  container.innerHTML = SITE_CONFIG.faq
    .map(
      (item) => `
      <details class="faq-item">
        <summary>${item.question}</summary>
        <div class="faq-item__answer">
          <p>${item.answer}</p>
        </div>
      </details>`
    )
    .join("");
}

function injectSchema() {
  const schemaEl = document.getElementById("schema-json");
  if (!schemaEl) return;
  if (schemaEl.textContent.trim()) return;
  schemaEl.textContent = JSON.stringify(buildSchema());
}

function closeNav(toggle, nav) {
  toggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("header__nav--open");
  document.body.style.overflow = "";
}

function initHeader() {
  const header = document.getElementById("header");
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  if (!header) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          header.classList.toggle("header--scrolled", window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("header__nav--open", !isOpen);
      document.body.style.overflow = !isOpen ? "hidden" : "";
    });

    nav.querySelectorAll(".header__nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        closeNav(toggle, nav);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        closeNav(toggle, nav);
        toggle.focus();
      }
    });
  }
}

function initFloatCta() {
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
}

function initSmoothScroll() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) return;

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function initFooter() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function init() {
  populateBrand();
  populateLinks();
  populateRatings();
  renderTrustBadges();
  renderSpecialties();
  renderReviews();
  renderProcessSteps();
  renderWhyList();
  renderFaq();
  injectSchema();
  initHeader();
  initFloatCta();
  initSmoothScroll();
  initFooter();
  initTracking();
  if (typeof initAnimations === "function") initAnimations();
  if (typeof initGoogleReviewsLive === "function") initGoogleReviewsLive();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

})();
