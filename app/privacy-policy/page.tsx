/**
 * Privacy Policy Page
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_NAME, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${APP_NAME}. Learn how we handle your data and protect your privacy.`,
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="content-page">
      <div className="container">
        <Link href="/" className="nav-link" style={{ marginBottom: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <header className="content-header">
          <h1 className="content-title">Privacy Policy</h1>
          <p className="content-meta">Last updated: {lastUpdated}</p>
        </header>

        <article className="prose">
          <h2>Introduction</h2>
          <p>
            Welcome to {APP_NAME} ("{APP_NAME}", "we", "our", or "us"). We are
            committed to protecting your privacy and being transparent about
            the data we collect when you use our service at{" "}
            <a href={APP_URL}>{APP_URL}</a>.
          </p>
          <p>
            This Privacy Policy explains what information we collect, how we use
            it, and your rights regarding your data.
          </p>

          <h2>Information We Collect</h2>

          <h3>Information You Provide</h3>
          <p>
            When you use {APP_NAME}, you provide Instagram Reel URLs for
            processing. We do not require any personal information such as your
            name, email, or Instagram credentials.
          </p>

          <h3>Automatic Information</h3>
          <p>When you visit our website, we may automatically collect:</p>
          <ul>
            <li>IP address (for rate limiting purposes only)</li>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>Referring website</li>
            <li>Pages visited and time spent</li>
            <li>Date and time of your visit</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Process Instagram Reel URLs and provide download links</li>
            <li>Implement rate limiting to prevent abuse</li>
            <li>Improve our service and user experience</li>
            <li>Analyze usage patterns and trends</li>
            <li>Maintain security and prevent fraud</li>
          </ul>

          <h2>Data Retention</h2>
          <p>
            We do not permanently store Instagram Reel URLs or downloaded
            videos. URL processing is temporary and data is automatically
            cleared after processing. We may cache reel metadata briefly (up to
            5 minutes) to improve performance for repeated requests.
          </p>

          <h2>Cookies</h2>
          <p>
            We may use cookies and similar technologies for:
          </p>
          <ul>
            <li>Remembering your theme preference (dark/light mode)</li>
            <li>Analytics and performance monitoring</li>
          </ul>
          <p>
            You can control cookies through your browser settings. Disabling
            cookies may affect some functionality.
          </p>

          <h2>Third-Party Services</h2>
          <p>We may use third-party services for:</p>
          <ul>
            <li>
              <strong>Analytics:</strong> To understand how our service is used
            </li>
            <li>
              <strong>Advertising:</strong> We may display ads through Google
              AdSense (optional)
            </li>
            <li>
              <strong>Hosting:</strong> Our service is hosted on secure cloud
              infrastructure
            </li>
          </ul>
          <p>
            These services have their own privacy policies governing their use
            of your data.
          </p>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your data,
            including:
          </p>
          <ul>
            <li>HTTPS encryption for all communications</li>
            <li>Regular security audits</li>
            <li>Limited data retention</li>
            <li>Secure server infrastructure</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access information about your data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of analytics tracking</li>
            <li>Control cookie preferences</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not
            knowingly collect personal information from children.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on this page and
            updating the "Last updated" date.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us
            through our website.
          </p>
        </article>
      </div>
    </div>
  );
}
