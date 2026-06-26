"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Compass, ShieldCheck } from "lucide-react";

export default function WhyUs() {
  const features = [
    {
      icon: <Compass className="w-6 h-6 text-[#1d1d1f]" />,
      title: "Master Barbers",
      desc: "Our stylists view barbering as an art form. Directed by Satyendra with over 15 years of craft expertise, we tailor every cut to your specific facial geometry.",
    },
    {
      icon: <Award className="w-6 h-6 text-[#1d1d1f]" />,
      title: "Premium Products",
      desc: "We exclusively formulate and style using small-batch house products (pomades, beard oils, and clays) that nourish your scalp and skin naturally.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#1d1d1f]" />,
      title: "Hygiene First",
      desc: "Enjoy complete peace of mind. We implement medical-grade autoclave sterilization for all metal tools, single-use disposable blades, and fresh towels for each guest.",
    },
  ];

  return (
    <section id="experience" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            The Standard of Refinement
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Why Eagle Saloon
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center p-8 rounded-2xl bg-[#f5f5f7] border border-[#e5e5e7] transition-all duration-300 hover:shadow-soft hover:-translate-y-0.5"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-full bg-white border border-[#e5e5e7] flex items-center justify-center mb-6">
                {feat.icon}
              </div>
              <h3 className="font-sans text-base font-bold text-[#1d1d1f] mb-3 tracking-tight">
                {feat.title}
              </h3>
              <p className="text-[#76767b] text-xs font-light leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
