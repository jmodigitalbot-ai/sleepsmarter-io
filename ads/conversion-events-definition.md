# Conversion Events Definition - Sleep Smarter

**Date:** 2026-02-14  
**Purpose:** Define all conversion events to track across Meta Pixel and Google Ads with exact parameters and values

## Overview

This document defines the 5 core conversion events for Sleep Smarter's paid advertising tracking. Each event must be tracked in both Google Ads (as conversions) and Meta Pixel (as standard events).

## Event 1: Email Signup (Lead Magnet)

### Basic Information
- **Event Name:** `email_signup`
- **Description:** User submits email for free sleep calculator or lead magnet
- **Conversion Value:** $0.50 (estimated lead value)
- **Count:** Every occurrence
- **Attribution:** Data-driven (Google Ads), 7-day click/1-day view (Meta)

### Tracking Implementation

#### Google Ads Conversion
- **Action:** Lead
- **Category:** Sign-up
- **Value:** $0.50 (dynamic based on source)
- **Conversion Window:** 30 days

#### Meta Pixel Event
- **Standard Event:** `Lead`
- **Parameters:**
  - `value`: 0.50
  - `currency`: USD
  - `content_name`: "Sleep Calculator" or "Lead Magnet"
  - `content_category`: "Sleep Tools"

#### Event Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `source` | string | Where signup occurred | `calculator`, `popup`, `footer` |
| `calculator_mode` | string | Calculator type used | `wakeup`, `bedtime` |
| `target_time` | string | Target sleep/wake time | `07:00`, `23:00` |
| `results_count` | number | Number of schedule results | `5` |
| `page_path` | string | URL path where signup occurred | `/calculator`, `/` |

#### Implementation Code
```typescript
// In analytics.ts
export const trackEmailSignup = (
  source: string, 
  calculatorMode?: string, 
  targetTime?: string, 
  resultsCount?: number
) => {
  const params = {
    source,
    calculator_mode: calculatorMode,
    target_time: targetTime,
    results_count: resultsCount,
    value: 0.50
  };
  
  // GA4
  trackEvent('email_signup', 'conversion', params);
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Lead', {
      value: 0.50,
      currency: 'USD',
      content_name: 'Sleep Calculator',
      content_category: 'Sleep Tools'
    });
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'email_signup',
      ...params
    });
  }
};
```

## Event 2: Tripwire Purchase ($17)

### Basic Information
- **Event Name:** `tripwire_purchase`
- **Description:** User purchases $17 "Sleep Reset in 7 Days" tripwire
- **Conversion Value:** $17.00
- **Count:** Every occurrence
- **Attribution:** Data-driven (Google Ads), 7-day click/1-day view (Meta)

### Tracking Implementation

#### Google Ads Conversion
- **Action:** Purchase
- **Category:** Sleep Reset Program
- **Value:** $17.00
- **Conversion Window:** 30 days

#### Meta Pixel Event
- **Standard Event:** `Purchase`
- **Parameters:**
  - `value`: 17.00
  - `currency`: USD
  - `content_name`: "Sleep Reset in 7 Days"
  - `content_category`: "Digital Product"
  - `content_ids`: ["tripwire_001"]
  - `content_type`: "product"

#### Event Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `value` | number | Purchase amount | `17.00` |
| `currency` | string | Currency code | `USD` |
| `transaction_id` | string | Unique transaction ID | `TRIP-2026-0142` |
| `product_type` | string | Product category | `tripwire` |
| `button_location` | string | Where button was clicked | `hero`, `value_stack`, `final_cta` |

#### Implementation Code
```typescript
export const trackTripwirePurchase = (
  transactionId: string, 
  buttonLocation?: string
) => {
  const params = {
    value: 17.00,
    currency: 'USD',
    transaction_id: transactionId,
    product_type: 'tripwire',
    button_location: buttonLocation
  };
  
  // GA4
  trackEvent('tripwire_purchase', 'conversion', params);
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: 17.00,
      currency: 'USD',
      content_name: 'Sleep Reset in 7 Days',
      content_ids: ['tripwire_001'],
      content_type: 'product',
      num_items: 1
    });
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'tripwire_purchase',
      ...params
    });
  }
};
```

## Event 3: Masterclass Purchase ($67)

### Basic Information
- **Event Name:** `masterclass_purchase`
- **Description:** User purchases $67 "Sleep Transformation Masterclass"
- **Conversion Value:** $67.00
- **Count:** Every occurrence
- **Attribution:** Data-driven (Google Ads), 7-day click/1-day view (Meta)

### Tracking Implementation

#### Google Ads Conversion
- **Action:** Purchase
- **Category:** Masterclass
- **Value:** $67.00
- **Conversion Window:** 30 days

#### Meta Pixel Event
- **Standard Event:** `Purchase`
- **Parameters:**
  - `value`: 67.00
  - `currency`: USD
  - `content_name`: "Sleep Transformation Masterclass"
  - `content_category`: "Online Course"
  - `content_ids`: ["masterclass_001"]
  - `content_type`: "product"

#### Event Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `value` | number | Purchase amount | `67.00` |
| `currency` | string | Currency code | `USD` |
| `transaction_id` | string | Unique transaction ID | `MC-2026-0287` |
| `product_type` | string | Product category | `masterclass` |
| `upsell_from` | string | If upgraded from tripwire | `tripwire`, `direct` |

#### Implementation Code
```typescript
export const trackMasterclassPurchase = (
  transactionId: string, 
  upsellFrom?: string
) => {
  const params = {
    value: 67.00,
    currency: 'USD',
    transaction_id: transactionId,
    product_type: 'masterclass',
    upsell_from: upsellFrom
  };
  
  // GA4
  trackEvent('masterclass_purchase', 'conversion', params);
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: 67.00,
      currency: 'USD',
      content_name: 'Sleep Transformation Masterclass',
      content_ids: ['masterclass_001'],
      content_type: 'product',
      num_items: 1
    });
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'masterclass_purchase',
      ...params
    });
  }
};
```

## Event 4: Premium Purchase ($197)

### Basic Information
- **Event Name:** `premium_purchase`
- **Description:** User purchases $197 "90-Day Sleep Transformation Premium Program"
- **Conversion Value:** $197.00
- **Count:** Every occurrence
- **Attribution:** Data-driven (Google Ads), 7-day click/1-day view (Meta)

### Tracking Implementation

#### Google Ads Conversion
- **Action:** Purchase
- **Category:** Premium Program
- **Value:** $197.00
- **Conversion Window:** 30 days

#### Meta Pixel Event
- **Standard Event:** `Purchase`
- **Parameters:**
  - `value`: 197.00
  - `currency`: USD
  - `content_name`: "90-Day Sleep Transformation Premium Program"
  - `content_category`: "Premium Course"
  - `content_ids`: ["premium_001"]
  - `content_type`: "product"

#### Event Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `value` | number | Purchase amount | `197.00` |
| `currency` | string | Currency code | `USD` |
| `transaction_id` | string | Unique transaction ID | `PREMIUM-2026-0156` |
| `product_type` | string | Product category | `premium` |
| `upsell_path` | string | Upgrade path | `tripwire→masterclass→premium`, `direct` |

#### Implementation Code
```typescript
export const trackPremiumPurchase = (
  transactionId: string, 
  upsellPath?: string
) => {
  const params = {
    value: 197.00,
    currency: 'USD',
    transaction_id: transactionId,
    product_type: 'premium',
    upsell_path: upsellPath
  };
  
  // GA4
  trackEvent('premium_purchase', 'conversion', params);
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value: 197.00,
      currency: 'USD',
      content_name: '90-Day Sleep Transformation Premium Program',
      content_ids: ['premium_001'],
      content_type: 'product',
      num_items: 1
    });
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'premium_purchase',
      ...params
    });
  }
};
```

## Event 5: Insider Signup ($19/month)

### Basic Information
- **Event Name:** `insider_signup`
- **Description:** User signs up for $19/month "Sleep Smarter Insider" membership
- **Conversion Value:** $19.00 (first month)
- **Count:** Every occurrence
- **Attribution:** Data-driven (Google Ads), 7-day click/1-day view (Meta)

### Tracking Implementation

#### Google Ads Conversion
- **Action:** Sign-up
- **Category:** Subscription
- **Value:** $19.00
- **Conversion Window:** 30 days

#### Meta Pixel Event
- **Standard Event:** `Subscribe`
- **Parameters:**
  - `value`: 19.00
  - `currency`: USD
  - `content_name`: "Sleep Smarter Insider Membership"
  - `content_category`: "Subscription"
  - `predicted_ltv`: 228.00 (estimated 12-month value)

#### Event Parameters
| Parameter | Type | Description | Example |
|-----------|------|-------------|---------|
| `value` | number | First month amount | `19.00` |
| `currency` | string | Currency code | `USD` |
| `subscription_id` | string | Unique subscription ID | `INSIDER-2026-0421` |
| `product_type` | string | Product category | `subscription` |
| `signup_source` | string | Where they signed up | `sales_page`, `upsell`, `organic` |

#### Implementation Code
```typescript
export const trackInsiderSignup = (
  subscriptionId: string, 
  signupSource?: string
) => {
  const params = {
    value: 19.00,
    currency: 'USD',
    subscription_id: subscriptionId,
    product_type: 'subscription',
    signup_source: signupSource,
    predicted_ltv: 228.00 // 12 months
  };
  
  // GA4
  trackEvent('insider_signup', 'conversion', params);
  
  // Meta Pixel
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Subscribe', {
      value: 19.00,
      currency: 'USD',
      content_name: 'Sleep Smarter Insider Membership',
      content_category: 'Subscription',
      predicted_ltv: 228.00
    });
  }
  
  // DataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: 'insider_signup',
      ...params
    });
  }
};
```

## Event Mapping Summary

| Event | Google Ads Action | Meta Pixel Event | Value | Parameters |
|-------|-------------------|------------------|-------|------------|
| email_signup | Lead | Lead | $0.50 | source, calculator_mode, target_time |
| tripwire_purchase | Purchase | Purchase | $17.00 | transaction_id, button_location |
| masterclass_purchase | Purchase | Purchase | $67.00 | transaction_id, upsell_from |
| premium_purchase | Purchase | Purchase | $197.00 | transaction_id, upsell_path |
| insider_signup | Sign-up | Subscribe | $19.00 | subscription_id, signup_source |

## Implementation Priority

### Phase 1 (Immediate)
1. `email_signup` - Already implemented in analytics.ts
2. `tripwire_purchase` - Update SleepReset.tsx checkout buttons

### Phase 2 (Week 1)
3. `masterclass_purchase` - Add to MasterclassSales.tsx
4. `premium_purchase` - Add to PremiumSales.tsx

### Phase 3 (Week 2)
5. `insider_signup` - Add to InsiderSales.tsx
6. Enhanced parameters for all events

## Testing Checklist

For each event, verify:
- [ ] GA4 event appears in DebugView
- [ ] Meta Pixel event appears in Events Manager
- [ ] Google Ads conversion is recorded
- [ ] GTM tag fires correctly
- [ ] All parameters are captured
- [ ] Conversion values are correct

## Value Optimization Notes

1. **Email Signup Value**: Start with $0.50, adjust based on conversion rate to tripwire
2. **Upsell Tracking**: Important for understanding customer journey
3. **LTV Considerations**: Insider signup has higher LTV than one-time purchases
4. **Seasonal Adjustments**: Consider higher values during holiday seasons

## Integration Points

### Payment Processors
- SamCart: Webhook integration for purchase events
- Stripe: Subscription tracking for insider signups
- PayPal: Purchase confirmation tracking

### Email Platform (Kit)
- Sync email signups to create customer segments
- Tag users based on conversion events
- Trigger automated follow-up sequences

### CRM Integration
- Create customer records with conversion history
- Score leads based on engagement and purchases
- Sync with retargeting audiences

## Maintenance & Updates

1. **Monthly Review**: Check conversion values against actual revenue
2. **Quarterly Audit**: Verify all events still firing correctly
3. **Seasonal Updates**: Adjust values for holiday periods
4. **New Product Launches**: Add new conversion events as needed