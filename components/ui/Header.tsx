"use client";

/**
 * Header Component
 * Navigation header with logo, links, and theme toggle
 */

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { NAV_LINKS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="header-nav container">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon">
            <Download size={24} />
          </div>
          <span className="logo-text">{APP_NAME}</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-only">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="header-actions">
          <ThemeToggle />

          {/* Mobile Menu Button */}
          <button
            className="mobile-menu-btn mobile-only"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "mobile-nav",
          isMobileMenuOpen && "mobile-nav-open"
        )}
      >
        <ul className="mobile-nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
