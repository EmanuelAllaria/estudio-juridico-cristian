(function () {
  "use strict";

  function renderStars(rating) {
    const rounded = Math.round(Number(rating) || 5);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
  }

  function initialsFromName(name) {
    const parts = String(name || "Cliente").trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return String(name || "CL").slice(0, 2).toUpperCase();
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatRating(value) {
    const n = Number(value);
    if (!Number.isFinite(n)) return "5.0";
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  function normalizeReview(review) {
    const name =
      review.authorAttribution?.displayName ||
      review.name ||
      review.author ||
      "Cliente";
    const text =
      review.text?.text || review.text || review.reviewBody || "";
    const rating = review.rating || 5;
    const date =
      review.relativePublishTimeDescription ||
      review.relativeTimeDescription ||
      review.date ||
      "";

    return {
      name,
      text: String(text).trim(),
      rating,
      date,
      initials: initialsFromName(name),
    };
  }

  function normalizePayload(data) {
    return {
      rating: data.rating ?? SITE_CONFIG.googleRating,
      reviewCount: data.userRatingCount ?? data.reviewCount ?? SITE_CONFIG.reviewCount,
      reviews: (data.reviews || []).map(normalizeReview).filter((r) => r.text),
      source: data.source || "google",
      fetchedAt: data.fetchedAt || new Date().toISOString(),
    };
  }

  function renderReviewCard(review) {
    return `
      <article class="review-card" role="listitem">
        <div class="review-card__header">
          <div class="avatar" aria-hidden="true">${escapeHtml(review.initials)}</div>
          <div class="review-card__meta">
            <p class="review-card__name">${escapeHtml(review.name)}</p>
            <p class="review-card__date">${escapeHtml(review.date)}</p>
          </div>
        </div>
        <div class="review-card__stars stars stars--sm" aria-label="${review.rating} de 5 estrellas">
          ${renderStars(review.rating)}
        </div>
        <p class="review-card__text">${escapeHtml(review.text)}</p>
      </article>`;
  }

  function applyLiveData(payload) {
    const rating = formatRating(payload.rating);
    const count = payload.reviewCount;

    SITE_CONFIG.googleRating = Number(rating);
    SITE_CONFIG.reviewCount = count;
    if (payload.reviews.length) {
      SITE_CONFIG.reviews = payload.reviews;
    }

    const ratingText = document.querySelector(".hero__rating-text");
    if (ratingText) {
      ratingText.innerHTML = `<strong>${rating}</strong> · ${count} reseñas en Google`;
    }

    const heroStars = document.querySelector(".hero__rating .stars__icon");
    if (heroStars) heroStars.textContent = renderStars(rating);

    const reviewCountEl = document.getElementById("review-count");
    if (reviewCountEl) reviewCountEl.textContent = count;

    const reviewsScore = document.querySelector(".reviews-panel__rating strong");
    if (reviewsScore) reviewsScore.textContent = rating;

    const panelStars = document.querySelector(".reviews-panel__score .stars");
    if (panelStars) panelStars.textContent = renderStars(rating);

    const statNumbers = document.querySelectorAll(".why-grid__stats .stat-card__number");
    if (statNumbers[0]) statNumbers[0].textContent = rating;
    if (statNumbers[1]) statNumbers[1].textContent = count;

    const container = document.getElementById("reviews-container");
    if (container && payload.reviews.length) {
      container.innerHTML = payload.reviews.map(renderReviewCard).join("");
      if (typeof initAnimations === "function") {
        container.querySelectorAll(".review-card").forEach((el) => {
          el.classList.add("reveal", "is-visible");
        });
      }
    }

    const badge = document.getElementById("reviews-live-badge");
    if (badge) badge.hidden = false;

    const schemaEl = document.getElementById("schema-json");
    if (schemaEl && typeof buildSchema === "function") {
      schemaEl.textContent = JSON.stringify(buildSchema(SITE_CONFIG));
    }
  }

  async function fetchFromPlacesApi() {
    const placeId = SITE_CONFIG.googlePlaceId;
    const apiKey = SITE_CONFIG.placesApiKey;
    if (!placeId || !apiKey) return null;

    const url = `https://places.googleapis.com/v1/places/${placeId}`;
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
        "X-Goog-LanguageCode": "es",
      },
    });

    if (!res.ok) throw new Error(`Places API ${res.status}`);
    const data = await res.json();
    return normalizePayload({
      rating: data.rating,
      userRatingCount: data.userRatingCount,
      reviews: data.reviews,
      source: "places-api",
    });
  }

  async function fetchFromProxy() {
    const proxy = SITE_CONFIG.placesApiProxy;
    if (!proxy) return null;

    const res = await fetch(proxy, { cache: "no-store" });
    if (!res.ok) throw new Error(`Proxy ${res.status}`);
    const data = await res.json();
    return normalizePayload(data);
  }

  async function fetchFromJsonCache() {
    const res = await fetch(`./assets/data/google-reviews.json?t=${Date.now()}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return normalizePayload(data);
  }

  async function initGoogleReviewsLive() {
    const strategies = [fetchFromProxy, fetchFromPlacesApi, fetchFromJsonCache];

    for (const strategy of strategies) {
      try {
        const payload = await strategy();
        if (payload) {
          applyLiveData(payload);
          return;
        }
      } catch (err) {
        console.warn("[google-reviews-live]", err.message);
      }
    }
  }

  window.initGoogleReviewsLive = initGoogleReviewsLive;
})();
