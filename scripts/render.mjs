const ICONS = {
  shield:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  clock:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  check:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  scale:
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18"/><path d="M5 7h14"/><path d="M5 7l2 12h10l2-12"/></svg>',
  briefcase:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>',
  heart:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>',
  file:
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
};

function getIcon(name) {
  return ICONS[name] || ICONS.check;
}

function renderStars(rating) {
  const rounded = Math.round(rating);
  return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}

function getWhatsAppUrl(config) {
  const message = encodeURIComponent(config.whatsappMessage);
  return `https://wa.me/${config.whatsapp}?text=${message}`;
}

export function renderTrustBadges(config) {
  return config.trustBadges
    .map(
      (badge) => `
      <li class="trust-badge">
        <span class="trust-badge__icon" aria-hidden="true">${getIcon(badge.icon)}</span>
        <span class="trust-badge__text">${badge.text}</span>
      </li>`
    )
    .join("");
}

export function renderSpecialties(config) {
  const waUrl = getWhatsAppUrl(config);
  return config.specialties
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

export function renderReviews(config) {
  return config.reviews
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

export function renderProcessSteps(config) {
  return config.processSteps
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

export function renderWhyList(config) {
  return config.whyReasons
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

export function renderFaq(config) {
  return config.faq
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
