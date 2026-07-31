import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/site-config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: SITE_CONFIG.domain,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
