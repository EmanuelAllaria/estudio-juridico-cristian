import { PhoneIcon, WhatsAppIcon } from "@/components/ui/Icon";
import { getPhoneUrl, getWhatsAppUrl } from "@/lib/urls";

export function CtaFinal() {
  return (
    <section
      className="cta-final section section--navy"
      aria-labelledby="cta-final-title"
    >
      <div className="container cta-final__inner">
        <h2 id="cta-final-title" className="cta-final__title">
          ¿Tenés un problema laboral? Consultanos hoy
        </h2>
        <p className="cta-final__text">
          La consulta es gratuita y confidencial. Nuestro equipo te responde
          en minutos por WhatsApp.
        </p>
        <div className="cta-final__actions">
          <a
            href={getWhatsAppUrl()}
            className="btn btn--whatsapp btn--lg"
            data-track="cta-footer-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={22} />
            Iniciar Consulta Gratuita por WhatsApp
          </a>
          <a
            href={getPhoneUrl()}
            className="btn btn--ghost btn--lg"
            data-track="cta-footer-call"
          >
            <PhoneIcon size={22} />
            Llamanos
          </a>
        </div>
      </div>
    </section>
  );
}
