"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";

interface BarbersProps {
  onBookBarber: (barberName: string) => void;
}

// Custom SVG Instagram Icon to bypass Lucide package version constraints
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
    img: "/assets/interior.png",
    instagram: "https://instagram.com/alex_hair",
  },
  {
    name: "Marcus Thorne",
    role: "Beard Specialist",
    exp: "10 Years",
    specialty: "Classic Beard Sculpting & Scalp Therapy",
    bio: "Marcus is dedicated to the craft of beard care. He treats facial hair with customized oils, straight-razor detailing, and signature hot stem towels, ensuring a sharp look and healthy skin.",
    img: "/assets/interior.png",
    instagram: "https://instagram.com/marcus_beard",
  },
];

export default function Barbers({ onBookBarber }: BarbersProps) {
  return (
    <section id="barber" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold block mb-3">
            The Craftsmen
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#111111] mb-6">
            Meet Our Barbers
          </h2>
          <div className="w-12 h-[1px] bg-[#C8A76A] mx-auto" />
        </div>

        {/* Barbers Editorial Grid */}
        <div className="space-y-20 md:space-y-28">
          {BARBER_CREW.map((barber, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={barber.name}
                className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                {/* Image Frame (5 cols) */}
                <div
                  className={`md:col-span-5 ${
                    isEven ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group rounded-2xl overflow-hidden shadow-lg border border-[#111111]/5"
                  >
                    <div className="aspect-[4/5] bg-[#2A2A2A] relative">
                      <img
                        src={barber.img}
                        alt={barber.name}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      {/* Experience Badge */}
                      <div className="absolute top-4 left-4 bg-[#111111] text-[#FAF8F5] border border-[#C8A76A]/20 px-3 py-1.5 rounded-lg flex flex-col items-center">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-[#C8A76A]">Experience</span>
                        <span className="text-xs font-serif font-bold">{barber.exp}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Barber Info (7 cols) */}
                <div
                  className={`md:col-span-7 flex flex-col justify-center space-y-6 ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-bold">
                        {barber.name === "Satyendra" ? "Founder" : "Specialist"}
                      </span>
                      <div className="w-1.5 h-1.5 bg-[#C8A76A] rounded-full" />
                      <span className="text-xs text-stone-400 font-semibold">{barber.role}</span>
                    </div>

                    <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#111111]">
                      {barber.name}
                    </h3>
                    
                    <div className="flex items-center space-x-2 text-stone-500 font-medium text-xs bg-[#FAF8F5] px-3 py-1.5 rounded-full w-fit border border-[#111111]/5">
                      <Award className="w-3.5 h-3.5 text-[#C8A76A]" />
                      <span>{barber.specialty}</span>
                    </div>

                    <p className="text-stone-500 text-sm font-light leading-relaxed">
                      {barber.bio}
                    </p>

                    <div className="flex items-center space-x-4 pt-4">
                      {/* Book CTA */}
                      <button
                        onClick={() => onBookBarber(barber.name)}
                        className="px-6 py-2.5 bg-[#111111] hover:bg-[#C8A76A] text-white hover:text-[#111111] text-xs uppercase tracking-widest font-bold rounded-lg transition duration-200 active:scale-98 shadow-sm"
                      >
                        Book With {barber.name}
                      </button>

                      {/* Instagram Link */}
                      <a
                        href={barber.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 border border-[#111111]/10 hover:border-[#C8A76A] hover:bg-stone-50 rounded-lg transition text-[#111111]/70 hover:text-[#C8A76A]"
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
