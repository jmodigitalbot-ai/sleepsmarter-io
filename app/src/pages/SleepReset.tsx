import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { trackSalesPageView, trackCheckoutClick } from '../lib/analytics'

export default function SleepReset() {
  const checkoutUrl = "https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week#samcart-slide-open-right"

  useEffect(() => {
    trackSalesPageView('/sleep-reset', {
      page_title: 'Sleep Reset - 7-Day Protocol'
    })
  }, [])

  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation, 'tripwire')
  }

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Minimal Header */}
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
        {/* SECTION 1: HEADLINE                          */}
        {/* v5: Pain-first, validating, mechanism-hinting */}
        {/* ============================================ */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] mb-6 leading-tight">
            You're Not Broken. You're Just{' '}
            <span className="text-[#a8dadc]">Doing It In The Wrong Order.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#f1faee]/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            The 7-Day Sequential Reset — for people who've tried everything and are exhausted from trying.
          </p>
          <a
            href={checkoutUrl}
            onClick={() => handleCheckoutClick('Join the Reset — $17', 'hero')}
            className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl mb-4"
          >
            Join the Reset — $17
          </a>
          <p className="text-[#f1faee]/50 text-sm flex items-center justify-center gap-2">
            <span className="text-green-400">🛡️</span>
            60-day guarantee — if it doesn't work, full refund, no questions
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 2: IF THIS IS YOU                    */}
        {/* v5: Emotional opening, validation-first       */}
        {/* ============================================ */}
        <div className="mb-10 space-y-5 text-lg leading-relaxed">
          <p className="text-[#f1faee]/80">
            You're not here because you haven't tried.
          </p>
          <p className="text-[#f1faee]/80">
            You've tried melatonin. Some nights it helped, some nights it didn't — you could never figure out why. You've tried the apps, the white noise, the weighted blanket, the no-screens rule. You've read the articles. You know what sleep hygiene is. You've done the magnesium.
          </p>
          <p className="text-[#f1faee]/80">
            And you're still waking up at 3am. Still dragging through the afternoon. Still starting the day already behind.
          </p>
          <p className="text-[#f1faee] font-semibold text-xl bg-[#16213e] p-6 rounded-lg border border-[#4a4e69]/30">
            You're not looking for the perfect night's sleep anymore. You gave up on perfect. What you want is <em>reliable</em> sleep — the kind you can count on. The kind that makes the next day feel possible instead of something to endure.
          </p>
          <p className="text-[#f1faee]/80">
            That's what this does.
          </p>
        </div>

        {/* ============================================ */}
        {/* FIRST TESTIMONIAL — woven in early            */}
        {/* v5: Skeptic voice first, emotional anchor     */}
        {/* ============================================ */}
        <div className="mb-14 bg-[#16213e] border-l-4 border-[#a8dadc] rounded-r-xl p-6">
          <p className="text-[#f1faee]/70 italic text-lg mb-3">
            "I'm skeptical of anything that promises to fix sleep in 7 days. Sleep is complicated. Seven days seems optimistic."
          </p>
          <p className="text-[#f1faee]/80 mb-3">
            That's what Ben said before he tried it. He'd been lying awake 45+ minutes every night for two years. By Night 3, he was falling asleep in under 10 minutes.
          </p>
          <p className="text-[#f1faee]/70 italic text-lg mb-3">
            "I'm not going to say it's magic. I'll say it did what it said."
          </p>
          <p className="text-[#f1faee]/80">
            He didn't change what he was doing. He changed the order.
          </p>
          <p className="text-[#f1faee]/40 text-xs mt-4 italic">
            *Name changed for privacy. Based on real feedback from an early protocol user. Individual results will vary.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 3: WHY NOTHING HAS STUCK             */}
        {/* v5: Tightened ~40%, core message preserved   */}
        {/* ============================================ */}
        <div className="mb-12 space-y-5 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            Why Nothing Has Stuck
          </h2>
          <p className="text-[#f1faee]/80">
            Every sleep fix you've tried probably works. Melatonin works. Cold rooms work. Wind-down routines work. The problem isn't the interventions — it's that each one requires a foundation the previous tip was supposed to build first.
          </p>
          <p className="text-[#f1faee]/80">
            When you apply them out of order, or all at once, none of them hold. Your nervous system treats mass change as a threat and fights it. Two days of progress, then collapse back to baseline.
          </p>
          <div className="bg-[#16213e] p-6 rounded-xl border border-[#4a4e69]/30">
            <p className="text-[#a8dadc] font-semibold text-xl">
              Think of it like a combination lock. The right numbers in the wrong order don't open anything.
            </p>
          </div>
          <p className="text-[#f1faee]/80">
            <strong className="text-[#f1faee]">The Sequential Reset takes what you already know and applies it in the order your biology actually requires.</strong> Not new things to try. The same things — done in sequence.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 4: WHAT YOU WAKE UP TO               */}
        {/* v5: Morning-after leads (what agent flagged)  */}
        {/* ============================================ */}
        <div className="mb-12 space-y-5 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            What You Wake Up To
          </h2>
          <p className="text-[#f1faee]/80">
            What people notice first isn't that they fall asleep faster. It's that they wake up differently.
          </p>
          <p className="text-[#f1faee]/80">
            Clearer. Earlier. Without the alarm feeling like an assault. The morning fog that usually lasts until 10am — gone or dramatically reduced by Day 5.
          </p>
          <p className="text-[#f1faee]/80">
            Most sleep solutions optimize for falling asleep. The Sequential Reset optimizes for what the morning looks like. That's the outcome worth fixing — and the one most solutions miss entirely.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 5: HOW IT WORKS — THREE THINGS        */}
        {/* v5: Simplified science (was 5 points → 3)    */}
        {/* Compliance: "astronaut circadian research"    */}
        {/* ============================================ */}
        <div className="mb-12 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border border-[#4a4e69]/50 rounded-2xl p-8 md:p-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
            How It Works — <span className="text-[#a8dadc]">Three Things, In Order</span>
          </h2>
          <p className="text-[#f1faee]/80 text-lg mb-8">
            Your sleep system has a hierarchy. Most programs ignore it.
          </p>

          <div className="space-y-6">
            <div className="bg-[#0f0e17]/60 p-6 rounded-xl border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold text-lg mb-2">1. Your wake time controls everything.</p>
              <p className="text-[#f1faee]/70">It sets your cortisol curve, your melatonin window, your body temperature cycle. Every other intervention is downstream of this one variable. Almost nobody starts here — which is why almost nothing sticks.</p>
            </div>

            <div className="bg-[#0f0e17]/60 p-6 rounded-xl border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold text-lg mb-2">2. Light and metabolic timing amplify or destroy the signal.</p>
              <p className="text-[#f1faee]/70">Light exposure at the wrong time of day actively works against you. Caffeine cleared at the wrong time keeps cortisol elevated at 3am. These aren't minor tweaks — they're the difference between a system that holds and one that collapses. The timing protocols here draw on the same principles used in astronaut circadian reset research.</p>
            </div>

            <div className="bg-[#0f0e17]/60 p-6 rounded-xl border-l-4 border-[#a8dadc]">
              <p className="text-[#a8dadc] font-bold text-lg mb-2">3. Environment and behavior can only compound a stable rhythm — they can't create one.</p>
              <p className="text-[#f1faee]/70">This is why your wind-down routine doesn't work consistently. It's not the routine. It's that the biological rhythm it's supposed to anchor to isn't stable yet. Once the rhythm exists, everything in Days 3–7 locks in fast.</p>
            </div>
          </div>

          <p className="text-[#f1faee] font-semibold text-lg mt-8">
            The Sequential Reset builds these in the right order. By Day 7, the system runs on its own.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECOND TESTIMONIAL — woven mid-page          */}
        {/* v5: Different problem (4am wake-ups), Day 4   */}
        {/* ============================================ */}
        <div className="mb-14 bg-[#16213e] border-l-4 border-[#e63946] rounded-r-xl p-6">
          <p className="text-[#f1faee]/70 italic text-lg mb-3">
            "4am anxiety wake-ups every single morning for two years. Melatonin helped me fall asleep but didn't stop the waking. I started to think this was just my life now."
          </p>
          <p className="text-[#f1faee]/80 mb-3">
            Lisa moved her last coffee two hours earlier on Day 4. That's it. One adjustment, in the right place in the sequence. The 4am wake-ups that had been there for two years stopped within four days.
          </p>
          <p className="text-[#f1faee]/70 italic text-lg">
            "I don't fully understand why but I'm not questioning it."
          </p>
          <p className="text-[#a8dadc] font-semibold mt-3">— Marketing Director, 38</p>
          <p className="text-[#f1faee]/50 text-sm mt-1">2-year 4am wake-up pattern resolved by a single Day 4 caffeine timing adjustment.</p>
          <p className="text-[#f1faee]/40 text-xs mt-3 italic">
            *Name changed for privacy. Based on real feedback from an early protocol user. Individual results will vary.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 6: NIGHT BY NIGHT                    */}
        {/* v5: Honest expectations (no overpromising)   */}
        {/* Compliance: softened "85%" → "most users"    */}
        {/* ============================================ */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
            What to Expect — Night by Night
          </h2>
          <p className="text-[#f1faee]/70 italic mb-6">Honest expectations. No overpromising.</p>
          <div className="space-y-4">
            {[
              { night: 'Night 1', desc: 'Foundation work. Probably not dramatically different. Sleep may feel slightly off as your system starts calibrating — that\'s normal and temporary.' },
              { night: 'Night 2–3', desc: 'Something shifts. Not perfect — but noticeable. Most early users reported a meaningful change by Night 3. Falling asleep faster, waking less.*' },
              { night: 'Night 4–5', desc: 'The 3am wake-ups, if that\'s your pattern, typically reduce or disappear here. Day 4\'s caffeine and meal timing adjustments start paying off.' },
              { night: 'Night 6–7', desc: 'The system is compounding. People report waking before the alarm. Mornings feel qualitatively different.' },
              { night: 'After Day 7', desc: 'You stop managing sleep. It runs itself.' },
            ].map(({ night, desc }) => (
              <div key={night} className="flex gap-4 bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
                <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-lg px-3 py-1 font-bold text-sm flex-shrink-0 h-fit mt-1">{night}</div>
                <p className="text-[#f1faee]/80">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#f1faee]/40 text-xs mt-4 italic">
            *Based on self-reported feedback from early protocol users. Some people see faster results, some slower. Night 1 disruption is normal and temporary. Individual results will vary.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 7: FOUNDER'S STORY                   */}
        {/* v5: NEW — raw, no fake credentials, honest   */}
        {/* ============================================ */}
        <div className="mb-12 bg-[#0f0e17]/60 border border-[#4a4e69]/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#f1faee] mb-6">
            Why This Was Built
          </h2>
          <div className="space-y-4 text-[#f1faee]/80 text-lg leading-relaxed">
            <p>
              This protocol exists because the person who built it spent three years being a walking contradiction.
            </p>
            <p>
              Deep in sleep research. Couldn't sleep.
            </p>
            <p>
              Every intervention in the literature was on the shelf — melatonin at the right dose, blackout curtains, temperature dialed to 67°F, magnesium glycinate, no caffeine after noon. None of it held consistently. Some nights worked. Most didn't.
            </p>
            <p>
              The turning point wasn't a new discovery. It was a sequencing question: <em className="text-[#a8dadc]">what if the order matters more than the interventions?</em>
            </p>
            <p>
              Obvious in retrospect. The circadian anchor has to come first. Light exposure only works once the anchor is stable. Environment only compounds a rhythm that already exists. Behavioral tools only stick when the biological foundation supports them.
            </p>
            <p>
              Applied in the right sequence, it worked — consistently — for the first time. Then tested on others who'd tried everything. Same result.
            </p>
            <p className="text-[#f1faee]/60 italic">
              No celebrity endorsement. No viral backstory. Just someone who was exhausted, figured out the order, and wrote it down.
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 8: HOW IS THIS DIFFERENT             */}
        {/* ============================================ */}
        <div className="mb-12 space-y-5 text-lg leading-relaxed">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            How Is This Different From What I've Already Tried?
          </h2>
          <div className="space-y-4">
            {[
              { label: 'vs. Melatonin', desc: 'Useful in the right sequence. Insufficient without a stable wake anchor established first. Most people take it as step one when it\'s actually step four.' },
              { label: 'vs. Sleep hygiene checklists', desc: 'Ten simultaneous changes = nervous system resistance. A checklist is the wrong format for a sequential biological problem.' },
              { label: 'vs. Magnesium & supplements', desc: 'Day 4+ work. Taken before Days 1–3 are stable, they add variables instead of clarity.' },
              { label: 'vs. Meditation & breathing apps', desc: 'Wind-down tools are Day 5 work. Without the circadian foundation, results are inconsistent — exactly what most people experience.' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
                <p className="text-[#a8dadc] font-semibold mb-2">{label}</p>
                <p className="text-[#f1faee]/70">{desc}</p>
              </div>
            ))}
          </div>
          <p className="text-[#f1faee] font-semibold text-xl bg-[#16213e] p-6 rounded-xl border border-[#4a4e69]/30">
            The difference isn't the components. It's the sequence.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 9: IS THIS FOR YOU?                  */}
        {/* ============================================ */}
        <div className="mb-12 bg-[#16213e] border border-[#4a4e69]/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#f1faee] mb-6">Is This For You?</h2>
          <div className="space-y-3 mb-6">
            {[
              "You've tried the standard fixes and they haven't held long-term",
              "You wake up at 2, 3, or 4am and struggle to get back to sleep",
              "You feel exhausted even after a full night",
              "Your energy crashes mid-afternoon without fail",
              "You're skeptical — because you've been burned before",
              "You want reliable sleep, not magic",
            ].map(item => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-green-400 mt-1 flex-shrink-0">✓</span>
                <p className="text-[#f1faee]/80">{item}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#4a4e69]/30 pt-6">
            <p className="text-[#f1faee]/60 font-semibold mb-3">This probably isn't for you if:</p>
            <ul className="space-y-2 text-[#f1faee]/50 text-sm">
              <li>• You have a diagnosed sleep disorder — consult your doctor first. This is a lifestyle protocol, not medical treatment.</li>
              <li>• You're not willing to follow the 7-day sequence — results depend on doing the days in order.</li>
              <li>• You're looking for a supplement or medication.</li>
            </ul>
            <p className="text-[#f1faee]/50 text-sm mt-4 italic">
              <strong className="text-[#f1faee]/60">On medications:</strong> This is a behavioral and environmental protocol — no substances. It doesn't interact with sleep medications and can be followed alongside any medical care you're receiving.
            </p>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 10: DAY BY DAY                       */}
        {/* Compliance: "astronaut circadian research"   */}
        {/* ============================================ */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-8 text-center">
            Exactly What You'll Do Each Day
          </h2>
          <div className="space-y-5 mb-10">
            {[
              {
                day: '1',
                title: 'Anchor Your Circadian Master Clock',
                time: '15 min',
                desc: 'Set your precise wake time using the Sleep Pressure Formula. Your wake time is the master variable — it controls cortisol, melatonin, body temperature, and everything downstream. One calculation. Everything in Days 2–7 depends on this being in place first.',
                why: 'Why first: Without a stable wake anchor, every subsequent intervention is building on shifting sand.'
              },
              {
                day: '2',
                title: 'Strategic Light Exposure Protocol',
                time: '20 min across the day',
                desc: 'A 3-part light protocol — specific timing and duration for morning, midday, and evening. Drawing on the same principles used in astronaut circadian reset research. No special equipment required. Amplifies the signal from Day 1.',
                why: 'Why Day 2: Light amplification only works after the anchor is stable — used before, it introduces noise instead of signal.'
              },
              {
                day: '3',
                title: 'The Sleep Cave Reset',
                time: '30 min, one-time',
                desc: 'Three specific environmental changes — temperature, light, and sound — using the included Sleep Environment Audit Checklist. Under $30 total. Works now because your rhythm has a foundation to build on.',
                why: 'Why Day 3: Environmental cues only shift behavior after the internal biological rhythm exists.'
              },
              {
                day: '4',
                title: 'Caffeine & Food Timing Reset',
                time: '10 min to adjust your routine',
                desc: 'Apply the Caffeine Cutoff Formula to find your personal last-coffee window (it\'s probably later than you think). One meal timing adjustment eliminates the cortisol spike behind most 3am wake-ups. Keep your coffee — just move it.',
                why: 'Why Day 4: Metabolic adjustments integrate cleanly once the circadian system is stable. Introduced earlier, they add confusion.'
              },
              {
                day: '5',
                title: '"Realistic" Wind-Down Sequence',
                time: '20–30 min before bed',
                desc: 'Build a personalized 3-step wind-down using the Wind-Down Builder in the protocol. Works even if you\'re on your phone right up until bed. The key is sequencing the transition from activation to rest — not restriction.',
                why: 'Why Day 5: Wind-down routines need a biological substrate to anchor to. Days 1–4 built that substrate.'
              },
              {
                day: '6',
                title: 'Sleep Cycle Alignment',
                time: '5 min, one calculation',
                desc: 'Use the Cycle Calculator to find your optimal wake window based on your natural 90-minute sleep architecture. Adjust your alarm by 15–30 minutes. The grogginess that hits even after 8 hours — eliminated.',
                why: 'Why Day 6: Cycle optimization only produces consistent results after sleep quality and timing are stable.'
              },
              {
                day: '7',
                title: 'Integration & Chaos-Proofing',
                time: '20 min',
                desc: 'Build your personal Maintenance Protocol — a decision tree for protecting your sleep when travel, stress, sick kids, late nights, or anything else disrupts the routine. Then stop actively managing and let the system run.',
                why: 'Why Day 7: Integration only holds after each element has been practiced individually.'
              },
            ].map(({ day, title, time, desc, why }) => (
              <div key={day} className="bg-[#0f0e17]/60 rounded-xl p-6 border-l-4 border-[#a8dadc]">
                <div className="flex items-start gap-4">
                  <div className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">{day}</div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <p className="text-[#a8dadc] font-bold text-lg">{title}</p>
                      <span className="text-[#f1faee]/40 text-sm bg-[#16213e] px-2 py-0.5 rounded">{time}</span>
                    </div>
                    <p className="text-[#f1faee]/70 mb-3">{desc}</p>
                    <p className="text-[#f1faee]/40 italic text-sm">{why}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Start Tonight — Get The Complete Protocol', 'method_section')}
              className="inline-block bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-4 px-8 rounded-xl transition text-xl shadow-lg hover:shadow-xl"
            >
              Start Tonight — Get The Complete Protocol
            </a>
          </div>
        </div>

        {/* ============================================ */}
        {/* THIRD TESTIMONIAL — woven near bottom        */}
        {/* v5: Shift worker / skeptic angle             */}
        {/* ============================================ */}
        <div className="mb-14 bg-[#16213e] border-l-4 border-[#a8dadc] rounded-r-xl p-6">
          <p className="text-[#f1faee]/70 italic text-lg mb-3">
            "I don't see how a 7-day protocol helps shift workers. My schedule doesn't stay the same for 7 days."
          </p>
          <p className="text-[#f1faee]/80 mb-3">
            Marcus is an ER nurse on rotating shifts. He'd accepted that real sleep wasn't possible for someone like him.
          </p>
          <p className="text-[#f1faee]/70 italic text-lg mb-3">
            "The light exposure piece on Day 2 was the thing I'd never encountered anywhere — not in nursing school, not from my own doctor. It's specific enough to actually use."
          </p>
          <p className="text-[#f1faee]/80 mb-3">
            He sleeps better on night shifts now than most of his day-shift colleagues.
          </p>
          <p className="text-[#f1faee]/70 italic text-lg">
            "My wife says it's like having the person she married back. I don't say that lightly."
          </p>
          <p className="text-[#a8dadc] font-semibold mt-3">— ER Nurse, rotating shifts</p>
          <p className="text-[#f1faee]/40 text-xs mt-3 italic">
            *Name changed for privacy. Based on real feedback from an early protocol user. Individual results will vary.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 11: VALUE STACK                      */}
        {/* ============================================ */}
        <div className="mb-16 bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-4 text-center">Everything You Get</h3>
          <p className="text-lg text-[#f1faee]/70 mb-8 text-center">
            Instant digital download. No app, no account, no subscription.
          </p>

          <div className="max-w-lg mx-auto space-y-3 mb-10">
            {[
              { item: '7-Day Sequential Reset Protocol', detail: 'PDF, 47 pages — full day-by-day system with all formulas, calculators, and decision trees', value: '$97' },
              { item: 'Sleep Environment Audit Checklist', detail: 'PDF, 8 pages — room-by-room, under $30 total', value: '$29' },
              { item: 'Evidence-Based Supplement Timing Guide', detail: 'PDF, 12 pages — what helps, what doesn\'t, exactly when', value: '$29' },
              { item: 'Sleep Progress Tracking Templates', detail: 'Fillable PDF — daily + weekly tracking', value: '$19' },
              { item: 'Emergency Sleep Recovery Protocol', detail: 'PDF, 6 pages — travel, illness, jet lag, broken nights', value: '$19' },
              { item: 'Lifetime Updates', detail: 'Every protocol update delivered free', value: '$47' },
            ].map(({ item, detail, value }) => (
              <div key={item} className="py-4 px-5 bg-[#0f0e17]/60 rounded-lg border border-[#4a4e69]/30">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-[#f1faee] font-medium">{item}</p>
                    <p className="text-[#f1faee]/50 text-sm mt-0.5">{detail}</p>
                  </div>
                  <span className="text-[#f1faee]/50 text-sm flex-shrink-0">Est. <span className="line-through">{value}</span></span>
                </div>
              </div>
            ))}

            <div className="border-t-2 border-[#a8dadc]/50 pt-4 mt-4">
              <div className="flex justify-between items-center py-4 px-5 bg-[#a8dadc]/10 rounded-lg border-2 border-[#a8dadc]/30">
                <span className="text-[#f1faee] font-bold text-xl">Total Estimated Value</span>
                <span className="text-[#f1faee] font-bold text-2xl line-through opacity-60">$240</span>
              </div>
            </div>
          </div>

          <div className="text-center mb-8">
            <p className="text-[#f1faee]/60 text-lg mb-3">Your price today:</p>
            <div className="text-7xl font-bold text-[#a8dadc] mb-3">$17</div>
            <p className="text-[#f1faee]/60 mb-1">One-time payment • Instant download • Lifetime access</p>
            <p className="text-[#f1faee]/50 text-sm">Less than $2.50/day. Download link in your inbox within 2 minutes of purchase.</p>
          </div>

          <div className="text-center">
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Join the Reset For Just $17', 'value_stack')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Join the Reset For Just $17
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Secure checkout • 60-day guarantee • Instant download</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 12: GUARANTEE                        */}
        {/* ============================================ */}
        <div className="mb-16 bg-green-500/5 border-2 border-green-500/30 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-6">🛡️</div>
          <h3 className="text-3xl font-bold text-green-400 mb-6">
            60-Day "Reliable Sleep or Full Refund" Guarantee
          </h3>
          <p className="text-[#f1faee]/80 max-w-3xl mx-auto mb-6 text-lg leading-relaxed">
            Follow the 7-day sequence. If you don't notice a real difference in how you sleep, how you wake up, or how you feel — email within 60 days for a complete refund. No forms. No hoops. No questions asked.
          </p>
          <p className="text-[#f1faee]/70 max-w-2xl mx-auto text-lg">
            This isn't here to pressure you into buying. It's here so that <em>price</em> isn't the reason you don't try something that might actually work.
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 13: FAQ — Accordion                  */}
        {/* ============================================ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-[#f1faee] mb-10 text-center">Common Questions</h3>
          <div className="max-w-4xl mx-auto divide-y divide-[#4a4e69]/30 border border-[#4a4e69]/30 rounded-xl overflow-hidden">
            {[
              {
                q: "I've tried everything. Why would this be different?",
                a: "Because the issue isn't what you've tried — it's the order. The Sequential Reset doesn't introduce new interventions. It applies what already works in the sequence your biology requires. Different mechanism, not different ingredients."
              },
              {
                q: "What exactly is this? A course? A supplement?",
                a: "Neither. It's a PDF protocol — 47 pages of day-by-day instructions with all worksheets and calculators built in. Instant download, no account required, no recurring charges. Read it once, follow the days, keep it forever."
              },
              {
                q: "How long until I notice something?",
                a: "Most people notice a shift by Night 3. The 3am wake-up pattern — if that's your issue — typically responds by Day 4. Night 1 may feel slightly different as the system calibrates — that's normal and temporary."
              },
              {
                q: "What if my schedule is unpredictable — shifts, travel, kids?",
                a: "Day 7 is built specifically for chaos. Dedicated sections for shift workers, frequent travelers, and new parents. Some of the strongest results came from people who thought their situation was unsolvable."
              },
              {
                q: "Can I do this if I'm on sleep medication?",
                a: "Yes. This is a behavioral protocol — no substances or supplements, no interactions. It can run alongside any medical care you're receiving. If you're hoping to reduce medication dependence over time, that's a separate conversation with your doctor."
              },
              {
                q: "What if I miss a day?",
                a: "Each day includes a minimum-viable version for difficult days. Missing one day doesn't reset the protocol. Pick up where you left off."
              },
              {
                q: "How long do I have access?",
                a: "Forever. It's a download — no expiration, no subscription, no renewal required."
              },
            ].map(({ q, a }, i) => (
              <div key={q} className="bg-[#16213e]">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#1e2a40] transition-colors"
                >
                  <span className="text-[#f1faee] font-semibold text-lg">{q}</span>
                  <span className={`text-[#a8dadc] text-2xl flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p className="text-[#f1faee]/80 text-lg leading-relaxed">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ============================================ */}
        {/* SECTION 14: FINAL CTA                        */}
        {/* ============================================ */}
        <div className="mb-16 text-center">
          <div className="bg-gradient-to-br from-[#16213e] to-[#0f0e17] border-2 border-[#a8dadc]/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-6">
              You're not looking for a miracle.
            </h3>
            <p className="text-lg text-[#f1faee]/80 mb-8 max-w-2xl mx-auto">
              You're looking for a Tuesday where you wake up before your alarm and feel like a person. That's not too much to ask. And it's not as far away as it feels right now.
            </p>
            <a
              href={checkoutUrl}
              onClick={() => handleCheckoutClick('Join the Reset — $17', 'final_cta')}
              className="inline-block w-full sm:w-auto bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-12 rounded-xl transition text-2xl shadow-lg hover:shadow-xl mb-4"
            >
              Join the Reset — $17
            </a>
            <div className="flex items-center justify-center gap-2 text-sm text-[#f1faee]/60">
              <span className="text-green-400 text-lg">🔒</span>
              <span>Instant download • 60-day guarantee • Lifetime access</span>
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* P.S.                                         */}
        {/* ============================================ */}
        <div className="mb-16">
          <div className="max-w-3xl mx-auto text-left space-y-5 text-[#f1faee]/70 border-t border-[#4a4e69]/30 pt-10">
            <p className="text-lg">
              <strong className="text-[#f1faee]">P.S.</strong> The goal isn't perfect sleep. The goal is sleep you can count on — that makes the next day, and the day after that, feel manageable. Seven days to build a system that runs without you managing it anymore.
            </p>
            <p className="text-lg">
              For $17, with a 60-day guarantee if it doesn't work.
            </p>
            <p className="text-lg">
              <strong className="text-[#f1faee]">P.P.S.</strong> Most people who got results were skeptical first. The guarantee exists so skepticism doesn't cost you the chance to find out.
            </p>
          </div>
        </div>

        {/* No Thanks */}
        <div className="text-center mb-12">
          <Link
            to="/blog"
            className="text-[#f1faee]/30 hover:text-[#f1faee]/50 transition text-sm"
          >
            No thanks, I'll keep trying random sleep tips that don't work
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/40">
          <p className="mb-2">© 2026 Sleep Smarter. Not medical advice.</p>
          <div className="flex justify-center gap-4 mb-3">
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Disclosure</Link>
          </div>
          <p className="text-xs text-[#f1faee]/30 max-w-2xl mx-auto">
            Results mentioned on this page are based on self-reported feedback from early users of the protocol. Individual results will vary based on effort, consistency, health status, and personal circumstances. This protocol is not a substitute for professional medical advice. If you have a sleep disorder, please consult a healthcare provider.
          </p>
        </div>
      </footer>
    </div>
  )
}
