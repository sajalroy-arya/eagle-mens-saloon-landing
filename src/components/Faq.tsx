"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Do you accept walk-in clients?",
    a: "We recommend booking a session in advance as our schedule is usually full. However, we reserve a small number of short window openings daily for quick neck cleanses and beard trims. Feel free to call us directly to check walk-in availability.",
  },
  {
    q: "What is the difference between the Basic and Premium packages?",
    a: "The Basic Package includes a precision haircut, wash, and neck shave (45 minutes). The Premium Eagle Package extends the session to 75 minutes, adding beard trimming/shaping with straight-razor details, double steam towel compresses, a purifying charcoal mask, and a neck/shoulder massage.",
  },
  {
    q: "Can I specifically request Satyendra for my cut?",
    a: "Yes. Satyendra hosts the Royal Master Session directly. If you book a Basic or Premium Package and select Satyendra as your barber, a ₹500 booking premium is added to support his dedicated studio hours.",
  },
  {
    q: "What ingredients are in your apothecary products?",
    a: "Our styling clays and beard tonics are blended locally. We use organic base carrier oils (argan, jojoba), natural clay (bentonite), pure plant waxes, and therapeutic-grade essential oils (eucalyptus, cedarwood, sandalwood). No parabens, synthetic colors, or artificial alcohol is added.",
  },
  {
    q: "What are your operating hours?",
    a: "We operate Monday through Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 4:00 PM.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#f5f5f7] border-t border-[#e5e5e7]">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            Inquiries
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Accordions */}
        <div className="space-y-4 pt-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-[#e5e5e7] rounded-xl overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left p-6 font-sans text-sm md:text-base font-bold text-[#1d1d1f] hover:text-[#0066cc] transition-colors"
                >
                  <span>{item.q}</span>
                  <div className="w-6 h-6 rounded-full bg-[#f5f5f7] border border-[#e5e5e7] flex items-center justify-center text-[#76767b] ml-4 flex-shrink-0">
                    {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[#76767b] text-xs md:text-sm font-light leading-relaxed px-6 pb-6 pt-1 border-t border-[#e5e5e7]/50">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
