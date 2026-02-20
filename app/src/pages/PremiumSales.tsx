import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function PremiumSales() {
  const checkoutUrl = "https://originalitymarketing.mysamcart.com/checkout/90-day-sleep-transformation-program#samcart-slide-open-right"

  // Track sales page view when component mounts
  useEffect(() => {
    trackSalesPageView('/premium', {
      page_title: 'Sleep Smarter Premium - 90-Day Implementation System'
    })
  }, [])

  // Handler for checkout button clicks
  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation, 'premium')
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
            ✨ PREMIUM IMPLEMENTATION SYSTEM | 90-Day Action Plan
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
            From Knowledge to Action: Your Complete Sleep Implementation Toolkit
          </h1>
          <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            The Masterclass teaches you WHAT to do. Premium gives you the TOOLS to actually DO it. A complete implementation system with structured guidance and automated accountability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="text-[#f1faee]/60">Includes $67 Masterclass +</span>
            <span className="text-[#a8dadc] font-bold">$376 in implementation tools</span>
          </div>
          <a
            href={checkoutUrl}
            onClick={() => handleCheckoutClick('Start My 90-Day Implementation — $197', 'hero')}
            className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
          >
            Start My 90-Day Implementation — $197
          </a>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: THE PREMIUM DIFFERENCE */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Why This Isn't "Just Another Information Product"
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Complete Implementation Tools Suite</h3>
              <p className="text-[#f1faee]/70 mb-3">
                While the Masterclass gives you knowledge, Premium provides the exact tools you need to implement: checklists, worksheets, calculators, and decision guides.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Sleep Environment Audit Checklist</li>
                <li>• Circadian Rhythm Mapping Worksheet</li>
                <li>• Sleep Debt Recovery Calculator</li>
                <li>• Supplement Decision Guide</li>
                <li>• Wind-Down Routine Builder</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🗺️</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Structured 90-Day Roadmap</h3>
              <p className="text-[#f1faee]/70 mb-3">
                No more guessing what to do next. Week-by-week action plan that takes you from Foundation to Optimization to Mastery with clear, actionable steps.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Week-by-week action plan PDF</li>
                <li>• Foundation → Optimization → Mastery phases</li>
                <li>• Specific daily/weekly implementation tasks</li>
                <li>• Progress tracking built-in</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Automated Accountability System</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Weekly email sequence that checks in, provides next week's actions, and adapts by phase. No human needed — just consistent, automated guidance.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• 12 weeks of automated emails</li>
                <li>• Phase-appropriate guidance</li>
                <li>• Progress check-ins</li>
                <li>• Next-week action reminders</li>
              </ul>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🔧</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Troubleshooting & Specialized Guides</h3>
              <p className="text-[#f1faee]/70 mb-3">
                When things don't go as planned, you have specific fixes. Plus specialized protocols for travel, shift work, parenting, and more.
              </p>
              <ul className="space-y-2 text-[#f1faee]/60 text-sm">
                <li>• Common sleep problems with specific fixes</li>
                <li>• Travel Sleep Protocol</li>
                <li>• Shift Work Survival Guide</li>
                <li>• Parent Sleep Guide</li>
              </ul>
            </div>

          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Get The Implementation System — $197', 'difference_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Get The Implementation System — $197
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
                  <td className="text-center py-4 px-2 text-green-400">✓ 6 module PDFs + worksheets</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Includes ALL Masterclass</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Implementation Tools</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Knowledge only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Complete tools suite</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Structure & Guidance</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Self-paced only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ 90-day roadmap + weekly emails</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Troubleshooting</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– General principles</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Specific fixes + specialized guides</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Bonus Materials</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">– Core content only</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ $143 bonus package</td>
                </tr>
                <tr className="border-b border-[#4a4e69]/30">
                  <td className="py-4 px-2 text-[#f1faee]">Format</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ Downloadable PDFs</td>
                  <td className="text-center py-4 px-2 text-green-400">✓ PDFs + automated emails</td>
                </tr>
                <tr>
                  <td className="py-4 px-2 text-[#f1faee]">Outcome Focus</td>
                  <td className="text-center py-4 px-2 text-[#f1faee]/50">Education delivery</td>
                  <td className="text-center py-4 px-2 text-green-400">Implementation system</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[#f1faee] font-semibold text-lg mb-2">
              Premium includes ALL Masterclass content PLUS $376 in implementation tools
            </p>
            <p className="text-[#f1faee]/70">
              You're not paying more for the same information — you're investing in implementation instead of just education.
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: 90-DAY IMPLEMENTATION ROADMAP */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Your 90-Day Implementation Journey
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
                Comprehensive assessment using our Implementation Tools Suite. Establish foundational habits with clear, actionable steps from your roadmap.
              </p>
              <div className="bg-[#0f0e17]/60 p-4 rounded-lg">
                <p className="text-[#a8dadc] font-semibold mb-2">Key Outcomes:</p>
                <ul className="space-y-1 text-[#f1faee]/60 text-sm">
                  <li>• Sleep Environment Audit completed</li>
                  <li>• Circadian Rhythm mapped</li>
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
                Deep sleep optimization using advanced protocols from your roadmap. Integrate sleep improvements into your lifestyle with guided weekly emails.
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
                  <li>• Troubleshooting skills mastered</li>
                  <li>• Sleep mastery achieved</li>
                </ul>
              </div>
            </div>

          </div>

          <div className="text-center mt-10">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Begin My Implementation Journey — $197', 'roadmap_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Begin My Implementation Journey — $197
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: BONUS MATERIALS */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-4 text-center">Your Premium Bonus Package ($143 Value)</h3>
          
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">📓</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Sleep Journal Templates</p>
                  <p className="text-[#f1faee]/60 text-sm">Comprehensive tracking system including daily logs, weekly reflections, and progress tracking.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $27</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🧘</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Meditation & Relaxation Scripts</p>
                  <p className="text-[#f1faee]/60 text-sm">Text-based scripts for sleep onset, anxiety release, and body scan techniques (no audio required).</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $27</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">💊</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Supplement Protocol Guide</p>
                  <p className="text-[#f1faee]/60 text-sm">Evidence-based supplement timing, stack combinations, and quality sourcing guide.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $37</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">✈️</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Travel Sleep Protocol</p>
                  <p className="text-[#f1faee]/60 text-sm">Hotel optimization strategies, jet lag recovery protocols, and travel-friendly sleep gear recommendations.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $17</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌙</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Shift Work Survival Guide</p>
                  <p className="text-[#f1faee]/60 text-sm">Rotating schedule optimization, night shift adaptation protocols, and family coordination strategies.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $17</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border border-[#4a4e69]/30">
              <div className="flex items-start gap-3">
                <div className="text-2xl">👶</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-1">Parent Sleep Guide</p>
                  <p className="text-[#f1faee]/60 text-sm">Baby/toddler sleep optimization combined with parent sleep preservation strategies for the early years.</p>
                  <p className="text-[#f1faee]/40 text-xs mt-2">Value: $18</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Total Bonus Package Value: <span className="text-[#a8dadc] font-bold line-through">$143</span></p>
            <p className="text-[#f1faee] font-semibold text-xl mb-2">Included FREE with your Premium Program enrollment</p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: VALUE STACK */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            The Complete Implementation System
          </h2>
          
          <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Complete Masterclass Content (6 PDFs + worksheets)</span>
                <span className="text-[#f1faee]/60 line-through">$67</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Implementation Tools Suite (5 downloadable tools)</span>
                <span className="text-[#f1faee]/60 line-through">$89</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">90-Day Implementation Roadmap (week-by-week PDF)</span>
                <span className="text-[#f1faee]/60 line-through">$47</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Automated Accountability (12 weeks of emails)</span>
                <span className="text-[#f1faee]/60 line-through">$97</span>
              </div>
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <span className="text-[#f1faee]">Bonus Materials Package (6 specialized guides)</span>
                <span className="text-[#f1faee]/60 line-through">$143</span>
              </div>
              
              <div className="border-t-2 border-[#a8dadc]/50 pt-4 mt-4">
                <div className="flex justify-between items-center py-4 px-6 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                  <span className="text-[#f1faee] font-bold text-xl">TOTAL VALUE</span>
                  <span className="text-[#f1faee] font-bold text-2xl line-through">$443</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Your Investment:</p>
            <div className="text-7xl font-bold text-[#a8dadc] mb-3">$197</div>
            <p className="text-[#f1faee] font-semibold text-xl mb-2">You Save: $246 (55% off)</p>
            <p className="text-[#f1faee]/70">
              Less than $2.20 per day for complete sleep implementation
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: GUARANTEE */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            60-Day "Implementation or Refund" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            If you don't experience measurable improvement in sleep quality, energy levels, and daytime performance within 60 days, we'll refund every penny.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl mb-4">
            No questions asked. No hoops to jump through.
          </p>
          <p className="text-[#f1faee]/70 max-w-2xl mx-auto text-lg">
            We can make this guarantee because we've seen this system work. Follow the roadmap, use the tools, and the results will come.
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
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What format are the materials?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Everything is delivered as downloadable PDFs (checklists, worksheets, guides, roadmaps) plus an automated email sequence that runs for 12 weeks. No videos, no live calls — just actionable content you can use immediately.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">I've tried everything and nothing works. Why would this be different?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Because you've likely tried isolated solutions. This is a complete implementation system that gives you specific tools, a clear roadmap, and automated accountability. Plus, you're protected by our 60-day guarantee.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">Is there ongoing cost after the 90 days?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                No. One-time payment, lifetime access to all PDFs and tools. The automated accountability emails run for 12 weeks automatically. No subscriptions, no hidden fees.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if I travel frequently or have an irregular schedule?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                We include specific protocols for travel, shift work, and irregular hours. The roadmap adapts to your schedule, and the tools work regardless of when you sleep.
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
              Your 90-Day Sleep Implementation Starts Now
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              Imagine 90 days from now: Waking up naturally, refreshed, before your alarm. No grogginess. No caffeine dependency. Just clear, sustained energy from morning until evening.
            </p>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Start My Implementation — $197', 'final_cta')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Start My Implementation — $197
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