/**
 * How It Works Section Component
 * Step-by-step guide for using the downloader
 */

import { Link2, Search, Download } from "lucide-react";

const STEPS = [
  {
    icon: Link2,
    step: "01",
    title: "Copy the URL",
    description:
      "Open Instagram, find the reel you want, tap the three dots menu, and copy the link",
  },
  {
    icon: Search,
    step: "02",
    title: "Paste & Process",
    description:
      "Paste the copied URL into the input field above and click the Download button",
  },
  {
    icon: Download,
    step: "03",
    title: "Download & Enjoy",
    description:
      "Preview the reel, choose your quality, and download it to your device instantly",
  },
];

export function HowItWorksSection() {
  return (
    <section className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Download Instagram Reels in 3 easy steps
          </p>
        </div>

        <div className="steps-container">
          {STEPS.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.step}</div>
              <div className="step-icon">
                <step.icon size={32} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
              {index < STEPS.length - 1 && (
                <div className="step-connector" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
