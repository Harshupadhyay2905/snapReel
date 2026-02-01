"use client";

/**
 * Preview Card Component
 * Displays reel thumbnail, author info, and download options
 */

import Image from "next/image";
import { useState } from "react";
import {
  Download,
  Play,
  Heart,
  MessageCircle,
  Eye,
  Clock,
  CheckCircle,
  Loader2,
  User,
} from "lucide-react";
import type { ReelMetadata, DownloadOptions } from "@/lib/types";
import { formatNumber, formatDuration, truncate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PreviewCardProps {
  reel: ReelMetadata;
  onDownload: (options: DownloadOptions) => void;
  isDownloading: boolean;
}

export function PreviewCard({ reel, onDownload, isDownloading }: PreviewCardProps) {
  const [quality, setQuality] = useState<"hd" | "sd">("hd");
  const [showVideo, setShowVideo] = useState(false);

  const handleDownload = () => {
    onDownload({ quality, withWatermark: true });
  };

  return (
    <div className="preview-card">
      <div className="preview-card-inner">
        {/* Thumbnail / Video */}
        <div className="preview-media">
          {showVideo && reel.videoUrl ? (
            <video
              src={reel.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="preview-video"
            />
          ) : (
            <div className="preview-thumbnail-wrapper">
              {reel.thumbnailUrl ? (
                <Image
                  src={reel.thumbnailUrl}
                  alt={`Reel by @${reel.username}`}
                  fill
                  className="preview-thumbnail"
                  unoptimized
                />
              ) : (
                <div className="preview-thumbnail-placeholder">
                  <Play size={48} />
                </div>
              )}
              <button
                className="play-overlay"
                onClick={() => setShowVideo(true)}
                aria-label="Play preview"
              >
                <div className="play-button">
                  <Play size={32} fill="currentColor" />
                </div>
              </button>
              {reel.duration > 0 && (
                <span className="duration-badge">
                  <Clock size={12} />
                  {formatDuration(reel.duration)}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="preview-content">
          {/* Author Info */}
          <div className="preview-author">
            <div className="author-avatar">
              {reel.userProfilePic ? (
                <Image
                  src={reel.userProfilePic}
                  alt={reel.username}
                  fill
                  className="avatar-image"
                  unoptimized
                />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="author-info">
              <div className="author-name-row">
                <span className="author-username">@{reel.username}</span>
                {reel.isVerified && (
                  <CheckCircle size={14} className="verified-badge" fill="currentColor" />
                )}
              </div>
              {reel.userFullName && (
                <span className="author-fullname">{reel.userFullName}</span>
              )}
            </div>
          </div>

          {/* Caption */}
          {reel.caption && (
            <p className="preview-caption">{truncate(reel.caption, 150)}</p>
          )}

          {/* Stats */}
          <div className="preview-stats">
            {reel.viewCount > 0 && (
              <span className="stat">
                <Eye size={14} />
                {formatNumber(reel.viewCount)}
              </span>
            )}
            {reel.likeCount > 0 && (
              <span className="stat">
                <Heart size={14} />
                {formatNumber(reel.likeCount)}
              </span>
            )}
            {reel.commentCount > 0 && (
              <span className="stat">
                <MessageCircle size={14} />
                {formatNumber(reel.commentCount)}
              </span>
            )}
          </div>

          {/* Quality Toggle */}
          <div className="quality-toggle">
            <button
              className={cn("quality-btn", quality === "hd" && "quality-btn-active")}
              onClick={() => setQuality("hd")}
            >
              HD
            </button>
            <button
              className={cn("quality-btn", quality === "sd" && "quality-btn-active")}
              onClick={() => setQuality("sd")}
            >
              SD
            </button>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={cn(
              "preview-download-btn",
              isDownloading && "preview-download-btn-loading"
            )}
          >
            {isDownloading ? (
              <>
                <Loader2 className="spinner" size={20} />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download size={20} />
                <span>Download {quality.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
