import { useEffect, useRef, useState } from 'react'
import EmailCapture from './EmailCapture'
import { trackEvent } from '../lib/analytics'
import {
  calculateAssessmentScore,
  detectSleepPersona,
  identifyPrimaryChallenge,
  personaProfiles,
  sleepAssessmentQuestions,
  type AssessmentResponse,
  type PersonaId
} from '../lib/assessment'
import {
  SleepBlueprintRecommendationEngine,
  type CalculatorData,
  type RecommendationQuickWin,
  type SevenDayProtocolPhase,
  type SleepSchedulePlan
} from '../lib/recommendationEngine'

interface SleepAssessmentProps {
  onComplete?: (result: AssessmentResult) => void
  calculatorData?: CalculatorData
}

interface AssessmentResult {
  overallSleepScore: number
  categoryScores: Record<string, number>
  personaId: PersonaId
  personaName: string
  confidence: number
  recommendations: string[]
  executiveSummary: string
  primaryChallenge: string
  quickWins: RecommendationQuickWin[]
  sevenDayProtocol: SevenDayProtocolPhase[]
  sleepSchedule: SleepSchedulePlan | null
}

interface ProcessingStep {
  id: string
  label: string
  durationMs: number
}

const personaThemes: Record<PersonaId, { icon: string; accent: string; gradientFrom: string; gradientTo: string }> = {
  digital_addict: {
    icon: '📵',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#4a4e69'
  },
  restless_mind: {
    icon: '🧠',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#2a2f4f'
  },
  night_owl: {
    icon: '🦉',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#3a3d5c'
  },
  early_bird: {
    icon: '🌅',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#445069'
  },
  parent: {
    icon: '👶',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#3b415f'
  },
  perfectionist: {
    icon: '🎯',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#444a6b'
  },
  healthy_sleeper: {
    icon: '✅',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#2c3a4f'
  },
  general_optimizer: {
    icon: '🔧',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#3f4667'
  },
  foundation_builder: {
    icon: '🧱',
    accent: '#a8dadc',
    gradientFrom: '#1a1a2e',
    gradientTo: '#39415f'
  }
}

const baseProcessingSteps: ProcessingStep[] = [
  { id: 'sleep_patterns', label: 'Analyzing your sleep patterns...', durationMs: 2000 },
  { id: 'circadian_alignment', label: 'Evaluating circadian rhythm alignment...', durationMs: 2000 },
  { id: 'science_database', label: 'Cross-referencing sleep science database...', durationMs: 2000 },
  { id: 'persona_detection', label: 'Detecting your sleep persona...', durationMs: 1500 },
  { id: 'protocol_generation', label: 'Generating personalized protocol...', durationMs: 1500 },
  { id: 'blueprint_build', label: 'Building your Sleep Blueprint...', durationMs: 2000 }
]

export default function SleepAssessment({ onComplete, calculatorData }: SleepAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse[]>([])
  const [phase, setPhase] = useState<'questions' | 'processing' | 'results'>('questions')
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const [processingSteps, setProcessingSteps] = useState<ProcessingStep[]>(baseProcessingSteps)
  const [processingStepIndex, setProcessingStepIndex] = useState(0)
  const [processingStepProgress, setProcessingStepProgress] = useState(0)
  const [processingOverallProgress, setProcessingOverallProgress] = useState(0)
  const [showReadyMessage, setShowReadyMessage] = useState(false)
  const startedRef = useRef(false)
  const processingResponsesRef = useRef<AssessmentResponse[] | null>(null)
  const processingResultRef = useRef<AssessmentResult | null>(null)
  const processingAnalyticsRef = useRef<{ sleepScore: number; personaId: PersonaId; confidence: number } | null>(null)
  const processingStartedRef = useRef(false)
  const processingTimerRef = useRef<number | null>(null)
  const processingReadyTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    trackEvent('assessment_started', {
      source: calculatorData ? 'calculator' : 'direct'
    })
  }, [calculatorData])

  useEffect(() => {
    if (phase !== 'processing') return
    if (processingStartedRef.current) return

    const responsesToScore = processingResponsesRef.current ?? responses
    if (responsesToScore.length === 0) return

    processingStartedRef.current = true

    const scoreResult = calculateAssessmentScore(responsesToScore)
    const persona = detectSleepPersona(responsesToScore, scoreResult)
    const primaryChallenge = identifyPrimaryChallenge(responsesToScore, scoreResult)

    const engine = new SleepBlueprintRecommendationEngine(
      {
        overallSleepScore: scoreResult.overallSleepScore,
        categoryScores: scoreResult.categoryScores,
        primaryChallenge,
        persona,
        responses: responsesToScore
      },
      calculatorData
    )

    const recommendations = engine.generateAllRecommendations()
    const profile = personaProfiles[persona.primaryPersona]

    const result: AssessmentResult = {
      overallSleepScore: scoreResult.overallSleepScore,
      categoryScores: scoreResult.categoryScores,
      personaId: persona.primaryPersona,
      personaName: profile?.name || 'Sleep Persona',
      confidence: Math.round(persona.confidence * 100),
      recommendations: recommendations.quickWins.slice(0, 3).map((win) => win.title),
      executiveSummary: recommendations.executiveSummary,
      primaryChallenge: primaryChallenge.description,
      quickWins: recommendations.quickWins.slice(0, 3),
      sevenDayProtocol: recommendations.sevenDayProtocol,
      sleepSchedule: recommendations.sleepSchedule
    }

    const responseMap = responsesToScore.reduce<Record<string, string>>((acc, response) => {
      acc[response.questionId] = response.answer
      return acc
    }, {})

    const adjustedSteps = baseProcessingSteps.map((step) => ({ ...step }))
    const shouldHighlightScreenTime = responseMap.screen_time === 'frequently' || responseMap.screen_time === 'every_night'
    const shouldHighlightSleepQuality = scoreResult.categoryScores.sleep_quality < 50

    if (shouldHighlightScreenTime) {
      adjustedSteps[1] = {
        ...adjustedSteps[1],
        label: 'Factoring in your screen habits...'
      }
    }

    if (shouldHighlightSleepQuality) {
      adjustedSteps[2] = {
        ...adjustedSteps[2],
        label: 'Analyzing your sleep quality indicators...'
      }
    }

    setProcessingSteps(adjustedSteps)
    processingResultRef.current = result
    processingAnalyticsRef.current = {
      sleepScore: scoreResult.overallSleepScore,
      personaId: persona.primaryPersona,
      confidence: Math.round(persona.confidence * 100)
    }

    trackEvent('assessment_processing_started', {
      sleep_score: scoreResult.overallSleepScore
    })

    const stepDurations = adjustedSteps.map((step) => step.durationMs)
    const totalDuration = stepDurations.reduce((sum, duration) => sum + duration, 0)
    const startTime = performance.now()
    let currentStep = 0
    let currentStepStart = startTime

    const tick = () => {
      const now = performance.now()
      const totalElapsed = now - startTime
      const stepElapsed = now - currentStepStart
      const stepDuration = stepDurations[currentStep] ?? 1

      const stepProgress = Math.min(stepElapsed / stepDuration, 1) * 100
      const totalProgress = Math.min(totalElapsed / totalDuration, 1) * 100

      setProcessingStepIndex(currentStep)
      setProcessingStepProgress(stepProgress)
      setProcessingOverallProgress(totalProgress)

      if (stepElapsed >= stepDuration) {
        currentStep += 1
        if (currentStep < stepDurations.length) {
          currentStepStart = now
        } else {
          if (processingTimerRef.current) {
            window.clearInterval(processingTimerRef.current)
          }
          setProcessingStepIndex(stepDurations.length - 1)
          setProcessingStepProgress(100)
          setProcessingOverallProgress(100)
          setShowReadyMessage(true)

          trackEvent('assessment_processing_complete', {
            sleep_score: scoreResult.overallSleepScore
          })

          processingReadyTimeoutRef.current = window.setTimeout(() => {
            const analytics = processingAnalyticsRef.current
            const finalResult = processingResultRef.current

            setShowReadyMessage(false)
            if (finalResult && analytics) {
              setAssessmentResult(finalResult)
              setPhase('results')

              trackEvent('assessment_completed', {
                sleep_score: analytics.sleepScore,
                persona: analytics.personaId,
                confidence: analytics.confidence
              })

              trackEvent('persona_detected', {
                persona: analytics.personaId,
                confidence: analytics.confidence
              })

              onComplete?.(finalResult)
            }
          }, 900)
        }
      }
    }

    processingTimerRef.current = window.setInterval(tick, 120)
    tick()

    return () => {
      if (processingTimerRef.current) {
        window.clearInterval(processingTimerRef.current)
      }
      if (processingReadyTimeoutRef.current) {
        window.clearTimeout(processingReadyTimeoutRef.current)
      }
    }
  }, [calculatorData, onComplete, phase, responses])

  const handleAnswer = (questionId: string, value: string) => {
    const nextResponses = [
      ...responses.filter((response) => response.questionId !== questionId),
      { questionId, answer: value }
    ]

    setResponses(nextResponses)

    if (currentQuestion < sleepAssessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      return
    }
    processingResponsesRef.current = nextResponses
    processingResultRef.current = null
    processingAnalyticsRef.current = null
    processingStartedRef.current = false
    setProcessingStepIndex(0)
    setProcessingStepProgress(0)
    setProcessingOverallProgress(0)
    setShowReadyMessage(false)
    setPhase('processing')
  }

  const restartAssessment = () => {
    setCurrentQuestion(0)
    setResponses([])
    setPhase('questions')
    setAssessmentResult(null)
    startedRef.current = false
    processingResponsesRef.current = null
    processingResultRef.current = null
    processingAnalyticsRef.current = null
    processingStartedRef.current = false
    setProcessingStepIndex(0)
    setProcessingStepProgress(0)
    setProcessingOverallProgress(0)
    setShowReadyMessage(false)
  }

  const currentQuestionData = sleepAssessmentQuestions[currentQuestion]

  if (phase === 'results' && assessmentResult) {
    const personaTheme = personaThemes[assessmentResult.personaId]
    const personaProfile = personaProfiles[assessmentResult.personaId]
    const protocolPreview = assessmentResult.sevenDayProtocol[0]
    const remainingProtocol = assessmentResult.sevenDayProtocol.slice(1)

    return (
      <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">{personaTheme.icon}</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#a8dadc] mb-2">
            Your Personalized Sleep Blueprint
          </h2>
          <p className="text-[#f1faee]/70">
            Sleep Score: <span className="text-[#f1faee] font-semibold">{assessmentResult.overallSleepScore}/100</span>
          </p>
        </div>

        <div
          className="rounded-2xl p-6 mb-6 border border-[#4a4e69]/40"
          style={{
            background: `linear-gradient(135deg, ${personaTheme.gradientFrom}, ${personaTheme.gradientTo})`
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-[#f1faee]/60 text-sm uppercase tracking-wide">Detected Persona</p>
              <h3 className="text-2xl font-semibold text-[#f1faee]">{assessmentResult.personaName}</h3>
              <p className="text-[#f1faee]/80 mt-2">{personaProfile?.description}</p>
            </div>
            <div className="bg-[#1a1a2e]/70 rounded-xl px-4 py-3 border border-[#4a4e69]/40">
              <p className="text-xs text-[#f1faee]/60">Match confidence</p>
              <p className="text-xl font-semibold text-[#a8dadc]">{assessmentResult.confidence}%</p>
            </div>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {personaProfile?.focus.map((focus, index) => (
              <div
                key={focus}
                className="bg-[#1a1a2e]/80 border border-[#4a4e69]/40 rounded-lg px-3 py-2 text-sm text-[#f1faee]/80"
              >
                {index + 1}. {focus}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-[#f1faee] mb-2">Executive Summary</h3>
            <p className="text-[#f1faee]/80 text-sm leading-relaxed">{assessmentResult.executiveSummary}</p>
          </div>
          <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-[#f1faee] mb-2">Primary Challenge</h3>
            <p className="text-[#f1faee]/80 text-sm leading-relaxed">{assessmentResult.primaryChallenge}</p>
            <div className="mt-4">
              <p className="text-xs uppercase tracking-wide text-[#f1faee]/50 mb-2">Category Scores</p>
              <div className="space-y-2">
                {Object.entries(assessmentResult.categoryScores).map(([category, score]) => (
                  <div key={category}>
                    <div className="flex justify-between text-xs text-[#f1faee]/60">
                      <span>{category.replace('_', ' ')}</span>
                      <span>{Math.round(score)}%</span>
                    </div>
                    <div className="h-2 bg-[#16213e] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#a8dadc]"
                        style={{ width: `${Math.round(score)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {assessmentResult.sleepSchedule && (
          <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5 mb-6">
            <h3 className="text-lg font-semibold text-[#f1faee] mb-2">Your Custom Sleep Schedule</h3>
            <p className="text-[#f1faee]/70 text-sm mb-4">
              Based on your calculator inputs, these are your highest-impact sleep windows.
            </p>
            <div className="space-y-2">
              {assessmentResult.sleepSchedule.recommendations.map((option) => (
                <div
                  key={`${option.time}-${option.quality}`}
                  className="flex items-center justify-between bg-[#16213e] border border-[#4a4e69]/30 rounded-lg px-4 py-3"
                >
                  <div>
                    <p className="text-[#f1faee] font-semibold">
                      {option.icon} {option.time}
                    </p>
                    <p className="text-xs text-[#f1faee]/60">
                      {option.hours}h · {option.cycles} cycles · {option.useCase}
                    </p>
                  </div>
                  <span className="text-xs text-[#a8dadc]">Priority {option.priority}</span>
                </div>
              ))}
            </div>
            {assessmentResult.sleepSchedule.personalizedTips.length > 0 && (
              <div className="mt-4 space-y-2">
                {assessmentResult.sleepSchedule.personalizedTips.map((tip) => (
                  <div
                    key={tip.tip}
                    className="text-xs text-[#f1faee]/70 border border-[#4a4e69]/40 rounded-lg px-3 py-2"
                  >
                    <span className="text-[#a8dadc] font-semibold">Tip:</span> {tip.tip} <span className="text-[#f1faee]/40">({tip.reason})</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-4">Top 3 Personalized Quick Wins</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {assessmentResult.quickWins.map((win) => (
              <div key={win.id} className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-4">
                <h4 className="text-sm font-semibold text-[#a8dadc] mb-2">{win.title}</h4>
                <p className="text-xs text-[#f1faee]/70 mb-3">{win.description}</p>
                <ul className="text-xs text-[#f1faee]/70 space-y-1">
                  {win.steps.slice(0, 3).map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#f1faee]/50 mt-3">
                  Timing: {win.timing} · {win.expectedImpact}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-2">Your 7-Day Protocol (Preview)</h3>
          <p className="text-[#f1faee]/70 text-sm mb-4">
            Days 1-2 are unlocked below. Get the full 7-day protocol in your PDF.
          </p>
          {protocolPreview && (
            <div className="bg-[#16213e] border border-[#4a4e69]/40 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#a8dadc]">Days {protocolPreview.days}</p>
                <span className="text-xs text-[#f1faee]/50">{protocolPreview.theme}</span>
              </div>
              <p className="text-xs text-[#f1faee]/70 mb-3">{protocolPreview.focus}</p>
              <ul className="text-xs text-[#f1faee]/70 space-y-1">
                {protocolPreview.actions.slice(0, 4).map((action) => (
                  <li key={action}>• {action}</li>
                ))}
              </ul>
            </div>
          )}
          {remainingProtocol.length > 0 && (
            <div className="mt-4 bg-[#16213e] border border-[#4a4e69]/30 rounded-lg p-4 opacity-70">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-[#f1faee]/70">Days 3-7 (Locked)</p>
                <span className="text-xs text-[#f1faee]/40">Unlock the full PDF</span>
              </div>
              <div className="text-xs text-[#f1faee]/50">
                {remainingProtocol.map((phase) => phase.theme).join(' · ')}
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#1a1a2e] border border-[#4a4e69]/30 rounded-xl p-5 mb-6">
          <h3 className="text-lg font-semibold text-[#f1faee] mb-2">Get your complete personalized Sleep Blueprint PDF</h3>
          <p className="text-[#f1faee]/70 text-sm">
            Your full 7-day protocol, tailored to your persona and answers, delivered instantly.
          </p>
          <EmailCapture
            calculatorData={calculatorData}
            assessmentData={assessmentResult}
          />
        </div>

        <div className="text-center">
          <button
            onClick={restartAssessment}
            className="text-sm text-[#f1faee]/60 hover:text-[#f1faee]"
          >
            Retake Assessment
          </button>
          <p className="text-[11px] text-[#f1faee]/40 mt-3">
            This assessment is educational and not medical advice.
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'processing') {
    const completedSteps = processingSteps.slice(0, processingStepIndex)
    const currentStep = processingSteps[processingStepIndex]
    const overallProgress = Math.round(processingOverallProgress)

    return (
      <div className="bg-[#1a1a2e] rounded-2xl p-6 md:p-10 shadow-xl min-h-[70vh] flex flex-col items-center justify-center text-center">
        <style>{`
          @keyframes processingStepReveal {
            0% { opacity: 0; transform: translateY(6px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .processing-step {
            animation: processingStepReveal 450ms ease-out;
          }
          @keyframes processingReadyPulse {
            0%, 100% { opacity: 0.8; }
            50% { opacity: 1; }
          }
          .processing-ready {
            animation: processingReadyPulse 900ms ease-in-out;
          }
        `}</style>

        <div className="w-full max-w-xl mb-6 md:mb-8 space-y-2">
          {completedSteps.map((step) => (
            <div
              key={step.id}
              className="flex items-center justify-between text-xs md:text-sm text-[#f1faee]/60"
            >
              <div className="flex items-center gap-2">
                <span className="text-[#52b788]">✓</span>
                <span>{step.label}</span>
              </div>
              <div className="w-20 md:w-24 h-1 bg-[#2a2f4f] rounded-full overflow-hidden">
                <div className="h-full bg-[#52b788]" style={{ width: '100%' }} />
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-44 w-44 md:h-52 md:w-52 mb-6">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(#a8dadc ${overallProgress}%, rgba(241, 250, 238, 0.12) 0)`
            }}
          />
          <div className="absolute inset-3 rounded-full bg-[#1a1a2e] border border-[#4a4e69]/50 flex items-center justify-center">
            <span className="text-3xl md:text-4xl font-semibold text-[#f1faee]">{overallProgress}%</span>
          </div>
        </div>

        <div className="w-full max-w-md">
          {showReadyMessage ? (
            <div className="processing-ready text-lg md:text-xl font-semibold text-[#a8dadc]">
              Your results are ready!
            </div>
          ) : (
            <div key={currentStep?.id} className="processing-step text-base md:text-lg text-[#f1faee]">
              {currentStep?.label}
            </div>
          )}
          {!showReadyMessage && (
            <div className="mt-4 h-2 w-full bg-[#2a2f4f] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#a8dadc] transition-all duration-150"
                style={{ width: `${processingStepProgress}%` }}
              />
            </div>
          )}
          {!showReadyMessage && (
            <p className="mt-3 text-xs md:text-sm text-[#f1faee]/60">
              Processing step {processingStepIndex + 1} of {processingSteps.length}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#16213e] rounded-2xl p-6 md:p-8 shadow-xl">
      <div className="text-center mb-6">
        <div className="text-3xl mb-4">🔍</div>
        <h2 className="text-xl font-bold text-[#a8dadc] mb-2">Personalized Sleep Assessment</h2>
        <p className="text-[#f1faee]/70">
          Question {currentQuestion + 1} of {sleepAssessmentQuestions.length}
        </p>
        <div className="w-full bg-[#1a1a2e] h-2 rounded-full mt-4 overflow-hidden">
          <div
            className="bg-[#a8dadc] h-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / sleepAssessmentQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-[#f1faee] mb-2">{currentQuestionData.question}</h3>
        <p className="text-sm text-[#f1faee]/60 mb-4">{currentQuestionData.description}</p>

        <div className="space-y-3">
          {currentQuestionData.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(currentQuestionData.id, option.value)}
              className="w-full text-left bg-[#1a1a2e] hover:bg-[#4a4e69] border border-[#4a4e69] rounded-lg px-4 py-3 text-[#f1faee] transition"
            >
              <div className="font-medium">{option.label}</div>
              <div className="text-xs text-[#f1faee]/60 mt-1">{option.description}</div>
            </button>
          ))}
        </div>
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
