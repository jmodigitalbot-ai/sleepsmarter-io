export type AssessmentCategoryId = 'sleep_patterns' | 'sleep_quality' | 'lifestyle' | 'environment'

export interface AssessmentOption {
  value: string
  label: string
  score: number
  description: string
}

export interface AssessmentQuestion {
  id: string
  category: AssessmentCategoryId
  question: string
  description: string
  options: AssessmentOption[]
}

export interface AssessmentResponse {
  questionId: string
  answer: string
}

export interface AssessmentScoreResult {
  overallSleepScore: number
  categoryScores: Record<AssessmentCategoryId, number>
  rawCategoryScores: Record<AssessmentCategoryId, number>
  categoryMaxScores: Record<AssessmentCategoryId, number>
}

export interface PersonaDetectionResult {
  primaryPersona: PersonaId
  confidence: number
  description: string
  secondaryPersonas?: Array<{ persona: PersonaId; confidence: number }>
}

export type PersonaId =
  | 'digital_addict'
  | 'restless_mind'
  | 'night_owl'
  | 'early_bird'
  | 'parent'
  | 'perfectionist'
  | 'healthy_sleeper'
  | 'general_optimizer'
  | 'foundation_builder'

export interface PrimaryChallenge {
  type: PrimaryChallengeId
  severity: 'low' | 'medium' | 'high'
  priority: number
  description: string
}

export type PrimaryChallengeId =
  | 'falling_asleep'
  | 'staying_asleep'
  | 'screen_time'
  | 'caffeine_timing'
  | 'stress_management'
  | 'schedule_consistency'
  | 'sleep_quality'
  | 'environment'
  | 'general_optimization'

export const sleepAssessmentQuestions: AssessmentQuestion[] = [
  {
    id: 'sleep_consistency',
    category: 'sleep_patterns',
    question: 'How consistent is your sleep schedule?',
    description: 'Do you go to bed and wake up at roughly the same time each day?',
    options: [
      {
        value: 'very_consistent',
        label: 'Very consistent (±30 minutes)',
        score: 3,
        description: 'Bedtime and wake time vary by less than 30 minutes daily'
      },
      {
        value: 'somewhat_consistent',
        label: 'Somewhat consistent (±1 hour)',
        score: 2,
        description: 'Bedtime and wake time vary by about 1 hour'
      },
      {
        value: 'inconsistent',
        label: 'Inconsistent (varies by 2+ hours)',
        score: 1,
        description: 'Schedule varies significantly day to day'
      },
      {
        value: 'completely_irregular',
        label: 'Completely irregular',
        score: 0,
        description: 'No consistent pattern, varies widely'
      }
    ]
  },
  {
    id: 'sleep_duration',
    category: 'sleep_patterns',
    question: 'On average, how many hours do you sleep per night?',
    description: 'Total time spent asleep, not just time in bed',
    options: [
      {
        value: 'less_than_6',
        label: 'Less than 6 hours',
        score: 0,
        description: 'Significantly below recommended minimum'
      },
      {
        value: '6_7_hours',
        label: '6-7 hours',
        score: 1,
        description: 'Below optimal but functional for many'
      },
      {
        value: '7_8_hours',
        label: '7-8 hours',
        score: 2,
        description: 'Within optimal range for most adults'
      },
      {
        value: '8_plus_hours',
        label: '8+ hours',
        score: 3,
        description: 'Above average, may indicate higher sleep need'
      }
    ]
  },
  {
    id: 'sleep_latency',
    category: 'sleep_quality',
    question: 'How long does it typically take you to fall asleep?',
    description: 'Time from getting into bed to actually falling asleep',
    options: [
      {
        value: 'less_than_10',
        label: 'Less than 10 minutes',
        score: 3,
        description: 'Optimal sleep onset latency'
      },
      {
        value: '10_20_minutes',
        label: '10-20 minutes',
        score: 2,
        description: 'Normal range for healthy sleepers'
      },
      {
        value: '20_30_minutes',
        label: '20-30 minutes',
        score: 1,
        description: 'Mild sleep onset difficulty'
      },
      {
        value: '30_plus_minutes',
        label: '30+ minutes',
        score: 0,
        description: 'Significant sleep onset difficulty'
      }
    ]
  },
  {
    id: 'nighttime_awakenings',
    category: 'sleep_quality',
    question: 'How often do you wake up during the night?',
    description: 'Awakenings that require effort to fall back asleep',
    options: [
      {
        value: 'rarely_never',
        label: 'Rarely or never',
        score: 3,
        description: 'Sleep continuity is excellent'
      },
      {
        value: '1_2_times',
        label: '1-2 times',
        score: 2,
        description: 'Normal for many adults'
      },
      {
        value: '3_4_times',
        label: '3-4 times',
        score: 1,
        description: 'Frequent disruptions to sleep'
      },
      {
        value: '5_plus_times',
        label: '5+ times',
        score: 0,
        description: 'Severe sleep maintenance issues'
      }
    ]
  },
  {
    id: 'morning_refreshment',
    category: 'sleep_quality',
    question: 'How refreshed do you feel when you wake up?',
    description: 'Your energy level and alertness upon waking',
    options: [
      {
        value: 'very_refreshed',
        label: 'Very refreshed and energetic',
        score: 3,
        description: 'Wake up feeling restored and ready for the day'
      },
      {
        value: 'somewhat_refreshed',
        label: 'Somewhat refreshed',
        score: 2,
        description: 'Generally okay but not fully energized'
      },
      {
        value: 'tired_functional',
        label: 'Tired but functional',
        score: 1,
        description: 'Need caffeine or time to feel awake'
      },
      {
        value: 'exhausted_groggy',
        label: 'Exhausted and groggy',
        score: 0,
        description: 'Struggle to get out of bed, feel unrested'
      }
    ]
  },
  {
    id: 'screen_time',
    category: 'lifestyle',
    question: 'How often do you use screens within 1 hour of bedtime?',
    description: 'Phone, TV, computer, tablet usage before sleep',
    options: [
      {
        value: 'rarely_never',
        label: 'Rarely or never',
        score: 3,
        description: 'Excellent digital boundary before bed'
      },
      {
        value: 'occasionally',
        label: 'Occasionally (1-3 times/week)',
        score: 2,
        description: 'Moderate screen exposure before bed'
      },
      {
        value: 'frequently',
        label: 'Frequently (4-6 times/week)',
        score: 1,
        description: 'Regular screen time disrupting sleep'
      },
      {
        value: 'every_night',
        label: 'Every night',
        score: 0,
        description: 'Constant screen exposure before sleep'
      }
    ]
  },
  {
    id: 'caffeine_timing',
    category: 'lifestyle',
    question: 'When do you typically have your last caffeinated drink?',
    description: 'Coffee, tea, soda, energy drinks with caffeine',
    options: [
      {
        value: 'before_2pm',
        label: 'Before 2 PM',
        score: 3,
        description: 'Optimal caffeine cutoff time'
      },
      {
        value: '2_4pm',
        label: '2-4 PM',
        score: 2,
        description: 'Moderate timing, may affect some people'
      },
      {
        value: '4_6pm',
        label: '4-6 PM',
        score: 1,
        description: 'Late timing likely affecting sleep'
      },
      {
        value: 'after_6pm',
        label: 'After 6 PM',
        score: 0,
        description: 'Very late caffeine can disrupt sleep architecture'
      }
    ]
  },
  {
    id: 'stress_levels',
    category: 'lifestyle',
    question: 'How would you describe your stress levels in the evening?',
    description: 'Mental and emotional stress before bedtime',
    options: [
      {
        value: 'very_low',
        label: 'Very low (rarely stressed)',
        score: 3,
        description: 'Excellent stress management'
      },
      {
        value: 'moderate',
        label: 'Moderate (some stress)',
        score: 2,
        description: 'Typical stress levels for adults'
      },
      {
        value: 'high',
        label: 'High (frequently stressed)',
        score: 1,
        description: 'Stress significantly impacting relaxation'
      },
      {
        value: 'very_high',
        label: 'Very high (constant stress)',
        score: 0,
        description: 'Chronic stress disrupting sleep'
      }
    ]
  },
  {
    id: 'bedroom_environment',
    category: 'environment',
    question: 'How would you rate your sleep environment?',
    description: 'Darkness, quiet, temperature, comfort of your bedroom',
    options: [
      {
        value: 'excellent',
        label: 'Excellent (dark, quiet, cool, comfortable)',
        score: 3,
        description: 'Ideal sleep sanctuary'
      },
      {
        value: 'good',
        label: 'Good (mostly conducive to sleep)',
        score: 2,
        description: 'Generally good with minor issues'
      },
      {
        value: 'fair',
        label: 'Fair (some issues)',
        score: 1,
        description: 'Multiple environmental factors need improvement'
      },
      {
        value: 'poor',
        label: 'Poor (many distractions/discomforts)',
        score: 0,
        description: 'Environment significantly impairs sleep'
      }
    ]
  },
  {
    id: 'exercise_timing',
    category: 'environment',
    question: 'When do you typically exercise?',
    description: 'Moderate to vigorous physical activity',
    options: [
      {
        value: 'morning',
        label: 'Morning (before noon)',
        score: 3,
        description: 'Optimal timing for sleep benefits'
      },
      {
        value: 'afternoon',
        label: 'Afternoon (12-5 PM)',
        score: 2,
        description: 'Good timing, minimal sleep disruption'
      },
      {
        value: 'evening',
        label: 'Evening (5-9 PM)',
        score: 1,
        description: 'May affect sleep onset for some'
      },
      {
        value: 'night',
        label: 'Night (after 9 PM)',
        score: 0,
        description: 'Likely disrupting sleep for most people'
      },
      {
        value: 'no_exercise',
        label: "I don't exercise regularly",
        score: 1,
        description: 'Lack of exercise may affect sleep quality'
      }
    ]
  }
]

export const assessmentCategories: Record<AssessmentCategoryId, {
  name: string
  description: string
  maxScore: number
  weight: number
}> = {
  sleep_patterns: {
    name: 'Sleep Patterns',
    description: 'Consistency and duration of your sleep schedule',
    maxScore: 6,
    weight: 0.25
  },
  sleep_quality: {
    name: 'Sleep Quality',
    description: 'How well you sleep and feel upon waking',
    maxScore: 9,
    weight: 0.3
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Daily habits affecting sleep',
    maxScore: 9,
    weight: 0.25
  },
  environment: {
    name: 'Environment',
    description: 'Sleep setting and physical factors',
    maxScore: 6,
    weight: 0.2
  }
}

export const personaProfiles: Record<PersonaId, { name: string; description: string; focus: string[] }> = {
  digital_addict: {
    name: 'Digital Addict',
    description: 'Screens and stimulation are crowding out your wind-down time, keeping your brain on high alert at night.',
    focus: ['Digital sunset habits', 'Low-stimulation evenings', 'Device boundaries']
  },
  restless_mind: {
    name: 'Restless Mind',
    description: 'Racing thoughts and heightened stress make it hard to switch off at bedtime.',
    focus: ['Nervous system downshift', 'Mental offloading', 'Relaxation rituals']
  },
  night_owl: {
    name: 'Night Owl',
    description: 'Your natural rhythm skews late, which clashes with early obligations and leaves you groggy.',
    focus: ['Gradual schedule shifts', 'Morning light', 'Evening cues']
  },
  early_bird: {
    name: 'Early Bird',
    description: 'You keep a consistent, early schedule and benefit from fine-tuning for energy and recovery.',
    focus: ['Performance optimization', 'Recovery routines', 'Consistency protection']
  },
  parent: {
    name: 'Sleep-Deprived Parent',
    description: 'Frequent nighttime disruptions make it hard to string together restorative sleep.',
    focus: ['Recovery strategies', 'Efficient wind-down', 'Shared sleep shifts']
  },
  perfectionist: {
    name: 'High-Achiever',
    description: 'High standards and stress keep your mind active when it should be slowing down.',
    focus: ['Stress decompression', 'Letting go rituals', 'Sleep-friendly routines']
  },
  healthy_sleeper: {
    name: 'Healthy Sleeper',
    description: 'Your habits are strong. The goal is to keep them consistent and upgrade a few details.',
    focus: ['Maintenance habits', 'Performance upgrades', 'Long-term resilience']
  },
  general_optimizer: {
    name: 'General Optimizer',
    description: 'You have solid habits but specific gaps are holding your sleep score back.',
    focus: ['Targeted improvements', 'Consistency upgrades', 'Environment tweaks']
  },
  foundation_builder: {
    name: 'Foundation Builder',
    description: 'Building basic sleep foundations will create the biggest improvements first.',
    focus: ['Routine basics', 'Consistency anchors', 'Simple habit stacking']
  }
}

export function calculateAssessmentScore(responses: AssessmentResponse[]): AssessmentScoreResult {
  const categoryScores: Record<AssessmentCategoryId, number> = {
    sleep_patterns: 0,
    sleep_quality: 0,
    lifestyle: 0,
    environment: 0
  }
  const categoryMaxScores: Record<AssessmentCategoryId, number> = {
    sleep_patterns: 0,
    sleep_quality: 0,
    lifestyle: 0,
    environment: 0
  }

  responses.forEach((response) => {
    const question = sleepAssessmentQuestions.find((q) => q.id === response.questionId)
    if (!question) return

    const option = question.options.find((opt) => opt.value === response.answer)
    if (!option) return

    categoryScores[question.category] += option.score
    categoryMaxScores[question.category] += 3
  })

  const categoryPercentages: Record<AssessmentCategoryId, number> = {
    sleep_patterns: 0,
    sleep_quality: 0,
    lifestyle: 0,
    environment: 0
  }

  ;(Object.keys(categoryScores) as AssessmentCategoryId[]).forEach((category) => {
    const maxScore = categoryMaxScores[category]
    categoryPercentages[category] = maxScore > 0 ? (categoryScores[category] / maxScore) * 100 : 0
  })

  let totalWeightedScore = 0
  let totalWeight = 0

  ;(Object.keys(categoryPercentages) as AssessmentCategoryId[]).forEach((category) => {
    const weight = assessmentCategories[category].weight
    totalWeightedScore += categoryPercentages[category] * weight
    totalWeight += weight
  })

  const overallSleepScore = Math.round(totalWeightedScore / totalWeight)

  return {
    overallSleepScore,
    categoryScores: categoryPercentages,
    rawCategoryScores: categoryScores,
    categoryMaxScores
  }
}

export function detectSleepPersona(
  responses: AssessmentResponse[],
  scoreResult: AssessmentScoreResult
): PersonaDetectionResult {
  const responseMap: Record<string, string> = {}
  responses.forEach((response) => {
    responseMap[response.questionId] = response.answer
  })

  const patterns: Array<{ persona: PersonaId; confidence: number; description: string }> = []

  if (responseMap.screen_time === 'every_night' || responseMap.screen_time === 'frequently') {
    patterns.push({
      persona: 'digital_addict',
      confidence: responseMap.screen_time === 'every_night' ? 0.9 : 0.7,
      description: 'High screen time before bed is likely disrupting sleep.'
    })
  }

  if (responseMap.stress_levels === 'high' || responseMap.stress_levels === 'very_high') {
    patterns.push({
      persona: 'restless_mind',
      confidence: responseMap.stress_levels === 'very_high' ? 0.9 : 0.7,
      description: 'Evening stress and anxiety are impacting sleep quality.'
    })
  }

  if (
    responseMap.sleep_consistency === 'inconsistent' ||
    responseMap.sleep_consistency === 'completely_irregular'
  ) {
    if (
      responseMap.morning_refreshment === 'tired_functional' ||
      responseMap.morning_refreshment === 'exhausted_groggy'
    ) {
      patterns.push({
        persona: 'night_owl',
        confidence: 0.8,
        description: 'Late schedule patterns and morning grogginess point to a night owl rhythm.'
      })
    }
  }

  if (responseMap.sleep_consistency === 'very_consistent' && scoreResult.categoryScores.sleep_patterns > 80) {
    if (
      responseMap.morning_refreshment === 'very_refreshed' ||
      responseMap.morning_refreshment === 'somewhat_refreshed'
    ) {
      patterns.push({
        persona: 'early_bird',
        confidence: 0.7,
        description: 'Consistent early schedule with good morning energy.'
      })
    }
  }

  if (
    responseMap.nighttime_awakenings === '3_4_times' ||
    responseMap.nighttime_awakenings === '5_plus_times'
  ) {
    if (responseMap.sleep_duration === 'less_than_6' || responseMap.sleep_duration === '6_7_hours') {
      patterns.push({
        persona: 'parent',
        confidence: 0.8,
        description: 'Frequent awakenings with short sleep duration.'
      })
    }
  }

  if (responseMap.stress_levels === 'high' || responseMap.stress_levels === 'very_high') {
    if (responseMap.sleep_latency === '20_30_minutes' || responseMap.sleep_latency === '30_plus_minutes') {
      patterns.push({
        persona: 'perfectionist',
        confidence: 0.8,
        description: 'High stress combined with difficulty falling asleep.'
      })
    }
  }

  if (scoreResult.overallSleepScore > 80) {
    patterns.push({
      persona: 'healthy_sleeper',
      confidence: 0.9,
      description: 'Strong sleep habits across all categories.'
    })
  }

  if (patterns.length === 0) {
    if (scoreResult.overallSleepScore > 80) {
      return {
        primaryPersona: 'healthy_sleeper',
        confidence: 0.7,
        description: 'Good sleep habits with room for optimization.'
      }
    }

    if (scoreResult.overallSleepScore > 60) {
      return {
        primaryPersona: 'general_optimizer',
        confidence: 0.6,
        description: 'Moderate sleep habits needing targeted improvement.'
      }
    }

    return {
      primaryPersona: 'foundation_builder',
      confidence: 0.8,
      description: 'Needs to establish basic sleep habits first.'
    }
  }

  patterns.sort((a, b) => b.confidence - a.confidence)

  return {
    primaryPersona: patterns[0].persona,
    confidence: patterns[0].confidence,
    description: patterns[0].description,
    secondaryPersonas: patterns.slice(1, 3).map((pattern) => ({
      persona: pattern.persona,
      confidence: pattern.confidence
    }))
  }
}

export function identifyPrimaryChallenge(
  responses: AssessmentResponse[],
  scoreResult: AssessmentScoreResult
): PrimaryChallenge {
  const challenges: PrimaryChallenge[] = []

  if (scoreResult.categoryScores.sleep_patterns < 50) {
    challenges.push({
      type: 'schedule_consistency',
      severity: 'high',
      priority: 3,
      description: 'Inconsistent sleep schedule is disrupting circadian rhythm.'
    })
  }

  if (scoreResult.categoryScores.sleep_quality < 50) {
    challenges.push({
      type: 'sleep_quality',
      severity: 'high',
      priority: 4,
      description: 'Sleep quality and restoration are below target.'
    })
  }

  if (scoreResult.categoryScores.environment < 50) {
    challenges.push({
      type: 'environment',
      severity: 'medium',
      priority: 6,
      description: 'Your sleep environment is creating friction.'
    })
  }

  const responseMap: Record<string, string> = {}
  responses.forEach((response) => {
    responseMap[response.questionId] = response.answer
  })

  if (responseMap.sleep_latency === '30_plus_minutes' || responseMap.sleep_latency === '20_30_minutes') {
    challenges.push({
      type: 'falling_asleep',
      severity: responseMap.sleep_latency === '30_plus_minutes' ? 'high' : 'medium',
      priority: 1,
      description: 'Falling asleep is taking longer than desired.'
    })
  }

  if (responseMap.nighttime_awakenings === '3_4_times' || responseMap.nighttime_awakenings === '5_plus_times') {
    challenges.push({
      type: 'staying_asleep',
      severity: responseMap.nighttime_awakenings === '5_plus_times' ? 'high' : 'medium',
      priority: 2,
      description: 'Nighttime awakenings are disrupting sleep continuity.'
    })
  }

  if (responseMap.screen_time === 'frequently' || responseMap.screen_time === 'every_night') {
    challenges.push({
      type: 'screen_time',
      severity: responseMap.screen_time === 'every_night' ? 'high' : 'medium',
      priority: 1,
      description: 'Evening screen use is likely delaying sleep readiness.'
    })
  }

  if (responseMap.caffeine_timing === '4_6pm' || responseMap.caffeine_timing === 'after_6pm') {
    challenges.push({
      type: 'caffeine_timing',
      severity: responseMap.caffeine_timing === 'after_6pm' ? 'high' : 'medium',
      priority: 2,
      description: 'Late caffeine is likely impacting sleep depth.'
    })
  }

  if (responseMap.stress_levels === 'high' || responseMap.stress_levels === 'very_high') {
    challenges.push({
      type: 'stress_management',
      severity: responseMap.stress_levels === 'very_high' ? 'high' : 'medium',
      priority: 1,
      description: 'Stress levels are keeping the nervous system activated at night.'
    })
  }

  if (responseMap.sleep_consistency === 'inconsistent' || responseMap.sleep_consistency === 'completely_irregular') {
    challenges.push({
      type: 'schedule_consistency',
      severity: responseMap.sleep_consistency === 'completely_irregular' ? 'high' : 'medium',
      priority: 3,
      description: 'Schedule inconsistency is reducing sleep quality.'
    })
  }

  challenges.sort((a, b) => a.priority - b.priority)

  if (challenges.length === 0) {
    return {
      type: 'general_optimization',
      severity: 'low',
      priority: 10,
      description: 'Focus on small optimizations to protect good sleep habits.'
    }
  }

  return challenges[0]
}
