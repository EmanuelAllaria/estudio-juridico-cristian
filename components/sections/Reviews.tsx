"use client";

import { useEffect, useState } from "react";
import { revealReviewCards } from "@/components/ScrollReveal";
import { GoogleIcon } from "@/components/ui/Icon";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Stars } from "@/components/ui/Stars";
import type { Review } from "@/lib/site-config";
import { SITE_CONFIG } from "@/lib/site-config";
import { formatRating, type GoogleReviewsPayload } from "@/lib/stars";

interface ReviewsProps {
  initialData: GoogleReviewsPayload;
}

export function Reviews({ initialData }: ReviewsProps) {
  const [data, setData] = useState(initialData);
  const [isLive, setIsLive] = useState(
    initialData.source !== "static" && initialData.source !== undefined
  );

  useEffect(() => {
    let cancelled = false;

    async function fetchLive() {
      try {
        const res = await fetch("/api/google-reviews", { cache: "no-store" });
        if (!res.ok) return;
        const payload: GoogleReviewsPayload = await res.json();
        if (cancelled || payload.source === "static") return;

        setData(payload);
        setIsLive(true);

        const ratingText = formatRating(payload.rating);
        const heroRatingText = document.getElementById("hero-rating-text");
        if (heroRatingText) {
          heroRatingText.innerHTML = `<strong>${ratingText}</strong> · ${payload.reviewCount} reseñas en Google`;
        }

        const statNumbers = document.querySelectorAll(
          ".why-grid__stats .stat-card__number"
        );
        if (statNumbers[0]) statNumbers[0].textContent = ratingText;
        if (statNumbers[1])
          statNumbers[1].textContent = String(payload.reviewCount);

        requestAnimationFrame(() => revealReviewCards());
      } catch {
        // Mantener datos iniciales del servidor
      }
    }

    if (!isLive) fetchLive();
    return () => {
      cancelled = true;
    };
  }, [isLive]);

  const ratingText = formatRating(data.rating);

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
          <div className="reviews-panel__header">
            <div className="reviews-panel__google">
              <GoogleIcon />
              <div>
                <p className="reviews-panel__label">Google Reviews</p>
                <div className="reviews-panel__score" id="reviews-score">
                  <Stars rating={data.rating} size="sm" />
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
            {data.reviews.map((review: Review) => (
              <ReviewCard key={`${review.name}-${review.date}`} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
