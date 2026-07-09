import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Shield } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you voluntarily provide when contacting us, subscribing to our newsletter, or using our services. This may include your name, email address, and usage data. We do not require account creation to use our core image tools.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use collected information to respond to inquiries, improve our services, and send optional product updates. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
  },
  {
    title: "3. Image Data & Processing",
    content:
      "Images you upload are processed in-browser where possible. In cases requiring server-side inference, images are transmitted securely via SSL and are immediately discarded from memory upon completion. We do not store, inspect, or use your images for training purposes.",
  },
  {
    title: "4. Cookies & Tracking",
    content:
      "We use minimal session cookies necessary for basic site functionality. We do not use third-party advertising cookies. You can disable cookies in your browser settings without impacting core functionality.",
  },
  {
    title: "5. Data Retention",
    content:
      "Contact form submissions are retained for up to 12 months for customer service purposes. Image processing data is ephemeral and is not retained. You may request deletion of your data by contacting us at privacy@visioncraft.ai.",
  },
  {
    title: "6. Security",
    content:
      "We employ industry-standard security measures including TLS encryption, strict access controls, and regular security audits to protect your data. No system is 100% secure, and we encourage using a strong, unique email address.",
  },
  {
    title: "7. Third-Party Services",
    content:
      "We may use third-party analytics services (e.g., aggregated, anonymized traffic data). These services do not receive personally identifiable information. Links to external websites are not covered by this policy.",
  },
  {
    title: "8. Children's Privacy",
    content:
      "Our services are not directed to individuals under 13 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us immediately.",
  },
  {
    title: "9. Changes to This Policy",
    content:
      "We may update this Privacy Policy periodically. Material changes will be communicated via a notice on our website. Continued use of our services after changes constitutes acceptance of the updated policy.",
  },
  {
    title: "10. Contact",
    content:
      "For questions about this Privacy Policy, please contact our Data Protection team at privacy@visioncraft.ai or write to VisionCraft AI, 100 Market Street, San Francisco, CA 94105.",
  },
];

export const metadata = {
  title: "Privacy Policy — VisionCraft AI",
  description: "Read VisionCraft AI's Privacy Policy to understand how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-400 w-fit">
          <Shield className="w-3.5 h-3.5" />
          Privacy Policy
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Your Privacy Matters
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Last updated: January 1, 2025. This policy explains how VisionCraft AI collects, uses, and protects your information.
        </p>
      </div>

      {/* Content */}
      <GlassCard hoverEffect={false} className="border border-white/5 bg-[#0a0a0c]/50 p-6 md:p-8">
        <div className="flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <div key={section.title} className="flex flex-col gap-3 border-b border-white/5 pb-8 last:border-0 last:pb-0">
              <h2 className="text-base font-semibold text-white">{section.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
