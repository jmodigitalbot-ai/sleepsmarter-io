import { useState } from 'react'

type Mode = 'wakeup' | 'bedtime'

interface SleepTime {
  time: string
  cycles: number
  hours: number
  quality: 'optimal' | 'good' | 'minimum'
}

export default function SleepCalculator() {
  const [mode, setMode] = useState<Mode>('wakeup')
  const [time, setTime] = useState('07:00')
  const [results, setResults] = useState<SleepTime[]>([])

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
        </div>
      )}
    </div>
  )
}
