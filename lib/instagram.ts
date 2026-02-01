/**
 * Instagram Reel Fetching Logic
 * 
 * Uses instagram120.p.rapidapi.com for fetching reel data
 * This API provides direct video URLs for downloading
 */

import type { ReelMetadata, ErrorCode } from "./types";
import { extractShortcode } from "./utils";

// ============================================
// Configuration
// ============================================

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "";
const RAPIDAPI_HOST = process.env.RAPIDAPI_HOST || "instagram120.p.rapidapi.com";
const USE_RAPIDAPI = !!RAPIDAPI_KEY;

interface Instagram120LinksResponse {
  urls?: Array<{
    url: string;
    name: string;
    extension: string;
  }>;
  meta?: {
    title?: string;
    sourceUrl?: string;
    shortcode?: string;
    commentCount?: number;
    likeCount?: number;
    takenAt?: number;
    username?: string;
  };
  pictureUrl?: string;
  service?: string;
}

// ============================================
// Fetch Reel Metadata
// ============================================

export async function fetchReelMetadata(url: string): Promise<{
  success: boolean;
  data?: ReelMetadata;
  errorCode?: ErrorCode;
}> {
  const shortcode = extractShortcode(url);

  if (!shortcode) {
    return { success: false, errorCode: "INVALID_URL" };
  }

  console.log(`[Instagram] Fetching reel: ${shortcode}`);
  console.log(`[Instagram] RapidAPI enabled: ${USE_RAPIDAPI}`);

  if (USE_RAPIDAPI) {
    const result = await fetchViaInstagram120Links(shortcode, url);
    if (result.success && result.data) {
      return result;
    }
    console.log(`[Instagram] RapidAPI failed:`, result.errorCode);
  }

  // Fallback methods
  const methods = [
    { name: "embed", fn: () => fetchViaEmbed(shortcode) },
  ];

  for (const method of methods) {
    try {
      console.log(`[Instagram] Trying method: ${method.name}`);
      const result = await method.fn();
      if (result.success && result.data) {
        console.log(`[Instagram] Success with method: ${method.name}`);
        return result;
      }
      console.log(`[Instagram] Method ${method.name} failed:`, result.errorCode);
    } catch (error) {
      console.error(`[Instagram] Method ${method.name} error:`, error);
    }
  }

  return { 
    success: false, 
    errorCode: USE_RAPIDAPI ? "FETCH_FAILED" : "INSTAGRAM_BLOCKED",
  };
}

/**
 * Method 1: Instagram120 RapidAPI - /api/instagram/links endpoint
 */
async function fetchViaInstagram120Links(shortcode: string, originalUrl: string): Promise<{
  success: boolean;
  data?: ReelMetadata;
  errorCode?: ErrorCode;
}> {
  try {
    const apiUrl = `https://${RAPIDAPI_HOST}/api/instagram/links`;
    
    // Normalize the URL to reel format
    const reelUrl = originalUrl.includes("/reel/") 
      ? originalUrl 
      : `https://www.instagram.com/reel/${shortcode}/`;

    console.log(`[Instagram120] Fetching links for: ${shortcode}`);
    
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
      },
      body: JSON.stringify({ url: reelUrl }),
    });

    if (!response.ok) {
      console.error("[Instagram120] Request failed:", response.status);
      return { success: false, errorCode: "FETCH_FAILED" };
    }

    const result = await response.json();
    console.log("[Instagram120] Response received");
    
    // Parse the response - it returns an array
    return parseInstagram120LinksResponse(result, shortcode);
  } catch (error) {
    console.error("[Instagram120] Error:", error);
    return { success: false, errorCode: "FETCH_FAILED" };
  }
}

/**
 * Parse Instagram120 Links API response
 */
function parseInstagram120LinksResponse(result: unknown, shortcode: string): {
  success: boolean;
  data?: ReelMetadata;
  errorCode?: ErrorCode;
} {
  try {
    // Response is an array
    const responses = Array.isArray(result) ? result : [result];
    
    if (responses.length === 0) {
      console.log("[Instagram120] Empty response");
      return { success: false, errorCode: "REEL_NOT_FOUND" };
    }

    const data = responses[0] as Instagram120LinksResponse;
    
    if (!data || !data.urls || data.urls.length === 0) {
      console.log("[Instagram120] No URLs in response");
      return { success: false, errorCode: "FETCH_FAILED" };
    }

    // Get the video URL (usually MP4)
    const videoEntry = data.urls.find(u => u.extension === "mp4" || u.name === "MP4");
    const videoUrl = videoEntry?.url || data.urls[0]?.url || "";

    if (!videoUrl) {
      console.log("[Instagram120] No video URL found");
      return { success: false, errorCode: "FETCH_FAILED" };
    }

    // Build the metadata
    const metadata: ReelMetadata = {
      id: data.meta?.shortcode || shortcode,
      shortcode: data.meta?.shortcode || shortcode,
      username: data.meta?.username || "Unknown",
      userFullName: "",
      userProfilePic: "",
      caption: data.meta?.title?.substring(0, 500) || "",
      thumbnailUrl: data.pictureUrl || "",
      videoUrl,
      videoUrlHD: videoUrl,
      duration: 0,
      viewCount: 0,
      likeCount: data.meta?.likeCount || 0,
      commentCount: data.meta?.commentCount || 0,
      timestamp: data.meta?.takenAt || Date.now() / 1000,
      isVerified: false,
    };

    console.log(`[Instagram120] Successfully parsed reel: @${metadata.username}`);
    console.log(`[Instagram120] Video URL length: ${videoUrl.length}`);
    console.log(`[Instagram120] Likes: ${metadata.likeCount}, Comments: ${metadata.commentCount}`);
    
    return { success: true, data: metadata };
  } catch (error) {
    console.error("[Instagram120] Parse error:", error);
    return { success: false, errorCode: "FETCH_FAILED" };
  }
}

/**
 * Fallback: Embed page parsing
 */
async function fetchViaEmbed(shortcode: string): Promise<{
  success: boolean;
  data?: ReelMetadata;
  errorCode?: ErrorCode;
}> {
  try {
    const embedUrl = `https://www.instagram.com/reel/${shortcode}/embed/captioned/`;
    
    const userAgents = [
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    ];

    const response = await fetch(embedUrl, {
      headers: {
        "User-Agent": userAgents[Math.floor(Math.random() * userAgents.length)],
        Accept: "text/html",
        "Accept-Language": "en-US,en;q=0.9",
        Referer: "https://www.google.com/",
      },
    });

    if (!response.ok) {
      return { success: false, errorCode: "FETCH_FAILED" };
    }

    const html = await response.text();

    // Check for errors
    if (html.includes("Page Not Found") || html.includes("isn't available")) {
      return { success: false, errorCode: "REEL_NOT_FOUND" };
    }

    if (html.includes("This Account is Private") || html.includes("is_private\":true")) {
      return { success: false, errorCode: "PRIVATE_REEL" };
    }

    let videoUrl = "";
    let thumbnailUrl = "";
    let username = "";

    // Try to extract video URL from various patterns
    const videoPatterns = [
      /"video_url"\s*:\s*"([^"]+)"/,
      /video_url\\?":\\?"([^"\\]+)/,
      /"playback_url"\s*:\s*"([^"]+)"/,
      /src="(https:\/\/[^"]+\.mp4[^"]*)"/,
    ];

    for (const pattern of videoPatterns) {
      const match = html.match(pattern);
      if (match) {
        videoUrl = match[1]
          .replace(/\\u0026/g, "&")
          .replace(/\\\//g, "/")
          .replace(/\\"/g, '"');
        break;
      }
    }

    // Extract thumbnail
    const thumbPatterns = [
      /"display_url":"([^"]+)"/,
      /poster="([^"]+)"/,
    ];

    for (const pattern of thumbPatterns) {
      const match = html.match(pattern);
      if (match) {
        thumbnailUrl = match[1].replace(/\\u0026/g, "&").replace(/\\\//g, "/");
        break;
      }
    }

    // Extract username
    const userMatch = html.match(/"username":"([^"]+)"/);
    username = userMatch?.[1] || "Unknown";

    return {
      success: !!videoUrl,
      data: videoUrl ? {
        id: shortcode,
        shortcode,
        username,
        userFullName: "",
        userProfilePic: "",
        caption: "",
        thumbnailUrl,
        videoUrl,
        videoUrlHD: videoUrl,
        duration: 0,
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        timestamp: Date.now() / 1000,
        isVerified: false,
      } : undefined,
      errorCode: videoUrl ? undefined : "FETCH_FAILED",
    };
  } catch (error) {
    console.error("[Embed] Error:", error);
    return { success: false, errorCode: "FETCH_FAILED" };
  }
}

/**
 * Get video download URL
 */
export async function getDownloadUrl(
  videoUrl: string
): Promise<{ success: boolean; url?: string; errorCode?: ErrorCode }> {
  if (!videoUrl) {
    return { success: false, errorCode: "FETCH_FAILED" };
  }

  try {
    // The video URL from Instagram should be directly downloadable
    const response = await fetch(videoUrl, {
      method: "HEAD",
    });

    if (!response.ok) {
      return { success: false, errorCode: "FETCH_FAILED" };
    }

    return { success: true, url: response.url };
  } catch {
    return { success: false, errorCode: "FETCH_FAILED" };
  }
}
