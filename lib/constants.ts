/**
 * ReelFetch Constants
 * Application-wide constants and configuration values
 */

// ============================================
// Application Info
// ============================================

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "ReelFetch";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  "Download Instagram Reels Instantly - Fast, Free & HD Quality";

// ============================================
// SEO Constants
// ============================================

export const SEO = {
  title: `${APP_NAME} - Download Instagram Reels Instantly`,
  description:
    "Download Instagram Reels in HD quality for free. Fast, easy, and no login required. Save your favorite reels to watch offline.",
  keywords: [
    "instagram reel downloader",
    "download instagram reels",
    "instagram video downloader",
    "reels downloader",
    "save instagram reels",
    "instagram reel saver",
    "download reels hd",
    "free reel downloader",
  ],
  ogImage: "/og-image.png",
  twitterCard: "summary_large_image" as const,
};

// ============================================
// Instagram URL Patterns
// ============================================

export const INSTAGRAM_PATTERNS = {
  // Matches: instagram.com/reel/CODE, instagram.com/reels/CODE
  reelUrl: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|reels)\/([A-Za-z0-9_-]+)\/?/,
  // Matches: instagram.com/p/CODE (posts that could be reels)
  postUrl: /(?:https?:\/\/)?(?:www\.)?instagram\.com\/p\/([A-Za-z0-9_-]+)\/?/,
  // Matches shortened URLs
  shortUrl: /(?:https?:\/\/)?(?:www\.)?instagr\.am\/(?:reel|p)\/([A-Za-z0-9_-]+)\/?/,
};

// ============================================
// Rate Limiting
// ============================================

export const RATE_LIMIT = {
  maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || "10", 10),
  windowSeconds: parseInt(process.env.RATE_LIMIT_WINDOW_SECONDS || "60", 10),
};

// ============================================
// Caching
// ============================================

export const CACHE = {
  ttlSeconds: parseInt(process.env.CACHE_TTL_SECONDS || "300", 10),
};

// ============================================
// Feature Flags
// ============================================

export const FEATURES = {
  proMode: process.env.ENABLE_PRO_FEATURES === "true",
  stripe: process.env.ENABLE_STRIPE === "true",
  adsense: !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID,
};

// ============================================
// Error Messages
// ============================================

export const ERROR_MESSAGES: Record<string, string> = {
  INVALID_URL: "Please enter a valid Instagram Reel URL",
  PRIVATE_REEL: "This reel is from a private account and cannot be downloaded",
  REEL_NOT_FOUND: "Reel not found. Please check the URL and try again",
  REEL_REMOVED: "This reel has been removed or is no longer available",
  RATE_LIMITED: "Too many requests. Please wait a moment and try again",
  INSTAGRAM_BLOCKED: "Instagram is blocking direct access. The reel may be private or temporarily unavailable",
  FETCH_FAILED: "Failed to fetch reel. Please try again",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again",
};

// ============================================
// API Endpoints
// ============================================

export const API_ENDPOINTS = {
  fetchReel: "/api/fetch-reel",
  download: "/api/download",
};

// ============================================
// Navigation Links
// ============================================

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/how-to-download-instagram-reels", label: "How It Works" },
  { href: "/privacy-policy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

// ============================================
// Footer Links
// ============================================

export const FOOTER_LINKS = {
  product: [
    { href: "/", label: "Home" },
    { href: "/how-to-download-instagram-reels", label: "How It Works" },
  ],
  legal: [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
  social: [
    { href: "https://twitter.com", label: "Twitter", icon: "twitter" },
    { href: "https://github.com", label: "GitHub", icon: "github" },
  ],
};
