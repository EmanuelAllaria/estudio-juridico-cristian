"use client";

import { useEffect } from "react";
import { useGoogleReviews } from "@/components/GoogleReviewsProvider";
import { revealReviewCards } from "@/components/ScrollReveal";
import { GoogleBadge } from "@/components/ui/GoogleBadge";
import { GoogleIcon } from "@/components/ui/Icon";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatRating } from "@/lib/stars";

export function Reviews() {
  const { data, isLive } = useGoogleReviews();
  const ratingText = formatRating(data.rating);

  useEffect(() => {
    if (isLive) {
      requestAnimationFrame(() => revealReviewCards());
    }
  }, [data.reviews, isLive]);

  return (
    <section
      id="resenas"
      className="section section--slate"
      aria-labelledby="resenas-title"
    >
      <div className="container">
        <header className="section-header section-header--center">
          <span className="section-label">Opiniones verificadas</span>
          <h2 id="resenas-title" className="section-title">
            Lo que dicen nuestros clientes
          </h2>
        </header>

        <div className="reviews-panel">
          <GoogleBadge rating={data.rating} variant="panel" />

          <div className="reviews-panel__header">
            <div className="reviews-panel__google">
              <GoogleIcon className="reviews-panel__google-icon" size={36} />
              <div>
                <p className="reviews-panel__label">Google Reviews</p>
                <div className="reviews-panel__score" id="reviews-score">
                  <Stars rating={data.rating} size="lg" />
                  <span className="reviews-panel__rating">
                    <strong>{ratingText}</strong> ·{" "}
                    <span id="review-count">{data.reviewCount}</span> opiniones
                  </span>
                </div>
              </div>
            </div>
            <a
              href={SITE_CONFIG.googleMapsUrl}
              className="reviews-panel__link"
              id="reviews-google-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver todas en Google →
            </a>
          </div>

          {isLive && (
            <p className="reviews-live-badge" id="reviews-live-badge">
              <span className="reviews-live-badge__dot" aria-hidden="true" />
              Actualizado en vivo desde Google
            </p>
          )}

          <div className="reviews-scroll" id="reviews-container" role="list">
            {data.reviews.map((review) => (
              <ReviewCard
                key={`${review.name}-${review.date}`}
                review={review}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
