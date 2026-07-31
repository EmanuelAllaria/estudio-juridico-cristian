import Script from "next/script";
import { SEO } from "@/lib/site-config";

export function GoogleAds() {
  if (!SEO.googleAdsId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${SEO.googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${SEO.googleAdsId}');
        `}
      </Script>
    </>
  );
}
