import { SITE_CONFIG, type SiteConfig } from "./site-config";

function toWhatsAppDigits(phoneOrWhatsapp: string): string {
  const digits = phoneOrWhatsapp.replace(/\D/g, "");
  if (digits.startsWith("54")) return digits;
  return `549${digits}`;
}

export function getWhatsAppUrl(
  config: SiteConfig = SITE_CONFIG,
  message?: string,
  whatsapp?: string
): string {
  const text = message ?? config.whatsappMessage;
  const number = whatsapp ?? config.whatsapps[0] ?? config.whatsapp;
  return `https://wa.me/${toWhatsAppDigits(number)}?text=${encodeURIComponent(text)}`;
}

export function getPhoneUrl(
  phone: string = SITE_CONFIG.phones[0] ?? SITE_CONFIG.phone
): string {
  return `tel:+${toWhatsAppDigits(phone)}`;
}

export function getMailtoUrl(config: SiteConfig = SITE_CONFIG): string {
  return `mailto:${config.email}`;
}
