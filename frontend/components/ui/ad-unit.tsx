"use client";

import { useEffect, useRef } from "react";

interface AdUnitProps {
  adSlot: string;
  adFormat?: "auto" | "rectangle" | "horizontal" | "vertical";
  fullWidthResponsive?: boolean;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

/**
 * Google AdSense Ad Unit Component
 *
 * Usage:
 *   <AdUnit adSlot="1234567890" adFormat="auto" />
 *
 * Replace adSlot with your real ad slot ID from AdSense dashboard.
 * Replace "ca-pub-XXXXXXXXXXXXXXXX" in layout.tsx with your Publisher ID.
 */
export function AdUnit({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
}: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className={`adsense-container overflow-hidden ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}

/**
 * Ad Banner — horizontal responsive banner (728x90 style)
 * Place between content sections
 */
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      adSlot="XXXXXXXXXX"
      adFormat="horizontal"
      className={`my-6 ${className}`}
    />
  );
}

/**
 * Ad Rectangle — 300x250 style, good for sidebars or content breaks
 */
export function AdRectangle({ className = "" }: { className?: string }) {
  return (
    <AdUnit
      adSlot="XXXXXXXXXX"
      adFormat="rectangle"
      className={`my-4 ${className}`}
    />
  );
}
