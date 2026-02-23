import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articles } from '../data/articles'
import ProductCard from '../components/ProductCard'
import SEO from '../components/SEO'

// Convert human-readable date to ISO format for schema
function toISODate(date: string): string {
  const months: Record<string, string> = {
    'January': '01', 'February': '02', 'March': '03', 'April': '04',
    'May': '05', 'June': '06', 'July': '07', 'August': '08',
    'September': '09', 'October': '10', 'November': '11', 'December': '12',
  }
  const parts = date.split(' ')
  if (parts.length === 2 && months[parts[0]]) {
    return `${parts[1]}-${months[parts[0]]}-01`
  }
  return '2026-02-04'
}

interface ProductCardData {
  badge?: string
  title: string
  features: string[]
  cta?: string
  url: string
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  // Remove the frontmatter from markdown if present (only at very start of file)
  let cleanContent = article.content.replace(/^---[\s\S]*?---\n*/, '')
  
  // Remove the first H1 title (we render it separately above)
  cleanContent = cleanContent.replace(/^#\s+.+\n+/, '')

  // Extract product cards and split content into segments
  const productCardRegex = /<!--\s*PRODUCT_CARD\s*([\s\S]*?)-->/g
  const productCards: ProductCardData[] = []
  
  // Parse all product cards
  let match
  while ((match = productCardRegex.exec(cleanContent)) !== null) {
    const cardContent = match[1]
    const lines = cardContent.trim().split('\n')
    const data: ProductCardData = { title: '', features: [], url: '' }
    
    lines.forEach((line: string) => {
      const [key, ...valueParts] = line.split(':')
      const value = valueParts.join(':').trim()
      
      if (key.trim() === 'badge') data.badge = value
      if (key.trim() === 'title') data.title = value
      if (key.trim() === 'features') data.features = value.split('|').map(f => f.trim())
      if (key.trim() === 'cta') data.cta = value
      if (key.trim() === 'url') data.url = value
    })
    
    productCards.push(data)
  }
  
  // Split content by product card markers
  const contentSegments = cleanContent.split(/<!--\s*PRODUCT_CARD\s*[\s\S]*?-->/)

  const isoDate = toISODate(article.date)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title={article.title}
        description={article.description}
        canonical={`/blog/${article.slug}`}
        type="article"
        image={article.featuredImage}
        imageAlt={article.featuredImageAlt}
        datePublished={isoDate}
        dateModified={isoDate}
        faqs={article.faqs}
        breadcrumbs={[
          { name: 'Home', url: 'https://sleepsmarter.io/' },
          { name: 'Blog', url: 'https://sleepsmarter.io/blog' },
          { name: article.title, url: `https://sleepsmarter.io/blog/${article.slug}` },
        ]}
      />
      {/* Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Calculator</Link>
            <Link to="/blog" className="text-[#a8dadc]">Blog</Link>
            <Link to="/about" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">About</Link>
          </nav>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#f1faee]/50 mb-8">
          <Link to="/" className="hover:text-[#a8dadc]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-[#a8dadc]">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-[#f1faee]/70">{article.title}</span>
        </nav>

        {/* Article Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-[#f1faee]/50 mb-8">
          <div className="flex items-center gap-2">
            <span className="text-[#a8dadc]">✍️</span>
            <span>Sleep Smarter Editorial Team</span>
          </div>
          <span>•</span>
          <time dateTime={isoDate}>{article.date}</time>
          <span>•</span>
          <span>{article.readTime}</span>
          <span>•</span>
          <span className="text-[#a8dadc]/70">Last reviewed: {article.date}</span>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <img 
              src={article.featuredImage} 
              alt={article.featuredImageAlt || article.title}
              className="w-full h-auto"
              loading="eager"
            />
          </div>
        )}

        {/* Article Content - matching About page styling */}
        <div className="max-w-none">
          {contentSegments.map((segment, index) => (
            <div key={index}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
              h1: ({ children }) => (
                <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold text-[#a8dadc] mt-10 mb-4">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-lg font-semibold text-[#a8dadc] mt-8 mb-3">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-[#f1faee]/70 mb-6 leading-relaxed">{children}</p>
              ),
              a: ({ href, children }) => {
                // Check if this is an affiliate link (tidd.ly)
                const isAffiliateLink = href?.includes('tidd.ly')
                
                if (isAffiliateLink) {
                  return (
                    <a 
                      href={href} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-5 py-2.5 rounded-lg transition group no-underline my-2"
                    >
                      {children}
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </a>
                  )
                }
                
                return (
                  <a href={href} className="text-[#a8dadc] hover:underline">{children}</a>
                )
              },
              strong: ({ children }) => (
                <strong className="font-semibold text-[#f1faee]">{children}</strong>
              ),
              em: ({ children }) => (
                <em className="italic text-[#f1faee]/80">{children}</em>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-outside ml-6 mb-6 space-y-3 text-[#f1faee]/70">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-6 mb-6 space-y-3 text-[#f1faee]/70">{children}</ol>
              ),
              li: ({ children }) => (
                <li className="leading-relaxed">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-[#a8dadc] bg-[#16213e] py-4 px-6 rounded-r-lg my-6 text-[#f1faee]/70 italic">{children}</blockquote>
              ),
              code: ({ children }) => (
                <code className="text-[#a8dadc] bg-[#16213e] px-1.5 py-0.5 rounded text-sm">{children}</code>
              ),
              hr: () => (
                <hr className="border-[#4a4e69]/30 my-10" />
              ),
              img: ({ src, alt }) => (
                <figure className="my-8">
                  <img 
                    src={src} 
                    alt={alt || ''} 
                    className="w-full h-auto rounded-xl"
                    loading="lazy"
                  />
                  {alt && (
                    <figcaption className="text-center text-sm text-[#f1faee]/50 mt-3 italic">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full text-sm text-[#f1faee]/70 border-collapse">
                    {children}
                  </table>
                </div>
              ),
              thead: ({ children }) => (
                <thead className="bg-[#16213e] text-[#a8dadc]">{children}</thead>
              ),
              th: ({ children }) => (
                <th className="px-4 py-3 text-left font-semibold border-b border-[#4a4e69]/30">{children}</th>
              ),
              td: ({ children }) => (
                <td className="px-4 py-3 border-b border-[#4a4e69]/20">{children}</td>
              ),
            }}
              >
                {segment}
              </ReactMarkdown>
              
              {/* Render product card after this segment if one exists */}
              {index < productCards.length && (
                <ProductCard
                  badge={productCards[index].badge}
                  title={productCards[index].title}
                  features={productCards[index].features}
                  ctaText={productCards[index].cta}
                  ctaUrl={productCards[index].url}
                  highlight={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 p-6 bg-[#16213e] rounded-xl text-center">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-2">
            Ready to sleep smarter?
          </h3>
          <p className="text-[#f1faee]/60 mb-4">
            Calculate your optimal bedtime in seconds.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition"
          >
            Use Sleep Calculator
          </Link>
        </div>

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold text-[#a8dadc] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {article.faqs.map((faq, index) => (
                <details key={index} className="group bg-[#16213e] rounded-xl border border-[#4a4e69]/30 p-5 cursor-pointer">
                  <summary className="font-medium text-[#f1faee] list-none flex items-center justify-between gap-4">
                    <span>{faq.question}</span>
                    <span className="text-[#a8dadc] text-lg flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[#f1faee]/70 leading-relaxed text-sm">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        {/* Author Bio */}
        <div className="mt-12 p-6 bg-[#16213e] rounded-xl border border-[#4a4e69]/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[#4a4e69] rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-xl">😴</span>
            </div>
            <div>
              <p className="font-semibold text-[#f1faee] mb-1">Sleep Smarter Editorial Team</p>
              <p className="text-sm text-[#f1faee]/60 leading-relaxed">
                Our editorial team researches and writes evidence-based sleep content grounded in peer-reviewed science. 
                All articles reference established sleep research from sources including the NIH, AASM, and Sleep Foundation.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#4a4e69]/30">
          <Link to="/blog" className="text-[#a8dadc] hover:underline">← Back to Blog</Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
