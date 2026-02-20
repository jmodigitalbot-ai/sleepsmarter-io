import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function InsiderSales() {
  const checkoutUrl = "https://originalitymarketing.mysamcart.com/checkout/sleep-smarter-insider#samcart-slide-open-right"

  // Track sales page view when component mounts
  useEffect(() => {
    trackSalesPageView('/insider', {
      page_title: 'Sleep Smarter Insider Membership'
    })
  }, [])

  // Handler for checkout button clicks
  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation, 'insider')
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
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
            Stop Guessing About Sleep. Start Sleeping Smarter—Every Month.
          </h1>
          <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join the Sleep Smarter Insider Membership and get AI-powered sleep optimization delivered to you monthly. Cancel anytime.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 mb-6">
            <div className="text-5xl font-bold text-[#a8dadc]">$19<span className="text-2xl text-[#f1faee]/60">/month</span></div>
            <div className="flex items-center gap-2 text-[#f1faee]/60">
              <span className="text-green-400">✓</span>
              <span>Cancel anytime • No long-term commitment</span>
            </div>
          </div>
          <a
            href={checkoutUrl}
            onClick={() => handleCheckoutClick('Join Insider Membership — $19/month', 'hero')}
            className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
          >
            Join Insider Membership — $19/month
          </a>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: WHAT YOU GET */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Your AI-Powered Sleep Optimization System — Every Month
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">📘</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Monthly Deep-Dive Guide</h3>
              <p className="text-[#f1faee]/70 mb-3">
                AI-generated comprehensive guide on a sleep topic, delivered as PDF via email on the 1st of each month.
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: $15/month</p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🏷️</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Curated Product Recommendations</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Monthly email with tested/reviewed sleep products with exclusive member discounts.
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: $10/month</p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Member-Only Articles</h3>
              <p className="text-[#f1faee]/70 mb-3">
                2-3 in-depth articles per month delivered via email (AI-generated, quality-controlled).
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: $10/month</p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Seasonal Sleep Protocols</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Quarterly comprehensive guides for daylight saving, summer heat, winter darkness, holiday stress.
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: $5/month</p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Early Access to New Tools</h3>
              <p className="text-[#f1faee]/70 mb-3">
                First access to new calculators and tools we add to sleepsmarter.io.
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: Included</p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-3xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">60-Day Money-Back Guarantee</h3>
              <p className="text-[#f1faee]/70 mb-3">
                Try it risk-free for 60 days. If you're not satisfied, get a full refund.
              </p>
              <p className="text-[#f1faee]/40 text-sm">Value: Priceless</p>
            </div>

          </div>

          <div className="text-center">
            <div className="inline-block bg-[#a8dadc]/10 border-2 border-[#a8dadc]/30 rounded-xl p-6 mb-6">
              <p className="text-[#f1faee] font-bold text-xl mb-2">Total Monthly Value: <span className="line-through">$40+</span></p>
              <p className="text-[#a8dadc] font-bold text-2xl">Your Price: $19/month</p>
              <p className="text-[#f1faee]/60 text-sm mt-2">52% savings • Cancel anytime</p>
            </div>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Get All Benefits — $19/month', 'benefits_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Get All Benefits — $19/month
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: MONTHLY CONTENT FRAMEWORK */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6 text-center">
            What You'll Receive Each Month
          </h2>
          
          <div className="space-y-6">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">1</div>
                <div>
                  <h3 className="text-xl font-bold text-[#f1faee]">Month 1: Sleep Environment Optimization</h3>
                  <p className="text-[#a8dadc] text-sm">"Building Your Sleep Sanctuary" Guide</p>
                </div>
              </div>
              <p className="text-[#f1faee]/70">
                Comprehensive PDF guide covering temperature, light, noise, and comfort optimization. Plus 2 member articles on DIY sleep sanctuary strategies and product recommendations for bedroom upgrades.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">2</div>
                <div>
                  <h3 className="text-xl font-bold text-[#f1faee]">Month 2: Stress & Sleep Connection</h3>
                  <p className="text-[#a8dadc] text-sm">"Calming the Mind for Better Sleep" Guide</p>
                </div>
              </div>
              <p className="text-[#f1faee]/70">
                Deep-dive guide on the stress-sleep cycle with practical wind-down routines. Includes member articles on mindfulness practices and cognitive techniques, plus curated relaxation product recommendations.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">3</div>
                <div>
                  <h3 className="text-xl font-bold text-[#f1faee]">Month 3: Nutrition for Sleep</h3>
                  <p className="text-[#a8dadc] text-sm">"Foods That Fuel Better Sleep" Guide</p>
                </div>
              </div>
              <p className="text-[#f1faee]/70">
                Guide on meal timing, sleep-supportive foods, and supplements. Member articles on evening nutrition strategies and sleep-friendly recipes, plus exclusive discounts on sleep-supportive supplements.
              </p>
            </div>

            <div className="text-center mt-8">
              <p className="text-[#f1faee]/70 mb-4">
                Plus 9 more months of comprehensive sleep education covering exercise timing, digital detox, sleep tracking, power napping, travel optimization, seasonal adjustments, cognitive performance, and annual planning — all delivered via automated email.
              </p>
              <a
                href={checkoutUrl}
                onClick={() => handleCheckoutClick('See Full 12-Month Curriculum — $19/month', 'curriculum_section')}
                className="inline-block bg-gradient-to-r from-[#a8dadc] to-[#457b9d] hover:from-[#457b9d] hover:to-[#1d3557] text-white font-bold py-3 px-6 rounded-xl transition"
              >
                See Full 12-Month Curriculum
              </a>
            </div>

          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: WHAT YOU'LL GET ON DAY 1 */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            What You'll Get Immediately After Joining
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Welcome Email Series</h3>
              <p className="text-[#f1faee]/70">
                Immediate access to our onboarding email series with foundational sleep optimization principles and setup guides.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Current Month's Content</h3>
              <p className="text-[#f1faee]/70">
                Access to the current month's Deep-Dive Guide and all member articles published so far this month.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="text-3xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Product Discounts</h3>
              <p className="text-[#f1faee]/70">
                Immediate access to all current member-exclusive discounts on sleep products we've researched and reviewed.
              </p>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6">
              <div className="text-3xl mb-4">🛠️</div>
              <h3 className="text-xl font-bold text-[#a8dadc] mb-3">Tool Access</h3>
              <p className="text-[#f1faee]/70">
                Full access to all current Sleep Smarter calculators and tools, with early access to new ones as they're released.
              </p>
            </div>

          </div>

          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
            <div className="flex mb-4">
              {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
            </div>
            <p className="text-[#f1faee]/80 italic mb-4 text-lg">
              "The monthly guides are incredibly thorough and practical. I love that everything is automated — no waiting for live sessions. The product recommendations have saved me hundreds on sleep upgrades that actually work."
            </p>
            <p className="text-[#a8dadc] font-semibold">— Michael, Insider Member for 4 months</p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: AFFILIATE TRANSPARENCY */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-6">
            Honest, Automated Value
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            We're transparent about what we can deliver: AI-generated, research-backed content and curated product recommendations — no false promises of human interaction we can't provide.
          </p>
          
          <div className="max-w-2xl mx-auto space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="text-green-400 text-xl mt-1">✓</div>
              <div>
                <p className="text-[#f1faee] font-semibold">AI-Generated, Human-Reviewed Content</p>
                <p className="text-[#f1faee]/70 text-sm">All guides and articles are AI-generated from current research, then quality-controlled for accuracy.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-green-400 text-xl mt-1">✓</div>
              <div>
                <p className="text-[#f1faee] font-semibold">Research-Backed Recommendations</p>
                <p className="text-[#f1faee]/70 text-sm">Every product recommendation includes the science behind why it works.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="text-green-400 text-xl mt-1">✓</div>
              <div>
                <p className="text-[#f1faee] font-semibold">Transparent Affiliate Links</p>
                <p className="text-[#f1faee]/70 text-sm">When you purchase through our links, we may earn a small commission at no extra cost to you. This helps support our automated content creation.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: VALUE COMPARISON */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Compare Your Options
          </h2>
          
          <div className="bg-[#0f0e17]/60 rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <div>
                  <p className="text-[#f1faee] font-semibold">Sleep App Subscription</p>
                  <p className="text-[#f1faee]/60 text-sm">Generic advice, no personalization</p>
                </div>
                <span className="text-[#f1faee]/60">$10-20/month</span>
              </div>
              
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <div>
                  <p className="text-[#f1faee] font-semibold">Sleep Supplements</p>
                  <p className="text-[#f1faee]/60 text-sm">Temporary relief, no education</p>
                </div>
                <span className="text-[#f1faee]/60">$30-50/month</span>
              </div>
              
              <div className="flex justify-between items-center py-3 px-4 bg-[#16213e]/50 rounded-lg">
                <div>
                  <p className="text-[#f1faee] font-semibold">Sleep Coach Consultation</p>
                  <p className="text-[#f1faee]/60 text-sm">One-time session, limited follow-up</p>
                </div>
                <span className="text-[#f1faee]/60">$150-300/session</span>
              </div>
              
              <div className="flex justify-between items-center py-3 px-4 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                <div>
                  <p className="text-[#f1faee] font-bold">Sleep Smarter Insider</p>
                  <p className="text-[#a8dadc] text-sm">Complete education + curated recommendations</p>
                </div>
                <span className="text-[#a8dadc] font-bold text-xl">$19/month</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-[#f1faee]/70">
                For less than the cost of one sleep supplement bottle, you get comprehensive sleep education, curated product recommendations, and ongoing automated guidance.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: CANCELLATION POLICY */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🔓</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            60-Day Money-Back Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            We're so confident you'll find value in the Insider Membership that we offer a full 60-day money-back guarantee.
          </p>
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-3">
              <div className="text-green-400 text-2xl">✓</div>
              <p className="text-[#f1faee]">Full refund within 60 days</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-green-400 text-2xl">✓</div>
              <p className="text-[#f1faee]">No questions asked</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-green-400 text-2xl">✓</div>
              <p className="text-[#f1faee]">Cancel monthly subscription anytime</p>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="text-green-400 text-2xl">✓</div>
              <p className="text-[#f1faee]">No hidden fees or surprise charges</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: FAQ */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-10 text-center">Common Questions</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">When do I get access to the content?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Immediately after signing up! You'll get instant access to the current month's Deep-Dive Guide, all member articles, and product discounts. New content is delivered via email on the 1st of each month.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">Is the content AI-generated?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Yes, all guides and articles are AI-generated from current sleep research and then quality-controlled for accuracy. We're transparent about our automated delivery system.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">Can I access previous months' content?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Yes! Once you're a member, you have access to the entire content library via email archives, including all past Deep-Dive Guides and articles for as long as you remain a member.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">Is this suitable for beginners?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Absolutely! The content is designed to be accessible to everyone, regardless of your current sleep knowledge. We start with foundations and build from there.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if I have a medical sleep condition?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                The Insider Membership is educational, not medical treatment. It complements professional care but doesn't replace it. Always consult your healthcare provider for medical conditions.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">How are product recommendations selected?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                We research and review sleep products, then curate the best options for members. When you purchase through our affiliate links, we may earn a commission at no extra cost to you.
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
              Start Your Automated Sleep Optimization Journey Today
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              Sleep science evolves. Your life changes. With the Insider Membership, you get continuous, automated education and curated recommendations that adapt to your needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-[#a8dadc]">$19</div>
                <div className="text-[#f1faee]/60 text-sm">per month</div>
              </div>
              <div className="text-[#f1faee]/60">vs.</div>
              <div className="text-center">
                <div className="text-3xl font-bold text-[#f1faee] line-through">$40+</div>
                <div className="text-[#f1faee]/60 text-sm">actual value</div>
              </div>
            </div>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Join Sleep Smarter Insiders — $19/month', 'final_cta')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Join Sleep Smarter Insiders — $19/month
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60 mb-6">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Secure checkout • 60-day guarantee • Instant access</span>
            </div>
            <p className="text-[#f1faee]/50 text-sm">
              First billing today, then monthly. Cancel anytime from your account.
            </p>
          </div>
        </div>

        {/* No Thanks Link */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="text-[#f1faee]/30 hover:text-[#f1faee]/50 transition text-sm"
          >
            No thanks, I'll keep guessing about sleep
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