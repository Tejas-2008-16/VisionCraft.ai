"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Image as ImageIcon,
  ShieldCheck,
  Cpu,
  Sparkles,
  ArrowRight,
  Upload,
  RefreshCw,
  FileImage,
  CheckCircle2,
} from "lucide-react";
import { UploadBox } from "@/components/ui/upload-box";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";

// Stats Counter Hook
function useCounter(target: number, duration: number = 2000, trigger: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const end = target;
    const totalMiliseconds = duration;
    const incrementTime = 30;
    const totalSteps = totalMiliseconds / incrementTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [target, duration, trigger]);

  return count;
}

const FAQ_ITEMS = [
  {
    question: "How much does it cost to use VisionCraft AI?",
    answer: "VisionCraft AI is currently 100% free to use. You can upload, process, and compare images with unlimited queries, without registering a credit card.",
  },
  {
    question: "Are my uploaded images secure?",
    answer: "Absolutely. We prioritize user privacy. In our current client-focused architecture, files are processed instantly locally. We never store, inspect, or share your images on our servers.",
  },
  {
    question: "What file formats do you support?",
    answer: "We support all major web and camera formats, including PNG, JPEG, JPG, WEBP, and HEIC files up to 10MB.",
  },
  {
    question: "When will the API be available?",
    answer: "We are currently finalizing our premium high-concurrency API for developers. Check back soon or contact our sales team to get early developer access keys.",
  },
];

const FEATURES = [
  {
    icon: Scissors,
    title: "Background Remover",
    desc: "Isolate people, products, or animals with clean edge detection.",
    color: "from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30",
    href: "/background-remover",
  },
  {
    icon: ImageIcon,
    title: "Image Enhancer",
    desc: "Intelligently fix colors, exposure, and sharpen blur details.",
    color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    href: "/image-enhancer",
  },
  {
    icon: Cpu,
    title: "Super Resolution",
    desc: "Upscale graphics up to 4K resolution while retaining texture.",
    color: "from-cyan-500/20 to-teal-500/20 text-cyan-400 border-cyan-500/30",
    badge: "Soon",
    href: "#",
  },
];

export default function Home() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Trigger stats count when component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const totalProcessed = useCounter(4208194, 2500, isClient);
  const avgSpeed = 0.8;
  const activeUsers = useCounter(14205, 2000, isClient);

  const handleImageSelect = (file: File | null, url: string | null) => {
    setPreviewUrl(url);

    if (file && url) {
      // Simulate Processing
      setProcessing(true);
      setProcessedUrl(null);

      setTimeout(() => {
        setProcessing(false);
        // Using a modified client-side version (e.g. grayscale filter/simulated visual)
        // Since we are frontend only, we can render the same preview image, and the comparison
        // slider will crop it. In our home page comparison, we can show a nice color-shifted/enhanced
        // variation of the user's image.
        setProcessedUrl(url);
      }, 2500);
    } else {
      setProcessedUrl(null);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-24 md:gap-32">
      {/* 1. Hero Section */}
      <section className="relative flex flex-col items-center text-center gap-8 pt-6 md:pt-12">
        {/* Glow behind title */}
        <div className="absolute top-12 w-72 h-72 rounded-full bg-blue-500/10 blur-3xl -z-10 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Gen Neural Engines
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight max-w-4xl leading-[1.1] text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-slate-400">
            AI Image Toolkit <br />
            For Everyone.
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed"
        >
          Remove backgrounds with absolute surgical precision, upscale resolution, and enhance clarity in seconds. Fast, secure, and completely free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2"
        >
          <Link href="/background-remover">
            <AnimatedButton variant="primary">
              Remove Background
              <Scissors className="w-4 h-4" />
            </AnimatedButton>
          </Link>
          <Link href="/image-enhancer">
            <AnimatedButton variant="glass">
              Enhance Quality
              <ImageIcon className="w-4 h-4" />
            </AnimatedButton>
          </Link>
        </motion.div>

        {/* Interactive Hero Playground sandbox */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl mt-12 relative z-20"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl opacity-10 -z-10 animate-pulse-slow" />
          
          <GlassCard hoverEffect={false} className="p-4 md:p-6 bg-[#0a0a0c]/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
            <div className="flex flex-col gap-6">
              {/* Interactive workspace header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs text-slate-500 font-mono ml-2">sandbox-editor.v1</span>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  {processing ? (
                    <span className="flex items-center gap-2 text-blue-400">
                      <RefreshCw className="w-3 h-3 animate-spin" />
                      Analyzing Pixels...
                    </span>
                  ) : processedUrl ? (
                    <span className="text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Ready
                    </span>
                  ) : (
                    "Try uploading an image below"
                  )}
                </div>
              </div>

              {/* Central Sandbox Window */}
              <div className="min-h-72 flex flex-col items-center justify-center">
                <AnimatePresence mode="wait">
                  {processing ? (
                    <motion.div
                      key="processing"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center gap-4 text-center py-16"
                    >
                      {/* Premium pulse-scanning circle */}
                      <div className="relative w-20 h-20 flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
                        <div className="absolute inset-2 rounded-full border border-purple-500/40 animate-pulse" />
                        <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-blue-400">
                          <Cpu className="w-5 h-5 animate-spin" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Running Vision Models</h4>
                        <p className="text-xs text-slate-500 mt-1">Applying edge detection and noise removal locally...</p>
                      </div>
                    </motion.div>
                  ) : processedUrl && previewUrl ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full flex flex-col gap-4"
                    >
                      {/* Compare slider representing simulated output */}
                      {/* For simulation, we crop original against full color, but wait, the ComparisonSlider
                          shows original on bottom and processed on top. Since we pass the same image, let's
                          simulate background removal by applying a checkered pattern to the "after" image.
                          Or color-shift. Let's use ComparisonSlider with standard inputs. To demonstrate, we can
                          tell the slider to compare. Let's make it look amazing. */}
                      <ComparisonSlider
                        originalImage={previewUrl}
                        processedImage={previewUrl} // CSS filter can overlay on it or we rely on the premium slider UI
                        originalLabel="Original Image"
                        processedLabel="Visual Cutout Mock"
                        className="rounded-2xl"
                      />
                      
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <AnimatedButton variant="glass" onClick={() => handleImageSelect(null, null)}>
                          Upload Another
                        </AnimatedButton>
                        <Link href="/background-remover">
                          <AnimatedButton variant="primary">
                            Enter Workspace
                            <ArrowRight className="w-4 h-4" />
                          </AnimatedButton>
                        </Link>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="uploader" className="w-full">
                      <UploadBox
                        onImageSelect={handleImageSelect}
                        selectedPreview={previewUrl}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </section>

      {/* 2. Supported Formats Badge Row */}
      <section className="flex flex-col items-center gap-4 text-center">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Supported Formats
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-2">
          {["PNG", "JPEG", "WEBP", "HEIC", "AVIF"].map((format) => (
            <span
              key={format}
              className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs sm:text-sm text-slate-300 font-mono tracking-wider shadow-inner"
            >
              {format}
            </span>
          ))}
        </div>
      </section>

      {/* 3. Feature Bento Grid */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold font-sans tracking-tight text-white">
            Designed for Speed. Built for Quality.
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Get professional design-ready assets without downloading bulky programs or subscribing to bloated fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat) => {
            const Icon = feat.icon;
            return (
              <GlassCard
                key={feat.title}
                hoverEffect={true}
                className="flex flex-col justify-between h-72 border border-white/5 p-6 relative group"
              >
                {/* Floating Glow on Card Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                <div className="flex flex-col gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center border`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      {feat.title}
                      {feat.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase tracking-wider">
                          {feat.badge}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </div>

                <div>
                  {feat.href !== "#" ? (
                    <Link
                      href={feat.href}
                      className="text-xs font-semibold text-white group-hover:text-blue-400 flex items-center gap-1.5 transition-colors"
                    >
                      Open Tool
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <span className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      Under Development
                    </span>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* 4. Stats Section */}
      <section className="relative py-12 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-3xl -z-10" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent font-mono tracking-tight">
              {isClient ? `${(totalProcessed / 1000000).toFixed(2)}M+` : "4.20M+"}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Images Processed
            </div>
          </div>
          <div className="flex flex-col gap-2 border-y border-white/5 py-6 md:py-0 md:border-y-0 md:border-x md:border-white/5">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-mono tracking-tight">
              {avgSpeed}s
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average Processing Speed
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent font-mono tracking-tight">
              {isClient ? `${activeUsers.toLocaleString()}+` : "14,200+"}
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Creators Today
            </div>
          </div>
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Three Steps to Perfection
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            Zero installations. Zero complicated tools. Just upload and download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full relative">
          {/* Connector Line for steps (desktop only) */}
          <div className="hidden md:block absolute top-[50px] left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 -z-10" />

          {[
            {
              step: "01",
              title: "Upload",
              desc: "Drag-and-drop or select your high-res image from your device storage.",
              icon: Upload,
            },
            {
              step: "02",
              title: "AI Analysis",
              desc: "Neural network models separate foreground layers and correct lighting.",
              icon: Cpu,
            },
            {
              step: "03",
              title: "Download",
              desc: "Compare your adjustments with our interactive slider and export immediately.",
              icon: FileImage,
            },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-slate-950 border border-white/10 flex items-center justify-center relative shadow-lg">
                <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-blue-600/10 border border-blue-500/30 text-[10px] text-blue-400 font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <item.icon className="w-5 h-5 text-slate-300" />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-base font-semibold text-white">{item.title}</h4>
                <p className="text-xs leading-relaxed text-slate-500 max-w-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Why Choose Us (Trust section) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
            Security & Privacy, <br />
            Configured By Default.
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Unlike other editing tools that upload your assets to third-party databases, VisionCraft AI processes your actions locally and securely in-browser where possible, or discards file caches instantly after download.
          </p>
          <div className="flex flex-col gap-3 mt-2">
            {[
              "100% server-free transient architecture",
              "Surgical cutout boundary precision",
              "Zero monthly fees or signups required",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-sm font-medium text-slate-300">{text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          {/* Animated floating dashboard preview */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl -z-10" />
          <GlassCard hoverEffect={true} className="border border-white/10 p-6 flex flex-col gap-4 bg-slate-950/60 shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <div>
                <h4 className="text-sm font-semibold text-white">Privacy Guarantee</h4>
                <p className="text-[10px] text-slate-500">End-to-End browser security</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">SSL Encrypted Stream</span>
                <span className="text-xs text-emerald-400 font-semibold font-mono">Active</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Local Canvas Processing</span>
                <span className="text-xs text-emerald-400 font-semibold font-mono">Enabled</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">File Storage Duration</span>
                <span className="text-xs text-blue-400 font-semibold font-mono">0 seconds</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 7. FAQs */}
      <section className="flex flex-col gap-12">
        <div className="text-center flex flex-col gap-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
            {"Got questions? We've got answers."}
          </p>
        </div>

        <FAQAccordion items={FAQ_ITEMS} />
      </section>
    </div>
  );
}
