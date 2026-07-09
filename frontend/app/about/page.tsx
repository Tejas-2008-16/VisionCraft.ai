"use client";

import React from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Sparkles,
  Target,
  Heart,
  Zap,
  Shield,
  Users,
  Star,
  Globe,
} from "lucide-react";

const TEAM = [
  {
    name: "Aria Chen",
    role: "AI/ML Research Lead",
    initials: "AC",
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Marcus Reed",
    role: "Frontend Architect",
    initials: "MR",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Priya Nair",
    role: "Computer Vision Engineer",
    initials: "PN",
    gradient: "from-cyan-500 to-teal-600",
  },
  {
    name: "Luca Ferretti",
    role: "Product Designer",
    initials: "LF",
    gradient: "from-amber-500 to-orange-600",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Precision First",
    desc: "We obsess over model accuracy. Clean edges, accurate colors, and faithful outputs — every time.",
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: Heart,
    title: "User Experience",
    desc: "Powerful tools should feel effortless. We design interfaces that feel intuitive from the first click.",
    color: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  },
  {
    icon: Shield,
    title: "Privacy by Design",
    desc: "Your images are yours. We architect our systems to minimize data exposure at every step.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Zap,
    title: "Speed Without Trade-offs",
    desc: "Sub-second inference times without sacrificing the quality that professionals demand.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col gap-20">
      {/* Hero */}
      <section className="flex flex-col items-center text-center gap-6 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400">
            <Sparkles className="w-3.5 h-3.5" />
            Our Mission
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-3xl leading-tight">
            Building the Tools That{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Creative Pros Deserve
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl leading-relaxed">
            VisionCraft AI was founded on a simple belief — that world-class image editing tools should be free, fast, and accessible to everyone. From solo creators to enterprise teams, our mission is to democratize professional visual production.
          </p>
        </motion.div>
      </section>

      {/* Stats Row */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-3xl -z-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 px-6 border border-white/5 rounded-3xl bg-slate-950/40 backdrop-blur-md">
          {[
            { value: "4.2M+", label: "Images Processed", icon: Sparkles },
            { value: "98%", label: "User Satisfaction", icon: Star },
            { value: "40+", label: "Countries Reached", icon: Globe },
            { value: "12", label: "Team Members", icon: Users },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <Icon className="w-5 h-5 text-slate-500" />
                <div className="text-3xl font-bold font-mono text-white">{stat.value}</div>
                <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Story */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Our Story
          </h2>
          <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
            <p>
              VisionCraft AI started in 2023 as a side experiment — a weekend hack to build a cleaner, faster alternative to the bloated background removal tools on the market. The first prototype worked on a tiny GPU, outperforming established tools by 30%.
            </p>
            <p>
              Word spread. By month three, we had over 50,000 users and zero marketing spend. We realized we were solving a real problem, and doubled down — expanding to image enhancement, color grading, and resolution upscaling.
            </p>
            <p>
              Today, our team of researchers and engineers pushes the state-of-the-art in applied computer vision, with a commitment to keeping the core toolkit free, forever.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-3xl blur-2xl -z-10" />
          <GlassCard hoverEffect={false} className="border border-white/10 p-6 bg-slate-950/60 flex flex-col gap-4">
            <div className="flex items-center gap-3 text-sm font-semibold text-white border-b border-white/5 pb-4">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Company Timeline
            </div>
            {[
              { year: "2023 Q1", event: "First prototype built in a weekend." },
              { year: "2023 Q2", event: "Reached 50,000 organic users." },
              { year: "2023 Q3", event: "Launched Image Enhancer beta." },
              { year: "2024 Q1", event: "Open API early access rollout." },
              { year: "2024 Q3", event: "4M+ images processed milestone." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 text-xs">
                <span className="text-blue-400 font-mono font-medium w-20 flex-shrink-0">{item.year}</span>
                <span className="text-slate-400">{item.event}</span>
              </div>
            ))}
          </GlassCard>
        </div>
      </section>

      {/* Values */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">What Drives Us</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <GlassCard key={val.title} className="border border-white/5 flex flex-col gap-3 p-5">
                <div className={`w-10 h-10 rounded-xl ${val.color} border flex items-center justify-center`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-white">{val.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </section>

      {/* Team */}
      <section className="flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">The Team</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-md mx-auto">
            A small, multi-disciplinary team of researchers, engineers, and designers who care deeply about visual quality.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM.map((member) => (
            <GlassCard key={member.name} className="border border-white/5 flex flex-col items-center gap-4 p-6 text-center">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-lg font-bold shadow-lg`}>
                {member.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">{member.name}</div>
                <div className="text-xs text-slate-500 mt-0.5">{member.role}</div>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>
    </div>
  );
}
