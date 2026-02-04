import { useParams, Link, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { articles } from '../data/articles'

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return <Navigate to="/blog" replace />
  }

  // Remove the frontmatter from markdown if present
  const contentWithoutFrontmatter = article.content.replace(/^---[\s\S]*?---\n*/m, '')

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
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

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#f1faee]/50 mb-8">
          <Link to="/" className="hover:text-[#a8dadc]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/blog" className="hover:text-[#a8dadc]">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-[#f1faee]/70">{article.title}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
            {article.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-[#f1faee]/50">
            <span>{article.date}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-invert prose-lg max-w-none
          prose-headings:text-[#a8dadc] prose-headings:font-semibold
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[#f1faee]/80 prose-p:leading-relaxed prose-p:mb-4
          prose-a:text-[#a8dadc] prose-a:no-underline hover:prose-a:underline
          prose-strong:text-[#f1faee] prose-strong:font-semibold
          prose-ul:text-[#f1faee]/80 prose-ul:my-4
          prose-ol:text-[#f1faee]/80 prose-ol:my-4
          prose-li:my-1
          prose-blockquote:border-l-[#a8dadc] prose-blockquote:bg-[#16213e] prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:text-[#f1faee]/70
          prose-code:text-[#a8dadc] prose-code:bg-[#16213e] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-hr:border-[#4a4e69]/30
        ">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {contentWithoutFrontmatter}
          </ReactMarkdown>
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

        {/* Related Articles */}
        <div className="mt-12">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-4">
            Related Articles
          </h3>
          <div className="grid gap-4">
            {articles
              .filter(a => a.slug !== slug)
              .slice(0, 3)
              .map(a => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="block bg-[#16213e] rounded-lg p-4 hover:bg-[#1f2b47] transition"
                >
                  <h4 className="font-medium text-[#f1faee] hover:text-[#a8dadc]">
                    {a.title}
                  </h4>
                  <p className="text-sm text-[#f1faee]/50 mt-1">{a.readTime}</p>
                </Link>
              ))}
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
