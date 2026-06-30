import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { getMailtoUrl, getPhoneUrl } from "@/lib/urls";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Image
            src="/images/logo-light.svg"
            alt=""
            className="footer__logo-img"
            width={180}
            height={40}
            aria-hidden
          />
        </div>

        <div className="footer__contact">
          <p>
            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_CONFIG.address}
            </a>
          </p>
          <p>
            <a href={getPhoneUrl()}>{SITE_CONFIG.phone}</a>
          </p>
          <p>
            <a href={getMailtoUrl()}>{SITE_CONFIG.email}</a>
          </p>
          <p className="footer__social">
            <a
              href={SITE_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram @abogadolaboral.caba
            </a>
          </p>
          <p className="footer__social">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Google
            </a>
          </p>
        </div>

        <div className="footer__legal">
          <p>&copy; {year} {SITE_CONFIG.brand}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
