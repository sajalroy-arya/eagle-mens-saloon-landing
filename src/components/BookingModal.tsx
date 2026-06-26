"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Phone, Mail, FileText, CheckCircle2 } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialBarber?: string;
}

const SERVICES = [
  {
    id: "basic",
    name: "Basic Grooming Package",
    price: 800,
    duration: "45 min",
    desc: "Precision haircut, hair wash, hot towel styling.",
  },
  {
    id: "premium",
    name: "Premium Eagle Package",
    price: 1500,
    duration: "75 min",
    desc: "Haircut, wash, beard sculpting, double steam towel, face mask, massage.",
  },
  {
    id: "royal",
    name: "Royal Master Session",
    price: 3500,
    duration: "90 min",
    desc: "Bespoke styling with Satyendra, luxury hot shave, gold facial massage, premium beverage.",
  },
];

const BARBERS = [
  {
    id: "satyendra",
    name: "Satyendra",
    role: "Founder & Master Barber",
    desc: "Custom scissor cuts, classic shaves. (₹500 premium)",
    premium: 500,
    avatar: "/assets/satyendra.png",
  },
  {
    id: "alex",
    name: "Alex Mercer",
    role: "Senior Stylist",
    desc: "Expert in modern fades, textured crops, hair coloring.",
    premium: 0,
    avatar: "/assets/alex_mercer.png",
  },
  {
    id: "marcus",
    name: "Marcus Thorne",
    role: "Beard Specialist",
    desc: "Straight-razor detailing, traditional beard shaping.",
    premium: 0,
    avatar: "/assets/marcus_thorne.png",
  },
];

const TIME_SLOTS = [
  "09:00 AM", "10:15 AM", "11:30 AM", "01:00 PM", "02:15 PM", "03:30 PM", "04:45 PM", "06:00 PM", "07:00 PM"
];

export default function BookingModal({ isOpen, onClose, initialService = "", initialBarber = "" }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(initialService);
  const [selectedBarber, setSelectedBarber] = useState(initialBarber);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  
  // Client details
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Error handling
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  // Booking confirmation code
  const [confirmationCode, setConfirmationCode] = useState("");

  // Calendar setup
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Sync initial props
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  useEffect(() => {
    if (initialBarber) {
      setSelectedBarber(initialBarber);
    }
  }, [initialBarber]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Calculate pricing
  const serviceObj = SERVICES.find(s => s.name === selectedService);
  const basePrice = serviceObj ? serviceObj.price : 0;
  const barberPremium = selectedBarber === "Satyendra" && selectedService !== "Royal Master Session" ? 500 : 0;
  const totalCost = basePrice + barberPremium;

  const validateStep = () => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1 && !selectedService) {
      newErrors.service = "Please select a service package to proceed.";
    }
    if (step === 2 && !selectedBarber) {
      newErrors.barber = "Please select a barber to proceed.";
    }
    if (step === 3 && (!selectedDate || !selectedTime)) {
      newErrors.datetime = "Please select both a date and time slot to proceed.";
    }
    if (step === 4) {
      if (!name.trim()) newErrors.name = "Full name is required.";
      if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Please enter a valid email address.";
      if (!phone.trim() || !/^[+]?[0-9]{10,13}$/.test(phone.replace(/[\s-]/g, ""))) newErrors.phone = "Please enter a valid mobile number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      const code = `EAG-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;
      setConfirmationCode(code);
      
      const bookingData = {
        code,
        name,
        email,
        phone,
        service: selectedService,
        barber: selectedBarber,
        date: selectedDate?.toISOString().split("T")[0],
        time: selectedTime,
        notes,
        cost: totalCost
      };

      const existingBookings = JSON.parse(localStorage.getItem("eagle_bookings") || "[]");
      existingBookings.push(bookingData);
      localStorage.setItem("eagle_bookings", JSON.stringify(existingBookings));

      setStep(5);
    }
  };

  const handleReset = () => {
    setStep(1);
    setSelectedService("");
    setSelectedBarber("");
    setSelectedDate(null);
    setSelectedTime("");
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    setErrors({});
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIdx = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDayIdx, totalDays };
  };

  const changeMonth = (offset: number) => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + offset, 1);
    if (next.getFullYear() < today.getFullYear() || (next.getFullYear() === today.getFullYear() && next.getMonth() < today.getMonth())) {
      return;
    }
    setCurrentMonth(next);
  };

  const { firstDayIdx, totalDays } = getDaysInMonth(currentMonth);
  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (step !== 5) {
                onClose();
              }
            }}
            className="fixed inset-0 bg-black/10 backdrop-blur-md"
          />

          {/* Slide-over Liquid Glass Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="relative z-50 w-full sm:w-[500px] h-full bg-white/75 backdrop-blur-2xl border-l border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            {/* Close Trigger Button */}
            {step !== 5 && (
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 bg-[#f5f5f7] hover:bg-[#eeeeef] rounded-full border border-[#e5e5e7] transition-all duration-200"
                aria-label="Close booking drawer"
              >
                <X className="w-4 h-4 text-[#1d1d1f]" />
              </button>
            )}

            {/* Header Content */}
            <div className="px-8 pt-10 pb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#76767b] font-bold block mb-1">
                Eagle Studio
              </span>
              <h3 className="font-sans text-xl font-extrabold tracking-tight text-[#1d1d1f]">
                {step === 5 ? "Reservation Confirmed" : "Book Session"}
              </h3>
              <div className="w-8 h-[1px] bg-[#1d1d1f] mt-3" />
            </div>

            {/* Step Indicators */}
            {step < 5 && (
              <div className="px-8 pb-3">
                <div className="w-full bg-[#e5e5e7] h-[2px] rounded-full relative">
                  <div
                    className="absolute h-full bg-[#1d1d1f] rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${((step - 1) / 3) * 100}%` }}
                  />
                  <div className="flex justify-between -top-[5px] absolute w-full">
                    {[1, 2, 3, 4].map(s => (
                      <div
                        key={s}
                        onClick={() => {
                          if (s < step) setStep(s);
                        }}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                          s <= step ? "bg-[#1d1d1f]" : "bg-[#e5e5e7]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-[9px] uppercase tracking-widest text-[#76767b] font-bold mt-3">
                  <span className={step === 1 ? "text-[#1d1d1f]" : ""}>Treatment</span>
                  <span className={step === 2 ? "text-[#1d1d1f]" : ""}>Barber</span>
                  <span className={step === 3 ? "text-[#1d1d1f]" : ""}>Schedule</span>
                  <span className={step === 4 ? "text-[#1d1d1f]" : ""}>Contact</span>
                </div>
              </div>
            )}

            {/* Scrollable Wizard Steps */}
            <div className="flex-1 overflow-y-auto px-8 py-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Step 1: Select Service */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wider mb-2">Select Grooming Package</h4>
                    <div className="space-y-3">
                      {SERVICES.map(srv => (
                        <label
                          key={srv.id}
                          className={`flex items-start p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            selectedService === srv.name
                              ? "border-[#1d1d1f] bg-white shadow-sm"
                              : "border-[#e5e5e7] bg-[#f5f5f7]/50 hover:border-[#d2d2d7]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={srv.name}
                            checked={selectedService === srv.name}
                            onChange={() => {
                              setSelectedService(srv.name);
                              setErrors({});
                            }}
                            className="mt-1 accent-[#1d1d1f]"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-xs text-[#1d1d1f] uppercase tracking-wide">{srv.name}</span>
                              <span className="font-sans font-extrabold text-sm text-[#1d1d1f]">₹{srv.price}</span>
                            </div>
                            <p className="text-[11px] text-[#76767b] font-light mt-1.5 leading-relaxed">{srv.desc}</p>
                            <span className="inline-block mt-3 text-[9px] font-bold bg-[#eeeeef] border border-[#e5e5e7] text-[#76767b] px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {srv.duration}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-[#df2020] text-xs font-semibold mt-2">{errors.service}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 2: Select Stylist */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wider mb-2">Select Barber</h4>
                    <div className="space-y-3">
                      {BARBERS.map(barber => (
                        <label
                          key={barber.id}
                          className={`flex items-center p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                            selectedBarber === barber.name
                              ? "border-[#1d1d1f] bg-white shadow-sm"
                              : "border-[#e5e5e7] bg-[#f5f5f7]/50 hover:border-[#d2d2d7]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="barber"
                            value={barber.name}
                            checked={selectedBarber === barber.name}
                            onChange={() => {
                              setSelectedBarber(barber.name);
                              setErrors({});
                            }}
                            className="accent-[#1d1d1f]"
                          />
                          <div className="ml-3 w-10 h-10 rounded-full overflow-hidden bg-[#eeeeef] border border-[#e5e5e7] flex-shrink-0 flex items-center justify-center">
                            <User className="w-4 h-4 text-[#76767b]" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between items-baseline">
                              <span className="font-bold text-xs uppercase tracking-wide text-[#1d1d1f]">{barber.name}</span>
                              <span className="text-[9px] uppercase tracking-widest text-[#76767b] font-bold">{barber.id === "satyendra" ? "Founder" : "Barber"}</span>
                            </div>
                            <p className="text-[10px] text-[#76767b] font-medium mt-0.5">{barber.role}</p>
                            <p className="text-[10px] text-[#a1a1a6] font-light mt-0.5">{barber.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.barber && (
                      <p className="text-[#df2020] text-xs font-semibold mt-2">{errors.barber}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Schedule Date & Time */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wider">Appointment Hours</h4>
                    
                    <div className="flex flex-col space-y-6">
                      {/* Mini Calendar */}
                      <div className="bg-[#f5f5f7]/50 p-4 rounded-xl border border-[#e5e5e7]">
                        <div className="flex justify-between items-center mb-3">
                          <button
                            type="button"
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-white border border-transparent hover:border-[#e5e5e7] rounded-full transition"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-xs uppercase tracking-widest font-bold text-[#1d1d1f]">{monthLabel}</span>
                          <button
                            type="button"
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-white border border-transparent hover:border-[#e5e5e7] rounded-full transition"
                            aria-label="Next month"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-7 gap-1 text-center text-[9px] uppercase tracking-wider font-extrabold text-[#76767b] mb-2">
                          <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center text-xs">
                          {Array.from({ length: firstDayIdx }).map((_, idx) => (
                            <div key={`empty-${idx}`} />
                          ))}

                          {Array.from({ length: totalDays }).map((_, idx) => {
                            const dayNum = idx + 1;
                            const cellDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayNum);
                            cellDate.setHours(0,0,0,0);
                            const isDisabled = cellDate < today;
                            const isSelected = selectedDate && cellDate.getTime() === selectedDate.getTime();

                            return (
                              <button
                                key={`day-${dayNum}`}
                                type="button"
                                disabled={isDisabled}
                                onClick={() => {
                                  setSelectedDate(cellDate);
                                  setSelectedTime("");
                                  setErrors({});
                                }}
                                className={`h-7 w-7 rounded-full flex items-center justify-center text-[10px] transition font-bold ${
                                  isDisabled
                                    ? "text-[#a1a1a6]/30 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-[#1d1d1f] text-white shadow-sm"
                                    : "hover:bg-white text-[#1d1d1f]"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#76767b] mb-3 flex items-center">
                          <Clock className="w-3.5 h-3.5 mr-2 text-[#1d1d1f]" />
                          Select Hour
                        </span>
                        
                        {!selectedDate ? (
                          <div className="flex items-center justify-center p-4 border border-dashed border-[#e5e5e7] rounded-xl bg-[#f5f5f7]/20">
                            <span className="text-[10px] uppercase tracking-wider text-[#a1a1a6] text-center font-bold">Select Date first</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map(slot => {
                              const dayOfWeek = selectedDate.getDay();
                              const isBooked = (dayOfWeek + slot.charCodeAt(1)) % 5 === 0;

                              return (
                                <button
                                  key={slot}
                                  type="button"
                                  disabled={isBooked}
                                  onClick={() => {
                                    setSelectedTime(slot);
                                    setErrors({});
                                  }}
                                  className={`py-2 text-center text-[10px] font-bold rounded-lg border transition duration-200 uppercase ${
                                    isBooked
                                      ? "border-transparent bg-[#f5f5f7]/30 text-[#a1a1a6]/40 cursor-not-allowed line-through"
                                      : selectedTime === slot
                                      ? "border-[#1d1d1f] bg-[#1d1d1f] text-white font-extrabold"
                                      : "border-[#e5e5e7] bg-white hover:border-[#1d1d1f] text-[#1d1d1f]"
                                  }`}
                                >
                                  {slot}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                    {errors.datetime && (
                      <p className="text-[#df2020] text-xs font-semibold mt-2">{errors.datetime}</p>
                    )}
                  </motion.div>
                )}

                {/* Step 4: Contact Details & Ticket Summary */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <div className="flex flex-col space-y-6">
                      {/* Contact Fields */}
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold text-[#1d1d1f] uppercase tracking-wider">Contact Info</h4>
                        
                        <div className="space-y-1">
                          <label htmlFor="client-name" className="text-[9px] font-extrabold text-[#76767b] uppercase tracking-wider block">Full Name *</label>
                          <input
                            type="text"
                            id="client-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Jane Doe"
                            className="px-4 py-2.5 w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1d1d1f] transition-all"
                            required
                          />
                          {errors.name && <p className="text-[#df2020] text-[10px] font-semibold">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-email" className="text-[9px] font-extrabold text-[#76767b] uppercase tracking-wider block">Email Address *</label>
                          <input
                            type="email"
                            id="client-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="jane@example.com"
                            className="px-4 py-2.5 w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1d1d1f] transition-all"
                            required
                          />
                          {errors.email && <p className="text-[#df2020] text-[10px] font-semibold">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-phone" className="text-[9px] font-extrabold text-[#76767b] uppercase tracking-wider block">Mobile Number *</label>
                          <input
                            type="tel"
                            id="client-phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="94500XXXXX"
                            className="px-4 py-2.5 w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1d1d1f] transition-all"
                            required
                          />
                          {errors.phone && <p className="text-[#df2020] text-[10px] font-semibold">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-notes" className="text-[9px] font-extrabold text-[#76767b] uppercase tracking-wider block">Requests (Optional)</label>
                          <textarea
                            id="client-notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Any sensitivities, hair types, or styling notes..."
                            rows={2}
                            className="px-4 py-2.5 w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-lg text-xs font-medium focus:outline-none focus:bg-white focus:border-[#1d1d1f] transition-all resize-none"
                          />
                        </div>
                      </div>

                      {/* Ticket Summary Card */}
                      <div className="bg-[#f5f5f7] p-5 border border-[#e5e5e7] rounded-2xl relative overflow-hidden">
                        <div className="border-b border-[#e5e5e7] pb-3 mb-4 flex justify-between items-center">
                          <div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-[#76767b]">Studio Slip</span>
                            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#1d1d1f] mt-0.5">Appointment Summary</h4>
                          </div>
                          <span className="text-[8px] uppercase border border-[#border-color-dark] text-[#76767b] font-bold px-2 py-0.5 rounded">EAGLE</span>
                        </div>
                        
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-[#76767b] text-[10px] uppercase font-bold tracking-wider">Service</span>
                            <span className="font-bold text-[#1d1d1f] max-w-[180px] truncate text-right">{selectedService}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#76767b] text-[10px] uppercase font-bold tracking-wider">Barber</span>
                            <span className="font-bold text-[#1d1d1f]">{selectedBarber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#76767b] text-[10px] uppercase font-bold tracking-wider">Date</span>
                            <span className="font-bold text-[#1d1d1f]">
                              {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#76767b] text-[10px] uppercase font-bold tracking-wider">Time</span>
                            <span className="font-bold text-[#1d1d1f]">{selectedTime}</span>
                          </div>
                          <div className="border-t border-[#e5e5e7] pt-4 mt-4 flex justify-between items-baseline">
                            <span className="text-[#1d1d1f] font-extrabold uppercase tracking-widest text-[10px]">Total Cost</span>
                            <span className="font-sans font-extrabold text-[#1d1d1f] text-lg">₹{totalCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 5: Success Screen */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-6 space-y-6"
                  >
                    <div className="w-12 h-12 bg-[#1d1d1f]/5 border border-[#1d1d1f] rounded-full flex items-center justify-center animate-fade-in shadow-inner text-[#1d1d1f]">
                      <Check className="w-5 h-5" />
                    </div>
                    
                    <div>
                      <h4 className="font-sans text-xl font-extrabold tracking-tight">Booking Completed</h4>
                      <p className="text-[#76767b] text-xs mt-1">We have reserved your slot. A receipt confirmation has been issued.</p>
                    </div>

                    {/* Styled Print Receipt Ticket */}
                    <div className="w-full bg-[#f5f5f7] border border-[#e5e5e7] rounded-2xl overflow-hidden font-sans">
                      <div className="bg-[#1d1d1f] text-white px-5 py-3.5 flex justify-between items-center">
                        <span className="tracking-widest text-xs font-bold">EAGLE STUDIO</span>
                        <span className="text-[10px] uppercase bg-white/20 text-white px-2 py-0.5 rounded font-mono font-semibold">{confirmationCode}</span>
                      </div>
                      
                      <div className="p-5 text-left space-y-3.5 text-xs border-b border-dashed border-[#e5e5e7]">
                        <div className="flex justify-between">
                          <span className="text-[#76767b] uppercase font-bold tracking-wider text-[9px]">Client</span>
                          <span className="font-bold text-[#1d1d1f]">{name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#76767b] uppercase font-bold tracking-wider text-[9px]">Treatment</span>
                          <span className="font-bold text-[#1d1d1f]">{selectedService}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#76767b] uppercase font-bold tracking-wider text-[9px]">Stylist</span>
                          <span className="font-bold text-[#1d1d1f]">{selectedBarber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#76767b] uppercase font-bold tracking-wider text-[9px]">Schedule</span>
                          <span className="font-bold text-[#1d1d1f] text-right">
                            {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at {selectedTime}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#eeeeef] px-5 py-3 flex justify-between items-center text-xs">
                        <span className="font-extrabold text-[#76767b] uppercase tracking-wider text-[9px]">Total Cost</span>
                        <span className="font-sans font-extrabold text-[#1d1d1f] text-base">₹{totalCost}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-[#76767b] max-w-xs leading-relaxed font-light">
                      Rescheduling requires 24 hours notice. Call us at <strong>(555) 123-4567</strong> or message on WhatsApp.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        handleReset();
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#1d1d1f] text-white hover:bg-[#2A2A2A] rounded-full transition-colors font-bold text-[10px] tracking-widest uppercase"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

              </form>
            </div>

            {/* Slide-over Footer Actions */}
            {step < 5 && (
              <div className="px-8 py-5 border-t border-[#e5e5e7] flex justify-between items-center bg-[#f5f5f7]/80 backdrop-blur-md">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-4 py-2 border border-[#e5e5e7] hover:border-[#1d1d1f] bg-white rounded-full transition text-xs font-bold uppercase tracking-wider"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-5 py-2.5 bg-[#1d1d1f] text-white hover:bg-[#2A2A2A] rounded-full transition text-[10px] font-bold tracking-widest uppercase"
                  >
                    Next Step
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center px-5 py-2.5 bg-[#1d1d1f] text-white hover:bg-[#2A2A2A] rounded-full transition text-[10px] font-bold tracking-widest uppercase"
                  >
                    Confirm Booking
                    <Check className="w-3.5 h-3.5 ml-1" />
                  </button>
                )}
              </div>
            )}

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
