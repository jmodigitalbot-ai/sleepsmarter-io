import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function PremiumSales() {
  const checkoutUrl = "SAMCART_PREMIUM_URL"

  // Track sales page view when component mounts
  useEffect(() => {
    trackSalesPageView('/premium', {
      page_title: 'Sleep Smarter Premium - 90-Day Transformation'
    })
  }, [])

  // Handler for checkout button clicks
  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation)
    // The link will navigate naturally after tracking
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Minimal Header — no distracting nav */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">

        {/* ============================================ */}
        {/* SECTION 1: HERO SECTION */}
        {/* ============================================ */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-[#a8dadc] to-[#457b9d] text-[#1a1a2e] px-4 py-2 rounded-full text-sm font-bold mb-6">
            ✨ PREMIUM PROGRAM | 90-Day Transformation
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
            From Exhausted to Energized for Life
          </h1>
          <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            The AI-powered, personalized, accountable sleep transformation that turns knowledge into lasting habit change — not just another information product.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-[#f1faee]/60">Includes $67 Masterclass +</span>
            <span className="text-[#a8dadc] font-bold">$1,240 in premium upgrades</span>
          </div>
          <a
            href={checkoutUrl}
            onClick={() => handleCheckoutClick('Start My 90-Day Transformation — $197', 'hero')}
            className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
          >
            Start My 90-Day Transformation — $197
          </a>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: THE PREMIUM DIFFERENCE */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Why This Isn't "Just Another Sleep Program"
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">AI-Powered Personalization</h3>
              <p className="text-[#f1faee]/70 mb-3">
                While the Masterclass gives you general principles, our AI analyzes your unique sleep patterns, lifestyle, and challenges to create a custom transformation roadmap that evolves with your progress.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Daily personalized recommendations</li>
                <li>• Adaptive protocol adjustments</li>
                <li>• Predictive challenge identification</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Weekly Accountability System</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Knowledge without implementation is useless. Our structured accountability framework ensures you actually implement what you learn and track measurable progress.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Weekly progress check-ins</li>
                <li>• Habit streak tracking</li>
                <li>• Personalized feedback & adjustments</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Advanced Optimization Protocols</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Move beyond basic sleep hygiene to cutting-edge sleep optimization used by elite athletes and high performers — personalized to your biology and lifestyle.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Circadian precision tuning</li>
                <li>• Sleep architecture enhancement</li>
                <li>• Biohacking integration protocols</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Transformation Community</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Transform alongside hundreds of others on the same journey. Get support, share wins, and learn from peers who understand exactly what you're going through.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Private member community</li>
                <li>• Weekly live Q&A with Dr. Sarah</li>
                <li>• Accountability partnerships</li>
              </ul>
            </div>

          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Experience The Premium Difference — $197', 'difference_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Experience The Premium Difference — $197
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: COMPARISON TABLE */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6 text-center">
            Masterclass vs. Premium: Crystal Clear Comparison
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-[#4a4e69]/50">
                  <th className="text-left py-4 px-2 text-[#f1faee] font-semibold">Feature</th>
                  <th className="text-center py-4 px-2 text-[#f1faee]/70 font-semibold">$67 Masterclass</th>
                  <th className="text-center py-4 px-2 text-[#a8dadc] font-semibold">$197 Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Core Content</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ 6+ hours video</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Includes ALL Masterclass</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Personalization</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– General principles</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ AI-powered coaching</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Accountability</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Self-paced only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Weekly tracking & feedback</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Advanced Protocols</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Foundational only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Cutting-edge optimization</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Community Support</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Email support only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ 24/7 member community</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Structure</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Lifetime access</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ 90-day transformation roadmap</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 text-[#f1faee]">Outcome Focus</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">Information delivery</td>
                  <td className="text-center py-4 px-2 text-green-400">Transformation system</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#f1faee] font-semibold text-lg mb-2">
              Premium includes ALL Masterclass content PLUS $1,240 in upgrades
            </p>
            <p className="text-[#f1faee]/70">
              You're not paying more for the same information — you're investing in transformation instead of just education.
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: 90-DAY TRANSFORMATION ROADMAP */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Your 90-Day Transformation Journey
          </h2>
          
          <div className="space-y-8">
            
            <div className="bg-gradient-to-r from-[#16213e] to-[#0f0e17] rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <div className="inline-block bg-[#a8dadc]/20 text-[#a8dadc] px-3 py-1 rounded-full text-xs font-bold">
                    PHASE 1: Days 1-30
                  </div>
                  <h3 className="text-xl font-bold text-[#f1faee] mt-2">Foundation & Assessment</h3>
                </div>
              </div>
              <p className="text-[#f1faee]/70 mb-4">
                Comprehensive assessment, AI profile creation, and foundational habit establishment. Your personalized transformation blueprint is created.
              </p>
              <div className="bg-[#0f0e17]/60 p-4 rounded-lg">
                <p className="text-[#a8dadc] font-semibold mb-2">Key Outcomes:</p>
                <ul className="space-y-1 text-[#f1faee]/60 text-sm">
                  <li>• Personalized sleep assessment completed</li>
                  <li>• AI-powered transformation roadmap created</li>
                  <li>• Foundational sleep habits established</li>
                  <li>• First measurable improvements experienced</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#16213e] to-[#0f0e17] rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <div className="inline-block bg-[#a8dadc]/20 text-[#a8dadc] px-3 py-1 rounded-full text-xs font-bold">
                    PHASE 2: Days 31-60
                  </div>
                  <h3 className="text-xl font-bold text-[#f1faee] mt-2">Optimization & Integration</h3>
                </div>
              </div>
              <p className="text-[#f1faee]/70 mb-4">
                Deep sleep optimization, lifestyle integration, and advanced protocol implementation. This is where transformation accelerates.
              </p>
              <div className="bg-[#0f0e17]/60 p-4 rounded-lg">
                <p className="text-[#a8dadc] font-semibold mb-2">Key Outcomes:</p>
                <ul className="space-y-1 text-[#f1faee]/60 text-sm">
                  <li>• Advanced sleep optimization implemented</li>
                  <li>• Lifestyle integration mastered</li>
                  <li>• Sleep architecture significantly improved</li>
                  <li>• Energy levels transformed</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#16213e] to-[#0f0e17] rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <div className="inline-block bg-[#a8dadc]/20 text-[#a8dadc] px-3 py-1 rounded-full text-xs font-bold">
                    PHASE 3: Days 61-90
                  </div>
                  <h3 className="text-xl font-bold text-[#f1faee] mt-2">Mastery & Sustainability</h3>
                </div>
              </div>
              <p className="text-[#f1faee]/70 mb-4">
                Habit automation, long-term sustainability planning, and graduation to sleep mastery. Your transformation becomes permanent.
              </p>
              <div className="bg-[#0f0e17]/60 p-4 rounded-lg">
                <p className="text-[#a8dadc] font-semibold mb-2">Key Outcomes:</p>
                <ul className="space-y-1 text-[#f1faee]/60 text-sm">
                  <li>• Sleep habits fully automated</li>
                  <li>• Long-term maintenance system established</li>
                  <li>• Sleep mastery certification achieved</li>
                  <li>• Alumni community access granted</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="text-center mt-10">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Begin My Transformation Journey — $197', 'roadmap_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Begin My Transformation Journey — $197
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: BONUS MATERIALS */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-4 text-center">Your Premium Bonus Package ($352+ Value)</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📓</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Sleep Journal Templates</p>
                  <p className="text-[#f1faee]/60 text-sm">Comprehensive tracking system including daily logs, weekly reflections, dream analysis, and environment audits.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $47</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧘</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Meditation & Relaxation Scripts</p>
                  <p className="text-[#f1faee]/60 text-sm">Guided audio scripts for sleep onset, middle-of-night returns, anxiety release, and body scan mastery.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $67</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💊</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Supplement Guide & Protocol</p>
                  <p className="text-[#f1faee]/60 text-sm">Evidence-based supplement timing, stack combinations, quality sourcing guide, and budget-friendly alternatives.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $97</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✈️</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Travel Sleep Protocol</p>
                  <p className="text-[#f1faee]/60 text-sm">Hotel optimization strategies, jet lag recovery protocols, and travel-friendly sleep gear recommendations.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $37</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌙</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Shift Work Survival Guide</p>
                  <p className="text-[#f1faee]/60 text-sm">Rotating schedule optimization, night shift adaptation protocols, and family coordination strategies.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $47</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">👶</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Parent Sleep Guide</p>
                  <p className="text-[#f1faee]/60 text-sm">Baby/toddler sleep optimization combined with parent sleep preservation strategies for the early years.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $57</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Total Bonus Package Value: <span className="text-[#a8dadc] font-bold line-through">$352</span></p>
            <p className="text-[#f1faee] font-semibold text-xl mb-2">Included FREE with your Premium Program enrollment</p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: VALUE STACK */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            The Complete Transformation System
          </h2>
          
          <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Sleep Smarter Masterclass</span>
                <span className="text-[#f1faee]/60 line-through">$67</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">AI-Powered Coaching System (3 months)</span>
                <span className="text-[#f1faee]/60 line-through">$291</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Weekly Accountability Framework</span>
                <span className="text-[#f1faee]/60 line-through">$611</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Premium Community Access (3 months)</span>
                <span className="text-[#f1faee]/60 line-through">$81</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Bonus Materials Package</span>
                <span className="text-[#f1faee]/60 line-through">$352</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Advanced Protocol Library</span>
                <span className="text-[#f1faee]/60 line-through">$67</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Personalized Roadmap Creation</span>
                <span className="text-[#f1faee]/60 line-through">$47</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Limited Human Coaching Access</span>
                <span className="text-[#f1faee]/60 line-through">$97</span>
              </div>
              
              <div className="border-t-2 border-[#a8dadc]/50 pt-4 mt-4">
                <div className="flex justify-between items-center py-4 px-6 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                  <span className="text-[#f1faee] font-bold text-xl">TOTAL VALUE</span>
                  <span className="text-[#f1faee] font-bold text-2xl line-through">$1,613</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Your Investment:</p>
            <div className="text-7xl font-bold text-[#a8dadc] mb-3">$197</div>
            <p className="text-[#f1faee] font-semibold text-xl mb-2">You Save: $1,416 (88% off)</p>
            <p className="text-[#f1faee]/70">
              Less than $2.20 per day for complete sleep transformation
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: GUARANTEE */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            60-Day "Transformation or Refund" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            If you don't experience measurable improvement in sleep quality, energy levels, and daytime performance within 60 days, we'll refund every penny.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl mb-4">
            No questions asked. No hoops to jump through.
          </p>
          <p className="text-[#f1faee]/70 max-w-2xl mx-auto text-lg">
            We can make this guarantee because we've seen this system work for hundreds of people. The biology doesn't lie.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: FAQ */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-10 text-center">Common Questions</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">How much time does this require each day?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                15-30 minutes of active implementation, plus passive integration into your existing routines. This is designed for busy people — we focus on high-impact changes that integrate seamlessly.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if I travel frequently or have an irregular schedule?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                The AI system adapts to your schedule. We include specific protocols for travel, shift work, and irregular hours. Some of our best success stories come from people with "impossible" schedules.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">I've tried everything and nothing works. Why would this be different?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Because you've likely tried isolated solutions. This is a complete system that addresses sleep holistically — biological, psychological, environmental, and social factors — with personalized adaptation. Plus, you're protected by our 60-day guarantee.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">Is there ongoing cost after the 90 days?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                No. You get lifetime access to all materials and community access for the duration of your active participation. Optional alumni program available but not required.
              </p>
            </div>

          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 9: FINAL CTA */}
        {/* ============================================ */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
              Your 90-Day Sleep Transformation Starts Now
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              Imagine 90 days from now: Waking up naturally, refreshed, before your alarm. No grogginess. No caffeine dependency. Just clear, sustained energy from morning until evening.
            </p>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Start My Transformation — $197', 'final_cta')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Start My Transformation — $197
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60 mb-6">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Secure checkout • 60-day guarantee • Instant access</span>
            </div>
          </div>
        </div>

        {/* No Thanks Link */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="text-[#f1faee]/30 hover:text-[#f1faee]/50 transition text-sm"
          >
            No thanks, I'll keep searching for sleep solutions
          </Link>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/40">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
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
