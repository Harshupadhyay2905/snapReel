"use client";

/**
 * ReelFetch Home Page
 * Main landing page with hero section and download functionality
 */

import { Sparkles } from "lucide-react";
import { useReelDownloader } from "@/hooks/useReelDownloader";
import {
  DownloadForm,
  PreviewCard,
  ErrorDisplay,
  FeaturesSection,
  HowItWorksSection,
  FAQSection,
} from "@/components/ui";
import { BannerAd, InFeedAd } from "@/components/ads";

export default function HomePage() {
  const {
    isLoading,
    isDownloading,
    reel,
    error,
    fetchReel,
    fetchReelWithDemo,
    downloadReel,
    reset,
  } = useReelDownloader();

  const handleRetry = () => {
    reset();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {/* Badge */}
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>Free & No Login Required</span>
          </div>

          {/* Title */}
          <h1 className="hero-title">
            Download Instagram Reels{" "}
            <span className="hero-title-gradient">Instantly</span>
          </h1>

          {/* Subtitle */}
          <p className="hero-subtitle">
            Save your favorite reels in HD quality. Fast, free, and works on any
            device. No app installation needed.
          </p>

          {/* Download Form */}
          <DownloadForm onSubmit={fetchReel} isLoading={isLoading} />

          {/* Preview Card */}
          {reel && !error && (
            <PreviewCard
              reel={reel}
              onDownload={downloadReel}
              isDownloading={isDownloading}
            />
          )}

          {/* Error Display */}
          {error && <ErrorDisplay error={error} onRetry={handleRetry} onTryDemo={fetchReelWithDemo} />}
        </div>
      </section>

      {/* Ad Banner - After Hero */}
      <BannerAd adSlot="6048988580" />

      {/* Features Section */}
      <FeaturesSection />

      {/* Ad Banner - Between Sections */}
      <InFeedAd adSlot="6048988580" />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Ad Banner - Before FAQ */}
      <BannerAd adSlot="6048988580" />

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}

