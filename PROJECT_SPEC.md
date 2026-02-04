# Sleep Smarter - Project Specification
**Domain:** sleepsmarter.io
**Created:** 2026-02-03

---

## Overview

A modern, mobile-first sleep calculator suite that helps users optimize their sleep by calculating ideal bedtimes and wake-up times based on 90-minute sleep cycles.

## Core Features (MVP)

### 1. Sleep Calculator
- **Bedtime Calculator:** "I need to wake up at X, when should I go to sleep?"
- **Wake-Up Calculator:** "I'm going to bed at X, when should I wake up?"
- Based on 90-minute sleep cycle science
- Accounts for average 14-minute fall-asleep time
- Shows multiple options (4, 5, or 6 full cycles)

### 2. UI/UX Requirements
- Mobile-first responsive design
- Dark mode by default (sleep-friendly)
- Large, easy-to-tap time inputs
- Clean, modern aesthetic
- Fast load time (<2s)
- No intrusive ads on MVP

## Tech Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** TailwindCSS
- **Hosting:** Vercel or Netlify
- **Analytics:** Google Analytics 4 + Search Console

## Sleep Cycle Science

### The Math
- 1 sleep cycle = ~90 minutes
- Waking at end of cycle = refreshed
- Waking mid-cycle = groggy
- Average time to fall asleep = 14 minutes

### Calculation Logic
```
For "wake up at X":
  bedtime = wake_time - (cycles * 90min) - 14min
  Show options for 4, 5, 6 cycles (6h, 7.5h, 9h sleep)

For "going to bed at X":
  wake_time = bedtime + 14min + (cycles * 90min)
  Show options for 4, 5, 6 cycles
```

## Page Structure

### Homepage (/)
- Hero with calculator widget
- Brief explanation of sleep cycles
- CTA to try the calculator

### Calculator (/calculator)
- Full-featured sleep calculator
- Toggle between bedtime/wake-up modes
- Results with recommendations

### Blog (/blog)
- SEO content hub
- Article listings

### About (/about)
- Site purpose and mission
- Sleep science credibility

### Legal
- Privacy Policy (/privacy)
- Terms of Service (/terms)

## Monetization Integration Points (Phase 4)

- Ad placements: Header banner, sidebar, in-content
- Affiliate links: Mattress recommendations, sleep products
- Premium: Ad-free experience, sleep tracking dashboard

## Design Inspiration

- Clean like calculator.net but modern
- Dark theme like sleepyti.me but less cluttered
- Mobile UX like native apps

## Brand

- **Name:** Sleep Smarter
- **Tagline:** "Wake up refreshed. Every time."
- **Colors:** Deep navy (#1a1a2e), Soft purple (#4a4e69), Light blue accent (#a8dadc)
- **Typography:** Inter or similar modern sans-serif

---

## Build Checklist

- [ ] Initialize Vite + React + TypeScript project
- [ ] Set up TailwindCSS with custom theme
- [ ] Build sleep calculator component
- [ ] Create responsive layout
- [ ] Add homepage
- [ ] Add calculator page
- [ ] Add about page
- [ ] Add privacy/terms pages
- [ ] Add blog structure
- [ ] Test on mobile
- [ ] Deploy to Vercel
