import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import EmailCapture from '../../components/EmailCapture'
import { trackPageView } from '../../lib/analytics'

export default function SleepTipsLanding() {
  useEffect(() => {
    // Track landing page view
    trackPageView('/lp/sleep-tips', 'Sleep Tips - Can\'t Sleep? Quick Solutions That Work')
  }, [])

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Hero Section - Problem Agitation Solution */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
        <div className="mb-4">
          <span className="text-4xl">😤</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-[#f1faee] mb-4">
          Can't Sleep? Lying Awake Again?{' '}
          <span className="text-[#a8dadc]">You're Not Alone.</span>
        </h1>
        <p className="text-lg md:text-xl text-[#f1faee]/70 max-w-3xl mx-auto mb-6">
          <strong>Millions of people struggle with sleep every night.</strong> Racing thoughts, 
          tossing and turning, checking the clock... sound familiar?
        </p>
        <p className="text-lg text-[#f1faee]/70 max-w-2xl mx-auto mb-8">
          The good news? Simple, science-backed techniques can help you fall asleep faster 
          and sleep more deeply — starting tonight.
        </p>
        
        {/* Urgency indicator */}
        <div className="inline-block bg-[#16213e] border border-[#4a4e69] rounded-xl px-6 py-3 mb-8">
          <span className="text-[#a8dadc] text-sm font-medium">
            ⏰ Don't let another sleepless night steal your tomorrow
          </span>
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="max-w-4xl mx-auto px-4 pb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#f1faee] mb-8">
          5 Proven Techniques to Fall Asleep Faster
        </h2>
        
        <div className="space-y-6">
          {/* Tip 1 */}
          <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="flex items-start gap-4">
              <div className="bg-[#a8dadc] text-[#1a1a2e] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8dadc] mb-2">
                  The 4-7-8 Breathing Technique
                </h3>
                <p className="text-[#f1faee]/70 mb-3">
                  This Navy SEAL technique activates your body's natural relaxation response. 
                  Inhale for 4 counts, hold for 7, exhale for 8. Repeat 4 times.
                </p>
                <div className="text-sm text-[#f1faee]/50">
                  <strong className="text-[#a8dadc]">Why it works:</strong> Slower exhales trigger 
                  your parasympathetic nervous system, signaling it's time to sleep.
                </div>
              </div>
            </div>
          </div>

          {/* Tip 2 */}
          <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="flex items-start gap-4">
              <div className="bg-[#a8dadc] text-[#1a1a2e] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8dadc] mb-2">
                  Progressive Muscle Relaxation
                </h3>
                <p className="text-[#f1faee]/70 mb-3">
                  Tense each muscle group for 5 seconds, then release. Start with your toes 
                  and work up to your head. This physical release helps mental calm follow.
                </p>
                <div className="text-sm text-[#f1faee]/50">
                  <strong className="text-[#a8dadc]">Why it works:</strong> Physical tension 
                  keeps your mind alert. Releasing it signals your brain that it's safe to sleep.
                </div>
              </div>
            </div>
          </div>

          {/* Tip 3 */}
          <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="flex items-start gap-4">
              <div className="bg-[#a8dadc] text-[#1a1a2e] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8dadc] mb-2">
                  The 10-3-2-1-0 Sleep Formula
                </h3>
                <p className="text-[#f1faee]/70 mb-3">
                  No caffeine 10h before bed, no food 3h before, no work 2h before, 
                  no screens 1h before, zero snoozes in the morning.
                </p>
                <div className="text-sm text-[#f1faee]/50">
                  <strong className="text-[#a8dadc]">Why it works:</strong> Creates a buffer 
                  between daily stimulation and sleep, giving your body time to wind down naturally.
                </div>
              </div>
            </div>
          </div>

          {/* Tip 4 */}
          <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="flex items-start gap-4">
              <div className="bg-[#a8dadc] text-[#1a1a2e] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8dadc] mb-2">
                  Cool Environment (65-68°F)
                </h3>
                <p className="text-[#f1faee]/70 mb-3">
                  Your core body temperature drops 1-2 degrees when you fall asleep. 
                  A cool room helps this natural process happen faster.
                </p>
                <div className="text-sm text-[#f1faee]/50">
                  <strong className="text-[#a8dadc]">Why it works:</strong> Heat makes your body 
                  work harder to regulate temperature, keeping you more alert and awake.
                </div>
              </div>
            </div>
          </div>

          {/* Tip 5 */}
          <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
            <div className="flex items-start gap-4">
              <div className="bg-[#a8dadc] text-[#1a1a2e] w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                5
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#a8dadc] mb-2">
                  The "Worry Window" Technique
                </h3>
                <p className="text-[#f1faee]/70 mb-3">
                  Set aside 15 minutes earlier in the day to write down worries and solutions. 
                  When thoughts race at bedtime, remind yourself: "I already handled this."
                </p>
                <div className="text-sm text-[#f1faee]/50">
                  <strong className="text-[#a8dadc]">Why it works:</strong> Racing thoughts are 
                  often your brain trying to process the day. Give it a designated time to do so.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#16213e] py-12 my-8">
        <div className="max-w-2xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-3xl mb-4 block">📖</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-4">
              Want the Complete Sleep Guide?
            </h2>
            <p className="text-lg text-[#f1faee]/70 mb-4">
              These 5 tips are just the beginning. Get our complete guide with 
              <strong className="text-[#a8dadc]"> 15 advanced techniques</strong>, 
              a personalized sleep schedule, and a step-by-step 7-day protocol.
            </p>
            <div className="flex justify-center gap-6 text-sm text-[#f1faee]/50 mb-6">
              <span className="flex items-center gap-1">
                <span className="text-[#a8dadc]">✓</span>
                Completely Free
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#a8dadc]">✓</span>
                Science-Based
              </span>
              <span className="flex items-center gap-1">
                <span className="text-[#a8dadc]">✓</span>
                Works Tonight
              </span>
            </div>
          </div>
          
          <EmailCapture />
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-4xl mx-auto px-4 pb-12">
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-[#a8dadc] mb-6">
            Join Thousands Who Are Sleeping Better
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-[#a8dadc] text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-[#f1faee]/70 text-sm italic mb-3">
                "Finally sleeping through the night after months of insomnia. 
                The breathing technique alone changed everything."
              </p>
              <p className="text-[#f1faee]/50 text-xs">— Sarah M., Teacher</p>
            </div>
            <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-[#a8dadc] text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-[#f1faee]/70 text-sm italic mb-3">
                "I was skeptical, but these techniques actually work. Falling 
                asleep in under 20 minutes now instead of 2+ hours."
              </p>
              <p className="text-[#f1faee]/50 text-xs">— Mike D., Engineer</p>
            </div>
            <div className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/30">
              <div className="text-[#a8dadc] text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-[#f1faee]/70 text-sm italic mb-3">
                "The worry window technique was a game-changer. My racing 
                thoughts don't keep me up anymore."
              </p>
              <p className="text-[#f1faee]/50 text-xs">— Lisa K., Marketing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Science-based sleep optimization.</p>
          <div className="flex justify-center gap-4">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms of Service</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Affiliate Disclosure</Link>
          </div>
          <div className="mt-4 text-xs text-[#f1faee]/30">
            <p>JMO Digital Assets, LLC | This site provides educational content and is not medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}