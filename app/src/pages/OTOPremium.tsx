import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function OTOPremium() {
  const checkoutUrl = "SAMCART_OTO_PREMIUM_URL"
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes in seconds

  // Track OTO page view when component mounts
  useEffect(() => {
    trackSalesPageView('/oto/premium', {
      page_title: 'Sleep Smarter Premium OTO - Upgrade Your Order'
    })
  }, [])

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  // Handler for checkout button clicks
  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation)
    // The link will navigate naturally after tracking
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Minimal Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Urgency Timer */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#a8dadc]/20 border border-[#a8dadc]/40 rounded-full px-4 py-2">
            <span className="text-[#a8dadc] font-bold">⚡</span>
            <span className="text-[#f1faee] font-semibold">Exclusive upgrade expires in:</span>
            <span className="text-2xl font-bold text-[#a8dadc] font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Main Offer */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
            Upgrade to the <span className="text-[#a8dadc]">Full Implementation System</span>
          </h1>
          <p className="text-xl text-[#f1faee]/80 mb-6">
            Take your sleep transformation to the next level with tools, accountability, and a 90-day roadmap.
          </p>
        </div>

        {/* Offer Details */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#a8dadc]/30 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#a8dadc]/20 p-3 rounded-lg">
              <span className="text-2xl text-[#a8dadc]">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#f1faee] mb-2">Sleep Smarter Premium: The Complete Implementation Package</h2>
              <p className="text-[#f1faee]/80">
                The Masterclass teaches you the system. Premium gives you the tools, accountability, and step-by-step roadmap to actually implement it.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Premium Tools Suite</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Sleep Environment Optimizer</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Circadian Rhythm Tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Sleep Debt Calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Personalized Supplement Guide</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🗺️</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">90-Day Roadmap</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Week-by-week implementation plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Progress tracking dashboard</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Milestone checkpoints</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Adjustment protocols</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🤝</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Automated Accountability</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Weekly check-in reminders</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Progress reporting system</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Personalized feedback loops</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Adaptive goal setting</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Priority Support</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Direct email access to Dr. Chen</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>48-hour response guarantee</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Monthly Q&A sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Implementation troubleshooting</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-4xl font-bold text-[#f1faee]">$197</span>
                <span className="text-[#f1faee]/60 line-through">$497</span>
                <span className="bg-[#a8dadc]/20 text-[#a8dadc] text-sm font-bold px-3 py-1 rounded-full">60% OFF</span>
              </div>
              <p className="text-[#f1faee]/60 text-sm mt-2">One-time payment • Lifetime access</p>
            </div>

            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Upgrade to Premium — $197', 'oto-main')}
              className="block w-full bg-gradient-to-r from-[#a8dadc] to-[#4a9ea0] hover:from-[#b8e6e8] hover:to-[#5aaea0] text-[#1a1a2e] font-bold py-5 px-6 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
            >
              🚀 YES! Upgrade to Premium — $197
            </a>

            <p className="text-[#f1faee]/60 text-sm mb-6">
              🔒 Secure upgrade via SamCart • 60-day money-back guarantee
            </p>
          </div>
        </div>

        {/* Decline Option */}
        <div className="text-center">
          <p className="text-[#f1faee]/70 mb-4">
            No thanks, I'll stick with just the Masterclass
          </p>
          <Link
            to="/oto/insider"
            className="inline-block text-[#a8dadc] hover:text-[#f1faee] transition font-medium py-2 px-6 border border-[#4a4e69] rounded-lg hover:border-[#a8dadc]"
          >
            No thanks, continue with Masterclass only
          </Link>
        </div>

        {/* Guarantee */}
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <span className="text-[#f1faee]">Premium Implementation Tools</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤝</span>
              <span className="text-[#f1faee]">Automated Accountability System</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-[#f1faee]">Priority Direct Support</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}