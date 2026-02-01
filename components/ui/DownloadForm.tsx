"use client";

/**
 * Download Form Component
 * Input field for Instagram Reel URL with validation and submit button
 */

import { useState, FormEvent } from "react";
import { Link2, Download, Loader2, X } from "lucide-react";
import { isValidInstagramUrl } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface DownloadFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
}

export function DownloadForm({ onSubmit, isLoading }: DownloadFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedUrl = url.trim();

    if (!trimmedUrl) {
      setError("Please enter an Instagram Reel URL");
      return;
    }

    if (!isValidInstagramUrl(trimmedUrl)) {
      setError("Please enter a valid Instagram Reel URL");
      return;
    }

    await onSubmit(trimmedUrl);
  };

  const handleClear = () => {
    setUrl("");
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="download-form">
      <div
        className={cn(
          "input-wrapper",
          isFocused && "input-wrapper-focused",
          error && "input-wrapper-error"
        )}
      >
        <div className="input-icon">
          <Link2 size={20} />
        </div>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            if (error) setError(null);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Paste Instagram Reel URL here..."
          className="url-input"
          disabled={isLoading}
          aria-label="Instagram Reel URL"
          aria-invalid={!!error}
          aria-describedby={error ? "url-error" : undefined}
        />
        {url && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="clear-btn"
            aria-label="Clear URL"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {error && (
        <p id="url-error" className="form-error" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className={cn("download-btn", isLoading && "download-btn-loading")}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="spinner" size={20} />
            <span>Processing...</span>
          </>
        ) : (
          <>
            <Download size={20} />
            <span>Download Reel</span>
          </>
        )}
      </button>

      <p className="form-hint">
        Supports: instagram.com/reel/... and instagram.com/p/... URLs
      </p>
    </form>
  );
}
