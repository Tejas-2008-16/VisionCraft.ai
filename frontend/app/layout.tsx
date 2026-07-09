import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuroraBackground } from "@/components/layout/aurora-background";
import { GlassNavbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://visioncraft.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "VisionCraft AI — Free AI Image Toolkit | Remove Background & Enhance Images",
    template: "%s | VisionCraft AI",
  },
  description:
    "Remove image backgrounds instantly with AI, upscale & enhance photos for free. Professional-grade AI image editing tools powered by U2-Net and OpenCV. No sign-up needed.",
  keywords: [
    "AI background remover",
    "remove background from image",
    "image enhancer AI",
    "AI image editor",
    "background removal tool",
    "photo enhancement",
    "image upscaler",
    "remove background free",
    "AI photo editor",
    "transparent background",
    "image processing AI",
    "VisionCraft AI",
  ],
  authors: [{ name: "VisionCraft AI" }],
  creator: "VisionCraft AI",
  publisher: "VisionCraft AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "VisionCraft AI",
    title: "VisionCraft AI — Free AI Image Toolkit",
    description:
      "Remove backgrounds, enhance & upscale images with AI in seconds. Free, fast, professional-grade results.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "VisionCraft AI – AI Image Toolkit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VisionCraft AI — Free AI Image Toolkit",
    description:
      "Remove backgrounds, enhance & upscale images with AI in seconds.",
    images: [`${SITE_URL}/og-image.png`],
    creator: "@visioncraftai",
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* JSON-LD Structured Data */}
        <Script
          id="structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "VisionCraft AI",
              url: SITE_URL,
              description:
                "Professional AI-powered image editing toolkit. Remove backgrounds, enhance image quality, and upscale resolution instantly.",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              featureList: [
                "AI Background Removal",
                "Image Enhancement",
                "Photo Upscaling",
                "Color Correction",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-[#030303] text-slate-100 flex flex-col font-sans">
        <AuroraBackground>
          <GlassNavbar />
          <main className="flex-grow pt-24 pb-12">
            {children}
          </main>
          <Footer />
        </AuroraBackground>
      </body>
    </html>
  );
}
