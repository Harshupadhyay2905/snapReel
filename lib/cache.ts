/**
 * Caching Implementation
 * In-memory cache for reel metadata to reduce Instagram API calls
 */

import { CACHE } from "./constants";
import type { CacheEntry, ReelMetadata } from "./types";

// ============================================
// In-Memory Cache Store
// ============================================

const cache = new Map<string, CacheEntry<ReelMetadata>>();

// Maximum cache entries (prevent memory bloat)
const MAX_CACHE_ENTRIES = 1000;

// ============================================
// Cache Functions
// ============================================

/**
 * Get cached reel metadata
 * @param shortcode - Reel shortcode
 * @returns Cached data or null if not found/expired
 */
export function getCached(shortcode: string): ReelMetadata | null {
  const entry = cache.get(shortcode);

  if (!entry) {
    return null;
  }

  // Check if expired
  const now = Date.now();
  if (now > entry.timestamp + entry.ttl * 1000) {
    cache.delete(shortcode);
    return null;
  }

  return entry.data;
}

/**
 * Set reel metadata in cache
 * @param shortcode - Reel shortcode
 * @param data - Reel metadata to cache
 * @param ttl - Time to live in seconds (optional, uses default)
 */
export function setCache(
  shortcode: string,
  data: ReelMetadata,
  ttl: number = CACHE.ttlSeconds
): void {
  // Evict oldest entries if cache is full
  if (cache.size >= MAX_CACHE_ENTRIES) {
    evictOldest();
  }

  cache.set(shortcode, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

/**
 * Delete cached entry
 * @param shortcode - Reel shortcode
 */
export function deleteCache(shortcode: string): void {
  cache.delete(shortcode);
}

/**
 * Clear entire cache
 */
export function clearCache(): void {
  cache.clear();
}

/**
 * Get cache statistics
 * @returns Cache stats object
 */
export function getCacheStats(): {
  size: number;
  maxSize: number;
  hitRate: number;
} {
  return {
    size: cache.size,
    maxSize: MAX_CACHE_ENTRIES,
    hitRate: cacheHits / (cacheHits + cacheMisses) || 0,
  };
}

// ============================================
// Cache Metrics
// ============================================

let cacheHits = 0;
let cacheMisses = 0;

/**
 * Get cached data with metrics tracking
 * @param shortcode - Reel shortcode
 * @returns Cached data or null
 */
export function getCachedWithMetrics(shortcode: string): ReelMetadata | null {
  const data = getCached(shortcode);

  if (data) {
    cacheHits++;
  } else {
    cacheMisses++;
  }

  return data;
}

// ============================================
// Helper Functions
// ============================================

/**
 * Evict oldest cache entries (LRU-style eviction)
 * Removes 10% of entries based on timestamp
 */
function evictOldest(): void {
  const entries = Array.from(cache.entries());

  // Sort by timestamp (oldest first)
  entries.sort((a, b) => a[1].timestamp - b[1].timestamp);

  // Remove oldest 10%
  const toRemove = Math.ceil(entries.length * 0.1);
  for (let i = 0; i < toRemove; i++) {
    cache.delete(entries[i][0]);
  }
}

/**
 * Clean up expired entries
 * Called periodically or before heavy operations
 */
export function cleanupExpired(): number {
  const now = Date.now();
  let removed = 0;

  for (const [key, entry] of cache.entries()) {
    if (now > entry.timestamp + entry.ttl * 1000) {
      cache.delete(key);
      removed++;
    }
  }

  return removed;
}

// Periodic cleanup every 5 minutes
setInterval(cleanupExpired, 5 * 60 * 1000);
