import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { trackPageView } from '../../lib/analytics'

export default function SleepProductsLanding() {
  useEffect(() => {
    // Track landing page view
    trackPageView('/lp/sleep-products', 'Best Sleep Products - Expert Reviews & Recommendations')
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-4">
          <span className="text-4xl">🛏️</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#f1faee] mb-4">
          The Best Sleep Products of 2026:{' '}
          <span className="text-[#a8dadc]">Expert Reviews</span>
        </h1>
        <p className="text-lg md:text-xl text-[#f1faee]/70 max-w-3xl mx-auto mb-6">
          After testing dozens of sleep products, these 3 consistently deliver better sleep quality, 
          faster sleep onset, and more restful nights.
        </p>
        <p className="text-sm text-[#f1faee]/50 max-w-2xl mx-auto mb-8">
          Independent reviews • No sponsored rankings • Based on sleep science
        </p>
      </section>

      {/* FTC Disclosure - Prominent */}
      <section className="max-w-4xl mx-auto px-4 mb-8">
        <div className="bg-[#16213e] border border-[#4a4e69]/50 rounded-lg p-4 text-center">
          <p className="text-[#f1faee]/60 text-sm">
            <strong className="text-[#a8dadc]">Affiliate Disclosure:</strong> We may earn a commission 
            when you purchase through our links at no extra cost to you. This helps us provide free content. 
            <Link to="/disclosure" className="text-[#a8dadc] hover:underline ml-1">
              Full disclosure here.
            </Link>
          </p>
        </div>
      </section>

      {/* Product Comparison */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-8">
          Top 3 Sleep Products That Actually Work
        </h2>

        <div className="space-y-8">
          {/* #1 Premium Mattress */}
          <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 border-2 border-[#a8dadc]/50 relative">
            {/* Best Overall Badge */}
            <div className="absolute -top-3 left-6">
              <span className="bg-[#a8dadc] text-[#1a1a2e] text-sm font-bold px-4 py-1 rounded-full">
                🏆 Best Overall
              </span>
            </div>
            
            <div className="pt-3">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#f1faee] mb-2">
                    Airpedic Adjustable Firmness Mattress
                  </h3>
                  <p className="text-[#a8dadc] font-semibold mb-3">$1,400 - $4,700</p>
                  
                  <p className="text-[#f1faee]/70 mb-4">
                    The only mattress that lets you adjust firmness on each side independently. 
                    Perfect for couples with different preferences or anyone whose needs change.
                  </p>

                  {/* Key Features */}
                  <div className="grid md:grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <span className="text-[#a8dadc] text-sm">✓</span>
                      <span className="text-[#f1faee]/80 text-sm">Adjustable firmness zones</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#a8dadc] text-sm">✓</span>
                      <span className="text-[#f1faee]/80 text-sm">Orthopedic support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#a8dadc] text-sm">✓</span>
                      <span className="text-[#f1faee]/80 text-sm">90-night trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#a8dadc] text-sm">✓</span>
                      <span className="text-[#f1faee]/80 text-sm">25-year warranty</span>
                    </div>
                  </div>

                  {/* Why We Love It */}
                  <div className="bg-[#1a1a2e] rounded-lg p-4 mb-4">
                    <h4 className="text-[#a8dadc] font-semibold text-sm mb-2">WHY WE CHOSE THIS:</h4>
                    <p className="text-[#f1faee]/70 text-sm">
                      Most people's sleep preferences change over time, but mattresses don't. 
                      Airpedic solves this with dual-zone adjustability — no more compromise.
                    </p>
                  </div>

                  <a
                    href="https://tidd.ly/4tGgRKl"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-8 py-4 rounded-lg transition group text-lg"
                  >
                    Check Current Prices
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* #2 White Noise Machine */}
          <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 border border-[#4a4e69]/30">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="inline-block bg-[#4a4e69] text-[#f1faee] text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Best White Noise
                </div>
                
                <h3 className="text-2xl font-bold text-[#f1faee] mb-2">
                  Marpac Dohm Classic White Noise Machine
                </h3>
                <p className="text-[#a8dadc] font-semibold mb-3">$50 - $60</p>
                
                <p className="text-[#f1faee]/70 mb-4">
                  The original white noise machine used in hospitals and hotels worldwide. 
                  Real fan-based sound, not digital loops that your brain learns to ignore.
                </p>

                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Real fan sound</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Adjustable tone & volume</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Compact & portable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">1-year warranty</span>
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-lg p-4 mb-4">
                  <h4 className="text-[#a8dadc] font-semibold text-sm mb-2">WHY WE CHOSE THIS:</h4>
                  <p className="text-[#f1faee]/70 text-sm">
                    Digital white noise machines create predictable loops. Your brain adapts and 
                    they become less effective. Dohm's real fan creates truly random sound.
                  </p>
                </div>

                <a
                  href="https://www.amazon.com/dp/B000KUHFGM?tag=19830c0a-20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4a4e69] hover:bg-[#4a4e69]/90 text-[#f1faee] font-semibold px-6 py-3 rounded-lg transition group"
                >
                  View on Amazon
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* #3 Silk Bedding */}
          <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 border border-[#4a4e69]/30">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="inline-block bg-[#4a4e69] text-[#f1faee] text-sm font-bold px-3 py-1 rounded-full mb-3">
                  Best Bedding
                </div>
                
                <h3 className="text-2xl font-bold text-[#f1faee] mb-2">
                  Promeed Luxgen Silk Pillowcase
                </h3>
                <p className="text-[#a8dadc] font-semibold mb-3">$30 - $80</p>
                
                <p className="text-[#f1faee]/70 mb-4">
                  Temperature-regulating silk that keeps you cool in summer, warm in winter. 
                  Naturally hypoallergenic and gentler on skin and hair.
                </p>

                <div className="grid md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Temperature regulating</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">OEKO-TEX certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Hypoallergenic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#a8dadc] text-sm">✓</span>
                    <span className="text-[#f1faee]/80 text-sm">Machine washable</span>
                  </div>
                </div>

                <div className="bg-[#1a1a2e] rounded-lg p-4 mb-4">
                  <h4 className="text-[#a8dadc] font-semibold text-sm mb-2">WHY WE CHOSE THIS:</h4>
                  <p className="text-[#f1faee]/70 text-sm">
                    Temperature regulation is crucial for deep sleep. Cotton traps heat and moisture. 
                    Silk naturally wicks away sweat while staying comfortable.
                  </p>
                </div>

                <a
                  href="https://tidd.ly/4and0sV"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#4a4e69] hover:bg-[#4a4e69]/90 text-[#f1faee] font-semibold px-6 py-3 rounded-lg transition group"
                >
                  Shop Silk Pillowcases
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Our Reviews */}
      <section className="bg-[#16213e] py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-8">
            How We Test Sleep Products
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">Sleep Science First</h3>
              <p className="text-[#f1faee]/70 text-sm">
                We evaluate products based on sleep research, not marketing claims. 
                Does it actually improve sleep quality?
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">Real User Data</h3>
              <p className="text-[#f1faee]/70 text-sm">
                We analyze thousands of verified reviews and ratings to identify 
                patterns in user experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#4a4e69] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">No Sponsored Rankings</h3>
              <p className="text-[#f1faee]/70 text-sm">
                Our rankings are based on product effectiveness, not which companies 
                pay us the highest commissions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-[#16213e] rounded-2xl p-8 border border-[#4a4e69]/30">
          <h2 className="text-2xl font-bold text-[#f1faee] mb-4">
            Want More Sleep Optimization Tips?
          </h2>
          <p className="text-[#f1faee]/70 mb-6">
            Products are just one piece of the puzzle. Get our complete sleep optimization guide 
            with personalized schedules, techniques, and product recommendations.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition"
          >
            Get Free Sleep Calculator →
          </Link>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Independent sleep product reviews.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms of Service</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Affiliate Disclosure</Link>
          </div>
          <div className="mt-4 text-xs text-[#f1faee]/30">
            <p>JMO Digital Assets, LLC | This site provides educational content and is not medical advice.</p>
            <p className="mt-1">As an Amazon Associate, we earn from qualifying purchases.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}