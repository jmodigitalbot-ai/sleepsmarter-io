import { useState } from 'react'
import { trackEvent } from '../lib/analytics'

const KIT_FORM_ID = '9066532'
const KIT_FORM_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`
const PDF_SERVICE_URL = 'https://sleepsmarter-pdf-service-production.up.railway.app'

interface EmailCaptureQuizProps {
  sleepType: string
  sleepTypeName: string
  onSuccess: (email: string, firstName: string) => void
}

export default function EmailCaptureQuiz({ sleepType, sleepTypeName, onSuccess }: EmailCaptureQuizProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    const payload = {
      email_address: email,
      first_name: firstName,
      fields: {
        sleep_persona: sleepType,
        persona_name: sleepTypeName,
        quiz_source: 'quiz_funnel_v2',
      }
    }

    try {
      const response = await fetch(KIT_FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      if (response.ok) {
        // Fire PDF generation in background — don't block on it
        fetch(`${PDF_SERVICE_URL}/generate-blueprint`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName || 'Sleep Smarter User',
            email,
            assessmentData: {
              personaId: sleepType,
              personaName: sleepTypeName,
            }
          })
        }).catch(() => {
          // Webhook will retry — don't block user flow
        })

        trackEvent('email_signup', {
          source: 'quiz_funnel',
          sleep_type: sleepType,
        })

        setStatus('success')
        // Hand off to parent — parent controls redirect/phase change
        onSuccess(email, firstName)
      } else {
        throw new Error('Subscription failed')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="bg-[#16213e] border border-[#a8dadc]/20 rounded-xl p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            className="sm:w-2/5 bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-4 text-[#f1faee] placeholder-[#f1faee]/30 focus:outline-none focus:border-[#a8dadc] transition text-base"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-4 text-[#f1faee] placeholder-[#f1faee]/30 focus:outline-none focus:border-[#a8dadc] transition text-base"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-4 px-6 rounded-lg transition text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Loading your results...' : 'Reveal My Diagnosis →'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-red-400 text-sm mt-3 text-center">{errorMessage}</p>
      )}

      <p className="text-[#f1faee]/30 text-xs mt-4 text-center">
        Free results, no credit card. Unsubscribe anytime.{' '}
        <a href="/privacy" className="underline hover:text-[#f1faee]/50">Privacy Policy</a>
      </p>
    </div>
  )
}
