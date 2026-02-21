# Polish the Sleep Smarter Analytics Dashboard

The dashboard is functional but needs production polish. Do the following:

## 1. Move to permanent location
Copy this entire project to /Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/dashboard/

## 2. Wire up REAL GA4 data
- The GA4 service account key is at: ~/.config/kitt/kitt-data-f19618a774e7.json
- Property ID: 523117386
- Read the key file and make sure the API route actually connects and returns real data
- Test by running npm run dev and hitting /api/analytics

## 3. Add middleware.ts for password auth
- Simple cookie-based auth
- Password from env var DASHBOARD_PASSWORD
- Redirect to /login if not authenticated
- /login page should work and set the auth cookie

## 4. Polish the UI
- Make sure all 7 sections render cleanly
- Loading skeletons while data fetches
- Error states that say "No data available" not crash
- Responsive on mobile
- Smooth hover states on cards and table rows
- Sparkline mini-charts on KPI cards

## 5. Add a .env.local file (gitignored) with:
GA4_PROPERTY_ID=523117386
GA4_SERVICE_ACCOUNT_KEY_PATH=/Users/jmodigital/.config/kitt/kitt-data-f19618a774e7.json
DASHBOARD_PASSWORD=sleepsmarter2026

## 6. Make sure npm run build passes with zero errors

## 7. Create a GitHub repo and push
- Use gh CLI: gh repo create jmodigitalbot-ai/sleepsmarter-dashboard --private --source=. --push

When completely finished, run: openclaw system event --text "Done: Dashboard polished, real GA4 data connected, deployed to GitHub" --mode now
