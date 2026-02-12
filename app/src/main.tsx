import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
import ThankYou from './pages/ThankYou.tsx'
import SleepReset from './pages/SleepReset.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import CookieBanner from './components/CookieBanner.tsx'
import { initGA4 } from './lib/analytics'

// Initialize analytics
initGA4()

createRoot(document.getElementById('root')!).render(
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
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/sleep-reset" element={<SleepReset />} />
        <Route path="/blueprint" element={<Navigate to="/thank-you" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
