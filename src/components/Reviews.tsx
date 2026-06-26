"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

const REVIEWS = [
  {
    name: "Vikramaditya Singh",
    role: "Senior Advocate",
    rating: 5,
    text: "Finding a barber who truly understands scissor craft is rare. Satyendra is an absolute master of his trade. His signature master session is worth every single Rupee. The lounge environment is quiet, clean, and highly professional.",
  },
  {
    name: "Rohan Malhotra",
    role: "Tech Entrepreneur",
    rating: 5,
    text: "The Premium Eagle Package is my monthly ritual. The charcoal mask, hot towel therapy, and neck massage make me feel entirely recharged. Alex's modern fades are incredibly clean and sharp.",
  },
  {
    name: "Dr. Amit Verma",
    role: "Consultant Neurosurgeon",
    rating: 5,
    text: "Marcus is an absolute specialist with beards. The straight razor detailing is executed with medical precision, and the post-shave lavender balm feels exceptional. A genuinely premium grooming lounge for professionals in Jhansi.",
  },
];

export default function Reviews() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx(prev => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIdx(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 md:py-32 bg-white border-t border-[#e5e5e7]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            Client Testimonials
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            What Our Guests Say
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto mb-6" />
          
          {/* Google trust badge */}
          <div className="flex items-center justify-center space-x-2 bg-[#f5f5f7] px-4 py-2 border border-[#e5e5e7] rounded-full w-fit mx-auto shadow-sm">
            <span className="text-[9px] font-bold text-[#76767b] uppercase tracking-wider">Google Rating</span>
            <div className="flex text-[#1d1d1f] space-x-0.5">
              <Star className="w-3 h-3 fill-[#1d1d1f] stroke-none" />
              <Star className="w-3 h-3 fill-[#1d1d1f] stroke-none" />
              <Star className="w-3 h-3 fill-[#1d1d1f] stroke-none" />
              <Star className="w-3 h-3 fill-[#1d1d1f] stroke-none" />
              <Star className="w-3 h-3 fill-[#1d1d1f] stroke-none" />
            </div>
            <span className="text-[10px] font-bold text-[#1d1d1f]">4.9 / 5.0 (280+ reviews)</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-[#f5f5f7] p-8 md:p-12 border border-[#e5e5e7] rounded-2xl shadow-sm overflow-hidden min-h-[260px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Star Rating */}
              <div className="flex text-[#1d1d1f] space-x-1">
                {Array.from({ length: REVIEWS[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#1d1d1f] stroke-none" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-sans text-base md:text-lg italic text-[#1d1d1f] leading-relaxed font-light">
                "{REVIEWS[currentIdx].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#1d1d1f] text-white flex items-center justify-center">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="font-sans text-[10px] uppercase tracking-widest font-bold text-[#1d1d1f]">
                    {REVIEWS[currentIdx].name}
                  </h4>
                  <p className="text-[9px] text-[#76767b] font-bold uppercase tracking-wider mt-0.5">
                    {REVIEWS[currentIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#e5e5e7]">
            {/* Dots */}
            <div className="flex space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentIdx === idx ? "w-4 bg-[#1d1d1f]" : "bg-[#d2d2d7]"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] rounded-lg bg-white transition active:scale-95 text-[#76767b] hover:text-[#1d1d1f]"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] rounded-lg bg-white transition active:scale-95 text-[#76767b] hover:text-[#1d1d1f]"
                aria-label="Next review"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
