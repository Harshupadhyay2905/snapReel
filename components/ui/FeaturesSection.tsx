/**
 * Features Section Component
 * Highlights key features of the application
 */

import { Zap, Shield, Smartphone, Download, Clock, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Download reels in under 5 seconds with our optimized servers",
  },
  {
    icon: Download,
    title: "HD Quality",
    description: "Get the highest quality video available, up to 1080p resolution",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "No login required, no data stored. Your privacy is our priority",
  },
  {
    icon: Smartphone,
    title: "Works Everywhere",
    description: "Use on any device - desktop, tablet, or mobile. No app needed",
  },
  {
    icon: Clock,
    title: "No Limits",
    description: "Download as many reels as you want, completely free",
  },
  {
    icon: Star,
    title: "Easy to Use",
    description: "Just paste the URL and click download. It's that simple",
  },
];

export function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose ReelFetch?</h2>
          <p className="section-subtitle">
            The fastest and easiest way to download Instagram Reels
          </p>
        </div>

        <div className="features-grid">
          {FEATURES.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                <feature.icon size={28} />
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
