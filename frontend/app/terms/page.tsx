import React from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { FileText } from "lucide-react";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    content:
      "By accessing or using VisionCraft AI's services, website, or tools (\"Services\"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Services.",
  },
  {
    title: "2. Description of Services",
    content:
      "VisionCraft AI provides AI-powered image editing tools, including background removal and image enhancement. Our Services are provided on an 'as-is' basis. We reserve the right to modify, suspend, or discontinue any Service at any time.",
  },
  {
    title: "3. Acceptable Use",
    content:
      "You agree to use our Services only for lawful purposes. You may not upload images that contain illegal content, infringe on intellectual property rights, or violate third-party privacy. We reserve the right to terminate access for users who violate these terms.",
  },
  {
    title: "4. Intellectual Property",
    content:
      "You retain full ownership of any images you upload. By uploading images, you grant VisionCraft AI a limited, temporary license to process your images for the purpose of delivering the requested service. We claim no rights over your content.",
  },
  {
    title: "5. Free Service Limitations",
    content:
      "Our core tools are provided free of charge with reasonable rate limits to ensure fair access for all users. We reserve the right to implement usage quotas, introduce paid plans, or modify the scope of free services at any time with reasonable notice.",
  },
  {
    title: "6. Disclaimer of Warranties",
    content:
      "VisionCraft AI's Services are provided 'as-is' and 'as-available' without warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, error-free, or meet your specific requirements.",
  },
  {
    title: "7. Limitation of Liability",
    content:
      "To the maximum extent permitted by law, VisionCraft AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of data, revenue, or business opportunities.",
  },
  {
    title: "8. Governing Law",
    content:
      "These Terms of Service are governed by the laws of the State of California, United States, without regard to its conflict of law provisions. Any disputes shall be resolved through binding arbitration in San Francisco, CA.",
  },
  {
    title: "9. Modifications",
    content:
      "We reserve the right to update these Terms at any time. Continued use of our Services following any changes constitutes your acceptance of the new Terms. We will provide notice of material changes via our website.",
  },
  {
    title: "10. Contact",
    content:
      "For questions regarding these Terms of Service, please contact us at legal@visioncraft.ai or write to VisionCraft AI, 100 Market Street, San Francisco, CA 94105.",
  },
];

export const metadata = {
  title: "Terms of Service — VisionCraft AI",
  description: "Read VisionCraft AI's Terms of Service to understand the rules and regulations for using our AI image editing tools.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col gap-12">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 w-fit">
          <FileText className="w-3.5 h-3.5" />
          Terms of Service
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Last updated: January 1, 2025. By using VisionCraft AI, you agree to these terms. Please read them carefully.
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
