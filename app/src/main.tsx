import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import ThankYou from './pages/ThankYou.tsx'
import SleepReset from './pages/SleepReset.tsx'
import MasterclassSales from './pages/MasterclassSales.tsx'
import PremiumSales from './pages/PremiumSales.tsx'
import InsiderSales from './pages/InsiderSales.tsx'
import OTOMasterclass from './pages/OTOMasterclass.tsx'
import OTOPremium from './pages/OTOPremium.tsx'
import OTOInsider from './pages/OTOInsider.tsx'
import PurchaseThankYou from './pages/PurchaseThankYou.tsx'
import SleepCalculatorLanding from './pages/landing/SleepCalculatorLanding.tsx'
import SleepTipsLanding from './pages/landing/SleepTipsLanding.tsx'
import SleepProductsLanding from './pages/landing/SleepProductsLanding.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import CookieBanner from './components/CookieBanner.tsx'
import { initGA4 } from './lib/analytics'

// Initialize analytics
initGA4()

const rootEl = document.getElementById('root')!
const isPrerendered = rootEl.hasAttribute('data-prerendered')

const ui = (
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <CookieBanner />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/disclosure" element={<Disclosure />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Article />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sleep-reset" element={<SleepReset />} />
        <Route path="/masterclass" element={<MasterclassSales />} />
        <Route path="/premium" element={<PremiumSales />} />
        <Route path="/insider" element={<InsiderSales />} />
        <Route path="/oto/masterclass" element={<OTOMasterclass />} />
        <Route path="/oto/premium" element={<OTOPremium />} />
        <Route path="/oto/insider" element={<OTOInsider />} />
        <Route path="/purchase-complete" element={<PurchaseThankYou />} />
        <Route path="/blueprint" element={<Navigate to="/thank-you" replace />} />
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
