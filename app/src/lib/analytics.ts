/**
 * Analytics utility for Sleep Smarter tracking
 * 
 * This file provides helper functions for tracking events with Google Analytics 4 (GA4)
 * and Google Tag Manager (GTM).
 */

// GA4 Measurement ID from index.html
// const GA4_MEASUREMENT_ID = 'G-523117386' // Unused but kept for reference

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
  
  trackEvent(TRACKING_EVENTS.EMAIL_SIGNUP, params)
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
 * @param additionalParams - Additional event parameters
 */
export const trackCheckoutClick = (
  buttonText?: string,
  buttonLocation?: string,
  additionalParams?: EventParams
): void => {
  const params: EventParams = {
    ...additionalParams,
    event_category: 'conversion',
    event_label: 'checkout_click',
    button_text: buttonText || 'unknown',
    button_location: buttonLocation || 'unknown',
    outbound_link: 'https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week'
  }
  
  trackEvent(TRACKING_EVENTS.CHECKOUT_CLICK, params)
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