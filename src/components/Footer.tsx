"use client";

import React from "react";

// Custom SVG Brand Icons to bypass Lucide package version constraints
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z" />
    <polygon points="9.7 15 9.7 9 15 12 9.7 15" fill="currentColor" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#FAF8F5] pt-16 pb-24 md:pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
        
        {/* Column 1 - About & Socials */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center border border-[#C8A76A]/20">
              <span className="font-serif font-bold text-xs text-[#111111]">E</span>
            </div>
            <span className="font-serif text-lg font-bold tracking-widest text-white">
              EAGLE
            </span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed max-w-sm">
            Premium grooming for the modern gentleman. Elevating personal style through dedicated precision, details, and timeless craftsmanship in Jhansi.
          </p>
          <div className="flex space-x-3 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 hover:border-[#C8A76A] rounded-lg transition text-stone-400 hover:text-[#C8A76A]"
              aria-label="Instagram Link"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 hover:border-[#C8A76A] rounded-lg transition text-stone-400 hover:text-[#C8A76A]"
              aria-label="Facebook Link"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-white/10 hover:border-[#C8A76A] rounded-lg transition text-stone-400 hover:text-[#C8A76A]"
              aria-label="YouTube Link"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 - Operating Hours */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-stone-200 uppercase tracking-widest text-xs">Operating Hours</h4>
          <div className="w-8 h-[1px] bg-[#C8A76A]" />
          <ul className="space-y-2 text-stone-400 text-xs">
            <li className="flex justify-between">
              <span>Monday - Friday</span>
              <span className="text-white font-medium">9:00 AM - 8:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Column 3 - Quick Contact */}
        <div className="space-y-4">
          <h4 className="font-serif font-bold text-stone-200 uppercase tracking-widest text-xs">Get In Touch</h4>
          <div className="w-8 h-[1px] bg-[#C8A76A]" />
          <ul className="space-y-3 text-stone-400 text-xs">
            <li>
              <strong className="block text-stone-300 font-semibold mb-0.5">Address</strong>
              124, Civil Lines, Near Elite Crossing, Jhansi, UP
            </li>
            <li>
              <strong className="block text-stone-300 font-semibold mb-0.5">Contact Call</strong>
              +91 94500 XXXXX
            </li>
            <li>
              <strong className="block text-stone-300 font-semibold mb-0.5">Direct Email</strong>
              appointments@eaglesaloon.com
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 border-t border-white/5 mt-12 pt-8 text-center text-stone-500 text-[10px] uppercase tracking-wider font-semibold">
        <p>&copy; {new Date().getFullYear()} Eagle Men's Saloon. All rights reserved. Craftsmanship by Satyendra.</p>
      </div>
    </footer>
  );
}
