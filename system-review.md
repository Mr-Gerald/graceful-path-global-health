# System Review & Resumption Protocol

## Application Overview
**Project Name:** Graceful Path Global Health
**Core Stack:** React 19, Tailwind CSS, Lucide Icons, Google Gemini AI (gemini-3-pro-preview).
**Architecture:** Single-page application using hash-based routing (`window.location.hash`).

## Current State of Implementation
1.  **Authentication**: Managed in `App.tsx`. Supports `STUDENT` and `ADMIN` roles. Password resets are currently manual (admin contact).
2.  **Dashboard Logic**:
    - `StudentDashboard.tsx`: Handles course progress, materials, and live class inquiries.
    - `AdminDashboard.tsx`: Handles user management, notification broadcasting, and content updates.
3.  **Marketing Layer**:
    - `Home.tsx`: Extensive landing page with full-bleed sections. Includes social proofing (Reviews) with "Like" and "@Tag" reply functionality.
4.  **AI Integration**:
    - `geminiService.ts`: Uses `gemini-3-pro-preview` for clinical tutoring and `gemini-3-flash-preview` for structured data generation (Study Plans).
    - `AIChatbot.tsx`: Floating UI component providing persistent access to the AI tutor "Grace".

## State Resumption Pointers (Read this on restart)
- **Review State**: Reviews are stored in the `reviews` state within `App.tsx`. Each review object supports a `replies` array.
- **Tagging Logic**: The `handleReplyReview` function in `App.tsx` handles the `@` prefixing and triggers the `addNotification` helper.
- **Auth Guards**: Interactions in `Home.tsx` check for `currentUser`. If null, `onNavigate('/login')` is called.
- **UI Consistency**: The "Brand" color palette (blue/sky) is strictly defined in `index.html` tailwind config. Use `font-serif` for headers and `font-sans` for body.
- **Formatting Requirement**: Ensure `Home.tsx` stays comprehensive; do not truncate sections (Who We Are, Why Choose, Testimonials, Founder, Spotlight, Courses, FAQ, Contact) as they are vital for the user's conversion funnel.

## Outstanding Task Ideas
- Integrate the `analyzeStudyMaterial` multimodal function for students to upload notes.
- Implement a real "Quiz" engine within the `Practice Tests` section.
- Expand the `Calendar` and `Certificates` "Coming Soon" placeholders.