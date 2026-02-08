import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const hasAccepted = localStorage.getItem('cookieConsent')
    if (!hasAccepted) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#16213e] border-t border-[#4a4e69]/30 z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[#f1faee] text-sm md:text-base">
            We use cookies to improve your experience and analyze site traffic.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/privacy"
            className="px-4 py-2 text-sm text-[#f1faee]/70 hover:text-[#a8dadc] transition"
          >
            Learn More
          </Link>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-[#a8dadc] text-[#16213e] text-sm font-medium rounded hover:bg-[#8bc9cc] transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}