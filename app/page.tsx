import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GoogleReviewsProvider } from "@/components/GoogleReviewsProvider";
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
import {
  buildPageConfig,
  getBuildTimeReviews,
  getGoogleReviews,
} from "@/lib/google-reviews";
import { SEO } from "@/lib/site-config";
import { formatRating } from "@/lib/stars";
import { SpeedInsights } from "@vercel/speed-insights/next";

const isFtpExport = process.env.BUILD_TARGET === "ftp";

async function loadReviewsData() {
  return isFtpExport ? getBuildTimeReviews() : getGoogleReviews();
}

export async function generateMetadata(): Promise<Metadata> {
  const reviewsData = await loadReviewsData();
  const ratingText = formatRating(reviewsData.rating);
  const count = reviewsData.reviewCount;

  return {
    description: `${SEO.description} ${ratingText} estrellas con ${count} reseñas en Google.`,
    openGraph: {
      description: `Abogados laborales. Despidos, accidentes de trabajo y empleo en negro. Consulta sin cargo: 11-4673-4420. ${ratingText} estrellas en Google con ${count} reseñas.`,
    },
    twitter: {
      description: `Abogados laborales. Consulta sin cargo por WhatsApp 11-4673-4420. ${ratingText}★ en Google (${count} reseñas).`,
    },
  };
}

export default async function HomePage() {
  const reviewsData = await loadReviewsData();
  const pageConfig = buildPageConfig(reviewsData);

  return (
    <GoogleReviewsProvider initialData={reviewsData}>
      {!isFtpExport && <SpeedInsights />}
      <JsonLd config={pageConfig} />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Specialties />
        <Reviews />
        <Process />
        <WhyUs />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
      <FloatCta />
    </GoogleReviewsProvider>
  );
}
