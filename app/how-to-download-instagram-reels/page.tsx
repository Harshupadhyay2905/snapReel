/**
 * How to Download Instagram Reels - SEO Guide Page
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "How to Download Instagram Reels - Complete Guide",
  description:
    "Learn how to download Instagram Reels in HD quality for free. Step-by-step guide to save reels to your device using ReelFetch.",
  alternates: {
    canonical: "/how-to-download-instagram-reels",
  },
};

export default function HowToPage() {
  return (
    <div className="content-page">
      <div className="container">
        <Link href="/" className="nav-link" style={{ marginBottom: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <header className="content-header">
          <h1 className="content-title">
            How to Download Instagram Reels
          </h1>
          <p className="content-meta">
            Complete guide to downloading Instagram Reels in HD quality
          </p>
        </header>

        <article className="prose">
          <h2>What is {APP_NAME}?</h2>
          <p>
            {APP_NAME} is a free online tool that allows you to download Instagram
            Reels directly to your device. Whether you're using a smartphone, tablet,
            or computer, our service works seamlessly across all platforms without
            requiring any app installation.
          </p>

          <h2>Step-by-Step Guide</h2>
          
          <h3>Step 1: Find the Reel You Want to Download</h3>
          <p>
            Open the Instagram app or website and navigate to the Reel you want to
            save. You can find Reels in your feed, on the Reels tab, or on a user's
            profile page.
          </p>

          <h3>Step 2: Copy the Reel URL</h3>
          <p>
            On the Instagram app, tap the three dots (⋯) menu on the Reel and select
            "Link" or "Copy Link". On the web, you can copy the URL directly from
            your browser's address bar.
          </p>

          <h3>Step 3: Paste the URL on {APP_NAME}</h3>
          <p>
            Visit <Link href="/">{APP_NAME}</Link> and paste the copied URL into
            the input field on the homepage. The URL should look something like:
            <code>https://www.instagram.com/reel/ABC123...</code>
          </p>

          <h3>Step 4: Click Download</h3>
          <p>
            Click the "Download Reel" button. Our server will process the link and
            fetch the video. This usually takes less than 5 seconds.
          </p>

          <h3>Step 5: Preview and Save</h3>
          <p>
            Once processed, you'll see a preview of the Reel with the creator's
            information. Choose your preferred quality (HD or SD) and click the
            download button to save the video to your device.
          </p>

          <h2>Frequently Asked Questions</h2>

          <h3>Is it free to use?</h3>
          <p>
            Yes! {APP_NAME} is completely free to use. There are no hidden charges,
            subscriptions, or premium features required.
          </p>

          <h3>Do I need to create an account?</h3>
          <p>
            No, you don't need to create an account or log in. Simply paste the
            Reel URL and download.
          </p>

          <h3>Can I download private Reels?</h3>
          <p>
            No, {APP_NAME} can only download Reels from public Instagram accounts.
            Private content cannot be accessed by our service.
          </p>

          <h3>What quality can I expect?</h3>
          <p>
            We offer the highest quality available, up to 1080p HD, depending on
            the original upload quality of the Reel.
          </p>

          <h3>Is it legal to download Reels?</h3>
          <p>
            Downloading Reels for personal use is generally allowed. However, you
            should always respect content creators' rights and not redistribute
            or use their content commercially without permission.
          </p>

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

          <h2>Tips for Best Results</h2>
          <ul>
            <li>Make sure the Reel is from a public account</li>
            <li>Copy the complete URL including the reel code</li>
            <li>Check your internet connection for faster downloads</li>
            <li>Choose HD quality for the best viewing experience</li>
          </ul>

          <h2>Need Help?</h2>
          <p>
            If you're experiencing issues downloading a Reel, it could be due to:
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
        </article>
      </div>
    </div>
  );
}
