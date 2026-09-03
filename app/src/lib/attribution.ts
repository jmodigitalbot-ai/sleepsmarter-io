const ATTRIBUTION_STORAGE_KEY = 'ss_attribution_v1'

export interface AttributionData {
  first_url: string
  first_path: string
  landing_page: string
  referrer: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  lead_source: string
  captured_at: string
}

const INTERNAL_HOSTS = new Set(['sleepsmarter.io', 'www.sleepsmarter.io'])

const safeHost = (value: string): string => {
  try {
    return new URL(value).hostname.replace(/^www\./, '')
  } catch {
    return ''
  }
}

const inferSource = (referrer: string): { source: string; medium: string } => {
  const host = safeHost(referrer)
  if (!host || INTERNAL_HOSTS.has(host)) return { source: 'direct', medium: 'direct' }
  if (host.includes('google.')) return { source: 'google', medium: 'organic' }
  if (host.includes('bing.')) return { source: 'bing', medium: 'organic' }
  if (host.includes('yahoo.')) return { source: 'yahoo', medium: 'organic' }
  if (host.includes('duckduckgo.')) return { source: 'duckduckgo', medium: 'organic' }
  if (host.includes('facebook.') || host.includes('instagram.') || host.includes('tiktok.') || host.includes('pinterest.') || host.includes('reddit.') || host.includes('youtube.')) {
    return { source: host.split('.')[0], medium: 'social' }
  }
  return { source: host, medium: 'referral' }
}

const readStoredAttribution = (): AttributionData | null => {
  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_STORAGE_KEY)
    return raw ? JSON.parse(raw) as AttributionData : null
  } catch {
    return null
  }
}

const writeStoredAttribution = (data: AttributionData): void => {
  try {
    window.localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(data))
  } catch {
    // Attribution is useful, not required for checkout.
  }
}

export const captureAttribution = (): AttributionData | null => {
  if (typeof window === 'undefined') return null

  const existing = readStoredAttribution()
  if (existing) return existing

  const url = new URL(window.location.href)
  const referrer = document.referrer || ''
  const inferred = inferSource(referrer)
  const pathWithQuery = `${url.pathname}${url.search}`
  const data: AttributionData = {
    first_url: url.href,
    first_path: pathWithQuery,
    landing_page: pathWithQuery,
    referrer,
    utm_source: url.searchParams.get('utm_source') || inferred.source,
    utm_medium: url.searchParams.get('utm_medium') || inferred.medium,
    utm_campaign: url.searchParams.get('utm_campaign') || 'sleepsmarter',
    utm_content: url.searchParams.get('utm_content') || url.pathname,
    utm_term: url.searchParams.get('utm_term') || '',
    lead_source: url.searchParams.get('lead_source') || url.pathname,
    captured_at: new Date().toISOString(),
  }

  writeStoredAttribution(data)
  return data
}

export const getAttribution = (): AttributionData | null => {
  if (typeof window === 'undefined') return null
  return captureAttribution()
}

export const attributionEventParams = (): Record<string, string> => {
  const data = getAttribution()
  if (!data) return {}

  return {
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
    utm_term: data.utm_term,
    lead_source: data.lead_source,
    landing_page: data.landing_page,
    referrer: data.referrer,
  }
}

export const buildAttributedCheckoutUrl = (checkoutUrl: string): string => {
  if (typeof window === 'undefined') return checkoutUrl
  const data = getAttribution()
  if (!data) return checkoutUrl

  const url = new URL(checkoutUrl)
  const hash = url.hash
  url.hash = ''

  const params: Record<string, string> = {
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
    utm_term: data.utm_term,
    lead_source: data.lead_source,
    landing_page: data.landing_page,
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value && !url.searchParams.has(key)) url.searchParams.set(key, value)
  })

  return `${url.toString()}${hash}`
}

export const ensurePageUrlHasAttribution = (): void => {
  if (typeof window === 'undefined') return
  const data = getAttribution()
  if (!data) return

  const url = new URL(window.location.href)
  const additions: Record<string, string> = {
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    utm_content: data.utm_content,
    lead_source: data.lead_source,
  }

  let changed = false
  Object.entries(additions).forEach(([key, value]) => {
    if (value && !url.searchParams.has(key)) {
      url.searchParams.set(key, value)
      changed = true
    }
  })

  if (changed) {
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
  }
}
