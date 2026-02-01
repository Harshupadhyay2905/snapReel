/**
 * Fetch Reel API Route
 * Handles reel metadata fetching with rate limiting and caching
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchReelMetadata } from "@/lib/instagram";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";
import { getCachedWithMetrics, setCache } from "@/lib/cache";
import {
  isValidInstagramUrl,
  extractShortcode,
  getClientIp,
  createApiError,
} from "@/lib/utils";
import type { FetchReelResponse } from "@/lib/types";

export async function POST(request: NextRequest): Promise<NextResponse<FetchReelResponse>> {
  const startTime = Date.now();

  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request.headers);

    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIp);
    const rateLimitHeaders = getRateLimitHeaders(rateLimitResult.info);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: createApiError("RATE_LIMITED"),
          processingTime: Date.now() - startTime,
        },
        {
          status: 429,
          headers: rateLimitHeaders,
        }
      );
    }

    // Parse request body
    const body = await request.json();
    const { url } = body;

    // Validate URL
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: createApiError("INVALID_URL", "URL is required"),
          processingTime: Date.now() - startTime,
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    if (!isValidInstagramUrl(url)) {
      return NextResponse.json(
        {
          success: false,
          error: createApiError("INVALID_URL"),
          processingTime: Date.now() - startTime,
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    // Extract shortcode for caching
    const shortcode = extractShortcode(url);

    if (!shortcode) {
      return NextResponse.json(
        {
          success: false,
          error: createApiError("INVALID_URL"),
          processingTime: Date.now() - startTime,
        },
        {
          status: 400,
          headers: rateLimitHeaders,
        }
      );
    }

    // Check cache first
    const cachedData = getCachedWithMetrics(shortcode);
    if (cachedData) {
      return NextResponse.json(
        {
          success: true,
          data: cachedData,
          cached: true,
          processingTime: Date.now() - startTime,
        },
        {
          status: 200,
          headers: rateLimitHeaders,
        }
      );
    }

    // Fetch from Instagram
    const result = await fetchReelMetadata(url);

    if (!result.success || !result.data) {
      // Check if it's due to Instagram blocking
      if (result.errorCode === "INSTAGRAM_BLOCKED" || result.errorCode === "FETCH_FAILED") {
        // Check for demo mode flag in request
        const demoMode = body.demoMode === true;
        
        if (demoMode) {
          // Return demo data for testing the UI
          const demoData = {
            id: shortcode,
            shortcode,
            username: "demo_user",
            userFullName: "Demo User",
            userProfilePic: "",
            caption: "This is demo content. The actual reel could not be fetched due to Instagram restrictions. To get full functionality, set up a RapidAPI key.",
            thumbnailUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=600&fit=crop",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            videoUrlHD: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            duration: 60,
            viewCount: 12500,
            likeCount: 1234,
            commentCount: 56,
            timestamp: Date.now() / 1000,
            isVerified: false,
          };
          
          return NextResponse.json(
            {
              success: true,
              data: demoData,
              cached: false,
              demoMode: true,
              processingTime: Date.now() - startTime,
            },
            {
              status: 200,
              headers: rateLimitHeaders,
            }
          );
        }
      }
      
      return NextResponse.json(
        {
          success: false,
          error: createApiError(result.errorCode || "FETCH_FAILED"),
          processingTime: Date.now() - startTime,
        },
        {
          status: result.errorCode === "REEL_NOT_FOUND" ? 404 : 500,
          headers: rateLimitHeaders,
        }
      );
    }

    // Cache the result
    setCache(shortcode, result.data);

    return NextResponse.json(
      {
        success: true,
        data: result.data,
        cached: false,
        processingTime: Date.now() - startTime,
      },
      {
        status: 200,
        headers: rateLimitHeaders,
      }
    );
  } catch (error) {
    console.error("Fetch reel error:", error);

    return NextResponse.json(
      {
        success: false,
        error: createApiError("UNKNOWN_ERROR"),
        processingTime: Date.now() - startTime,
      },
      { status: 500 }
    );
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS(): Promise<NextResponse> {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
