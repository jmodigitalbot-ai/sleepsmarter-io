import { useParams, Link, Navigate } from 'react-router-dom'
import { articles } from '../data/articles'

// For MVP, we'll display article summaries with links to full content
// In production, integrate react-markdown or MDX for full article rendering

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    return <Navigate to="/blog" replace />
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

        {/* Article Content Placeholder */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-[#f1faee]/80 mb-6">
            {article.description}
          </p>
          
          <div className="bg-[#16213e] rounded-xl p-8 text-center my-8">
            <h2 className="text-xl font-semibold text-[#f1faee] mb-3">
              🚧 Full Article Coming Soon
            </h2>
            <p className="text-[#f1faee]/60 mb-4">
              We're putting the finishing touches on this article. 
              In the meantime, try our sleep calculator!
            </p>
            <Link
              to="/"
              className="inline-block bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition"
            >
              Try Sleep Calculator
            </Link>
          </div>

          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">
            Why Sleep Cycles Matter
          </h2>
          <p className="text-[#f1faee]/70 mb-4">
            Understanding your sleep cycles is the key to waking up refreshed. 
            Your brain naturally moves through 90-minute cycles of light sleep, 
            deep sleep, and REM sleep throughout the night.
          </p>
          <p className="text-[#f1faee]/70 mb-4">
            When you wake up at the end of a complete cycle (rather than in the 
            middle of one), you feel alert and energized. When you wake mid-cycle, 
            especially during deep sleep, you experience that groggy feeling 
            called "sleep inertia."
          </p>

          <h2 className="text-xl font-semibold text-[#a8dadc] mt-8 mb-4">
            How Our Sleep Calculator Helps
          </h2>
          <p className="text-[#f1faee]/70 mb-4">
            Our free sleep calculator takes the guesswork out of sleep timing. 
            Simply enter when you need to wake up, and we'll calculate the optimal 
            times to fall asleep based on complete 90-minute sleep cycles.
          </p>
          <p className="text-[#f1faee]/70">
            We also account for the average 14 minutes it takes to fall asleep, 
            giving you accurate bedtime recommendations for 4, 5, or 6 complete 
            sleep cycles.
          </p>
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
