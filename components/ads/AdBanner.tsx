"use client";

/**
 * AdSense Advertisement Component
 * 
 * Displays Google AdSense ads in various formats
 */

import { useEffect, useRef } from "react";

interface AdBannerProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidth?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdBanner({ 
  adSlot, 
  adFormat = "auto", 
  fullWidth = true,
  className = "" 
}: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    // Don't load ads if no client ID or already loaded
    if (!adClient || isAdLoaded.current) return;
    
    // Don't load ads in development without client ID
    if (process.env.NODE_ENV === "development" && !adClient) {
      return;
    }

    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, [adClient]);

  // Show placeholder in development
  if (!adClient) {
    return (
      <div className={`ad-placeholder ${className}`}>
        <div className="ad-placeholder-content">
          <span>📢 Ad Space</span>
          <small>Configure NEXT_PUBLIC_ADSENSE_CLIENT_ID</small>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className={`ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: fullWidth ? "100%" : "auto",
        }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  );
}

/**
 * In-Feed Ad - For between content items
 */
export function InFeedAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <AdBanner 
      adSlot={adSlot} 
      adFormat="auto" 
      className={`in-feed-ad ${className}`} 
    />
  );
}

/**
 * Display Ad - Rectangle format for sidebars
 */
export function DisplayAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <AdBanner 
      adSlot={adSlot} 
      adFormat="rectangle" 
      fullWidth={false}
      className={`display-ad ${className}`} 
    />
  );
}

/**
 * Banner Ad - Horizontal format for headers/footers
 */
export function BannerAd({ adSlot, className = "" }: { adSlot: string; className?: string }) {
  return (
    <AdBanner 
      adSlot={adSlot} 
      adFormat="horizontal" 
      className={`banner-ad ${className}`} 
    />
  );
}
