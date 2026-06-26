"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

interface HeroProps {
  onBookOpen: () => void;
}

export default function Hero({ onBookOpen }: HeroProps) {
  return (
    <section className="relative min-h-[90dvh] w-full flex items-center justify-center bg-white text-[#1d1d1f] pt-32 pb-20 select-none">
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Typography & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          {/* Subtle luxury badge */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold border border-[#e5e5e7] px-3 py-1 rounded-full bg-[#f5f5f7] mb-6"
          >
            Est. 2012 / San Francisco
          </motion.span>

          {/* Big Editorial Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 text-[#1d1d1f]"
          >
            Structured cuts. <br />
            <span className="text-[#86868b]">Deliberate craft.</span>
          </motion.h1>

          {/* Minimal Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#76767b] text-base md:text-lg max-w-lg font-light leading-relaxed mb-10"
          >
            Eagle is a quiet space dedicated to structured haircutting, straight-razor detailing, and house-formulated products. Led by Master Barber Satyendra.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={onBookOpen}
              className="px-6 py-3.5 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 active:scale-98 shadow-sm"
            >
              Book Session
            </button>
            
            <a
              href="#services"
              className="px-6 py-3.5 bg-[#f5f5f7] hover:bg-[#eeeeef] text-[#1d1d1f] font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-300 flex items-center justify-center space-x-2 border border-[#e5e5e7]"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* Bottom Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex items-center space-x-6 border-t border-[#e5e5e7] pt-6 w-full max-w-md text-[#76767b]"
          >
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-[#1d1d1f]">
                <Star className="w-3.5 h-3.5 fill-[#1d1d1f] stroke-none" />
                <span className="text-xs font-bold ml-1 text-[#1d1d1f]">4.9</span>
              </div>
              <span className="text-[10px] uppercase tracking-widest font-semibold">Google Rating</span>
            </div>
            
            <div className="w-[1px] h-4 bg-[#e5e5e7]" />
            
            <span className="text-[10px] uppercase tracking-widest font-semibold">15+ Years Technique</span>
          </motion.div>
        </div>

        {/* Right Column: Premium Image Card */}
        <div className="lg:col-span-5 w-full hidden lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[480px] w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-3xl overflow-hidden shadow-sm"
          >
            <img
              src="/assets/interior.png"
              alt="Eagle Men's Saloon Interior"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-103"
            />
            {/* Elegant transparent vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
