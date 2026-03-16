import { Link } from 'react-router-dom'
import QuizFunnel from '../components/QuizFunnel'
import SEO from '../components/SEO'

export default function Quiz() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title="Sleep Type Quiz — Discover Why You Can't Sleep"
        description="Take the 60-second sleep quiz to discover your sleep type and get a personalized diagnosis. Find out exactly what's destroying your sleep and how to fix it."
        canonical="/quiz"
        type="website"
      />
      {/* Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <Link to="/" className="text-sm text-[#f1faee]/70 hover:text-[#a8dadc] transition">
            Back Home
          </Link>
        </div>
      </header>

      {/* Quiz */}
      <main>
        <QuizFunnel />
      </main>

      {/* Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/blog" className="hover:text-[#a8dadc] transition">
              Blog
            </Link>
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">
              Terms
            </Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">
              Disclosure
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
