"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot: string;
  format?: "auto" | "rectangle" | "leaderboard" | "banner" | "in-article" | "multiplex";
  className?: string;
  responsive?: boolean;
  showLabel?: boolean;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdSlot({
  slot,
  format = "auto",
  className = "",
  responsive = true,
  showLabel = true,
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);
  const publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;

  useEffect(() => {
    if (!publisherId || initialized.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      initialized.current = true;
    } catch {
      // silently ignore push errors during SSR hydration
    }
  }, [publisherId]);

  if (!publisherId) {
    // Dev placeholder
    return (
      <div className={className}>
        {showLabel && (
          <p className="text-[10px] text-center text-ink-400 uppercase tracking-widest mb-1">
            Advertisement
          </p>
        )}
        <div
          className="bg-ink-50 border border-dashed border-ink-200 flex items-center justify-center text-ink-400 text-xs rounded-lg"
          style={{ minHeight: format === "leaderboard" ? 90 : 250 }}
        >
          Ad Slot ({slot})
        </div>
      </div>
    );
  }

  // in-article ads use fluid layout with a special data-ad-layout attribute
  if (format === "in-article") {
    return (
      <div className={className}>
        {showLabel && (
          <p className="text-[10px] text-center text-ink-400 uppercase tracking-widest mb-1">
            Advertisement
          </p>
        )}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", textAlign: "center" }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={publisherId}
          data-ad-slot={slot}
        />
      </div>
    );
  }

  // multiplex (related content) ads
  if (format === "multiplex") {
    return (
      <div className={className}>
        {showLabel && (
          <p className="text-[10px] text-center text-ink-400 uppercase tracking-widest mb-1">
            Advertisement
          </p>
        )}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-format="autorelaxed"
          data-ad-client={publisherId}
          data-ad-slot={slot}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      {showLabel && (
        <p className="text-[10px] text-center text-ink-400 uppercase tracking-widest mb-1">
          Advertisement
        </p>
      )}
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}
