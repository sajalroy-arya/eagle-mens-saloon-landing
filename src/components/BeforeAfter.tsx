"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1 || isDragging) {
      handleMove(e.clientX);
    }
  };

  // Add global mouse-up handlers to ensure clean release
  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-[#FAF8F5] border-t border-[#111111]/5">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            Real Transformations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            Before & After
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto mb-4" />
          <p className="text-stone-500 text-xs md:text-sm font-light">
            Slide the handle to view the precision and detail of our master grooming sessions.
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-xl border border-[#111111]/5"
        >
          {/* BEFORE IMAGE (Bottom Layer - Full Width) */}
          <div className="absolute inset-0 w-full h-full bg-[#2A2A2A]">
            <img
              src="/assets/interior.png" // We will replace with before_transform.png or generate it
              alt="Before grooming treatment"
              className="w-full h-full object-cover filter grayscale contrast-125"
            />
            {/* Label Tag */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-white text-[10px] uppercase tracking-wider font-bold">
              Before
            </div>
          </div>

          {/* AFTER IMAGE (Top Layer - Width Clipped) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-[450px] sm:w-[832px] h-[300px] sm:h-[450px]">
              {/* Ensure image remains same width as container, otherwise it scales down */}
              <img
                src="/assets/satyendra.png" // We will replace with after_transform.png or generate it
                alt="After grooming treatment"
                className="w-full h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth || "100%" }}
              />
            </div>
            {/* Label Tag */}
            <div className="absolute bottom-4 left-4 z-20 bg-[#C8A76A] px-3 py-1 rounded text-[#111111] text-[10px] uppercase tracking-wider font-bold shadow-md">
              After Session
            </div>
          </div>

          {/* DRAG HANDLE BAR */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-white z-20 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Drag Handle Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white border border-[#C8A76A] rounded-full shadow-lg flex items-center justify-center text-[#111111] z-30 transition-transform duration-200 hover:scale-105 active:scale-95">
              <MoveHorizontal className="w-4 h-4 text-[#111111]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
