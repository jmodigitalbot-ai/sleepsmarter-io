import { StrictMode, useEffect } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import About from './pages/About.tsx'
import Privacy from './pages/Privacy.tsx'
import Terms from './pages/Terms.tsx'
import Disclosure from './pages/Disclosure.tsx'
import Blog from './pages/Blog.tsx'
import Article from './pages/Article.tsx'
import Calculator from './pages/Calculator.tsx'
import Assessment from './pages/Assessment.tsx'
import Quiz from './pages/Quiz.tsx'
import ThankYou from './pages/ThankYou.tsx'
import SleepReset from './pages/SleepReset.tsx'
import SleepDebtCalculator from './pages/SleepDebtCalculator.tsx'
import BedtimeCalculatorHub from './pages/BedtimeCalculatorHub.tsx'
import BedtimeCalculatorPage from './pages/BedtimeCalculatorPage.tsx'
import MasterclassSales from './pages/MasterclassSales.tsx'
import PremiumSales from './pages/PremiumSales.tsx'
import InsiderSales from './pages/InsiderSales.tsx'

import Blueprint from './pages/Blueprint.tsx'
import SleepCalculatorLanding from './pages/landing/SleepCalculatorLanding.tsx'
import SleepTipsLanding from './pages/landing/SleepTipsLanding.tsx'
import SleepProductsLanding from './pages/landing/SleepProductsLanding.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import CookieBanner from './components/CookieBanner.tsx'
import { initGA4, initMetaPixelWhenIdle } from './lib/analytics'
import { initDelayedThirdPartyScripts, loadSamCartSlideScript, runWhenIdle } from './lib/thirdPartyScripts'

// Initialize lightweight analytics/dataLayer immediately; delay nonessential pixels.
initGA4()
initMetaPixelWhenIdle()
initDelayedThirdPartyScripts()

const SAMCART_SLIDE_ROUTES = [
  '/masterclass',
  '/premium',
  '/insider',
  '/thank-you',
  '/blueprint',
  '/lp/sleep-calculator',
]

export function RouteThirdPartyScripts() {
  const location = useLocation()

  useEffect(() => {
    if (!SAMCART_SLIDE_ROUTES.includes(location.pathname)) return
    return runWhenIdle(() => {
      loadSamCartSlideScript()
    }, 1500)
  }, [location.pathname])

  return null
}

const rootEl = document.getElementById('root')!
const isPrerendered = rootEl.hasAttribute('data-prerendered')

const ui = (
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <RouteThirdPartyScripts />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="/blog" element={<Blog />} />
        {/* Redirects for duplicate orthosomnia articles → canonical #38 */}
        <Route path="/blog/sleep-tracker-making-sleep-worse" element={<Navigate to="/blog/orthosomnia-sleep-tracker-anxiety" replace />} />
        <Route path="/blog/sleep-tracker-causing-insomnia" element={<Navigate to="/blog/orthosomnia-sleep-tracker-anxiety" replace />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sleep-reset" element={<SleepReset />} />
        <Route path="/sleep-debt-calculator" element={<SleepDebtCalculator />} />
        <Route path="/bedtime-calculator" element={<BedtimeCalculatorHub />} />
        <Route path="/bedtime-calculator/:wakeTime" element={<BedtimeCalculatorPage />} />
        <Route path="/masterclass" element={<MasterclassSales />} />
        <Route path="/premium" element={<PremiumSales />} />
        <Route path="/insider" element={<InsiderSales />} />

        <Route path="/blueprint" element={<Blueprint />} />
        {/* Landing Pages */}
        <Route path="/lp/sleep-calculator" element={<SleepCalculatorLanding />} />
        <Route path="/lp/sleep-tips" element={<SleepTipsLanding />} />
        <Route path="/lp/sleep-products" element={<SleepProductsLanding />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)

if (isPrerendered) {
  hydrateRoot(rootEl, ui)
} else {
  createRoot(rootEl).render(ui)
}
