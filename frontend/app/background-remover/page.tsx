"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Download,
  RefreshCw,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Info,
  Sparkles,
  ImagePlus,
} from "lucide-react";
import { UploadBox } from "@/components/ui/upload-box";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";

const FAQ_ITEMS = [
  {
    question: "How does the background remover work?",
    answer:
      "Our background remover uses a neural segmentation model that detects foreground subjects—people, animals, objects—and cleanly isolates them from the background with sub-pixel accuracy on edge transitions.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "We support image files up to 10MB. For batch processing or images above 10MB, contact us about our enterprise plan.",
  },
  {
    question: "Can I remove background from product photos?",
    answer:
      "Absolutely. Our model is particularly optimized for e-commerce product shots, giving you clean cutouts with transparent PNG exports ready for storefronts.",
  },
  {
    question: "What formats does the download support?",
    answer:
      "The processed image is returned as a transparent PNG, which preserves the alpha channel needed for placing your subject on any background or design.",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export default function BackgroundRemoverPage() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [sliderReady, setSliderReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = async (file: File | null, url: string | null) => {
    setImageFile(file);
    setPreviewUrl(url);
    setProcessedUrl(null);
    setProcessedBlob(null);
    setSliderReady(false);
    setError(null);

    if (!file || !url) return;

    setProcessing(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/remove-background`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail ?? `Server error: ${response.status}`);
      }

      const blob = await response.blob();
      const outputUrl = URL.createObjectURL(blob);
      setProcessedBlob(blob);
      setProcessedUrl(outputUrl);
      setSliderReady(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!processedBlob || !imageFile) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(processedBlob);
    const baseName = imageFile.name.replace(/\.[^.]+$/, "");
    link.download = `no_bg_${baseName}.png`;
    link.click();
  };

  const handleReset = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setProcessedBlob(null);
    setSliderReady(false);
    setProcessing(false);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-16">
      {/* Page Header */}
      <section className="flex flex-col items-center text-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Scissors className="w-3.5 h-3.5" />
            AI Background Removal
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight max-w-2xl">
            Remove Backgrounds with{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Neural Precision
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Upload any image and our AI instantly isolates the foreground subject, delivering a transparent PNG export — no manual masking required.
          </p>
        </motion.div>
      </section>

      {/* Upload + Processing + Preview Workspace */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        <GlassCard
          hoverEffect={false}
          className="border border-white/10 bg-[#0a0a0c]/60 backdrop-blur-xl shadow-2xl p-6 md:p-8 flex flex-col gap-6"
        >
          {/* Header Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Scissors className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Background Remover Workspace</h2>
                <p className="text-xs text-slate-500">Upload → Process → Download</p>
              </div>
            </div>

            {(previewUrl || processing) && (
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}
          </div>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {processing ? (
              /* Processing State */
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-8 py-20"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-blue-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-purple-500/40 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: "3s" }} />
                  <Cpu className="w-7 h-7 text-blue-400 animate-pulse relative z-10" />
                </div>

                <div className="text-center flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-white">Removing Background</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Applying semantic segmentation and edge-aware refinement...
                  </p>
                </div>

                {/* Animated progress steps */}
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {[
                    { label: "Loading model weights", done: true },
                    { label: "Detecting subject regions", done: true },
                    { label: "Edge refinement pass", done: false },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs">
                      {step.done ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5 text-blue-400 animate-spin flex-shrink-0" />
                      )}
                      <span className={step.done ? "text-slate-400" : "text-white"}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : sliderReady && processedUrl && previewUrl ? (
              /* Result State */
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-2 rounded-xl w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Background removal complete — drag the slider below to compare
                </div>

                <ComparisonSlider
                  originalImage={previewUrl}
                  processedImage={processedUrl}
                  originalLabel="Original"
                  processedLabel="Background Removed"
                  checkerboard={true}
                />

                {/* Action Row */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <AnimatedButton variant="primary" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Download PNG
                  </AnimatedButton>
                  <button
                    onClick={handleReset}
                    className="text-xs text-slate-400 hover:text-white border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full transition-all flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Try Another
                  </button>
                </div>
              </motion.div>
            ) : (
              /* Upload State */
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UploadBox
                  onImageSelect={handleImageSelect}
                  selectedPreview={previewUrl}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error State */}
          {error && (
            <div className="flex items-start gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/10">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-red-400">Processing Failed</p>
                <p className="text-xs text-slate-400">{error}</p>
              </div>
            </div>
          )}
        </GlassCard>
      </motion.section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          {
            icon: Sparkles,
            title: "Pixel-Perfect Edges",
            desc: "Sub-pixel boundary detection that handles even hair strands and glass edges.",
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
          },
          {
            icon: ImagePlus,
            title: "Transparent Output",
            desc: "Export as PNG with a transparent channel — ready for composites and design.",
            color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
          },
          {
            icon: CheckCircle2,
            title: "One-Click Results",
            desc: "No manual selection tools, bezier curves, or magic wands needed.",
            color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <GlassCard key={item.title} className="border border-white/5 flex flex-col gap-3 p-5">
              <div className={`w-10 h-10 rounded-xl ${item.color} border flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </GlassCard>
          );
        })}
      </section>

      {/* Supported formats */}
      <section className="flex flex-col items-center gap-4 text-center">
        <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Supported Formats</h3>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["PNG", "JPEG", "WEBP", "HEIC"].map((fmt) => (
            <span key={fmt} className="px-4 py-1.5 rounded-full border border-white/5 bg-white/5 text-xs text-slate-300 font-mono tracking-wider">
              {fmt}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Frequently Asked</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Common questions about our background remover tool.</p>
        </div>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>
    </div>
  );
}
