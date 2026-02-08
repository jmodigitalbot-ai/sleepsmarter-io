import { useState } from 'react'

const KIT_FORM_ID = '9066532'
const KIT_FORM_URL = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch(KIT_FORM_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email_address: email
        })
      })

      if (response.ok) {
        setStatus('success')
        setEmail('')
      } else {
        throw new Error('Subscription failed')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
        <span className="text-3xl mb-3 block">✉️</span>
        <h3 className="text-lg font-semibold text-green-400 mb-2">
          Check your inbox!
        </h3>
        <p className="text-[#f1faee]/70 text-sm">
          Your Personalized Sleep Blueprint is on its way. Check your email 
          (and spam folder, just in case) for your custom sleep schedule.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-6 bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-6">
      <div className="text-center mb-4">
        <span className="text-2xl mb-2 block">📋</span>
        <h3 className="text-lg font-semibold text-[#a8dadc] mb-1">
          Get Your Personalized Sleep Blueprint
        </h3>
        <p className="text-[#f1faee]/60 text-sm">
          Your custom schedule based on these results, plus a 7-day protocol 
          to improve your sleep quality — free.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 bg-[#16213e] border border-[#4a4e69] rounded-lg px-4 py-3 text-[#f1faee] placeholder-[#f1faee]/40 focus:outline-none focus:border-[#a8dadc] transition text-sm"
        />
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
    </div>
  )
}
