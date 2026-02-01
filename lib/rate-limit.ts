/**
 * Rate Limiting Implementation
 * In-memory rate limiting per IP address
 */

import { RATE_LIMIT } from "./constants";
import type { RateLimitResult, RateLimitInfo } from "./types";

// ============================================
// In-Memory Rate Limit Store
// ============================================

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// Store rate limit data in memory
// In production, consider using Redis for distributed rate limiting
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries periodically
const CLEANUP_INTERVAL = 60000; // 1 minute

let cleanupTimer: ReturnType<typeof setInterval> | null = null;

function startCleanup(): void {
  if (cleanupTimer) return;

  cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, CLEANUP_INTERVAL);
}

// Start cleanup on module load
startCleanup();

// ============================================
// Rate Limiting Functions
// ============================================

/**
 * Check and update rate limit for an IP address
 * @param ip - Client IP address
 * @returns Rate limit result with remaining requests and reset time
 */
export function checkRateLimit(ip: string): RateLimitResult {
  const now = Date.now();
  const windowMs = RATE_LIMIT.windowSeconds * 1000;
  const maxRequests = RATE_LIMIT.maxRequests;

  // Get or create entry for this IP
  let entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    // Create new entry
    entry = {
      count: 1,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(ip, entry);

    return {
      allowed: true,
      info: {
        remaining: maxRequests - 1,
        limit: maxRequests,
        resetTime: entry.resetTime,
      },
    };
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      info: {
        remaining: 0,
        limit: maxRequests,
        resetTime: entry.resetTime,
      },
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(ip, entry);

  return {
    allowed: true,
    info: {
      remaining: maxRequests - entry.count,
      limit: maxRequests,
      resetTime: entry.resetTime,
    },
  };
}

/**
 * Get rate limit info without incrementing
 * @param ip - Client IP address
 * @returns Rate limit info
 */
export function getRateLimitInfo(ip: string): RateLimitInfo {
  const now = Date.now();
  const windowMs = RATE_LIMIT.windowSeconds * 1000;
  const maxRequests = RATE_LIMIT.maxRequests;

  const entry = rateLimitStore.get(ip);

  if (!entry || now > entry.resetTime) {
    return {
      remaining: maxRequests,
      limit: maxRequests,
      resetTime: now + windowMs,
    };
  }

  return {
    remaining: Math.max(0, maxRequests - entry.count),
    limit: maxRequests,
    resetTime: entry.resetTime,
  };
}

/**
 * Reset rate limit for an IP (for testing or admin purposes)
 * @param ip - Client IP address
 */
export function resetRateLimit(ip: string): void {
  rateLimitStore.delete(ip);
}

/**
 * Generate rate limit headers for response
 * @param info - Rate limit info
 * @returns Headers object
 */
export function getRateLimitHeaders(info: RateLimitInfo): Record<string, string> {
  return {
    "X-RateLimit-Limit": info.limit.toString(),
    "X-RateLimit-Remaining": info.remaining.toString(),
    "X-RateLimit-Reset": Math.ceil(info.resetTime / 1000).toString(),
    "Retry-After": Math.ceil((info.resetTime - Date.now()) / 1000).toString(),
  };
}
