import { PhoneIcon } from "@/components/ui/Icon";
import { WhatsAppCtaLink } from "@/components/ui/WhatsAppCtaLink";
import { getPhoneUrl } from "@/lib/urls";

export function CtaFinal() {
  return (
    <section
      className="cta-final section section--navy"
      aria-labelledby="cta-final-title"
    >
      <div className="container cta-final__inner">
        <h2 id="cta-final-title" className="cta-final__title">
          ¿Necesitás defensa penal o un reclamo por accidente?
        </h2>
        <p className="cta-final__text">
          Actuamos de inmediato las 24 hs. Consultá por WhatsApp y te
          orientamos con confidencialidad.
        </p>
        <div className="cta-final__actions">
          <WhatsAppCtaLink
            className="btn btn--whatsapp btn--lg btn--wrap"
            track="cta-footer-wa"
            iconSize={22}
          />
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
