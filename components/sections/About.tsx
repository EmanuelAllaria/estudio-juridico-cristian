import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function About() {
  const { about } = SITE_CONFIG;

  return (
    <section
      id="nosotros"
      className="section about section--accent"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="about-grid">
          <div className="about-grid__visual">
            <Image
              src="/images/about-founder.webp"
              alt={about.imageAlt}
              className="about-photo"
              width={480}
              height={560}
              loading="lazy"
              sizes="(max-width: 1023px) 100vw, 38vw"
            />
          </div>

          <div className="about-grid__content">
            <span className="section-label section-label--light">
              Nuestro estudio
            </span>
            <h2 id="about-title" className="section-title">
              {about.name}
            </h2>
            <p className="about-role">{about.role}</p>
            <p className="about-bio">{about.bio}</p>

            <ul className="about-credentials">
              {about.credentials.map((item) => (
                <li key={item} className="about-credentials__item">
                  <span className="about-credentials__icon" aria-hidden="true">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href={getWhatsAppUrl()}
              className="btn btn--whatsapp"
              data-track="cta-about-wa"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon />
              Hablar con el Dr. Carnevalle
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
