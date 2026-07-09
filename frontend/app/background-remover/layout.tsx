import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Background Remover — Remove Image Background Free",
  description:
    "Remove image backgrounds instantly using AI. Get clean, transparent PNG output in seconds — no sign-up, no watermarks, 100% free. Powered by U2-Net neural network.",
  keywords: [
    "remove background from image",
    "AI background remover",
    "transparent background",
    "remove bg free",
    "background eraser",
    "cutout image",
    "remove background PNG",
  ],
  alternates: {
    canonical: "https://visioncraft.ai/background-remover",
  },
  openGraph: {
    title: "AI Background Remover — Remove Image Background Free",
    description:
      "Instantly remove backgrounds from any photo with AI. Get transparent PNGs in seconds — free, no sign-up needed.",
    url: "https://visioncraft.ai/background-remover",
  },
};

export default function BackgroundRemoverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
