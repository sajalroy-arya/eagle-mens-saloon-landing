"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfter() {
  const [sliderPosition, setSliderPosition] = useState(50);
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

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  return (
    <section className="py-24 md:py-32 bg-white border-t border-[#e5e5e7]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            Real Transformations
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Before & After
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto mb-4" />
          <p className="text-[#76767b] text-xs font-light">
            Slide the handle to view the precision and detail of our master grooming sessions.
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseDown={() => setIsDragging(true)}
          className="relative h-[300px] sm:h-[450px] w-full rounded-2xl overflow-hidden select-none cursor-ew-resize shadow-sm border border-[#e5e5e7]"
        >
          {/* BEFORE IMAGE (Bottom Layer) */}
          <div className="absolute inset-0 w-full h-full bg-[#eeeeef]">
            <img
              src="/assets/before_transform.png"
              alt="Before grooming treatment"
              className="w-full h-full object-cover filter grayscale contrast-[1.05]"
            />
            {/* Label Tag */}
            <div className="absolute bottom-4 right-4 z-20 bg-black/70 backdrop-blur-sm border border-white/10 px-3 py-1 rounded text-white text-[9px] uppercase tracking-wider font-bold">
              Before
            </div>
          </div>

          {/* AFTER IMAGE (Top Layer) */}
          <div
            className="absolute inset-0 w-full h-full overflow-hidden z-10"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="absolute inset-0 w-[450px] sm:w-[832px] h-[300px] sm:h-[450px]">
              <img
                src="/assets/after_transform.png"
                alt="After grooming treatment"
                className="w-full h-full object-cover"
                style={{ width: containerRef.current?.offsetWidth || "100%" }}
              />
            </div>
            {/* Label Tag */}
            <div className="absolute bottom-4 left-4 z-20 bg-[#1d1d1f] border border-[#e5e5e7] px-3 py-1 rounded text-white text-[9px] uppercase tracking-wider font-bold shadow-md">
              After Session
            </div>
          </div>

          {/* DRAG HANDLE BAR */}
          <div
            className="absolute top-0 bottom-0 w-[1px] bg-white z-20 cursor-ew-resize"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Drag Handle Button */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white border border-[#e5e5e7] rounded-full shadow-md flex items-center justify-center text-[#1d1d1f] z-30 transition-transform duration-200 hover:scale-105 active:scale-95">
              <MoveHorizontal className="w-3.5 h-3.5 text-[#1d1d1f]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
