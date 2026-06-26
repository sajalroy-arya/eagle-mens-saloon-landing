"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Ritual() {
  const steps = [
    {
      num: "01",
      title: "Structural Consultation",
      desc: "We analyze your hair density, crown directions, and facial structure before making a single cut. This ensures a design that grows out cleanly and sits naturally.",
    },
    {
      num: "02",
      title: "Precision Shear Cut",
      desc: "Using hand-honed Japanese carbon steel shears, we structure your hair with clean lines and subtle texturing suited to your unique hair character.",
    },
    {
      num: "03",
      title: "Hot Lather Neck Shave",
      desc: "Warm eucalyptus lather is applied with dense badger-hair brushes, followed by detailed straight-razor cleanups along the neck and ears.",
    },
    {
      num: "04",
      title: "Cold Compress & Finish",
      desc: "A cooling tea tree oil compress calms the skin, followed by a light scalp massage and styling with our house-formulated organic clay.",
    },
  ];

  return (
    <section id="ritual" className="py-24 md:py-32 bg-[#f5f5f7] border-y border-[#e5e5e7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            The Process
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            The Grooming Ritual
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white border border-[#e5e5e7] p-8 rounded-2xl flex flex-col justify-between h-full hover:shadow-soft transition-all duration-300"
            >
              <div>
                <span className="font-sans text-3xl font-extrabold text-[#1d1d1f] opacity-25 block mb-6">
                  {step.num}
                </span>
                <h3 className="font-sans text-base font-bold text-[#1d1d1f] mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#76767b] text-xs leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
