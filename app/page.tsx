import { JsonLd } from "@/components/JsonLd";
import { FloatCta } from "@/components/layout/FloatCta";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Specialties } from "@/components/sections/Specialties";
import { TrustBar } from "@/components/sections/TrustBar";
import { WhyUs } from "@/components/sections/WhyUs";
import { getGoogleReviews } from "@/lib/google-reviews";
import { SITE_CONFIG, type SiteConfig } from "@/lib/site-config";

export const revalidate = 3600;

export default async function HomePage() {
  const reviewsData = await getGoogleReviews();

  const pageConfig: SiteConfig = {
    ...SITE_CONFIG,
    googleRating: reviewsData.rating,
    reviewCount: reviewsData.reviewCount,
    reviews:
      reviewsData.reviews.length > 0
        ? reviewsData.reviews
        : SITE_CONFIG.reviews,
  };

  return (
    <>
      <JsonLd config={pageConfig} />
      <Header />
      <main>
        <Hero
          rating={reviewsData.rating}
          reviewCount={reviewsData.reviewCount}
        />
        <TrustBar />
        <Specialties />
        <Reviews initialData={reviewsData} />
        <Process />
        <WhyUs
          rating={reviewsData.rating}
          reviewCount={reviewsData.reviewCount}
        />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatCta />
    </>
  );
}
