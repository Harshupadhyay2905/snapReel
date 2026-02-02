/**
 * Dynamic Sitemap Generation
 * Generates sitemap.xml for SEO with comprehensive page coverage
 */

import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = APP_URL;
  const currentDate = new Date().toISOString();

  // Define all pages with their SEO priority
  const pages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    // Main guide page - high priority for SEO
    {
      url: `${baseUrl}/how-to-download-instagram-reels`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    // Blog pages - high priority for content SEO
    {
      url: `${baseUrl}/blog/instagram-reel-downloader-without-watermark`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Legal pages - lower priority
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Add alternate language versions if needed in future
  // pages.push(...alternateLanguagePages);

  return pages;
}
