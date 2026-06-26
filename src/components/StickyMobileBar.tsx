"use client";

import React from "react";
import { Phone, MessageSquare, Calendar } from "lucide-react";

interface StickyMobileBarProps {
  onBookOpen: () => void;
}

export default function StickyMobileBar({ onBookOpen }: StickyMobileBarProps) {
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-t border-[#e5e5e7] px-4 py-3 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.03)] grid grid-cols-12 gap-3 items-center">
      {/* Call Button */}
      <a
        href="tel:+919450000000"
        className="col-span-3 flex flex-col items-center justify-center py-2 border border-[#e5e5e7] rounded-xl hover:bg-[#f5f5f7] transition active:scale-95"
        aria-label="Call Eagle Saloon"
      >
        <Phone className="w-4 h-4 text-[#1d1d1f] mb-0.5" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#1d1d1f]">Call</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/919450000000?text=Hi%20Eagle%20Saloon,%20I'd%20like%20to%20inquire%20about%20your%20grooming%20services."
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-3 flex flex-col items-center justify-center py-2 border border-[#e5e5e7] rounded-xl hover:bg-[#f5f5f7] transition active:scale-95"
        aria-label="WhatsApp Inquiry"
      >
        <MessageSquare className="w-4 h-4 text-[#1d1d1f] mb-0.5" />
        <span className="text-[9px] font-bold uppercase tracking-wider text-[#1d1d1f]">Chat</span>
      </a>

      {/* Book Button */}
      <button
        onClick={onBookOpen}
        className="col-span-6 flex items-center justify-center py-3 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
      >
        <Calendar className="w-3.5 h-3.5 mr-2" />
        Book Now
      </button>
    </div>
  );
}
