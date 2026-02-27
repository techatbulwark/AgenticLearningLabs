# Website Updates — February 26, 2026

## Summary Checklist

| # | Task | Area | Done |
|---|------|------|------|
| 1 | Remove FAQ page | Site-wide | Yes |
| 2 | Remove all Register Now buttons | Site-wide | Yes |
| 3 | Remove calendar/dates/register from course pages | Course Pages | Yes |
| 4 | Update hero headline | Homepage | Yes |
| 5 | Update tagline | Homepage | Yes |
| 6 | Replace first paragraph (funding copy) | Homepage | Yes |
| 7 | Replace "Our Courses" body copy | Homepage | Yes |
| 8 | Add Learn More + form (top of page) | Homepage | Yes |
| 9 | Replace Register Now with Learn More + form (bottom) | Homepage | Yes |
| 10 | Swap Register Now with "New Courses Coming April 2026" | Course Pages | Yes |

## Detailed Changes

### Site-wide
- Removed FAQ link from top nav bar (Header.jsx) and footer (Footer.jsx)
- Removed FAQ route and import from App.jsx
- Removed all "Register Now" buttons from every page (Home, Team, course pages, OurCourses, Footer)
- Added "Learn more" link to top nav bar
- Cleaned up unused imports (usePrereqModal, RegisterNow, useState, calendar images)

### Homepage (Home.jsx)
- Hero headline changed from "Learn AI. Get hired. Get promoted." to "AI Training for the Workforce"
- Tagline changed from "AI is not a fad!" to "Empowering people to excel with AI"
- First paragraph replaced with: "Funded by Employment Ontario, the Government of Ontario and the Government of Canada."
- Second paragraph left as-is
- Top "Learn more" button now links to /learn-more page
- Bottom: Added "Learn More" CTA section (replacing old RegisterNow) linking to /learn-more

### Our Courses Section (OurCourses.jsx)
- Body copy replaced with: "AI skills that help you build capacity. Empowering teams to work more efficiently while retaining human judgment and accountability. Agentic Learning Lab can help you or your team level up fast."
- Removed Register Now buttons from both mobile and desktop views

### Course Pages (DataAnalytics, CustomerExperience, SalesMarketing)
- Removed "Register now" hero buttons
- Removed entire calendar/schedule section with cohort date images
- Added "New Courses Coming April 2026" callout text (brand_yellow, semibold)
- Removed unused imports (calendar images, usePrereqModal, useState)

### New Learn More Page (LearnMore.jsx)
- New page at /learn-more route
- Form collects: Name, Title, Company, Email
- CASL-compliant consent checkbox (unchecked by default)
- Submit disabled until Name + valid Email + consent are satisfied
- Saves to Supabase `learn_more_inquiries` table
- Sends email notification via /send_inquiry API (same as ContactUs)
- Inline success/error messages
- Matches existing dark theme with dotted background

### Supabase
- New table: `learn_more_inquiries` (id, name, title, company, email, consent_communications, created_at)
- RLS enabled with public insert policy and authenticated read policy

## Files Modified
- frontend/src/App.jsx
- frontend/src/components/Header.jsx
- frontend/src/components/Footer.jsx
- frontend/src/components/OurCourses.jsx
- frontend/src/pages/Home.jsx
- frontend/src/pages/Team.jsx
- frontend/src/pages/DataAnalytics.jsx
- frontend/src/pages/CustomerExperience.jsx
- frontend/src/pages/SalesMarketing.jsx

## Files Created
- frontend/src/pages/LearnMore.jsx
- website-updates-feb-26-2026.md
