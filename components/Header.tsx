"use client";

import Link from "next/link";
import { useState } from "react";
import AdSlot from "./AdSlot";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "My Content Site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="bg-surface-950 border-b border-surface-600 sticky top-0 z-50">
      {/* Leaderboard ad strip */}
      <div className="hidden md:flex justify-center py-2 bg-surface-900 border-b border-surface-700">
        <AdSlot
          slot="1234567890"
          format="leaderboard"
          className="w-[728px] h-[90px]"
          responsive={false}
        />
      </div>

      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2"
          aria-label={siteName}
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-500 text-surface-950 font-bold text-sm select-none shrink-0">
            {siteName.charAt(0).toUpperCase()}
          </span>
          <span className="text-lg font-bold text-ink-50 group-hover:text-brand-400 transition-colors tracking-tight">
            {siteName}
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 text-sm font-medium">
          <Link
            href="/"
            className="px-3 py-1.5 rounded-lg text-ink-300 hover:text-ink-50 hover:bg-surface-700 transition-all"
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="px-3 py-1.5 rounded-lg text-ink-300 hover:text-ink-50 hover:bg-surface-700 transition-all"
          >
            Tools
          </Link>
          <Link
            href="/reviews"
            className="px-3 py-1.5 rounded-lg text-ink-300 hover:text-ink-50 hover:bg-surface-700 transition-all"
          >
            Reviews
          </Link>
          <Link
            href="/compare"
            className="px-3 py-1.5 rounded-lg text-ink-300 hover:text-ink-50 hover:bg-surface-700 transition-all"
          >
            Compare
          </Link>
          <Link
            href="/blog"
            className="px-3 py-1.5 rounded-lg text-ink-300 hover:text-ink-50 hover:bg-surface-700 transition-all"
          >
            Articles
          </Link>
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-ink-200 hover:bg-surface-700 transition-all"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-5 h-5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-surface-700 bg-surface-900 px-4 py-3 flex flex-col gap-1 text-base font-medium"
        >
          <Link
            href="/"
            className="px-3 py-2.5 rounded-lg text-ink-200 hover:text-ink-50 hover:bg-surface-700 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/tools"
            className="px-3 py-2.5 rounded-lg text-ink-200 hover:text-ink-50 hover:bg-surface-700 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Tools
          </Link>
          <Link
            href="/reviews"
            className="px-3 py-2.5 rounded-lg text-ink-200 hover:text-ink-50 hover:bg-surface-700 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Reviews
          </Link>
          <Link
            href="/compare"
            className="px-3 py-2.5 rounded-lg text-ink-200 hover:text-ink-50 hover:bg-surface-700 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Compare
          </Link>
          <Link
            href="/blog"
            className="px-3 py-2.5 rounded-lg text-ink-200 hover:text-ink-50 hover:bg-surface-700 transition-all"
            onClick={() => setMobileOpen(false)}
          >
            Articles
          </Link>
        </div>
      )}
    </header>
  );
}
