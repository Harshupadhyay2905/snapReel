"use client";

/**
 * Error Display Component
 * Shows error messages with retry option
 */

import { AlertCircle, RefreshCw, Lock, Link2Off, Trash2, Clock as ClockIcon, Play } from "lucide-react";
import type { ApiError } from "@/lib/types";

interface ErrorDisplayProps {
  error: ApiError & { lastUrl?: string };
  onRetry: () => void;
  onTryDemo?: (url: string) => void;
}

const ERROR_ICONS: Record<string, typeof AlertCircle> = {
  INVALID_URL: Link2Off,
  PRIVATE_REEL: Lock,
  REEL_NOT_FOUND: AlertCircle,
  REEL_REMOVED: Trash2,
  RATE_LIMITED: ClockIcon,
  INSTAGRAM_BLOCKED: AlertCircle,
  FETCH_FAILED: AlertCircle,
  UNKNOWN_ERROR: AlertCircle,
};

const DEMO_ELIGIBLE_ERRORS = ["INSTAGRAM_BLOCKED", "FETCH_FAILED"];

export function ErrorDisplay({ error, onRetry, onTryDemo }: ErrorDisplayProps) {
  const Icon = ERROR_ICONS[error.code] || AlertCircle;
  const canTryDemo = DEMO_ELIGIBLE_ERRORS.includes(error.code) && onTryDemo && error.lastUrl;

  return (
    <div className="error-display">
      <div className="error-icon">
        <Icon size={32} />
      </div>
      <h3 className="error-title">Oops! Something went wrong</h3>
      <p className="error-message">{error.message}</p>
      {error.details && <p className="error-details">{error.details}</p>}
      <div className="error-actions">
        <button onClick={onRetry} className="error-retry-btn">
          <RefreshCw size={18} />
          <span>Try Again</span>
        </button>
        {canTryDemo && (
          <button 
            onClick={() => onTryDemo(error.lastUrl!)} 
            className="error-demo-btn"
          >
            <Play size={18} />
            <span>Try Demo</span>
          </button>
        )}
      </div>
      {canTryDemo && (
        <p className="error-demo-hint">
          Use demo mode to see how the app works with sample content
        </p>
      )}
    </div>
  );
}
