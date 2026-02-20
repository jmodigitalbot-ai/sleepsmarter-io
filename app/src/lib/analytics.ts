/**
 * Analytics utility for Sleep Smarter tracking
 * 
 * This file provides helper functions for tracking events with Google Analytics 4 (GA4)
 * and Google Tag Manager (GTM).
 */

// GA4 Measurement ID from index.html
// const GA4_MEASUREMENT_ID = 'G-HMNWV4K76J' // Unused but kept for reference

// Google Ads Conversion ID and Labels
const GOOGLE_ADS_CONVERSION_ID = 'AW-17966119562'
export const CONVERSION_LABELS = {
  EMAIL_SIGNUP: 'UmVlCJXhnfwbEIr19PZC',
  TRIPWIRE_PURCHASE: 'JrHwCOntkvwbEIr19PZC',
  MASTERCLASS_PURCHASE: 'XwMeCOztkvwbEIr19PZC',
  PREMIUM_PURCHASE: 'KkfMCI3ukvwbEIr19PZC',
  INSIDER_SIGNUP: 'QLF5CJDukvwbEIr19PZC'
} as const

// Product type to conversion label mapping
export const PRODUCT_CONVERSION_MAP = {
  tripwire: { label: CONVERSION_LABELS.TRIPWIRE_PURCHASE, value: 17 },
  masterclass: { label: CONVERSION_LABELS.MASTERCLASS_PURCHASE, value: 67 },
  premium: { label: CONVERSION_LABELS.PREMIUM_PURCHASE, value: 197 },
  insider: { label: CONVERSION_LABELS.INSIDER_SIGNUP, value: 19 }
} as const

export type ProductType = keyof typeof PRODUCT_CONVERSION_MAP

// Event names for consistent tracking
export const TRACKING_EVENTS = {
  EMAIL_SIGNUP: 'email_signup',
  SALES_PAGE_VIEW: 'sales_page_view',
  CHECKOUT_CLICK: 'checkout_click',
  CALCULATOR_USED: 'calculator_used',
  PAGE_VIEW: 'page_view'
} as const

// Event parameters interface
export interface EventParams {
  [key: string]: string | number | boolean | null | undefined
}

/**
 * Initialize GA4 tracking if not already initialized
 * This should be called once when the app loads
 */
export const initGA4 = (): void => {
  if (typeof window === 'undefined') return
  
  // Check if gtag is already loaded
  if (!window.gtag) {
    console.warn('GA4 gtag not loaded. Make sure GTM is properly configured.')
    return
  }
  
  // GA4 is already configured in index.html
  console.log('GA4 tracking initialized')
}

/**
 * Track a custom event with GA4
 * @param eventName - Name of the event to track
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams?: EventParams): void => {
  if (typeof window === 'undefined') return
  
  // Use gtag if available (via GTM)
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
    console.log(`GA4 Event tracked: ${eventName}`, eventParams)
  } else {
    // Fallback to dataLayer for GTM
    if (window.dataLayer) {
      window.dataLayer.push({
        event: eventName,
        ...eventParams
      })
      console.log(`GTM Event tracked: ${eventName}`, eventParams)
    } else {
      console.warn('Analytics not available. GTM/GA4 not loaded.')
    }
  }
}

/**
 * Track Google Ads conversion event
 * @param conversionLabel - Google Ads conversion label
 * @param value - Conversion value (optional)
 * @param currency - Currency code (default: 'USD')
 * @param transactionId - Unique transaction ID (optional)
 */
export const trackGoogleAdsConversion = (
  conversionLabel: string,
  value?: number,
  currency: string = 'USD',
  transactionId?: string
): void => {
  if (typeof window === 'undefined') return
  
  const conversionParams: any = {
    send_to: `${GOOGLE_ADS_CONVERSION_ID}/${conversionLabel}`,
    currency: currency
  }
  
  if (value !== undefined) {
    conversionParams.value = value
  }
  
  if (transactionId) {
    conversionParams.transaction_id = transactionId
  }
  
  // Use gtag for Google Ads conversion tracking
  if (window.gtag) {
    window.gtag('event', 'conversion', conversionParams)
    console.log(`Google Ads Conversion tracked: ${conversionLabel}`, conversionParams)
  } else {
    // Fallback to dataLayer
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'gtag.conversion',
        google_ads_conversion_id: GOOGLE_ADS_CONVERSION_ID,
        google_ads_conversion_label: conversionLabel,
        google_ads_conversion_value: value,
        google_ads_conversion_currency: currency,
        transaction_id: transactionId
      })
      console.log(`Google Ads Conversion tracked via dataLayer: ${conversionLabel}`)
    } else {
      console.warn('Google Ads tracking not available. gtag not loaded.')
    }
  }
}

/**
 * Track email signup event
 * @param email - User's email address (hashed or anonymized in production)
 * @param source - Where the signup came from (e.g., 'calculator', 'footer')
 * @param additionalParams - Additional event parameters
 */
export const trackEmailSignup = (
  _email?: string, // Email parameter kept for API consistency but not sent to analytics for privacy
  source?: string,
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    ...additionalParams,
    event_category: 'conversion',
    event_label: 'email_signup',
    source: source || 'unknown',
    // Note: Email is intentionally not included in analytics events for privacy
    // In production with proper consent, you might hash it or use a different identifier
  }
  
  // Track GA4 event
  trackEvent(TRACKING_EVENTS.EMAIL_SIGNUP, params)
  
  // Track Google Ads conversion
  trackGoogleAdsConversion(CONVERSION_LABELS.EMAIL_SIGNUP, 0.50)
}

/**
 * Track sales page view
 * @param pagePath - The path of the sales page (e.g., '/sleep-reset')
 * @param additionalParams - Additional event parameters
 */
export const trackSalesPageView = (
  pagePath: string,
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    ...additionalParams,
    event_category: 'engagement',
    event_label: 'sales_page_view',
    page_path: pagePath,
    page_title: document.title || 'Sleep Reset'
  }
  
  trackEvent(TRACKING_EVENTS.SALES_PAGE_VIEW, params)
}

/**
 * Track checkout button click
 * @param buttonText - Text on the button that was clicked
 * @param buttonLocation - Where the button is located on the page
 * @param productType - Type of product being purchased (optional, for Google Ads conversion)
 * @param additionalParams - Additional event parameters
 */
export const trackCheckoutClick = (
  buttonText?: string,
  buttonLocation?: string,
  productType?: ProductType,
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    ...additionalParams,
    event_category: 'conversion',
    event_label: 'checkout_click',
    button_text: buttonText || 'unknown',
    button_location: buttonLocation || 'unknown',
    product_type: productType,
    outbound_link: 'https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week'
  }
  
  // Track GA4 event
  trackEvent(TRACKING_EVENTS.CHECKOUT_CLICK, params)
  
  // Track Google Ads conversion if product type is provided
  if (productType && PRODUCT_CONVERSION_MAP[productType]) {
    const { label, value } = PRODUCT_CONVERSION_MAP[productType]
    trackGoogleAdsConversion(label, value)
  }
}

/**
 * Track purchase completion event
 * @param productType - Type of product purchased
 * @param value - Purchase value (optional, will use default from PRODUCT_CONVERSION_MAP)
 * @param transactionId - Unique transaction ID
 * @param additionalParams - Additional event parameters
 */
export const trackPurchaseComplete = (
  productType: ProductType,
  value?: number,
  transactionId?: string,
  additionalParams?: EventParams
): void => {
  const conversionData = PRODUCT_CONVERSION_MAP[productType]
  const finalValue = value || conversionData.value
  
  const params: EventParams = {
    ...additionalParams,
    event_category: 'conversion',
    event_label: 'purchase_complete',
    product_type: productType,
    value: finalValue,
    transaction_id: transactionId,
    currency: 'USD'
  }
  
  // Track GA4 purchase event
  trackEvent('purchase', params)
  
  // Track Google Ads conversion
  trackGoogleAdsConversion(conversionData.label, finalValue, 'USD', transactionId)
}

/**
 * Track calculator usage
 * @param mode - Calculator mode ('wakeup' or 'bedtime')
 * @param targetTime - The time entered by the user
 * @param resultsCount - Number of results generated
 * @param additionalParams - Additional event parameters
 */
export const trackCalculatorUsed = (
  mode: 'wakeup' | 'bedtime',
  targetTime: string,
  resultsCount: number,
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    ...additionalParams,
    event_category: 'engagement',
    event_label: 'calculator_used',
    calculator_mode: mode,
    target_time: targetTime,
    results_count: resultsCount
  }
  
  trackEvent(TRACKING_EVENTS.CALCULATOR_USED, params)
}

/**
 * Track page view (for SPA navigation)
 * @param pagePath - Current page path
 * @param pageTitle - Current page title
 */
export const trackPageView = (
  pagePath: string,
  pageTitle: string
): void => {
  const params: EventParams = {
    event_category: 'engagement',
    event_label: 'page_view',
    page_path: pagePath,
    page_title: pageTitle
  }
  
  trackEvent(TRACKING_EVENTS.PAGE_VIEW, params)
}

// Type declarations for window object
declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || []
}