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
    <section id="location" className="py-24 md:py-32 bg-white border-t border-[#e5e5e7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Contact details & hours */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block">
                Find Our Studio
              </span>
              <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] leading-tight">
                Location & Hours
              </h2>
              <div className="w-8 h-[1px] bg-[#1d1d1f]" />
              
              <div className="space-y-4 pt-4">
                {/* Address */}
                <div className="flex items-start space-x-3 text-sm">
                  <MapPin className="w-4 h-4 text-[#1d1d1f] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[9px]">Address</h4>
                    <p className="text-[#76767b] font-light mt-1 text-xs">
                      124, Civil Lines, Near Elite Crossing, <br />
                      Jhansi, Uttar Pradesh 284001
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-[#1d1d1f] mt-1 flex-shrink-0" />
                  <div className="w-full">
                    <h4 className="font-bold text-[#1d1d1f] uppercase tracking-wider text-[9px] mb-2">Operating Hours</h4>
                    <div className="grid grid-cols-2 gap-y-1.5 text-xs text-[#76767b] font-light">
                      <span>Mon - Fri</span>
                      <span className="font-semibold text-[#1d1d1f] text-right">9:00 AM - 8:00 PM</span>
                      <span>Saturday</span>
                      <span className="font-semibold text-[#1d1d1f] text-right">9:00 AM - 6:00 PM</span>
                      <span>Sunday</span>
                      <span className="font-semibold text-[#1d1d1f] text-right">10:00 AM - 4:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-[#e5e5e7]">
              <a
                href="tel:+919450000000"
                className="flex items-center justify-center py-3 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#f5f5f7] rounded-full text-xs uppercase tracking-widest font-bold transition text-[#1d1d1f]"
              >
                <Phone className="w-3.5 h-3.5 mr-2 text-[#1d1d1f]" />
                Call
              </a>

              <a
                href="https://wa.me/919450000000?text=Hi%20Eagle%20Saloon,%20I'd%20like%20to%20ask%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-3 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#f5f5f7] rounded-full text-xs uppercase tracking-widest font-bold transition text-[#1d1d1f]"
              >
                <MessageSquare className="w-3.5 h-3.5 mr-2 text-[#1d1d1f]" />
                Chat
              </a>

              <button
                onClick={handleDirections}
                className="flex items-center justify-center py-3 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white text-xs uppercase tracking-widest font-bold rounded-full transition duration-250 shadow-sm"
              >
                <Navigation className="w-3.5 h-3.5 mr-2" />
                Directions
              </button>
            </div>
          </div>

          {/* Map Frame */}
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#e5e5e7] shadow-sm h-[320px] lg:h-auto min-h-[300px]">
            <iframe
              title="Eagle Men's Saloon Jhansi Google Maps location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14413.78453412586!2d78.5638361!3d25.423301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397776d63499b9cf%3A0xc3b8364239841857!2sCivil%20Lines%2C%20Jhansi%2C%20Uttar%20Pradesh%20284001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(1) contrast(1.05)" }}
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
