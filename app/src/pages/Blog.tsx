import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../data/articles'

const POSTS_PER_PAGE = 6

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(articles.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const pageArticles = articles.slice(startIndex, startIndex + POSTS_PER_PAGE)

  const goToPage = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
          Sleep <span className="text-[#a8dadc]">Science</span> Blog
        </h1>
        <p className="text-lg text-[#f1faee]/70 mb-12">
          Learn the science behind better sleep and wake up refreshed every day.
        </p>

        <div className="space-y-6">
          {pageArticles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block bg-[#16213e] rounded-xl overflow-hidden hover:bg-[#1f2b47] transition group"
            >
              <div className="md:flex">
                {/* Featured Image */}
                {article.featuredImage && (
                  <div className="md:w-1/3 h-48 md:h-auto">
                    <img 
                      src={article.featuredImage} 
                      alt={article.featuredImageAlt || article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className={`p-6 ${article.featuredImage ? 'md:w-2/3' : 'w-full'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[#f1faee] group-hover:text-[#a8dadc] transition mb-2">
                        {article.title}
                      </h2>
                      <p className="text-[#f1faee]/60 mb-3">
                        {article.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-[#f1faee]/50">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    <span className="text-[#a8dadc] text-2xl group-hover:translate-x-1 transition-transform hidden md:block">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#16213e] text-[#f1faee]/60 hover:text-[#a8dadc] hover:bg-[#1f2b47] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition ${
                  page === currentPage
                    ? 'bg-[#a8dadc] text-[#1a1a2e]'
                    : 'bg-[#16213e] text-[#f1faee]/60 hover:text-[#a8dadc] hover:bg-[#1f2b47]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#16213e] text-[#f1faee]/60 hover:text-[#a8dadc] hover:bg-[#1f2b47] disabled:opacity-30 disabled:cursor-not-allowed transition"
            >
              Next →
            </button>
          </div>
        )}

        <p className="text-center text-sm text-[#f1faee]/40 mt-3">
          Page {currentPage} of {totalPages} · {articles.length} articles
        </p>

        <div className="mt-12 p-6 bg-[#16213e] rounded-xl text-center">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-2">
            Ready to improve your sleep?
          </h3>
          <p className="text-[#f1faee]/60 mb-4">
            Try our free sleep calculator to find your optimal bedtime.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition"
          >
            Use Sleep Calculator
          </Link>
        </div>
      </div>

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
