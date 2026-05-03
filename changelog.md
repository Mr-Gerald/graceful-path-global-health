# Project Changelog - Graceful Path Global Health

## [1.2.0] - Latest Updates
### Added
- **Social Interaction Logic**: Implemented `@tagging` in review replies. When User B replies to User A, the text is automatically prefixed with `@User A`.
- **Notification System**: Integrated real-time notifications for review replies. Reviewers now receive an alert in their dashboard when someone replies to their success story.
- **Login Enforcement**: Added interactive guards. If a guest tries to "Like" or "Reply" to a review, or "Add Review", they are automatically redirected to the `/login` page.
- **Review Management**: Added "Add Academy Review" button and modal directly on the landing page for authenticated students.
- **Founder Section Enhancements**: Upgraded visual impact with floating decorative icons (Stethoscope, Heart, Activity), a "Visionary" trophy badge, and "Core Pillar" informational boxes.
- **Auth UI**: Added "Forgotten Password" prompt in the Login form with administrative contact instructions.

### Changed
- **Pricing Strategy**: Removed specific enrollment amounts from the Student Dashboard. Updated the interface to a "Request Quote" model, directing students to contact the Admin via WhatsApp/Telegram for current rates.
- **Home UI**: Restored all original sections (Who We Are, Why Choose Us, Inspiring Excellence) while layering on the new visual enhancements.
- **Student Dashboard**: Centered the payment/enrollment inquiry section for better mobile responsiveness.

### Fixed
- Reverted unintentional section removals to ensure the codebase remains complete and robust (approx. 800+ lines in Home.tsx).

## [1.1.0] - Foundation Updates
- Initial implementation of Gemini-powered AI Tutor (Grace).
- Dashboard structure for Students and Admins.
- Navigation logic and routing via hash fragments.