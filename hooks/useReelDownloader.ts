"use client";

/**
 * useReelDownloader Hook
 * Custom hook for handling reel fetching and downloading
 */

import { useState, useCallback } from "react";
import type { ReelMetadata, DownloadOptions, ApiError } from "@/lib/types";
import { generateFilename } from "@/lib/utils";
import { API_ENDPOINTS } from "@/lib/constants";

interface UseReelDownloaderState {
  isLoading: boolean;
  isDownloading: boolean;
  reel: ReelMetadata | null;
  error: ApiError | null;
  cached: boolean;
  processingTime: number;
}

interface UseReelDownloaderReturn extends UseReelDownloaderState {
  fetchReel: (url: string) => Promise<void>;
  fetchReelWithDemo: (url: string) => Promise<void>;
  downloadReel: (options?: DownloadOptions) => Promise<void>;
  reset: () => void;
}

const initialState: UseReelDownloaderState = {
  isLoading: false,
  isDownloading: false,
  reel: null,
  error: null,
  cached: false,
  processingTime: 0,
};

export function useReelDownloader(): UseReelDownloaderReturn {
  const [state, setState] = useState<UseReelDownloaderState>(initialState);

  /**
   * Fetch reel metadata from API
   */
  const fetchReel = useCallback(async (url: string, demoMode: boolean = false): Promise<void> => {
    setState((prev) => ({
      ...prev,
      isLoading: true,
      error: null,
      reel: null,
    }));

    try {
      const response = await fetch(API_ENDPOINTS.fetchReel, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url, demoMode }),
      });

      const data = await response.json();

      if (!data.success) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: {
            ...data.error,
            lastUrl: url, // Store URL for retry with demo
          },
          processingTime: data.processingTime || 0,
        }));
        return;
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        reel: data.data,
        cached: data.cached || false,
        processingTime: data.processingTime || 0,
      }));
    } catch (error) {
      console.error("Fetch reel error:", error);
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: {
          code: "UNKNOWN_ERROR",
          message: "An unexpected error occurred. Please try again.",
        },
      }));
    }
  }, []);

  /**
   * Retry fetch with demo mode
   */
  const fetchReelWithDemo = useCallback(async (url: string): Promise<void> => {
    await fetchReel(url, true);
  }, [fetchReel]);

  /**
   * Download the reel video
   */
  const downloadReel = useCallback(
    async (options: DownloadOptions = { quality: "hd", withWatermark: true }): Promise<void> => {
      if (!state.reel) return;

      setState((prev) => ({ ...prev, isDownloading: true }));

      try {
        const videoUrl = options.quality === "hd" ? state.reel.videoUrlHD : state.reel.videoUrl;
        const filename = generateFilename(state.reel.username, state.reel.shortcode);

        // Use the download proxy API
        const downloadUrl = `${API_ENDPOINTS.download}?url=${encodeURIComponent(videoUrl)}&filename=${encodeURIComponent(filename)}`;

        // Create a temporary link and trigger download
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = filename;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setState((prev) => ({ ...prev, isDownloading: false }));
      } catch (error) {
        console.error("Download error:", error);
        setState((prev) => ({
          ...prev,
          isDownloading: false,
          error: {
            code: "FETCH_FAILED",
            message: "Failed to download the reel. Please try again.",
          },
        }));
      }
    },
    [state.reel]
  );

  /**
   * Reset state to initial values
   */
  const reset = useCallback((): void => {
    setState(initialState);
  }, []);

  return {
    ...state,
    fetchReel,
    fetchReelWithDemo,
    downloadReel,
    reset,
  };
}
