"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Do I need an appointment, or can I walk in?",
    a: "We highly recommend booking your appointment online to secure your preferred time and barber. While we do accept walk-ins, waiting times can be long, and priority is always given to guests with confirmed reservations.",
  },
  {
    q: "How does booking with Satyendra differ?",
    a: "Satyendra is our Founder and Master Barber with 15+ years of craft expertise. Choosing a 'Royal Master Session' guarantees a direct 1-on-1 consultation and treatment by him. Choosing him on other packages incurs a ₹500 premium to account for his high demand.",
  },
  {
    q: "Is there client parking available?",
    a: "Yes. We offer free, private client parking directly in front of our saloon lounge located in Civil Lines, Jhansi. Valet assistance is available upon arrival.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit/debit cards, UPI payments (Paytm, Google Pay, PhonePe), and cash. We can provide digital GST invoices upon request.",
  },
  {
    q: "What are your operating hours?",
    a: "We operate Monday through Friday from 9:00 AM to 8:00 PM, Saturday from 9:00 AM to 6:00 PM, and Sunday from 10:00 AM to 4:00 PM.",
  },
  {
    q: "Does a haircut include a hair wash?",
    a: "Yes. All haircuts (except basic clipper buzz cuts) include a double hair wash (before and after the cut) to clear loose hair, conditioning treatment, and styling with premium pomades.",
  },
];

export default function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-20">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            FAQ
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto" />
        </div>

        {/* Accordions */}
        <div className="space-y-4 border-t border-[#111111]/5 pt-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border-b border-[#111111]/5 pb-4"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center text-left py-3 font-serif text-base md:text-lg font-bold text-[#111111] hover:text-[#C8A76A] transition-colors duration-200"
                >
                  <span>{item.q}</span>
                  <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#111111]/5 flex items-center justify-center text-stone-500 hover:text-[#C8A76A] ml-4 flex-shrink-0">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
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
                      <p className="text-stone-500 text-xs md:text-sm font-light leading-relaxed pr-8 py-2">
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
