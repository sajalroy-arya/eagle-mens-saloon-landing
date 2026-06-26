"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onBookOpen: () => void;
}

export default function Header({ onBookOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ["ritual", "services", "apothecary", "master-barber", "faq"];
      let currentSection = "";
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "The Ritual", href: "#ritual", id: "ritual" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Apothecary", href: "#apothecary", id: "apothecary" },
    { label: "Barber", href: "#master-barber", id: "master-barber" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "liquid-glass-nav shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 rounded-full bg-[#1d1d1f] flex items-center justify-center border border-[#e5e5e7] transition-transform duration-300 group-hover:scale-105">
            <span className="font-sans font-extrabold text-xs text-white">E</span>
          </div>
          <span className="font-sans text-base font-extrabold tracking-tight text-[#1d1d1f]">
            EAGLE
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[10px] uppercase tracking-widest font-bold transition-colors duration-250 hover:text-[#1d1d1f] ${
                activeSection === link.id ? "text-[#1d1d1f]" : "text-[#76767b]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <button
            onClick={onBookOpen}
            className="px-5 py-2 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white text-[10px] uppercase tracking-widest font-bold rounded-full transition-all duration-250 active:scale-98 shadow-sm"
          >
            Book Session
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#1d1d1f] hover:text-[#76767b] transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-white z-30 flex flex-col p-6 border-t border-[#e5e5e7]">
          <div className="flex flex-col space-y-6 my-auto text-center">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-sans text-2xl font-extrabold tracking-tight text-[#1d1d1f] hover:text-[#76767b]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto mb-8 space-y-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onBookOpen();
              }}
              className="w-full py-4 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-bold rounded-xl transition duration-200 shadow-md"
            >
              Book Session
            </button>
            
            <div className="flex justify-center space-x-6 text-[10px] text-[#76767b] font-bold tracking-wider uppercase">
              <a href="tel:+919450000000">Call Us</a>
              <span>•</span>
              <a href="https://wa.me/919450000000">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
