import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EmailCaptureQuiz from './EmailCaptureQuiz'
import { trackEvent } from '../lib/analytics'

type QuizPhase = 'entry' | 'questions' | 'engagement_screen' | 'email_gate' | 'results'
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
  identity_description: string
  behavior_explanation: string
  common_struggles: string[]
  hidden_strengths: string[]
  bridge_text: string
  cta_angle: string
  bullets: string[]
}

const SLEEP_TYPES: Record<SleepType, SleepTypeMapping> = {
  cant_fall_asleep: {
    type: 'cant_fall_asleep',
    title: "The Racing Mind Sleeper",
    emoji: '🧠',
    headline: 'Your brain won\'t shut off at bedtime.',
    subheadline: 'Racing thoughts, anxiety, and it takes 45+ minutes to fall asleep.',
    identity_description: 'You are a Racing Mind Sleeper. Your nervous system stays on high alert long after the day is done — your brain treats bedtime as a threat, not an invitation to rest. You\'re not broken. You\'re wired for vigilance, and no one ever taught you how to turn it off.',
    behavior_explanation: 'Racing thoughts at night are caused by dysregulated cortisol that stays elevated when it should be falling. Your brain stays in problem-solving mode because it never received a clear signal that the day is over. This is not a character flaw — it is a nervous system pattern that can be rewired with the right sequence.',
    common_struggles: [
      'Lying awake 45+ minutes before falling asleep',
      'Mind replaying conversations, to-do lists, or worst-case scenarios',
      'Feeling physically exhausted but mentally completely awake',
      'Dreading bedtime because you already know sleep won\'t come easily',
      'Finally falling asleep late, then waking up too early',
    ],
    hidden_strengths: [
      'High cognitive drive and creative problem-solving ability',
      'Strong self-awareness about your mental and emotional state',
      'Once you learn the right wind-down sequence, your sleep latency can drop from 45+ minutes to under 10',
    ],
    bridge_text: 'People with the Racing Mind pattern often struggle with anxiety-loop bedtimes for years — trying everything from melatonin to white noise — because they\'re treating the symptom instead of the cause. The good news is there is a proven sequence designed specifically for overactive nervous systems.',
    cta_angle: 'The Forgotten Sleep Ritual teaches you the exact wind-down sequence that signals your brain to produce melatonin naturally — quieting an overactive mind in under 20 minutes.',
    bullets: [
      'Proven wind-down protocol that interrupts the cortisol-anxiety loop keeping you awake',
      'The specific breathing sequence that activates your parasympathetic nervous system',
      'Timing and sequencing your body needs to actually accept sleep — not fight it',
    ]
  },
  cant_stay_asleep: {
    type: 'cant_stay_asleep',
    title: "The Fragmented Sleeper",
    emoji: '😴',
    headline: 'You fall asleep fine — but something pulls you out at 2 or 3 AM.',
    subheadline: 'Middle-of-night waking, fully alert, struggling to get back to sleep.',
    identity_description: 'You are a Fragmented Sleeper. You may fall asleep without much trouble, but your body isn\'t completing full sleep cycles. Something pulls you out of deep sleep in the early morning hours and leaves you lying wide awake, staring at the ceiling when you should be recovering.',
    behavior_explanation: 'Middle-of-night waking is usually caused by a cortisol spike 4–5 hours into sleep. This can be triggered by blood sugar instability, a dysregulated stress response, or sleep architecture that never fully reaches deep restorative stages. Your brain is surfacing you from sleep before your body is done repairing itself.',
    common_struggles: [
      'Waking between 2–4 AM and being completely unable to fall back asleep',
      'Feeling fully, frustratingly alert in the middle of the night',
      'Light sleep that feels easily disrupted by any small noise or movement',
      'Waking up more tired than when you went to bed',
      'Anxiety and frustration while lying awake — making it worse',
    ],
    hidden_strengths: [
      'You have a strong sleep drive — falling asleep is not your problem',
      'Fragmented sleep often has a specific, fixable root cause — unlike chronic insomnia',
      'Once you address the cortisol spike pattern, your sleep can consolidate quickly',
    ],
    bridge_text: 'Fragmented sleepers often try sleep restriction, melatonin, and sleep hygiene advice — none of which addresses the actual issue. The good news is the cortisol spike pattern responds directly to specific timing and pre-sleep interventions.',
    cta_angle: 'The Forgotten Sleep Ritual addresses the cortisol spike pattern that causes middle-of-night waking — stabilizing your sleep architecture so you stay in deep sleep longer.',
    bullets: [
      'Proven method to stabilize the cortisol curve that triggers the 2–3 AM wake-up',
      'Sleep architecture optimization that increases deep sleep consistency',
      'Specific pre-sleep protocol that prevents the micro-wake pattern from pulling you out',
    ]
  },
  never_feel_rested: {
    type: 'never_feel_rested',
    title: "The Poor Recoverer",
    emoji: '😪',
    headline: 'You\'re sleeping — but you\'re not recovering.',
    subheadline: 'Waking exhausted regardless of hours slept. Foggy, flat, and running on empty all day.',
    identity_description: 'You are a Poor Recoverer. Your body is going through the motions of sleep, but you\'re not getting enough deep or REM sleep to actually repair and restore. You could sleep 9 hours and still feel like you\'ve been run over. More hours in bed is not the answer — the quality of your sleep architecture is.',
    behavior_explanation: 'Unrefreshing sleep is a sleep architecture problem. Your body is spending too much time in light sleep stages and not enough in deep NREM and REM — the stages where physical repair, immune function, and memory consolidation happen. This is often caused by sleep timing, elevated stress hormones, or environmental factors that fragment your architecture without waking you fully.',
    common_struggles: [
      'Waking exhausted regardless of how many hours you slept',
      'Persistent brain fog, poor focus, and slow thinking all day',
      'Needing caffeine just to reach baseline function in the morning',
      'Feeling like no amount of rest ever makes a dent',
      'Low-grade fatigue that doesn\'t resolve with weekends or vacations',
    ],
    hidden_strengths: [
      'Functioning at the level you\'ve maintained requires genuine mental resilience',
      'Sleep architecture problems often produce dramatic improvements quickly — 1–2 weeks is common once the root cause is addressed',
      'You\'ve already proven you can push through — imagine what you\'ll do with actual energy',
    ],
    bridge_text: 'Poor Recoverers often spend years increasing their sleep hours with no result — because the hours aren\'t the problem. The good news is sleep architecture responds directly to specific timing, environment, and pre-sleep conditions.',
    cta_angle: 'The Forgotten Sleep Ritual focuses on sleep architecture — getting dramatically more deep and REM sleep in the same hours you\'re already spending in bed.',
    bullets: [
      'Optimize your sleep cycle timing to maximize deep and REM stage duration',
      'Protocol that increases sleep efficiency without changing hours in bed',
      'The specific environmental and timing adjustments that shift you from light sleep to restorative sleep',
    ]
  },
  exhausted_but_wired: {
    type: 'exhausted_but_wired',
    title: "The Circadian Mismatch Sleeper",
    emoji: '⚡',
    headline: 'Exhausted all day. Wide awake the moment your head hits the pillow.',
    subheadline: 'Your internal clock is inverted — running on the wrong schedule.',
    identity_description: 'You are a Circadian Mismatch Sleeper. Your body\'s internal clock is out of sync — your cortisol and melatonin timing are running backwards. You drag yourself through the day, then get a second wind right when you should be winding down. You\'re not lazy or broken. Your rhythm is just set to the wrong time zone.',
    behavior_explanation: 'The exhausted-but-wired pattern happens when cortisol stays too high into the evening and melatonin fails to rise on time. This creates a cruel paradox: you feel drained from accumulated sleep debt, but your nervous system is still running on daytime stimulation. The moment you try to sleep, your brain switches on. This is a circadian rhythm problem — not a willpower problem.',
    common_struggles: [
      'Feeling exhausted and foggy all day, then alert and productive late at night',
      'Being unable to wind down even when you\'re completely drained',
      'Feeling most clear-headed between 10 PM and 1 AM',
      'Hard crashes mid-afternoon where functioning feels nearly impossible',
      'Fighting your own body every night at bedtime',
    ],
    hidden_strengths: [
      'Your brain has genuinely strong late-day processing power — that creativity and clarity is real',
      'Circadian rhythms are among the most responsive systems in the body — targeted interventions often show results within 3–7 days',
      'Once realigned, your daytime energy often transforms faster than any other sleep type',
    ],
    bridge_text: 'Circadian mismatch sleepers often try earlier bedtimes and sleep hygiene routines — and fail — because those approaches don\'t address the timing of cortisol and melatonin production. The good news is your circadian rhythm can be reset with the right sequence applied at the right time of day.',
    cta_angle: 'The Forgotten Sleep Ritual resets your cortisol-melatonin timing so your body\'s sleep drive fires at the right time — ending the day-exhaustion, night-alertness cycle.',
    bullets: [
      'Circadian reset sequence that shifts your body clock without drugs or supplements',
      'Specific timing for the wind-down ritual that matches your nervous system\'s current state',
      'Proven protocol for cortisol balance that stops the second-wind pattern',
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
      { label: '3–6 months', value: 1 },
      { label: '6–12 months', value: 2 },
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
      { label: '10 PM – 11 PM', value: 1 },
      { label: '11 PM – midnight', value: 2 },
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
      { label: '15–30 minutes before bed', value: 1 },
      { label: '30–60 minutes before bed', value: 2 },
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
    description: 'Stress directly affects sleep architecture',
    options: [
      { label: 'Low — I\'m fairly calm', value: 0 },
      { label: 'Moderate — normal stress levels', value: 1 },
      { label: 'High — stressed most days', value: 2 },
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
      { label: 'Damaging my career and relationships', value: 2 },
      { label: 'It getting progressively worse without intervention', value: 3 }
    ]
  },
  {
    id: 'q12_outcome',
    question: 'If you woke up tomorrow fully rested, what\'s the one thing you\'d be most grateful for?',
    description: 'This clarifies your real goal',
    options: [
      { label: 'Mental clarity and sharp focus', value: 0 },
      { label: 'Energy and physical vitality', value: 1 },
      { label: 'Emotional stability and patience with people I love', value: 2 },
      { label: 'All of the above', value: 3 }
    ]
  }
]

const ENGAGEMENT_SCREENS = [
  {
    trigger_after_question: 3,
    emoji: '🔍',
    title: 'Analyzing your pattern...',
    message: 'Most people never identify the real root of their sleep problem. You\'re already ahead.'
  },
  {
    trigger_after_question: 7,
    emoji: '💡',
    title: 'Building your profile...',
    message: 'A clear pattern is emerging. Your diagnosis is getting more specific.'
  },
  {
    trigger_after_question: 11,
    emoji: '✨',
    title: 'Calculating your results...',
    message: 'One more question. Your personalized sleep diagnosis is almost ready.'
  }
]

export default function QuizFunnel() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<QuizPhase>('entry')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<QuizResponse[]>([])
  const [sleepType, setSleepType] = useState<SleepType | null>(null)
  const [capturedEmail, setCapturedEmail] = useState('')

  useEffect(() => {
    if (phase === 'entry') {
      trackEvent('quiz_entry_viewed', {})
    }
  }, [phase])

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

    const completedQuestionNumber = currentQuestionIndex + 1
    const engagementScreen = ENGAGEMENT_SCREENS.find(
      (s) => s.trigger_after_question === completedQuestionNumber
    )

    if (completedQuestionNumber === QUIZ_QUESTIONS.length) {
      // Last question answered — calculate type, go to email gate
      const calculatedType = calculateSleepType(newResponses)
      setSleepType(calculatedType)
      setPhase('email_gate')
      trackEvent('quiz_completed', {
        sleep_type: calculatedType,
        total_questions: newResponses.length
      })
    } else if (engagementScreen) {
      setPhase('engagement_screen')
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handleEngagementContinue = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setPhase('questions')
  }

  const handleEmailSuccess = (email: string) => {
    setCapturedEmail(email)
    trackEvent('quiz_email_captured', { sleep_type: sleepType, email_domain: email.split('@')[1] })
    setPhase('results')
    window.scrollTo(0, 0)
  }

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

  const handleOfferCTA = () => {
    trackEvent('quiz_cta_to_offer', { sleep_type: sleepType })
    navigate('/sleep-reset', { state: { source: 'quiz_funnel', sleep_type: sleepType } })
  }

  // ── ENTRY SCREEN ──────────────────────────────────────────────────────────
  if (phase === 'entry') {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-10">
            <div className="text-6xl mb-6">🌙</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-4 leading-tight">
              What's Destroying Your Sleep?
            </h1>
            <p className="text-xl text-[#f1faee]/70 mb-2">
              Take the 60-second Sleep Type Assessment to find out exactly what's keeping you exhausted — and what to do about it.
            </p>
            <p className="text-sm text-[#a8dadc] mt-4">
              ⏱️ 12 questions · Takes less than 2 minutes
            </p>
          </div>

          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-6 mb-8">
            <p className="text-[#f1faee] mb-4 font-semibold">Your results reveal:</p>
            <div className="space-y-2 text-sm text-[#f1faee]/70">
              <div>✓ Your exact sleep type (4 possible diagnoses)</div>
              <div>✓ Why your current pattern is happening — not just what it is</div>
              <div>✓ The specific intervention that matches your profile</div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="w-full bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-4 px-6 rounded-lg transition text-lg"
          >
            Start My Sleep Assessment →
          </button>

          <p className="text-center text-sm text-[#f1faee]/40 mt-6">
            100% free · Results personalized to your answers · No spam
          </p>
        </div>
      </div>
    )
  }

  // ── ENGAGEMENT SCREEN ─────────────────────────────────────────────────────
  if (phase === 'engagement_screen') {
    const screen = ENGAGEMENT_SCREENS.find(
      (s) => s.trigger_after_question === currentQuestionIndex
    )
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full text-center">
          <div className="text-5xl mb-6 animate-pulse">{screen?.emoji}</div>
          <h2 className="text-3xl font-bold text-[#f1faee] mb-4">{screen?.title}</h2>
          <p className="text-xl text-[#f1faee]/70 mb-10">{screen?.message}</p>
          <button
            onClick={handleEngagementContinue}
            className="bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-3 px-10 rounded-lg transition text-lg"
          >
            Continue →
          </button>
        </div>
      </div>
    )
  }

  // ── EMAIL GATE ────────────────────────────────────────────────────────────
  if (phase === 'email_gate' && sleepType) {
    const typeInfo = SLEEP_TYPES[sleepType]
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">{typeInfo.emoji}</div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-4">
              Your diagnosis is ready.
            </h2>
            <p className="text-lg text-[#f1faee]/70">
              Enter your email to reveal your personalized sleep type diagnosis and the exact protocol designed for your pattern.
            </p>
          </div>

          <div className="bg-[#16213e] border border-[#a8dadc]/20 rounded-xl p-6 mb-6">
            <p className="text-[#a8dadc] font-semibold text-center mb-4">Your free results include:</p>
            <div className="space-y-2 text-sm text-[#f1faee]/70">
              <div>✓ Your exact sleep type and identity profile</div>
              <div>✓ Why this pattern is happening (the real cause)</div>
              <div>✓ Your common struggles and hidden strengths</div>
              <div>✓ The specific intervention for your type</div>
            </div>
          </div>

          <EmailCaptureQuiz
            sleepType={sleepType}
            sleepTypeName={typeInfo.title}
            onSuccess={handleEmailSuccess}
          />
        </div>
      </div>
    )
  }

  // ── RESULTS PAGE ──────────────────────────────────────────────────────────
  if (phase === 'results' && sleepType) {
    const typeInfo = SLEEP_TYPES[sleepType]
    const firstName = capturedEmail.split('@')[0]?.split('.')[0] || ''
    const greeting = firstName ? `${firstName.charAt(0).toUpperCase() + firstName.slice(1)}, here's` : "Here's"

    return (
      <div className="min-h-screen bg-[#1a1a2e] px-4 py-12">
        <div className="max-w-3xl mx-auto">

          {/* ── STEP 7: Diagnosis Header ── */}
          <div className="text-center mb-10">
            <div className="inline-block bg-[#a8dadc]/10 border border-[#a8dadc]/30 rounded-full px-4 py-1 text-sm text-[#a8dadc] mb-6">
              Your Sleep Diagnosis
            </div>
            <div className="text-5xl mb-4">{typeInfo.emoji}</div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#f1faee] mb-3 leading-tight">
              {greeting} your result.
            </h1>
            <p className="text-2xl font-semibold text-[#a8dadc] mb-4">
              You are: <em>{typeInfo.title}</em>
            </p>
            <p className="text-xl text-[#f1faee]/70">
              {typeInfo.headline}
            </p>
          </div>

          {/* ── STEP 6: Identity Description ── */}
          <div className="bg-[#16213e] border border-[#a8dadc]/20 rounded-xl p-8 mb-6">
            <h2 className="text-xl font-bold text-[#a8dadc] mb-4">What this means for you</h2>
            <p className="text-[#f1faee]/90 text-lg leading-relaxed mb-6">
              {typeInfo.identity_description}
            </p>
            <h3 className="font-semibold text-[#a8dadc] mb-3">Why this is happening</h3>
            <p className="text-[#f1faee]/80 leading-relaxed">
              {typeInfo.behavior_explanation}
            </p>
          </div>

          {/* ── STEP 6: Common Struggles ── */}
          <div className="bg-[#16213e] border border-[#4a4e69]/30 rounded-xl p-8 mb-6">
            <h2 className="text-xl font-bold text-[#f1faee] mb-4">Your common struggles</h2>
            <p className="text-[#f1faee]/60 text-sm mb-4">If these feel familiar, you're in the right place:</p>
            <ul className="space-y-3">
              {typeInfo.common_struggles.map((struggle, idx) => (
                <li key={idx} className="flex gap-3 text-[#f1faee]/85">
                  <span className="text-red-400 flex-shrink-0 mt-0.5">✗</span>
                  <span>{struggle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── STEP 6: Hidden Strengths ── */}
          <div className="bg-[#16213e] border border-[#a8dadc]/10 rounded-xl p-8 mb-10">
            <h2 className="text-xl font-bold text-[#a8dadc] mb-4">Your hidden strengths</h2>
            <ul className="space-y-3">
              {typeInfo.hidden_strengths.map((strength, idx) => (
                <li key={idx} className="flex gap-3 text-[#f1faee]/85">
                  <span className="text-[#a8dadc] flex-shrink-0 mt-0.5">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── STEP 8: Affiliate Bridge ── */}
          <div className="border-t border-[#4a4e69]/30 pt-10 mb-8">
            <h2 className="text-2xl font-bold text-[#f1faee] mb-4">
              The good news
            </h2>
            <p className="text-[#f1faee]/80 text-lg leading-relaxed mb-6">
              {typeInfo.bridge_text}
            </p>
            <p className="text-[#f1faee]/80 leading-relaxed mb-8">
              {typeInfo.cta_angle}
            </p>

            <div className="bg-[#16213e] border border-[#a8dadc]/30 rounded-xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📖</span>
                <div>
                  <p className="text-xs text-[#a8dadc] uppercase tracking-wide font-semibold">Recommended for your type</p>
                  <h3 className="text-xl font-bold text-[#f1faee]">The Forgotten Sleep Ritual</h3>
                </div>
              </div>
              <p className="text-[#f1faee]/70 text-sm mb-5">
                A 40-page protocol built specifically for the root causes behind your sleep type — not generic sleep hygiene advice.
              </p>
              <ul className="space-y-2 mb-6">
                {typeInfo.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex gap-3 text-[#f1faee]/85 text-sm">
                    <span className="text-[#a8dadc] font-bold flex-shrink-0">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between text-sm text-[#f1faee]/50 border-t border-[#4a4e69]/30 pt-4">
                <span>60-day money-back guarantee</span>
                <span className="text-[#a8dadc] font-semibold">$17</span>
              </div>
            </div>

            {/* Primary CTA */}
            <button
              onClick={handleOfferCTA}
              className="w-full bg-[#a8dadc] hover:bg-[#8ec8d0] text-[#1a1a2e] font-bold py-5 px-6 rounded-lg transition text-lg mb-3"
            >
              Get The Forgotten Sleep Ritual — $17 →
            </button>
            <p className="text-center text-sm text-[#f1faee]/40 mb-8">
              60-day money-back guarantee. If it doesn't work for your sleep type, you pay nothing.
            </p>

            {/* Secondary CTA */}
            <button
              onClick={() => navigate('/calculator')}
              className="w-full border border-[#a8dadc]/40 text-[#a8dadc] hover:bg-[#a8dadc]/10 font-medium py-3 px-6 rounded-lg transition text-sm"
            >
              Or start with the free Sleep Blueprint →
            </button>
          </div>

        </div>
      </div>
    )
  }

  // ── QUESTIONS PHASE ───────────────────────────────────────────────────────
  if (phase === 'questions' && currentQuestionIndex < QUIZ_QUESTIONS.length) {
    const question = QUIZ_QUESTIONS[currentQuestionIndex]
    const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100

    return (
      <div className="min-h-screen bg-[#1a1a2e] px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#f1faee]/60">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
              <span className="text-sm text-[#a8dadc] font-semibold">{Math.round(progress)}%</span>
            </div>
            <div className="bg-[#16213e] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#a8dadc] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1faee] mb-3">
              {question.question}
            </h2>
            <p className="text-lg text-[#f1faee]/60">{question.description}</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option.value)}
                className="w-full text-left p-5 bg-[#16213e] border-2 border-[#4a4e69]/30 hover:border-[#a8dadc] hover:bg-[#1a2344] rounded-xl transition text-[#f1faee] font-medium text-lg active:scale-[0.99]"
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
