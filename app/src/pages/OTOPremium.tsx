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
    trackCheckoutClick(buttonText, buttonLocation, 'premium')
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
            You now understand the science. <span className="text-[#a8dadc]">Here's what makes it effortless to implement.</span>
          </h1>
          <p className="text-xl text-[#f1faee]/80 mb-6">
            Masterclass teaches you WHAT to do. Premium gives you the TOOLS to actually DO it.
          </p>
        </div>

        {/* Offer Details */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#a8dadc]/30 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#a8dadc]/20 p-3 rounded-lg">
              <span className="text-2xl text-[#a8dadc]">🚀</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#f1faee] mb-2">Sleep Smarter Premium: The Complete Implementation Toolkit</h2>
              <p className="text-[#f1faee]/80">
                You've learned the system. Now get the tools, roadmap, and automated accountability to implement it in 90 days.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🛠️</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Implementation Tools Suite</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Sleep Environment Audit Checklist</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Circadian Rhythm Mapping Worksheet</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Sleep Debt Recovery Calculator</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Supplement Decision Guide</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Wind-Down Routine Builder</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🗺️</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">90-Day Implementation Roadmap</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Week-by-week action plan PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Exactly what to do and when</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Foundation → Optimization → Mastery</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Not learning — doing</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🤖</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Automated Accountability System</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Weekly email check-ins via Kit</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Next week's actions delivered automatically</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Adapts to your phase</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Keeps you on track for 90 days</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🎯</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Bonus: Troubleshooting Guide</h3>
              </div>
              <ul className="space-y-2 text-[#f1faee]/80 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Common sleep problems & fixes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>When something's not working</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>Look it up, apply the fix</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span>No guesswork, just solutions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-4xl font-bold text-[#f1faee]">$197</span>
                <span className="text-[#f1faee]/60 line-through">$443</span>
                <span className="bg-[#a8dadc]/20 text-[#a8dadc] text-sm font-bold px-3 py-1 rounded-full">55% OFF</span>
              </div>
              <p className="text-[#f1faee]/60 text-sm mt-2">One-time payment • Lifetime access • Honest value: $443</p>
            </div>

            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Upgrade to Premium — $197', 'oto-main')}
              className="block w-full bg-gradient-to-r from-[#a8dadc] to-[#4a9ea0] hover:from-[#b8e6e8] hover:to-[#5aaea0] text-[#1a1a2e] font-bold py-5 px-6 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
            >
              🚀 YES! Give Me the Implementation Tools — $197
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
              <span className="text-2xl">🛠️</span>
              <span className="text-[#f1faee]">Implementation Tools Suite</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🗺️</span>
              <span className="text-[#f1faee]">90-Day Roadmap</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <span className="text-[#f1faee]">Automated Accountability</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}