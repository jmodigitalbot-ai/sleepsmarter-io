# sleepsmarter.io — Publishing SOP

## Content Cadence
- **3 articles per week** (ongoing)
- Publish dates are set in the article outline and metadata — **do not publish early**
- Always check `publishDate` in the article metadata before committing

## Pre-Publish Checklist
Before committing any article to the repo:
- [ ] `publishDate` in metadata matches today's date (not future, not past)
- [ ] `publishDate` field added to the article entry in `articles.ts` (ISO format: `YYYY-MM-DD`) — blog sorts by this field automatically
- [ ] Featured image generated and placed at `app/public/images/featured-[slug].png`
- [ ] Markdown content file placed at `app/src/content/[##]-[slug].md`
- [ ] Import added to `app/src/data/articles.ts`
- [ ] Article entry added to `articles` array with: slug, title, description, readTime, date, content, featuredImage, featuredImageAlt, faqs
- [ ] Minimum 3 internal links in article body
- [ ] CTA to `/sleep-reset` at the close
- [ ] Word count: 1,800–2,200 words
- [ ] KANBAN.md updated (mark article published with date)

## Publish Date Rule
**The publish date in the outline/metadata is the publish date. Full stop.**
- Outline says Mar 3 → publish on Mar 3
- Do not ship early because the work is done early
- Early completion = article sits in drafts until scheduled date
- If in doubt, ask Jason before pushing

## File Naming Convention
- Content: `##-[slug].md` (e.g., `18-sleep-anxiety.md`)
- Featured image: `featured-[slug].png` (e.g., `featured-sleep-anxiety.png`)
- Numbering is sequential — check existing files before assigning a number

## Featured Image Standards
- Generate via Gemini (`~/.config/kitt/gemini-api.json`)
- Style: minimalist, editorial, abstract — matches existing site aesthetic
- Palette: blues, indigos, soft warm tones — no harsh colors
- No text in image (Gemini text rendering is unreliable)
- Dimensions: square (1024×1024 output from Gemini is fine)
- Alt text: descriptive, keyword-relevant, sentence format

## Article Quality Standards
- Tone: warm, direct, credible — knowledgeable friend, not medical textbook
- Paragraphs: 2–4 sentences max
- Every section must earn its place — no filler
- Affiliate mentions: natural, not promotional-feeling
- FAQs: 3–4 questions, schema-ready (concise, factual answers)
