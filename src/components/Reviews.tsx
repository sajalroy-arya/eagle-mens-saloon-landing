"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Check } from "lucide-react";

const REVIEWS = [
  {
    name: "Vikramaditya Singh",
    role: "Senior Advocate, High Court",
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

  // Autoplay reviews every 8 seconds
  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="reviews" className="py-24 md:py-32 bg-[#FAF8F5] border-t border-[#111111]/5">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            Client Testimonials
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            What Our Guests Say
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto mb-6" />
          
          {/* Google trust badge */}
          <div className="flex items-center justify-center space-x-2 bg-white px-4 py-2 border border-[#111111]/5 rounded-full w-fit mx-auto shadow-sm">
            <span className="text-[10px] font-bold text-stone-600 font-sans tracking-wide">Google Rating</span>
            <div className="flex text-[#C8A76A] space-x-0.5">
              <Star className="w-3 h-3 fill-[#C8A76A] stroke-none" />
              <Star className="w-3 h-3 fill-[#C8A76A] stroke-none" />
              <Star className="w-3 h-3 fill-[#C8A76A] stroke-none" />
              <Star className="w-3 h-3 fill-[#C8A76A] stroke-none" />
              <Star className="w-3 h-3 fill-[#C8A76A] stroke-none" />
            </div>
            <span className="text-[10px] font-bold text-[#111111]">4.9 / 5.0 (280+ reviews)</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative bg-white p-8 md:p-12 rounded-2xl border border-[#111111]/5 shadow-sm overflow-hidden min-h-[260px] flex flex-col justify-between">
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
              <div className="flex text-[#C8A76A] space-x-1">
                {Array.from({ length: REVIEWS[currentIdx].rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#C8A76A] stroke-none" />
                ))}
              </div>

              {/* Review Text */}
              <p className="font-serif text-lg md:text-xl italic text-[#111111]/90 leading-relaxed font-light">
                "{REVIEWS[currentIdx].text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#C8A76A]/10 flex items-center justify-center text-[#C8A76A]">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-[#111111]">
                    {REVIEWS[currentIdx].name}
                  </h4>
                  <p className="text-[11px] text-stone-400 font-semibold mt-0.5">
                    {REVIEWS[currentIdx].role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-[#111111]/5">
            {/* Dots */}
            <div className="flex space-x-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    currentIdx === idx ? "w-4 bg-[#C8A76A]" : "bg-stone-200"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2 border border-[#111111]/10 hover:border-[#C8A76A] rounded-lg transition active:scale-95 text-[#111111]/70 hover:text-[#C8A76A]"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 border border-[#111111]/10 hover:border-[#C8A76A] rounded-lg transition active:scale-95 text-[#111111]/70 hover:text-[#C8A76A]"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
