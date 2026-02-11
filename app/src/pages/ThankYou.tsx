import { Link } from 'react-router-dom'

export default function ThankYou() {
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
            <a href="/#calculator" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Calculator</a>
            <Link to="/blog" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/about" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">About</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Banner */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center mb-12">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-3xl md:text-4xl font-bold text-green-400 mb-4">
            Your Sleep Blueprint is Ready!
          </h1>
          <p className="text-lg text-[#f1faee]/70 mb-6 max-w-2xl mx-auto">
            We've sent your personalized sleep schedule to your email. Download it now and start your journey to better sleep.
          </p>
          <a
            href="/sleep-blueprint.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-4 rounded-xl transition text-lg shadow-lg hover:shadow-xl"
          >
            Download Your Sleep Blueprint →
          </a>
          <p className="text-[#f1faee]/50 text-sm mt-4">
            Check your inbox — we've also sent it to your email.
          </p>
        </div>

        {/* Transition Hook */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
            But here's the thing most people miss...
          </h2>
          <p className="text-lg text-[#f1faee]/70 mb-4">
            A sleep schedule is just <span className="text-[#a8dadc] font-semibold">information</span>.
          </p>
          <p className="text-lg text-[#f1faee]/70 mb-4">
            What you actually need is a <span className="text-[#a8dadc] font-semibold">system</span> — a step-by-step protocol that rewires your sleep habits, fixes your circadian rhythm, and eliminates the root causes of poor sleep.
          </p>
          <p className="text-lg text-[#f1faee]/70">
            That's why we created the <span className="text-[#e63946] font-bold">7-Day Sleep Reset Protocol</span>.
          </p>
        </div>

        {/* Tripwire Offer Section */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="text-center mb-8">
            <span className="inline-block bg-[#e63946]/20 text-[#e63946] font-bold px-4 py-1 rounded-full text-sm mb-4">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
              The 7-Day Sleep Reset Protocol
            </h2>
            <p className="text-xl text-[#a8dadc] mb-6">
              Transform from exhausted to energized in just one week
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div>
              <h3 className="text-xl font-bold text-[#f1faee] mb-6">Here's what you'll get:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span className="text-[#f1faee]/80"><strong>Day-by-Day Action Plan:</strong> Exactly what to do each morning, afternoon, and evening to reset your sleep cycle</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span className="text-[#f1faee]/80"><strong>Circadian Rhythm Fix:</strong> Science-backed methods to sync your internal clock with natural light cycles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span className="text-[#f1faee]/80"><strong>Sleep Environment Overhaul:</strong> Simple changes to your bedroom that double sleep quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span className="text-[#f1faee]/80"><strong>Anxiety & Racing Mind Toolkit:</strong> Techniques to quiet your mind and fall asleep faster</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3 text-xl">✓</span>
                  <span className="text-[#f1faee]/80"><strong>Lifetime Access Updates:</strong> All future improvements and new sleep science added free</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">💎</div>
                <h4 className="text-xl font-bold text-[#f1faee] mb-2">Complete Value Stack</h4>
                <p className="text-[#f1faee]/60 text-sm mb-4">What this would cost separately:</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#f1faee]/70">Sleep Consultation (1 hour)</span>
                  <span className="text-[#f1faee]/70 line-through">$150</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#f1faee]/70">Custom Sleep Plan</span>
                  <span className="text-[#f1faee]/70 line-through">$97</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#f1faee]/70">Sleep Tracking Tools</span>
                  <span className="text-[#f1faee]/70 line-through">$49</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#f1faee]/70">Lifetime Updates</span>
                  <span className="text-[#f1faee]/70 line-through">$197</span>
                </div>
                <div className="border-t border-[#4a4e69]/30 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#f1faee]/70">Total Value</span>
                    <span className="text-[#f1faee]/70 line-through">$493</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-[#a8dadc] mb-2">Just $17</div>
                <p className="text-[#f1faee]/50 text-sm mb-4">One-time payment • Lifetime access</p>
                
                <div className="bg-[#e63946]/10 border border-[#e63946]/30 rounded-lg p-3 mb-4">
                  <p className="text-[#e63946] font-semibold text-sm">
                    ⚠️ This offer is only available right now — after you close this page, it's gone.
                  </p>
                </div>

                <a
                  href="https://cart.sleepsmarter.io/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week"
                  className="block w-full bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-6 rounded-xl transition text-lg shadow-lg hover:shadow-xl mb-4"
                >
                  Get the 7-Day Protocol — Just $17
                </a>

                <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/50">
                  <span className="text-green-400">✓</span>
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* No Thanks Link */}
          <div className="text-center pt-6 border-t border-[#4a4e69]/30">
            <Link 
              to="/blog" 
              className="text-[#f1faee]/50 hover:text-[#f1faee]/70 transition text-sm"
            >
              No thanks, I'll just use the free blueprint
            </Link>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-6 text-center">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">What if it doesn't work for me?</h4>
              <p className="text-[#f1faee]/70">
                You're protected by our 30-day money-back guarantee. If you follow the protocol for 7 days and don't see improvement in your sleep quality, just email us for a full refund.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">How is this different from the free blueprint?</h4>
              <p className="text-[#f1faee]/70">
                The free blueprint gives you a schedule. The 7-Day Protocol gives you a complete system with daily actions, mindset shifts, environment changes, and science-backed techniques that actually fix your sleep at the root cause level.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">Do I need any special equipment?</h4>
              <p className="text-[#f1faee]/70">
                No special equipment needed. The protocol uses what you already have at home. We focus on behavioral changes and simple environmental tweaks that make the biggest difference.
              </p>
            </div>
          </div>
        </div>
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