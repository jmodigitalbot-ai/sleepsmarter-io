import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { calculateSleepDebt, getAgeRecommendedSleep } from '../lib/sleepDebtPlanner'

const nightLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const faqs = [
  {
    question: 'How is sleep debt calculated?',
    answer: 'Sleep debt is the gap between your target sleep need and the hours you actually slept. This calculator adds the positive gaps from your last seven nights and ignores nights where you met or exceeded the target.',
  },
  {
    question: 'Can I catch up on all sleep debt in one weekend?',
    answer: 'Short-term sleep debt can improve with recovery sleep, but trying to repay everything in one long sleep can disrupt your body clock. A safer approach is a stable wake time, earlier bedtimes, and short naps when needed.',
  },
  {
    question: 'What is a dangerous amount of sleep debt?',
    answer: 'Any pattern that causes drowsy driving, unplanned sleep episodes, or regular nights under six hours deserves attention. If you also snore, gasp, or have chronic insomnia, talk with a qualified clinician.',
  },
  {
    question: 'Do naps reduce sleep debt?',
    answer: 'Short early-afternoon naps can reduce sleepiness and help bridge recovery, but long or late naps can make nighttime sleep harder. Keep recovery naps around 10–20 minutes unless a clinician advises otherwise.',
  },
]

const internalResources = [
  ['/blog/what-is-sleep-debt', 'What sleep debt is and why it compounds'],
  ['/blog/how-much-sleep-do-i-need', 'How much sleep you need by age'],
  ['/blog/why-do-i-wake-up-tired', 'Why you wake up tired after enough hours'],
  ['/blog/is-napping-good-for-you', 'How to nap without ruining bedtime'],
  ['/blog/caffeine-and-sleep', 'Caffeine timing and sleep pressure'],
  ['/blog/alcohol-and-sleep', 'Alcohol and fragmented sleep'],
  ['/blog/best-sleep-schedule-for-night-shift-workers', 'Night shift sleep schedule guide'],
  ['/blog/how-to-reset-circadian-rhythm', 'Reset your circadian rhythm'],
  ['/blog/sleep-apnea-symptoms', 'Sleep apnea symptoms and red flags'],
  ['/sleep-reset', '7-Day Sleep Reset Protocol'],
]

export default function SleepDebtCalculator() {
  const [ageGroup, setAgeGroup] = useState('adult')
  const [targetHours, setTargetHours] = useState(8)
  const [nights, setNights] = useState([7, 6.5, 6, 7, 6, 8, 7])
  const [wakeConsistency, setWakeConsistency] = useState<'consistent' | 'variable' | 'chaotic'>('variable')
  const [naps, setNaps] = useState<'none' | 'short' | 'long' | 'late'>('none')
  const [signals, setSignals] = useState({ caffeine: false, alcohol: false, nightShift: false, insomnia: false })

  const result = useMemo(() => calculateSleepDebt({ targetHours, nights, wakeConsistency, naps, signals }), [targetHours, nights, wakeConsistency, naps, signals])

  const updateNight = (index: number, value: string) => {
    const parsed = Number(value)
    setNights(current => current.map((night, i) => (i === index ? parsed : night)))
  }

  const updateAgeGroup = (value: string) => {
    setAgeGroup(value)
    setTargetHours(getAgeRecommendedSleep(value))
  }

  const severityStyles = {
    balanced: 'border-emerald-400/50 bg-emerald-400/10 text-emerald-200',
    mild: 'border-lime-400/50 bg-lime-400/10 text-lime-200',
    moderate: 'border-yellow-400/50 bg-yellow-400/10 text-yellow-100',
    high: 'border-orange-400/50 bg-orange-400/10 text-orange-100',
    severe: 'border-red-400/50 bg-red-400/10 text-red-100',
  }[result.severity]

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Sleep Debt Calculator + 7-Day Recovery Planner',
    description: 'Calculate your weekly sleep debt from the last seven nights and generate a safe 7-day recovery plan.',
    url: 'https://www.sleepsmarter.io/sleep-debt-calculator',
    mainEntity: {
      '@type': 'SoftwareApplication',
      name: 'Sleep Debt Calculator',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] text-[#f1faee]">
      <SEO
        title="Sleep Debt Calculator + 7-Day Recovery Planner"
        description="Calculate your weekly sleep debt from the last 7 nights and get a safe, practical 7-day recovery plan with red flags and catch-up sleep warnings."
        canonical="/sleep-debt-calculator"
        type="website"
        faqs={faqs}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.sleepsmarter.io/' },
          { name: 'Sleep Debt Calculator', url: 'https://www.sleepsmarter.io/sleep-debt-calculator' },
        ]}
        schema={schema}
      />

      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Sleep Calculator</Link>
            <Link to="/blog" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/sleep-reset" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Sleep Reset</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-start">
            <div>
              <p className="text-[#a8dadc] font-semibold mb-3">Free sleep recovery tool</p>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Sleep Debt Calculator + 7-Day Recovery Planner
              </h1>
              <p className="text-xl text-[#f1faee]/75 mb-6">
                Enter your last seven nights of sleep to estimate your weekly sleep debt, understand the severity, and build a recovery plan that does not wreck your circadian rhythm.
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-[#f1faee]/70">
                <span className="rounded-full bg-[#16213e] border border-[#4a4e69]/50 px-4 py-2">Last 7 nights</span>
                <span className="rounded-full bg-[#16213e] border border-[#4a4e69]/50 px-4 py-2">Age-adjusted target</span>
                <span className="rounded-full bg-[#16213e] border border-[#4a4e69]/50 px-4 py-2">Medical red flags</span>
              </div>
            </div>

            <aside className={`rounded-2xl border p-6 ${severityStyles}`} aria-live="polite">
              <p className="text-sm uppercase tracking-wide opacity-80 mb-2">Your current estimate</p>
              <div className="text-5xl font-bold mb-2">{result.weeklyDebt}h</div>
              <p className="text-lg font-semibold mb-1">{result.severityLabel}</p>
              <p className="opacity-90">Average sleep: {result.averageSleep}h/night · Gap: {result.nightlyGap}h/night</p>
            </aside>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-16 grid lg:grid-cols-[430px_1fr] gap-8 items-start">
          <div className="bg-[#16213e] rounded-2xl border border-[#4a4e69]/40 p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-5">Calculate your sleep debt</h2>

            <label className="block text-sm text-[#f1faee]/70 mb-2" htmlFor="age-group">Age group</label>
            <select
              id="age-group"
              value={ageGroup}
              onChange={(e) => updateAgeGroup(e.target.value)}
              className="w-full bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-3 mb-5 text-[#f1faee]"
            >
              <option value="teen">Teen (14–17): about 9h</option>
              <option value="young-adult">Young adult (18–25): about 8.5h</option>
              <option value="adult">Adult (26–64): about 8h</option>
              <option value="older-adult">Older adult (65+): about 7.5h</option>
            </select>

            <label className="block text-sm text-[#f1faee]/70 mb-2" htmlFor="target-hours">Target sleep need: {targetHours} hours</label>
            <input
              id="target-hours"
              type="range"
              min="6"
              max="10"
              step="0.5"
              value={targetHours}
              onChange={(e) => setTargetHours(Number(e.target.value))}
              className="w-full mb-6"
            />

            <fieldset className="mb-6">
              <legend className="text-sm text-[#f1faee]/70 mb-3">Last 7 nights of actual sleep</legend>
              <div className="grid grid-cols-7 gap-2">
                {nights.map((night, index) => (
                  <label key={nightLabels[index]} className="text-center text-xs text-[#f1faee]/60">
                    {nightLabels[index]}
                    <input
                      type="number"
                      min="0"
                      max="14"
                      step="0.25"
                      value={night}
                      onChange={(e) => updateNight(index, e.target.value)}
                      className="mt-1 w-full bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-2 py-2 text-center text-[#f1faee]"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block text-sm text-[#f1faee]/70 mb-2" htmlFor="wake-consistency">Wake-time consistency</label>
            <select
              id="wake-consistency"
              value={wakeConsistency}
              onChange={(e) => setWakeConsistency(e.target.value as 'consistent' | 'variable' | 'chaotic')}
              className="w-full bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-3 mb-5 text-[#f1faee]"
            >
              <option value="consistent">Consistent: within 30 minutes</option>
              <option value="variable">Variable: 30–90 minutes</option>
              <option value="chaotic">Chaotic: changes by 90+ minutes</option>
            </select>

            <label className="block text-sm text-[#f1faee]/70 mb-2" htmlFor="naps">Naps</label>
            <select
              id="naps"
              value={naps}
              onChange={(e) => setNaps(e.target.value as 'none' | 'short' | 'long' | 'late')}
              className="w-full bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-3 mb-5 text-[#f1faee]"
            >
              <option value="none">No regular naps</option>
              <option value="short">Short naps before 3 p.m.</option>
              <option value="long">Long naps (30+ minutes)</option>
              <option value="late">Late-day naps</option>
            </select>

            <fieldset>
              <legend className="text-sm text-[#f1faee]/70 mb-3">Optional signals</legend>
              <div className="space-y-3 text-sm">
                {[
                  ['caffeine', 'Caffeine within 8 hours of bed'],
                  ['alcohol', 'Alcohol within 3 hours of bed'],
                  ['nightShift', 'Night shift or rotating schedule'],
                  ['insomnia', 'Insomnia / trouble sleeping when in bed'],
                ].map(([key, label]) => (
                  <label key={key} className="flex items-center gap-3 text-[#f1faee]/80">
                    <input
                      type="checkbox"
                      checked={signals[key as keyof typeof signals]}
                      onChange={(e) => setSignals(current => ({ ...current, [key]: e.target.checked }))}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="space-y-8">
            <section className="bg-[#16213e] rounded-2xl border border-[#4a4e69]/40 p-6">
              <h2 className="text-2xl font-bold mb-3">What your number means</h2>
              <p className="text-[#f1faee]/75 mb-5">{result.summary}</p>
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-[#1a1a2e] p-4 border border-[#4a4e69]/40">
                  <p className="text-sm text-[#f1faee]/50">Target</p>
                  <p className="text-2xl font-bold text-[#a8dadc]">{targetHours}h</p>
                </div>
                <div className="rounded-xl bg-[#1a1a2e] p-4 border border-[#4a4e69]/40">
                  <p className="text-sm text-[#f1faee]/50">Average</p>
                  <p className="text-2xl font-bold text-[#a8dadc]">{result.averageSleep}h</p>
                </div>
                <div className="rounded-xl bg-[#1a1a2e] p-4 border border-[#4a4e69]/40">
                  <p className="text-sm text-[#f1faee]/50">Weekly debt</p>
                  <p className="text-2xl font-bold text-[#a8dadc]">{result.weeklyDebt}h</p>
                </div>
              </div>
            </section>

            <section className="bg-[#16213e] rounded-2xl border border-[#4a4e69]/40 p-6">
              <h2 className="text-2xl font-bold mb-5">Your 7-day recovery planner</h2>
              <div className="space-y-4">
                {result.recoveryDays.map(day => (
                  <div key={day.day} className="rounded-xl bg-[#1a1a2e] border border-[#4a4e69]/40 p-4">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="bg-[#a8dadc] text-[#1a1a2e] rounded-full w-8 h-8 flex items-center justify-center font-bold">{day.day}</span>
                      <h3 className="font-semibold text-lg">{day.focus}</h3>
                      <span className="text-sm text-[#f1faee]/55">Goal: {day.sleepGoal}h · {day.bedtimeShift}</span>
                    </div>
                    <p className="text-[#f1faee]/75">{day.action}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#16213e] rounded-2xl border border-yellow-400/30 p-6">
                <h2 className="text-xl font-bold mb-4 text-yellow-100">Safe catch-up warnings</h2>
                <ul className="space-y-3 text-[#f1faee]/75 list-disc pl-5">
                  {result.warnings.map(warning => <li key={warning}>{warning}</li>)}
                </ul>
              </div>
              <div className="bg-[#16213e] rounded-2xl border border-red-400/30 p-6">
                <h2 className="text-xl font-bold mb-4 text-red-100">Medical red flags</h2>
                <ul className="space-y-3 text-[#f1faee]/75 list-disc pl-5">
                  {result.redFlags.map(flag => <li key={flag}>{flag}</li>)}
                </ul>
              </div>
            </section>
          </div>
        </section>

        <section className="bg-[#16213e] py-14">
          <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-a:text-[#a8dadc] max-w-none">
            <h2>How to use sleep debt without obsessing over it</h2>
            <p>
              Sleep debt is useful as a weekly signal, not a score to chase every morning. If your number is mild, protect consistency. If it is moderate or high, your body is probably asking for earlier bedtimes, calmer evenings, and a more stable wake anchor. The goal is not perfection. The goal is to stop the debt from compounding.
            </p>
            <p>
              The recovery plan above intentionally avoids unsafe catch-up behavior. A huge weekend sleep-in may feel good once, but it can delay melatonin timing, make Sunday night harder, and restart the cycle. Most people recover better by adding 30–60 minutes of sleep opportunity for several nights while keeping wake time steady.
            </p>
            <h2>FAQ</h2>
            {faqs.map(faq => (
              <div key={faq.question} className="mb-5">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold mb-6">Keep learning</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {internalResources.map(([href, label]) => (
              <Link key={href} to={href} className="rounded-xl bg-[#16213e] border border-[#4a4e69]/40 p-4 hover:border-[#a8dadc]/60 transition">
                <span className="text-[#a8dadc]">→</span> {label}
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
