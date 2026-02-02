/**
 * Dynamic Robots.txt Generation
 * Optimized for search engine crawling and indexing
 */

import { MetadataRoute } from "next";
import { APP_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // General rules for all crawlers
      {
        userAgent: "*",
        allow: ["/", "/how-to-download-instagram-reels", "/blog/", "/privacy-policy", "/terms"],
        disallow: ["/api/", "/_next/", "/static/"],
      },
      // Googlebot specific rules
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Bing crawler
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Block aggressive crawlers
      {
        userAgent: "AhrefsBot",
        disallow: ["/"],
      },
      {
        userAgent: "SemrushBot",
        disallow: ["/"],
      },
    ],
    sitemap: `${APP_URL}/sitemap.xml`,
    host: APP_URL,
  };
}
