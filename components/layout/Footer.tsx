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
            src="/images/logo.svg"
            alt=""
            className="footer__logo-img"
            width={120}
            height={42}
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
        </div>

        <div className="footer__legal">
          <p>&copy; {year} Typing Timing. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
