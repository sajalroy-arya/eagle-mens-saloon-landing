# Eagle Men's Saloon - Premium Landing Page

A luxurious, high-converting, and responsive landing page for **Eagle Men's Saloon**, featuring an interactive multi-step appointment booking system. Built with modern, semantic HTML5, pure HSL-based Vanilla CSS, and custom JavaScript state management.

## 🌟 Key Features

*   **Premium Visual Experience:** Deep charcoal and onyx background paired with luxurious gold accents, glassmorphic navigation, and subtle micro-animations.
*   **High-Converting Hero Section:** Bold typography, a clear value proposition, and a prominent call to action.
*   **Bespoke Services Menu:** Interactive pricing cards showcasing grooming packages starting at $60, including basic grooming, premium eagle packages, and the elite Royal Master Session.
*   **About Satyendra (Master Barber):** Highlights the craftsmanship and 15+ years of experience of the owner and master barber, Satyendra.
*   **Interactive Multi-Step Booking Widget:**
    *   **Step 1:** Select grooming package.
    *   **Step 2:** Choose a stylist (Satyendra, Alex, or Marcus).
    *   **Step 3:** Dynamic calendar and real-time slot generation (past times/dates are disabled).
    *   **Step 4:** Client information form with interactive ticket summary syncing, dynamic premium calculations (Satyendra's fee), and regex-based input validation.
    *   **Step 5:** Interactive confirmation screen featuring a generated unique ticket ID and summary receipt.
*   **Testimonials Slider:** Interactive client reviews carousel showcasing high customer satisfaction.
*   **Premium Custom Assets:** Tailored brand assets (logo, saloon interior, master barber portrait) generated to avoid simple placeholders.

## 🛠️ Technology Stack

*   **Core Structure:** HTML5 (Semantic elements, SEO-optimized tags)
*   **Styling & Themes:** CSS3 (Vanilla CSS, custom HSL properties, Glassmorphism, CSS Transitions/Keyframe animations)
*   **Logic & State:** Vanilla ES6+ JavaScript (State machine for booking form, calendar generator, slot management, slider carousel)
*   **Iconography:** FontAwesome v6

## 🚀 How to Run Locally

You can run this project locally using any simple web server.

### Option 1: Python
If you have Python installed, run this command in the project directory:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.

### Option 2: Node.js (npx)
If you have Node.js installed, run:
```bash
npx http-server
```
Then visit the URL provided in the terminal.

## 📁 Project Structure

```
├── assets/
│   ├── logo.png       # Generated custom saloon logo
│   ├── satyendra.png  # Generated portrait of Master Barber Satyendra
│   └── interior.png   # Generated saloon interior graphic
├── index.html         # Main structure, SEO metas, and layout elements
├── style.css          # Design system, HSL color tokens, animations, and responsive rules
├── app.js             # JavaScript logic (booking wizard state, calendar, slider)
└── .gitignore         # Editor/OS temporary file ignoring
```

---
*Crafted with precision and luxury. Owned and operated by Master Barber Satyendra.*
