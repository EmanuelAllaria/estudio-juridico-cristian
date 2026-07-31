import { WhatsAppIcon } from "@/components/ui/Icon";
import { getWhatsAppUrl } from "@/lib/urls";

interface WhatsAppCtaLinkProps {
  className?: string;
  track: string;
  iconSize?: number;
  pulse?: boolean;
}

export function WhatsAppCtaLink({
  className = "btn btn--whatsapp btn--wrap",
  track,
  iconSize = 20,
  pulse = false,
}: WhatsAppCtaLinkProps) {
  const classes = [className, pulse ? "btn--pulse" : ""].filter(Boolean).join(" ");

  return (
    <a
      href={getWhatsAppUrl()}
      className={classes}
      data-track={track}
      target="_blank"
      rel="noopener noreferrer"
    >
      <WhatsAppIcon size={iconSize} />
      <span className="btn__label">
        <span className="btn__label-full">Consultar por WhatsApp ahora</span>
        <span className="btn__label-short">Consultá por WhatsApp</span>
      </span>
    </a>
  );
}
