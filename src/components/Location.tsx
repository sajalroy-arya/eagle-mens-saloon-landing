"use client";

import React from "react";
import { MapPin, Phone, MessageSquare, Navigation, Clock } from "lucide-react";

export default function Location() {
  const handleDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=Eagle+Mens+Saloon+Civil+Lines+Jhansi",
      "_blank"
    );
  };

  return (
    <section id="location" className="py-24 md:py-32 bg-[#FAF8F5] border-t border-[#111111]/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact details & hours (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block">
                Find Our Lounge
              </span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] leading-tight">
                Location & Hours
              </h2>
              <div className="w-12 h-[1px] bg-[#C8A76A]" />
              
              <div className="space-y-4 pt-4">
                {/* Address */}
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-5 h-5 text-[#C8A76A] mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[10px]">Address</h4>
                    <p className="text-stone-500 font-light mt-1">
                      124, Civil Lines, Near Elite Crossing, <br />
                      Jhansi, Uttar Pradesh 284001
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3 text-sm">
                  <Clock className="w-5 h-5 text-[#C8A76A] mt-0.5 flex-shrink-0" />
                  <div className="w-full">
                    <h4 className="font-bold text-stone-700 uppercase tracking-wider text-[10px] mb-2">Operating Hours</h4>
                    <div className="grid grid-cols-2 gap-y-1.5 text-xs text-stone-500 font-light">
                      <span>Mon - Fri</span>
                      <span className="font-medium text-[#111111] text-right">9:00 AM - 8:00 PM</span>
                      <span>Saturday</span>
                      <span className="font-medium text-[#111111] text-right">9:00 AM - 6:00 PM</span>
                      <span>Sunday</span>
                      <span className="font-medium text-[#111111] text-right">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#111111]/5">
              <a
                href="tel:+919450000000"
                className="flex items-center justify-center py-3 border border-[#111111]/15 hover:border-[#111111] hover:bg-stone-50 rounded-xl text-xs uppercase tracking-widest font-bold transition text-[#111111]"
              >
                <Phone className="w-4 h-4 mr-2 text-[#C8A76A]" />
                Call
              </a>

              <a
                href="https://wa.me/919450000000?text=Hi%20Eagle%20Saloon,%20I'd%20like%20to%20ask%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 border border-green-200 bg-green-50/20 hover:bg-green-50 rounded-xl text-xs uppercase tracking-widest font-bold transition text-green-700"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-green-600" />
                Chat
              </a>

              <button
                onClick={handleDirections}
                className="flex items-center justify-center py-3 bg-[#111111] hover:bg-[#C8A76A] text-[#FAF8F5] hover:text-[#111111] text-xs uppercase tracking-widest font-bold rounded-xl transition duration-200 shadow-sm"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Directions
              </button>
            </div>
          </div>

          {/* Map Frame (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#111111]/5 shadow-md h-[320px] lg:h-auto min-h-[300px]">
            {/* Grayscale Styled Google Maps Embed centered on Jhansi Civil Lines */}
            <iframe
              title="Eagle Men's Saloon Jhansi Google Maps location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14413.78453412586!2d78.5638361!3d25.423301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397776d63499b9cf%3A0xc3b8364239841857!2sCivil%20Lines%2C%20Jhansi%2C%20Uttar%20Pradesh%20284001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) invert(0.04) contrast(1.1)" }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
