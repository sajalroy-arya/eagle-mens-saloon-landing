"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="py-24 md:py-32 bg-[#111111] text-[#FAF8F5] overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A76A]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-black/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Text Content (7 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block"
            >
              The Ambience
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              A Sanctuary of <br />
              <span className="italic font-light text-[#C8A76A]">Masculine Comfort</span>
            </motion.h2>

            <div className="w-12 h-[1px] bg-[#C8A76A]" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-4 text-stone-400 font-light text-sm leading-relaxed"
            >
              <p>
                At Eagle Men's Saloon, we believe that grooming is not a chore to be rushed, but a ritual of refinement. Our space is meticulously designed to offer an escape from the daily noise.
              </p>
              <p>
                From the moment you step through our doors in Jhansi, you are greeted with curated jazz tunes, custom leather chairs, and warm, atmospheric lighting. We offer a complimentary menu of gourmet single-origin coffee, tea, and premium beverages to help you settle in.
              </p>
              <p>
                Every grooming session is finished with our signature therapeutic hot towels, infused with pure essential eucalyptus oils, leaving you feeling revitalized and confident.
              </p>
            </motion.div>

            {/* Blockquote Quote */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-l-2 border-[#C8A76A] pl-4 pt-1 mt-6"
            >
              <p className="italic font-serif text-stone-300 text-base leading-relaxed">
                "We don't just cut hair. We restore a gentleman's posture and confidence. The environment is half the treatment."
              </p>
              <span className="block text-xs uppercase tracking-widest font-bold text-[#C8A76A] mt-2">
                — Satyendra, Founder
              </span>
            </motion.div>
          </div>

          {/* Image composition (5 cols) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 aspect-[4/3] sm:aspect-video lg:aspect-[4/5] bg-stone-900"
            >
              <img
                src="/assets/interior.png"
                alt="Eagle Saloon Luxury Interior Ambiance"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md">
                <span className="text-[10px] uppercase tracking-widest text-[#C8A76A] font-bold block mb-1">Ambiance Highlight</span>
                <span className="text-sm font-serif font-bold text-white">Handcrafted Custom Oakwood & Italian Leather Stations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
