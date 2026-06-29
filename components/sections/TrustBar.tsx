import { Icon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";

export function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Garantías del estudio">
      <div className="container">
        <ul className="trust-bar__list" id="trust-badges">
          {SITE_CONFIG.trustBadges.map((badge) => (
            <li key={badge.text} className="trust-badge">
              <span className="trust-badge__icon" aria-hidden="true">
                <Icon name={badge.icon} />
              </span>
              <span className="trust-badge__text">{badge.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
