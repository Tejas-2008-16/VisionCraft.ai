"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Sparkles } from "lucide-react";
import { AnimatedButton } from "@/components/ui/animated-button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-8">
      {/* Floating Glow Orb */}
      <div className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none" />

      {/* 404 Number */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        className="relative"
      >
        <span className="text-[10rem] md:text-[14rem] font-black font-mono leading-none bg-gradient-to-b from-white/20 to-white/5 bg-clip-text text-transparent select-none tracking-tight">
          404
        </span>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-transparent blur-2xl" />
        </div>
      </motion.div>

      {/* Icon + Copy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center gap-4 max-w-md -mt-8"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          Lost in the Pixel Void
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed">
          The page you&apos;re looking for seems to have vanished into thin air — or perhaps it never existed. Let&apos;s get you back on track.
        </p>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link href="/">
          <AnimatedButton variant="primary">
            <Home className="w-4 h-4" />
            Back to Home
          </AnimatedButton>
        </Link>
        <Link href="/background-remover">
          <AnimatedButton variant="glass">
            Try Our Tools
            <ArrowRight className="w-4 h-4" />
          </AnimatedButton>
        </Link>
      </motion.div>

      {/* Floating animated dots decoration */}
      <div className="absolute bottom-20 left-10 w-2 h-2 rounded-full bg-blue-500/40 animate-bounce" style={{ animationDelay: "0s" }} />
      <div className="absolute top-32 right-16 w-1.5 h-1.5 rounded-full bg-purple-500/40 animate-bounce" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-40 right-24 w-1 h-1 rounded-full bg-cyan-500/40 animate-bounce" style={{ animationDelay: "1s" }} />
    </div>
  );
}
