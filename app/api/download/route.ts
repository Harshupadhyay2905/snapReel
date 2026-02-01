/**
 * Download API Route
 * Proxies video download to avoid CORS issues
 */

import { NextRequest, NextResponse } from "next/server";
import { getClientIp } from "@/lib/utils";
import { checkRateLimit, getRateLimitHeaders } from "@/lib/rate-limit";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Get video URL from query parameter
  const videoUrl = request.nextUrl.searchParams.get("url");
  const filename = request.nextUrl.searchParams.get("filename") || "reel.mp4";

  if (!videoUrl) {
    return NextResponse.json(
      { error: "Video URL is required" },
      { status: 400 }
    );
  }

  // Basic validation - must be from Instagram CDN
  const validDomains = ["cdninstagram.com", "fbcdn.net"];
  let isValidDomain = false;

  try {
    const url = new URL(videoUrl);
    isValidDomain = validDomains.some((domain) => url.hostname.includes(domain));
  } catch {
    return NextResponse.json(
      { error: "Invalid URL format" },
      { status: 400 }
    );
  }

  if (!isValidDomain) {
    return NextResponse.json(
      { error: "Invalid video source" },
      { status: 400 }
    );
  }

  // Check rate limit
  const clientIp = getClientIp(request.headers);
  const rateLimitResult = checkRateLimit(clientIp);
  const rateLimitHeaders = getRateLimitHeaders(rateLimitResult.info);

  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { error: "Rate limit exceeded" },
      {
        status: 429,
        headers: rateLimitHeaders,
      }
    );
  }

  try {
    // Fetch the video
    const response = await fetch(videoUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch video" },
        { status: response.status }
      );
    }

    // Get content type and length
    const contentType = response.headers.get("content-type") || "video/mp4";
    const contentLength = response.headers.get("content-length");

    // Stream the response
    const headers = new Headers({
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
      ...rateLimitHeaders,
    });

    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    // Return streaming response
    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error("Download proxy error:", error);
    return NextResponse.json(
      { error: "Download failed" },
      { status: 500 }
    );
  }
}
