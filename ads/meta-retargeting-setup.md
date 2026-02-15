# Meta Retargeting Setup Guide - Sleep Smarter

**Date:** 2026-02-14  
**Purpose:** Complete Meta (Facebook/Instagram) retargeting setup including pixel events, custom audiences, and ad creative recommendations

## Meta Pixel Event Implementation

### Base Pixel Events (Already Implemented)

1. **PageView** - Fires on every page load
2. **ViewContent** - Fires on product/content pages
3. **Search** - Fires on search functionality (if applicable)
4. **AddToCart** - Fires when adding to cart (for e-commerce)
5. **InitiateCheckout** - Fires when checkout process begins
6. **Purchase** - Fires on successful purchase
7. **Lead** - Fires on form submissions
8. **CompleteRegistration** - Fires on account creation
9. **Subscribe** - Fires on subscription signup
10. **Custom Events** - For specific Sleep Smarter actions

### Sleep Smarter Custom Events

#### 1. Calculator Events
```javascript
// Calculator Started
fbq('trackCustom', 'CalculatorStarted', {
  calculator_mode: 'wakeup' | 'bedtime',
  source_page: window.location.pathname
});

// Calculator Completed
fbq('trackCustom', 'CalculatorCompleted', {
  calculator_mode: 'wakeup' | 'bedtime',
  target_time: '07:00',
  results_count: 5,
  time_spent_seconds: 45
});

// Calculator Results Viewed
fbq('trackCustom', 'CalculatorResultsViewed', {
  calculator_mode: 'wakeup' | 'bedtime',
  target_time: '07:00',
  results_shown: 5
});
```

#### 2. Content Engagement Events
```javascript
// Article Read (scroll depth > 75%)
fbq('trackCustom', 'ArticleRead', {
  article_title: 'How to Fall Asleep Faster',
  article_category: 'Sleep Tips',
  read_time_seconds: 180,
  scroll_depth_percent: 85
});

// Video Watched (> 50% completion)
fbq('trackCustom', 'VideoWatched', {
  video_title: 'Sleep Meditation Guide',
  video_duration_seconds: 300,
  watch_percent: 65
});

// Guide Downloaded
fbq('trackCustom', 'GuideDownloaded', {
  guide_name: '7-Day Sleep Fix Checklist',
  guide_type: 'checklist',
  source: 'blog_article' | 'popup' | 'email'
});
```

#### 3. Product Interest Events
```javascript
// Product Viewed
fbq('trackCustom', 'ProductViewed', {
  product_name: 'Sleep Reset in 7 Days',
  product_price: 17.00,
  product_category: 'digital_product',
  page_type: 'sales_page' | 'comparison' | 'review'
});

// Pricing Page Viewed
fbq('trackCustom', 'PricingViewed', {
  product_name: 'Sleep Transformation Masterclass',
  price_point: 67.00,
  time_on_page_seconds: 120
});

// FAQ Viewed (high intent signal)
fbq('trackCustom', 'FAQViewed', {
  product_name: '90-Day Premium Program',
  faq_section: 'refund_policy' | 'curriculum' | 'support'
});
```

#### 4. Email Capture Events
```javascript
// Email Popup Triggered
fbq('trackCustom', 'EmailPopupTriggered', {
  popup_type: 'exit_intent' | 'timed' | 'scroll',
  popup_offer: 'Free Sleep Guide',
  page_path: window.location.pathname
});

// Email Form Started
fbq('trackCustom', 'EmailFormStarted', {
  form_location: 'footer' | 'sidebar' | 'inline',
  form_offer: 'Weekly Sleep Tips'
});

// Email Submitted (already covered by Lead event)
fbq('trackCustom', 'EmailSubmitted', {
  source: 'calculator' | 'blog' | 'popup',
  lead_magnet: 'Sleep Calculator Results'
});
```

### Page-Specific Pixel Events

#### Homepage (`/`)
```javascript
// Fire on homepage load
fbq('track', 'ViewContent', {
  content_name: 'Sleep Smarter Homepage',
  content_category: 'Home',
  content_ids: ['homepage_001']
});

// Track hero section engagement
setTimeout(() => {
  if (document.querySelector('.hero-cta')) {
    fbq('trackCustom', 'HeroSectionEngaged', {
      engagement_type: 'scroll' | 'click',
      time_on_page_seconds: 10
    });
  }
}, 10000);
```

#### Calculator Page (`/calculator`)
```javascript
// Track calculator usage funnel
const calculatorEvents = {
  'mode_selected': false,
  'time_selected': false,
  'results_generated': false
};

// When user selects mode
document.querySelectorAll('.mode-button').forEach(button => {
  button.addEventListener('click', () => {
    fbq('trackCustom', 'CalculatorModeSelected', {
      mode: button.dataset.mode
    });
    calculatorEvents.mode_selected = true;
  });
});

// When user selects time
document.querySelector('.time-selector').addEventListener('change', (e) => {
  if (calculatorEvents.mode_selected && !calculatorEvents.time_selected) {
    fbq('trackCustom', 'CalculatorTimeSelected', {
      target_time: e.target.value
    });
    calculatorEvents.time_selected = true;
  }
});

// When results are generated
if (window.calculatorResults) {
  fbq('trackCustom', 'CalculatorCompleted', {
    results_count: window.calculatorResults.length,
    target_time: window.selectedTime
  });
  calculatorEvents.results_generated = true;
}
```

#### Sleep Reset Page (`/sleep-reset`)
```javascript
// Track scroll depth for sales page
let maxScrollDepth = 0;
window.addEventListener('scroll', () => {
  const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  
  // Track 25%, 50%, 75%, 100% scroll milestones
  const milestones = [25, 50, 75, 100];
  milestones.forEach(milestone => {
    if (scrollPercent >= milestone && maxScrollDepth < milestone) {
      fbq('trackCustom', 'SalesPageScroll', {
        scroll_depth_percent: milestone,
        page_name: 'Sleep Reset Sales Page',
        time_on_page_seconds: Math.floor(performance.now() / 1000)
      });
      maxScrollDepth = milestone;
    }
  });
});

// Track all CTA button clicks
document.querySelectorAll('.checkout-button, .cta-button').forEach(button => {
  button.addEventListener('click', () => {
    fbq('trackCustom', 'SalesPageCTAClick', {
      button_text: button.textContent.trim(),
      button_location: button.closest('section')?.id || 'unknown',
      page_section: button.closest('.section-class')?.className || 'unknown'
    });
  });
});

// Track pricing section view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fbq('trackCustom', 'PricingSectionViewed', {
        product_name: 'Sleep Reset in 7 Days',
        price: 17.00
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

observer.observe(document.querySelector('.pricing-section'));
```

#### Thank You Page (`/thank-you`)
```javascript
// Determine which product was purchased
const urlParams = new URLSearchParams(window.location.search);
const productType = urlParams.get('product') || 'unknown';

const productMap = {
  'tripwire': { name: 'Sleep Reset in 7 Days', price: 17.00 },
  'masterclass': { name: 'Sleep Transformation Masterclass', price: 67.00 },
  'premium': { name: '90-Day Premium Program', price: 197.00 },
  'insider': { name: 'Sleep Smarter Insider', price: 19.00 }
};

const product = productMap[productType];

if (product) {
  // Standard Purchase event
  fbq('track', 'Purchase', {
    value: product.price,
    currency: 'USD',
    content_name: product.name,
    content_ids: [`${productType}_001`],
    content_type: 'product'
  });
  
  // Custom event for upsell tracking
  const previousPurchase = localStorage.getItem('previous_purchase');
  if (previousPurchase) {
    fbq('trackCustom', 'UpsellPurchase', {
      previous_product: previousPurchase,
      current_product: productType,
      upgrade_value: product.price - productMap[previousPurchase]?.price || 0
    });
  }
  
  // Store for next purchase
  localStorage.setItem('previous_purchase', productType);
}

// Track next step engagement
document.querySelectorAll('.next-step-button').forEach(button => {
  button.addEventListener('click', () => {
    fbq('trackCustom', 'ThankYouPageAction', {
      action_type: button.dataset.action,
      product_type: productType
    });
  });
});
```

## Custom Audience Definitions

### 1. Website Visitors Audiences

#### All Website Visitors (30 days)
- **Description:** Anyone who visited sleepsmarter.io
- **Source:** Meta Pixel - All website visitors
- **Retention:** 30 days
- **Size Estimate:** 5,000-10,000 monthly
- **Use Case:** Broad retargeting, brand awareness

#### Blog Readers (30 days)
- **Description:** Visitors who read blog articles
- **Rules:** 
  - URL contains `/blog/` OR `/articles/`
  - AND spent > 60 seconds on page
  - OR scrolled > 50% of page
- **Retention:** 30 days
- **Use Case:** Content upgrades, newsletter signups

#### Calculator Users (30 days)
- **Description:** Used the sleep calculator
- **Rules:**
  - Fired `CalculatorCompleted` custom event
  - OR visited `/calculator` AND spent > 30 seconds
- **Retention:** 30 days
- **Use Case:** Tripwire offers, personalized recommendations

#### Product Page Visitors (14 days)
- **Description:** Viewed product sales pages
- **Rules:**
  - URL contains `/sleep-reset` OR `/masterclass` OR `/premium`
  - AND spent > 45 seconds on page
- **Retention:** 14 days (shorter for high intent)
- **Use Case:** Abandoned cart, special offers

#### High-Intent Visitors (7 days)
- **Description:** Showed strong purchase intent
- **Rules:**
  - Viewed pricing section (fired `PricingSectionViewed`)
  - OR clicked CTA button (fired `SalesPageCTAClick`)
  - OR viewed FAQ section (fired `FAQViewed`)
- **Retention:** 7 days
- **Use Case:** Urgent offers, limited-time discounts

### 2. Engagement-Based Audiences

#### Email Subscribers (90 days)
- **Description:** Submitted email for lead magnet
- **Rules:** Fired `Lead` event with email submission
- **Retention:** 90 days
- **Use Case:** Newsletter promotions, insider program

#### Content Engagers (30 days)
- **Description:** Deeply engaged with content
- **Rules:**
  - Fired `ArticleRead` (scroll > 75%)
  - OR fired `VideoWatched` (> 50% completion)
  - OR downloaded guide (`GuideDownloaded`)
- **Retention:** 30 days
- **Use Case:** Related content, product recommendations

#### Returning Visitors (60 days)
- **Description:** Visited site multiple times
- **Rules:** Visited site ≥ 3 times in 60 days
- **Retention:** 60 days
- **Use Case:** Loyalty offers, referral program

### 3. Customer Audiences

#### Tripwire Customers (180 days)
- **Description:** Purchased $17 tripwire product
- **Rules:** Fired `Purchase` event with value = 17.00
- **Retention:** 180 days
- **Use Case:** Masterclass upsell, premium upgrade

#### Masterclass Customers (180 days)
- **Description:** Purchased $67 masterclass
- **Rules:** Fired `Purchase` event with value = 67.00
- **Retention:** 180 days
- **Use Case:** Premium program upsell, coaching add-ons

#### Premium Customers (365 days)
- **Description:** Purchased $197 premium program
- **Rules:** Fired `Purchase` event with value = 197.00
- **Retention:** 365 days
- **Use Case:** Insider membership, advanced coaching

#### Insider Members (Ongoing)
- **Description:** Active $19/month subscribers
- **Rules:** Fired `Subscribe` event
- **Retention:** Ongoing (refresh monthly)
- **Use Case:** Retention offers, bonus content

### 4. Lookalike Audiences

#### Top 1% Lookalike (Email Subscribers)
- **Source:** Email Subscribers audience
- **Country:** United States
- **Size:** 1% of population (~2.1M people)
- **Use Case:** Prospecting, cold traffic

#### Top 5% Lookalike (Tripwire Customers)
- **Source:** Tripwire Customers audience
- **Country:** United States
- **Size:** 5% of population (~10.5M people)
- **Use Case:** Scaling successful campaigns

#### Top 10% Lookalike (All Website Visitors)
- **Source:** All Website Visitors audience
- **Country:** United States
- **Size:** 10% of population (~21M people)
- **Use Case:** Broad prospecting, brand awareness

## Retargeting Ad Creative Recommendations

### 1. Awareness Stage (Top of Funnel)

#### Ad Type: Carousel Ads
**Audience:** All Website Visitors, Blog Readers
**Goal:** Education, brand awareness
**Creative Elements:**
- **Card 1:** Problem identification ("Tired of waking up tired?")
- **Card 2:** Solution preview ("Our method helps you sleep better")
- **Card 3:** Social proof ("12,000+ success stories")
- **Card 4:** Call to action ("Take our free sleep assessment")
**Copy:** "Struggling with sleep? Discover the 3 most common mistakes keeping you awake + how to fix them."
**CTA:** Learn More, Get Started

#### Ad Type: Video Ads (30-60 seconds)
**Audience:** Content Engagers, Returning Visitors
**Goal:** Engagement, trust building
**Video Content:**
- **0-15s:** Hook with relatable sleep problem
- **15-45s:** Quick tip or insight (value delivery)
- **45-60s:** Call to action with benefit
**Thumbnail:** Person looking rested vs. tired (split screen)
**Copy:** "This 1-minute sleep tip changed everything for Sarah. Watch to learn her secret."
**CTA:** Watch Video, Learn More

### 2. Consideration Stage (Middle of Funnel)

#### Ad Type: Collection Ads
**Audience:** Calculator Users, Product Page Visitors
**Goal:** Show product benefits, overcome objections
**Collection Structure:**
- **Cover Image/Video:** Person sleeping peacefully
- **Item 1:** Product benefits (bullet points)
- **Item 2:** Customer testimonials (video/text)
- **Item 3:** How it works (simple steps)
- **Item 4:** Pricing & guarantee
**Copy:** "Ready to transform your sleep? See how our 7-day program works, hear from customers, and get started risk-free."
**CTA:** Shop Now, View Products

#### Ad Type: Instant Experience Ads
**Audience:** High-Intent Visitors, Email Subscribers
**Goal:** Immersive product experience
**Experience Flow:**
1. **Landing Screen:** Benefit-focused headline
2. **Video Section:** 30-second product overview
3. **Testimonial Carousel:** 3-5 customer stories
4. **FAQ Section:** Address common concerns
5. **CTA Screen:** Clear next step
**Copy:** "Experience better sleep in 7 days. Tap to see how our program works and read real success stories."
**CTA:** Get Started, Learn More

### 3. Conversion Stage (Bottom of Funnel)

#### Ad Type: Dynamic Product Ads
**Audience:** Tripwire Customers, Masterclass Customers
**Goal:** Upsell, cross-sell
**Product Sets:**
- **Set 1:** Tripwire → Masterclass upgrade
- **Set 2:** Masterclass → Premium upgrade
- **Set 3:** Any purchase → Insider membership
**Catalog:** Use product catalog with images, prices, descriptions
**Copy:** "Loved our Sleep Reset program? Take your transformation further with our advanced masterclass."
**CTA:** Shop Now, Upgrade Now

#### Ad Type: Offer Ads
**Audience:** Product Page Visitors (14-day window)
**Goal:** Convert abandoned interest
**Offer Details:**
- **Discount:** 20% off first purchase
- **Bonus:** Free sleep guide with purchase
- **Urgency:** Limited to 7 days
- **Terms:** New customers only
**Creative:** Bright, attention-grabbing with "OFFER" badge
**Copy:** "Special offer just for you! Get 20% off our Sleep Reset program + free bonus guide. Limited time only."
**CTA:** Get Offer, Claim Discount

### 4. Retention Stage (Existing Customers)

#### Ad Type: Messenger Ads
**Audience:** Premium Customers, Insider Members
**Goal:** Engagement, support, renewal
**Messenger Flow:**
1. **Welcome Message:** Personalized greeting
2. **Quick Replies:** "Need help?", "Want bonus content?", "Renew subscription?"
3. **Automated Responses:** Based on selection
4. **Human Handoff:** For complex issues
**Copy:** "Hi [Name]! How's your sleep journey going? Tap a button below for quick help or bonus content."
**CTA:** Send Message

#### Ad Type: Story Ads
**Audience:** All customer audiences
**Goal:** Brand connection, community building
**Story Content:**
- **Day 1:** Customer success story
- **Day 2:** Sleep tip of the day
- **Day 3:** Behind-the-scenes content
- **Day 4:** Community question/poll
- **Day 5:** Product feature highlight