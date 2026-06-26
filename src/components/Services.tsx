"use client";

import React from "react";
import { motion as m } from "framer-motion";
import { Clock, Scissors } from "lucide-react";

interface ServicesProps {
  onBookOpen: (serviceName: string) => void;
}

const SERVICES_MENU = [
  {
    name: "Classic Haircut",
    price: "₹800",
    duration: "45 Min",
    desc: "Personalized scissor cut or fade tailored to your head structure, finished with a relaxing hair wash and styling.",
    img: "/assets/interior.png",
  },
  {
    name: "Bespoke Beard Styling",
    price: "₹500",
    duration: "30 Min",
    desc: "Traditional beard trim, hot steam towels, razor outline line-up, and conditioning with premium tea tree oil.",
    img: "/assets/interior.png",
  },
  {
    name: "Therapeutic Hair Spa",
    price: "₹1,200",
    duration: "60 Min",
    desc: "Intense scalp massage, deep-conditioning mask, and warm steam treatment to nourish dry hair and relieve stress.",
    img: "/assets/interior.png",
  },
  {
    name: "Detoxifying Skin Facial",
    price: "₹1,500",
    duration: "60 Min",
    desc: "Deep pore charcoal cleaning, facial scrub, skin-tightening massage, and ice steam compression.",
    img: "/assets/interior.png",
  },
  {
    name: "Young Gentleman Cut",
    price: "₹400",
    duration: "30 Min",
    desc: "A patient, gentle hair cutting experience for children under 12, featuring custom styling and a treat.",
    img: "/assets/interior.png",
  },
  {
    name: "Bridal Groom Package",
    price: "₹4,999",
    duration: "150 Min",
    desc: "The ultimate wedding transformation. Signature cut, luxury shave, skin brightening facial, hair spa, and dress styling.",
    img: "/assets/satyendra.png",
  },
];

export default function Services({ onBookOpen }: ServicesProps) {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#f5f5f7] border-y border-[#e5e5e7]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            Bespoke Treatments
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Signature Services
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_MENU.map((srv, idx) => (
            <m.div
              key={srv.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col h-full bg-white rounded-2xl border border-[#e5e5e7] overflow-hidden shadow-sm hover:shadow-soft transition-all duration-300 group hover:-translate-y-0.5"
            >
              {/* Image Container with overlay */}
              <div className="relative h-56 w-full bg-[#eeeeef] overflow-hidden border-b border-[#e5e5e7]">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
                <img
                  src={srv.img}
                  alt={srv.name}
                  className="w-full h-full object-cover transition-transform duration-750 ease-out group-hover:scale-103"
                />
                
                {/* Duration Tag */}
                <div className="absolute bottom-4 left-4 z-20 flex items-center bg-white/90 backdrop-blur-sm border border-[#e5e5e7] px-3 py-1 rounded-full text-[#1d1d1f] text-[9px] uppercase tracking-wider font-bold">
                  <Clock className="w-3 h-3 mr-1 text-[#1d1d1f]" />
                  {srv.duration}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-sans text-sm font-bold tracking-tight text-[#1d1d1f]">
                      {srv.name}
                    </h3>
                    <span className="font-sans font-extrabold text-sm text-[#1d1d1f]">
                      {srv.price}
                    </span>
                  </div>
                  <p className="text-[#76767b] text-xs font-light leading-relaxed mb-6">
                    {srv.desc}
                  </p>
                </div>

                {/* Footer Action */}
                <button
                  onClick={() => onBookOpen(srv.name)}
                  className="w-full py-3 bg-[#f5f5f7] hover:bg-[#1d1d1f] border border-[#e5e5e7] hover:border-[#1d1d1f] text-[#1d1d1f] hover:text-white text-[10px] uppercase tracking-widest font-bold rounded-lg transition-all duration-200 active:scale-98 shadow-sm flex items-center justify-center space-x-1.5"
                >
                  <Scissors className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </button>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
