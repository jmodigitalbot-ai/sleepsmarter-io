import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailCapture from './EmailCapture'
import { trackEvent } from '../lib/analytics'

type QuizPhase = 'entry' | 'questions' | 'engagement_screen' | 'email_gate' | 'results' | 'processing'
type SleepType = 'cant_fall_asleep' | 'cant_stay_asleep' | 'never_feel_rested' | 'exhausted_but_wired'

interface QuizResponse {
  questionId: string
  answer: number
}

interface SleepTypeMapping {
  type: SleepType
  title: string
  emoji: string
  headline: string
  subheadline: string
  cta_angle: string
  bullets: string[]
}

const SLEEP_TYPES: Record<SleepType, SleepTypeMapping> = {
  cant_fall_asleep: {
    type: 'cant_fall_asleep',
    title: "Can't Fall Asleep",
    emoji: '🧠',
    headline: 'Your brain won\'t shut off at bedtime.',
    subheadline: 'Racing thoughts, anxiety, and it takes 45+ minutes to fall asleep.',
    cta_angle: 'The Forgotten Sleep Ritual teaches you the exact wind-down sequence that quiets an overactive mind in under 20 minutes.',
    bullets: [
      'Proven wind-down protocol that signals your brain to produce melatonin naturally',
      'Specific sleep ritual that interrupts the anxiety loop causing racing thoughts',
      'The exact breathing sequence that activates your parasympathetic nervous system'
    ]
  },
  cant_stay_asleep: {
    type: 'cant_stay_asleep',
    title: "Can't Stay Asleep",
    emoji: '😴',
    headline: 'You fall asleep fine — but something wakes you at 2 or 3 AM.',
    subheadline: 'Middle-of-night waking and the struggle to get back to sleep.',
    cta_angle: 'The Forgotten Sleep Ritual addresses the cortisol spike pattern that causes middle-of-night waking.',
    bullets: [
      'Proven method to stabilize cortisol and prevent the 2–3 AM wake-up pattern',
      'Sleep architecture optimization that increases deep sleep consistency',
      'Specific micro-wake prevention protocol tested on hundreds of night-wakers'
    ]
  },
  never_feel_rested: {
    type: 'never_feel_rested',
    title: "Never Feel Rested",
    emoji: '😪',
    headline: 'You\'re sleeping, but you\'re not recovering.',
    subheadline: 'Waking exhausted regardless of hours slept, foggy all day.',
    cta_angle: 'The Forgotten Sleep Ritual focuses on sleep architecture — getting more deep and REM sleep in the same hours.',
    bullets: [
      'Optimize your sleep cycles to maximize deep and REM sleep stages',
      'Protocol that increases sleep efficiency without changing hours in bed',
      'Specific sleep environment and timing adjustments that improve recovery'
    ]
  },
  exhausted_but_wired: {
    type: 'exhausted_but_wired',
    title: 'Exhausted But Wired',
    emoji: '⚡',
    headline: 'You\'re exhausted all day — then wide awake the moment your head hits the pillow.',
    subheadline: 'Overtired, can\'t wind down, second wind at night.',
    cta_angle: 'The Forgotten Sleep Ritual resets your cortisol-melatonin timing so your body\'s sleep drive fires at the right time.',
    bullets: [
      'Circadian rhythm reset that fixes the "day exhaustion, night alertness" pattern',
      'Proven protocol for cortisol balance without supplements',
      'Specific timing for the wind-down ritual that matches your nervous system state'
    ]
  }
}

interface QuizQuestion {
  id: string
  question: string
  description: string
  options: { label: string; value: number }[]
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Identity (1-2)
  {
    id: 'q1_identity',
    question: 'Which best describes your primary sleep struggle?',
    description: 'Choose the one that feels most accurate',
    options: [
      { label: 'I can\'t fall asleep at night', value: 0 },
      { label: 'I wake up in the middle of the night and can\'t get back to sleep', value: 1 },
      { label: 'I sleep a lot but never feel rested', value: 2 },
      { label: 'I\'m exhausted all day but wired at bedtime', value: 3 }
    ]
  },
  {
    id: 'q2_identity_depth',
    question: 'How long has this been your pattern?',
    description: 'Understanding duration helps us customize your solution',
    options: [
      { label: 'Less than 3 months', value: 0 },
      { label: '3-6 months', value: 1 },
      { label: '6-12 months', value: 2 },
      { label: 'Over a year', value: 3 }
    ]
  },
  // Behavior (3-5)
  {
    id: 'q3_behavior',
    question: 'What time do you typically go to bed?',
    description: 'Your sleep schedule affects your results',
    options: [
      { label: 'Before 10 PM', value: 0 },
      { label: '10 PM - 11 PM', value: 1 },
      { label: '11 PM - midnight', value: 2 },
      { label: 'After midnight', value: 3 }
    ]
  },
  {
    id: 'q4_behavior',
    question: 'What\'s keeping you awake or disrupting your sleep?',
    description: 'Select your biggest culprit',
    options: [
      { label: 'Racing thoughts and anxiety', value: 0 },
      { label: 'Physical discomfort (pain, temperature)', value: 1 },
      { label: 'External disruptions (noise, light, partner)', value: 2 },
      { label: 'Not sure — seems random', value: 3 }
    ]
  },
  {
    id: 'q5_behavior',
    question: 'How much time do you spend on screens before bed?',
    description: 'Be honest — no judgment',
    options: [
      { label: 'None — I stay off screens after sunset', value: 0 },
      { label: '15-30 minutes before bed', value: 1 },
      { label: '30-60 minutes before bed', value: 2 },
      { label: 'Right up until I try to sleep', value: 3 }
    ]
  },
  // Pain Escalation (6-8)
  {
    id: 'q6_pain',
    question: 'How is your sleep affecting your daily life?',
    description: 'What\'s the real cost?',
    options: [
      { label: 'Minor impact — I\'m managing OK', value: 0 },
      { label: 'Noticeable impact on focus and energy', value: 1 },
      { label: 'Significant impact on work and relationships', value: 2 },
      { label: 'It\'s seriously damaging my quality of life', value: 3 }
    ]
  },
  {
    id: 'q7_pain',
    question: 'How long have you been looking for a solution?',
    description: 'This reveals your urgency level',
    options: [
      { label: 'Just started looking', value: 0 },
      { label: 'A few weeks', value: 1 },
      { label: 'Several months', value: 2 },
      { label: 'Over a year — I\'ve tried everything', value: 3 }
    ]
  },
  {
    id: 'q8_pain',
    question: 'What have you already tried?',
    description: 'Helps us recommend what actually works',
    options: [
      { label: 'Nothing major — just basic habits', value: 0 },
      { label: 'Some supplements (melatonin, magnesium, etc.)', value: 1 },
      { label: 'Sleep apps, white noise, bedroom changes', value: 2 },
      { label: 'Multiple approaches — nothing has stuck', value: 3 }
    ]
  },
  // Lifestyle/Mindset (9-10)
  {
    id: 'q9_lifestyle',
    question: 'How much stress or anxiety do you feel day-to-day?',
    description: 'Stress directly affects sleep',
    options: [
      { label: 'Low — I\'m fairly calm', value: 0 },
      { label: 'Moderate — normal stress levels', value: 1 },
      { label: 'High — I\'m stressed most days', value: 2 },
      { label: 'Very high — anxiety is constant', value: 3 }
    ]
  },
  {
    id: 'q10_mindset',
    question: 'How ready are you to commit to a new sleep routine?',
    description: 'Honest answers help us match you with the right solution',
    options: [
      { label: 'Very ready — I\'m willing to make changes', value: 0 },
      { label: 'Moderately ready — depends on ease of implementation', value: 1 },
      { label: 'Somewhat ready — I need a simple solution', value: 2 },
      { label: 'Hesitant — I\'ve failed before', value: 3 }
    ]
  },
  // Outcome-Shaping (11-12)
  {
    id: 'q11_outcome',
    question: 'What\'s your biggest fear about not fixing this?',
    description: 'Understanding your motivation helps us prioritize',
    options: [
      { label: 'Missing out on life and experiences', value: 0 },
      { label: 'Long-term health consequences', value: 1 },
      { label: 'It hurting my career and relationships', value: 2 },
      { label: 'It getting worse without intervention', value: 3 }
    ]
  },
  {
    id: 'q12_outcome',
    question: 'If you could wake up tomorrow with perfect sleep, what\'s the one thing you\'d be most grateful for?',
    description: 'This clarifies your real goal',
    options: [
      { label: 'Mental clarity and focus', value: 0 },
      { label: 'Energy and physical vitality', value: 1 },
      { label: 'Emotional stability and patience', value: 2 },
      { label: 'All of the above', value: 3 }
    ]
  }
]

const ENGAGEMENT_SCREENS = [
  {
    question_number: 4,
    title: '🎯 You\'re on the right track',
    message: 'Most people don\'t diagnose their sleep problem this clearly. You\'re already ahead.'
  },
  {
    question_number: 8,
    title: '💡 Interesting pattern emerging',
    message: 'Your answers show a clear pattern. Your diagnosis is getting more specific.'
  },
  {
    question_number: 11,
    title: '✨ Almost there...',
    message: 'Last question coming up. Your personalized sleep diagnosis is waiting on the other side.'
  }
]

export default function QuizFunnel() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<QuizPhase>('entry')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [sleepType, setSleepType] = useState<SleepType | null>(null)

  useEffect(() => {
    if (phase === 'entry') {
      trackEvent('quiz_entry_viewed', {})
    } else if (phase === 'questions') {
      trackEvent('quiz_started', {
        question_number: currentQuestionIndex + 1
      })
    }
  }, [phase, currentQuestionIndex])

  const handleStartQuiz = () => {
    trackEvent('quiz_cta_clicked', {})
    setPhase('questions')
  }

  const handleAnswer = (answer: number) => {
    const question = QUIZ_QUESTIONS[currentQuestionIndex]
    const newResponses = [...responses, { questionId: question.id, answer }]
    setResponses(newResponses)

    trackEvent('quiz_answer_selected', {
      question_id: question.id,
      question_number: currentQuestionIndex + 1,
      answer_value: answer
    })

    // Check for engagement screen
    const nextQuestionNumber = currentQuestionIndex + 2
    const engagementScreen = ENGAGEMENT_SCREENS.find((s) => s.question_number === nextQuestionNumber)

    if (engagementScreen && currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setPhase('engagement_screen')
    } else if (currentQuestionIndex === QUIZ_QUESTIONS.length - 1) {
      // Last question answered - calculate sleep type and go to email gate
      const calculatedType = calculateSleepType(newResponses)
      setSleepType(calculatedType)
      setPhase('email_gate')
      trackEvent('quiz_completed', {
        sleep_type: calculatedType,
        total_questions: newResponses.length
      })
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleEngagementContinue = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setPhase('questions')
  }

  // Note: Email is captured via EmailCapture component which redirects to /thank-you
  // The processing phase is skipped since EmailCapture handles the form submission

  // Calculate sleep type from responses
  const calculateSleepType = (finalResponses: QuizResponse[]): SleepType => {
    const identity = finalResponses.find((r) => r.questionId === 'q1_identity')
    if (identity) {
      const types: SleepType[] = [
        'cant_fall_asleep',
        'cant_stay_asleep',
        'never_feel_rested',
        'exhausted_but_wired'
      ]
      return types[identity.answer] || 'cant_fall_asleep'
    }
    return 'cant_fall_asleep'
  }

  const handleResultsCTA = () => {
    trackEvent('quiz_cta_to_offer', {
      sleep_type: sleepType
    })
    navigate('/sleep-reset', {
      state: { source: 'quiz_funnel', sleep_type: sleepType }
    })
  }

  if (phase === 'entry') {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <div className="text-6xl mb-6">🌙</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4">
              What's Destroying Your Sleep?
            </h1>
            <p className="text-xl text-[#f1faee]/70 mb-3">
              Take the 60-second Sleep Type Quiz to find out exactly what's keeping you exhausted — and what to do about it.
            </p>
            <p className="text-sm text-[#a8dadc] mb-8">
              ⏱️ Takes less than 2 minutes
            </p>
          </div>

          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 mb-8">
            <p className="text-[#f1faee] mb-4 font-semibold">Join 10,000+ people who discovered exactly why they can't sleep — and fixed it.</p>
            <div className="space-y-2 text-sm text-[#f1faee]/70">
              <div>✓ Personalized sleep diagnosis based on your unique pattern</div>
              <div>✓ Discover what's really causing your sleep problem</div>
              <div>✓ Get a clear, actionable path to better sleep</div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-4 px-6 rounded-lg transition text-lg"
          >
            Discover My Sleep Type →
          </button>

          <p className="text-center text-sm text-[#f1faee]/50 mt-6">
            Your results are personalized & 100% private.
          </p>
        </div>
      </div>
    )
  }

  if (phase === 'engagement_screen') {
    const screen = ENGAGEMENT_SCREENS.find((s) => s.question_number === currentQuestionIndex + 2)
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          <div className="text-5xl mb-6">{screen?.title.split(' ')[0]}</div>
          <h2 className="text-3xl font-bold text-[#f1faee] mb-4">{screen?.title.split(' ').slice(1).join(' ')}</h2>
          <p className="text-xl text-[#f1faee]/70 mb-8">{screen?.message}</p>
          <button
            onClick={handleEngagementContinue}
            className="bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-3 px-8 rounded-lg transition"
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'email_gate' && sleepType) {
    const typeInfo = SLEEP_TYPES[sleepType]
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] text-center mb-4">
            Get Your Personalized Sleep Diagnosis
          </h2>
          <p className="text-lg text-[#f1faee]/70 text-center mb-10">
            Enter your email below and we'll send your customized {typeInfo.title} diagnosis instantly.
          </p>
          <EmailCapture 
            assessmentData={{
              personaId: sleepType,
              personaName: typeInfo.title,
              confidence: 95,
              recommendations: typeInfo.bullets
            }}
          />
        </div>
      </div>
    )
  }



  if (phase === 'results' && sleepType) {
    const typeInfo = SLEEP_TYPES[sleepType]
    return (
      <div className="min-h-screen bg-[#1a1a2e] px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Results Header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-4">{typeInfo.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4">
              {typeInfo.headline}
            </h1>
            <p className="text-xl text-[#f1faee]/70 mb-2">Your Sleep Type: <span className="text-[#a8dadc] font-semibold">{typeInfo.title}</span></p>
          </div>

          {/* Diagnosis Section (60-80% value) */}
          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-[#a8dadc] mb-4">Your Personalized Diagnosis</h2>
            <p className="text-lg text-[#f1faee] mb-6">
              {typeInfo.subheadline}
            </p>

            <div className="mb-8">
              <h3 className="font-semibold text-[#a8dadc] mb-4">What the $17 'Forgotten Sleep Ritual' solves for your type:</h3>
              <ul className="space-y-3">
                {typeInfo.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3 text-[#f1faee]/90">
                    <span className="text-[#a8dadc] font-bold flex-shrink-0">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Primary CTA */}
          <div className="mb-6">
            <button
              onClick={handleResultsCTA}
              className="w-full bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-4 px-6 rounded-lg transition text-lg"
            >
              Get The Forgotten Sleep Ritual — $17
            </button>
            <p className="text-center text-sm text-[#f1faee]/50 mt-3">
              60-day money-back guarantee. You have nothing to lose.
            </p>
          </div>

          {/* Secondary CTA */}
          <button
            onClick={() => navigate('/calculator')}
            className="w-full border border-[#a8dadc] text-[#a8dadc] hover:bg-[#a8dadc]/10 font-semibold py-3 px-6 rounded-lg transition"
          >
            Or start with the free Sleep Blueprint →
          </button>

          {/* Additional Value Below */}
          <div className="mt-16 border-t border-[#4a4e69]/30 pt-12">
            <h3 className="text-xl font-bold text-[#f1faee] mb-6">Your Detailed Sleep Protocol</h3>
            <div className="bg-[#16213e] rounded-lg p-6 text-[#f1faee]/80 text-sm space-y-4">
              <p>
                Based on your responses, here are additional insights about your sleep pattern and how the Forgotten Sleep Ritual specifically addresses your situation.
              </p>
              <p>
                This personalized protocol includes detailed recommendations for optimizing your sleep environment, timing adjustments based on your lifestyle, and the specific wind-down sequence that works best for your sleep type.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Questions Phase
  if (phase === 'questions' && currentQuestionIndex < QUIZ_QUESTIONS.length) {
    const question = QUIZ_QUESTIONS[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100

    return (
      <div className="min-h-screen bg-[#1a1a2e] px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#f1faee]/70">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-sm text-[#a8dadc] font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="bg-[#16213e] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#a8dadc] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-3">
              {question.question}
            </h2>
            <p className="text-lg text-[#f1faee]/70">
              {question.description}
            </p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-4 bg-[#16213e] border-2 border-[#4a4e69]/30 hover:border-[#a8dadc] hover:bg-[#1a2344] rounded-lg transition text-[#f1faee] font-semibold text-lg"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return null
}
