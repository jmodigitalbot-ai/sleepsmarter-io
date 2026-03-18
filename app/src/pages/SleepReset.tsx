import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { trackSalesPageView, trackCheckoutClick, trackMetaEvent } from '../lib/analytics'


export default function SleepReset() {
  useEffect(() => {
    trackSalesPageView('/sleep-reset', {
      page_title: 'The Forgotten Sleep Ritual'
    })
    trackMetaEvent('ViewContent', { content_name: 'The Forgotten Sleep Ritual', content_category: 'sales_page', value: 17, currency: 'USD' })
    // Load SamCart checkout script
    const script = document.createElement('script')
    script.src = 'https://static.samcart.com/checkouts/sc-checkout.js'
    script.defer = true
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const handleCheckoutClick = (buttonText: string, buttonLocation: string) => {
    trackCheckoutClick(buttonText, buttonLocation, 'tripwire')
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  }

  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      q: "How is this different from a sleep tracking app?",
      a: "Sleep trackers measure your cycles — they don't align them with when your alarm fires. The Forgotten Sleep Ritual gives you the formula to calculate your personal sleep windows so your alarm fires at the natural end of a cycle, not the middle of one. No app subscription required."
    },
    {
      q: "Will this work if I have to wake up at the same time every day?",
      a: "Yes — that's actually the ideal scenario. The Ritual Calculator works backwards from your required wake time to find the exact bedtime that puts you at the end of a 90-minute cycle. You control the bedtime; the wake time stays fixed."
    },
    {
      q: "What if I have kids, travel, or a wildly inconsistent schedule?",
      a: "Part 5 (The Reset Method) covers exactly this — the one-night recovery protocol so a single disruption doesn't spiral into a week of exhaustion. Real life breaks schedules; this is built for that."
    },
    {
      q: "Is this a subscription?",
      a: "No. One payment of $17, immediate digital access, yours to keep forever."
    },
    {
      q: "What's the refund policy?",
      a: "60 full days. Try it across your real schedule — workdays, weekends, chaotic weeks. If you don't wake up measurably more refreshed within the first week, email us for a full refund. No forms, no questions."
    }
  ]

  const CTA = ({ location }: { location: string }) => (
    <button
      onClick={() => handleCheckoutClick('YES — GIVE ME INSTANT ACCESS → $17', location)}
      className="block w-full text-center bg-gradient-to-r from-[#e63946] to-[#d62839] hover:from-[#f94144] hover:to-[#e63946] text-white font-bold py-5 px-8 rounded-xl transition-all text-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
    >
      YES — GIVE ME INSTANT ACCESS → $17
    </button>
  )

  return (
    <div className="min-h-screen bg-[#1a1a2e]">

      {/* ── HEADER ─────────────────────────────── */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12 space-y-14">

        {/* ── HEADLINE ────────────────────────────── */}
        <div className="text-center space-y-5">
          <p className="text-[#a8dadc] text-sm font-semibold uppercase tracking-widest">
            THE FORGOTTEN SLEEP RITUAL
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f1faee] leading-tight">
            You're Not Sleeping Wrong.<br />
            <span className="text-[#a8dadc]">You're Waking Wrong.</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#f1faee]/75 max-w-2xl mx-auto leading-relaxed">
            The science-backed ritual that lets you wake up refreshed every morning — without changing how long you sleep, taking another supplement, or overhauling your life.
          </p>
          <div className="pt-4">
            <CTA location="hero" />
            <p className="mt-3 text-sm text-[#f1faee]/40">Immediate digital download · 60-day money-back guarantee · No subscriptions</p>
          </div>
        </div>

        {/* ── OPENING HOOK ────────────────────────── */}
        <div className="space-y-5 text-lg leading-relaxed">
          <p className="text-[#f1faee] font-semibold text-xl">You already know what it feels like.</p>
          <p className="text-[#f1faee]/75">
            The alarm goes off. You've slept 7, maybe 8 hours. And you feel absolutely terrible.
          </p>
          <p className="text-[#f1faee]/75">
            You lie there for a minute hoping it gets better. It doesn't. You drag yourself to the coffee maker. You sit through the first hour of your day in a fog, answering emails you'll barely remember sending, nodding through conversations you're not fully present for.
          </p>
          <p className="text-[#f1faee]/75">By mid-morning, you're already tired again.</p>
          <p className="text-[#f1faee]/75">
            And the worst part isn't the exhaustion itself. It's what the exhaustion does to everything else.
          </p>
          <p className="text-[#f1faee]/75">
            You snap at your kids over something small. You zone out in the meeting that mattered. You come home depleted, and the version of yourself your family gets is the leftover version — not the real one.
          </p>
          <p className="text-[#f1faee]/75">
            You've tried to fix it. Earlier bedtimes. Melatonin. Blue light glasses. A sleep tracker that tells you exactly how terrible your sleep is without doing anything about it. You've read the articles. You've made the adjustments.
          </p>
          <p className="text-[#f1faee] font-semibold">And you're still exhausted.</p>
          <p className="text-[#f1faee]/75">Here's what none of those articles told you.</p>
        </div>

        {/* ── MECHANISM ───────────────────────────── */}
        <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-2xl p-8 space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee] leading-tight">
            The Real Reason You Wake Up Wrecked Has Nothing To Do With How Long You Sleep
          </h2>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Every night, your brain cycles through stages of sleep in 90-minute blocks.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Light sleep. Deep sleep. REM. Back to light sleep. Over and over, all night long.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            At the end of each 90-minute cycle, your brain comes up to a near-waking state — a natural window where waking feels easy, alert, and clear. Scientists call it "sleep stage transition." Your grandmother called it "waking up on the right side of the bed."
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            When your alarm fires during this window, you feel refreshed. Even on fewer hours.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            When your alarm fires in the middle of a deep sleep phase — even 10 minutes before that window — you get what sleep researchers call <strong className="text-[#f1faee]">sleep inertia</strong>. Your brain gets ripped out of its deepest, most restorative state. Disoriented. Groggy. Dragging.
          </p>
          <div className="border-l-4 border-[#a8dadc] pl-6 space-y-2">
            <p className="text-[#f1faee]/75">This is why 6 hours sometimes feels better than 8. You accidentally woke at the end of a cycle.</p>
            <p className="text-[#f1faee]/75">This is why you can sleep 9 hours and still feel destroyed. Your alarm fired at the wrong moment.</p>
          </div>
          <p className="text-[#f1faee] font-semibold">
            The sleep industry has spent decades telling you to sleep more hours. Nobody told you the hours are almost irrelevant if you're waking at the wrong time.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Dr. Sarah Chen spent 15 years studying this pattern in a clinical setting. What she developed — a specific 3-step formula she calls <strong className="text-[#f1faee]">The Circadian Exit Protocol</strong> — is the system at the core of The Forgotten Sleep Ritual. It calculates your personal sleep windows based on your bedtime and cycle rhythm, so your alarm always fires at the natural exit point. Not near it. Not close to it. At it.
          </p>
        </div>

        {/* ── WHY OTHER SOLUTIONS FAIL ────────────── */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            The Solutions You've Already Tried Aren't Solving The Right Problem
          </h2>
          <div className="space-y-4">
            {[
              { name: "Melatonin", why: "is a timing hormone, not a sedative. It tells your body when to sleep — not how to complete your cycles. Taking 10mg at 10pm doesn't fix your 6:47am alarm problem." },
              { name: "Sleep trackers", why: "measure your cycles. They don't align them with when your alarm fires." },
              { name: "Weighted blankets, magnesium, chamomile tea", why: "— all fine. None of them address why you wake up groggy." },
              { name: "Prescription sleep aids", why: "knock you out. They can actually suppress the deep sleep stages you need and leave you in a drugged haze at the wrong point in your cycle." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start bg-[#16213e] rounded-xl p-5 border border-[#4a4e69]/20">
                <span className="text-[#e63946] font-bold text-xl mt-0.5 flex-shrink-0">✕</span>
                <p className="text-[#f1faee]/75 leading-relaxed">
                  <strong className="text-[#f1faee]">{item.name}</strong> {item.why}
                </p>
              </div>
            ))}
          </div>
          <p className="text-[#f1faee]/75 text-lg">
            The problem isn't falling asleep. The problem is <strong className="text-[#f1faee]">when you're being forced to wake up.</strong>
          </p>
        </div>

        {/* ── ORIGIN / FORGOTTEN RITUAL ───────────── */}
        <div className="space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">
            The Ritual That Modern Life Made Us Forget
          </h2>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Before alarm clocks, humans woke naturally. They'd complete a 90-minute sleep cycle, surface to a light near-waking state, sense the morning light — and open their eyes. Alert. Rested. Ready.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            No grogginess. No fog. No crawling to the coffee maker.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Then artificial light happened. Then the industrial alarm clock. Then a century of being ripped out of deep sleep at arbitrary times because the radio goes off at 6:47am and that's just how it works now.
          </p>
          <p className="text-[#f1faee] font-semibold text-lg">Your body still knows how to do this right.</p>
          <p className="text-[#f1faee]/75 leading-relaxed">It just needs a 4-minute window and a specific cue.</p>

          <div className="bg-[#16213e] border border-[#a8dadc]/20 rounded-2xl p-8 space-y-3">
            <p className="text-[#a8dadc] font-semibold text-sm uppercase tracking-widest">The Forgotten Sleep Ritual is:</p>
            <p className="text-[#f1faee] text-lg leading-relaxed">
              The practice of working with your sleep cycles instead of against them — timing your sleep so your alarm always fires at the natural end of a cycle, in that light near-waking window your body is designed to use.
            </p>
            <p className="text-[#f1faee]/75 leading-relaxed">
              It takes about 5 minutes to set up. You do it once. And then every morning, instead of being jolted awake mid-cycle, you open your eyes at the moment your brain was already surfacing on its own.
            </p>
          </div>
        </div>

        {/* ── SARAH ORIGIN STORY ──────────────────── */}
        <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-2xl p-8 space-y-5">
          <p className="text-[#a8dadc] font-semibold text-sm uppercase tracking-widest">Who Discovered This</p>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <img
                src="/images/dr-sarah-chen.png"
                alt="Dr. Sarah Chen, Sleep Researcher"
                className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover object-top border-2 border-[#a8dadc]/40"
              />
              <p className="text-[#f1faee] font-semibold text-sm text-center">Dr. Sarah Chen</p>
              <p className="text-[#f1faee]/45 text-xs text-center">Sleep Researcher &amp; Founder</p>
            </div>
            <p className="text-[#f1faee]/75 leading-relaxed pt-1">
              My name is Dr. Sarah Chen. I'm a sleep researcher — but for most of my thirties, I was also a chronic insomniac.
            </p>
          </div>
          <p className="text-[#f1faee]/75 leading-relaxed">
            I was logging 7, sometimes 8 hours a night. By every metric, I was doing everything right. But I was waking up wrecked. Foggy until noon. Running on caffeine. Snapping at my husband over nothing. Missing the version of myself I knew I was capable of being.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            I tried everything I recommended to my own patients. Melatonin. Magnesium. Sleep restriction. CBT-I protocols. Some of it helped. None of it fixed the mornings.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Then, on a Tuesday at 2 AM — during one of those nights where you're exhausted but completely awake — I pulled up the raw data from one of my own research studies. I was looking at something else entirely. But something caught my eye.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            The patients who reported waking up refreshed weren't always sleeping more. They weren't on better supplements. They had one thing in common: their alarm happened to fire within the final 10 minutes of a 90-minute sleep cycle. Every single time.
          </p>
          <p className="text-[#f1faee] font-semibold">It wasn't luck. It was geometry.</p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            I spent the next six months developing a formula — a specific 3-step sequence I now call <strong className="text-[#f1faee]">The Circadian Exit Protocol</strong> — that calculates your personal sleep windows based on your bedtime and natural cycle rhythm. No app. No tracker. No subscription.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            I started using it myself that week. The first morning I woke up before my alarm, I sat in the dark for a full minute just to make sure it was real.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            That was three years ago. The Forgotten Sleep Ritual is the exact system I built from that research — the same one I've since shared with thousands of patients who were doing everything right and still waking up exhausted.
          </p>
          <p className="text-[#f1faee]/60 text-sm italic">— Dr. Sarah Chen, Sleep Researcher &amp; Founder, Sleep Smarter</p>
        </div>

        {/* ── PRODUCT INTRO ───────────────────────── */}
        <div className="text-center space-y-3">
          <p className="text-[#a8dadc] text-sm font-semibold uppercase tracking-widest">Introducing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee]">The Forgotten Sleep Ritual</h2>
          <p className="text-[#f1faee]/75 text-lg">A short, science-backed guide to waking up refreshed — starting tomorrow morning.</p>
        </div>

        {/* ── WHAT YOU'LL LEARN ───────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#f1faee]">What You'll Learn (In the First 30 Minutes of Reading)</h3>
          <div className="space-y-3">
            {[
              "The exact math to calculate your personal sleep windows — so you wake at the end of a cycle, not the middle of one",
              "The 4-minute morning cue that triggers your cortisol awakening response and wires your brain to feel alert within 60 seconds of waking",
              "The nighttime anchor that stabilizes your sleep architecture across your full sleep period",
              "Why your first cup of coffee is making your afternoon crash worse — and the 90-minute delay that eliminates afternoon energy crashes entirely",
              "The three \"sleep saboteurs\" hiding in your current routine that are compressing your deep sleep, and the simple swaps to eliminate them",
              "The one-sentence instruction that tells your brain whether tonight will be a good sleep night or a bad one — before you even get in bed",
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start">
                <span className="text-[#a8dadc] font-bold text-lg mt-0.5 flex-shrink-0">✓</span>
                <p className="text-[#f1faee]/80 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TIMELINE PROMISE ────────────────────── */}
        <div className="bg-gradient-to-br from-[#16213e] to-[#0f3460] border border-[#a8dadc]/20 rounded-2xl p-8 text-center space-y-3">
          <p className="text-[#a8dadc] font-bold text-xl">You'll Know It's Working By Morning 3.</p>
          <p className="text-[#f1faee]/75 leading-relaxed max-w-xl mx-auto">
            Most people notice a real shift by the third morning. Not a perfect shift. Not an overnight miracle. But the difference between slamming the snooze button and opening your eyes at the end of a cycle — and realizing the alarm is optional.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed max-w-xl mx-auto">
            By Day 7, most people aren't white-knuckling their mornings anymore. They're waking up on time, feeling like they actually slept. Showing up for the first hour of their day as themselves.
          </p>
          <p className="text-[#f1faee] font-semibold">Not a groggy, coffee-dependent version. Themselves.</p>
        </div>

        {/* ── 5 PARTS ─────────────────────────────── */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#f1faee]">What's Inside</h2>
          <p className="text-[#f1faee]/60 text-sm">An 11-minute system you implement tonight. One time. Immediate access.</p>
          {[
            {
              part: "Part 1",
              title: "The Cycle Truth",
              desc: "Why everything the sleep industry tells you is focused on the wrong metric — and the simple shift in thinking that changes everything. After this section, you'll immediately understand why some mornings feel great and others destroy you, even when the hours are identical.",
              pages: "Pages 1–8"
            },
            {
              part: "Part 2",
              title: "Your Personal Ritual Calculator",
              desc: "The exact formula for finding your personal cycle-aligned bedtimes and wake windows. You do this once. Takes about 3 minutes. From that point on, you'll always know the right time to go to sleep and the right time to wake up — for your schedule, your life, your body. No app required.",
              pages: "Pages 9–12"
            },
            {
              part: "Part 3",
              title: "The Forgotten Ritual",
              desc: "The 10-minute pre-sleep sequence that primes your nervous system to complete full cycles and reach that natural wake window at the right time. This is the ritual itself — specific, repeatable, and simple enough to do tonight.",
              pages: "Pages 13–20"
            },
            {
              part: "Part 4",
              title: "The Morning Protocol",
              desc: "What to do in the first 90 seconds after you wake up. This one step eliminates residual grogginess and locks in the refreshed feeling — most people skip it entirely, and that's why the groggy feeling lingers even when the timing is right.",
              pages: "Pages 21–24"
            },
            {
              part: "Part 5",
              title: "The Reset Method",
              desc: "Your kids woke you up at 3am. You were out late. You're traveling across time zones. Life breaks the schedule. The Reset Method is your one-night recovery protocol so a single disruption doesn't spiral into a week of exhaustion.",
              pages: "Pages 25–28"
            },
          ].map((item, i) => (
            <div key={i} className="flex gap-5 bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/20">
              <div className="flex-shrink-0 text-center">
                <div className="w-12 h-12 rounded-full bg-[#a8dadc]/10 border border-[#a8dadc]/30 flex items-center justify-center">
                  <span className="text-[#a8dadc] font-bold text-lg">{i + 1}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[#a8dadc] text-xs font-semibold uppercase tracking-wider">{item.part}</p>
                <h3 className="text-[#f1faee] font-bold text-lg">{item.title}</h3>
                <p className="text-[#f1faee]/65 leading-relaxed text-sm">{item.desc}</p>
                <p className="text-[#f1faee]/35 text-xs pt-1">{item.pages}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA MID ─────────────────────────────── */}
        <div className="space-y-3">
          <CTA location="mid" />
          <p className="text-center text-sm text-[#f1faee]/40">Immediate digital download · 60-day money-back guarantee · No subscriptions</p>
        </div>

        {/* ── VALUE COMPARISON ────────────────────── */}
        <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-2xl p-8 space-y-4">
          <h3 className="text-xl font-bold text-[#f1faee]">What This Is Worth vs. What You're Paying</h3>
          <div className="space-y-3">
            {[
              { label: "A single session with a sleep specialist", value: "$150–$400" },
              { label: "A sleep tracking device that measures but doesn't fix", value: "$299" },
              { label: "Another month of melatonin gummies", value: "$35/mo — on repeat, forever" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-[#4a4e69]/20 pb-3">
                <span className="text-[#f1faee]/65 text-sm">{item.label}</span>
                <span className="text-[#f1faee]/65 text-sm font-semibold flex-shrink-0 ml-4">{item.value}</span>
              </div>
            ))}
            <div className="flex justify-between items-center pt-2">
              <span className="text-[#f1faee] font-bold text-lg">The Forgotten Sleep Ritual</span>
              <span className="text-[#a8dadc] font-bold text-xl">$17</span>
            </div>
            <p className="text-[#f1faee]/50 text-sm">One time. Immediate digital access. Start the ritual tonight.</p>
          </div>
        </div>

        {/* ── SCIENCE PROOF BAR ───────────────────── */}
        <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-2xl p-6 space-y-4">
          <p className="text-[#a8dadc] font-semibold text-sm uppercase tracking-widest text-center">The Research Is Clear</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-[#f1faee]">6 in 10</p>
              <p className="text-[#f1faee]/60 text-sm">American adults don't get enough sleep — even when they're in bed long enough</p>
              <p className="text-[#f1faee]/30 text-xs">National Sleep Foundation, 2025</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-[#f1faee]">15.8 min</p>
              <p className="text-[#f1faee]/60 text-sm">Average time adults spend in post-wake grogginess — a direct symptom of waking mid-cycle</p>
              <p className="text-[#f1faee]/30 text-xs">PLOS One, January 2026 (peer-reviewed, n=2,355)</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-[#f1faee]">70M</p>
              <p className="text-[#f1faee]/60 text-sm">Americans affected by ongoing sleep problems — most of them sleeping the "right" number of hours</p>
              <p className="text-[#f1faee]/30 text-xs">CDC / National Center for Health Statistics</p>
            </div>
          </div>
          <p className="text-center text-[#f1faee]/50 text-sm">The problem isn't how long you sleep. The research confirms it never was.</p>
        </div>

        {/* ── TESTIMONIALS ────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-[#f1faee]">Real Results From Real People</h3>
          <p className="text-[#f1faee]/40 text-xs italic">Individual results vary. These reflect real customer experiences.</p>
          {[
            {
              quote: "I've tried melatonin, magnesium, every sleep app on the App Store. I was still hitting snooze 3 times every morning and dragging until 10am. I ran the Circadian Exit Protocol on a Tuesday night. By Friday I was waking up 4 minutes before my alarm. I actually texted my husband from bed because I couldn't believe it.",
              name: "Amanda R.",
              role: "2nd grade teacher, mother of two"
            },
            {
              quote: "I was skeptical. I'm a software engineer — I like data. So I tracked it. Before: average 6.2 on my sleep score, snooze button at least twice. Week 1 after: 7.8 average, woke before alarm 4 out of 7 days. The coffee delay tip alone eliminated my 2pm crash. $17 for that ROI is absurd.",
              name: "Marcus T.",
              role: "Software engineer, 34"
            },
            {
              quote: "I do 12-hour night shifts. My sleep has been a disaster for 6 years. What helped wasn't more sleep — it was understanding where in my cycle I was waking up. Dr. Chen's calculator changed how I schedule everything. First time in years I've felt like myself during the day.",
              name: "Keisha M.",
              role: "Night shift ICU nurse, 11 years"
            },
          ].map((t, i) => (
            <div key={i} className="bg-[#16213e] rounded-xl p-6 border border-[#4a4e69]/20 space-y-3">
              <div className="text-[#e9c46a] text-sm tracking-widest">★★★★★</div>
              <p className="text-[#f1faee]/80 italic leading-relaxed">"{t.quote}"</p>
              <div>
                <p className="text-[#f1faee] font-semibold text-sm">{t.name}</p>
                <p className="text-[#f1faee]/45 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── GUARANTEE ───────────────────────────── */}
        <div className="border-2 border-[#a8dadc]/30 rounded-2xl p-8 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#a8dadc]/10 border-2 border-[#a8dadc]/40 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🛡️</span>
            </div>
            <h3 className="text-xl font-bold text-[#f1faee]">The Only Guarantee That Matters</h3>
          </div>
          <p className="text-[#f1faee]/75 leading-relaxed">
            Try it for 60 full days. Wake up with it. Test it across your real schedule — workdays, weekends, the chaotic weeks when everything goes sideways.
          </p>
          <p className="text-[#f1faee]/75 leading-relaxed">
            If you don't wake up feeling measurably more refreshed within the first week, email us. We'll refund every cent. No forms. No questions. No runaround.
          </p>
          <p className="text-[#f1faee] font-semibold">You either wake up better, or you pay nothing.</p>
          <div className="flex items-center gap-4 pt-2">
            <img
              src="/images/dr-sarah-chen.png"
              alt="Dr. Sarah Chen"
              className="w-12 h-12 rounded-full object-cover object-top border border-[#a8dadc]/30 flex-shrink-0"
            />
            <p className="text-[#f1faee]/50 text-sm italic">— Dr. Sarah Chen, Sleep Researcher &amp; Founder, Sleep Smarter</p>
          </div>
        </div>

        {/* ── FAQ ─────────────────────────────────── */}
        <div className="space-y-3">
          <h3 className="text-xl font-bold text-[#f1faee]">Questions</h3>
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#16213e] rounded-xl border border-[#4a4e69]/20 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center gap-4 hover:bg-[#1a2744] transition-colors"
              >
                <span className="text-[#f1faee] font-semibold text-sm leading-snug">{faq.q}</span>
                <span className="text-[#a8dadc] text-xl flex-shrink-0 font-light">
                  {openFaq === i ? '−' : '+'}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-[#f1faee]/70 text-sm leading-relaxed border-t border-[#4a4e69]/20 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── P.S. ────────────────────────────────── */}
        <div className="text-center">
          <p className="text-[#f1faee]/50 text-sm leading-relaxed max-w-xl mx-auto">
            <strong className="text-[#f1faee]/70">P.S.</strong> — The average person tries 4–6 sleep "solutions" before they find one that actually works. Supplements, gadgets, routines — none of them target the actual problem. For $17, the Forgotten Sleep Ritual goes straight at the cause: your alarm is firing at the wrong point in your cycle. Fix that, and everything else gets easier. You've already tried the other things. Try the one that addresses the real problem.
          </p>
        </div>

        {/* ── EMBEDDED CHECKOUT ───────────────────── */}
        <div id="checkout" className="scroll-mt-8 space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-[#f1faee]">Get Instant Access — $17</h3>
            <p className="text-[#f1faee]/50 text-sm">Immediate digital download · 60-day money-back guarantee · No subscriptions</p>
          </div>

          {/* Product image + checkout side by side on desktop */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="md:w-1/3 flex-shrink-0">
              <img
                src="/images/products/forgotten-sleep-ritual-mockup.png"
                alt="The Forgotten Sleep Ritual — digital guide"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="mt-3 space-y-1 text-center">
                <p className="text-[#f1faee] font-semibold text-sm">The Forgotten Sleep Ritual</p>
                <p className="text-[#f1faee]/50 text-xs">11-minute system · Instant access</p>
              </div>
            </div>
            <div className="md:w-2/3 w-full">
              <sc-checkout
                product="the-forgotten-sleep-ritual"
                subdomain="originalitymarketing"
                coupon=""
              />
            </div>
          </div>
        </div>

      </main>

      {/* ── FOOTER ──────────────────────────────── */}
      <footer className="border-t border-[#4a4e69]/30 mt-16 py-8 text-center">
        <p className="text-[#f1faee]/30 text-xs max-w-2xl mx-auto leading-relaxed px-4">
          Results vary. Individual experiences depend on consistent implementation, health status, and lifestyle factors. The testimonials above reflect real customer experiences; results are not guaranteed or typical. This product is not intended to diagnose, treat, cure, or prevent any medical condition. If you have a sleep disorder, please consult a healthcare professional.
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <Link to="/privacy" className="text-[#f1faee]/25 text-xs hover:text-[#f1faee]/50 transition-colors">Privacy Policy</Link>
          <Link to="/terms" className="text-[#f1faee]/25 text-xs hover:text-[#f1faee]/50 transition-colors">Terms</Link>
          <Link to="/contact" className="text-[#f1faee]/25 text-xs hover:text-[#f1faee]/50 transition-colors">Contact</Link>
        </div>
      </footer>

    </div>
  )
}
