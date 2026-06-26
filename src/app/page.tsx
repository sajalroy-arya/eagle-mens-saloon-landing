"use client";

import React, { useState } from "react";
import { Calendar } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Ritual from "@/components/Ritual";
import Services from "@/components/Services";
import Apothecary from "@/components/Apothecary";
import BeforeAfter from "@/components/BeforeAfter";
import Barbers from "@/components/Barbers";
import Experience from "@/components/Experience";
import Reviews from "@/components/Reviews";
import PricingTable from "@/components/PricingTable";
import Gallery from "@/components/Gallery";
import Faq from "@/components/Faq";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [initialService, setInitialService] = useState("");
  const [initialBarber, setInitialBarber] = useState("");

  const handleOpenBook = (service = "", barber = "") => {
    setInitialService(service);
    setInitialBarber(barber);
    setIsBookOpen(true);
  };

  const handleCloseBook = () => {
    setIsBookOpen(false);
    setInitialService("");
    setInitialBarber("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Navigation */}
      <Header onBookOpen={() => handleOpenBook()} />

      {/* Main Sections */}
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <Hero onBookOpen={() => handleOpenBook()} />

        {/* Section 2: Why Us */}
        <WhyUs />

        {/* Section 2.5: The Ritual (Process) */}
        <Ritual />

        {/* Section 3: Signature Services */}
        <Services onBookOpen={(srvName) => handleOpenBook(srvName)} />

        {/* Section 3.5: Apothecary Products */}
        <Apothecary />

        {/* Section 4: Before & After */}
        <BeforeAfter />

        {/* Section 5: Meet the Barbers */}
        <Barbers onBookBarber={(barberName) => handleOpenBook("", barberName)} />

        {/* Section 6: Ambient Experience */}
        <Experience />

        {/* Section 7: Google Reviews */}
        <Reviews />

        {/* Section 8: Pricing Menu */}
        <PricingTable onBookOpen={(srvName) => handleOpenBook(srvName)} />

        {/* Section 9: Masonry Gallery */}
        <Gallery />

        {/* Section 10: FAQ */}
        <Faq />

        {/* Section 11: Location Map & Details */}
        <Location />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Liquid Glass Booking Button (Desktop) */}
      <button
        onClick={() => handleOpenBook()}
        className="hidden md:flex fixed bottom-8 right-8 z-40 items-center space-x-2.5 px-6 py-4 rounded-full border border-[#e5e5e7] bg-white/75 backdrop-blur-2xl shadow-md hover:shadow-lg hover:scale-103 active:scale-98 transition-all duration-300 group cursor-pointer"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(255,255,255,0.2)",
        }}
      >
        <Calendar className="w-4 h-4 text-[#1d1d1f]" />
        <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#1d1d1f]">Book Session</span>
      </button>

      {/* Sticky Mobile Booking Tab */}
      <StickyMobileBar onBookOpen={() => handleOpenBook()} />

      {/* Interactive Booking Wizard Modal (Drawer style) */}
      <BookingModal
        isOpen={isBookOpen}
        onClose={handleCloseBook}
        initialService={initialService}
        initialBarber={initialBarber}
      />
    </div>
  );
}
