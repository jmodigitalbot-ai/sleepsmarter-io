# Sleep Smarter Analytics Dashboard

## What to build
A single-page analytics dashboard at src/app/page.tsx. Dark theme.

## Colors
- Background: #1a1a2e
- Cards: #16213e  
- Text: #f1faee
- Accent: #a8dadc
- Border: #4a4e69
- Green (up): #4ade80
- Red (down): #f87171

## Layout (7 sections, top to bottom)

### Header: "Sleep Smarter Analytics" + date range buttons (7d/30d/90d) + "Last updated" timestamp

### Section 1: KPI Cards (4 in a row)
- Sessions | Users | Email Signups | Revenue
- Each card shows: big number, % change badge (green/red), mini sparkline

### Section 2: Traffic Overview
- Left: Area chart (sessions by day, stacked by channel)
- Right: Donut chart (traffic by channel)

### Section 3: Paid Traffic
- Row of KPI cards: Spend, Clicks, Impressions, CTR, CPC, Conversions
- Bar chart: daily spend vs conversions

### Section 4: Organic Traffic
- KPI cards: Organic Sessions, Organic Users, Pages Indexed
- Line chart: organic sessions trend
- Table: top pages by organic traffic

### Section 5: Conversion Funnel
- Horizontal funnel bars: Sessions → Calculator → Email Signup → Sales Page → Checkout → Purchase
- Numbers and % drop at each step

### Section 6: Content Performance
- Sortable table: Page, Pageviews, Avg Time, Bounce Rate

### Section 7: Revenue by Source
- Table: Source, Sessions, Leads, Purchases, Revenue with color-coded change %

## API Route: src/app/api/analytics/route.ts
- Uses @google-analytics/data BetaAnalyticsDataClient
- Reads GA4_PROPERTY_ID and GA4_SERVICE_ACCOUNT_KEY from env
- Returns sessions, users, pageviews, sources, top pages, events
- Cache responses for 15 minutes using a simple in-memory Map
- Handle errors gracefully, return empty data on failure

## Auth: Simple middleware
- Check for DASHBOARD_PASSWORD env var
- Use basic cookie-based auth (login page at /login)

## IMPORTANT
- Use recharts for all charts
- Use shadcn Card, Table, Skeleton, Badge components (already installed)
- ALL data from GA4 API route — use mock/demo data as fallback when API fails
- Make sure `npm run build` passes with zero errors
