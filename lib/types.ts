/**
 * ReelFetch Type Definitions
 * Core types used throughout the application
 */

// ============================================
// Reel Data Types
// ============================================

export interface ReelMetadata {
  id: string;
  shortcode: string;
  username: string;
  userFullName: string;
  userProfilePic: string;
  caption: string;
  thumbnailUrl: string;
  videoUrl: string;
  videoUrlHD: string;
  duration: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  timestamp: number;
  isVerified: boolean;
}

export interface DownloadOptions {
  quality: "sd" | "hd";
  withWatermark: boolean;
}

export interface DownloadResponse {
  success: boolean;
  data?: ReelMetadata;
  downloadUrl?: string;
  error?: string;
  errorCode?: ErrorCode;
}

// ============================================
// Error Types
// ============================================

export type ErrorCode =
  | "INVALID_URL"
  | "PRIVATE_REEL"
  | "REEL_NOT_FOUND"
  | "REEL_REMOVED"
  | "RATE_LIMITED"
  | "INSTAGRAM_BLOCKED"
  | "FETCH_FAILED"
  | "UNKNOWN_ERROR";

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: string;
}

// ============================================
// API Types
// ============================================

export interface FetchReelRequest {
  url: string;
  options?: DownloadOptions;
}

export interface FetchReelResponse {
  success: boolean;
  data?: ReelMetadata;
  error?: ApiError;
  cached?: boolean;
  processingTime?: number;
}

// ============================================
// Rate Limiting Types
// ============================================

export interface RateLimitInfo {
  remaining: number;
  limit: number;
  resetTime: number;
}

export interface RateLimitResult {
  allowed: boolean;
  info: RateLimitInfo;
}

// ============================================
// Cache Types
// ============================================

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

// ============================================
// Theme Types
// ============================================

export type Theme = "light" | "dark" | "system";

// ============================================
// Component Props Types
// ============================================

export interface DownloadFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export interface PreviewCardProps {
  reel: ReelMetadata;
  onDownload: (options: DownloadOptions) => void;
  isDownloading: boolean;
}

export interface ErrorDisplayProps {
  error: ApiError;
  onRetry: () => void;
}
