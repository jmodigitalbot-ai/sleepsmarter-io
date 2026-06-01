import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { bedtimePages } from '../data/bedtimePages'

export default function BedtimeCalculatorHub() {
  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <SEO
        title="Bedtime Calculator by Wake-Up Time"
        description="Choose your wake-up time and get exact bedtime recommendations based on 90-minute sleep cycles and a 14-minute fall-asleep buffer."
        canonical="/bedtime-calculator"
        type="website"
        breadcrumbs={[
          { name: 'Home', url: 'https://www.sleepsmarter.io' },
          { name: 'Bedtime Calculator', url: 'https://www.sleepsmarter.io/bedtime-calculator' },
        ]}
        softwareApp={{
          name: 'Bedtime Calculator by Sleep Smarter',
          description: 'Free wake-time bedtime calculator that recommends sleep times based on 90-minute sleep cycles.',
          url: 'https://www.sleepsmarter.io/bedtime-calculator',
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
        <section className="max-w-4xl mx-auto px-4 py-12 md:py-16 text-center">
          <p className="text-[#a8dadc] font-semibold mb-3">Bedtime Calculator</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4">
            What Time Should You Go to Bed?
          </h1>
          <p className="text-lg text-[#f1faee]/70 max-w-2xl mx-auto">
            Pick your wake-up time and get exact bedtime options based on complete 90-minute sleep cycles.
          </p>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <div className="grid md:grid-cols-2 gap-4">
            {bedtimePages.map((page) => (
              <Link
                key={page.slug}
                to={`/bedtime-calculator/${page.slug}`}
                className="block bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 hover:border-[#a8dadc]/60 hover:bg-[#1f2b47] transition group"
              >
                <p className="text-sm text-[#f1faee]/50 mb-2">Wake up at</p>
                <h2 className="text-2xl font-bold text-[#f1faee] group-hover:text-[#a8dadc] transition mb-3">
                  {page.wakeTimeLabel}
                </h2>
                <p className="text-[#f1faee]/70 mb-4">
                  Best bedtime: <strong className="text-[#a8dadc]">{page.results[0].time}</strong>
                </p>
                <span className="text-[#a8dadc] font-semibold">See bedtime options →</span>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-[#f1faee] mb-2">Need a different wake-up time?</h2>
            <p className="text-[#f1faee]/70 mb-4">
              Use the full calculator to choose any bedtime or alarm time.
            </p>
            <Link
              to="/calculator"
              className="inline-block bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-3 px-6 rounded-lg transition"
            >
              Open Full Calculator →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/calculator" className="hover:text-[#a8dadc] transition">Calculator</Link>
            <Link to="/blog" className="hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
