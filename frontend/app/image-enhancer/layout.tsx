import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Image Enhancer — Upscale & Improve Photo Quality Free",
  description:
    "Enhance and upscale your photos with AI. Sharpen details, boost colors, fix pixelation, and improve image quality in one click — free and instant.",
  keywords: [
    "AI image enhancer",
    "photo enhancer",
    "image upscaler",
    "improve image quality",
    "AI photo enhancer free",
    "fix blurry photo",
    "image sharpener",
    "photo quality improvement",
  ],
  alternates: {
    canonical: "https://visioncraft.ai/image-enhancer",
  },
  openGraph: {
    title: "AI Image Enhancer — Upscale & Improve Photo Quality Free",
    description:
      "Sharpen, upscale, and enhance any photo with AI in seconds. Boost colors and fix pixelation — free, no sign-up needed.",
    url: "https://visioncraft.ai/image-enhancer",
  },
};

export default function ImageEnhancerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
