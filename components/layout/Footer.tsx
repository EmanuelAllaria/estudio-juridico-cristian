import Image from "next/image";
import { SITE_CONFIG } from "@/lib/site-config";
import { getMailtoUrl, getPhoneUrl, getWhatsAppUrl } from "@/lib/urls";

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
            width={200}
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
          {SITE_CONFIG.phones.map((phone, index) => (
            <p key={phone}>
              <a href={getPhoneUrl(phone)}>{phone}</a>
              {" · "}
              <a
                href={getWhatsAppUrl(
                  SITE_CONFIG,
                  undefined,
                  SITE_CONFIG.whatsapps[index] ?? phone
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </p>
          ))}
          <p>
            <a href={getMailtoUrl()}>{SITE_CONFIG.email}</a>
          </p>
          {SITE_CONFIG.instagramUrl ? (
            <p className="footer__social">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </p>
          ) : null}
          <p className="footer__social">
            <a
              href={SITE_CONFIG.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver en Google Maps
            </a>
          </p>
        </div>

        <div className="footer__legal">
          <p>
            &copy; {year} {SITE_CONFIG.brand}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
