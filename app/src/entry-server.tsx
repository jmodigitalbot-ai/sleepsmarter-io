import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router'
import { StrictMode } from 'react'
import App from './App.tsx'
import About from './pages/About.tsx'
import Blog from './pages/Blog.tsx'
import Article from './pages/Article.tsx'
import Calculator from './pages/Calculator.tsx'
import SleepReset from './pages/SleepReset.tsx'
import SleepDebtCalculator from './pages/SleepDebtCalculator.tsx'
import BedtimeCalculatorHub from './pages/BedtimeCalculatorHub.tsx'
import BedtimeCalculatorPage from './pages/BedtimeCalculatorPage.tsx'
import Privacy from './pages/Privacy.tsx'
import Terms from './pages/Terms.tsx'
import Disclosure from './pages/Disclosure.tsx'
import SleepCalculatorLanding from './pages/landing/SleepCalculatorLanding.tsx'
import SleepTipsLanding from './pages/landing/SleepTipsLanding.tsx'
import SleepProductsLanding from './pages/landing/SleepProductsLanding.tsx'
import { articles } from './data/articles.ts'
import { bedtimePages } from './data/bedtimePages.ts'

// All routes to prerender at build time
export const prerenderRoutes: string[] = [
  '/',
  '/blog',
  '/calculator',
  '/about',
  '/sleep-reset',
  '/sleep-debt-calculator',
  '/bedtime-calculator',
  ...bedtimePages.map(p => `/bedtime-calculator/${p.slug}`),
  '/lp/sleep-calculator',
  '/lp/sleep-tips',
  '/lp/sleep-products',
  '/privacy',
  '/terms',
  '/disclosure',
  ...articles.map(a => `/blog/${a.slug}`),
]

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/about" element={<About />} />
          <Route path="/sleep-reset" element={<SleepReset />} />
          <Route path="/sleep-debt-calculator" element={<SleepDebtCalculator />} />
          <Route path="/bedtime-calculator" element={<BedtimeCalculatorHub />} />
          <Route path="/bedtime-calculator/:wakeTime" element={<BedtimeCalculatorPage />} />
          <Route path="/lp/sleep-calculator" element={<SleepCalculatorLanding />} />
          <Route path="/lp/sleep-tips" element={<SleepTipsLanding />} />
          <Route path="/lp/sleep-products" element={<SleepProductsLanding />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="*" element={<App />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  )
}
