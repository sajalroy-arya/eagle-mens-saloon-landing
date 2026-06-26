"use client";

import React from "react";
import { motion } from "framer-motion";

const GALLERY_PHOTOS = [
  {
    title: "Sleek Lounge Stations",
    img: "/assets/interior.png",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Premium Razor Work",
    img: "/assets/satyendra.png",
    aspect: "aspect-[4/5]",
  },
  {
    title: "Craftsmanship Detail",
    img: "/assets/interior.png",
    aspect: "aspect-[1/1]",
  },
  {
    title: "Master Scissor Cuts",
    img: "/assets/satyendra.png",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Hospitality Bar & Coffee",
    img: "/assets/interior.png",
    aspect: "aspect-[4/5]",
  },
  {
    title: "The Finished Look",
    img: "/assets/satyendra.png",
    aspect: "aspect-[16/9]",
  },
];

export default function Gallery() {
  return (
    <section className="py-24 md:py-32 bg-[#FAF8F5] border-t border-[#111111]/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            Our Environment
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            The Gallery
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto" />
        </div>

        {/* CSS Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_auto]">
          {GALLERY_PHOTOS.map((photo, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="break-inside-avoid mb-6 relative group rounded-2xl overflow-hidden shadow-sm border border-[#111111]/5 bg-[#2A2A2A]"
            >
              <div className={`${photo.aspect} w-full overflow-hidden relative`}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6" />
                
                <img
                  src={photo.img}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Text inside overlay */}
                <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#C8A76A] block mb-1">Eagle Craft</span>
                  <span className="text-sm font-serif font-bold text-white block">{photo.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
