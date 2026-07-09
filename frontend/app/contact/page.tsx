"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { AnimatedButton } from "@/components/ui/animated-button";
import {
  Mail,
  MessageSquare,
  Send,
  MapPin,
  X as XIcon,
  GitBranch,
  CheckCircle2,
  Loader2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 1800);
  };

  const inputClass =
    "w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all";

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-16">
      {/* Header */}
      <section className="flex flex-col items-center text-center gap-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-semibold text-purple-400">
            <MessageSquare className="w-3.5 h-3.5" />
            Contact Us
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white max-w-2xl">
            Let&apos;s Build Something{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Amazing Together
            </span>
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Have a question, feature request, or partnership opportunity? We respond to every message within one business day.
          </p>
        </motion.div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2"
        >
          <GlassCard hoverEffect={false} className="border border-white/10 bg-[#0a0a0c]/60 backdrop-blur-xl p-6 md:p-8">
            {submitted ? (
              <div className="flex flex-col items-center gap-5 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-400/10 border border-emerald-400/20 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Message Received!</h3>
                  <p className="text-sm text-slate-400 mt-2">
                    We&apos;ll get back to you at <span className="text-blue-400">{formData.email}</span> within one business day.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "", message: "" });
                  }}
                  className="text-xs text-slate-400 hover:text-white border border-white/10 px-4 py-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-lg font-semibold text-white border-b border-white/5 pb-4">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-slate-400">
                      Full Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-slate-400">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-slate-400">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`${inputClass} bg-[#0a0a0c]`}
                  >
                    <option value="" disabled>Select a subject…</option>
                    <option value="general">General Question</option>
                    <option value="support">Technical Support</option>
                    <option value="api">API / Enterprise</option>
                    <option value="partnership">Partnership</option>
                    <option value="feedback">Product Feedback</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-slate-400">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what's on your mind…"
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} h-auto resize-none py-3`}
                  />
                </div>

                <AnimatedButton
                  variant="primary"
                  disabled={submitting}
                  className="self-start"
                  type="submit"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </AnimatedButton>
              </form>
            )}
          </GlassCard>
        </motion.div>

        {/* Side Info Cards */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-4"
        >
          <GlassCard hoverEffect={false} className="border border-white/5 p-5 flex flex-col gap-4 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Mail className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Email Us</p>
                <p className="text-xs text-slate-500 mt-0.5">hello@visioncraft.ai</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border border-white/5 p-5 flex flex-col gap-4 bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <MapPin className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Location</p>
                <p className="text-xs text-slate-500 mt-0.5">San Francisco, CA</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border border-white/5 p-5 flex flex-col gap-4 bg-slate-950/40">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Follow Along
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Twitter"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="GitHub"
              >
                <GitBranch className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Discord"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </GlassCard>

          <GlassCard hoverEffect={false} className="border border-white/5 p-5 bg-slate-950/40">
            <p className="text-xs text-slate-500 leading-relaxed">
              Response time: <span className="text-white font-medium">&lt; 24 hours</span> on business days. For urgent enterprise inquiries, mark your subject as <span className="text-amber-400 font-mono text-[11px]">URGENT</span>.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
