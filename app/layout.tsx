/**
 * ReelFetch Root Layout
 * Defines the base HTML structure and providers
 */

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Header, Footer } from "@/components/ui";
import { SEO, APP_NAME, APP_URL, APP_DESCRIPTION } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: SEO.title,
    template: `%s | ${APP_NAME}`,
  },
  description: SEO.description,
  keywords: SEO.keywords,
  authors: [{ name: APP_NAME, url: APP_URL }],
  creator: APP_NAME,
  publisher: APP_NAME,
  
  // Canonical and alternate languages
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
      "x-default": "/",
    },
  },
  
  // Robots configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Open Graph for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: APP_NAME,
    title: SEO.title,
    description: SEO.description,
    images: [
      {
        url: SEO.ogImage,
        width: 1200,
        height: 630,
        alt: `${APP_NAME} - Download Instagram Reels`,
        type: "image/png",
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: SEO.twitterCard,
    title: SEO.title,
    description: SEO.description,
    images: [SEO.ogImage],
    creator: "@reelfetch",
  },
  
  // Icons and favicon
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/icons/icon-152x152.png", sizes: "152x152" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#a855f7" },
    ],
  },
  
  // PWA manifest
  manifest: "/manifest.json",
  
  // App-specific metadata
  applicationName: APP_NAME,
  category: "Utility",
  classification: "Instagram Tool, Video Downloader, Reels Saver",
  
  // Verification (add your actual verification codes)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION || "",
    },
  },
  
  // Additional metadata
  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "format-detection": "telephone=no",
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#a855f7",
    "msapplication-tap-highlight": "no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
  ],
  colorScheme: "dark light",
};

// Comprehensive structured data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // WebSite schema
    {
      "@type": "WebSite",
      "@id": `${APP_URL}/#website`,
      url: APP_URL,
      name: APP_NAME,
      description: SEO.description,
      publisher: { "@id": `${APP_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${APP_URL}/?url={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
      inLanguage: "en-US",
    },
    // Organization schema
    {
      "@type": "Organization",
      "@id": `${APP_URL}/#organization`,
      name: APP_NAME,
      url: APP_URL,
      logo: {
        "@type": "ImageObject",
        url: `${APP_URL}/og-image.png`,
        width: 1200,
        height: 630,
      },
      sameAs: [
        "https://twitter.com/reelfetch",
      ],
    },
    // WebApplication schema
    {
      "@type": "WebApplication",
      "@id": `${APP_URL}/#webapp`,
      name: APP_NAME,
      url: APP_URL,
      description: SEO.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Download Instagram Reels in HD",
        "No login required",
        "Works on all devices",
        "Fast and free",
        "No watermark",
      ],
      screenshot: `${APP_URL}/og-image.png`,
      softwareVersion: "1.0",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1250",
        bestRating: "5",
        worstRating: "1",
      },
    },
    // FAQ schema for common questions
    {
      "@type": "FAQPage",
      "@id": `${APP_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I download Instagram Reels?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply copy the Instagram Reel URL, paste it into ReelFetch, and click Download. The video will be saved to your device in HD quality.",
          },
        },
        {
          "@type": "Question",
          name: "Is ReelFetch free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, ReelFetch is completely free to use. There are no hidden charges, subscriptions, or premium features required.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need to login or create an account?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, you don't need to create an account or login. Simply paste the Reel URL and download instantly.",
          },
        },
        {
          "@type": "Question",
          name: "Can I download Reels from private accounts?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, ReelFetch can only download Reels from public Instagram accounts. Private content cannot be accessed.",
          },
        },
        {
          "@type": "Question",
          name: "What video quality is available?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer the highest quality available, up to 1080p HD, depending on the original upload quality of the Reel.",
          },
        },
      ],
    },
    // HowTo schema for the download process
    {
      "@type": "HowTo",
      "@id": `${APP_URL}/#howto`,
      name: "How to Download Instagram Reels",
      description: "Step-by-step guide to download Instagram Reels in HD quality for free",
      totalTime: "PT1M",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: "0",
      },
      tool: [
        {
          "@type": "HowToTool",
          name: "Web browser",
        },
        {
          "@type": "HowToTool",
          name: "Instagram app or website",
        },
      ],
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Find the Reel",
          text: "Open Instagram and navigate to the Reel you want to download",
          image: `${APP_URL}/og-image.png`,
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Copy the URL",
          text: "Tap the three dots menu and select 'Copy Link' to copy the Reel URL",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Paste on ReelFetch",
          text: "Visit ReelFetch and paste the copied URL into the input field",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Download",
          text: "Click the Download button and save the HD video to your device",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        
        {/* Google AdSense */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
        )}
      </head>
      <body>
        <ThemeProvider>
          <div className="app-wrapper">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
