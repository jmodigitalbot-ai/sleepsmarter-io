# Sleep Smarter Paid Ads Tracking Infrastructure

**Date:** 2026-02-14  
**Status:** Complete setup documentation ready for implementation

## Overview

Complete paid advertising tracking infrastructure for sleepsmarter.io, including Google Tag Manager configuration, conversion event definitions, Google Ads campaign setup, landing page strategy, and Meta retargeting setup.

## Files Created

### 1. GTM Tag Configuration (`gtm-tag-setup.md`)
- Step-by-step guide to implement Meta Pixel, Google Ads conversion tracking, and Google Ads remarketing via Google Tag Manager
- Includes exact code snippets for implementation
- Testing and validation procedures
- 7-step implementation process with monitoring guidelines

### 2. Conversion Events Definition (`conversion-events-definition.md`)
- Defines 5 core conversion events with exact parameters and values:
  1. `email_signup` (lead magnet) - $0.50 value
  2. `tripwire_purchase` ($17) - $17.00 value
  3. `masterclass_purchase` ($67) - $67.00 value
  4. `premium_purchase` ($197) - $197.00 value
  5. `insider_signup` ($19/month) - $19.00 value
- Includes implementation code for each event
- Google Ads and Meta Pixel event mapping
- Testing checklist and integration points

### 3. Google Ads Landing Pages Strategy (`google-ads-landing-pages.md`)
- Analysis of existing pages suitable for ad traffic
- Required modifications for each page type
- Recommendations for 3 dedicated landing page variants:
  1. Problem-Solution Squeeze Page (lead generation)
  2. Product Comparison Landing Page (research phase)
  3. High-Ticket Program Landing Page (premium offers)
- Technical implementation guide with code snippets
- Testing and optimization framework

### 4. Google Ads Campaign Setup (`google-ads-campaign-setup.md`)
- Complete campaign structure using keyword research from `sleepsmarter-google-ads-keyword-plan.csv`
- 4 campaigns with total $20-30 daily budget:
  1. High-Intent Products ($15/day)
  2. Solution Seeking ($8/day)
  3. Product Comparisons ($4/day)
  4. Commercial Modifiers ($3/day)
- Detailed keyword implementation by ad group
- 3 responsive search ad drafts per ad group
- Negative keyword lists
- Bidding strategy recommendations (3-phase approach)
- Daily monitoring checklist

### 5. Meta Retargeting Setup (`meta-retargeting-setup.md`)
- Complete Meta Pixel event implementation guide
- Custom events for Sleep Smarter specific actions:
  - Calculator events (started, completed, results viewed)
  - Content engagement events (article read, video watched)
  - Product interest events (viewed, pricing viewed, FAQ viewed)
  - Email capture events
- Page-specific pixel implementations
- Custom audience definitions (12 audiences across 4 categories)
- Lookalike audience recommendations
- Retargeting ad creative recommendations for 4 funnel stages

## Implementation Priority

### Phase 1 (Week 1)
1. Implement GTM container and Meta Pixel base code
2. Set up Google Ads conversion tracking for `email_signup` and `tripwire_purchase`
3. Optimize `/sleep-reset` page for ad traffic
4. Launch High-Intent Products campaign (limited budget)

### Phase 2 (Week 2)
1. Implement remaining conversion events
2. Build Problem-Solution Squeeze Page
3. Launch Solution Seeking campaign
4. Set up Meta custom audiences

### Phase 3 (Week 3)
1. Build Product Comparison Landing Page
2. Launch remaining Google Ads campaigns
3. Implement Meta retargeting ads
4. Set up automated reporting

### Phase 4 (Week 4)
1. Build High-Ticket Program Landing Page
2. Optimize based on performance data
3. Scale successful campaigns
4. Implement advanced tracking (LTV, attribution)

## Key Performance Indicators

### Tracking Implementation
- [ ] GTM container installed and firing
- [ ] Meta Pixel events firing correctly
- [ ] Google Ads conversions tracking
- [ ] All 5 conversion events implemented
- [ ] Custom audiences building in Meta

### Campaign Performance
- **Target CPA:** < $15 for leads, < $50 for tripwire
- **Target ROAS:** 3:1 (after optimization)
- **Conversion Rate:** 3-5% for leads, 1-2% for sales
- **Remarketing ROAS:** 5:1 target

### Landing Page Performance
- **Page Load Time:** < 3 seconds
- **Bounce Rate:** < 40% for ad traffic
- **Conversion Rate:** Meet or exceed benchmarks
- **Mobile Performance:** Equal or better than desktop

## Integration Points

### Existing Systems
- **Analytics:** GA4 property `G-523117386` already implemented
- **Email Platform:** Kit (ConvertKit) integration for email signups
- **Payment Processors:** SamCart for purchases, Stripe for subscriptions
- **Website:** React-based app with existing tracking in `analytics.ts`

### Required Accounts
1. Google Tag Manager account
2. Meta Business Account with Events Manager access
3. Google Ads account with conversion tracking permissions
4. (Optional) Hotjar for heatmaps and session recordings

## Technical Requirements

### Development
- Access to `app/index.html` for GTM container code
- Access to `app/src/lib/analytics.ts` for event tracking updates
- Ability to create new landing pages in React
- DNS access for potential subdomains (optional)

### Testing Tools
- Google Tag Assistant (Chrome extension)
- Meta Pixel Helper (Chrome extension)
- Google PageSpeed Insights
- Mobile device testing capabilities

## Next Steps

### Immediate Actions
1. Create Google Tag Manager account and container
2. Set up Meta Pixel in Events Manager
3. Configure conversion actions in Google Ads
4. Review and update `analytics.ts` with new event tracking

### First Week Testing
1. Test GTM implementation in preview mode
2. Verify all pixel events fire correctly
3. Test conversion tracking with real user actions
4. Launch first campaign with limited budget

### Ongoing Optimization
1. Daily monitoring of campaign performance
2. Weekly review of conversion data
3. Monthly optimization of landing pages
4. Quarterly audit of tracking implementation

## Support & Resources

### Documentation
- Google Tag Manager: https://support.google.com/tagmanager
- Meta Pixel: https://developers.facebook.com/docs/meta-pixel
- Google Ads: https://support.google.com/google-ads
- GA4: https://support.google.com/analytics

### Internal Resources
- Existing tracking implementation: `TRACKING-IMPLEMENTATION-LOG.md`
- Keyword research: `sleepsmarter-google-ads-keyword-plan.csv`
- Analytics utility: `app/src/lib/analytics.ts`

### Contact
- For technical implementation questions: Review `TRACKING-IMPLEMENTATION-LOG.md`
- For campaign strategy questions: Refer to campaign setup documents
- For ongoing optimization: Schedule weekly review meetings

## Success Metrics Timeline

### Week 1-2: Foundation
- All tracking implemented and verified
- First campaigns launched
- Initial conversion data collected

### Week 3-4: Optimization
- Conversion rates meeting targets
- ROAS improving toward 3:1
- Custom audiences building size

### Month 2: Scaling
- Successful campaigns scaled
- New landing pages tested
- Advanced tracking implemented

### Month 3: Maturity
- Full funnel tracking operational
- Automated reporting in place
- Continuous optimization process established