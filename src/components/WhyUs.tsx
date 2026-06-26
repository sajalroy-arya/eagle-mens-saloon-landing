"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: <Compass className="w-8 h-8 text-[#C8A76A]" />,
      title: "Master Barbers",
      desc: "Our stylists view barbering as an art form. Directed by Satyendra with over 15 years of international expertise, we tailor every cut to your specific facial geometry.",
    },
    {
      icon: <Award className="w-8 h-8 text-[#C8A76A]" />,
      title: "Premium Products",
      desc: "We exclusively formulate and style using top-shelf imported products (pomades, beard oils, and clays) that nourish your scalp and skin without harmful chemicals.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#C8A76A]" />,
      title: "Hygiene First",
      desc: "Enjoy complete peace of mind. We implement medical-grade autoclave sterilization for all metal tools, single-use disposable blades, and freshly laundered towels for each guest.",
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            The Standard of Refinement
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            Why Eagle Saloon
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-white border border-[#111111]/5 transition-all duration-300 hover:shadow-xl hover:shadow-[#111111]/2 hover:-translate-y-1"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#C8A76A]/20 flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="font-serif text-xl font-bold tracking-tight text-[#111111] mb-4">
                {feat.title}
              </h3>
              <p className="text-stone-500 text-sm font-light leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
