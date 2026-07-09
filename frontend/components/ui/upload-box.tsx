"use client";

import React, { useState, useRef, DragEvent, ChangeEvent } from "react";
import { UploadCloud, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadBoxProps {
  onImageSelect: (file: File | null, previewUrl: string | null) => void;
  selectedPreview: string | null;
  className?: string;
}

export function UploadBox({
  onImageSelect,
  selectedPreview,
  className = "",
}: UploadBoxProps) {
  const [isDragActive, setIsDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (PNG, JPG, WEBP, etc.)");
      return;
    }
    setError(null);
    const objectUrl = URL.createObjectURL(file);
    onImageSelect(file, objectUrl);
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelect(null, null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />

      <AnimatePresence mode="wait">
        {!selectedPreview ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onClick={onButtonClick}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`w-full py-16 px-6 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300 ${
              isDragActive
                ? "border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10 scale-[1.01]"
                : "border-white/10 bg-[#0a0a0c]/40 hover:border-white/20 hover:bg-[#0a0a0c]/60"
            }`}
          >
            <div className={`p-4 rounded-full border border-white/10 bg-white/5 transition-transform duration-300 ${
              isDragActive ? "scale-110 text-blue-400" : "text-slate-400"
            }`}>
              <UploadCloud className="w-8 h-8" />
            </div>

            <div className="text-center">
              <p className="text-base font-medium text-white">
                Drag & drop your image here, or <span className="text-blue-400 hover:underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-2">
                Supports PNG, JPG, WEBP, and HEIC up to 10MB
              </p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-2 flex items-center gap-2 text-xs text-rose-500 bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-full"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                {error}
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full relative rounded-2xl border border-white/10 bg-[#0a0a0c]/50 p-4 flex flex-col items-center gap-4"
          >
            {/* Top Bar controls */}
            <div className="w-full flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2 text-slate-300">
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-medium">Selected Image Preview</span>
              </div>
              <button
                onClick={handleRemove}
                className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-rose-600/20 hover:border-rose-500/20 transition-all"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Thumbnail Display */}
            <div className="relative max-h-96 w-full flex items-center justify-center overflow-hidden rounded-xl bg-black/40 border border-white/5">
              <img
                src={selectedPreview}
                alt="Selected preview"
                className="object-contain max-h-80 w-auto rounded-lg shadow-xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
