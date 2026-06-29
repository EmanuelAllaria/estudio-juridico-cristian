import { SITE_CONFIG, type SiteConfig } from "./site-config";

export function getWhatsAppUrl(config: SiteConfig = SITE_CONFIG): string {
  const message = encodeURIComponent(config.whatsappMessage);
  return `https://wa.me/${config.whatsapp}?text=${message}`;
}

export function getPhoneUrl(config: SiteConfig = SITE_CONFIG): string {
  return `tel:${config.phone.replace(/\s/g, "")}`;
}

export function getMailtoUrl(config: SiteConfig = SITE_CONFIG): string {
  return `mailto:${config.email}`;
}
