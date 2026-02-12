import { useState } from 'react'
import { trackEmailSignup } from '../lib/analytics'

const KIT_FORM_ID = '9066532'
const KIT_FORM_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`

interface CalculatorData {
  mode: 'wakeup' | 'bedtime'
  targetTime: string
  results: Array<{
    time: string
    cycles: number
    hours: number
    quality: 'optimal' | 'good' | 'minimum'
  }>
}

interface EmailCaptureProps {
  calculatorData?: CalculatorData
}

export default function EmailCapture({ calculatorData }: EmailCaptureProps) {
  const [firstName, setFirstName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    // Prepare payload with calculator data if available
    const payload: any = {
      email_address: email,
      first_name: firstName
    }

    if (calculatorData) {
      const optimalResult = calculatorData.results.find(r => r.quality === 'optimal');
      payload.fields = {
        calculator_mode: calculatorData.mode,
        target_time: calculatorData.targetTime,
        results_json: JSON.stringify(calculatorData.results),
        optimal_time: optimalResult?.time || '',
        cycles_preferred: optimalResult?.cycles || 6
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
        setStatus('success')
        setFirstName('')
        setEmail('')
        
        // Track email signup event
        trackEmailSignup(
          email,
          calculatorData ? 'calculator' : 'general',
          {
            calculator_mode: calculatorData?.mode,
            target_time: calculatorData?.targetTime,
            results_count: calculatorData?.results.length
          }
        )
      } else {
        throw new Error('Subscription failed')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    // Redirect to thank you page
    window.location.href = '/thank-you'
    return null
  }

  return (
    <div className="mt-6 bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-6">
      <div className="text-center mb-4">
        <span className="text-2xl mb-2 block">📋</span>
        <h3 className="text-lg font-semibold text-[#a8dadc] mb-1">
          Get Your Personalized Sleep Blueprint
        </h3>
        <p className="text-[#f1faee]/60 text-sm">
          {calculatorData ? (
            <>
              Your custom schedule based on these results, plus a 7-day protocol 
              to improve your sleep quality — free.
            </>
          ) : (
            <>
              Get a custom sleep schedule and 7-day protocol to improve your 
              sleep quality — free.
            </>
          )}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            required
            className="sm:w-1/3 bg-[#16213e] border border-[#4a4e69] rounded-lg px-4 py-3 text-[#f1faee] placeholder-[#f1faee]/40 focus:outline-none focus:border-[#a8dadc] transition text-sm"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 bg-[#16213e] border border-[#4a4e69] rounded-lg px-4 py-3 text-[#f1faee] placeholder-[#f1faee]/40 focus:outline-none focus:border-[#a8dadc] transition text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-[#a8dadc] hover:bg-[#8bc9cc] text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Sending...' : 'Get My Blueprint →'}
        </button>
      </form>

      {status === 'error' && (
        <p className="text-red-400 text-xs mt-2 text-center">{errorMessage}</p>
      )}

      <p className="text-[#f1faee]/30 text-xs mt-3 text-center">
        No spam, ever. Unsubscribe anytime.
      </p>

      {/* Hidden debug info (remove in production) */}
      {import.meta.env.DEV && calculatorData && (
        <div className="mt-4 p-2 bg-[#16213e] rounded text-xs text-[#f1faee]/50">
          <p>Debug: Calculator data attached</p>
          <p>Mode: {calculatorData.mode}</p>
          <p>Time: {calculatorData.targetTime}</p>
          <p>Results: {calculatorData.results.length} options</p>
        </div>
      )}
    </div>
  )
}