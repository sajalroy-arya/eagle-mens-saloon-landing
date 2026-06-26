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

      // Simple active link highlighting on scroll
      const sections = ["experience", "services", "barber", "reviews", "faq"];
      let currentSection = "";
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
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
    { label: "The Experience", href: "#experience", id: "experience" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Master Barber", href: "#barber", id: "barber" },
    { label: "Reviews", href: "#reviews", id: "reviews" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled ? "glass-header shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-9 h-9 rounded-full bg-[#111111] flex items-center justify-center border border-[#C8A76A]/20 transition-transform duration-300 group-hover:scale-105">
            <span className="font-serif font-bold text-sm text-[#C8A76A]">E</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-widest text-[#111111] transition-colors duration-250 group-hover:text-[#C8A76A]">
            EAGLE
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`text-xs uppercase tracking-widest font-semibold transition-colors duration-200 hover:text-[#C8A76A] ${
                activeSection === link.id ? "text-[#C8A76A]" : "text-[#111111]/70"
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
            className="px-5 py-2.5 bg-[#111111] hover:bg-[#C8A76A] text-[#FAF8F5] text-xs uppercase tracking-widest font-bold rounded-lg transition-colors duration-250 active:scale-98 shadow-sm"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#111111]/80 hover:text-[#C8A76A] transition-colors duration-200"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] left-0 w-full h-[calc(100vh-73px)] bg-[#FAF8F5] z-30 flex flex-col p-6 animate-fade-in border-t border-[#111111]/5">
          <div className="flex flex-col space-y-6 my-auto text-center">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-serif text-3xl font-bold tracking-tight text-[#111111] hover:text-[#C8A76A] transition-colors duration-200"
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
              className="w-full py-4 bg-[#111111] hover:bg-[#C8A76A] text-white text-sm uppercase tracking-widest font-bold rounded-xl transition duration-200 shadow-md"
            >
              Book Appointment
            </button>
            
            <div className="flex justify-center space-x-6 text-xs text-stone-500 font-semibold tracking-wider">
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
