import { Link } from 'react-router-dom'
import SleepCalculator from './components/SleepCalculator'
import SEO from './components/SEO'

function App() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title="Sleep Smarter — Free Sleep Calculator & Bedtime Optimizer"
        description="Calculate your ideal bedtime or wake-up time based on natural 90-minute sleep cycles. Free sleep calculator, personalized sleep assessment, and science-backed tips."
        canonical="/"
        type="website"
        includeOrganization
        softwareApp={{
          name: 'Sleep Calculator by Sleep Smarter',
          description: 'Free sleep cycle calculator that finds your ideal bedtime or wake-up time based on 90-minute natural sleep cycles. Includes a personalized sleep assessment, sleep score, and custom 7-day sleep protocol.',
          url: 'https://sleepsmarter.io',
        }}
      />
      {/* Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#calculator" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Calculator</a>
            <Link to="/blog" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/about" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">About</Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4">
            Wake Up Refreshed.{' '}
            <span className="text-[#a8dadc]">Every Time.</span>
          </h1>
          <p className="text-lg text-[#f1faee]/70 max-w-2xl mx-auto mb-8">
            Calculate the perfect bedtime or wake-up time based on natural sleep cycles. 
            Stop waking up groggy and start feeling energized.
          </p>
        </section>

        {/* Calculator */}
        <section id="calculator" className="max-w-2xl mx-auto px-4 pb-16">
          <SleepCalculator />
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-[#16213e] py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-12">
            The Science of Sleep Cycles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">90-Minute Cycles</h3>
              <p className="text-[#f1faee]/70 text-sm">
                Your brain cycles through light sleep, deep sleep, and REM roughly every 90 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">Wake Between Cycles</h3>
              <p className="text-[#f1faee]/70 text-sm">
                Waking at the end of a cycle (not mid-cycle) is the key to feeling refreshed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😴</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">14 Min to Fall Asleep</h3>
              <p className="text-[#f1faee]/70 text-sm">
                We account for the average 14 minutes it takes to fall asleep in our calculations.
              </p>
            </div>
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
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

export default App
