/**
 * prerender.mjs
 * Build-time prerendering for sleepsmarter.io
 *
 * Runs after `vite build` and `vite build --ssr` to generate
 * static HTML files for all content routes.
 *
 * Usage: node prerender.mjs
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

async function prerender() {
  // Import the SSR bundle built by vite build --ssr
  const { render, prerenderRoutes } = await import('./dist-ssr/entry-server.js')

  // Read the client-built index.html as the template
  const template = readFileSync(resolve(__dirname, 'dist/index.html'), 'utf-8')

  console.log(`\n🚀 Prerendering ${prerenderRoutes.length} routes...\n`)

  let success = 0
  let failed = 0

  for (const url of prerenderRoutes) {
    try {
      // Render the route to HTML
      let appHtml = render(url)

      // React 19 emits document metadata during SSR, but renderToString returns
      // those tags with the app markup instead of placing them in <head> for us.
      // Move SEO/resource tags into the document head so crawlers see one valid
      // title/meta/canonical/OG/Twitter stack per prerendered page.
      const headTags = []
      appHtml = appHtml.replace(
        /<title(\s[^>]*)?>[\s\S]*?<\/title>|<meta(\s[^>]*)?\/>|<link(\s[^>]*)?\/>/gi,
        (tag) => {
          headTags.push(tag)
          return ''
        },
      )
      appHtml = appHtml.replace(
        /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi,
        (tag) => {
          headTags.push(tag)
          return ''
        },
      )

      // Inject into template
      const html = template
        .replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`)
        .replace('<!--app-html-->', appHtml)
        // Mark root as prerendered so client uses hydrateRoot
        .replace('<div id="root">', '<div id="root" data-prerendered="true">')

      // Determine output path
      // / → dist/index.html (already exists, overwrite with prerendered version)
      // /blog → dist/blog/index.html
      // /blog/how-sleep-cycles-work → dist/blog/how-sleep-cycles-work/index.html
      const outDir = url === '/'
        ? resolve(__dirname, 'dist')
        : resolve(__dirname, 'dist', ...url.replace(/^\//, '').split('/'))

      mkdirSync(outDir, { recursive: true })
      writeFileSync(resolve(outDir, 'index.html'), html)

      console.log(`  ✓  ${url}`)
      success++
    } catch (err) {
      console.error(`  ✗  ${url} — ${err.message}`)
      failed++
    }
  }

  console.log(`\n✅ Prerendering complete: ${success} succeeded, ${failed} failed\n`)
}

prerender().catch(err => {
  console.error('Prerender fatal error:', err)
  process.exit(1)
})
