/**
 * How to Download Instagram Reels - SEO Guide Page
 * Optimized for "how to download instagram reels" keywords
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_NAME, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  // Title: 54 chars (optimal: 50-60 chars)
  title: "How to Download Instagram Reels - 2026 Guide (Free)",
  // Description: 159 chars (optimal: 150-160 chars)
  description:
    "Download Instagram Reels in HD for free with this step-by-step guide. Save reels to iPhone, Android or PC. No app needed. Works instantly without login.",
  keywords: [
    "how to download instagram reels",
    "download instagram reels step by step",
    "save instagram reels to phone",
    "instagram reel download guide",
    "download reels without app",
    "copy instagram reel link",
    "download instagram reels free",
    "instagram reels tutorial",
  ],
  alternates: {
    canonical: "/how-to-download-instagram-reels",
  },
  openGraph: {
    type: "article",
    title: "How to Download Instagram Reels - 2026 Guide (Free)",
    description:
      "Download Instagram Reels in HD for free with this step-by-step guide. Save reels to iPhone, Android or PC.",
    url: `${APP_URL}/how-to-download-instagram-reels`,
    siteName: APP_NAME,
    publishedTime: "2026-01-01T00:00:00.000Z",
    modifiedTime: new Date().toISOString(),
    authors: [APP_NAME],
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "How to Download Instagram Reels Guide",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Download Instagram Reels - 2026 Guide (Free)",
    description: "Download Reels in HD for free with this step-by-step guide. No app or login required.",
    images: ["/og-image.png"],
  },
};

// Article structured data for the guide page
const articleStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${APP_URL}/how-to-download-instagram-reels#article`,
      headline: "How to Download Instagram Reels - 2026 Guide (Free)",
      description: "Download Instagram Reels in HD for free with this step-by-step guide. Save reels to iPhone, Android or PC.",
      image: `${APP_URL}/og-image.png`,
      datePublished: "2026-01-01T00:00:00.000Z",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Organization",
        name: APP_NAME,
        url: APP_URL,
      },
      publisher: {
        "@type": "Organization",
        name: APP_NAME,
        url: APP_URL,
        logo: {
          "@type": "ImageObject",
          url: `${APP_URL}/og-image.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${APP_URL}/how-to-download-instagram-reels`,
      },
    },
    {
      "@type": "HowTo",
      "@id": `${APP_URL}/how-to-download-instagram-reels#howto`,
      name: "How to Download Instagram Reels",
      description: "Complete step-by-step guide to download Instagram Reels in HD quality for free using ReelFetch",
      totalTime: "PT1M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "0",
      },
      supply: [],
      tool: [
        { "@type": "HowToTool", name: "Web browser (Chrome, Safari, Firefox, etc.)" },
        { "@type": "HowToTool", name: "Instagram app or website" },
        { "@type": "HowToTool", name: `${APP_NAME} website` },
      ],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Find the Reel You Want to Download",
          text: "Open the Instagram app or website and navigate to the Reel you want to save. You can find Reels in your feed, on the Reels tab, or on a user's profile page.",
          url: `${APP_URL}/how-to-download-instagram-reels#step-1`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Copy the Reel URL",
          text: "On the Instagram app, tap the three dots (⋯) menu on the Reel and select 'Link' or 'Copy Link'. On the web, you can copy the URL directly from your browser's address bar.",
          url: `${APP_URL}/how-to-download-instagram-reels#step-2`,
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: `Paste the URL on ${APP_NAME}`,
          text: `Visit ${APP_NAME} and paste the copied URL into the input field on the homepage. The URL should look something like: https://www.instagram.com/reel/ABC123...`,
          url: `${APP_URL}/how-to-download-instagram-reels#step-3`,
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Click Download",
          text: "Click the 'Download Reel' button. Our server will process the link and fetch the video. This usually takes less than 5 seconds.",
          url: `${APP_URL}/how-to-download-instagram-reels#step-4`,
        },
        {
          "@type": "HowToStep",
          position: 5,
          name: "Preview and Save",
          text: "Once processed, you'll see a preview of the Reel with the creator's information. Choose your preferred quality (HD or SD) and click the download button to save the video to your device.",
          url: `${APP_URL}/how-to-download-instagram-reels#step-5`,
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${APP_URL}/how-to-download-instagram-reels#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: APP_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "How to Download Instagram Reels",
          item: `${APP_URL}/how-to-download-instagram-reels`,
        },
      ],
    },
  ],
};


export default function HowToPage() {
  return (
    <>
      {/* Structured data for this page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      
      <div className="content-page">
        <div className="container">
          {/* Breadcrumb navigation */}
          <nav aria-label="Breadcrumb" style={{ marginBottom: "1.5rem" }}>
            <Link href="/" className="nav-link" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <ArrowLeft size={18} />
              Back to Home
            </Link>
          </nav>

          <header className="content-header">
            <h1 className="content-title">
              How to Download Instagram Reels
            </h1>
            <p className="content-meta">
              Complete guide to downloading Instagram Reels in HD quality • Updated February 2026
            </p>
          </header>

          <article className="prose" itemScope itemType="https://schema.org/HowTo">
            <meta itemProp="name" content="How to Download Instagram Reels" />
            <meta itemProp="totalTime" content="PT1M" />
            
            <section>
              <h2>What is {APP_NAME}?</h2>
              <p>
                {APP_NAME} is a <strong>free online tool</strong> that allows you to download Instagram
                Reels directly to your device. Whether you&apos;re using a smartphone, tablet,
                or computer, our service works seamlessly across all platforms without
                requiring any app installation.
              </p>
            </section>

            <section>
              <h2>Step-by-Step Guide</h2>
              
              <div id="step-1" itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                <h3 itemProp="name">Step 1: Find the Reel You Want to Download</h3>
                <p itemProp="text">
                  Open the Instagram app or website and navigate to the Reel you want to
                  save. You can find Reels in your feed, on the Reels tab, or on a user&apos;s
                  profile page.
                </p>
              </div>

              <div id="step-2" itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                <h3 itemProp="name">Step 2: Copy the Reel URL</h3>
                <p itemProp="text">
                  On the Instagram app, tap the three dots (⋯) menu on the Reel and select
                  &quot;Link&quot; or &quot;Copy Link&quot;. On the web, you can copy the URL directly from
                  your browser&apos;s address bar.
                </p>
              </div>

              <div id="step-3" itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                <h3 itemProp="name">Step 3: Paste the URL on {APP_NAME}</h3>
                <p itemProp="text">
                  Visit <Link href="/">{APP_NAME}</Link> and paste the copied URL into
                  the input field on the homepage. The URL should look something like:
                  <code>https://www.instagram.com/reel/ABC123...</code>
                </p>
              </div>

              <div id="step-4" itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                <h3 itemProp="name">Step 4: Click Download</h3>
                <p itemProp="text">
                  Click the &quot;Download Reel&quot; button. Our server will process the link and
                  fetch the video. This usually takes less than 5 seconds.
                </p>
              </div>

              <div id="step-5" itemScope itemProp="step" itemType="https://schema.org/HowToStep">
                <h3 itemProp="name">Step 5: Preview and Save</h3>
                <p itemProp="text">
                  Once processed, you&apos;ll see a preview of the Reel with the creator&apos;s
                  information. Choose your preferred quality (HD or SD) and click the
                  download button to save the video to your device.
                </p>
              </div>
            </section>

            <section id="faq">
              <h2>Frequently Asked Questions</h2>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name">Is it free to use?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Yes! {APP_NAME} is completely free to use. There are no hidden charges,
                    subscriptions, or premium features required.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name">Do I need to create an account?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    No, you don&apos;t need to create an account or log in. Simply paste the
                    Reel URL and download.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name">Can I download private Reels?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    No, {APP_NAME} can only download Reels from public Instagram accounts.
                    Private content cannot be accessed by our service.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name">What quality can I expect?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    We offer the highest quality available, up to <strong>1080p HD</strong>, depending on
                    the original upload quality of the Reel.
                  </p>
                </div>
              </div>

              <div itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <h3 itemProp="name">Is it legal to download Reels?</h3>
                <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <p itemProp="text">
                    Downloading Reels for personal use is generally allowed. However, you
                    should always respect content creators&apos; rights and not redistribute
                    or use their content commercially without permission.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2>Supported URL Formats</h2>
              <p>
                {APP_NAME} supports various Instagram URL formats:
              </p>
              <ul>
                <li><code>https://www.instagram.com/reel/ABC123/</code></li>
                <li><code>https://instagram.com/reel/ABC123/</code></li>
                <li><code>https://www.instagram.com/p/ABC123/</code></li>
                <li><code>https://instagr.am/reel/ABC123/</code></li>
              </ul>
            </section>

            <section>
              <h2>Tips for Best Results</h2>
              <ul>
                <li>Make sure the Reel is from a <strong>public account</strong></li>
                <li>Copy the <strong>complete URL</strong> including the reel code</li>
                <li>Check your internet connection for faster downloads</li>
                <li>Choose <strong>HD quality</strong> for the best viewing experience</li>
              </ul>
            </section>

            <section>
              <h2>Need Help?</h2>
              <p>
                If you&apos;re experiencing issues downloading a Reel, it could be due to:
              </p>
              <ul>
                <li>The account being private</li>
                <li>The Reel being removed or unavailable</li>
                <li>An invalid or incomplete URL</li>
                <li>Temporary Instagram restrictions</li>
              </ul>
              <p>
                Try again with a different Reel or wait a few minutes before retrying.
              </p>
            </section>

            {/* Related Content - Internal Linking */}
            <section>
              <h2>Related Guides</h2>
              <ul>
                <li>
                  <Link href="/blog/instagram-reel-downloader-without-watermark">
                    Download Instagram Reels Without Watermark
                  </Link> - Learn how to save clean, watermark-free videos
                </li>
                <li>
                  <Link href="/">
                    Free Instagram Reel Downloader
                  </Link> - Try our tool now, no login required
                </li>
              </ul>
            </section>

            {/* CTA Section */}
            <section style={{ textAlign: "center", marginTop: "2rem", padding: "2rem", background: "var(--color-surface)", borderRadius: "1rem" }}>
              <h2>Ready to Download?</h2>
              <p>Start downloading Instagram Reels in HD quality right now.</p>
              <Link 
                href="/" 
                style={{ 
                  display: "inline-block", 
                  marginTop: "1rem", 
                  padding: "0.75rem 2rem", 
                  borderRadius: "0.5rem", 
                  fontWeight: 600,
                  textDecoration: "none"
                }}
                className="btn btn-primary"
              >
                Try {APP_NAME} Free →
              </Link>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}
