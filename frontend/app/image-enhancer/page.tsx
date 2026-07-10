"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ImageIcon,
  Download,
  RefreshCw,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Sun,
  Contrast,
  Palette,
  Wand2,
} from "lucide-react";
import { UploadBox } from "@/components/ui/upload-box";
import { ComparisonSlider } from "@/components/ui/comparison-slider";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import { FAQAccordion } from "@/components/ui/faq-accordion";

const FAQ_ITEMS = [
  {
    question: "What does the Image Enhancer do exactly?",
    answer:
      "The Image Enhancer analyzes your photo's exposure, color balance, sharpness, and noise levels then applies AI-driven corrections to produce a visually superior result.",
  },
  {
    question: "Can I upscale low-resolution images?",
    answer:
      "Super-resolution upscaling (4K) is coming soon. For now the enhancer improves color fidelity and sharpness at the original resolution.",
  },
  {
    question: "Will the enhancer overprocess my photos?",
    answer:
      "Our model applies natural corrections. You'll notice realistic improvements in lighting and color—without the typical over-saturated HDR look found in consumer filters.",
  },
  {
    question: "Why is the download button disabled?",
    answer:
      "We're wiring up the FastAPI backend to deliver real processed outputs. The UI is production-ready and will become fully functional once the API is connected.",
  },
];

const ENHANCEMENT_OPTIONS = [
  { id: "auto", label: "Auto Enhance", icon: Wand2, color: "text-blue-400", selected: true },
  { id: "color", label: "Color Boost", icon: Palette, color: "text-purple-400", selected: false },
  { id: "exposure", label: "Fix Exposure", icon: Sun, color: "text-amber-400", selected: false },
  { id: "contrast", label: "Contrast+", icon: Contrast, color: "text-cyan-400", selected: false },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://noble-serenity-production-e279.up.railway.app";

export default function ImageEnhancerPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);
  const [sliderReady, setSliderReady] = useState(false);
  const [selectedOption, setSelectedOption] = useState("auto");
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

      const response = await fetch(`${API_URL}/enhance-image?mode=${selectedOption}`, {
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
    const ext = imageFile.name.split(".").pop() ?? "jpg";
    link.download = `enhanced_${baseName}.${ext}`;
    link.click();
  };

  const handleReset = () => {
    setPreviewUrl(null);
    setImageFile(null);
    setProcessedUrl(null);
    setProcessedBlob(null);
    setSliderReady(false);
    setProcessing(false);
    setError(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-16">
      {/* Header */}
      <section className="flex flex-col items-center text-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
            <ImageIcon className="w-3.5 h-3.5" />
            AI Image Enhancement
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl leading-tight">
            Elevate Every Image with{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI Precision
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Fix lighting, sharpen details, correct colors, and remove noise — all in one intelligent pass, in seconds.
          </p>
        </motion.div>
      </section>

      {/* Workspace */}
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
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <ImageIcon className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Enhancement Workspace</h2>
                <p className="text-xs text-slate-500">Upload → Select Mode → Process → Compare</p>
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

          {/* Enhancement Option Selector — shown when no processing/result */}
          {!processing && !sliderReady && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Enhancement Mode
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ENHANCEMENT_OPTIONS.map((opt) => {
                  const Icon = opt.icon;
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedOption(opt.id)}
                      className={`flex items-center gap-2 p-3 rounded-xl text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-purple-500/10 border-purple-500/30 text-white"
                          : "bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isSelected ? opt.color : ""}`} />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Content */}
          <AnimatePresence mode="wait">
            {processing ? (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center gap-8 py-20"
              >
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-ping" />
                  <div className="absolute inset-2 rounded-full border border-cyan-500/40 animate-pulse" />
                  <div className="absolute inset-4 rounded-full border border-pink-500/20 animate-spin" style={{ animationDuration: "3s" }} />
                  <Cpu className="w-7 h-7 text-purple-400 animate-pulse relative z-10" />
                </div>
                <div className="text-center flex flex-col gap-2">
                  <h3 className="text-base font-semibold text-white">Enhancing Your Image</h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    Applying {ENHANCEMENT_OPTIONS.find(o => o.id === selectedOption)?.label} corrections...
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  {["Analyzing luminance channels", "Balancing color profile", "Sharpening micro-details"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs">
                      {i < 2 ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <RefreshCw className="w-3.5 h-3.5 text-purple-400 animate-spin flex-shrink-0" />
                      )}
                      <span className={i < 2 ? "text-slate-400" : "text-white"}>{step}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : sliderReady && processedUrl && previewUrl ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-3 py-2 rounded-xl w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Enhancement complete — drag the slider to compare before & after
                </div>

                <ComparisonSlider
                  originalImage={previewUrl}
                  processedImage={processedUrl}
                  originalLabel="Original"
                  processedLabel="Enhanced"
                />

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <AnimatedButton variant="primary" onClick={handleDownload}>
                    <Download className="w-4 h-4" />
                    Download Enhanced
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
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <UploadBox onImageSelect={handleImageSelect} selectedPreview={previewUrl} />
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

      {/* Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { icon: Sun, title: "Auto Exposure Fix", desc: "Rescues underexposed and overexposed shots without flattening dynamic range.", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
          { icon: Palette, title: "Color Science", desc: "Precise hue, saturation, and luminosity adjustments calibrated per image.", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
          { icon: Sparkles, title: "Detail Enhancement", desc: "Intelligent sharpening increases texture without introducing compression artifacts.", color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20" },
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

      {/* FAQ */}
      <section className="flex flex-col gap-8">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Questions About Enhancement</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto">Common questions about our AI image enhancer.</p>
        </div>
        <FAQAccordion items={FAQ_ITEMS} />
      </section>
    </div>
  );
}
