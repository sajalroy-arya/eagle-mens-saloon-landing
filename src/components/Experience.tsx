"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="py-24 md:py-32 bg-[#f5f5f7] text-[#1d1d1f] overflow-hidden relative border-t border-[#e5e5e7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
          {/* Text Content (6 cols) */}
          <div className="lg:col-span-6 space-y-6 lg:pr-8">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block"
            >
              The Studio
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight"
            >
              A Sanctuary of <br />
              <span className="text-[#86868b]">Quiet Calm</span>
            </motion.h2>

            <div className="w-8 h-[1px] bg-[#1d1d1f]" />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 text-[#76767b] font-light text-sm leading-relaxed"
            >
              <p>
                At Eagle, we believe that grooming is not a chore to be rushed, but a ritual of focus. Our space is built on details that help you slow down.
              </p>
              <p>
                We operate a quiet room. You will hear curated jazz records, the snip of steel shears, and clean razor sweeps—no loud TVs, no sales pitches. We offer complimentary single-origin coffee and tea to help you settle in.
              </p>
              <p>
                Every treatment ends with a warm steam compress infused with pure eucalyptus oil, designed to hydrate skin and ease tension.
              </p>
            </motion.div>

            {/* Blockquote Quote */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="border-l border-[#1d1d1f] pl-4 pt-1 mt-6"
            >
              <p className="italic text-[#1d1d1f] text-sm leading-relaxed">
                "We don't just cut hair. We restore a guest's posture and confidence. The environment is half the treatment."
              </p>
              <span className="block text-[10px] uppercase tracking-widest font-bold text-[#76767b] mt-2">
                — Satyendra
              </span>
            </motion.div>
          </div>

          {/* Image composition (6 cols) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-2xl overflow-hidden shadow-sm border border-[#e5e5e7] aspect-[4/3] sm:aspect-video lg:aspect-[4/5] bg-[#eeeeef]"
            >
              <img
                src="/assets/interior.png"
                alt="Eagle Saloon Luxury Interior Ambiance"
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-103"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl border border-[#e5e5e7] bg-white/80 backdrop-blur-md">
                <span className="text-[9px] uppercase tracking-widest text-[#76767b] font-bold block mb-1">Ambiance Highlight</span>
                <span className="text-xs font-bold text-[#1d1d1f]">Handcrafted oakwood framing and hand-stitched custom leather seats.</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
