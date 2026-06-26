"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

interface HeroProps {
  onBookOpen: () => void;
}

export default function Hero({ onBookOpen }: HeroProps) {
  return (
    <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black text-[#FAF8F5]">
      {/* Video Loop Background with graceful image fallback */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-45 scale-105"
          poster="/assets/interior.png"
        >
          {/* Silent luxury barber grooming cinematic loop video from Pexels */}
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-barber-shaving-a-man-with-a-razor-41558-large.mp4"
            type="video/mp4"
          />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/50 to-black/70 z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center select-none">
        {/* Subtle luxury badge */}
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold border border-[#C8A76A]/30 px-3 py-1 rounded-full bg-[#111111]/60 backdrop-blur-sm mb-6"
        >
          The Epitome of Masculine Refinement
        </motion.span>

        {/* Big Editorial Serif Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
        >
          Confidence <br />
          <span className="italic font-light text-[#C8A76A]">Starts Here.</span>
        </motion.h1>

        {/* Minimal Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-stone-300 text-base md:text-lg max-w-xl font-light leading-relaxed mb-10"
        >
          Premium Haircuts, Beard Styling & Wedding Grooming Experience in Jhansi, Uttar Pradesh. Hosted by Master Barber Satyendra.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-5 w-full sm:w-auto mb-16"
        >
          <button
            onClick={onBookOpen}
            className="px-8 py-4 bg-[#C8A76A] hover:bg-[#FAF8F5] hover:text-[#111111] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg shadow-[#C8A76A]/10 active:scale-98"
          >
            Book Appointment
          </button>
          
          <a
            href="#services"
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white font-bold text-xs uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>View Services</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Bottom Trust Signifiers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.7 }}
          className="grid grid-cols-3 gap-6 md:gap-12 border-t border-white/10 pt-8 w-full max-w-2xl text-stone-300"
        >
          <div className="flex flex-col items-center">
            <div className="flex items-center text-[#C8A76A] space-x-0.5 mb-1.5">
              <Star className="w-3.5 h-3.5 fill-[#C8A76A] stroke-none" />
              <Star className="w-3.5 h-3.5 fill-[#C8A76A] stroke-none" />
              <Star className="w-3.5 h-3.5 fill-[#C8A76A] stroke-none" />
              <Star className="w-3.5 h-3.5 fill-[#C8A76A] stroke-none" />
              <Star className="w-3.5 h-3.5 fill-[#C8A76A] stroke-none" />
              <span className="text-xs font-bold text-white ml-1">4.9</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Google Rating</span>
          </div>

          <div className="flex flex-col items-center border-x border-white/10 px-2">
            <span className="text-sm font-serif font-bold text-white mb-1">5000+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Happy Clients</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs uppercase font-bold tracking-widest text-[#C8A76A] mb-1">Premium</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">Men's Grooming</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute left-1/4 top-0 w-[1px] h-full bg-white/5 pointer-events-none hidden md:block" />
      <div className="absolute right-1/4 top-0 w-[1px] h-full bg-white/5 pointer-events-none hidden md:block" />
    </section>
  );
}
