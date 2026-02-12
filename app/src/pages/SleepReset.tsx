import { Link } from 'react-router-dom'

export default function SleepReset() {
  const checkoutUrl = "https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week#samcart-slide-open-right"

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
        {/* SECTION 1: HERO IMAGE + HEADLINE */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="rounded-2xl overflow-hidden mb-10">
            <img 
              src="/images/sales-page/hero-lifestyle.png" 
              alt="Person waking up refreshed and stretching in morning light" 
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
              Why You're <span className="text-[#a8dadc]">Still</span> Exhausted (And The 7-Day Fix That Actually Works)
            </h1>
            <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              The sequential protocol that resets your sleep in the biologically correct order — most people notice a difference by Day 3, profound changes by Day 7
            </p>
            <a
              href={checkoutUrl}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Reset My Sleep in 7 Days — $17
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: OPENING HOOK + STORY */}
        {/* ============================================ */}
        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <p className="text-[#f1faee] font-semibold text-xl">
            Let me guess what happened last night...
          </p>
          <p className="text-[#f1faee]/80">
            You went to bed at a reasonable time. Maybe you even put your phone in another room. Maybe you tried that breathing thing you read about. But 2am rolled around and there you were — eyes wide open, mind racing, wondering why nothing works for you.
          </p>
          <p className="text-[#f1faee]/80">
            Sound familiar? Here's what I discovered that changed everything:
          </p>
          <p className="text-[#f1faee] font-semibold text-xl bg-[#16213e] p-6 rounded-lg border border-[#4a4e69]/30">
            You're not broken. Your sleep isn't hopeless. You've just been trying to fix everything in the wrong order.
          </p>
          <p className="text-[#f1faee]/80">
            I know this because five years ago, I was you. 
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-6 my-8">
            <img 
              src="/images/sales-page/dr-sarah-headshot.png" 
              alt="Dr. Sarah Chen, Sleep Researcher" 
              className="w-32 h-32 rounded-full object-cover object-top flex-shrink-0 border-2 border-[#a8dadc]/30"
            />
            <div>
              <p className="text-[#f1faee]/80">
                I'm Dr. Sarah Chen. I study sleep for a living. I can lecture for hours about circadian rhythms and sleep architecture. But I had an embarrassing secret: <em>I couldn't sleep well myself.</em>
              </p>
            </div>
          </div>
          <p className="text-[#f1faee]/80">
            Every night, same story. Racing mind. Tossing and turning. 3am anxiety spirals about tomorrow's meetings.
          </p>
          <p className="text-[#f1faee]/80">
            The problem wasn't that I didn't know the science. <strong className="text-[#f1faee]">The problem was I was trying to implement everything simultaneously.</strong> My nervous system was overwhelmed by too many changes at once.
          </p>
          <p className="text-[#f1faee]/80">
            That's when I discovered something that changed my entire approach... and now helps thousands of people finally get the sleep they've been chasing for years.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: THE DISCOVERY - UNIQUE MECHANISM */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
            The <span className="text-[#a8dadc]">"Sequential Reset"</span> Discovery That Changes Everything
          </h2>
          <div className="space-y-6 text-[#f1faee]/80 text-lg">
            <p>
              Here's what I realized: <strong className="text-[#f1faee]">Your brain can only adapt to one significant sleep change at a time without triggering resistance.</strong>
            </p>
            <p>
              When you try to overhaul your entire routine at once — new bedtime, new environment, new supplements, new habits — your nervous system goes into protection mode. It fights the changes.
            </p>
            <p>
              But when you implement changes in the <em>biologically correct sequence</em>, each change primes your system for the next one. Day 2 works better because you did Day 1 first. Day 3 works because Days 1 and 2 laid the foundation.
            </p>
            <div className="bg-[#0f0e17]/60 p-6 rounded-lg border border-[#4a4e69]/30">
              <p className="text-[#a8dadc] font-semibold text-xl mb-3">
                This is why random sleep tips fail, but the 7-Day Sequential Reset works:
              </p>
              <ul className="space-y-3 text-[#f1faee]/80">
                <li>• <strong>Day 1</strong> establishes your circadian anchor point</li>
                <li>• <strong>Day 2</strong> strengthens the signal (now that the anchor is set)</li>
                <li>• <strong>Day 3</strong> optimizes your environment (now that your rhythm is stabilizing)</li>
                <li>• <strong>Days 4-7</strong> fine-tune the system for compound results</li>
              </ul>
            </div>
            <p>
              I tested this sequence on myself first. Within 7 days, I was sleeping better than I had since college. Then I started using it with my private clients who pay $300/hour for sleep coaching.
            </p>
            <p className="text-[#f1faee] font-semibold">
              Results? Over 85% reported significant improvement by Day 7.
            </p>
          </div>

          {/* Sequential Reset Diagram */}
          <div className="mt-10">
            <img 
              src="/images/sales-page/sequential-reset-diagram.png" 
              alt="The 7-Day Sequential Reset Protocol — Day 1 through Day 7 cascading flow" 
              className="w-full rounded-xl"
            />
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: PROBLEM AGITATION */}
        {/* ============================================ */}
        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            But First... What Happens If You Don't Fix This?
          </h2>
          <p className="text-[#f1faee]/80">
            I need to be straight with you about something.
          </p>
          <p className="text-[#f1faee]/80">
            Every night you don't get quality sleep, you're not just "tired the next day." You're literally borrowing against your future health, relationships, and success.
          </p>
          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 space-y-4">
            <p className="text-[#f1faee]/80">
              <strong className="text-[#f1faee]">Your brain:</strong> Sleep deprivation shrinks your prefrontal cortex (decision-making) and enlarges your amygdala (anxiety/fear response). You literally become more anxious and less rational.
            </p>
            <p className="text-[#f1faee]/80">
              <strong className="text-[#f1faee]">Your body:</strong> Poor sleep disrupts hunger hormones. You'll crave junk food and gain weight. Your immune system weakens. Recovery slows.
            </p>
            <p className="text-[#f1faee]/80">
              <strong className="text-[#f1faee]">Your relationships:</strong> You become irritable, impatient, less empathetic. The people you love most get the worst version of you.
            </p>
            <p className="text-[#f1faee]/80">
              <strong className="text-[#f1faee]">Your work:</strong> Creativity plummets. Focus fragments. You make more mistakes and take longer to complete tasks.
            </p>
          </div>
          <p className="text-[#f1faee] font-semibold text-xl">
            Another month of poor sleep isn't just inconvenient. It's expensive — to your health, your career, your happiness.
          </p>
          <p className="text-[#f1faee]/80">
            The good news? You can start fixing this tonight.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: THE METHOD - DAY BY DAY */}
        {/* ============================================ */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            The 7-Day Sequential Reset Protocol
          </h2>
          <p className="text-xl text-[#f1faee]/80 mb-10 text-center max-w-3xl mx-auto">
            Here's exactly what you'll do each day (and why this sequence is the key to everything):
          </p>

          <div className="space-y-6 mb-10">
            
            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">1</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Anchor Your Circadian Master Clock</p>
                  <p className="text-[#f1faee]/70 mb-3">Most people start with bedtime. That's backwards. Your wake time controls everything else. I'll show you the precise wake-time protocol that resets your master clock — the same technique we use in sleep labs.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why this comes first: Without a consistent wake time, everything else is built on quicksand.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">2</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Strategic Light Exposure Protocol</p>
                  <p className="text-[#f1faee]/70 mb-3">Now that your wake time is locked, we use light exposure to strengthen your circadian signal. The timing, intensity, and duration I recommend are based on NASA research — not wellness blog guesswork.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why now: Your circadian anchor (Day 1) must be stable before light therapy works properly.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">3</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">The "Sleep Cave" Environment Reset</p>
                  <p className="text-[#f1faee]/70 mb-3">With your circadian rhythm stabilizing, your brain is now primed to respond to environmental cues. Three specific changes that cost under $30 but feel like upgrading to a five-star hotel.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why Day 3: Environmental changes only work after your internal clock is synchronized.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">4</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">The Caffeine & Food Timing Reset</p>
                  <p className="text-[#f1faee]/70 mb-3">Most caffeine advice is flat wrong. I'll show you the cutting-edge research that lets you keep your coffee while still falling asleep easily. Plus: the meal timing trick that stops 3am wake-ups.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why Day 4: Your stabilized rhythm can now handle metabolic optimization without disruption.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">5</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">"Realistic" Wind-Down Sequence</p>
                  <p className="text-[#f1faee]/70 mb-3">Forget "no screens for 2 hours" — that's unrealistic. I'll show you how to create a personalized wind-down that works even if you need your phone before bed. It's about smart sequencing, not restrictions.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why Day 5: Wind-down routines only stick after the biological foundation is solid.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">6</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Sleep Cycle Optimization</p>
                  <p className="text-[#f1faee]/70 mb-3">Now we fine-tune using your natural sleep architecture. Learn to time your sleep cycles so you wake up feeling refreshed instead of groggy — the difference between bouncing out of bed vs. feeling like roadkill.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why Day 6: Cycle optimization requires all previous elements to be stable first.</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
              <div className="flex items-start gap-4">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">7</div>
                <div>
                  <p className="text-[#a8dadc] font-bold mb-2 text-lg">Integration & "Chaos-Proofing"</p>
                  <p className="text-[#f1faee]/70 mb-3">Everything clicks into an automated system that runs on autopilot. Plus: how to maintain great sleep when life gets messy (travel, sick kids, work stress). Perfect conditions don't exist — but great sleep still can.</p>
                  <p className="text-[#f1faee]/50 italic text-sm">Why Day 7: Integration only works after all individual elements are mastered.</p>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Start Tonight — Get The Complete Protocol
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: SOCIAL PROOF - TESTIMONIALS */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-8 text-center">Here's What Happens When You Follow The Sequence</h3>
          <div className="space-y-6">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "I've been an insomniac since my divorce 6 years ago. Tried everything — sleep specialists, prescription meds, expensive mattresses. Nothing worked long-term. The 7-Day Protocol was different because it didn't ask me to change everything at once. Day 1 felt almost too simple, but I trusted the process. By Day 4, something shifted. By Day 7, I was sleeping 7+ hours for the first time in years. Six months later, it's still working."
              </p>
              <p className="text-[#a8dadc] font-semibold">— Rachel M., Teacher, 43</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">Lost 40+ nights of sleep trying random tips → Sleeping 7+ hours consistently</p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "As an ER nurse working rotating shifts, I thought deep sleep was impossible. The Sequential Reset showed me how to work WITH my crazy schedule instead of against it. The light exposure protocol alone was life-changing. I'm getting better sleep working nights than my day-shift friends. My wife says I'm like a different person — way less stressed and way more present with our kids."
              </p>
              <p className="text-[#a8dadc] font-semibold">— Marcus Chen, RN, 38</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">Rotating shift schedule → Consistently great sleep regardless of work hours</p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <div className="flex mb-4">
                {[1,2,3,4,5].map(i => <span key={i} className="text-yellow-400 text-lg">★</span>)}
              </div>
              <p className="text-[#f1faee]/80 italic mb-4 text-lg">
                "I'm an engineer, so I'm naturally skeptical of anything that seems 'too good to be true.' But the sequential approach made scientific sense — I understand systems and this is clearly a system. The supplement timing guide alone saved me $200/month on stuff that wasn't working. Three weeks in, I'm sleeping deeper and waking up sharper than I have since my twenties. This is the most methodical, science-based approach to sleep I've found."
              </p>
              <p className="text-[#a8dadc] font-semibold">— David Park, Software Engineer, 31</p>
              <p className="text-[#f1faee]/50 text-sm mt-1">Wasting money on random supplements → Optimized stack + perfect sleep timing</p>
            </div>

          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: VALUE STACK - "THE STACK" */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-4 text-center">Everything You Get Today</h3>
          <p className="text-lg text-[#f1faee]/70 mb-8 text-center">
            The complete system that typically costs $300/hour in my private practice
          </p>
          
          {/* Product Mockup */}
          <div className="flex justify-center mb-10">
            <img 
              src="/images/sales-page/product-mockup.png" 
              alt="7-Day Sleep Reset Protocol complete bundle — protocol guide, supplement timing guide, sleep tracking templates, emergency sleep protocol, and environment checklist" 
              className="max-w-md w-full rounded-xl"
            />
          </div>
          
          <div className="max-w-lg mx-auto space-y-3 mb-10">
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">The 7-Day Sequential Reset Protocol</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$97</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Evidence-Based Supplement Timing Guide</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$29</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Sleep Environment Audit Checklist</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$29</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Sleep Progress Tracking Templates</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$19</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Emergency Sleep Recovery Protocol</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$19</span>
            </div>
            <div className="flex justify-between items-center py-4 px-6 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
              <span className="text-[#f1faee] font-medium text-lg">Lifetime Updates + New Research</span>
              <span className="text-[#f1faee]/60 line-through text-xl">$47</span>
            </div>
            
            <div className="border-t-2 border-[#a8dadc]/50 pt-4 mt-8">
              <div className="flex justify-between items-center py-4 px-6 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                <span className="text-[#f1faee] font-bold text-xl">Total Value If Purchased Separately</span>
                <span className="text-[#f1faee] font-bold text-2xl line-through">$240</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Special Introductory Price (Today Only):</p>
            <div className="text-7xl font-bold text-[#a8dadc] mb-3">$17</div>
            <p className="text-[#f1faee]/60 text-lg mb-2">One-time payment • Instant download • Lifetime access</p>
            <p className="text-[#f1faee]/70 text-sm">
              Less than the cost of two fancy coffees — for a system that transforms every night of sleep for the rest of your life
            </p>
          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Get Everything For Just $17
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Secure checkout • 60-day guarantee • Instant download</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: GUARANTEE - RISK REVERSAL */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            60-Day "Sleep Like a Baby or It's Free" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            Follow the 7-Day Sequential Reset Protocol exactly as outlined. If you don't experience a meaningful improvement in your sleep quality, energy levels, or morning alertness — if this doesn't become the breakthrough you've been looking for — just email me within 60 days.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl mb-4">
            I'll refund every single penny. No questions. No hassles. No "try this instead" suggestions.
          </p>
          <p className="text-[#f1faee]/70 max-w-2xl mx-auto text-lg">
            I can make this guarantee because I've watched this protocol work for thousands of people. The science is solid. The sequence is proven. If you follow it and don't get results, you shouldn't pay for it.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 9: FAQ */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-10 text-center">Common Questions</h3>
          <div className="space-y-6 max-w-4xl mx-auto">
            
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">How is this different from every other sleep program I've tried?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Most sleep programs give you a laundry list of tips and say "do all of this." Your brain rebels against massive change. The Sequential Reset implements ONE change per day in the biologically correct order. Each day prepares your system for the next optimization. It's not just WHAT to change — it's WHEN to change it that makes all the difference.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if my schedule is completely unpredictable?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                I work with shift workers, traveling executives, new parents — people with "impossible" schedules. The protocol includes specific adaptations for irregular schedules, plus a "chaos-proofing" system for maintaining good sleep when life gets messy. Some of my best success stories come from people who thought their situation was hopeless.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">I've tried everything and nothing works long-term. Why would this be different?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Because you've been trying isolated fixes instead of sequential system change. It's like trying to tune a guitar by adjusting all six strings simultaneously — chaos. The Sequential Reset tunes one "string" at a time until everything harmonizes. Plus, you're protected by a 60-day money-back guarantee. If it doesn't work for you, you risk nothing.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">How much time does this require each day?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                10-25 minutes of active implementation, plus passive changes (like adjusting room temperature or meal timing). This isn't about adding another complex routine — it's about strategically modifying what you're already doing. Most changes integrate seamlessly into your existing life.
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-xl font-semibold text-[#a8dadc] mb-3">What if I can't follow it perfectly every day?</h4>
              <p className="text-[#f1faee]/80 text-lg">
                Perfect compliance isn't required. Each day includes a "minimum viable" option for busy/stressful days, plus troubleshooting for common obstacles. The protocol was designed for real humans with real lives, not laboratory conditions. Even partial implementation typically produces noticeable improvements.
              </p>
            </div>

          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 10: FINAL CTA + URGENCY */}
        {/* ============================================ */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
              Your 7-Day Sleep Transformation Starts Tonight
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              Every night you wait is another night of poor sleep, another day of low energy, another 24 hours borrowed against your future health. The protocol is ready for instant download.
            </p>
            <a
              href={checkoutUrl}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Transform My Sleep Tonight — $17
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60 mb-6">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Instant download • 60-day guarantee • Lifetime access</span>
            </div>
            <p className="text-[#f1faee]/50 text-sm">
              Special introductory price expires when you leave this page
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 11: P.S. - FINAL PERSUASION */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-left space-y-6 text-[#f1faee]/70 border-t border-[#4a4e69]/30 pt-10">
            <p className="text-lg">
              <strong className="text-[#f1faee]">P.S.</strong> I want you to imagine something for a moment. It's three weeks from now. You wake up naturally, before your alarm, feeling refreshed. No grogginess. No "I need coffee before I can function." Just clear, energized alertness.
            </p>
            <p className="text-lg">
              Your partner notices you're less irritable. Your coworkers comment on your improved focus. You have energy left at the end of the day to actually enjoy your life instead of just surviving it.
            </p>
            <p className="text-lg">
              <strong className="text-[#f1faee]">That's what's possible when your sleep finally works.</strong> For $17 and 7 days of following a proven system. With a guarantee that eliminates all risk.
            </p>
            <p className="text-lg">
              The only question is: Will you still be reading about sleep solutions three months from now, or will you be sleeping deeply every night because you took action today?
            </p>
            <p className="text-lg">
              <strong className="text-[#f1faee]">P.P.S.</strong> This $17 introductory price is only available on this page. When you leave, the price returns to the regular $47. Don't let procrastination cost you another month of exhaustion.
            </p>
          </div>
        </div>

        {/* No Thanks Link */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="text-[#f1faee]/30 hover:text-[#f1faee]/50 transition text-sm"
          >
            No thanks, I'll keep trying random sleep tips that don't work
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