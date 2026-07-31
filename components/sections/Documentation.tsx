import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui/Icon";
import { SITE_CONFIG } from "@/lib/site-config";
import { getWhatsAppUrl } from "@/lib/urls";

export function Documentation() {
  return (
    <section
      id="documentacion"
      className="section section--white documentation"
      aria-labelledby="documentacion-title"
    >
      <div className="container documentation__inner">
        <div className="documentation__copy">
          <span className="section-label">Documentación necesaria</span>
          <h2 id="documentacion-title" className="section-title">
            Qué conviene tener a mano para evaluar el reclamo más rápido
          </h2>
          <p className="section-subtitle">{SITE_CONFIG.documentationIntro}</p>

          <ul className="documentation__list">
            {SITE_CONFIG.documentationItems.map((item) => (
              <li key={item.title} className="documentation__item">
                <h3 className="documentation__item-title">{item.title}</h3>
                <p className="documentation__item-text">{item.description}</p>
              </li>
            ))}
          </ul>

          <p className="documentation__note">{SITE_CONFIG.documentationNote}</p>

          <a
            href={getWhatsAppUrl(
              SITE_CONFIG,
              "Hola, quiero consultar por un accidente de tránsito. Tengo parte de la documentación."
            )}
            className="btn btn--whatsapp"
            data-track="cta-documentacion-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon />
            Enviar mi caso por WhatsApp
          </a>
        </div>

        <div className="documentation__media">
          <Image
            src="/images/documentacion-legal.webp"
            alt="Documentación legal para reclamos"
            className="documentation__img"
            width={560}
            height={700}
            sizes="(max-width: 768px) 100vw, 36vw"
          />
        </div>
      </div>
    </section>
  );
}
