const loadedScripts = new Set<string>()

declare global {
  interface Window {
    adsbygoogle?: unknown[]
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] }
  }
}

export const loadExternalScript = (
  src: string,
  options: Partial<HTMLScriptElement> & { id?: string; parent?: HTMLElement } = {}
): HTMLScriptElement | null => {
  if (typeof document === 'undefined') return null

  const id = options.id
  if (id && document.getElementById(id)) return document.getElementById(id) as HTMLScriptElement
  if (loadedScripts.has(src)) return document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null

  const script = document.createElement('script')
  script.src = src
  script.async = options.async ?? true
  script.defer = options.defer ?? true

  if (id) script.id = id
  if (options.crossOrigin) script.crossOrigin = options.crossOrigin

  loadedScripts.add(src)
  ;(options.parent ?? document.head).appendChild(script)

  return script
}

export const runWhenIdle = (callback: () => void, timeout = 3500): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  if ('requestIdleCallback' in window && window.requestIdleCallback) {
    const handle = window.requestIdleCallback(callback, { timeout })
    return () => window.cancelIdleCallback?.(handle)
  }

  const handle = window.setTimeout(callback, timeout)
  return () => window.clearTimeout(handle)
}

export const runAfterInteractionOrDelay = (callback: () => void, delay = 30000): (() => void) => {
  if (typeof window === 'undefined') return () => {}

  let didRun = false
  let idleCleanup: (() => void) | undefined
  const events: Array<keyof WindowEventMap> = ['pointerdown', 'keydown', 'scroll', 'touchstart']

  const cleanupEvents = () => {
    events.forEach((eventName) => window.removeEventListener(eventName, run, true))
  }

  const run = () => {
    if (didRun) return
    didRun = true
    window.clearTimeout(timeout)
    cleanupEvents()
    idleCleanup = runWhenIdle(callback, 1500)
  }

  const timeout = window.setTimeout(run, delay)
  events.forEach((eventName) => window.addEventListener(eventName, run, { passive: true, capture: true, once: true }))

  return () => {
    window.clearTimeout(timeout)
    cleanupEvents()
    idleCleanup?.()
  }
}

export const loadSamCartCheckoutScript = (): HTMLScriptElement | null => {
  return loadExternalScript('https://static.samcart.com/checkouts/sc-checkout.js', {
    id: 'samcart-checkout-script',
    defer: true,
    parent: typeof document !== 'undefined' ? document.body : undefined,
  })
}

export const loadSamCartSlideScript = (): HTMLScriptElement | null => {
  return loadExternalScript('https://static.samcart.com/checkouts/sc-slide-script.js', {
    id: 'samcart-slide-script',
    defer: true,
    parent: typeof document !== 'undefined' ? document.body : undefined,
  })
}

const initAdSense = (): void => {
  loadExternalScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8526903064118225', {
    id: 'adsense-script',
    async: true,
    crossOrigin: 'anonymous',
  })
}

const initClarity = (): void => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (window.clarity) return

  window.clarity = function (...args: unknown[]) {
    const clarityQueue = window.clarity as NonNullable<Window['clarity']>
    ;(clarityQueue.q = clarityQueue.q || []).push(args)
  }

  loadExternalScript('https://www.clarity.ms/tag/vgv1dsqzub', {
    id: 'clarity-script',
    async: true,
  })
}

export const initDelayedThirdPartyScripts = (): (() => void) => {
  return runAfterInteractionOrDelay(() => {
    initAdSense()
    initClarity()
  }, 30000)
}
