"use client";

import React from "react";

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
    <footer className="bg-[#f5f5f7] text-[#1d1d1f] pt-16 pb-24 md:pb-12 border-t border-[#e5e5e7] relative z-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm font-light">
        
        {/* Column 1 - About & Socials */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center border border-[#e5e5e7]">
              <span className="font-sans font-extrabold text-xs text-white">E</span>
            </div>
            <span className="font-sans text-base font-extrabold tracking-tight text-[#1d1d1f]">
              EAGLE
            </span>
          </div>
          <p className="text-[#76767b] text-xs leading-relaxed max-w-sm">
            Minimalist grooming for the modern gentleman. Elevating personal style through precision, detail, and craftsmanship.
          </p>
          <div className="flex space-x-2 pt-2">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#eeeeef] rounded-lg transition text-[#76767b] hover:text-[#1d1d1f]"
              aria-label="Instagram Link"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#eeeeef] rounded-lg transition text-[#76767b] hover:text-[#1d1d1f]"
              aria-label="Facebook Link"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#eeeeef] rounded-lg transition text-[#76767b] hover:text-[#1d1d1f]"
              aria-label="YouTube Link"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2 - Operating Hours */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1d1d1f]">Saloon Hours</h4>
          <div className="w-8 h-[1px] bg-[#1d1d1f]" />
          <ul className="space-y-2 text-[#76767b] text-xs">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span className="text-[#1d1d1f] font-semibold">9:00 AM - 8:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Saturday</span>
              <span className="text-[#1d1d1f] font-semibold">9:00 AM - 6:00 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sunday</span>
              <span className="text-[#1d1d1f] font-semibold">10:00 AM - 4:00 PM</span>
            </li>
          </ul>
        </div>

        {/* Column 3 - Quick Contact */}
        <div className="space-y-4">
          <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-[#1d1d1f]">The Studio</h4>
          <div className="w-8 h-[1px] bg-[#1d1d1f]" />
          <ul className="space-y-3 text-[#76767b] text-xs">
            <li>
              <strong className="block text-[#1d1d1f] font-bold uppercase tracking-wider text-[9px] mb-0.5">Address</strong>
              124, Civil Lines, Near Elite Crossing, Jhansi, UP
            </li>
            <li>
              <strong className="block text-[#1d1d1f] font-bold uppercase tracking-wider text-[9px] mb-0.5">Phone</strong>
              +91 94500 XXXXX
            </li>
            <li>
              <strong className="block text-[#1d1d1f] font-bold uppercase tracking-wider text-[9px] mb-0.5">Email</strong>
              appointments@eaglesaloon.com
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright row */}
      <div className="max-w-7xl mx-auto px-6 border-t border-[#e5e5e7] mt-12 pt-8 text-center text-[#a1a1a6] text-[9px] uppercase tracking-wider font-semibold">
        <p>&copy; {new Date().getFullYear()} Eagle Men's Saloon. All rights reserved. Crafted by Satyendra.</p>
      </div>
    </footer>
  );
}
