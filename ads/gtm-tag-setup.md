# GTM Tag Configuration Guide - Sleep Smarter

**Date:** 2026-02-14  
**Purpose:** Step-by-step guide to implement Meta Pixel, Google Ads conversion tracking, and Google Ads remarketing via Google Tag Manager

## Prerequisites

1. **Google Tag Manager Account** - Create at [tagmanager.google.com](https://tagmanager.google.com)
2. **Meta Business Account** - With access to Meta Events Manager
3. **Google Ads Account** - With conversion tracking setup permissions
4. **Website Access** - Ability to add GTM container code to sleepsmarter.io

## Step 1: GTM Container Setup

### 1.1 Create GTM Container
1. Go to [tagmanager.google.com](https://tagmanager.google.com)
2. Click "Create Account" → "Sleep Smarter" (Account Name)
3. Container Name: `sleepsmarter.io`
4. Target Platform: **Web**
5. Click "Create"

### 1.2 Install GTM Container Code
1. Copy the GTM container code (looks like `GTM-XXXXXXX`)
2. Update `app/index.html` with your actual GTM ID:
```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

3. Also add the noscript version after the opening `<body>` tag:
```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

## Step 2: Meta (Facebook) Pixel Setup

### 2.1 Create Meta Pixel
1. Go to Meta Events Manager → Connect Data Sources → Web → Meta Pixel
2. Click "Connect" → Name: "Sleep Smarter Pixel"
3. Click "Create Pixel" → Copy Pixel ID (looks like `123456789012345`)

### 2.2 Add Meta Pixel Base Code via GTM
1. In GTM, go to **Tags** → **New**
2. Tag Configuration: **Custom HTML**
3. Name: `Meta Pixel - Base Code`
4. HTML Content (replace `YOUR_PIXEL_ID`):
```html
<!-- Meta Pixel Code -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
<noscript><img height="1" width="1" style="display:none"
src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
/></noscript>
<!-- End Meta Pixel Code -->
```

5. Triggering: **All Pages**
6. Click "Save"

### 2.3 Test Meta Pixel
1. Use Facebook Pixel Helper Chrome extension
2. Visit sleepsmarter.io
3. Verify Pixel fires on page load

## Step 3: Google Ads Conversion Tracking

### 3.1 Create Conversion Actions in Google Ads
1. Go to Google Ads → Tools & Settings → Conversions
2. Click "+ New conversion action" → Website
3. Create these conversion actions:

| Conversion Name | Value | Count | Attribution |
|----------------|-------|-------|-------------|
| email_signup | $0.50 | Every | Data-driven |
| tripwire_purchase | $17.00 | Every | Data-driven |
| masterclass_purchase | $67.00 | Every | Data-driven |
| premium_purchase | $197.00 | Every | Data-driven |
| insider_signup | $19.00 | Every | Data-driven |

4. For each conversion, select "Use different code" → "Google Tag Manager"
5. Copy the **Conversion ID** and **Conversion Label** for each

### 3.2 Add Google Ads Conversion Tags in GTM

#### Tag 1: email_signup Conversion
1. New Tag → Tag Configuration: **Google Ads Conversion Tracking**
2. Name: `Google Ads - email_signup`
3. Conversion ID: [from Google Ads]
4. Conversion Label: [from Google Ads]
5. Conversion Value: `{{DLV - email_value}}` (default 0.50)
6. Trigger: **Custom Event** → Event name: `email_signup`

#### Tag 2: tripwire_purchase Conversion
1. New Tag → Tag Configuration: **Google Ads Conversion Tracking**
2. Name: `Google Ads - tripwire_purchase`
3. Conversion ID: [from Google Ads]
4. Conversion Label: [from Google Ads]
5. Conversion Value: `17.00`
6. Trigger: **Custom Event** → Event name: `tripwire_purchase`

#### Tag 3: masterclass_purchase Conversion
1. New Tag → Tag Configuration: **Google Ads Conversion Tracking**
2. Name: `Google Ads - masterclass_purchase`
3. Conversion ID: [from Google Ads]
4. Conversion Label: [from Google Ads]
5. Conversion Value: `67.00`
6. Trigger: **Custom Event** → Event name: `masterclass_purchase`

#### Tag 4: premium_purchase Conversion
1. New Tag → Tag Configuration: **Google Ads Conversion Tracking**
2. Name: `Google Ads - premium_purchase`
3. Conversion ID: [from Google Ads]
4. Conversion Label: [from Google Ads]
5. Conversion Value: `197.00`
6. Trigger: **Custom Event** → Event name: `premium_purchase`

#### Tag 5: insider_signup Conversion
1. New Tag → Tag Configuration: **Google Ads Conversion Tracking**
2. Name: `Google Ads - insider_signup`
3. Conversion ID: [from Google Ads]
4. Conversion Label: [from Google Ads]
5. Conversion Value: `19.00`
6. Trigger: **Custom Event** → Event name: `insider_signup`

### 3.3 Create Data Layer Variables
For dynamic conversion values, create these Data Layer Variables in GTM:

1. Go to **Variables** → **User-Defined Variables** → **New**
2. Variable Configuration: **Data Layer Variable**
3. Name: `DLV - email_value`
4. Data Layer Variable Name: `conversionValue`
5. Default Value: `0.50`

## Step 4: Google Ads Remarketing Tag

### 4.1 Create Remarketing Audience in Google Ads
1. Go to Google Ads → Tools & Settings → Audience Manager
2. Click "+ New audience" → Website visitors
3. Name: `Sleep Smarter - All Visitors`
4. Membership duration: 30 days
5. Click "Create and continue"

### 4.2 Add Google Ads Remarketing Tag in GTM
1. New Tag → Tag Configuration: **Google Ads Remarketing**
2. Name: `Google Ads - Remarketing`
3. Conversion ID: [Your Google Ads Conversion ID]
4. Trigger: **All Pages**

### 4.3 Create Custom Remarketing Audiences
Add these additional audiences in Google Ads Audience Manager:

1. **Blog Visitors** (7 days):
   - Page path contains `/blog/` or `/articles/`

2. **Calculator Users** (30 days):
   - Custom combination: Visited `/calculator` AND triggered `calculator_used` event

3. **Email Subscribers** (90 days):
   - Custom combination: Triggered `email_signup` event

4. **Product Page Visitors** (30 days):
   - Page path contains `/products/`

5. **Checkout Abandoners** (7 days):
   - Custom combination: Visited `/sleep-reset` AND NOT triggered purchase event

## Step 5: Event Tracking Implementation

### 5.1 Update Analytics Utility
Update `app/src/lib/analytics.ts` to include Meta Pixel and Google Ads events:

```typescript
// Add to existing analytics.ts
export const trackMetaEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
};

export const trackGoogleAdsConversion = (conversionId: string, conversionLabel: string, value?: number) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      'send_to': `${conversionId}/${conversionLabel}`,
      'value': value,
      'currency': 'USD'
    });
  }
};

// Update existing trackEvent to also fire Meta and Google Ads events
export const trackEnhancedEvent = (eventName: string, category: string, parameters?: Record<string, any>) => {
  // Existing GA4 tracking
  trackEvent(eventName, category, parameters);
  
  // Meta Pixel tracking
  const metaEventMap: Record<string, string> = {
    'email_signup': 'Lead',
    'tripwire_purchase': 'Purchase',
    'masterclass_purchase': 'Purchase',
    'premium_purchase': 'Purchase',
    'insider_signup': 'Subscribe'
  };
  
  if (metaEventMap[eventName]) {
    trackMetaEvent(metaEventMap[eventName], {
      value: parameters?.value || 0,
      currency: 'USD',
      ...parameters
    });
  }
  
  // Push to dataLayer for GTM
  if (typeof window !== 'undefined' && (window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: eventName,
      ...parameters
    });
  }
};
```

### 5.2 Update Conversion Tracking Functions
Update specific tracking functions:

```typescript
// Email signup tracking
export const trackEmailSignup = (source: string, calculatorMode?: string, targetTime?: string, resultsCount?: number) => {
  const params = {
    source,
    calculator_mode: calculatorMode,
    target_time: targetTime,
    results_count: resultsCount,
    value: 0.50 // Default email lead value
  };
  
  trackEnhancedEvent('email_signup', 'conversion', params);
};

// Purchase tracking
export const trackPurchase = (productType: string, value: number, transactionId?: string) => {
  const eventMap: Record<string, string> = {
    'tripwire': 'tripwire_purchase',
    'masterclass': 'masterclass_purchase',
    'premium': 'premium_purchase',
    'insider': 'insider_signup'
  };
  
  const params = {
    value,
    currency: 'USD',
    transaction_id: transactionId,
    product_type: productType
  };
  
  if (eventMap[productType]) {
    trackEnhancedEvent(eventMap[productType], 'conversion', params);
  }
};
```

## Step 6: Testing & Validation

### 6.1 GTM Preview Mode
1. Click "Preview" in GTM top bar
2. Visit sleepsmarter.io
3. Verify all tags fire correctly:
   - Meta Pixel base code on page load
   - Google Ads remarketing on page load
   - Conversion tags on specific events

### 6.2 Test Conversion Events
Test each conversion path:

1. **Email Signup**: Submit email form → Check `email_signup` event fires
2. **Tripwire Purchase**: Click $17 checkout → Check `tripwire_purchase` event fires
3. **Masterclass Purchase**: Click $67 checkout → Check `masterclass_purchase` event fires
4. **Premium Purchase**: Click $197 checkout → Check `premium_purchase` event fires
5. **Insider Signup**: Click $19/month → Check `insider_signup` event fires

### 6.3 Verification Tools
- **Meta Pixel Helper**: Chrome extension to verify Pixel events
- **Google Tag Assistant**: Chrome extension for GTM/Google Ads tags
- **GA4 DebugView**: Real-time event verification
- **Google Ads Conversion Tracking**: Conversion status in Google Ads

## Step 7: Publishing & Monitoring

### 7.1 Publish GTM Container
1. In GTM, click "Submit"
2. Add version name: "Initial tracking setup"
3. Add description: "Meta Pixel, Google Ads conversion tracking, remarketing"
4. Click "Publish"

### 7.2 Monitor Performance
Check these reports daily for first week:

1. **GTM**: Container versions, tag firing counts
2. **Meta Events Manager**: Pixel events, data quality
3. **Google Ads**: Conversions reported, remarketing audience sizes
4. **GA4**: Event counts, conversion paths

### 7.3 Troubleshooting Common Issues

| Issue | Solution |
|-------|----------|
| Pixel not firing | Check GTM container code installed correctly |
| Conversions not tracking | Verify event names match between code and GTM triggers |
| Wrong conversion values | Check Data Layer variables and default values |
| Duplicate events | Review trigger conditions and pageview events |

## Next Steps

1. **Week 1**: Monitor all tags firing correctly
2. **Week 2**: Optimize conversion values based on initial data
3. **Week 3**: Set up conversion value rules in Google Ads
4. **Week 4**: Create automated reports for tracking performance

## Support & Resources

- **GTM Documentation**: [support.google.com/tagmanager](https://support.google.com/tagmanager)
- **Meta Pixel Guide**: [developers.facebook.com/docs/meta-pixel](https://developers.facebook.com/docs/meta-pixel)
- **Google Ads Help**: [support.google.com/google-ads](https://support.google.com/google-ads)
- **Sleep Smarter Analytics**: `app/src/lib/analytics.ts`