"use client";

import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { ChevronsLeftRight } from "lucide-react";

interface ComparisonSliderProps {
  originalImage: string;
  processedImage: string;
  originalLabel?: string;
  processedLabel?: string;
  className?: string;
  checkerboard?: boolean;
}

export function ComparisonSlider({
  originalImage,
  processedImage,
  originalLabel = "Before",
  processedLabel = "After",
  className = "",
  checkerboard = false,
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: globalThis.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleTouchStart = () => setIsDragging(true);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-2xl border border-white/10 shadow-2xl aspect-video md:aspect-[16/10] ${className}`}
    >
      {/* Checkerboard background for transparent images */}
      {checkerboard && (
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(45deg, #333 25%, transparent 25%), linear-gradient(-45deg, #333 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #333 75%), linear-gradient(-45deg, transparent 75%, #333 75%)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
            backgroundColor: "#1a1a1a",
          }}
        />
      )}

      {/* RIGHT side: Processed / After image (base layer, full width) */}
      <img
        src={processedImage}
        alt="Processed output"
        className="absolute inset-0 w-full h-full object-contain z-10"
        draggable={false}
      />

      {/* LEFT side: Original image — clips from left up to sliderPosition% */}
      <div
        className="absolute inset-0 w-full h-full overflow-hidden z-20"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        {/* Light bg so original image looks correct on left */}
        <div className="absolute inset-0 bg-[#0a0a0c]" />
        <img
          src={originalImage}
          alt="Original input"
          className="absolute inset-0 w-full h-full object-contain"
          draggable={false}
        />
      </div>

      {/* Labels — always on their correct sides */}
      <span className="absolute bottom-4 left-4 z-30 text-[10px] uppercase tracking-wider font-semibold bg-black/70 text-slate-300 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-none">
        {originalLabel}
      </span>
      <span className="absolute bottom-4 right-4 z-30 text-[10px] uppercase tracking-wider font-semibold bg-blue-600/80 text-white border border-blue-500/20 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-none">
        {processedLabel}
      </span>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 z-40 w-0.5 cursor-ew-resize bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-900 border border-white/20 text-white flex items-center justify-center shadow-2xl shadow-blue-500/20 hover:scale-110 active:scale-95 transition-all">
          <ChevronsLeftRight className="w-4 h-4 text-blue-400" />
        </div>
      </div>
    </div>
  );
}
