import { renderStars } from "@/lib/stars";

interface StarsProps {
  rating: number;
  size?: "sm" | "md";
  className?: string;
  label?: string;
}

export function Stars({ rating, size, className = "", label }: StarsProps) {
  const sizeClass = size === "sm" ? "stars--sm" : "";
  const ariaProps = label
    ? { "aria-label": label }
    : { "aria-hidden": true as const };

  return (
    <span className={`stars ${sizeClass} ${className}`.trim()} {...ariaProps}>
      {renderStars(rating)}
    </span>
  );
}
