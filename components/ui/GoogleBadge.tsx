import { SITE_CONFIG } from "@/lib/site-config";
import { formatRating, renderStars } from "@/lib/stars";

interface GoogleBadgeProps {
  rating: number;
  variant?: "hero" | "panel";
}

export function GoogleBadge({ rating, variant = "hero" }: GoogleBadgeProps) {
  const ratingText = formatRating(rating);
  const className =
    variant === "hero" ? "google-badge google-badge--hero" : "google-badge";

  return (
    <p className={className} aria-label={`${ratingText} estrellas en Google`}>
      <span className="google-badge__stars" aria-hidden="true">
        {renderStars(rating)}
      </span>
      <span className="google-badge__text">
        <strong>{ratingText}</strong> estrellas en Google — {SITE_CONFIG.brand}
      </span>
    </p>
  );
}
