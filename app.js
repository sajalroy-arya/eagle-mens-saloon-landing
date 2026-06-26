/* ==========================================================================
   Eagle Men's Saloon Premium JS Application (Artisanal Redesign & Drawer)
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
    let currentCalDate = new Date();
    const today = new Date();
    today.setHours(0,0,0,0);

    // --- DOM Elements ---
    const header = document.getElementById('main-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('#main-nav a');
    
    // Slide-Over Drawer Elements
    const bookingDrawer = document.getElementById('booking-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const drawerClose = document.getElementById('drawer-close');
    const openBookingBtns = document.querySelectorAll('.open-booking-btn');

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
        if (window.scrollY > 40) {
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

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
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

    // --- Slide-Over Drawer Controls ---
    function openDrawer() {
        bookingDrawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // prevent background scrolling
        // Trigger initial step render
        goToStep(bookingState.currentStep);
    }

    function closeDrawer() {
        bookingDrawer.classList.remove('open');
        document.body.style.overflow = ''; // restore scrolling
    }

    openBookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            openDrawer();
        });
    });

    drawerClose.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bookingDrawer.classList.contains('open')) {
            closeDrawer();
        }
    });


    // --- FAQ Accordion Logic ---
    const faqTriggers = document.querySelectorAll('.faq-trigger');
    
    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const faqItem = trigger.parentElement;
            const panel = trigger.nextElementSibling;
            
            // Check if active
            const isActive = faqItem.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
                item.querySelector('.faq-panel').style.maxHeight = null;
            });
            
            if (!isActive) {
                faqItem.classList.add('active');
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });


    // --- Testimonials Slider Logic ---
    function setupTestimonials() {
        if (!testimonialSlides.length) return;
        
        testimonialSlides.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (idx === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });

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


    // --- Booking Wizard Flow Logic ---

    // Service select card clicks from menu
    serviceSelectButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const serviceName = btn.getAttribute('data-service');
            
            // Set service radio input in drawer
            for (let radio of serviceRadios) {
                if (radio.value === serviceName) {
                    radio.checked = true;
                    updateServiceState(radio);
                    break;
                }
            }
            
            // Open drawer and skip straight to step 2 (Barber selection)
            openDrawer();
            goToStep(2);
        });
    });

    // Direct Barber Book Button in Satyendra's profile section
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
            
            openDrawer();
            if (bookingState.selectedService) {
                goToStep(3); // Date/Time schedule
            } else {
                goToStep(1); // Pick package first
            }
        });
    }

    // Step Nav buttons
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

    function validateStep(step) {
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

    function goToStep(step) {
        wizardSteps.forEach(s => s.classList.remove('active'));
        
        const targetStepEl = document.getElementById(`step-${step}`);
        if (targetStepEl) {
            targetStepEl.classList.add('active');
        }
        
        progressSteps.forEach(pStep => {
            const stepNum = parseInt(pStep.getAttribute('data-step'));
            pStep.classList.remove('active', 'completed');
            
            if (stepNum === step) {
                pStep.classList.add('active');
            } else if (stepNum < step) {
                pStep.classList.add('completed');
            }
        });

        const fillPercentage = ((step - 1) / (progressSteps.length - 1)) * 100;
        progressFill.style.width = `${fillPercentage}%`;

        bookingState.currentStep = step;

        if (step === 3) {
            renderCalendar();
            renderTimeSlots();
        } else if (step === 4) {
            updateSummaryTicket();
        }

        // Auto Scroll to top inside drawer on step switch
        document.querySelector('.drawer-content').scrollTop = 0;
    }

    // Input listeners
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
        // Satyendra has a premium booking charge (waived in Royal Session)
        if (radioEl.value === 'Satyendra' && bookingState.selectedService !== 'Royal Master Session') {
            bookingState.barberPremium = 20;
        } else {
            bookingState.barberPremium = 0;
        }
        updatePrices();
        
        if (bookingState.currentStep === 3) {
            renderTimeSlots();
        }
    }

    function updatePrices() {
        bookingState.totalCost = bookingState.basePrice + bookingState.barberPremium;
    }

    // --- Custom Calendar Generator ---
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
        
        const monthNames = [
            "January", "February", "March", "April", "May", "June", 
            "July", "August", "September", "October", "November", "December"
        ];
        calendarMonthYearLabel.innerText = `${monthNames[month]} ${year}`;

        const firstDayIdx = new Date(year, month, 1).getDay();
        const totalDays = new Date(year, month + 1, 0).getDate();

        if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth())) {
            prevMonthBtn.style.opacity = '0.2';
            prevMonthBtn.style.pointerEvents = 'none';
        } else {
            prevMonthBtn.style.opacity = '1';
            prevMonthBtn.style.pointerEvents = 'auto';
        }

        // Padding cells
        for (let i = 0; i < firstDayIdx; i++) {
            const emptyCell = document.createElement('div');
            calendarDaysGrid.appendChild(emptyCell);
        }

        // Days rendering
        for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
            const dayCell = document.createElement('div');
            dayCell.classList.add('calendar-day');
            dayCell.innerText = dayNum;
            
            const cellDate = new Date(year, month, dayNum);
            cellDate.setHours(0,0,0,0);

            if (cellDate < today) {
                dayCell.classList.add('disabled');
            } else {
                if (bookingState.selectedDate && cellDate.getTime() === bookingState.selectedDate.getTime()) {
                    dayCell.classList.add('active');
                }
                
                dayCell.addEventListener('click', () => {
                    const currentlyActive = calendarDaysGrid.querySelector('.calendar-day.active');
                    if (currentlyActive) currentlyActive.classList.remove('active');
                    dayCell.classList.add('active');

                    bookingState.selectedDate = cellDate;
                    dateInput.value = cellDate.toISOString().split('T')[0];

                    bookingState.selectedTime = '';
                    timeInput.value = '';

                    renderTimeSlots();
                });
            }
            
            calendarDaysGrid.appendChild(dayCell);
        }
    }

    // --- Dynamic Time Slots ---
    function renderTimeSlots() {
        timeSlotsContainer.innerHTML = '';
        
        if (!bookingState.selectedDate) {
            timeSlotsContainer.innerHTML = '<p class="select-date-prompt">Select a date to load hours.</p>';
            return;
        }

        const dayOfWeek = bookingState.selectedDate.getDay();
        let slots = [];
        
        if (dayOfWeek === 0) { // Sunday
            slots = ["10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM"];
        } else if (dayOfWeek === 6) { // Saturday
            slots = ["9:00 AM", "10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM", "4:45 PM"];
        } else { // Weekdays
            slots = ["9:00 AM", "10:15 AM", "11:30 AM", "1:00 PM", "2:15 PM", "3:30 PM", "4:45 PM", "6:00 PM", "7:00 PM"];
        }

        // Mock booked slots logic
        const hash = (bookingState.selectedDate.getDate() + bookingState.selectedBarber.charCodeAt(0)) % 4;

        slots.forEach((slot, idx) => {
            const slotEl = document.createElement('div');
            slotEl.classList.add('time-slot');
            slotEl.innerText = slot;

            const isBooked = (idx === hash || idx === (hash + 3)) && (bookingState.selectedDate.getTime() !== today.getTime() || idx % 2 === 0);
            
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

    // --- Sync Ticket Summary ---
    function updateSummaryTicket() {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        
        summaryService.innerText = bookingState.selectedService;
        
        let barberText = bookingState.selectedBarber;
        if (bookingState.selectedBarber === 'Satyendra') {
            barberText += (bookingState.selectedService === 'Royal Master Session') ? ' (Owner)' : ' (Owner, +$20)';
        } else {
            barberText += ' (Barber)';
        }
        summaryBarber.innerText = barberText;
        
        summaryDate.innerText = bookingState.selectedDate ? bookingState.selectedDate.toLocaleDateString('en-US', options) : 'Not selected';
        summaryTime.innerText = bookingState.selectedTime || 'Not selected';
        summaryTotal.innerText = `$${bookingState.totalCost.toFixed(2)}`;
    }

    // --- Input Validation and submit ---
    const clientNameInput = document.getElementById('client-name');
    const clientEmailInput = document.getElementById('client-email');
    const clientPhoneInput = document.getElementById('client-phone');
    const clientNotesInput = document.getElementById('client-notes');

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
        document.getElementById('step-4-error').style.display = 'none';

        if (!clientNameInput.value.trim()) {
            document.getElementById('name-field-error').style.display = 'block';
            clientNameInput.classList.add('is-invalid');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(clientEmailInput.value.trim())) {
            document.getElementById('email-field-error').style.display = 'block';
            clientEmailInput.classList.add('is-invalid');
            isValid = false;
        }

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

        bookingState.clientName = clientNameInput.value.trim();
        bookingState.clientEmail = clientEmailInput.value.trim();
        bookingState.clientPhone = clientPhoneInput.value.trim();
        bookingState.clientNotes = clientNotesInput.value.trim();

        completeBooking();
    });

    function completeBooking() {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        const randChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        const code = `EAG-${randNum}-${randChar}`;
        
        document.getElementById('step-4').classList.remove('active');
        
        successCode.innerText = code;
        successName.innerText = bookingState.clientName;
        successService.innerText = bookingState.selectedService;
        successBarber.innerText = bookingState.selectedBarber;
        
        const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedDate = bookingState.selectedDate.toLocaleDateString('en-US', dateOptions);
        successDatetime.innerText = `${formattedDate} at ${bookingState.selectedTime}`;
        successTotal.innerText = `$${bookingState.totalCost.toFixed(2)}`;

        successStep.style.display = 'flex';
        document.querySelector('.wizard-progress').style.display = 'none';

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

    // Reset and close drawer on Done click
    restartBtn.addEventListener('click', () => {
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

        wizardForm.reset();
        
        serviceRadios.forEach(r => r.checked = false);
        barberRadios.forEach(r => r.checked = false);
        
        dateInput.value = '';
        timeInput.value = '';
        
        document.querySelectorAll('.wizard-error').forEach(err => err.style.display = 'none');
        document.querySelectorAll('.field-error').forEach(err => err.style.display = 'none');
        document.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

        document.querySelector('.wizard-progress').style.display = 'block';
        successStep.style.display = 'none';

        closeDrawer();
        goToStep(1);
    });
});
