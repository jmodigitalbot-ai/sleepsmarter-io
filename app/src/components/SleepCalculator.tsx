import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackCalculatorUsed } from '../lib/analytics'

type Mode = 'wakeup' | 'bedtime'

interface SleepTime {
  time: string
  cycles: number
  hours: number
  quality: 'optimal' | 'good' | 'minimum'
}

export default function SleepCalculator() {
  const navigate = useNavigate()
  const [mode, setMode] = useState<Mode>('wakeup')
  const [time, setTime] = useState('07:00')
  const [results, setResults] = useState<SleepTime[]>([])
  const [copied, setCopied] = useState(false)

  const CYCLE_MINUTES = 90
  const FALL_ASLEEP_MINUTES = 14

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const calculateTimes = () => {
    const [hours, minutes] = time.split(':').map(Number)
    const baseTime = new Date()
    baseTime.setHours(hours, minutes, 0, 0)

    const newResults: SleepTime[] = []

    if (mode === 'wakeup') {
      // Calculate bedtimes for waking up at specified time
      // Work backwards from wake time
      for (let cycles = 6; cycles >= 4; cycles--) {
        const totalMinutes = (cycles * CYCLE_MINUTES) + FALL_ASLEEP_MINUTES
        const bedtime = new Date(baseTime.getTime() - totalMinutes * 60 * 1000)
        
        newResults.push({
          time: formatTime(bedtime),
          cycles,
          hours: (cycles * CYCLE_MINUTES) / 60,
          quality: cycles >= 6 ? 'optimal' : cycles >= 5 ? 'good' : 'minimum'
        })
      }
    } else {
      // Calculate wake times for going to bed at specified time
      // Work forwards from bedtime
      for (let cycles = 4; cycles <= 6; cycles++) {
        const totalMinutes = (cycles * CYCLE_MINUTES) + FALL_ASLEEP_MINUTES
        const wakeTime = new Date(baseTime.getTime() + totalMinutes * 60 * 1000)
        
        newResults.push({
          time: formatTime(wakeTime),
          cycles,
          hours: (cycles * CYCLE_MINUTES) / 60,
          quality: cycles >= 6 ? 'optimal' : cycles >= 5 ? 'good' : 'minimum'
        })
      }
    }

    setResults(newResults)

    // Track calculator usage
    trackCalculatorUsed(mode, time, newResults.length)
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'optimal': return 'bg-green-500/20 border-green-500/50 text-green-400'
      case 'good': return 'bg-blue-500/20 border-blue-500/50 text-blue-400'
      case 'minimum': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
      default: return ''
    }
  }

  const getQualityLabel = (quality: string) => {
    switch (quality) {
      case 'optimal': return 'Optimal'
      case 'good': return 'Good'
      case 'minimum': return 'Minimum'
      default: return ''
    }
  }

  const formatTimeDisplay = (timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const date = new Date()
    date.setHours(hours, minutes)
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  }

  const handleShare = () => {
    const optimalResult = results.find(r => r.quality === 'optimal') || results[0]
    const shareText = mode === 'wakeup'
      ? `I need to wake up at ${formatTimeDisplay(time)}, so my optimal bedtime is ${optimalResult.time} (based on sleep cycles). Calculate yours free 😴`
      : `Going to bed at ${formatTimeDisplay(time)}? Your optimal wake time is ${optimalResult.time} to feel actually rested. Try the calculator 😴`
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText + '\n\n→ https://www.sleepsmarter.io')}`
    window.open(twitterUrl, '_blank')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText('https://www.sleepsmarter.io')
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for browsers that don't support clipboard API
      const el = document.createElement('textarea')
      el.value = 'https://www.sleepsmarter.io'
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 shadow-xl">
      {/* Mode Toggle */}
      <div className="flex bg-[#1a1a2e] rounded-lg p-1 mb-6">
        <button
          onClick={() => { setMode('wakeup'); setResults([]) }}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
            mode === 'wakeup'
              ? 'bg-[#4a4e69] text-[#f1faee]'
              : 'text-[#f1faee]/60 hover:text-[#f1faee]'
          }`}
        >
          I need to wake up at...
        </button>
        <button
          onClick={() => { setMode('bedtime'); setResults([]) }}
          className={`flex-1 py-3 px-4 rounded-md text-sm font-medium transition ${
            mode === 'bedtime'
              ? 'bg-[#4a4e69] text-[#f1faee]'
              : 'text-[#f1faee]/60 hover:text-[#f1faee]'
          }`}
        >
          I'm going to bed at...
        </button>
      </div>

      {/* Time Input */}
      <div className="mb-6">
        <label htmlFor="sleep-time-input" className="block text-sm text-[#f1faee]/70 mb-2">
          {mode === 'wakeup' ? 'What time do you need to wake up?' : 'What time are you going to bed?'}
        </label>
        <input
          id="sleep-time-input"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label={mode === 'wakeup' ? 'Wake up time' : 'Bedtime'}
          className="w-full bg-[#1a1a2e] border border-[#4a4e69] rounded-lg px-4 py-4 text-2xl text-center text-[#f1faee] focus:outline-none focus:border-[#a8dadc] transition"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculateTimes}
        className="w-full bg-[#a8dadc] hover:bg-[#a8dadc]/90 text-[#1a1a2e] font-semibold py-4 rounded-lg transition mb-6"
      >
        Calculate {mode === 'wakeup' ? 'Bedtimes' : 'Wake Times'}
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-[#f1faee]/70 mb-4">
            {mode === 'wakeup' 
              ? 'Try to fall asleep at one of these times:'
              : 'Set your alarm for one of these times:'}
          </p>
          {results.map((result, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 flex items-center justify-between ${getQualityColor(result.quality)}`}
            >
              <div>
                <span className="text-2xl font-bold">{result.time}</span>
                <span className="text-sm ml-2 opacity-80">
                  ({result.hours}h, {result.cycles} cycles)
                </span>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded ${getQualityColor(result.quality)}`}>
                {getQualityLabel(result.quality)}
              </span>
            </div>
          ))}
          <p className="text-xs text-[#f1faee]/50 mt-4">
            💡 Tip: Choose green (optimal) or blue (good) for the best results. 
            Yellow (minimum) should only be used occasionally.
          </p>

          {/* Share Results */}
          <div className="mt-4 pt-4 border-t border-[#4a4e69]/30">
            <p className="text-xs text-[#f1faee]/50 mb-3 text-center">
              Know someone who wakes up exhausted every morning?
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#4a4e69]/30 border border-[#4a4e69]/50 text-[#f1faee]/70 hover:text-[#f1faee] text-sm py-2.5 rounded-lg transition"
              >
                <span className="font-bold">𝕏</span> Share Results
              </button>
              <button
                onClick={handleCopyLink}
                className="flex-1 flex items-center justify-center gap-2 bg-[#1a1a2e] hover:bg-[#4a4e69]/30 border border-[#4a4e69]/50 text-[#f1faee]/70 hover:text-[#f1faee] text-sm py-2.5 rounded-lg transition"
              >
                {copied ? '✓ Copied!' : '🔗 Copy Link'}
              </button>
            </div>
          </div>

          {/* Assessment Prompt */}
          <div className="mt-6 bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-6">
            <div className="text-center mb-4">
              <span className="text-2xl mb-2 block">🎯</span>
              <h3 className="text-lg font-semibold text-[#a8dadc] mb-1">
                Get Your Personalized Sleep Blueprint
              </h3>
              <p className="text-[#f1faee]/60 text-sm mb-4">
                Take the 2-minute assessment to unlock your sleep score, persona, and a custom 7-day protocol.
              </p>
              <button
                onClick={() =>
                  navigate('/assessment', {
                    state: {
                      calculatorData: {
                        mode,
                        targetTime: time,
                        results
                      }
                    }
                  })
                }
                className="bg-[#a8dadc] hover:bg-[#8bc9cc] text-[#1a1a2e] font-semibold px-6 py-3 rounded-lg transition text-sm"
              >
                Get Your Personalized Sleep Blueprint →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
