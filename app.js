/* ==========================================================================
   Eagle Men's Saloon Premium JS Application
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // --- Application State ---
    const bookingState = {
        currentStep: 1,
        selectedService: '',
        selectedPrice: 0,
        selectedBarber: '',
        selectedDate: null,
        selectedTime: '',
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        clientNotes: '',
        basePrice: 0,
        barberPremium: 0,
        totalCost: 0
    };

    // Calendar variables
    let currentCalDate = new Date(); // Date representing the currently viewed calendar month
    const today = new Date();
    today.setHours(0,0,0,0);

    // --- DOM Elements ---
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // Testimonials Elements
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevSlideBtn = document.getElementById('prev-slide-btn');
    const nextSlideBtn = document.getElementById('next-slide-btn');
    const dotsContainer = document.getElementById('slider-dots-container');
    let currentSlideIdx = 0;
    let testimonialInterval;

    // Booking Wizard Elements
    const wizardForm = document.getElementById('appointment-form');
    const wizardSteps = document.querySelectorAll('.wizard-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const progressFill = document.getElementById('progress-indicator-fill');
    
    // Step inputs
    const serviceRadios = document.getElementsByName('service');
    const barberRadios = document.getElementsByName('barber');
    const dateInput = document.getElementById('selected-date-input');
    const timeInput = document.getElementById('selected-time-input');
    
    // Ticket Summary Elements (Step 4)
    const summaryService = document.getElementById('summary-service');
    const summaryBarber = document.getElementById('summary-barber');
    const summaryDate = document.getElementById('summary-date');
    const summaryTime = document.getElementById('summary-time');
    const summaryTotal = document.getElementById('summary-total');

    // Success Step Elements
    const successStep = document.getElementById('step-success');
    const successCode = document.getElementById('success-code');
    const successName = document.getElementById('success-name');
    const successService = document.getElementById('success-service');
    const successBarber = document.getElementById('success-barber');
    const successDatetime = document.getElementById('success-datetime');
    const successTotal = document.getElementById('success-total');
    const restartBtn = document.getElementById('restart-booking-btn');

    // Calendar Elements
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const calendarMonthYearLabel = document.getElementById('calendar-month-year');
    const calendarDaysGrid = document.getElementById('calendar-days-grid');
    const timeSlotsContainer = document.getElementById('time-slots-container');

    // Navigation and Action triggers
    const serviceSelectButtons = document.querySelectorAll('.select-service-btn');
    const directBarberBookButton = document.querySelector('.select-barber-btn-direct');

    // --- Header Scroll Effect ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveNavLink();
    });

    // --- Mobile Nav Menu Toggle ---
    mobileToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.className = 'fa-solid fa-xmark';
        } else {
            icon.className = 'fa-solid fa-bars';
        }
    });

    // Close mobile nav when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    // Active Navigation Highlighting on Scroll
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    // --- Testimonials Slider Logic ---
    function setupTestimonials() {
        if (!testimonialSlides.length) return;
        
        // Create indicator dots dynamically
        testimonialSlides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

        // Event listeners
        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            resetTestimonialInterval();
        });
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            resetTestimonialInterval();
        });

        startTestimonialAutoplay();
    }

    function goToSlide(idx) {
        testimonialSlides[currentSlideIdx].classList.remove('active');
        dotsContainer.children[currentSlideIdx].classList.remove('active');
        
        currentSlideIdx = idx;
        
        testimonialSlides[currentSlideIdx].classList.add('active');
        dotsContainer.children[currentSlideIdx].classList.add('active');
        
        // Slide track
        const track = document.getElementById('testimonials-track');
        track.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
    }

    function nextSlide() {
        let nextIdx = currentSlideIdx + 1;
        if (nextIdx >= testimonialSlides.length) nextIdx = 0;
        goToSlide(nextIdx);
    }

    function prevSlide() {
        let prevIdx = currentSlideIdx - 1;
        if (prevIdx < 0) prevIdx = testimonialSlides.length - 1;
        goToSlide(prevIdx);
    }

    function startTestimonialAutoplay() {
        testimonialInterval = setInterval(nextSlide, 6000);
    }

    function resetTestimonialInterval() {
        clearInterval(testimonialInterval);
        startTestimonialAutoplay();
    }

    setupTestimonials();


    // --- Booking Flow State Machine ---

    // Service card clicks in Menu section
    serviceSelectButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const serviceName = btn.getAttribute('data-service');
            const servicePrice = parseFloat(btn.getAttribute('data-price'));
            
            // Set service radios
            for (let radio of serviceRadios) {
                if (radio.value === serviceName) {
                    radio.checked = true;
                    updateServiceState(radio);
                    break;
                }
            }
            
            // Move wizard to step 2 directly
            goToStep(2);
        });
    });

    // "Book with Satyendra" direct button in bio section
    if (directBarberBookButton) {
        directBarberBookButton.addEventListener('click', () => {
            // Select Satyendra in the form
            for (let radio of barberRadios) {
                if (radio.value === 'Satyendra') {
                    radio.checked = true;
                    updateBarberState(radio);
                    break;
                }
            }
            
            // Check if service is already selected, if not start at step 1
            if (bookingState.selectedService) {
                goToStep(3); // jump to date schedule
            } else {
                goToStep(1); // pick service first
            }
            
            // Scroll to booking form
            document.getElementById('booking-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Wizard Navigation Handler
    document.querySelectorAll('.next-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const nextStep = parseInt(btn.getAttribute('data-next'));
            if (validateStep(bookingState.currentStep)) {
                goToStep(nextStep);
            }
        });
    });

    document.querySelectorAll('.prev-step-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const prevStep = parseInt(btn.getAttribute('data-prev'));
            goToStep(prevStep);
        });
    });

    // Step Validation
    function validateStep(step) {
        // Clear previous step errors
        document.getElementById(`step-${step}-error`).style.display = 'none';

        if (step === 1) {
            if (!bookingState.selectedService) {
                document.getElementById('step-1-error').style.display = 'block';
                return false;
            }
        } else if (step === 2) {
            if (!bookingState.selectedBarber) {
                document.getElementById('step-2-error').style.display = 'block';
                return false;
            }
        } else if (step === 3) {
            if (!bookingState.selectedDate || !bookingState.selectedTime) {
                document.getElementById('step-3-error').style.display = 'block';
                return false;
            }
        }
        return true;
    }

    // Go to specific step
    function goToStep(step) {
        // Hide all steps
        wizardSteps.forEach(s => s.classList.remove('active'));
        
        // Show target step
        const targetStepEl = document.getElementById(`step-${step}`);
        if (targetStepEl) {
            targetStepEl.classList.add('active');
        }
        
        // Update progress bar UI
        progressSteps.forEach(pStep => {
            const stepNum = parseInt(pStep.getAttribute('data-step'));
            pStep.classList.remove('active', 'completed');
            
            if (stepNum === step) {
                pStep.classList.add('active');
            } else if (stepNum < step) {
                pStep.classList.add('completed');
            }
        });

        // Fill progress indicator bar
        const fillPercentage = ((step - 1) / (progressSteps.length - 1)) * 100;
        progressFill.style.width = `${fillPercentage}%`;

        // Update state
        bookingState.currentStep = step;

        // Custom action on reaching steps
        if (step === 3) {
            renderCalendar();
            renderTimeSlots();
        } else if (step === 4) {
            updateSummaryTicket();
        }

        // Scroll to wizard container if it's not visible
        const wizardY = document.getElementById('booking-wizard').getBoundingClientRect().top + window.scrollY;
        if (window.scrollY > wizardY || (wizardY - window.scrollY) > window.innerHeight) {
            document.getElementById('booking-wizard').scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Monitor Input changes
    serviceRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateServiceState(radio);
        });
    });

    barberRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateBarberState(radio);
        });
    });

    function updateServiceState(radioEl) {
        bookingState.selectedService = radioEl.value;
        bookingState.basePrice = parseFloat(radioEl.getAttribute('data-price'));
        updatePrices();
    }

    function updateBarberState(radioEl) {
        bookingState.selectedBarber = radioEl.value;
        // Satyendra has a premium booking charge
        if (radioEl.value === 'Satyendra') {
            bookingState.barberPremium = 20;
        } else {
            bookingState.barberPremium = 0;
        }
        updatePrices();
        
        // If on step 3 (date-time picking), refresh slots since different barbers might have different availability
        if (bookingState.currentStep === 3) {
            renderTimeSlots();
        }
    }

    function updatePrices() {
        bookingState.totalCost = bookingState.basePrice + bookingState.barberPremium;
    }

    // --- Custom Calendar Logic ---
    prevMonthBtn.addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentCalDate.setMonth(currentCalDate.getMonth() + 1);
        renderCalendar();
    });

    function renderCalendar() {
        calendarDaysGrid.innerHTML = '';
        
        const year = currentCalDate.getFullYear();
        const month = currentCalDate.getMonth();
        
        // Month name label
        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        calendarMonthYearLabel.innerText = `${monthNames[month]} ${year}`;

        // Get first day of the month and total number of days
        const firstDayIdx = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        // Prevent viewing past months
        if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
            prevMonthBtn.style.opacity = '0.2';
            prevMonthBtn.style.pointerEvents = 'none';
        } else {
            prevMonthBtn.style.opacity = '1';
            prevMonthBtn.style.pointerEvents = 'auto';
        }

        // Pad preceding empty calendar cells
        for (let i = 0; i < firstDayIdx; i++) {
            const emptyCell = document.createElement('div');
            calendarDaysGrid.appendChild(emptyCell);
        }

        // Render days
        for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.innerText = dayNum;
            
            const cellDate = new Date(year, month, dayNum);
            cellDate.setHours(0,0,0,0);

            // Check if day is in the past
            if (cellDate < today) {
                dayCell.classList.add('disabled');
            } else {
                // If it is the selected date in state, mark active
                if (bookingState.selectedDate && cellDate.getTime() === bookingState.selectedDate.getTime()) {
                    dayCell.classList.add('active');
                }
                
                // Add click listener
                dayCell.addEventListener('click', () => {
                    // Update active state in UI
                    const currentlyActive = calendarDaysGrid.querySelector('.calendar-day.active');
                    if (currentlyActive) currentlyActive.classList.remove('active');
                    dayCell.classList.add('active');

                    // Save selected date
                    bookingState.selectedDate = cellDate;
                    dateInput.value = cellDate.toISOString().split('T')[0];

                    // Reset selected time slot when changing date
                    bookingState.selectedTime = '';
                    timeInput.value = '';

                    // Load slots
                    renderTimeSlots();
                });
            }
            
            calendarDaysGrid.appendChild(dayCell);
        }
    }

    // --- Mock Time Slots generation ---
    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        
        if (!bookingState.selectedDate) {
            timeSlotsContainer.innerHTML = '<p class="select-date-prompt">Please select a date first to see available slots.</p>';
            return;
        }

        // Generate base slots based on saloon hours
        // Mon-Fri: 9am-8pm, Sat: 9am-6pm, Sun: 10am-4pm
        const dayOfWeek = bookingState.selectedDate.getDay();
        let slots = [];
        
        if (dayOfWeek === 0) { // Sunday
            slots = ["10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM"];
        } else if (dayOfWeek === 6) { // Saturday
            slots = ["9:00 AM", "10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM", "4:45 PM"];
        } else { // Weekdays
            slots = ["9:00 AM", "10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM", "4:45 PM", "6:00 PM", "7:00 PM"];
        }

        // Mock some booked slots for realistic feel (based on hash of date & barber)
        const hash = (bookingState.selectedDate.getDate() + bookingState.selectedBarber.charCodeAt(0)) % 4;

        slots.forEach((slot, idx) => {
            const slotEl = document.createElement('div');
            slotEl.classList.add('time-slot');
            slotEl.innerText = slot;

            // Make some slots disabled based on hash logic
            const isBooked = (idx === hash || idx === (hash + 3) || idx === (hash + 5)) && (bookingState.selectedDate.getTime() !== today.getTime() || idx % 2 === 0);
            
            // Check if today and slot is in the past
            let isPast = false;
            if (bookingState.selectedDate.getTime() === today.getTime()) {
                const [timeStr, ampm] = slot.split(' ');
                let [hour, minute] = timeStr.split(':').map(Number);
                if (ampm === 'PM' && hour !== 12) hour += 12;
                if (ampm === 'AM' && hour === 12) hour = 0;
                
                const slotTime = new Date();
                slotTime.setHours(hour, minute, 0, 0);
                
                if (slotTime < new Date()) {
                    isPast = true;
                }
            }

            if (isBooked || isPast) {
                slotEl.classList.add('disabled');
            } else {
                if (bookingState.selectedTime === slot) {
                    slotEl.classList.add('active');
                }

                slotEl.addEventListener('click', () => {
                    const currentlyActive = timeSlotsContainer.querySelector('.time-slot.active');
                    if (currentlyActive) currentlyActive.classList.remove('active');
                    
                    slotEl.classList.add('active');
                    bookingState.selectedTime = slot;
                    timeInput.value = slot;
                });
            }

            timeSlotsContainer.appendChild(slotEl);
        });
    }

    // --- Update Summary Ticket on Step 4 ---
    function updateSummaryTicket() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        summaryService.innerText = bookingState.selectedService;
        
        let barberText = bookingState.selectedBarber;
        if (bookingState.selectedBarber === 'Satyendra') {
            barberText += ' (Master Barber, +$20)';
        } else {
            barberText += ' (Stylist)';
        }
        summaryBarber.innerText = barberText;
        
        summaryDate.innerText = bookingState.selectedDate ? bookingState.selectedDate.toLocaleDateString('en-US', options) : 'Not selected';
        summaryTime.innerText = bookingState.selectedTime || 'Not selected';
        summaryTotal.innerText = `$${bookingState.totalCost.toFixed(2)}`;
    }

    // --- Client Details Fields Input Listeners & Submit ---
    const clientNameInput = document.getElementById('client-name');
    const clientEmailInput = document.getElementById('client-email');
    const clientPhoneInput = document.getElementById('client-phone');
    const clientNotesInput = document.getElementById('client-notes');

    // Input handlers to clear errors instantly on typing
    clientNameInput.addEventListener('input', () => {
        document.getElementById('name-field-error').style.display = 'none';
        clientNameInput.classList.remove('is-invalid');
    });
    clientEmailInput.addEventListener('input', () => {
        document.getElementById('email-field-error').style.display = 'none';
        clientEmailInput.classList.remove('is-invalid');
    });
    clientPhoneInput.addEventListener('input', () => {
        document.getElementById('phone-field-error').style.display = 'none';
        clientPhoneInput.classList.remove('is-invalid');
    });

    wizardForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        // Reset warnings
        document.getElementById('step-4-error').style.display = 'none';

        // Validate name
        if (!clientNameInput.value.trim()) {
            document.getElementById('name-field-error').style.display = 'block';
            clientNameInput.classList.add('is-invalid');
            isValid = false;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmailInput.value.trim())) {
            document.getElementById('email-field-error').style.display = 'block';
            clientEmailInput.classList.add('is-invalid');
            isValid = false;
        }

        // Validate phone (simple format check)
        const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
        if (!phoneRegex.test(clientPhoneInput.value.trim().replace(/\s/g, ''))) {
            document.getElementById('phone-field-error').style.display = 'block';
            clientPhoneInput.classList.add('is-invalid');
            isValid = false;
        }

        if (!isValid) {
            document.getElementById('step-4-error').style.display = 'block';
            return;
        }

        // Save input details
        bookingState.clientName = clientNameInput.value.trim();
        bookingState.clientEmail = clientEmailInput.value.trim();
        bookingState.clientPhone = clientPhoneInput.value.trim();
        bookingState.clientNotes = clientNotesInput.value.trim();

        // Process successful reservation
        completeBooking();
    });

    function completeBooking() {
        // Generate random confirmation code
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const randChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const code = `EAG-${randNum}-${randChar}`;
        
        // Hide form step
        document.getElementById('step-4').classList.remove('active');
        
        // Populate Success Ticket
        successCode.innerText = code;
        successName.innerText = bookingState.clientName;
        successService.innerText = bookingState.selectedService;
        successBarber.innerText = bookingState.selectedBarber;
        
        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = bookingState.selectedDate.toLocaleDateString('en-US', dateOptions);
        successDatetime.innerText = `${formattedDate} at ${bookingState.selectedTime}`;
        successTotal.innerText = `$${bookingState.totalCost.toFixed(2)}`;

        // Show Success Step
        successStep.style.display = 'flex';
        
        // Hide wizard header progress indicator
        document.querySelector('.wizard-progress').style.display = 'none';

        // Store reservation locally
        saveReservationLocally(code);
    }

    function saveReservationLocally(code) {
        const reservation = {
            code: code,
            name: bookingState.clientName,
            email: bookingState.clientEmail,
            phone: bookingState.clientPhone,
            service: bookingState.selectedService,
            barber: bookingState.selectedBarber,
            date: bookingState.selectedDate.toISOString().split('T')[0],
            time: bookingState.selectedTime,
            notes: bookingState.clientNotes,
            cost: bookingState.totalCost
        };
        
        let currentBookings = JSON.parse(localStorage.getItem('eagle_bookings') || '[]');
        currentBookings.push(reservation);
        localStorage.setItem('eagle_bookings', JSON.stringify(currentBookings));
    }

    // Reset Wizard on Done click
    restartBtn.addEventListener('click', () => {
        // Clear state
        bookingState.currentStep = 1;
        bookingState.selectedService = '';
        bookingState.selectedPrice = 0;
        bookingState.selectedBarber = '';
        bookingState.selectedDate = null;
        bookingState.selectedTime = '';
        bookingState.clientName = '';
        bookingState.clientEmail = '';
        bookingState.clientPhone = '';
        bookingState.clientNotes = '';
        bookingState.basePrice = 0;
        bookingState.barberPremium = 0;
        bookingState.totalCost = 0;

        // Reset Form Inputs
        wizardForm.reset();
        
        // Uncheck all radios
        serviceRadios.forEach(r => r.checked = false);
        barberRadios.forEach(r => r.checked = false);
        
        dateInput.value = '';
        timeInput.value = '';
        
        // Reset errors
        document.querySelectorAll('.wizard-error').forEach(err => err.style.display = 'none');
        document.querySelectorAll('.field-error').forEach(err => err.style.display = 'none');
        document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

        // Reset wizard header indicators
        document.querySelector('.wizard-progress').style.display = 'block';
        
        // Hide success step
        successStep.style.display = 'none';

        // Jump back to step 1
        goToStep(1);
    });
});
