# Sleep Smarter Tracking Audit Report

**Date:** February 20, 2026  
**Site:** sleepsmarter.io  
**Google Ads Customer ID:** 736-981-9054  
**GA4 Measurement ID:** G-HMNWV4K76J  
**GTM Container ID:** GTM-5VH27DL3  

---

## Executive Summary

The Sleep Smarter tracking infrastructure is **partially ready** for Google Ads campaigns. The foundational analytics utility is well-built with comprehensive event tracking functions, and GTM is properly installed. However, several critical gaps exist between the documented strategy and actual implementation.

**Overall Readiness Score: 6/10**

---

## Current Implementation Status

### ✅ **WORKING** - Foundation Ready

#### 1. Google Tag Manager Installation
- **Status:** ✅ **Fully Working**
- **Details:** GTM container `GTM-5VH27DL3` properly installed in `index.html`
- **Evidence:** Both head script and noscript body tags present
- **Next Steps:** None required

#### 2. Google Analytics 4 (GA4)
- **Status:** ✅ **Fully Working** 
- **Details:** GA4 measurement ID `G-HMNWV4K76J` correctly configured
- **Evidence:** gtag script and config present in `index.html`
- **Next Steps:** None required

#### 3. Analytics Utility (`analytics.ts`)
- **Status:** ✅ **Fully Working**
- **Details:** Comprehensive tracking utility with all required functions
- **Functions Implemented:**
  - `trackEvent()` - Core event tracking
  - `trackEmailSignup()` - Email capture tracking
  - `trackSalesPageView()` - Sales page views
  - `trackCheckoutClick()` - Checkout button clicks
  - `trackCalculatorUsed()` - Calculator engagement
- **Next Steps:** Enhance with Meta Pixel integration

#### 4. Component Integration
- **Status:** ✅ **Working** (with gaps)
- **Files Using Tracking:**
  - `SleepCalculator.tsx` - ✅ Calculator usage events
  - `EmailCapture.tsx` - ✅ Email signup events  
  - `SleepReset.tsx` - ✅ Sales page views + checkout clicks
  - `PremiumSales.tsx` - ✅ Sales page views + checkout clicks
  - `MasterclassSales.tsx` - ✅ Sales page views + checkout clicks
  - `OTO*.tsx` pages - ✅ Sales page views + checkout clicks
  - `InsiderSales.tsx` - ✅ Sales page views + checkout clicks

### ⚠️ **PARTIAL** - Gaps Identified

#### 5. Conversion Event Implementation  
- **Status:** ⚠️ **Partially Working**
- **Gap Analysis:**
  - Email signups: ✅ Working (trackEmailSignup called in EmailCapture.tsx)
  - Sales page views: ✅ Working (trackSalesPageView in useEffect)
  - Checkout clicks: ✅ Working (trackCheckoutClick on button handlers)
  - **Purchase completion tracking: ❌ MISSING** (no webhook/thank you page tracking)
  - **Conversion value mapping: ❌ MISSING** (not sending specific product values)

#### 6. Meta Pixel Integration
- **Status:** ❌ **Missing Completely**
- **Gap:** No Meta Pixel implementation in analytics.ts or GTM
- **Impact:** Facebook/Instagram ads will have no conversion tracking
- **Priority:** HIGH - Required for paid social campaigns

### ❌ **MISSING** - Critical Gaps

#### 7. Google Ads Conversion Actions
- **Status:** ❌ **Not Created**  
- **Required Actions:** Need to create 5 conversion actions in Google Ads UI:
  1. `email_signup` ($0.50)
  2. `tripwire_purchase` ($17.00) 
  3. `masterclass_purchase` ($67.00)
  4. `premium_purchase` ($197.00)
  5. `insider_signup` ($19.00)
- **Blocker:** Cannot proceed with conversion tracking without these

#### 8. GTM Conversion Tags
- **Status:** ❌ **Not Configured**
- **Gap:** No GTM tags configured for Google Ads conversion tracking
- **Dependency:** Requires Conversion IDs/Labels from Google Ads first
- **Impact:** No conversion data will flow to Google Ads

#### 9. Purchase Completion Tracking
- **Status:** ❌ **Missing Critical Component**
- **Gap:** No tracking on SamCart thank-you pages or webhooks
- **Current State:** Only tracking checkout *clicks*, not actual *purchases*
- **Impact:** Will show clicks but no completed conversions
- **Priority:** CRITICAL - This is the most important missing piece

---

## What Jason Needs to Do in Google Ads UI

### Phase 1: Create Conversion Actions (Priority: CRITICAL)
1. Go to Google Ads → Tools & Settings → Conversions
2. Click "+ New conversion action" → Website
3. Create these 5 conversion actions:

| Conversion Name | Value | Count | Attribution | Window |
|----------------|-------|-------|-------------|---------|
| email_signup | $0.50 | Every | Data-driven | 30 days |
| tripwire_purchase | $17.00 | Every | Data-driven | 30 days |
| masterclass_purchase | $67.00 | Every | Data-driven | 30 days |
| premium_purchase | $197.00 | Every | Data-driven | 30 days |
| insider_signup | $19.00 | Every | Data-driven | 30 days |

4. For each conversion:
   - Select "Use different code" → "Google Tag Manager"
   - Copy the **Conversion ID** and **Conversion Label**
   - Share these with KITT for GTM configuration

### Phase 2: Set Up Remarketing Audiences  
1. Go to Tools & Settings → Audience Manager
2. Create these audiences:
   - All Website Visitors (30 days)
   - Calculator Users (30 days) 
   - Email Subscribers (90 days)
   - Checkout Abandoners (7 days)
   - Recent Purchasers (180 days)

---

## What Needs to Happen in CODE

### Phase 1: Purchase Completion Tracking (CRITICAL)
**File:** `src/lib/analytics.ts`
**Add:** Purchase completion functions

```typescript
// Add to analytics.ts
export const trackPurchaseComplete = (
  productType: 'tripwire' | 'masterclass' | 'premium' | 'insider',
  transactionId: string,
  value: number,
  buttonLocation?: string
) => {
  const eventName = `${productType}_purchase`;
  const params = {
    value,
    currency: 'USD',
    transaction_id: transactionId,
    product_type: productType,
    button_location: buttonLocation
  };
  
  // GA4
  trackEvent(eventName, params);
  
  // Meta Pixel (when implemented)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value,
      currency: 'USD',
      content_name: getProductName(productType),
      content_ids: [getContentId(productType)],
      content_type: 'product'
    });
  }
  
  // GTM dataLayer
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...params
    });
  }
};
```

### Phase 2: Meta Pixel Integration
**File:** `src/lib/analytics.ts` 
**Update:** Enhance all tracking functions with Meta Pixel calls

```typescript
// Add Meta Pixel wrapper function
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
};

// Update trackEmailSignup to include Meta
export const trackEmailSignup = (
  email?: string,
  source?: string, 
  additionalParams?: EventParams
) => {
  // ... existing GA4 code ...
  
  // Add Meta Pixel tracking
  trackMetaEvent('Lead', {
    value: 0.50,
    currency: 'USD',
    content_name: 'Sleep Calculator',
    content_category: 'Sleep Tools'
  });
};
```

### Phase 3: SamCart Integration  
**Location:** SamCart checkout pages
**Need:** Add tracking pixels to thank-you pages

```html
<!-- Add to SamCart thank-you pages -->
<script>
  // Get transaction details from SamCart
  const transactionData = {
    id: '{{transaction_id}}',
    value: {{transaction_total}},
    product: '{{product_type}}'
  };
  
  // Call our tracking function
  if (window.trackPurchaseComplete) {
    window.trackPurchaseComplete(
      transactionData.product,
      transactionData.id,
      transactionData.value
    );
  }
</script>
```

### Phase 4: Enhanced Event Parameters
**Files:** All sales page components
**Update:** Include more detailed conversion context

```typescript
// Enhanced checkout tracking
const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
  trackCheckoutClick(buttonText, buttonLocation, {
    page_path: window.location.pathname,
    referrer: document.referrer,
    session_timestamp: Date.now(),
    user_agent: navigator.userAgent.substring(0, 100) // Truncated
  });
};
```

---

## What Needs to Happen in GTM

### Phase 1: Create Conversion Tags (Requires Google Ads setup first)
For each conversion action created in Google Ads:

1. **Create Tag:** Google Ads Conversion Tracking
2. **Configuration:**
   - Conversion ID: [from Google Ads]
   - Conversion Label: [from Google Ads]  
   - Conversion Value: Use Data Layer Variable or static value
3. **Trigger:** Custom Event matching event name
4. **Variables:** Create Data Layer Variables for dynamic values

### Phase 2: Add Meta Pixel Tags
1. **Base Code Tag:** Custom HTML with Meta Pixel base code
   - Trigger: All Pages
   - Pixel ID: [from Meta Business Manager]

2. **Conversion Event Tags:** 
   - Lead event for email signups
   - Purchase events for sales
   - Subscribe event for memberships
   - Trigger: Custom Events from dataLayer

### Phase 3: Enhanced Remarketing Tags
1. **Google Ads Remarketing:** Standard remarketing tag
2. **Custom Parameters:** Add for audience segmentation
3. **Meta Custom Audiences:** Pixel events for lookalike creation

---

## Priority Implementation Order

### **Week 1 - Foundation (CRITICAL)**
1. **Jason:** Create Google Ads conversion actions → Get Conversion IDs/Labels
2. **Code:** Implement `trackPurchaseComplete()` function
3. **GTM:** Configure Google Ads conversion tags  
4. **SamCart:** Add thank-you page tracking pixels
5. **Test:** Verify conversion flow end-to-end

### **Week 2 - Meta Integration (HIGH)**  
1. **Jason:** Set up Meta Business Manager + Pixel
2. **Code:** Add Meta Pixel integration to analytics.ts
3. **GTM:** Configure Meta Pixel base code and event tags
4. **Test:** Verify Meta events firing correctly

### **Week 3 - Enhancement (MEDIUM)**
1. **Code:** Enhanced event parameters for better targeting
2. **GTM:** Custom audiences and remarketing optimization
3. **Google Ads:** Create remarketing audiences
4. **Test:** Full funnel tracking validation

### **Week 4 - Optimization (LOW)**
1. **Analysis:** Review initial conversion data
2. **Optimization:** Adjust conversion values based on performance  
3. **Automation:** Set up automated reports
4. **Scale:** Prepare for campaign launch

---

## Specific Code Changes Required

### File: `src/lib/analytics.ts`
**Add:** 
- `trackPurchaseComplete()` function (see Phase 1 above)
- `trackMetaEvent()` wrapper function  
- Meta Pixel integration in existing functions
- Enhanced parameter collection

### File: Each sales page component
**Update:**
- Add more detailed context to `trackCheckoutClick()` calls
- Include referrer, timestamp, user agent data
- Add page-specific parameters

### File: `index.html` 
**Add:** 
- Meta Pixel base code (after getting Pixel ID)
- Noscript fallback for Meta Pixel

### SamCart Configuration
**Add:**
- Thank-you page tracking scripts
- Transaction parameter passing
- Success event firing

---

## Testing & Validation Plan

### Phase 1: Basic Functionality
- [ ] GTM Preview Mode shows all tags firing
- [ ] GA4 DebugView shows events in real-time  
- [ ] Google Ads shows conversion data (after 24-48h)
- [ ] All checkout buttons trigger tracking events

### Phase 2: Conversion Flow
- [ ] Email signup → `email_signup` event fires
- [ ] Checkout click → `checkout_click` event fires  
- [ ] Purchase complete → `[product]_purchase` event fires
- [ ] Transaction IDs are unique and captured
- [ ] Conversion values match actual prices

### Phase 3: Meta Integration  
- [ ] Meta Pixel Helper shows Pixel firing
- [ ] Meta Events Manager shows event data
- [ ] Purchase events include correct values
- [ ] Lead events fire on email signups

### Phase 4: End-to-End Validation
- [ ] Complete customer journey from ad → purchase
- [ ] All touchpoints tracked correctly
- [ ] Attribution data flows to ad platforms
- [ ] Remarketing audiences populate correctly

---

## Risks & Mitigation

### **HIGH RISK: Purchase Completion Gaps**
- **Risk:** Tracking checkout clicks but not actual purchases
- **Impact:** Massive data gaps, inability to optimize for real conversions
- **Mitigation:** Implement SamCart webhook/thank-you page tracking immediately

### **MEDIUM RISK: Meta Pixel Missing** 
- **Risk:** No Facebook/Instagram conversion tracking
- **Impact:** Can't run paid social campaigns effectively
- **Mitigation:** Add Meta Pixel integration in Week 2

### **LOW RISK: Complex GTM Setup**
- **Risk:** Misconfigured tags causing data loss
- **Impact:** Partial tracking, attribution errors
- **Mitigation:** Use GTM Preview Mode extensively, test each tag individually

---

## Success Metrics (30 Days Post-Implementation)

1. **Conversion Tracking:** >95% of actual purchases tracked
2. **Event Volume:** >100 email signups/day tracked
3. **Attribution:** Google Ads showing conversion data
4. **Remarketing:** Audiences with >1,000 users each
5. **Meta Integration:** Purchase events matching GA4 data within 5%

---

## Conclusion

Sleep Smarter has a solid foundation for tracking but critical gaps in purchase completion tracking. The analytics utility is well-architected and the documentation is comprehensive, indicating good planning. 

**Next Steps:**
1. Jason creates Google Ads conversion actions (30 min)
2. Implement purchase completion tracking (2 hours coding)  
3. Configure GTM conversion tags (1 hour)
4. Test complete funnel (30 min)

With these changes, Sleep Smarter will have industry-standard conversion tracking ready for Google Ads campaigns.

**Recommendation:** Prioritize purchase completion tracking above all else — this is the most critical missing piece that will impact campaign optimization and ROI measurement.