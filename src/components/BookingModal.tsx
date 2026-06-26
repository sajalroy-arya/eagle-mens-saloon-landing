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

  // Calculate pricing
  const serviceObj = SERVICES.find(s => s.name === selectedService);
  const barberObj = BARBERS.find(b => b.name === selectedBarber);
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
      if (!phone.trim() || !/^[+]?[0-9]{10,13}$/.test(phone.replace(/[\s-]/g, ""))) newErrors.phone = "Please enter a valid 10-digit mobile number.";
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
      
      // Save reservation to localStorage
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

  // Calendar rendering helper
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
      return; // Prevent going to past months
    }
    setCurrentMonth(next);
  };

  const { firstDayIdx, totalDays } = getDaysInMonth(currentMonth);
  const monthLabel = currentMonth.toLocaleString("default", { month: "long", year: "numeric" });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm">
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full sm:h-auto sm:max-w-2xl bg-[#FAF8F5] text-[#111111] sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[100dvh]"
          >
            {/* Header */}
            <div className="px-6 py-5 border-b border-[#111111]/5 flex justify-between items-center bg-[#FAF8F5]">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-semibold">Bespoke Experience</span>
                <h3 className="font-serif text-2xl font-bold tracking-tight text-[#111111]">
                  {step === 5 ? "Booking Confirmed" : "Book An Appointment"}
                </h3>
              </div>
              {step !== 5 && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-[#111111]/5 rounded-full transition-colors duration-200"
                  aria-label="Close booking modal"
                >
                  <X className="w-5 h-5 text-[#2A2A2A]" />
                </button>
              )}
            </div>

            {/* Progress indicator */}
            {step < 5 && (
              <div className="px-6 pt-4 bg-[#FAF8F5]">
                <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
                  <span>Step {step} of 4</span>
                  <span className="font-medium text-[#C8A76A]">
                    {step === 1 && "Choose Service"}
                    {step === 2 && "Select Stylist"}
                    {step === 3 && "Pick Date & Time"}
                    {step === 4 && "Final Details"}
                  </span>
                </div>
                <div className="w-full bg-[#111111]/5 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C8A76A] h-full transition-all duration-300 ease-out"
                    style={{ width: `${(step / 4) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 max-h-[calc(100vh-180px)] sm:max-h-[60vh]">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* STEP 1: Select Service */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-semibold mb-2">Select Grooming Treatment</h4>
                    <div className="space-y-3">
                      {SERVICES.map(srv => (
                        <label
                          key={srv.id}
                          className={`flex items-start p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                            selectedService === srv.name
                              ? "border-[#C8A76A] bg-[#C8A76A]/5"
                              : "border-[#111111]/10 bg-white hover:border-[#111111]/25"
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
                            className="mt-1 accent-[#C8A76A]"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-baseline">
                              <span className="font-medium text-[#111111]">{srv.name}</span>
                              <span className="font-serif font-bold text-[#C8A76A] text-lg">₹{srv.price}</span>
                            </div>
                            <p className="text-sm text-stone-500 mt-1">{srv.desc}</p>
                            <span className="inline-block mt-2 text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full font-medium">
                              Duration: {srv.duration}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.service && (
                      <p className="text-red-600 text-sm font-medium mt-2">{errors.service}</p>
                    )}
                  </motion.div>
                )}

                {/* STEP 2: Select Barber */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="font-serif text-lg font-semibold mb-2">Select Stylist</h4>
                    <div className="space-y-3">
                      {BARBERS.map(barber => (
                        <label
                          key={barber.id}
                          className={`flex items-center p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                            selectedBarber === barber.name
                              ? "border-[#C8A76A] bg-[#C8A76A]/5"
                              : "border-[#111111]/10 bg-white hover:border-[#111111]/25"
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
                            className="accent-[#C8A76A]"
                          />
                          {/* Avatar representation */}
                          <div className="ml-3 w-12 h-12 rounded-full overflow-hidden bg-[#2A2A2A] border border-[#C8A76A]/20 flex-shrink-0 flex items-center justify-center">
                            {/* Fallback to simple icon since generated image isn't loaded */}
                            <User className="w-5 h-5 text-[#C8A76A]" />
                          </div>
                          <div className="ml-4 flex-1">
                            <div className="flex justify-between items-baseline">
                              <span className="font-medium text-[#111111]">{barber.name}</span>
                              <span className="text-xs uppercase tracking-widest text-[#C8A76A] font-semibold">{barber.id === "satyendra" ? "Founder" : "Stylist"}</span>
                            </div>
                            <p className="text-xs text-stone-500 font-medium">{barber.role}</p>
                            <p className="text-xs text-stone-400 mt-0.5">{barber.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.barber && (
                      <p className="text-red-600 text-sm font-medium mt-2">{errors.barber}</p>
                    )}
                  </motion.div>
                )}

                {/* STEP 3: Select Date & Time */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h4 className="font-serif text-lg font-semibold">Select Appointment Schedule</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                      {/* Mini Calendar (5 cols) */}
                      <div className="md:col-span-6 bg-white p-4 rounded-xl border border-[#111111]/5">
                        <div className="flex justify-between items-center mb-3">
                          <button
                            type="button"
                            onClick={() => changeMonth(-1)}
                            className="p-1 hover:bg-stone-100 rounded-full transition"
                            aria-label="Previous month"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-semibold">{monthLabel}</span>
                          <button
                            type="button"
                            onClick={() => changeMonth(1)}
                            className="p-1 hover:bg-stone-100 rounded-full transition"
                            aria-label="Next month"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Weekdays */}
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-stone-400 font-semibold mb-2">
                          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 text-center text-sm">
                          {/* Pad empty cells */}
                          {Array.from({ length: firstDayIdx }).map((_, idx) => (
                            <div key={`empty-${idx}`} />
                          ))}

                          {/* Render Days */}
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
                                  setSelectedTime(""); // Reset time on date change
                                  setErrors({});
                                }}
                                className={`h-8 w-8 rounded-full flex items-center justify-center text-xs transition font-medium ${
                                  isDisabled
                                    ? "text-stone-300 cursor-not-allowed"
                                    : isSelected
                                    ? "bg-[#C8A76A] text-white shadow-sm"
                                    : "hover:bg-stone-100 text-[#111111]"
                                }`}
                              >
                                {dayNum}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Time Slots (6 cols) */}
                      <div className="md:col-span-6 flex flex-col">
                        <span className="text-sm font-semibold text-stone-700 mb-3 flex items-center">
                          <Clock className="w-4 h-4 mr-2 text-[#C8A76A]" />
                          Available Slots
                        </span>
                        
                        {!selectedDate ? (
                          <div className="flex-1 flex items-center justify-center p-4 border border-dashed border-[#111111]/10 rounded-xl bg-stone-50/50">
                            <span className="text-xs text-stone-400 text-center">Please select a date first to load available time slots.</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 gap-2">
                            {TIME_SLOTS.map(slot => {
                              // Pseudo-booking block (make some slots booked for realism)
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
                                  className={`py-2 text-center text-xs rounded-lg border transition duration-200 font-medium ${
                                    isBooked
                                      ? "border-transparent bg-stone-100 text-stone-300 cursor-not-allowed line-through"
                                      : selectedTime === slot
                                      ? "border-[#C8A76A] bg-[#C8A76A] text-white font-bold"
                                      : "border-[#111111]/15 bg-white hover:border-[#111111]/50 text-[#111111]"
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
                      <p className="text-red-600 text-sm font-medium mt-2">{errors.datetime}</p>
                    )}
                  </motion.div>
                )}

                {/* STEP 4: Client Details & Ticket Summary */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      {/* Form Details (7 cols) */}
                      <div className="md:col-span-7 space-y-4">
                        <h4 className="font-serif text-lg font-semibold">Your Contact Details</h4>
                        
                        <div className="space-y-1">
                          <label htmlFor="client-name" className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Full Name *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <User className="w-4 h-4" />
                            </span>
                            <input
                              type="text"
                              id="client-name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="Enter your name"
                              className="pl-9 pr-3 py-2 w-full bg-white border border-[#111111]/15 rounded-lg text-sm focus:outline-none focus:border-[#C8A76A] transition-colors"
                              required
                            />
                          </div>
                          {errors.name && <p className="text-red-600 text-xs font-medium">{errors.name}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-email" className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Email Address *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <Mail className="w-4 h-4" />
                            </span>
                            <input
                              type="email"
                              id="client-email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="you@example.com"
                              className="pl-9 pr-3 py-2 w-full bg-white border border-[#111111]/15 rounded-lg text-sm focus:outline-none focus:border-[#C8A76A] transition-colors"
                              required
                            />
                          </div>
                          {errors.email && <p className="text-red-600 text-xs font-medium">{errors.email}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-phone" className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Mobile Number *</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                              <Phone className="w-4 h-4" />
                            </span>
                            <input
                              type="tel"
                              id="client-phone"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Enter 10-digit mobile number"
                              className="pl-9 pr-3 py-2 w-full bg-white border border-[#111111]/15 rounded-lg text-sm focus:outline-none focus:border-[#C8A76A] transition-colors"
                              required
                            />
                          </div>
                          {errors.phone && <p className="text-red-600 text-xs font-medium">{errors.phone}</p>}
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="client-notes" className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Special Requests (Optional)</label>
                          <div className="relative">
                            <span className="absolute top-2.5 left-3 pointer-events-none text-stone-400">
                              <FileText className="w-4 h-4" />
                            </span>
                            <textarea
                              id="client-notes"
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              placeholder="Any preferences, allergies, or styling requests..."
                              rows={3}
                              className="pl-9 pr-3 py-2 w-full bg-white border border-[#111111]/15 rounded-lg text-sm focus:outline-none focus:border-[#C8A76A] transition-colors resize-none"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Ticket Summary Card (5 cols) */}
                      <div className="md:col-span-5 bg-[#FAF8F5] p-5 border border-[#C8A76A]/20 rounded-xl relative overflow-hidden shadow-sm">
                        {/* Decorative background logo */}
                        <div className="absolute -right-4 -bottom-4 font-serif text-7xl font-bold text-stone-200/40 select-none">
                          EAGLE
                        </div>
                        
                        <div className="border-b border-[#111111]/5 pb-3 mb-4">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#C8A76A]">Summary Invoice</span>
                          <h4 className="font-serif text-base font-semibold">Appointment Ticket</h4>
                        </div>
                        
                        <div className="space-y-3 text-xs">
                          <div className="flex justify-between">
                            <span className="text-stone-400 uppercase tracking-wider">Service</span>
                            <span className="font-semibold text-[#111111] max-w-[150px] text-right truncate">{selectedService}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400 uppercase tracking-wider">Stylist</span>
                            <span className="font-semibold text-[#111111]">{selectedBarber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400 uppercase tracking-wider">Date</span>
                            <span className="font-semibold text-[#111111]">
                              {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400 uppercase tracking-wider">Time</span>
                            <span className="font-semibold text-[#111111]">{selectedTime}</span>
                          </div>
                          <div className="border-t border-[#111111]/5 pt-3 mt-3 flex justify-between items-baseline">
                            <span className="text-[#C8A76A] font-bold uppercase tracking-widest text-xs">Total Investment</span>
                            <span className="font-serif font-bold text-[#111111] text-xl">₹{totalCost}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: Success Screen */}
                {step === 5 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-6 space-y-6"
                  >
                    <div className="w-16 h-16 bg-[#C8A76A]/10 text-[#C8A76A] rounded-full flex items-center justify-center animate-fade-in shadow-inner">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div>
                      <h4 className="font-serif text-2xl font-bold tracking-tight">Reservation Confirmed!</h4>
                      <p className="text-stone-500 text-sm mt-1">We have reserved your slot. A confirmation ticket has been generated.</p>
                    </div>

                    {/* Styled Print Receipt Ticket */}
                    <div className="w-full max-w-sm bg-white border border-[#C8A76A]/20 rounded-2xl overflow-hidden shadow-md font-sans">
                      <div className="bg-[#111111] text-[#FAF8F5] px-6 py-4 flex justify-between items-center">
                        <span className="font-serif tracking-widest text-sm font-bold">EAGLE SALOON</span>
                        <span className="text-xs uppercase bg-[#C8A76A]/20 text-[#C8A76A] px-2 py-0.5 rounded font-mono font-semibold">{confirmationCode}</span>
                      </div>
                      
                      <div className="p-6 text-left space-y-4 text-sm border-b border-dashed border-[#111111]/10">
                        <div className="flex justify-between">
                          <span className="text-stone-400">Client</span>
                          <span className="font-medium text-[#111111]">{name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Treatment</span>
                          <span className="font-medium text-[#111111]">{selectedService}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Stylist</span>
                          <span className="font-medium text-[#111111]">{selectedBarber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-stone-400">Schedule</span>
                          <span className="font-medium text-[#111111] text-right">
                            {selectedDate?.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })} at {selectedTime}
                          </span>
                        </div>
                      </div>

                      <div className="bg-[#FAF8F5] px-6 py-4 flex justify-between items-center text-sm">
                        <span className="font-bold text-[#C8A76A] uppercase tracking-wider text-xs">Total Cost Paid at Salon</span>
                        <span className="font-serif font-bold text-lg text-[#111111]">₹{totalCost}</span>
                      </div>
                    </div>

                    <p className="text-xs text-stone-400 max-w-sm">
                      Need to reschedule or cancel? Please contact us at least 24 hours in advance at <strong>+91 94500 XXXXX</strong> or click the WhatsApp link.
                    </p>

                    <button
                      type="button"
                      onClick={() => {
                        handleReset();
                        onClose();
                      }}
                      className="px-6 py-2.5 bg-[#111111] text-white hover:bg-[#C8A76A] rounded-lg transition-colors font-medium text-sm tracking-wider uppercase"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

              </form>
            </div>

            {/* Sticky Modal Footer Actions */}
            {step < 5 && (
              <div className="px-6 py-4 border-t border-[#111111]/5 flex justify-between items-center bg-[#FAF8F5]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex items-center px-4 py-2 border border-[#111111]/10 rounded-lg hover:bg-stone-100 transition text-sm font-semibold"
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center px-6 py-2.5 bg-[#111111] text-white hover:bg-[#C8A76A] rounded-lg transition text-sm font-semibold tracking-wider uppercase"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center px-6 py-2.5 bg-[#111111] text-white hover:bg-[#C8A76A] rounded-lg transition text-sm font-semibold tracking-wider uppercase"
                  >
                    Confirm Booking
                    <Check className="w-4 h-4 ml-1" />
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
