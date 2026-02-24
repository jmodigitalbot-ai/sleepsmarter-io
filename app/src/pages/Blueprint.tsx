import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

const PDF_SERVICE_URL = 'https://sleepsmarter-pdf-service-production.up.railway.app'

type Status = 'loading' | 'ready' | 'not_found' | 'error'

export default function Blueprint() {
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email') || ''
  const [status, setStatus] = useState<Status>('loading')
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!email) {
      setStatus('not_found')
      return
    }

    let cancelled = false

    const checkPdf = async () => {
      try {
        const res = await fetch(
          `${PDF_SERVICE_URL}/lookup?email=${encodeURIComponent(email)}`
        )
        if (cancelled) return
        if (res.ok) {
          const data = await res.json()
          if (data.downloadUrl) {
            setPdfUrl(`${PDF_SERVICE_URL}${data.downloadUrl}`)
            setStatus('ready')
            return true
          }
        }
        return false
      } catch {
        return false
      }
    }

    // Try immediately, then retry at 3s, 7s, 15s — handles race between email open and PDF generation
    checkPdf().then((found) => {
      if (found || cancelled) return
      const t1 = setTimeout(() => checkPdf().then((f) => {
        if (f || cancelled) return
        const t2 = setTimeout(() => checkPdf().then((f2) => {
          if (!f2 && !cancelled) setStatus('not_found')
        }), 8000)
        return () => clearTimeout(t2)
      }), 3000)
      return () => clearTimeout(t1)
    })

    return () => { cancelled = true }
  }, [email])

  return (
    <div className="min-h-screen bg-[#1a1a2e]">
      {/* Header */}
      <header className="border-b border-[#4a4e69]/30">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-center">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">😴</span>
            <span className="text-xl font-semibold text-[#a8dadc]">Sleep Smarter</span>
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16 text-center">

        {/* Loading */}
        {status === 'loading' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4a4e69]/40 flex items-center justify-center animate-pulse">
              <span className="text-3xl">📄</span>
            </div>
            <h1 className="text-2xl font-bold text-[#f1faee] mb-3">
              Preparing your Blueprint…
            </h1>
            <p className="text-[#f1faee]/60 text-sm">
              Personalizing your sleep plan. This takes just a few seconds.
            </p>
            <div className="mt-8 flex justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-[#a8dadc] animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ready */}
        {status === 'ready' && pdfUrl && (
          <div>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#a8dadc]/20 flex items-center justify-center">
              <span className="text-3xl">✅</span>
            </div>
            <h1 className="text-3xl font-bold text-[#f1faee] mb-3">
              Your Sleep Blueprint is ready
            </h1>
            <p className="text-[#f1faee]/70 mb-8">
              Your personalized plan is ready to download. Start with the
              Quick Wins on page 3 — most people notice a difference within 48 hours.
            </p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#a8dadc] text-[#1a1a2e] font-bold px-8 py-4 rounded-xl text-lg hover:bg-[#a8dadc]/90 transition mb-4"
            >
              📥 Download My Sleep Blueprint
            </a>
            <p className="text-[#f1faee]/40 text-xs mt-4">
              PDF opens in a new tab. Save it to your phone or desktop for easy access.
            </p>
            <div className="mt-12 border-t border-[#4a4e69]/30 pt-8">
              <p className="text-[#f1faee]/60 text-sm mb-4">
                Ready to go deeper? The 7-Day Sleep Reset Protocol walks you through the full system, step by step.
              </p>
              <a
                href="https://originalitymarketing.mysamcart.com/checkout/the-7-day-sleep-reset-protocol-transform-your-sleep-in-one-week#samcart-slide-open-right"
                className="text-[#a8dadc] text-sm font-semibold hover:underline"
              >
                Get the 7-Day Protocol for $17 →
              </a>
            </div>
          </div>
        )}

        {/* Not found / no email */}
        {status === 'not_found' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4a4e69]/40 flex items-center justify-center">
              <span className="text-3xl">📬</span>
            </div>
            <h1 className="text-2xl font-bold text-[#f1faee] mb-3">
              We couldn't find your Blueprint
            </h1>
            <p className="text-[#f1faee]/60 mb-6">
              This usually means the link expired or your PDF is still being generated.
              Try the Sleep Calculator to generate a new one.
            </p>
            <Link
              to="/"
              className="inline-block bg-[#a8dadc] text-[#1a1a2e] font-bold px-6 py-3 rounded-xl hover:bg-[#a8dadc]/90 transition"
            >
              Go to Sleep Calculator
            </Link>
          </div>
        )}

        {/* Error */}
        {status === 'error' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#4a4e69]/40 flex items-center justify-center">
              <span className="text-3xl">⚠️</span>
            </div>
            <h1 className="text-2xl font-bold text-[#f1faee] mb-3">
              Something went wrong
            </h1>
            <p className="text-[#f1faee]/60 mb-6">
              Sorry about that. Please reply to your welcome email and we'll get you sorted.
            </p>
            <Link to="/" className="text-[#a8dadc] hover:underline text-sm">
              ← Back to Sleep Smarter
            </Link>
          </div>
        )}

      </main>
    </div>
  )
}
