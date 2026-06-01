/**
 * generate-sitemap.mjs
 * Build-time sitemap generator for sleepsmarter.io
 *
 * Reads articles from src/data/articles.ts and writes a complete
 * sitemap.xml to public/sitemap.xml.
 *
 * Must be run from the /app directory: node generate-sitemap.mjs
 * Runs as part of the build pipeline via package.json "build" script.
 */

import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const SITE_URL = 'https://www.sleepsmarter.io'

// Static core pages: [path, lastmod, changefreq, priority]
const CORE_PAGES = [
  ['/', '2026-05-20', 'weekly', '1.0'],
  ['/blog', '2026-05-20', 'weekly', '0.9'],
  ['/calculator', '2026-02-23', 'monthly', '0.9'],
  ['/sleep-debt-calculator', '2026-05-21', 'monthly', '0.9'],
  ['/bedtime-calculator', '2026-06-01', 'weekly', '0.8'],
  ['/sleep-reset', '2026-02-12', 'monthly', '0.8'],
  ['/about', '2026-02-04', 'monthly', '0.5'],
  ['/lp/sleep-calculator', '2026-02-23', 'monthly', '0.8'],
  ['/lp/sleep-tips', '2026-02-23', 'monthly', '0.7'],
  ['/lp/sleep-products', '2026-02-23', 'monthly', '0.7'],
  ['/privacy', '2026-02-08', 'yearly', '0.3'],
  ['/terms', '2026-02-08', 'yearly', '0.3'],
  ['/disclosure', '2026-02-08', 'yearly', '0.3'],
]

function urlEntry(loc, lastmod, changefreq, priority) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

async function generateSitemap() {
  // Dynamically import articles from the TypeScript source via the pre-built SSR bundle.
  // We need the articles array - run this AFTER vite build --ssr so dist-ssr exists.
  // If dist-ssr doesn't exist yet (first run), we fall back to reading articles.ts directly.

  // Always parse articles.ts directly — it's the canonical source of truth
  // and is always current regardless of whether dist-ssr is fresh.
  let articles = []
  let bedtimePages = []
  {
    const { readFileSync } = await import('fs')
    const src = readFileSync(resolve(__dirname, 'src/data/articles.ts'), 'utf-8')

    // Extract slug + publishDate pairs
    const slugRe = /slug:\s*['"]([^'"]+)['"]/g
    const dateRe = /publishDate:\s*['"]([^'"]+)['"]/g

    let slugMatch, dateMatch
    const slugs = []
    const dates = []

    while ((slugMatch = slugRe.exec(src)) !== null) slugs.push(slugMatch[1])
    while ((dateMatch = dateRe.exec(src)) !== null) dates.push(dateMatch[1])

    articles = slugs.map((slug, i) => ({ slug, publishDate: dates[i] || '2026-01-01' }))

    const bedtimeSrc = readFileSync(resolve(__dirname, 'src/data/bedtimePages.ts'), 'utf-8')
    const bedtimeSlugRe = /slug:\s*['"]([^'"]+)['"]/g
    let bedtimeSlugMatch
    while ((bedtimeSlugMatch = bedtimeSlugRe.exec(bedtimeSrc)) !== null) {
      bedtimePages.push({ slug: bedtimeSlugMatch[1], publishDate: '2026-06-01' })
    }
  }

  const coreEntries = CORE_PAGES.map(([path, lastmod, changefreq, priority]) =>
    urlEntry(`${SITE_URL}${path}`, lastmod, changefreq, priority)
  ).join('\n')

  const articleEntries = articles.map(({ slug, publishDate }) =>
    urlEntry(`${SITE_URL}/blog/${slug}`, publishDate, 'monthly', '0.7')
  ).join('\n')

  const bedtimeEntries = bedtimePages.map(({ slug, publishDate }) =>
    urlEntry(`${SITE_URL}/bedtime-calculator/${slug}`, publishDate, 'monthly', '0.7')
  ).join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Core Pages -->
${coreEntries}

  <!-- Bedtime Calculator Pages (${bedtimePages.length} total) -->
${bedtimeEntries}

  <!-- Blog Articles (${articles.length} total) -->
${articleEntries}

</urlset>
`

  const outPath = resolve(__dirname, 'public/sitemap.xml')
  writeFileSync(outPath, sitemap)
  console.log(`✅ Sitemap generated: ${articles.length} articles + ${bedtimePages.length} bedtime pages + ${CORE_PAGES.length} core pages → ${outPath}`)
}

generateSitemap().catch(err => {
  console.error('Sitemap generation failed:', err)
  process.exit(1)
})
