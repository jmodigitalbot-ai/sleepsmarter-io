import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import SleepCalculator from '../../components/SleepCalculator'
import { trackPageView } from '../../lib/analytics'

export default function SleepCalculatorLanding() {
  useEffect(() => {
    // Track landing page view
    trackPageView('/lp/sleep-calculator', 'Sleep Calculator - Free Sleep Cycle Calculator')
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-4">
          <span className="text-4xl">😴</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#f1faee] mb-4">
          Stop Waking Up Tired.{' '}
          <span className="text-[#a8dadc]">Calculate Perfect Sleep Times.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#f1faee]/70 max-w-2xl mx-auto mb-8">
          Find your ideal bedtime or wake-up time based on natural 90-minute sleep cycles. 
          Wake up refreshed instead of groggy — every single morning.
        </p>
        
        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#f1faee]/50 mb-8">
          <span className="flex items-center gap-1">
            <span className="text-[#a8dadc]">✓</span>
            Based on Sleep Science
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#a8dadc]">✓</span>
            100% Free
          </span>
          <span className="flex items-center gap-1">
            <span className="text-[#a8dadc]">✓</span>
            Instant Results
          </span>
        </div>
      </section>

      {/* Calculator */}
      <section className="max-w-2xl mx-auto px-4 pb-12">
        <SleepCalculator />
      </section>

      {/* How It Works Section */}
      <section className="bg-[#16213e] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-8">
            The Science Behind Better Sleep
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">90-Minute Sleep Cycles</h3>
              <p className="text-[#f1faee]/70 text-sm">
                Your brain naturally cycles through light sleep, deep sleep, and REM every 90 minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">Wake Between Cycles</h3>
              <p className="text-[#f1faee]/70 text-sm">
                Waking at cycle transitions (not mid-cycle) is the secret to feeling refreshed.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">😴</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">14-Minute Buffer</h3>
              <p className="text-[#f1faee]/70 text-sm">
                We account for the average time it takes to fall asleep for accurate results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-8">
            What You'll Get
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#16213e] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#a8dadc] mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                Precise Sleep Times
              </h3>
              <p className="text-[#f1faee]/70">
                Get multiple bedtime or wake-up options ranked by sleep quality — 
                optimal, good, or minimum based on complete sleep cycles.
              </p>
            </div>
            <div className="bg-[#16213e] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#a8dadc] mb-3 flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Better Morning Energy
              </h3>
              <p className="text-[#f1faee]/70">
                Stop hitting snooze and feeling groggy. Wake up naturally refreshed 
                by timing your sleep cycles correctly.
              </p>
            </div>
            <div className="bg-[#16213e] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#a8dadc] mb-3 flex items-center gap-2">
                <span className="text-2xl">🧠</span>
                Sharper Mental Focus
              </h3>
              <p className="text-[#f1faee]/70">
                Better sleep timing may support cognitive function, memory, 
                and focus throughout your day.
              </p>
            </div>
            <div className="bg-[#16213e] rounded-xl p-6">
              <h3 className="text-xl font-semibold text-[#a8dadc] mb-3 flex items-center gap-2">
                <span className="text-2xl">⚡</span>
                Long-term Health
              </h3>
              <p className="text-[#f1faee]/70">
                Consistent, quality sleep supports immune function, weight management, 
                and overall physical and mental wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Science-based sleep optimization.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms of Service</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Affiliate Disclosure</Link>
          </div>
          <div className="mt-4 text-xs text-[#f1faee]/30">
            <p>JMO Digital Assets, LLC | This site provides educational content and is not medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}