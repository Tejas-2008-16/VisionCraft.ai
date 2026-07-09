"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, GitBranch, X as XIcon, MessageSquare, ArrowRight, Check } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#030303]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
                VisionCraft<span className="text-blue-500">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Experience the next generation of visual editing tools. Powered by state-of-the-art neural networks, engineered for designers, creators, and developers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
                aria-label="X (Twitter) Link"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
                aria-label="GitHub Link"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all hover:scale-105"
                aria-label="Discord Link"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tools Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Tools</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/background-remover" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Background Remover
                </Link>
              </li>
              <li>
                <Link href="/image-enhancer" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Image Enhancer
                </Link>
              </li>
              <li>
                <span className="text-sm text-slate-600 flex items-center gap-1.5 cursor-not-allowed">
                  Object Eraser
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded-full font-medium border border-blue-500/20">
                    Soon
                  </span>
                </span>
              </li>
              <li>
                <span className="text-sm text-slate-600 flex items-center gap-1.5 cursor-not-allowed">
                  Super Resolution
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 px-1.5 py-0.5 rounded-full font-medium border border-purple-500/20">
                    Soon
                  </span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Newsletter</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Get product updates, feature releases, and curated design resources.
            </p>
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={subscribed}
                className="w-full h-11 px-4 pr-12 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                required
              />
              <button
                type="submit"
                disabled={subscribed}
                className="absolute right-1 w-9 h-9 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 disabled:bg-emerald-600"
                aria-label="Subscribe"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} VisionCraft AI. Built with premium standards. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-xs text-slate-500 hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-slate-500 hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
