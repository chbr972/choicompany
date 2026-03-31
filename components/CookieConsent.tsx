"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "cookie_consent";

export type ConsentStatus = "accepted" | "declined" | null;

export function getStoredConsent(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const val = localStorage.getItem(STORAGE_KEY);
  if (val === "accepted" || val === "declined") return val;
  return null;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
    // Fire a custom event so Analytics/AdSense wrappers can initialize
    window.dispatchEvent(new Event("cookie_consent_accepted"));
  }

  function handleDecline() {
    localStorage.setItem(STORAGE_KEY, "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-ink-900 border-t border-ink-700 shadow-2xl"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-ink-300 flex-1">
          We use cookies for analytics (Google Analytics) and advertising (Google AdSense)
          to understand how visitors use our site and to display relevant ads.
          By clicking &ldquo;Accept,&rdquo; you consent to our use of cookies.{" "}
          <Link href="/privacy" className="underline text-brand-400 hover:text-brand-300">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 rounded-lg text-sm font-medium text-ink-300 border border-ink-600 hover:border-ink-400 hover:text-ink-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 rounded-lg text-sm font-bold bg-brand-600 text-white hover:bg-brand-500 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
