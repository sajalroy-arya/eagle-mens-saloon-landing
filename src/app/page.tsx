"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
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

        {/* Section 3: Signature Services */}
        <Services onBookOpen={(srvName) => handleOpenBook(srvName)} />

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

      {/* Sticky Mobile Booking Tab */}
      <StickyMobileBar onBookOpen={() => handleOpenBook()} />

      {/* Interactive Booking Wizard Modal */}
      <BookingModal
        isOpen={isBookOpen}
        onClose={handleCloseBook}
        initialService={initialService}
        initialBarber={initialBarber}
      />
    </div>
  );
}
