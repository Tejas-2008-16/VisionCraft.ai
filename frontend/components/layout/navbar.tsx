"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Menu, X, ChevronDown, Image, Scissors } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  {
    label: "Tools",
    href: "#",
    dropdown: [
      {
        label: "Background Remover",
        href: "/background-remover",
        desc: "Instantly isolate subjects with precision",
        icon: Scissors,
        color: "text-blue-500",
      },
      {
        label: "Image Enhancer",
        href: "/image-enhancer",
        desc: "Upscale quality, details and resolution",
        icon: Image,
        color: "text-purple-500",
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function GlassNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [accent, setAccent] = useState<"blue" | "purple" | "cyan">("blue");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cycling the accent color to surprise & delight users
  const toggleAccent = () => {
    const accents: ("blue" | "purple" | "cyan")[] = ["blue", "purple", "cyan"];
    const nextIndex = (accents.indexOf(accent) + 1) % accents.length;
    const nextAccent = accents[nextIndex];
    setAccent(nextAccent);

    // Update CSS variables dynamically
    const root = document.documentElement;
    if (nextAccent === "blue") {
      root.style.setProperty("--electric-blue", "#3b82f6");
      root.style.setProperty("--glow-color", "rgba(59, 130, 246, 0.15)");
    } else if (nextAccent === "purple") {
      root.style.setProperty("--electric-blue", "#a855f7"); // reuse variable or apply locally
      root.style.setProperty("--glow-color", "rgba(168, 85, 247, 0.15)");
    } else {
      root.style.setProperty("--electric-blue", "#06b6d4");
      root.style.setProperty("--glow-color", "rgba(6, 182, 212, 0.15)");
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030303]/75 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent font-sans tracking-tight">
            VisionCraft<span className="text-blue-500">.ai</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            if (link.dropdown) {
              return (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`px-4 py-2 text-sm font-medium rounded-full flex items-center gap-1 transition-colors hover:text-white ${
                      pathname === "/background-remover" || pathname === "/image-enhancer"
                        ? "text-white bg-white/5"
                        : "text-slate-400"
                    }`}
                    aria-expanded={dropdownOpen}
                  >
                    {link.label}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-white/10 bg-[#0a0a0c]/90 backdrop-blur-xl p-3 shadow-2xl"
                      >
                        <div className="grid gap-1">
                          {link.dropdown.map((sub) => {
                            const SubIcon = sub.icon;
                            return (
                              <Link
                                key={sub.label}
                                href={sub.href}
                                className={`flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group ${
                                  pathname === sub.href ? "bg-white/5" : ""
                                }`}
                              >
                                <div className={`p-2 rounded-lg bg-slate-900 group-hover:scale-105 transition-transform ${sub.color}`}>
                                  <SubIcon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors">
                                    {sub.label}
                                  </div>
                                  <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  isActive
                    ? "text-white bg-white/5 border border-white/5"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Accent toggle */}
        <div className="hidden md:flex items-center gap-3">
          {/* Custom Theme Switcher / Cycle Accent */}
          <button
            onClick={toggleAccent}
            className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-slate-400 hover:text-white group relative"
            aria-label="Cycle Glow Accent Color"
            title="Change Accent Color"
          >
            <Sparkles className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-12 ${
              accent === "blue" ? "text-blue-400" : accent === "purple" ? "text-purple-400" : "text-cyan-400"
            }`} />
            <span className="sr-only">Toggle theme color</span>
          </button>

          <Link href="/background-remover">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-5 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-full shadow-lg shadow-blue-500/10 border border-white/10 transition-all cursor-pointer"
            >
              Try Now
            </motion.button>
          </Link>
        </div>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleAccent}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            aria-label="Cycle Accent Color"
          >
            <Sparkles className={`w-4 h-4 ${
              accent === "blue" ? "text-blue-400" : accent === "purple" ? "text-purple-400" : "text-cyan-400"
            }`} />
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden w-full bg-[#030303]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link) => {
                if (link.dropdown) {
                  return (
                    <div key={link.label} className="flex flex-col gap-2">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 px-2">
                        {link.label}
                      </div>
                      <div className="grid gap-2 pl-2">
                        {link.dropdown.map((sub) => {
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 ${
                                pathname === sub.href ? "bg-white/5" : ""
                              }`}
                            >
                              <div className={`p-2 rounded-lg bg-slate-900 ${sub.color}`}>
                                <SubIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-white">{sub.label}</div>
                                <div className="text-xs text-slate-500">{sub.desc}</div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`px-3 py-2 text-base font-medium rounded-xl transition-colors ${
                      isActive
                        ? "text-white bg-white/5"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <Link href="/background-remover" onClick={() => setIsOpen(false)}>
                  <button className="w-full py-3 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg border border-white/10">
                    Try Now
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
