"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface BarbersProps {
  onBookBarber: (barberName: string) => void;
}

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

const BARBER_CREW = [
  {
    name: "Satyendra",
    role: "Founder & Master Barber",
    exp: "15+ Years",
    specialty: "Custom Scissor Cuts & Hot Razor Shaves",
    bio: "Satyendra views grooming as a form of sculpture. Having trained in heritage barbershops across major grooming capitals, he established Eagle Saloon to bring world-class precision and hospitality to Jhansi.",
    img: "/assets/satyendra.png",
    instagram: "https://instagram.com/satyendra_barber",
  },
  {
    name: "Alex Mercer",
    role: "Senior Stylist",
    exp: "8 Years",
    specialty: "Modern Fades & Creative Color Work",
    bio: "Alex is the crew's modern styling virtuoso. His specialization lies in high-contrast skin fades, textured undercuts, and custom styling that matches the contemporary aesthetic of college students and professionals.",
    img: "/assets/alex_mercer.png",
    instagram: "https://instagram.com/alex_hair",
  },
  {
    name: "Marcus Thorne",
    role: "Beard Specialist",
    exp: "10 Years",
    specialty: "Classic Beard Sculpting & Scalp Therapy",
    bio: "Marcus is dedicated to the craft of beard care. He treats facial hair with customized oils, straight-razor detailing, and signature hot steam towels, ensuring a sharp look and healthy skin.",
    img: "/assets/marcus_thorne.png",
    instagram: "https://instagram.com/marcus_beard",
  },
];

export default function Barbers({ onBookBarber }: BarbersProps) {
  return (
    <section id="barber" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-3">
            The Craftsmen
          </span>
          <h2 className="font-sans text-3xl md:text-5xl font-extrabold tracking-tight text-[#1d1d1f] mb-6">
            Meet Our Barbers
          </h2>
          <div className="w-8 h-[1px] bg-[#1d1d1f] mx-auto" />
        </div>

        {/* Barbers Editorial Grid */}
        <div className="space-y-20 md:space-y-28">
          {BARBER_CREW.map((barber, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={barber.name}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Frame (5 cols equivalence) */}
                <div className="w-full md:w-[40%]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group rounded-2xl overflow-hidden shadow-sm border border-[#e5e5e7]"
                  >
                    <div className="aspect-[4/5] bg-[#eeeeef] relative">
                      <img
                        src={barber.img}
                        alt={barber.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      {/* Experience Badge */}
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#e5e5e7] px-3 py-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[8px] uppercase tracking-wider font-bold text-[#76767b]">Experience</span>
                        <span className="text-xs font-bold text-[#1d1d1f]">{barber.exp}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Barber Info (7 cols equivalence) */}
                <div className="w-full md:w-[60%] flex flex-col justify-center space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-[9px] uppercase tracking-widest text-[#76767b] font-bold">
                        {barber.name === "Satyendra" ? "Founder" : "Specialist"}
                      </span>
                      <div className="w-1 h-1 bg-[#d2d2d7] rounded-full" />
                      <span className="text-[10px] text-[#76767b] font-bold uppercase tracking-wider">{barber.role}</span>
                    </div>

                    <h3 className="font-sans text-3xl font-extrabold tracking-tight text-[#1d1d1f]">
                      {barber.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-[#76767b] font-medium text-xs bg-[#f5f5f7] px-3 py-1.5 rounded-full w-fit border border-[#e5e5e7]">
                      <Award className="w-3.5 h-3.5 text-[#1d1d1f]" />
                      <span className="font-bold text-[10px] uppercase tracking-wider">{barber.specialty}</span>
                    </div>

                    <p className="text-[#76767b] text-xs font-light leading-relaxed">
                      {barber.bio}
                    </p>

                    <div className="flex items-center space-x-4 pt-4">
                      {/* Book CTA */}
                      <button
                        onClick={() => onBookBarber(barber.name)}
                        className="px-5 py-2.5 bg-[#1d1d1f] hover:bg-[#2A2A2A] text-white text-[10px] uppercase tracking-widest font-bold rounded-full transition duration-200 active:scale-98 shadow-sm"
                      >
                        Book With {barber.name}
                      </button>

                      {/* Instagram Link */}
                      <a
                        href={barber.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#e5e5e7] hover:border-[#1d1d1f] hover:bg-[#f5f5f7] rounded-lg transition text-[#76767b] hover:text-[#1d1d1f]"
                        aria-label={`${barber.name} on Instagram`}
                      >
                        <InstagramIcon className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
