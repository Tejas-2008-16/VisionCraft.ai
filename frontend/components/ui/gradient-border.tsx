"use client";

import React from "react";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function GradientBorder({
  children,
  className = "",
  glow = false,
}: GradientBorderProps) {
  return (
    <div className={`relative p-[1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 overflow-hidden ${className}`}>
      {glow && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-pulse-slow blur-md opacity-40 pointer-events-none" />
      )}
      <div className="relative z-10 w-full h-full rounded-[15px] overflow-hidden">
        {children}
      </div>
    </div>
  );
}
