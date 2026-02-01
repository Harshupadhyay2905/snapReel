/**
 * ReelFetch Utility Functions
 * Common helper functions used throughout the application
 */

import { clsx, type ClassValue } from "clsx";
import { INSTAGRAM_PATTERNS, ERROR_MESSAGES } from "./constants";
import type { ErrorCode, ApiError } from "./types";

// ============================================
// Class Name Utilities
// ============================================

/**
 * Merge class names with conditional support
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

// ============================================
// URL Validation
// ============================================

/**
 * Validate if a URL is a valid Instagram Reel URL
 * @param url - The URL to validate
 * @returns boolean indicating if the URL is valid
 */
export function isValidInstagramUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;

  const trimmedUrl = url.trim();

  return (
    INSTAGRAM_PATTERNS.reelUrl.test(trimmedUrl) ||
    INSTAGRAM_PATTERNS.postUrl.test(trimmedUrl) ||
    INSTAGRAM_PATTERNS.shortUrl.test(trimmedUrl)
  );
}

/**
 * Extract shortcode from Instagram URL
 * @param url - Instagram URL
 * @returns Shortcode or null if not found
 */
export function extractShortcode(url: string): string | null {
  if (!url) return null;

  const trimmedUrl = url.trim();

  // Try each pattern
  for (const pattern of Object.values(INSTAGRAM_PATTERNS)) {
    const match = trimmedUrl.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

/**
 * Normalize Instagram URL to standard format
 * @param url - Instagram URL in any format
 * @returns Normalized URL
 */
export function normalizeInstagramUrl(url: string): string {
  const shortcode = extractShortcode(url);
  if (!shortcode) return url;

  return `https://www.instagram.com/reel/${shortcode}/`;
}

// ============================================
// Formatting Utilities
// ============================================

/**
 * Format a number with abbreviations (K, M, B)
 * @param num - Number to format
 * @returns Formatted string
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}

/**
 * Format duration in seconds to mm:ss
 * @param seconds - Duration in seconds
 * @returns Formatted duration string
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Format timestamp to relative time
 * @param timestamp - Unix timestamp in seconds
 * @returns Relative time string
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now() / 1000;
  const diff = now - timestamp;

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

// ============================================
// Error Handling
// ============================================

/**
 * Create an API error object
 * @param code - Error code
 * @param details - Optional error details
 * @returns ApiError object
 */
export function createApiError(code: ErrorCode, details?: string): ApiError {
  return {
    code,
    message: ERROR_MESSAGES[code] || ERROR_MESSAGES.UNKNOWN_ERROR,
    details,
  };
}

// ============================================
// Rate Limiting Helpers
// ============================================

/**
 * Get client IP from request headers
 * @param headers - Request headers
 * @returns IP address string
 */
export function getClientIp(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip") ||
    headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

// ============================================
// String Utilities
// ============================================

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export function truncate(text: string, maxLength: number): string {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + "...";
}

/**
 * Sanitize text for display
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export function sanitizeText(text: string): string {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// ============================================
// Async Utilities
// ============================================

/**
 * Sleep for specified milliseconds
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry a function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param baseDelay - Base delay in milliseconds
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

// ============================================
// File Utilities
// ============================================

/**
 * Generate a filename for download
 * @param username - Instagram username
 * @param shortcode - Reel shortcode
 * @returns Filename string
 */
export function generateFilename(username: string, shortcode: string): string {
  const sanitizedUsername = username.replace(/[^a-zA-Z0-9]/g, "_");
  return `reel_${sanitizedUsername}_${shortcode}.mp4`;
}
