import type { Review } from "@/lib/site-config";
import { Stars } from "./Stars";

export function ReviewCard({
  review,
  featured = false,
}: {
  review: Review;
  featured?: boolean;
}) {
  return (
    <article
      className={`review-card${featured ? " review-card--featured" : ""}`}
      role="listitem"
    >
      <div className="review-card__header">
        <div className="avatar" aria-hidden="true">
          {review.initials}
        </div>
        <div className="review-card__meta">
          <p className="review-card__name">{review.name}</p>
          <p className="review-card__date">{review.date}</p>
        </div>
      </div>
      <Stars
        rating={review.rating}
        size="sm"
        className="review-card__stars"
        label={`${review.rating} de 5 estrellas`}
      />
      <p className="review-card__text">{review.text}</p>
    </article>
  );
}
