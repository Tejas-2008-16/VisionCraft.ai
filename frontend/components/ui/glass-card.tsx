"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "className" | "children"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
  glowColor?: string;
}

export function GlassCard({
  children,
  className = "",
  hoverEffect = true,
  glow = false,
  glowColor = "rgba(59, 130, 246, 0.15)",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      {...(hoverEffect
        ? {
            whileHover: { y: -4, scale: 1.01 },
            transition: { duration: 0.3, ease: "easeOut" },
          }
        : {})}
      className={`glass-panel rounded-2xl relative p-6 overflow-hidden ${
        hoverEffect ? "glass-panel-hover" : ""
      } ${className}`}
      style={{
        ...props.style,
        ...(glow ? { boxShadow: `0 0 50px -10px ${glowColor}` } : {}),
      }}
      {...props}
    >
      {/* Background glow flare overlay */}
      {glow && (
        <div 
          className="absolute -top-24 -left-24 w-48 h-48 rounded-full pointer-events-none opacity-30 blur-3xl"
          style={{ backgroundColor: glowColor }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
