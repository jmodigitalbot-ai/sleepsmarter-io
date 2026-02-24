import { renderToString } from 'react-dom/server'
import { StaticRouter, Routes, Route } from 'react-router'
import { StrictMode } from 'react'
import App from './App.tsx'
import About from './pages/About.tsx'
import Blog from './pages/Blog.tsx'
import Article from './pages/Article.tsx'
import SleepReset from './pages/SleepReset.tsx'
import Privacy from './pages/Privacy.tsx'
import Terms from './pages/Terms.tsx'
import Disclosure from './pages/Disclosure.tsx'
import { articles } from './data/articles.ts'

// All routes to prerender at build time
export const prerenderRoutes: string[] = [
  '/',
  '/blog',
  '/about',
  '/sleep-reset',
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
          <Route path="/about" element={<About />} />
          <Route path="/sleep-reset" element={<SleepReset />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="*" element={<App />} />
        </Routes>
      </StaticRouter>
    </StrictMode>
  )
}
