"use client";

import React from "react";

interface AuroraBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function AuroraBackground({ children, className = "" }: AuroraBackgroundProps) {
  return (
    <div className={`relative min-h-screen w-full bg-[#030303] text-slate-100 overflow-hidden flex flex-col ${className}`}>
      {/* Background Aurora Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Blob 1: Electric Blue */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] animate-aurora-1" />
        
        {/* Blob 2: Purple */}
        <div className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[130px] animate-aurora-2" />
        
        {/* Blob 3: Cyan */}
        <div className="absolute bottom-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full bg-cyan-500/10 blur-[120px] animate-aurora-3" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col flex-grow">
        {children}
      </div>
    </div>
  );
}
