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
        <div className="flex items-center gap-4 text-sm text-[#f1faee]/50 mb-8">
          <span>{article.date}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* Article Content - matching About page styling */}
        <div className="max-w-none">
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
              a: ({ href, children }) => (
                <a href={href} className="text-[#a8dadc] hover:underline">{children}</a>
              ),
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
            }}
          >
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
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30">
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

        <div className="mt-8">
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
          </div>
        </div>
      </footer>
    </div>
  )
}
