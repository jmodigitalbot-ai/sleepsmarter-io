import { Link, useLocation } from 'react-router-dom'
import SleepAssessment from '../components/SleepAssessment'
import type { CalculatorData } from '../lib/recommendationEngine'

interface LocationState {
  calculatorData?: CalculatorData
}

export default function Assessment() {
  const location = useLocation()
  const state = location.state as LocationState | null
  const calculatorData = state?.calculatorData

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
          <Link to="/" className="text-sm text-[#f1faee]/70 hover:text-[#a8dadc] transition">
            Back to Calculator
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-10 md:py-16">
        {!calculatorData && (
          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-4 mb-6 text-sm text-[#f1faee]/70">
            Tip: Start with the sleep calculator first so we can tailor your schedule even more.
          </div>
        )}
        <SleepAssessment calculatorData={calculatorData} />
      </main>

      <footer className="border-t border-[#4a4e69]/30 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-sm text-[#f1faee]/50">
          <p className="mb-2">© 2026 Sleep Smarter. Wake up refreshed.</p>
          <div className="flex justify-center gap-4">
            <Link to="/blog" className="hover:text-[#a8dadc] transition">Blog</Link>
            <Link to="/privacy" className="hover:text-[#a8dadc] transition">Privacy</Link>
            <Link to="/terms" className="hover:text-[#a8dadc] transition">Terms</Link>
            <Link to="/disclosure" className="hover:text-[#a8dadc] transition">Disclosure</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
