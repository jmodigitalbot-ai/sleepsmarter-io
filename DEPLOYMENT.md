# Sleep Smarter - Deployment Guide

## Quick Deploy to Vercel

### Step 1: Login to Vercel
```bash
cd ~/clawd/projects/utility-website-portfolio/sleepsmarter.io/app
npx vercel login
```
This opens a browser — click to authenticate.

### Step 2: Deploy
```bash
npx vercel
```
Follow prompts:
- Set up and deploy? **Y**
- Which scope? (your account)
- Link to existing project? **N**
- Project name? **sleepsmarter**
- Directory with code? **.** (current)
- Override settings? **N**

### Step 3: Production Deploy
```bash
npx vercel --prod
```

### Step 4: Connect Domain
1. Go to https://vercel.com/dashboard
2. Click on **sleepsmarter** project
3. Go to **Settings** → **Domains**
4. Add **sleepsmarter.io**
5. Copy the DNS records shown
6. In Cloudflare (or Namecheap DNS):
   - Add CNAME record: `@` → `cname.vercel-dns.com`
   - Or A record: `@` → `76.76.21.21`
7. Wait for DNS propagation (usually 5-15 minutes)

---

## What's Included

### Pages
- `/` — Homepage with sleep calculator
- `/blog` — Blog index with 5 articles
- `/blog/[slug]` — Individual article pages
- `/about` — About page
- `/privacy` — Privacy policy
- `/terms` — Terms of service

### Features
- ✅ Sleep calculator (bedtime & wake-up modes)
- ✅ 90-minute cycle calculations
- ✅ Fall-asleep time adjustment (14 min)
- ✅ Quality ratings (optimal/good/minimum)
- ✅ Mobile-first responsive design
- ✅ Dark mode UI
- ✅ SEO meta tags
- ✅ Open Graph / Twitter cards
- ✅ Sitemap.xml & robots.txt

### Tech Stack
- Vite + React + TypeScript
- TailwindCSS v4
- React Router v7

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test calculator on mobile
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics 4
- [ ] Test social sharing (OG image)
- [ ] Apply for Google AdSense (later, when traffic arrives)

---

## Local Development

```bash
cd ~/clawd/projects/utility-website-portfolio/sleepsmarter.io/app
npm run dev
```
Opens at http://localhost:5173

---

*Last updated: 2026-02-03*
