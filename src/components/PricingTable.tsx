"use client";

import React from "react";
import { Check } from "lucide-react";

interface PricingProps {
  onBookOpen: (serviceName: string) => void;
}

const CATEGORIES = [
  {
    name: "Hair & Styling",
    items: [
      { name: "Classic Scissor Haircut", price: "₹800", duration: "45 Min" },
      { name: "Young Gentleman Trim", price: "₹400", duration: "30 Min" },
      { name: "Clipper Buzz Cut", price: "₹500", duration: "30 Min" },
    ],
  },
  {
    name: "Beard & Shaves",
    items: [
      { name: "Bespoke Beard Styling", price: "₹500", duration: "30 Min" },
      { name: "Straight Razor Hot Shave", price: "₹600", duration: "40 Min" },
      { name: "Beard Oil Hot Therapy", price: "₹300", duration: "15 Min" },
    ],
  },
  {
    name: "Spa & Facial",
    items: [
      { name: "Therapeutic Hair Spa", price: "₹1,200", duration: "60 Min" },
      { name: "Detoxifying Skin Facial", price: "₹1,500", duration: "60 Min" },
      { name: "Revitalizing Scalp Massage", price: "₹600", duration: "30 Min" },
    ],
  },
];

export default function PricingTable({ onBookOpen }: PricingProps) {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            Transparent Pricing
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Grooming Menu
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Directory (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {CATEGORIES.map(cat => (
              <div key={cat.name} className="space-y-6">
                {/* Category Title */}
                <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1d1d1f] border-b border-[#e5e5e7] pb-3">
                  {cat.name}
                </h3>
                
                {/* Items */}
                <div className="space-y-4">
                  {cat.items.map(item => (
                    <div
                      key={item.name}
                      onClick={() => onBookOpen(item.name)}
                      className="flex justify-between items-baseline group cursor-pointer py-1"
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-xs text-[#1d1d1f] uppercase tracking-wider group-hover:text-[#0066cc] transition-colors duration-200">
                          {item.name}
                        </span>
                        <span className="text-[9px] text-[#76767b] font-semibold uppercase tracking-wider block">
                          Duration: {item.duration}
                        </span>
                      </div>
                      
                      {/* Dotted spacer line */}
                      <div className="flex-1 border-b border-dotted border-[#e5e5e7] mx-4 h-2 group-hover:border-[#0066cc]/40 transition-colors" />
                      
                      <span className="font-sans font-bold text-sm text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Highlighted Package Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#f5f5f7] border border-[#e5e5e7] rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]">
            {/* Corner Badge */}
            <div className="absolute top-0 right-0 bg-[#1d1d1f] text-white font-bold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-bl-xl shadow-sm">
              Recommended
            </div>
            
            <div className="space-y-4">
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#76767b]">The Signature Ritual</span>
              <h3 className="font-sans text-2xl font-bold tracking-tight text-[#1d1d1f]">Premium Eagle Package</h3>
              <div className="border-b border-[#e5e5e7] pb-4 mb-4">
                <span className="font-sans font-extrabold text-3xl text-[#1d1d1f]">₹1,500</span>
                <span className="text-xs text-[#76767b] font-semibold ml-1">/ 75 Min</span>
              </div>
              
              <ul className="space-y-3 text-xs text-[#76767b] font-light">
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#1d1d1f] mr-2" />
                  Custom Precision Haircut
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#1d1d1f] mr-2" />
                  Refreshing Wash & Scalp Massage
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#1d1d1f] mr-2" />
                  Bespoke Beard Shaving & Hot Towel
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#1d1d1f] mr-2" />
                  Charcoal Detox Facial Mask
                </li>
                <li className="flex items-center">
                  <Check className="w-3.5 h-3.5 text-[#1d1d1f] mr-2" />
                  Complementary Gourmet Coffee
                </li>
              </ul>
            </div>

            <button
              onClick={() => onBookOpen("Premium Eagle Package")}
              className="w-full mt-8 py-3.5 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition duration-200 active:scale-98 shadow-sm"
            >
              Select Package
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
