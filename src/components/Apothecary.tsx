"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const PRODUCTS = [
  {
    name: "Eagle Pomade No. 01",
    type: "Styling Clay",
    price: "₹850",
    size: "100ml",
    desc: "Matte finish styling clay. Infused with bentonite clay, cedarwood extracts, and organic beeswax. Provides all-day structured hold and rinses out easily with water.",
  },
  {
    name: "Restorative Beard Balm",
    type: "Conditioning Balm",
    price: "₹950",
    size: "50ml",
    desc: "A nourishing blend of jojoba, avocado, and argan oils. Softens coarse beard hairs, relieves itchy skin, and scents naturally with pure eucalyptus oil.",
  },
  {
    name: "Eucalyptus Post-Shave",
    type: "Soothing Lotion",
    price: "₹780",
    size: "120ml",
    desc: "An alcohol-free calming lotion. Made with witch hazel, cooling aloe vera gel, and tea tree crystals to calm skin and reduce razor bumps after shaving.",
  },
];

export default function Apothecary() {
  return (
    <section id="apothecary" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            House Formulations
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            The Curated Apothecary
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
          <p className="text-[#76767b] text-sm font-light leading-relaxed mt-6">
            Formulated locally in small batches with cold-pressed oils and botanicals. What we use at the chair is available for your home routine.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRODUCTS.map((prod, idx) => (
            <motion.div
              key={prod.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#f5f5f7] border border-[#e5e5e7] rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-soft transition-all duration-300"
            >
              {/* Image Placeholder Frame */}
              <div className="bg-[#eeeeef] h-52 flex items-center justify-center border-b border-[#e5e5e7] relative">
                <span className="absolute top-4 left-4 bg-white border border-[#e5e5e7] text-[#1d1d1f] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {prod.type}
                </span>
                <Sparkles className="w-10 h-10 text-[#86868b] opacity-40 animate-pulse" />
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans text-base font-bold text-[#1d1d1f] mb-2 tracking-tight">
                    {prod.name}
                  </h3>
                  <p className="text-[#76767b] text-xs leading-relaxed font-light mb-6">
                    {prod.desc}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-[#e5e5e7] pt-4 mt-2">
                  <span className="font-sans text-lg font-bold text-[#1d1d1f]">{prod.price}</span>
                  <span className="text-[10px] text-[#76767b] font-medium uppercase tracking-wider">{prod.size}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
