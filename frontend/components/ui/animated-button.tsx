"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "glass" | "gradient-border";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export function AnimatedButton({
  children,
  variant = "primary",
  className = "",
  onClick,
  disabled = false,
  type = "button",
}: AnimatedButtonProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-blue-500/20 hover:from-blue-500 hover:to-purple-500 border border-white/10";
      case "secondary":
        return "bg-white text-black hover:bg-slate-100 shadow-lg";
      case "glass":
        return "bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-100";
      case "gradient-border":
        return "relative rounded-full overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 shadow-lg shadow-purple-500/10 p-[1px]";
      default:
        return "";
    }
  };

  if (variant === "gradient-border") {
    return (
      <motion.button
        whileHover={!disabled ? { scale: 1.02 } : {}}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={!disabled ? onClick : undefined}
        disabled={disabled}
        type={type}
        className={`rounded-full transition-opacity cursor-pointer ${
          disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
        } ${getVariantStyles()} ${className}`}
      >
        <div className="relative px-6 py-2.5 rounded-full bg-[#030303] text-white text-sm font-medium hover:bg-black/80 transition-colors flex items-center justify-center gap-2">
          {children}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      disabled={disabled}
      type={type}
      onClick={!disabled ? onClick : undefined}
      className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer ${
        disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"
      } ${getVariantStyles()} ${className}`}
    >
      {children}
    </motion.button>
  );
}
