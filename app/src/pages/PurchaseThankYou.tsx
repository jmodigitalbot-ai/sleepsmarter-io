import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export default function PurchaseThankYou() {
  // TODO: Replace with actual SamCart checkout URL for Sleep Smarter Insider
  const insiderCheckoutUrl = "#insider-checkout"

  useEffect(() => {
    // Fire GA4 purchase confirmation event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase_complete', {
        event_category: 'funnel',
        event_label: 'post_purchase_thank_you',
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Minimal Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">

        {/* ============================================ */}
        {/* SECTION 1: Purchase Confirmation              */}
        {/* ============================================ */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center mb-12">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 mb-3">
            You're In! Your Purchase is Confirmed.
          </h1>
          <p className="text-[#f1faee]/70 mb-4">
            Check your inbox — your access details are on the way.
            If you don't see the email within 5 minutes, check your spam folder.
          </p>
          <p className="text-[#f1faee]/50 text-sm">
            Order confirmation has been sent to your email address.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: What Happens Next                  */}
        {/* ============================================ */}
        <div className="mb-12 space-y-4">
          <h2 className="text-xl font-bold text-[#f1faee] mb-4">Here's what happens next:</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
              <div className="flex-shrink-0 w-8 h-8 bg-[#a8dadc] rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-sm">1</div>
              <div>
                <p className="text-[#f1faee] font-semibold">Check your email</p>
                <p className="text-[#f1faee]/60 text-sm">You'll receive access links and download instructions within the next few minutes.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
              <div className="flex-shrink-0 w-8 h-8 bg-[#a8dadc] rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-sm">2</div>
              <div>
                <p className="text-[#f1faee] font-semibold">Download your materials</p>
                <p className="text-[#f1faee]/60 text-sm">Save everything to your device so you can access it offline, anytime.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
              <div className="flex-shrink-0 w-8 h-8 bg-[#a8dadc] rounded-full flex items-center justify-center text-[#1a1a2e] font-bold text-sm">3</div>
              <div>
                <p className="text-[#f1faee] font-semibold">Start tonight</p>
                <p className="text-[#f1faee]/60 text-sm">Don't wait for Monday. The best time to start improving your sleep is today.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: Transition to Insider Pitch        */}
        {/* ============================================ */}
        <div className="mb-12 space-y-5 text-lg leading-relaxed">
          <p className="text-[#f1faee]/80">
            You just made a smart investment in your sleep. The tools you have now will make a real difference.
          </p>
          <p className="text-[#f1faee]/80">
            But here's something I want you to think about:
          </p>
          <p className="text-[#f1faee] font-semibold text-xl">
            Sleep isn't a one-time fix. It's an <span className="text-[#a8dadc]">ongoing practice.</span>
          </p>
          <p className="text-[#f1faee]/80">
            Your body changes. Your stress levels shift. Seasons change your light exposure. 
            Travel disrupts your rhythm. A new job, a new baby, a stressful month — 
            any of these can knock your sleep off track.
          </p>
          <p className="text-[#f1faee]/80">
            The people who maintain great sleep long-term aren't the ones who read one guide and figured it out forever. 
            They're the ones who <strong className="text-[#f1faee]">keep adapting</strong>.
          </p>
          <p className="text-[#f1faee]/80">
            That's why I created something for people like you — people who are serious about sleep, not just curious.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: The Insider Offer                  */}
        {/* ============================================ */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#a8dadc]/30 rounded-2xl p-8 md:p-12 mb-12">
          <div className="text-center mb-10">
            {/* Badge */}
            <div className="inline-block mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#a8dadc]/20 to-[#a8dadc]/5 border-2 border-[#a8dadc]/40 rounded-2xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
                <span className="text-4xl">🌙</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-3">
              Sleep Smarter Insider
            </h2>
            <p className="text-xl text-[#a8dadc]">
              Stay sharp. Stay rested. Every month.
            </p>
          </div>

          {/* What you get */}
          <div className="mb-10 space-y-4">
            <h3 className="text-xl font-bold text-[#f1faee] mb-4">Every month, members get:</h3>
            
            <div className="bg-[#0f0e17]/60 rounded-lg p-5 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">New Sleep Protocols</p>
              <p className="text-[#f1faee]/70 text-sm">Fresh, science-backed strategies you won't find on blogs. Seasonal adjustments, advanced techniques, and emerging research — translated into actionable steps.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-5 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Sleep Tracking Reviews</p>
              <p className="text-[#f1faee]/70 text-sm">Learn to actually read your sleep data. Monthly guides on interpreting patterns, spotting problems early, and making data-driven adjustments.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-5 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">30-Day Challenges</p>
              <p className="text-[#f1faee]/70 text-sm">Structured monthly experiments to push your sleep quality further. Each challenge targets a specific aspect — from dream recall to deep sleep optimization.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-5 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Community Access</p>
              <p className="text-[#f1faee]/70 text-sm">Connect with other sleep optimizers. Share what's working, troubleshoot what isn't, and stay accountable.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-5 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Early Access</p>
              <p className="text-[#f1faee]/70 text-sm">Be the first to get new tools, guides, and programs before they're released to the public.</p>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-sm mb-2">Monthly membership:</p>
            <div className="text-5xl font-bold text-[#a8dadc] mb-1">$19<span className="text-2xl font-normal text-[#f1faee]/40">/mo</span></div>
            <p className="text-[#f1faee]/50 text-sm mb-8">Cancel anytime. No contracts. No commitment.</p>

            <a
              href={insiderCheckoutUrl}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#a8dadc] to-[#6bc5d2] hover:from-[#b8e6ea] hover:to-[#7dd3db] text-[#1a1a2e] font-bold py-4 px-12 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Join Sleep Smarter Insider
            </a>

            <p className="text-[#f1faee]/40 text-sm mt-4">
              Your first 30 days are risk-free. Cancel before renewal if it's not for you.
            </p>
          </div>

          {/* Quick math */}
          <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-6 text-center">
            <p className="text-[#f1faee]/70">
              That's <strong className="text-[#a8dadc]">$0.63/day</strong> — less than half a cup of coffee — 
              for ongoing sleep optimization that compounds every single month.
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: Skip Link                          */}
        {/* ============================================ */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="text-[#f1faee]/40 hover:text-[#f1faee]/60 transition text-sm"
          >
            No thanks, take me to my purchase
          </Link>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-[#f1faee]/40">
          <p className="mb-2">&copy; 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
