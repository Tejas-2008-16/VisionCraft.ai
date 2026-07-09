"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={`flex flex-col gap-4 max-w-3xl mx-auto w-full ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="rounded-2xl border border-white/5 bg-[#0a0a0c]/40 backdrop-blur-md overflow-hidden transition-all duration-300 hover:border-white/10"
          >
            {/* Accordion Trigger */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between p-5 text-left font-medium text-slate-100 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-2xl"
              aria-expanded={isOpen}
              aria-controls={`faq-content-${index}`}
              id={`faq-trigger-${index}`}
            >
              <span className="text-base font-sans leading-relaxed pr-6">{item.question}</span>
              <div className={`p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 transition-transform duration-300 ${
                isOpen ? "rotate-180 text-blue-400 bg-blue-500/10 border-blue-500/10" : ""
              }`}>
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            {/* Accordion Content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-content-${index}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${index}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  <div className="px-5 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
