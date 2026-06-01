import { Link, Navigate, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { getBedtimePage } from '../data/bedtimePages'

function qualityLabel(quality: string): string {
  switch (quality) {
    case 'optimal': return 'Optimal'
    case 'good': return 'Good'
    case 'minimum': return 'Minimum'
    default: return ''
  }
}

function qualityClasses(quality: string): string {
  switch (quality) {
    case 'optimal': return 'bg-green-500/20 border-green-500/50 text-green-300'
    case 'good': return 'bg-blue-500/20 border-blue-500/50 text-blue-300'
    case 'minimum': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
    default: return 'bg-[#1a1a2e] border-[#4a4e69]/50 text-[#f1faee]'
  }
}

export default function BedtimeCalculatorPage() {
  const { wakeTime } = useParams()
  const page = getBedtimePage(wakeTime)

  if (!page) {
    return <Navigate to="/bedtime-calculator" replace />
  }

  const [best, good] = page.results
  const aiAnswer = `If you need to wake up at ${page.wakeTimeLabel}, the best time to go to bed is ${best.time}. That gives you six complete 90-minute sleep cycles, plus a 14-minute buffer to fall asleep. If ${best.time} is not realistic, ${good.time} is the next-best option.`

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title={page.title}
        description={page.description}
        canonical={`/bedtime-calculator/${page.slug}`}
        type="website"
        faqs={page.faqs}
        breadcrumbs={[
          { name: 'Home', url: 'https://www.sleepsmarter.io' },
          { name: 'Bedtime Calculator', url: 'https://www.sleepsmarter.io/bedtime-calculator' },
          { name: page.wakeTimeLabel, url: `https://www.sleepsmarter.io/bedtime-calculator/${page.slug}` },
        ]}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: page.title,
          description: page.description,
          url: `https://www.sleepsmarter.io/bedtime-calculator/${page.slug}`,
          mainEntity: {
            '@type': 'SoftwareApplication',
            name: `Bedtime Calculator for ${page.wakeTimeLabel}`,
            applicationCategory: 'HealthApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
        }}
      />

      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm">
            <Link to="/calculator" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Calculator</Link>
            <Link to="/blog" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/about" className="text-[#f1faee]/80 hover:text-[#a8dadc] transition">About</Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <Link to="/bedtime-calculator" className="text-[#a8dadc] text-sm hover:underline">← All wake-up times</Link>
          <div className="mt-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
            <div>
              <p className="text-[#a8dadc] font-semibold mb-3">Wake up at {page.wakeTimeLabel}</p>
              <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4 leading-tight">
                {page.title}
              </h1>
              <p className="text-lg text-[#f1faee]/70 mb-6">
                {page.audienceNote} Here are your best bedtime options based on complete sleep cycles.
              </p>
              <div className="bg-[#16213e] border border-[#a8dadc]/30 rounded-xl p-6">
                <p className="text-sm uppercase tracking-wide text-[#a8dadc] font-semibold mb-2">Direct answer</p>
                <p className="text-2xl md:text-3xl font-bold text-[#f1faee] mb-2">
                  Go to bed at {best.time}.
                </p>
                <p className="text-[#f1faee]/70">
                  That gives you {best.cycles} complete cycles, or about {best.hours} hours of sleep, after the 14-minute fall-asleep buffer.
                </p>
              </div>
            </div>

            <div className="bg-[#16213e] rounded-2xl p-6 shadow-xl border border-[#4a4e69]/30">
              <h2 className="text-xl font-bold text-[#f1faee] mb-4">Best bedtimes for {page.wakeTimeLabel}</h2>
              <div className="space-y-3">
                {page.results.map((result) => (
                  <div key={result.cycles} className={`border rounded-lg p-4 ${qualityClasses(result.quality)}`}>
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-2xl font-bold">{result.time}</p>
                        <p className="text-sm opacity-80">{result.hours} hours · {result.cycles} sleep cycles</p>
                      </div>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-[#1a1a2e]/40">
                        {qualityLabel(result.quality)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#f1faee]/50 mt-4">
                These times assume it takes about 14 minutes to fall asleep.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#f1faee] mb-3">Why these times work</h2>
              <p className="text-[#f1faee]/70 mb-4">
                Sleep moves through repeating cycles of light sleep, deep sleep, and REM. Each cycle is roughly 90 minutes. Waking near the end of a cycle usually feels better than waking from deep sleep.
              </p>
              <p className="text-[#f1faee]/70">
                {page.scheduleTip}
              </p>
            </div>

            <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-[#f1faee] mb-3">AI-friendly answer</h2>
              <p className="text-[#f1faee]/70">
                {aiAnswer}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-[#f1faee] mb-4">FAQs</h2>
          <div className="space-y-4">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5">
                <h3 className="text-lg font-semibold text-[#a8dadc] mb-2">{faq.question}</h3>
                <p className="text-[#f1faee]/70">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-[#16213e] border border-[#a8dadc]/30 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold text-[#f1faee] mb-3">Still waking up tired?</h2>
            <p className="text-[#f1faee]/70 max-w-2xl mx-auto mb-6">
              Your bedtime is only one piece of the problem. Take the free sleep type quiz and find out what is actually wrecking your sleep.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/quiz" className="bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition">
                Take the Sleep Type Quiz →
              </Link>
              <Link to="/calculator" className="bg-[#1a1a2e] hover:bg-[#4a4e69]/30 border border-[#4a4e69]/50 text-[#f1faee] font-semibold py-3 px-6 rounded-lg transition">
                Try Another Time
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-[#f1faee] mb-4">Keep going</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/blog/how-sleep-cycles-work" className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5 hover:border-[#a8dadc]/60 transition text-[#f1faee]">
              How sleep cycles work →
            </Link>
            <Link to="/blog/how-to-fix-your-sleep-schedule-in-3-days" className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5 hover:border-[#a8dadc]/60 transition text-[#f1faee]">
              How to fix your sleep schedule →
            </Link>
            <Link to="/sleep-debt-calculator" className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5 hover:border-[#a8dadc]/60 transition text-[#f1faee]">
              Calculate your sleep debt →
            </Link>
            <Link to="/sleep-reset" className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-5 hover:border-[#a8dadc]/60 transition text-[#f1faee]">
              See the Sleep Reset protocol →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/bedtime-calculator" className="hover:text-[#a8dadc] transition">Bedtime Calculator</Link>
            <Link to="/blog" className="hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
