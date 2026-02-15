import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function OTOInsider() {
  const checkoutUrl = "SAMCART_OTO_INSIDER_URL"
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

  // Track OTO page view when component mounts
  useEffect(() => {
    trackSalesPageView('/oto/insider', {
      page_title: 'Sleep Smarter Insider Membership OTO'
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
          <div className="inline-flex items-center gap-2 bg-[#4a4e69]/30 border border-[#4a4e69]/50 rounded-full px-4 py-2">
            <span className="text-[#a8dadc] font-bold">📧</span>
            <span className="text-[#f1faee] font-semibold">Special offer expires in:</span>
            <span className="text-2xl font-bold text-[#a8dadc] font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Main Offer */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
            Stay Connected & Keep Improving
          </h1>
          <p className="text-xl text-[#f1faee]/80 mb-6">
            The <span className="text-[#a8dadc]">Sleep Smarter Insider Membership</span> — fresh content every month
          </p>
        </div>

        {/* Offer Details */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#a8dadc]/20 p-3 rounded-lg">
              <span className="text-2xl text-[#a8dadc]">📧</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#f1faee] mb-2">Your Monthly Sleep Upgrade</h2>
              <p className="text-[#f1faee]/80">
                Sleep optimization is a journey. Stay connected with fresh, actionable content delivered straight to your inbox every month.
              </p>
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">📚</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Monthly Deep-Dive Guide</h3>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                Comprehensive PDF guide on a sleep topic delivered on the 1st of each month. Go deeper into sleep science, techniques, and optimization strategies.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🛒</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Curated Product Recommendations</h3>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                Monthly email with tested sleep products and member-exclusive deals. We do the research so you get the best gear for better sleep.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">🌤️</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Seasonal Sleep Protocols</h3>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                Quarterly guides for seasonal adjustments — daylight saving, summer heat, winter darkness, and spring allergies. Sleep optimally year-round.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">⚡</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Early Access to New Tools</h3>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                First access to new calculators, trackers, and features on sleepsmarter.io. Test drive our latest sleep optimization tools before anyone else.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 p-5 rounded-lg border border-[#4a4e69]/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-[#a8dadc]/20 p-2 rounded-lg">
                  <span className="text-[#a8dadc] text-xl">📝</span>
                </div>
                <h3 className="text-lg font-bold text-[#f1faee]">Member-Only Articles</h3>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                2-3 in-depth articles per month via email. Advanced sleep science, case studies, and practical optimization techniques you won't find anywhere else.
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-[#f1faee]">$19</span>
                  <span className="text-lg text-[#f1faee]/80">/month</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#f1faee]/60 line-through">$49/month</span>
                  <span className="bg-[#a8dadc]/20 text-[#a8dadc] text-sm font-bold px-3 py-1 rounded-full">61% OFF</span>
                </div>
              </div>
              <p className="text-[#f1faee]/60 text-sm mt-2">Cancel anytime • No long-term commitment</p>
            </div>

            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Join Insider Membership — $19/mo', 'oto-main')}
              className="block w-full bg-gradient-to-r from-[#4a4e69] to-[#3a3e59] hover:from-[#5a5e79] hover:to-[#4a4e69] text-white font-bold py-5 px-6 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
            >
              📧 YES! Join the Insider Membership — $19/month
            </a>

            <div className="bg-[#0f0e17]/40 p-4 rounded-lg border border-[#4a4e69]/30 mb-6">
              <p className="text-[#f1faee] font-semibold mb-2">What you get every month:</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span className="text-[#f1faee]/80">Deep-dive PDF guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span className="text-[#f1faee]/80">Product recommendations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span className="text-[#f1faee]/80">Member-only articles</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#a8dadc]">✓</span>
                  <span className="text-[#f1faee]/80">Early tool access</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/40 p-4 rounded-lg border border-[#4a4e69]/30 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl text-[#a8dadc]">🔄</span>
                <span className="text-[#f1faee] font-semibold">60-Day Money-Back Guarantee</span>
              </div>
              <p className="text-[#f1faee]/80 text-sm">
                If you don't find the monthly content valuable for your sleep journey, email us within 60 days for a full refund. No questions asked.
              </p>
            </div>

            <p className="text-[#f1faee]/60 text-sm">
              🔒 Secure subscription via SamCart • Cancel anytime
            </p>
          </div>
        </div>

        {/* Decline Option */}
        <div className="text-center">
          <p className="text-[#f1faee]/70 mb-4">
            No thanks, I'll continue without the monthly content
          </p>
          <Link
            to="/thank-you"
            className="inline-block text-[#a8dadc] hover:text-[#f1faee] transition font-medium py-2 px-6 border border-[#4a4e69] rounded-lg hover:border-[#a8dadc]"
          >
            No thanks, complete my order
          </Link>
        </div>

        {/* Guarantee */}
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📧</span>
              <span className="text-[#f1faee]">Monthly Content Delivery</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔄</span>
              <span className="text-[#f1faee]">60-Day Guarantee</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-[#f1faee]">Early Tool Access</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}