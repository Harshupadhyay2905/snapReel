/**
 * Terms of Service Page
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { APP_NAME, APP_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${APP_NAME}. Read our terms and conditions for using the service.`,
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "February 1, 2026";

  return (
    <div className="content-page">
      <div className="container">
        <Link href="/" className="nav-link" style={{ marginBottom: "2rem", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <header className="content-header">
          <h1 className="content-title">Terms of Service</h1>
          <p className="content-meta">Last updated: {lastUpdated}</p>
        </header>

        <article className="prose">
          <h2>Acceptance of Terms</h2>
          <p>
            By accessing and using {APP_NAME} ("{APP_NAME}", "Service", "we",
            "our", or "us") at <a href={APP_URL}>{APP_URL}</a>, you agree to be
            bound by these Terms of Service ("Terms"). If you do not agree to
            these Terms, please do not use our Service.
          </p>

          <h2>Description of Service</h2>
          <p>
            {APP_NAME} provides a free online tool that allows users to download
            publicly available Instagram Reels for personal use. We facilitate
            the download process but do not host or store the downloaded
            content.
          </p>

          <h2>User Responsibilities</h2>
          <p>By using our Service, you agree to:</p>
          <ul>
            <li>
              Use the Service only for personal, non-commercial purposes
            </li>
            <li>
              Respect the intellectual property rights of content creators
            </li>
            <li>
              Not use downloaded content for commercial purposes without proper
              authorization
            </li>
            <li>Not attempt to circumvent any technical measures we employ</li>
            <li>Not use automated tools or bots to access our Service</li>
            <li>Comply with Instagram's Terms of Service</li>
            <li>Comply with all applicable laws and regulations</li>
          </ul>

          <h2>Content Disclaimer</h2>
          <p>
            <strong>For Personal Use Only:</strong> The content you download
            using our Service belongs to the original content creators. You are
            responsible for ensuring you have the right to download and use the
            content. Respect content creator rights.
          </p>
          <p>
            {APP_NAME} is not affiliated with, endorsed by, or connected to
            Instagram or Meta Platforms, Inc. We are an independent service that
            processes publicly available content.
          </p>

          <h2>Intellectual Property</h2>
          <p>
            The {APP_NAME} website, including its design, code, logo, and
            content (excluding Instagram content), is owned by us and protected
            by intellectual property laws.
          </p>
          <p>
            You may not copy, modify, distribute, or create derivative works
            from our website without our express permission.
          </p>

          <h2>Prohibited Uses</h2>
          <p>You may not use our Service to:</p>
          <ul>
            <li>Download content from private Instagram accounts</li>
            <li>Download content for harassment or malicious purposes</li>
            <li>
              Violate any laws or the rights of others, including copyright and
              privacy laws
            </li>
            <li>Distribute or sell downloaded content commercially</li>
            <li>Overload or disrupt our servers or infrastructure</li>
            <li>Attempt to gain unauthorized access to our systems</li>
          </ul>

          <h2>Service Availability</h2>
          <p>
            We strive to provide uninterrupted service but cannot guarantee that
            the Service will be available at all times. We may:
          </p>
          <ul>
            <li>Modify or discontinue the Service without notice</li>
            <li>Limit access due to rate limiting or maintenance</li>
            <li>
              Experience downtime due to factors beyond our control (such as
              Instagram API changes)
            </li>
          </ul>

          <h2>Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {APP_NAME} shall not be
            liable for any:
          </p>
          <ul>
            <li>Indirect, incidental, or consequential damages</li>
            <li>Loss of data or content</li>
            <li>Damages arising from your use of downloaded content</li>
            <li>Service interruptions or unavailability</li>
            <li>Third-party actions or content</li>
          </ul>
          <p>
            THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND,
            EITHER EXPRESS OR IMPLIED.
          </p>

          <h2>Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless {APP_NAME} and its
            operators from any claims, damages, or expenses arising from your:
          </p>
          <ul>
            <li>Use of the Service</li>
            <li>Violation of these Terms</li>
            <li>Violation of any third-party rights</li>
          </ul>

          <h2>Rate Limiting</h2>
          <p>
            To ensure fair usage and system stability, we implement rate
            limiting. Excessive requests may result in temporary or permanent
            restrictions on your access to the Service.
          </p>

          <h2>Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will
            be effective immediately upon posting. Continued use of the Service
            after changes constitutes acceptance of the modified Terms.
          </p>

          <h2>Termination</h2>
          <p>
            We may terminate or suspend your access to the Service at any time,
            without prior notice, for any reason, including violation of these
            Terms.
          </p>

          <h2>Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with
            applicable laws. Any disputes shall be resolved in the appropriate
            courts.
          </p>

          <h2>Severability</h2>
          <p>
            If any provision of these Terms is found to be unenforceable, the
            remaining provisions will continue in full force and effect.
          </p>

          <h2>Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us
            through our website.
          </p>
        </article>
      </div>
    </div>
  );
}
