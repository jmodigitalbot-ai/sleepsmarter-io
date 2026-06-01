import { Link } from 'react-router-dom'
import SleepCalculator from '../components/SleepCalculator'
import SEO from '../components/SEO'

export default function Calculator() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title="Sleep Calculator — Calculate Your Ideal Bedtime & Wake Time"
        description="Use the free Sleep Smarter calculator to find your best bedtime or wake-up time based on natural 90-minute sleep cycles."
        canonical="/calculator"
        type="website"
        softwareApp={{
          name: 'Sleep Calculator by Sleep Smarter',
          description: 'Free sleep cycle calculator that finds your ideal bedtime or wake-up time based on 90-minute natural sleep cycles.',
          url: 'https://www.sleepsmarter.io/calculator',
        }}
      />

      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/calculator" className="text-[#a8dadc]">Calculator</Link>
            <Link to="/blog" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/about" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">About</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4">
            Sleep Calculator
          </h1>
          <p className="text-lg text-[#f1faee]/70 max-w-2xl mx-auto mb-8">
            Calculate the best bedtime or wake-up time for your schedule using natural 90-minute sleep cycles.
          </p>
        </section>

        <section className="max-w-2xl mx-auto px-4 pb-8">
          <SleepCalculator />
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-[#f1faee] mb-2">Popular wake-up times</h2>
            <p className="text-[#f1faee]/70 mb-4">
              Need a quick answer? See exact bedtime recommendations for common alarm times.
            </p>
            <Link
              to="/bedtime-calculator"
              className="inline-block bg-[#1a1a2e] hover:bg-[#4a4e69]/30 border border-[#4a4e69]/50 text-[#f1faee] font-semibold px-6 py-3 rounded-lg transition"
            >
              Browse Bedtime Calculator Pages →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/blog" className="hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
