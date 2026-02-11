import { Link } from 'react-router-dom'

export default function ThankYou() {
  const checkoutUrl = "https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week#samcart-slide-open-right"

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Minimal Header — no distracting nav */}
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
        {/* SECTION 1: PDF Delivery — Fulfill the Promise */}
        {/* ============================================ */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-8 text-center mb-16">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-2xl md:text-3xl font-bold text-green-400 mb-3">
            Your Sleep Blueprint is Ready!
          </h1>
          <p className="text-[#f1faee]/70 mb-6">
            Download it now. We've also sent a copy to your inbox.
          </p>
          <a
            href="/sleep-blueprint.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold px-8 py-3 rounded-xl transition text-lg shadow-lg hover:shadow-xl"
          >
            Download Your Sleep Blueprint →
          </a>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: Pain Agitation — The Real Problem */}
        {/* ============================================ */}
        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <p className="text-[#f1faee]/80">
            Now you have your personalized sleep schedule. That's a great start.
          </p>
          <p className="text-[#f1faee]/80">
            But can I be honest with you?
          </p>
          <p className="text-[#f1faee]/80">
            <strong className="text-[#f1faee]">The schedule alone probably won't fix your sleep.</strong>
          </p>
          <p className="text-[#f1faee]/80">
            I know that's not what you want to hear. But here's what I've learned 
            from working with over 2,000 people who struggle with sleep:
          </p>
          <p className="text-[#f1faee]/80">
            Most of them already <em>knew</em> what time they should go to bed. They 
            already <em>knew</em> screens were bad before sleep. They already <em>knew</em> caffeine 
            after 2pm was a bad idea.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl">
            Knowledge wasn't their problem. <span className="text-[#a8dadc]">Implementation was.</span>
          </p>
          <p className="text-[#f1faee]/80">
            Without a structured system, here's what usually happens: You try 
            a few things for a couple nights. Maybe you go to bed earlier. Maybe 
            you skip the phone. It feels like it's working... then Thursday hits, 
            you're stressed, you fall back into old patterns, and by the weekend 
            you're right back where you started.
          </p>
          <p className="text-[#f1faee]/80">
            Another month of waking up exhausted. Another month of brain fog by 
            2pm. Another month of running on caffeine and willpower.
          </p>
          <p className="text-[#f1faee]/80">
            It doesn't have to be this way.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: Dr. Sarah's Story — Credibility   */}
        {/* ============================================ */}
        <div className="mb-16 space-y-6 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            The Sleep Specialist Who Couldn't Sleep
          </h2>
          <p className="text-[#f1faee]/80">
            I'm Dr. Sarah Chen, and five years ago I had an embarrassing secret:
          </p>
          <p className="text-[#f1faee] font-semibold italic text-xl">
            I was a sleep researcher who couldn't sleep well herself.
          </p>
          <p className="text-[#f1faee]/80">
            I knew more about sleep science than almost anyone. I could lecture 
            for hours about circadian rhythms, sleep architecture, and melatonin 
            pathways. But every night, I'd lie in bed with a racing mind, cycling 
            through the same frustrating pattern.
          </p>
          <p className="text-[#f1faee]/80">
            The problem wasn't that I didn't know the science. <strong className="text-[#f1faee]">The problem 
            was that I was trying to implement everything at once, in the wrong 
            order.</strong>
          </p>
          <p className="text-[#f1faee]/80">
            That realization changed everything.
          </p>
          <p className="text-[#f1faee]/80">
            I started experimenting with <em>sequencing</em> — implementing one specific 
            change each day, in a precise order where each day's change amplified 
            the previous one. Within a week, I was sleeping better than I had in years.
          </p>
          <p className="text-[#f1faee]/80">
            I started using this same sequence with my private clients — people who 
            pay $300/hour for sleep coaching. The results were remarkable. Over 85% 
            reported significant improvement by Day 7.
          </p>
          <p className="text-[#f1faee]/80">
            That's when I decided to put the entire protocol into a guide that 
            anyone could follow — not just the people who could afford private coaching.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: The Offer — What You Get          */}
        {/* ============================================ */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
              The 7-Day Sleep Reset Protocol
            </h2>
            <p className="text-xl text-[#a8dadc]">
              The exact system I use with my $300/hour private clients — now available for everyone.
            </p>
          </div>

          {/* Day-by-day breakdown */}
          <div className="mb-10 space-y-4">
            <h3 className="text-xl font-bold text-[#f1faee] mb-4">Here's what happens each day:</h3>
            
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 1: Anchor Your Wake Time</p>
              <p className="text-[#f1faee]/70 text-sm">Set the foundation that everything else builds on. Most people start here wrong — we show you exactly how to do it right.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 2: Light Exposure Protocol</p>
              <p className="text-[#f1faee]/70 text-sm">Sync your circadian rhythm using specific light exposure timing. This is the #1 thing people get wrong about sleep.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 3: Environment Optimization</p>
              <p className="text-[#f1faee]/70 text-sm">Simple bedroom changes that dramatically improve sleep quality. Most people notice a difference starting tonight.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 4: Nutrition & Caffeine Reset</p>
              <p className="text-[#f1faee]/70 text-sm">What to eat, when to eat, and the caffeine cutoff rule that actually works (hint: it's not what most articles say).</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 5: Wind-Down Routine</p>
              <p className="text-[#f1faee]/70 text-sm">Build a personalized pre-bed routine that signals your brain it's time to sleep — without the generic "put your phone away" advice.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 6: Sleep Cycle Alignment</p>
              <p className="text-[#f1faee]/70 text-sm">Use your Sleep Smarter calculator results to align your schedule with your natural sleep cycles for maximum restoration.</p>
            </div>
            <div className="bg-[#0f0e17]/60 rounded-lg p-4 border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold mb-1">Day 7: Integration & Long-Term Lock-In</p>
              <p className="text-[#f1faee]/70 text-sm">Put it all together into a sustainable system. Plus: what to do when life disrupts your routine (because it will).</p>
            </div>
          </div>

          {/* Bonus materials */}
          <div className="mb-10">
            <h3 className="text-xl font-bold text-[#f1faee] mb-4">Plus 4 bonus guides:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-5">
                <p className="text-[#a8dadc] font-bold mb-2">💊 Supplement Timing Guide</p>
                <p className="text-[#f1faee]/60 text-sm">Evidence-based protocols with exact dosages, timing, and brand recommendations. Know exactly what to take and when.</p>
              </div>
              <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-5">
                <p className="text-[#a8dadc] font-bold mb-2">🛏️ Environment Audit Checklist</p>
                <p className="text-[#f1faee]/60 text-sm">Room-by-room optimization guide with specific product recommendations at every budget level.</p>
              </div>
              <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-5">
                <p className="text-[#a8dadc] font-bold mb-2">📊 Sleep Tracking Templates</p>
                <p className="text-[#f1faee]/60 text-sm">Daily logs, weekly trackers, and before/after comparison sheets to measure your progress objectively.</p>
              </div>
              <div className="bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-5">
                <p className="text-[#a8dadc] font-bold mb-2">🆘 Emergency Sleep Protocol</p>
                <p className="text-[#f1faee]/60 text-sm">Step-by-step process for those 3am nights when nothing is working. Breathing techniques, cognitive shuffling, and more.</p>
              </div>
            </div>
          </div>

          {/* Why this works */}
          <div className="mb-10 bg-[#0f0e17] border border-[#4a4e69]/30 rounded-xl p-6">
            <h3 className="text-xl font-bold text-[#f1faee] mb-4">Why this works when everything else hasn't:</h3>
            <div className="space-y-3">
              <p className="text-[#f1faee]/80">
                <strong className="text-[#a8dadc]">It's sequential.</strong> Each day builds on the previous one, creating compound improvements. Day 3 works better <em>because</em> you did Days 1 and 2 first.
              </p>
              <p className="text-[#f1faee]/80">
                <strong className="text-[#a8dadc]">It's actionable.</strong> No vague "improve your sleep hygiene" advice. Every section tells you exactly what to do, when to do it, and what to do when it doesn't go as planned.
              </p>
              <p className="text-[#f1faee]/80">
                <strong className="text-[#a8dadc]">It's realistic.</strong> Designed for people with actual lives — not perfect laboratory conditions. Every day includes a "minimum viable" option for when you're busy.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: Social Proof — Testimonials       */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-8 text-center">What people are saying:</h3>
          <div className="space-y-6">
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <p className="text-[#f1faee]/80 italic mb-3">
                "I've struggled with sleep for 15 years. I've tried everything — melatonin, meditation, white noise machines. Nothing worked consistently until I followed Sarah's 7-day protocol. By Day 3, I was falling asleep naturally. By Day 7, I was sleeping through the night for the first time in years."
              </p>
              <p className="text-[#a8dadc] font-semibold text-sm">— Jessica M., 42</p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <p className="text-[#f1faee]/80 italic mb-3">
                "As a shift worker, I thought good sleep was impossible for me. The 7-Day Reset Protocol showed me how to work with my schedule instead of against it. I'm getting better sleep now than I did when I worked 9-5."
              </p>
              <p className="text-[#a8dadc] font-semibold text-sm">— Michael T., 38</p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <p className="text-[#f1faee]/80 italic mb-3">
                "I was skeptical because $17 seemed too cheap to be valuable. But this is the most comprehensive sleep guide I've ever seen. The supplement timing guide alone is worth the price."
              </p>
              <p className="text-[#a8dadc] font-semibold text-sm">— David L., 51</p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: Value Stack + Price Reveal        */}
        {/* ============================================ */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-12 mb-16 text-center">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-8">Everything you get today:</h3>
          
          <div className="max-w-md mx-auto space-y-3 mb-8 text-left">
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">7-Day Sleep Reset Protocol</span>
              <span className="text-[#f1faee]/60 line-through">$97</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">Supplement Timing Guide</span>
              <span className="text-[#f1faee]/60 line-through">$29</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">Environment Audit Checklist</span>
              <span className="text-[#f1faee]/60 line-through">$29</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">Sleep Tracking Templates</span>
              <span className="text-[#f1faee]/60 line-through">$19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">Emergency Sleep Protocol</span>
              <span className="text-[#f1faee]/60 line-through">$19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#f1faee]/80">Lifetime Updates</span>
              <span className="text-[#f1faee]/60 line-through">$47</span>
            </div>
            <div className="border-t border-[#4a4e69]/30 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-[#f1faee] font-bold">Regular Price</span>
                <span className="text-[#f1faee] font-bold line-through">$47</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-[#f1faee]/60 text-sm mb-2">Today only:</p>
            <div className="text-5xl font-bold text-[#a8dadc] mb-1">$17</div>
            <p className="text-[#f1faee]/50 text-sm">One-time payment · Instant download · Lifetime access</p>
          </div>

          <p className="text-[#f1faee]/60 text-sm mb-6">
            That's less than the cost of one week of coffee — for a system that can 
            transform every night of sleep for the rest of your life.
          </p>

          <a
            href={checkoutUrl}
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-12 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
          >
            Get Instant Access — Just $17
          </a>

          <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/50 mt-4">
            <span className="text-green-400">🔒</span>
            <span>Secure checkout · 30-day money-back guarantee</span>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: Guarantee — Risk Reversal         */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border border-green-500/20 rounded-2xl p-8 text-center">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            30-Day "Sleep Better or It's Free" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-2xl mx-auto mb-4 text-lg">
            Follow the protocol for 7 days. If you don't notice a real, 
            meaningful improvement in your sleep quality, just email us and 
            I'll refund every penny. No hoops, no hassle.
          </p>
          <p className="text-[#f1faee]/60 max-w-2xl mx-auto">
            I can make this guarantee because I've seen it work for over 2,000 
            people. Over 85% report significant improvement by Day 7. The 
            protocol works — if you do the work.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: FAQ                               */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[#f1faee] mb-6 text-center">Common Questions</h3>
          <div className="space-y-4">
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">How is this different from the free blueprint I just downloaded?</h4>
              <p className="text-[#f1faee]/70">
                The blueprint gives you a schedule — when to sleep and when to wake. The 7-Day Protocol gives you the complete implementation system: what to change each day, in what order, with troubleshooting for when things don't go as planned. It's the difference between a map and a guided tour.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">What if I can't follow the protocol perfectly?</h4>
              <p className="text-[#f1faee]/70">
                That's expected — and planned for. Every day includes a "minimum viable" option for when life gets busy, plus troubleshooting guides for common obstacles. This was designed for real people with real schedules, not laboratory conditions.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">How much time does this take each day?</h4>
              <p className="text-[#f1faee]/70">
                10-30 minutes of active implementation, plus passive changes to your environment and habits. The protocol fits into your existing routine — it doesn't replace it.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">Is this just another "sleep hygiene" list?</h4>
              <p className="text-[#f1faee]/70">
                No. Sleep hygiene lists give you disconnected tips. This protocol gives you a strategic sequence where each day's change amplifies the previous one. The order matters — that's what makes it work.
              </p>
            </div>
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-[#a8dadc] mb-2">What if it doesn't work for me?</h4>
              <p className="text-[#f1faee]/70">
                You're covered by a 30-day money-back guarantee. Follow the protocol, and if you don't see improvement, email us for a full refund. We take on all the risk.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 9: Final CTA + P.S.                 */}
        {/* ============================================ */}
        <div className="mb-16 text-center">
          <a
            href={checkoutUrl}
            className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-12 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-6"
          >
            Get the 7-Day Protocol — Just $17
          </a>
          <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/50 mb-8">
            <span className="text-green-400">🔒</span>
            <span>Secure checkout · Instant download · 30-day guarantee</span>
          </div>

          <div className="max-w-2xl mx-auto text-left space-y-4 text-[#f1faee]/60 text-sm border-t border-[#4a4e69]/30 pt-8">
            <p>
              <strong className="text-[#f1faee]/80">P.S.</strong> Think about it this way — what's the real cost of 
              another month of bad sleep? The brain fog at work. The irritability 
              with people you love. The afternoon crashes. The long-term health 
              risks. For $17, you can start fixing all of that tonight. And if it 
              doesn't work, you get your money back. There is literally no downside.
            </p>
            <p>
              <strong className="text-[#f1faee]/80">P.P.S.</strong> This page shows a special introductory price of $17. 
              The regular price is $47. Once you leave this page, this offer 
              is no longer available at this price.
            </p>
          </div>
        </div>

        {/* No Thanks */}
        <div className="text-center mb-12">
          <Link 
            to="/blog" 
            className="text-[#f1faee]/40 hover:text-[#f1faee]/60 transition text-sm"
          >
            No thanks, I'll try to figure it out on my own
          </Link>
        </div>

      </main>

      {/* Minimal Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-3xl mx-auto px-4 text-center text-sm text-[#f1faee]/40">
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
