import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Calculator() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to homepage calculator section
    navigate('/', { replace: true })
    // Small delay then scroll to calculator
    setTimeout(() => {
      const calculator = document.getElementById('calculator')
      if (calculator) {
        calculator.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }, [navigate])

  return null
}
