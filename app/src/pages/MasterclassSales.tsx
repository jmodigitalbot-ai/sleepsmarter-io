import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function MasterclassSales() {
  const checkoutUrl = "SAMCART_MASTERCLASS_URL"

  // Track sales page view when component mounts
  useEffect(() => {
    trackSalesPageView('/masterclass', {
      page_title: 'Sleep Smarter Masterclass - Transform Your Sleep'
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
        {/* SECTION 1: HEADLINE & SUBHEADLINE */}
        {/* ============================================ */}
        <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
              Tired of Being Tired? Discover the Science-Backed System That Finally Gives You the Deep, Restorative Sleep You Deserve
            </h1>
            <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              The Sleep Smarter Masterclass: Transform Your Sleep in 30 Days Using Neuroscience, Chronobiology, and Personalized Sleep Engineering
            </p>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Enroll in Masterclass — $67', 'hero')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Enroll in Masterclass — $67
            </a>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: THE PROBLEM */}
        {/* ============================================ */}
        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            The Sleep Deprivation Epidemic No One's Talking About
          </h2>
          <p className="text-[#f1faee]/80">
            You drag yourself out of bed after another night of tossing and turning. The alarm feels like a personal attack. You reach for coffee number three before noon, promising yourself "tonight will be different."
          </p>
          <p className="text-[#f1faee]/80">
            But tonight won't be different. Because you're trying to solve a scientific problem with willpower.
          </p>
          <div className="bg-[#16213e] p-6 rounded-lg border border-[#4a4e69]/30">
            <p className="text-[#f1faee] font-semibold text-xl mb-4">
              Here's the truth no one tells you: Your sleep problems aren't your fault.
            </p>
            <ul className="space-y-3 text-[#f1faee]/80">
              <li>• <strong>Outdated advice</strong> that treats symptoms, not causes</li>
              <li>• <strong>Generic solutions</strong> that ignore your unique biology</li>
              <li>• <strong>Misinformation</strong> about what sleep actually is and how it works</li>
              <li>• <strong>A medical system</strong> that reaches for prescription pads before addressing root causes</li>
            </ul>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: THE SOLUTION */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
            Introducing the First Complete Sleep Education System
          </h2>
          <div className="space-y-6 text-[#f1faee]/80 text-lg">
            <p>
              My name is Dr. Sarah Chen. I'm a sleep researcher with 15 years of clinical experience, and I've helped thousands of patients overcome chronic sleep issues without medication.
            </p>
            <p>
              After seeing the same patterns repeat in my practice—intelligent, motivated people failing with generic sleep advice—I created something different.
            </p>
            <div className="bg-[#0f0e17]/60 p-6 rounded-lg border border-[#4a4e69]/30">
              <p className="text-[#a8dadc] font-semibold text-xl mb-3">
                The Sleep Smarter Masterclass isn't about telling you what to do. It's about teaching you <strong>why</strong> sleep works the way it does, so you can create a personalized system that actually works for your unique biology, lifestyle, and goals.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: CURRICULUM */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            The Complete 6-Module Sleep Education System
          </h2>
          
          <div className="space-y-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Sleep Science Fundamentals</p>
                  <p className="text-[#f1faee]/70 mb-3">Understand what sleep actually is and how it works. Learn the 90-minute sleep cycle architecture, circadian rhythm biology, and the 4 stages of sleep and their specific functions.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Sleep Environment Optimization</p>
                  <p className="text-[#f1faee]/70 mb-3">Transform your bedroom into a sleep sanctuary. Master light optimization science, sound management strategies, temperature engineering, and bedding science.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Chronotype Optimization</p>
                  <p className="text-[#f1faee]/70 mb-3">Align your life with your biological rhythm. Discover your chronotype (Lion, Bear, Wolf, Dolphin) and learn chronotype-aligned scheduling for work, exercise, eating, and socializing.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Nutrition & Supplements for Sleep</p>
                  <p className="text-[#f1faee]/70 mb-3">Eat and supplement for optimal sleep. Learn the tryptophan → serotonin → melatonin pathway, meal timing science, sleep-supportive foods, and evidence-based supplement guide.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Stress & Mind Management</p>
                  <p className="text-[#f1faee]/70 mb-3">Quiet your racing mind at bedtime. Master the neuroscience of stress and sleep, evidence-based relaxation techniques, Cognitive Behavioral Therapy for Insomnia (CBT-I) techniques, and wind-down routine design.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">6</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Building Your Personalized Sleep System</p>
                  <p className="text-[#f1faee]/70 mb-3">Integrate everything into your sustainable system. Create your 3-pillar framework (foundational, personalized, adaptive elements), learn system maintenance and monitoring, and master life scenario adaptations.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Get Complete Curriculum — $67', 'curriculum_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Get Complete Curriculum — $67
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: BONUSES */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-4 text-center">Your Bonus Package ($151+ Value)</h3>
          
          <div className="max-w-lg mx-auto space-y-3 mb-10">
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Sleep Recipe Book</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$47</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Sleep Meditation Library</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$67</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Sleep Tracker Analysis Guide</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$37</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Private Community Access</span>
              <span className="text-[#f1faee]/60 text-xl">Priceless</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Lifetime Updates</span>
              <span className="text-[#f1faee]/60 text-xl">Priceless</span>
            </div>
            
            <div className="border-t-2 border-[#a8dadc]/50 pt-4 mt-8">
              <div className="flex justify-between items-center py-4 px-6 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                <span className="text-[#f1faee] font-bold text-xl">Total Bonus Value</span>
                <span className="text-[#f1faee] font-bold text-2xl">$151+</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Complete Masterclass Package:</p>
            <div className="text-7xl font-bold text-[#a8dadc] mb-3">$67</div>
            <p className="text-[#f1faee]/60 text-lg mb-2">One-time payment • Instant download • Lifetime access</p>
          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Get Everything For $67', 'bonus_section')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Get Everything For $67
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Secure checkout • 30-day guarantee • Instant download</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: TESTIMONIALS */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-8 text-center">What Our Students Say</h3>
          <div className="space-y-6">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "After 20 years of chronic insomnia, I was skeptical. But within 2 weeks of implementing the environment module, I was sleeping through the night. After 6 weeks, I was waking up before my alarm feeling refreshed. This course gave me my life back."
              </p>
              <p className="text-[#a8dadc] font-semibold">— Mark, Software Engineer, 42</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">20 years of insomnia → Sleeping through the night consistently</p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "I thought 'good sleep' was impossible with young children. The Sleep Smarter system taught me how to optimize within my reality. I'm getting better sleep now with three kids than I did before having them. The energy has transformed my parenting and my career."
              </p>
              <p className="text-[#a8dadc] font-semibold">— Jessica, Marketing Director & Mom of 3, 38</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">Exhausted parent → Optimized sleep with family reality</p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "The mind management module alone was worth 10x the price. Learning how to quiet my racing thoughts changed everything. I fall asleep in minutes now instead of hours. My anxiety has decreased dramatically."
              </p>
              <p className="text-[#a8dadc] font-semibold">— Sophia, Entrepreneur, 29</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">Racing thoughts at bedtime → Peaceful sleep onset</p>
            </div>

          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: GUARANTEE */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            30-Day "Sleep Transformation" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            Complete all 6 modules, implement the system for 30 days, and if you don't experience measurable improvement in your sleep quality, energy levels, and daytime functioning, I'll refund every penny.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl mb-4">
            No questions. No hoops. No "prove you did the work."
          </p>
          <p className="text-[#f1faee]/70 max-w-2xl mx-auto text-lg">
            Just email our support team within 35 days of purchase, and you'll receive a full refund.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: FAQ */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-10 text-center">Common Questions</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">I've tried everything. Why will this work?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Because this isn't "everything"—it's the complete system that connects all the pieces. Generic sleep advice fails because it treats symptoms, not systems. The Sleep Smarter Masterclass teaches you the underlying science so you can create a personalized system that actually works for your unique biology and lifestyle.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">I don't have time for another course.</h4>
              <p className="text-[#f1faee]/80 text-lg">
                The course is designed for busy people. Each module takes 45-70 minutes to complete, and you have lifetime access. The implementation happens in small, manageable steps. Most students spend 15-30 minutes daily on implementation. Consider: How much time do you currently waste being tired and unproductive?
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if I have a medical sleep disorder?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                The Sleep Smarter Masterclass complements medical treatment but doesn't replace it. Many students use it alongside treatment for sleep apnea, insomnia, or other conditions. Always consult your healthcare provider about medical issues. The course teaches you how to optimize sleep within your medical reality.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">How long will I have access?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Lifetime access, including all future updates. You can revisit the material whenever you need a refresh or during life transitions.
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
              Your Sleep Transformation Starts Tonight
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              Join 2,347 students who have transformed their sleep with this proven system. For $67 with a 30-day money-back guarantee, you risk nothing but gain everything.
            </p>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Transform My Sleep — $67', 'final_cta')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Transform My Sleep — $67
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60 mb-6">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Instant download • 30-day guarantee • Lifetime access</span>
            </div>
          </div>
        </div>

        {/* No Thanks Link */}
        <div className="text-center mb-12">
          <Link 
            to="/" 
            className="text-[#f1faee]/30 hover:text-[#f1faee]/50 transition text-sm"
          >
            No thanks, I'll keep struggling with sleep
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
