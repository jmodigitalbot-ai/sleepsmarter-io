import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function OTOMasterclass() {
  const checkoutUrl = "SAMCART_OTO_MASTERCLASS_URL"
  const [timeLeft, setTimeLeft] = useState(900) // 15 minutes in seconds

  // Track OTO page view when component mounts
  useEffect(() => {
    trackSalesPageView('/oto/masterclass', {
      page_title: 'Sleep Smarter Masterclass OTO - Complete Your Order'
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
          <div className="inline-flex items-center gap-2 bg-[#e63946]/20 border border-[#e63946]/40 rounded-full px-4 py-2">
            <span className="text-[#e63946] font-bold animate-pulse">⏰</span>
            <span className="text-[#f1faee] font-semibold">Offer expires in:</span>
            <span className="text-2xl font-bold text-[#e63946] font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Main Offer */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
            <span className="text-[#e63946]">Wait!</span> Your order isn't complete...
          </h1>
          <p className="text-xl text-[#f1faee]/80 mb-6">
            You just got the 7-day reset. The Masterclass gives you the <span className="text-[#a8dadc] font-semibold">complete system</span>.
          </p>
        </div>

        {/* Offer Details */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 mb-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="bg-[#a8dadc]/20 p-3 rounded-lg">
              <span className="text-2xl text-[#a8dadc]">🎓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#f1faee] mb-2">Upgrade to the Complete Sleep Smarter Masterclass</h2>
              <p className="text-[#f1faee]/80">
                Get the full neuroscience-backed system that transforms your sleep permanently. 
                The 7-day reset is just the beginning — the Masterclass is the complete solution.
              </p>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="text-[#a8dadc] text-xl">✓</span>
              <span className="text-[#f1faee]">Full 60-day sleep transformation system</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a8dadc] text-xl">✓</span>
              <span className="text-[#f1faee]">Neuroscience-based sleep optimization</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a8dadc] text-xl">✓</span>
              <span className="text-[#f1faee]">Personalized sleep engineering framework</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a8dadc] text-xl">✓</span>
              <span className="text-[#f1faee]">Lifetime access to all updates</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#a8dadc] text-xl">✓</span>
              <span className="text-[#f1faee]">Private community access</span>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2">
                <span className="text-4xl font-bold text-[#f1faee]">$67</span>
                <span className="text-[#f1faee]/60 line-through">$197</span>
                <span className="bg-[#e63946]/20 text-[#e63946] text-sm font-bold px-3 py-1 rounded-full">66% OFF</span>
              </div>
              <p className="text-[#f1faee]/60 text-sm mt-2">One-time payment • No subscription</p>
            </div>

            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Add Masterclass to Order — $67', 'oto-main')}
              className="block w-full bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-6 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
            >
              ✅ YES! Add the Masterclass to My Order — $67
            </a>

            <p className="text-[#f1faee]/60 text-sm mb-6">
              🔒 Secure checkout via SamCart • 60-day money-back guarantee
            </p>
          </div>
        </div>

        {/* Decline Option */}
        <div className="text-center">
          <p className="text-[#f1faee]/70 mb-4">
            No thanks, I just want the 7-day reset protocol
          </p>
          <Link
            to="/thank-you"
            className="inline-block text-[#a8dadc] hover:text-[#f1faee] transition font-medium py-2 px-6 border border-[#4a4e69] rounded-lg hover:border-[#a8dadc]"
          >
            No thanks, just send my protocol
          </Link>
        </div>

        {/* Guarantee */}
        <div className="mt-12 pt-8 border-t border-[#4a4e69]/30 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔒</span>
              <span className="text-[#f1faee]">Secure SSL Checkout</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✓</span>
              <span className="text-[#f1faee]">60-Day Money-Back Guarantee</span>
            </div>
            <div className="hidden md:block text-[#4a4e69]">•</div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💳</span>
              <span className="text-[#f1faee]">Safe & Secure Payment</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}