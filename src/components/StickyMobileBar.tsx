"use client";

import React from "react";
import { Phone, MessageSquare, Calendar } from "lucide-react";

interface StickyMobileBarProps {
  onBookOpen: () => void;
}

export default function StickyMobileBar({ onBookOpen }: StickyMobileBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white border-t border-[#111111]/5 px-4 py-3 pb-safe shadow-[0_-4px_16px_rgba(17,17,17,0.06)] grid grid-cols-12 gap-3 items-center">
      {/* Call Button (3 cols) */}
      <a
        href="tel:+919450000000"
        className="col-span-3 flex flex-col items-center justify-center py-2 border border-[#111111]/10 rounded-xl hover:bg-stone-50 transition active:scale-95"
        aria-label="Call Eagle Saloon"
      >
        <Phone className="w-5 h-5 text-[#111111] mb-0.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#111111]">Call</span>
      </a>

      {/* WhatsApp Button (3 cols) */}
      <a
        href="https://wa.me/919450000000?text=Hi%20Eagle%20Saloon,%20I'd%20like%20to%20inquire%20about%20your%20grooming%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-3 flex flex-col items-center justify-center py-2 border border-green-200 bg-green-50/30 rounded-xl hover:bg-green-50 transition active:scale-95"
        aria-label="WhatsApp Inquiry"
      >
        <MessageSquare className="w-5 h-5 text-green-600 mb-0.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-green-700">Chat</span>
      </a>

      {/* Book Button (6 cols) */}
      <button
        onClick={onBookOpen}
        className="col-span-6 flex items-center justify-center py-3 bg-[#111111] hover:bg-[#C8A76A] text-[#FAF8F5] font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-95 shadow-md shadow-[#111111]/10"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Book Now
      </button>
    </div>
  );
}
