import { useState } from 'react'

interface AssessmentQuestion {
  id: string
  text: string
  type: 'multiple_choice' | 'scale' | 'yes_no'
  options?: string[]
  scaleRange?: { min: number; max: number; labels: string[] }
  personaMapping: Record<string, number> // Persona ID -> weight
}

interface AssessmentResult {
  personaId: string
  personaName: string
  confidence: number
  recommendations: string[]
  description: string
}

const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 'primary_challenge',
    text: 'What is your biggest sleep challenge right now?',
    type: 'multiple_choice',
    options: [
      'Falling asleep (mind races, can\'t shut off)',
      'Staying asleep (wake up multiple times)',
      'Waking up too early',
      'Poor sleep quality (light, unrefreshing)',
      'Inconsistent schedule (different times each day)',
      'Screen time before bed',
      'Environmental issues (noise, light, temperature)',
      'Physical discomfort or pain'
    ],
    personaMapping: {
      'restless_mind': 0.8,
      'environmentally_challenged': 0.6,
      'stress_affected': 0.7,
      'digital_addict': 0.5,
      'physiologically_sensitive': 0.9
    }
  },
  {
    id: 'screen_time',
    text: 'How much screen time do you have in the hour before bed?',
    type: 'multiple_choice',
    options: [
      'None - I avoid screens completely',
      'Less than 30 minutes',
      '30-60 minutes',
      '1-2 hours',
      'More than 2 hours'
    ],
    personaMapping: {
      'digital_addict': 0.9,
      'restless_mind': 0.6,
      'stress_affected': 0.4
    }
  },
  {
    id: 'stress_level',
    text: 'How would you rate your current stress/anxiety levels?',
    type: 'scale',
    scaleRange: {
      min: 1,
      max: 10,
      labels: ['Very low', 'Very high']
    },
    personaMapping: {
      'stress_affected': 0.9,
      'restless_mind': 0.8,
      'undiagnosed': 0.5
    }
  },
  {
    id: 'schedule_consistency',
    text: 'How consistent is your sleep schedule?',
    type: 'multiple_choice',
    options: [
      'Very consistent (±30 minutes)',
      'Somewhat consistent (±1 hour)',
      'Inconsistent (±2+ hours)',
      'Chaotic (completely different each day)'
    ],
    personaMapping: {
      'habitually_inconsistent': 0.9,
      'chronotype_misfit': 0.7,
      'stress_affected': 0.5
    }
  },
  {
    id: 'environment_issues',
    text: 'Do you have issues with your sleep environment?',
    type: 'multiple_choice',
    options: [
      'No, my bedroom is optimized for sleep',
      'Some noise issues',
      'Light pollution issues',
      'Temperature control problems',
      'Multiple environmental issues'
    ],
    personaMapping: {
      'environmentally_challenged': 0.9,
      'physiologically_sensitive': 0.6
    }
  },
  {
    id: 'morning_energy',
    text: 'How refreshed do you feel when you wake up?',
    type: 'scale',
    scaleRange: {
      min: 1,
      max: 10,
      labels: ['Exhausted', 'Completely refreshed']
    },
    personaMapping: {
      'undiagnosed': 0.7,
      'physiologically_sensitive': 0.6,
      'environmentally_challenged': 0.5,
      'restless_mind': 0.4
    }
  },
  {
    id: 'weekend_sleep',
    text: 'How different is your weekend sleep schedule?',
    type: 'multiple_choice',
    options: [
      'Same as weekdays',
      '1-2 hours later',
      '2-3 hours later',
      '3+ hours later',
      'Completely different'
    ],
    personaMapping: {
      'chronotype_misfit': 0.9,
      'habitually_inconsistent': 0.7,
      'stress_affected': 0.4
    }
  }
]

const PERSONA_DESCRIPTIONS: Record<string, { name: string; description: string; recommendations: string[] }> = {
  'restless_mind': {
    name: 'The Restless Mind',
    description: 'You struggle with racing thoughts, anxiety, or rumination at bedtime. Your mind has trouble "switching off" when it\'s time to sleep.',
    recommendations: [
      'Practice bedtime meditation (10 minutes)',
      'Keep a worry journal in the evening (not in bed)',
      'Try progressive muscle relaxation',
      'Create a pre-sleep wind-down routine'
    ]
  },
  'digital_addict': {
    name: 'The Digital Addict',
    description: 'Screen time and digital stimulation are disrupting your sleep. Blue light exposure and engaging content keep your brain activated.',
    recommendations: [
      'Implement a digital sunset (60 minutes before bed)',
      'Charge your phone outside the bedroom',
      'Use blue light filters after sunset',
      'Replace screen time with audiobooks or gentle reading'
    ]
  },
  'chronotype_misfit': {
    name: 'The Chronotype Misfit',
    description: 'Your natural sleep-wake rhythm doesn\'t align with your schedule. You may be a night owl forced into an early bird schedule.',
    recommendations: [
      'Get morning sunlight exposure (15 minutes)',
      'Gradually adjust your schedule in 15-minute increments',
      'Use light therapy to shift your circadian rhythm',
      'Optimize your schedule around your natural energy peaks'
    ]
  },
  'environmentally_challenged': {
    name: 'The Environmentally Challenged',
    description: 'External factors like noise, light, or temperature are disrupting your sleep. Your bedroom environment needs optimization.',
    recommendations: [
      'Invest in blackout curtains or a sleep mask',
      'Use a white noise machine or earplugs',
      'Maintain bedroom temperature at 65-68°F (18-20°C)',
      'Create a dedicated sleep sanctuary'
    ]
  },
  'habitually_inconsistent': {
    name: 'The Habitually Inconsistent',
    description: 'Your sleep schedule varies significantly from day to day, leading to social jet lag and poor sleep quality.',
    recommendations: [
      'Set a fixed wake time (non-negotiable, even on weekends)',
      'Create a consistent bedtime routine',
      'Use an alarm for bedtime, not just wake-up',
      'Track your sleep consistency for accountability'
    ]
  },
  'physiologically_sensitive': {
    name: 'The Physiologically Sensitive',
    description: 'Physical factors like discomfort, pain, or medical conditions are affecting your sleep quality.',
    recommendations: [
      'Consult with a healthcare provider about sleep issues',
      'Optimize sleep position and bedding for comfort',
      'Consider a sleep study if symptoms persist',
      'Address underlying medical conditions'
    ]
  },
  'stress_affected': {
    name: 'The Stress-Affected',
    description: 'High stress levels and anxiety are significantly impacting your ability to fall and stay asleep.',
    recommendations: [
      'Practice daily stress reduction techniques',
      'Create a worry time (not at bedtime)',
      'Try cognitive behavioral techniques for insomnia',
      'Build resilience through regular relaxation practice'
    ]
  },
  'undiagnosed': {
    name: 'The Undiagnosed',
    description: 'You may have an underlying sleep disorder that requires professional evaluation. Your symptoms are significant and persistent.',
    recommendations: [
      'Consult a sleep specialist for evaluation',
      'Keep a detailed sleep diary for 2 weeks',
      'Consider a sleep study if recommended',
      'Don\'t ignore persistent, severe symptoms'
    ]
  }
}

interface SleepAssessmentProps {
  onComplete: (result: AssessmentResult) => void
  calculatorData?: {
    mode: 'wakeup' | 'bedtime'
    targetTime: string
    results: Array<{
      time: string
      cycles: number
      hours: number
      quality: 'optimal' | 'good' | 'minimum'
    }>
  }
}

export default function SleepAssessment({ onComplete, calculatorData }: SleepAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  const handleAnswer = (questionId: string, value: any) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    // Move to next question or complete assessment
    if (currentQuestion < ASSESSMENT_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate persona
      const result = calculatePersona(newAnswers)
      setAssessmentResult(result)
      setIsComplete(true)
      onComplete(result)
    }
  }

  const calculatePersona = (answers: Record<string, any>): AssessmentResult => {
    // Initialize scores for all personas
    const personaScores: Record<string, number> = {}
    const personaCounts: Record<string, number> = {}
    
    // Initialize all personas with 0
    Object.keys(PERSONA_DESCRIPTIONS).forEach(personaId => {
      personaScores[personaId] = 0
      personaCounts[personaId] = 0
    })

    // Calculate scores based on answers
    ASSESSMENT_QUESTIONS.forEach(question => {
      const answer = answers[question.id]
      if (answer !== undefined) {
        // For multiple choice questions
        if (question.type === 'multiple_choice' && question.options) {
          const optionIndex = question.options.indexOf(answer)
          if (optionIndex !== -1) {
            // Higher index = more severe issue = higher persona weight
            const severity = (optionIndex + 1) / question.options.length
            
            Object.entries(question.personaMapping).forEach(([personaId, weight]) => {
              personaScores[personaId] += weight * severity
              personaCounts[personaId]++
            })
          }
        }
        // For scale questions
        else if (question.type === 'scale' && typeof answer === 'number') {
          const normalizedScore = (answer - 1) / 9 // Convert 1-10 to 0-1
          
          Object.entries(question.personaMapping).forEach(([personaId, weight]) => {
            personaScores[personaId] += weight * normalizedScore
            personaCounts[personaId]++
          })
        }
      }
    })

    // Calculate average scores and find highest scoring persona
    let highestPersonaId = 'restless_mind' // Default
    let highestScore = 0

    Object.entries(personaScores).forEach(([personaId, score]) => {
      const count = personaCounts[personaId]
      const averageScore = count > 0 ? score / count : 0
      
      if (averageScore > highestScore) {
        highestScore = averageScore
        highestPersonaId = personaId
      }
    })

    const persona = PERSONA_DESCRIPTIONS[highestPersonaId]
    const confidence = Math.min(100, Math.round(highestScore * 100))

    return {
      personaId: highestPersonaId,
      personaName: persona.name,
      confidence,
      recommendations: persona.recommendations,
      description: persona.description
    }
  }

  const restartAssessment = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setIsComplete(false)
    setAssessmentResult(null)
  }

  const currentQ = ASSESSMENT_QUESTIONS[currentQuestion]

  if (isComplete && assessmentResult) {
    return (
      <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-[#a8dadc] mb-2">
            Your Sleep Profile: {assessmentResult.personaName}
          </h2>
          <p className="text-[#f1faee]/70 mb-4">
            Match confidence: {assessmentResult.confidence}%
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-[#f1faee] mb-3">Profile Description</h3>
            <p className="text-[#f1faee]/80">{assessmentResult.description}</p>
          </div>

          <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-[#f1faee] mb-3">Personalized Recommendations</h3>
            <ul className="space-y-2">
              {assessmentResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#a8dadc] mr-2">•</span>
                  <span className="text-[#f1faee]/80">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          {calculatorData && (
            <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5">
              <h3 className="text-lg font-semibold text-[#f1faee] mb-3">Your Custom Sleep Schedule</h3>
              <p className="text-[#f1faee]/80 mb-3">
                Based on your calculator inputs, here are your optimal sleep times:
              </p>
              <div className="space-y-2">
                {calculatorData.results.map((result, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-3 flex items-center justify-between ${
                      result.quality === 'optimal' ? 'bg-green-500/10 border-green-500/30' :
                      result.quality === 'good' ? 'bg-blue-500/10 border-blue-500/30' :
                      'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{result.time}</span>
                      <span className="text-sm ml-2 opacity-80">
                        ({result.hours}h, {result.cycles} cycles)
                      </span>
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${
                      result.quality === 'optimal' ? 'bg-green-500/20 text-green-400' :
                      result.quality === 'good' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {result.quality === 'optimal' ? 'Optimal' : 
                       result.quality === 'good' ? 'Good' : 'Minimum'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={restartAssessment}
              className="flex-1 bg-[#4a4e69] hover:bg-[#4a4e69]/80 text-[#f1faee] font-medium py-3 rounded-lg transition"
            >
              Retake Assessment
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="text-center mb-6">
        <div className="text-3xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-[#a8dadc] mb-2">
          Personalized Sleep Assessment
        </h2>
        <p className="text-[#f1faee]/70">
          Answer {currentQuestion + 1} of {ASSESSMENT_QUESTIONS.length} questions
        </p>
        <div className="w-full bg-[#1a1a2e] h-2 rounded-full mt-4 overflow-hidden">
          <div 
            className="bg-[#a8dadc] h-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#f1faee] mb-4">
          {currentQ.text}
        </h3>

        {currentQ.type === 'multiple_choice' && currentQ.options && (
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(currentQ.id, option)}
                className="w-full text-left bg-[#1a1a2e] hover:bg-[#4a4e69] border border-[#4a4e69] rounded-lg px-4 py-3 text-[#f1faee] transition"
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {currentQ.type === 'scale' && currentQ.scaleRange && (
          <div className="space-y-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#f1faee]/70">{currentQ.scaleRange!.labels[0]}</span>
              <span className="text-sm text-[#f1faee]/70">{currentQ.scaleRange!.labels[1]}</span>
            </div>
            <div className="flex gap-2">
              {Array.from({ length: currentQ.scaleRange!.max - currentQ.scaleRange!.min + 1 }, (_, i) => {
                const value = i + currentQ.scaleRange!.min
                return (
                  <button
                    key={value}
                    onClick={() => handleAnswer(currentQ.id, value)}
                    className="flex-1 bg-[#1a1a2e] hover:bg-[#4a4e69] border border-[#4a4e69] rounded-lg py-3 text-[#f1faee] transition"
                  >
                    {value}
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1)
            }
          }}
          disabled={currentQuestion === 0}
          className="text-[#f1faee]/60 hover:text-[#f1faee] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
