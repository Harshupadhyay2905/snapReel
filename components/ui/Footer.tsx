/**
 * Footer Component
 * Site footer with links and legal information
 */

import Link from "next/link";
import { Download, Github, Twitter, Heart } from "lucide-react";
import { FOOTER_LINKS, APP_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link href="/" className="logo">
              <div className="logo-icon">
                <Download size={24} />
              </div>
              <span className="logo-text">{APP_NAME}</span>
            </Link>
            <p className="footer-tagline">
              Download Instagram Reels instantly. Fast, free, and in HD quality.
            </p>
            <div className="social-links">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Product</h4>
            <ul className="footer-links">
              {FOOTER_LINKS.product.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            <strong>Disclaimer:</strong> For personal use only. Respect content creator rights.
            {APP_NAME} is not affiliated with Instagram or Meta.
          </p>
        </div>

        {/* Copyright */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {APP_NAME}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <Heart size={14} className="heart-icon" /> for content lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
