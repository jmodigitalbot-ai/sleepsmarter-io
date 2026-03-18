#!/usr/bin/env node
/**
 * publish-article.js
 * Appends a new article to articles.ts without requiring a full-file edit.
 *
 * Usage:
 *   node scripts/publish-article.js \
 *     --slug "my-article-slug" \
 *     --title "My Article Title" \
 *     --description "Short description for SEO." \
 *     --readTime "8 min read" \
 *     --date "March 2026" \
 *     --publishDate "2026-03-19" \
 *     --contentFile "src/content/28-my-article.md" \
 *     --importName "myArticle" \
 *     --featuredImage "/images/featured-my-article.png" \
 *     --featuredImageAlt "Alt text for featured image" \
 *     --faqs '[{"question":"Q1","answer":"A1"}]'
 *
 * --faqs is optional JSON array. All other flags required except featuredImageAlt.
 */

const fs = require('fs')
const path = require('path')

function parseArgs() {
  const args = process.argv.slice(2)
  const result = {}
  for (let i = 0; i < args.length; i += 2) {
    const key = args[i].replace('--', '')
    result[key] = args[i + 1]
  }
  return result
}

function toRelativeContentPath(contentFile) {
  // Normalize to just the filename portion relative to src/content/
  // e.g. "src/content/28-my-article.md" → "../content/28-my-article.md"
  const basename = path.basename(contentFile)
  return `../content/${basename}`
}

function main() {
  const args = parseArgs()
  const required = ['slug', 'title', 'description', 'readTime', 'date', 'publishDate', 'contentFile', 'importName']
  for (const key of required) {
    if (!args[key]) {
      console.error(`Missing required argument: --${key}`)
      process.exit(1)
    }
  }

  const articlesPath = path.join(__dirname, '../src/data/articles.ts')
  let source = fs.readFileSync(articlesPath, 'utf8')

  // 1. Add import at top (before the export interface line)
  const importLine = `import ${args.importName} from '${toRelativeContentPath(args.contentFile)}?raw'`
  const interfaceMarker = 'export interface FAQ'
  if (source.includes(importLine)) {
    console.log(`Import already exists: ${importLine} — skipping import addition.`)
  } else {
    source = source.replace(interfaceMarker, `${importLine}\n\n${interfaceMarker}`)
    console.log(`✅ Added import: ${importLine}`)
  }

  // 2. Build article object string
  const faqs = args.faqs ? JSON.parse(args.faqs) : []
  const faqsStr = faqs.length
    ? `,\n    faqs: [\n${faqs.map(f => `      { question: ${JSON.stringify(f.question)}, answer: ${JSON.stringify(f.answer)} }`).join(',\n')}\n    ]`
    : ''

  const featuredImageStr = args.featuredImage
    ? `,\n    featuredImage: ${JSON.stringify(args.featuredImage)}`
    : ''
  const featuredImageAltStr = args.featuredImageAlt
    ? `,\n    featuredImageAlt: ${JSON.stringify(args.featuredImageAlt)}`
    : ''

  const articleEntry = `  {
    slug: ${JSON.stringify(args.slug)},
    title: ${JSON.stringify(args.title)},
    description: ${JSON.stringify(args.description)},
    readTime: ${JSON.stringify(args.readTime)},
    date: ${JSON.stringify(args.date)},
    publishDate: ${JSON.stringify(args.publishDate)},
    content: ${args.importName}${featuredImageStr}${featuredImageAltStr}${faqsStr}
  }`

  // 3. Append before closing bracket of articles array
  const closingMarker = '\n]'
  const lastClose = source.lastIndexOf(closingMarker)
  if (lastClose === -1) {
    console.error('Could not find closing ] of articles array.')
    process.exit(1)
  }

  // Check for duplicate slug
  if (source.includes(`slug: ${JSON.stringify(args.slug)}`)) {
    console.error(`Article with slug "${args.slug}" already exists in articles.ts`)
    process.exit(1)
  }

  source = source.slice(0, lastClose) + `,\n${articleEntry}\n]`

  fs.writeFileSync(articlesPath, source, 'utf8')
  console.log(`✅ Article "${args.title}" added to articles.ts with slug "${args.slug}"`)
}

main()
