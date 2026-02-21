import type {
  AssessmentResponse,
  AssessmentScoreResult,
  PersonaDetectionResult,
  PrimaryChallenge,
  PrimaryChallengeId
} from './assessment'

export interface SleepScheduleOption {
  time: string
  cycles: number
  hours: number
  quality: 'optimal' | 'good' | 'minimum'
}

export interface CalculatorData {
  mode: 'wakeup' | 'bedtime'
  targetTime: string
  results: SleepScheduleOption[]
}

export interface RecommendationQuickWin {
  id: string
  title: string
  description: string
  steps: string[]
  timing: string
  expectedImpact: string
  difficulty: 'easy' | 'medium' | 'hard'
  timeRequired: string
  science?: string
}

export interface SevenDayProtocolPhase {
  days: string
  theme: string
  focus: string
  actions: string[]
  successMetrics: string[]
  tips: string[]
}

export interface SleepScheduleRecommendation {
  time: string
  cycles: number
  hours: number
  quality: 'optimal' | 'good' | 'minimum'
  useCase: string
  priority: number
  icon: string
}

export interface SleepSchedulePlan {
  mode: 'wakeup' | 'bedtime'
  targetTime: string
  recommendations: SleepScheduleRecommendation[]
  personalizedTips: Array<{ tip: string; reason: string }>
}

export interface RecommendationBundle {
  executiveSummary: string
  quickWins: RecommendationQuickWin[]
  sleepSchedule: SleepSchedulePlan | null
  sevenDayProtocol: SevenDayProtocolPhase[]
}

export interface AssessmentDataInput {
  overallSleepScore: number
  categoryScores: AssessmentScoreResult['categoryScores']
  primaryChallenge: PrimaryChallenge
  persona: PersonaDetectionResult
  responses: AssessmentResponse[]
}

export class SleepBlueprintRecommendationEngine {
  private assessment: AssessmentDataInput
  private calculator: CalculatorData | null

  constructor(assessmentData: AssessmentDataInput, calculatorData?: CalculatorData | null) {
    this.assessment = assessmentData
    this.calculator = calculatorData ?? null
  }

  generateAllRecommendations(): RecommendationBundle {
    return {
      executiveSummary: this.generateExecutiveSummary(),
      quickWins: this.generateQuickWins(),
      sleepSchedule: this.generateSleepSchedule(),
      sevenDayProtocol: this.generateSevenDayProtocol()
    }
  }

  private generateExecutiveSummary(): string {
    const scoreRange = this.getScoreRange(this.assessment.overallSleepScore)
    const challenge = this.assessment.primaryChallenge
    const personaName = this.formatPersonaName(this.assessment.persona.primaryPersona)

    const summaries: Record<string, string> = {
      critical: `Your sleep needs a reset. With a score of ${this.assessment.overallSleepScore}/100, you're dealing with multiple friction points. As a ${personaName}, we'll focus on building a strong baseline while addressing ${this.formatChallengeDescription(challenge)}.`,
      needs_work: `You have a solid foundation with clear areas to improve. Your score of ${this.assessment.overallSleepScore}/100 suggests targeted changes will pay off. As a ${personaName}, we'll focus on ${this.formatChallengeDescription(challenge)} to move you into excellent sleep.`,
      good: `You're doing many things right. With a score of ${this.assessment.overallSleepScore}/100, you're close to great sleep. As a ${personaName}, we'll fine-tune ${this.formatChallengeDescription(challenge)} for an even better outcome.`,
      excellent: `You're already in great shape with a score of ${this.assessment.overallSleepScore}/100. As a ${personaName}, we'll protect your habits and apply small upgrades for peak recovery.`
    }

    return summaries[scoreRange] || summaries.needs_work
  }

  private generateQuickWins(): RecommendationQuickWin[] {
    const quickWins: RecommendationQuickWin[] = []

    quickWins.push({
      id: 'temperature_optimization',
      title: 'Bedroom Temperature Reset',
      description: 'Make it easier for your body to cool down for sleep.',
      steps: [
        'Set the bedroom between 65-68°F (18-20°C)',
        'Use breathable, lightweight bedding',
        'Ventilate the room 30 minutes before bed',
        'Adjust based on personal comfort'
      ],
      timing: 'Tonight',
      expectedImpact: 'May improve sleep depth and continuity',
      difficulty: 'easy',
      timeRequired: '5 minutes setup',
      science: 'A slight drop in core temperature supports sleep onset.'
    })

    switch (this.assessment.primaryChallenge.type) {
      case 'falling_asleep':
        quickWins.push({
          id: 'breathing_technique',
          title: '4-7-8 Breathing',
          description: 'Downshifts the nervous system to reduce sleep latency.',
          steps: [
            'Inhale through the nose for 4 seconds',
            'Hold for 7 seconds',
            'Exhale through the mouth for 8 seconds',
            'Repeat 4 cycles'
          ],
          timing: '10 minutes before bed',
          expectedImpact: 'May shorten time to fall asleep',
          difficulty: 'easy',
          timeRequired: '5 minutes',
          science: 'Longer exhale cues the parasympathetic response.'
        })
        break
      case 'screen_time':
        quickWins.push({
          id: 'digital_sunset',
          title: 'Digital Sunset Protocol',
          description: 'Reduce blue light and stimulation before bed.',
          steps: [
            'Enable night shift or warm filters 60 minutes before bed',
            'Switch to grayscale mode 30 minutes before bed',
            'Charge your phone outside the bedroom',
            'Replace scrolling with a low-stimulation activity'
          ],
          timing: '60 minutes before bedtime',
          expectedImpact: 'May improve sleep onset and quality',
          difficulty: 'medium',
          timeRequired: '60 minutes',
          science: 'Reducing bright light supports melatonin release.'
        })
        break
      case 'caffeine_timing':
        quickWins.push({
          id: 'caffeine_cutoff',
          title: 'Caffeine Cutoff',
          description: 'Move caffeine earlier to protect deep sleep.',
          steps: [
            'Set your last caffeinated drink by 2 PM',
            'Swap in decaf or herbal tea later in the day',
            'Hydrate mid-afternoon to avoid energy dips',
            'Track energy levels for the first 3 days'
          ],
          timing: '10+ hours before bedtime',
          expectedImpact: 'May reduce nighttime awakenings',
          difficulty: 'medium',
          timeRequired: 'Planning only',
          science: 'Caffeine can linger in the system for hours.'
        })
        break
      case 'stress_management':
        quickWins.push({
          id: 'worry_download',
          title: 'Evening Worry Download',
          description: 'Offload mental clutter before bed.',
          steps: [
            'Write down worries 60-90 minutes before bed',
            'Separate actionable items from uncontrollable ones',
            'Schedule actionable items for tomorrow',
            'Close the journal and move on'
          ],
          timing: '60-90 minutes before bedtime',
          expectedImpact: 'May reduce pre-sleep anxiety',
          difficulty: 'easy',
          timeRequired: '10-15 minutes',
          science: 'Externalizing thoughts reduces rumination.'
        })
        break
      case 'staying_asleep':
        quickWins.push({
          id: 'night_wake_plan',
          title: 'Night Wake Plan',
          description: 'Create a plan for awakenings so you return to sleep faster.',
          steps: [
            'Keep lights low if you wake up',
            'Use a simple breathing pattern',
            'Avoid checking the time',
            'If awake after 20 minutes, reset with calm activity'
          ],
          timing: 'During nighttime awakenings',
          expectedImpact: 'May reduce wake time during the night',
          difficulty: 'easy',
          timeRequired: 'None',
          science: 'Low stimulation helps the brain return to sleep.'
        })
        break
      default:
        quickWins.push({
          id: 'wind_down_anchor',
          title: 'Wind-Down Anchor',
          description: 'Start a simple routine to cue sleep every night.',
          steps: [
            'Set a bedtime alarm 45 minutes before sleep',
            'Dim lights and lower stimulation',
            'Do the same 2-step routine nightly',
            'Keep it consistent even on weekends'
          ],
          timing: '45 minutes before bedtime',
          expectedImpact: 'May improve consistency and sleep readiness',
          difficulty: 'easy',
          timeRequired: '10 minutes'
        })
    }

    if (this.assessment.persona.primaryPersona === 'digital_addict') {
      quickWins.push({
        id: 'phone_free_zone',
        title: 'Phone-Free Bedroom',
        description: 'Create a physical boundary between devices and sleep.',
        steps: [
          'Charge the phone outside the bedroom',
          'Use an analog or simple alarm clock',
          'Enable Do Not Disturb during sleep hours',
          'Keep the phone 10 feet from the bed'
        ],
        timing: 'Starting tonight',
        expectedImpact: 'May reduce sleep interruptions',
        difficulty: 'medium',
        timeRequired: '5 minutes setup'
      })
    }

    if (this.assessment.persona.primaryPersona === 'restless_mind') {
      quickWins.push({
        id: 'body_scan',
        title: 'Progressive Muscle Relaxation',
        description: 'Release physical tension to quiet the mind.',
        steps: [
          'Tense and relax toes, then calves, thighs, abdomen',
          'Move up: chest, hands, arms, shoulders, neck',
          'Finish with jaw and facial muscles',
          'Notice the sensation of release'
        ],
        timing: '15 minutes before bed',
        expectedImpact: 'May reduce sleep latency',
        difficulty: 'easy',
        timeRequired: '10 minutes'
      })
    }

    return quickWins
  }

  private generateSleepSchedule(): SleepSchedulePlan | null {
    if (!this.calculator?.results) return null

    const { mode, targetTime, results } = this.calculator
    const personalizedSchedule: SleepSchedulePlan = {
      mode,
      targetTime,
      recommendations: [],
      personalizedTips: []
    }

    results.forEach((result) => {
      personalizedSchedule.recommendations.push({
        time: result.time,
        cycles: result.cycles,
        hours: result.hours,
        quality: result.quality,
        useCase: this.getUseCaseForOption(result.quality),
        priority: this.getPriorityForOption(result.quality),
        icon: this.getIconForQuality(result.quality)
      })
    })

    const responseMap = this.createResponseMap()

    if (this.assessment.primaryChallenge.type === 'falling_asleep') {
      personalizedSchedule.personalizedTips.push({
        tip: 'Set a bedtime alarm 30 minutes before your target time to start winding down.',
        reason: 'Your answers show sleep onset is the biggest friction point.'
      })
    }

    if (
      responseMap.sleep_consistency === 'inconsistent' ||
      responseMap.sleep_consistency === 'completely_irregular'
    ) {
      personalizedSchedule.personalizedTips.push({
        tip: 'Anchor a consistent wake time first, even on weekends.',
        reason: 'Consistency improves circadian alignment faster than shifting bedtime alone.'
      })
    }

    if (this.assessment.persona.primaryPersona === 'night_owl') {
      personalizedSchedule.personalizedTips.push({
        tip: 'Shift bedtime earlier by 15 minutes every 3 days instead of making a big jump.',
        reason: 'Gradual shifts are more sustainable for late chronotypes.'
      })
    }

    return personalizedSchedule
  }

  private generateSevenDayProtocol(): SevenDayProtocolPhase[] {
    const challenge = this.assessment.primaryChallenge.type
    const persona = this.assessment.persona.primaryPersona

    const protocolTemplates: Record<PrimaryChallengeId, SevenDayProtocolPhase[]> = {
      falling_asleep: this.createFallingAsleepProtocol(),
      staying_asleep: this.createStayingAsleepProtocol(),
      screen_time: this.createScreenTimeProtocol(),
      schedule_consistency: this.createConsistencyProtocol(),
      sleep_quality: this.createSleepQualityProtocol(),
      caffeine_timing: this.createCaffeineProtocol(),
      stress_management: this.createStressProtocol(),
      environment: this.createEnvironmentProtocol(),
      general_optimization: this.createGeneralProtocol()
    }

    let protocol = protocolTemplates[challenge] || this.createGeneralProtocol()

    protocol = this.personalizeProtocolForPersona(protocol, persona)

    return protocol
  }

  private createFallingAsleepProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Wind-Down Foundation',
        focus: 'Build a consistent pre-sleep routine',
        actions: [
          'Digital sunset 60 minutes before bed',
          '4-7-8 breathing practice',
          'Cool room to 67°F before bed',
          'Dim lights 90 minutes before bed'
        ],
        successMetrics: ['Sleep latency under 25 minutes', 'Routine starts at the same time'],
        tips: ['Keep a notepad for quick worry dumps', 'Choose calm activities after 8 PM']
      },
      {
        days: '3-4',
        theme: 'Cognitive Reset',
        focus: 'Reduce mental activation at night',
        actions: [
          'Evening meditation (10 minutes)',
          'Gratitude journaling (3 items)',
          'Progressive muscle relaxation',
          'Body scan in bed'
        ],
        successMetrics: ['Sleep latency under 20 minutes', 'Lower pre-sleep anxiety'],
        tips: ['Write down racing thoughts before bed', 'Try a consistent sleep soundtrack']
      },
      {
        days: '5-7',
        theme: 'Habit Integration',
        focus: 'Make the routine automatic',
        actions: [
          'Combine breathing + meditation',
          'Track sleep latency daily',
          'Adjust timing based on results',
          'Celebrate the 7-day streak'
        ],
        successMetrics: ['Sleep latency under 15 minutes', 'Routine feels effortless'],
        tips: ['Use a checklist for consistency', 'Reward yourself for progress']
      }
    ]
  }

  private createStayingAsleepProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Night Wake Strategy',
        focus: 'Reduce stimulation during awakenings',
        actions: [
          'Keep lights low during night wakes',
          'Use slow breathing to settle back down',
          'Avoid checking the clock',
          'Keep the room cool and dark'
        ],
        successMetrics: ['Faster return to sleep', 'Fewer long awakenings'],
        tips: ['Keep a warm layer nearby to avoid temperature spikes', 'Use a white noise layer']
      },
      {
        days: '3-4',
        theme: 'Deep Sleep Support',
        focus: 'Strengthen recovery signals',
        actions: [
          'Morning light exposure within 30 minutes of waking',
          'Moderate exercise earlier in the day',
          'Cut alcohol within 3 hours of bed',
          'Consistent wake time'
        ],
        successMetrics: ['More continuous sleep blocks', 'Improved morning energy'],
        tips: ['Hydrate earlier in the day to limit nighttime bathroom trips']
      },
      {
        days: '5-7',
        theme: 'Stability',
        focus: 'Reduce nightly variability',
        actions: [
          'Keep the same bedtime window',
          'Track awakenings and triggers',
          'Adjust room setup for comfort',
          'Reinforce the wind-down routine'
        ],
        successMetrics: ['Night awakenings reduced', 'Faster return to sleep'],
        tips: ['Note what helps and repeat it nightly']
      }
    ]
  }

  private createScreenTimeProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Digital Boundaries',
        focus: 'Create screen-free windows',
        actions: [
          'No screens in the bedroom',
          'Digital sunset 60 minutes before bed',
          'Charge phone outside the bedroom',
          'Use an analog alarm clock'
        ],
        successMetrics: ['Screen time after 8 PM under 30 minutes', 'Bedroom is device-free'],
        tips: ['Enable grayscale mode at 7 PM', 'Move social apps off home screen']
      },
      {
        days: '3-4',
        theme: 'Replacement Habits',
        focus: 'Swap in low-stimulation activities',
        actions: [
          'Evening walk after dinner',
          'Audiobook or calming podcast',
          'Reading a physical book',
          'Light stretching'
        ],
        successMetrics: ['Found 2+ enjoyable screen alternatives', 'Evening feels calmer'],
        tips: ['Set a timer for reading to keep bedtime consistent']
      },
      {
        days: '5-7',
        theme: 'Sustainable Rhythm',
        focus: 'Maintain the new screen boundary',
        actions: [
          'Review screen time reports',
          'Set app limits for high-use apps',
          'Create phone-free family time',
          'Plan a screen-free weekend block'
        ],
        successMetrics: ['Screen time reduced by ~50%', 'Habit feels sustainable'],
        tips: ['Schedule screen time like an appointment']
      }
    ]
  }

  private createConsistencyProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Anchor Wake Time',
        focus: 'Build a steady circadian cue',
        actions: [
          'Pick a wake time and keep it constant',
          'Get sunlight within 30 minutes of waking',
          'Avoid large naps after 3 PM',
          'Set a bedtime alarm'
        ],
        successMetrics: ['Wake time within 30 minutes', 'Morning energy improving'],
        tips: ['Use a light alarm if mornings are difficult']
      },
      {
        days: '3-4',
        theme: 'Evening Consistency',
        focus: 'Reduce bedtime variability',
        actions: [
          'Keep dinner within a 2-hour window',
          'Start wind-down at the same time',
          'Dim lights 90 minutes before bed',
          'Track bedtime and wake time'
        ],
        successMetrics: ['Bedtime within 45 minutes', 'Less social jet lag'],
        tips: ['Set phone reminders for wind-down']
      },
      {
        days: '5-7',
        theme: 'Weekend Alignment',
        focus: 'Stabilize weekends',
        actions: [
          'Limit weekend sleep-in to 60 minutes',
          'Keep morning light exposure',
          'Plan a consistent weekend wind-down',
          'Review progress and adjust'
        ],
        successMetrics: ['Weekend schedule within 1 hour', 'Better Monday energy'],
        tips: ['Use a planned nap instead of a late sleep-in']
      }
    ]
  }

  private createSleepQualityProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Environment Reset',
        focus: 'Remove sleep disruptors',
        actions: [
          'Optimize room temperature',
          'Block light with curtains or mask',
          'Reduce noise with white noise',
          'Refresh bedding comfort'
        ],
        successMetrics: ['Bedroom feels calm and dark', 'Fewer wake-ups'],
        tips: ['Test a sleep mask if light leaks remain']
      },
      {
        days: '3-4',
        theme: 'Daytime Support',
        focus: 'Boost daytime signals for better nights',
        actions: [
          'Morning sunlight exposure',
          'Moderate exercise earlier in the day',
          'Hydrate consistently',
          'Limit heavy meals late at night'
        ],
        successMetrics: ['Better morning alertness', 'Less afternoon crash'],
        tips: ['Try a 10-minute walk after meals']
      },
      {
        days: '5-7',
        theme: 'Recovery Boost',
        focus: 'Protect deep and REM sleep',
        actions: [
          'Keep a consistent bedtime window',
          'Reduce alcohol close to bedtime',
          'Use a calming wind-down routine',
          'Track morning refreshment'
        ],
        successMetrics: ['Improved morning refreshment', 'Stable sleep score'],
        tips: ['Keep a simple sleep log for awareness']
      }
    ]
  }

  private createCaffeineProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Shift the Cutoff',
        focus: 'Move caffeine earlier in the day',
        actions: [
          'Set a 2 PM caffeine cutoff',
          'Swap in herbal tea in the evening',
          'Hydrate to prevent energy dips',
          'Track late-day energy levels'
        ],
        successMetrics: ['No caffeine after 2 PM', 'Improved sleep depth'],
        tips: ['Use a smaller morning dose if needed']
      },
      {
        days: '3-4',
        theme: 'Energy Management',
        focus: 'Stabilize energy without caffeine',
        actions: [
          'Add a mid-day walk',
          'Eat a balanced afternoon snack',
          'Take short breathing breaks',
          'Expose yourself to daylight mid-afternoon'
        ],
        successMetrics: ['Less afternoon slump', 'More consistent energy'],
        tips: ['Try protein + fiber snacks to avoid crashes']
      },
      {
        days: '5-7',
        theme: 'Sustainable Routine',
        focus: 'Lock in caffeine boundaries',
        actions: [
          'Plan caffeine-free evenings',
          'Review caffeine sources',
          'Adjust bedtime based on energy levels',
          'Celebrate 7 days of consistent cutoff'
        ],
        successMetrics: ['Caffeine boundary feels automatic', 'Better sleep continuity'],
        tips: ['Keep decaf options on hand']
      }
    ]
  }

  private createStressProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Stress Release',
        focus: 'Reduce cognitive load before bed',
        actions: [
          'Evening worry download',
          '5-minute breathing reset',
          'Light stretching',
          'Dim lights 90 minutes before bed'
        ],
        successMetrics: ['Lower evening stress rating', 'Faster wind-down'],
        tips: ['Write tomorrow’s top 3 tasks to close open loops']
      },
      {
        days: '3-4',
        theme: 'Nervous System Care',
        focus: 'Build calming signals',
        actions: [
          'Morning light exposure',
          'Short mid-day walk',
          'Limit heavy news intake at night',
          'Try a 10-minute meditation'
        ],
        successMetrics: ['Reduced evening rumination', 'Better sleep onset'],
        tips: ['Schedule a daily calm time block']
      },
      {
        days: '5-7',
        theme: 'Routine Lock-In',
        focus: 'Make the routine predictable',
        actions: [
          'Keep a consistent bedtime',
          'Use the same wind-down sequence',
          'Protect the last hour from work',
          'Track stress levels nightly'
        ],
        successMetrics: ['Stress levels trending lower', 'Routine feels automatic'],
        tips: ['Pair wind-down with a favorite calming ritual']
      }
    ]
  }

  private createEnvironmentProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Bedroom Audit',
        focus: 'Remove the biggest environment blockers',
        actions: [
          'Block light leaks',
          'Reduce noise',
          'Adjust temperature',
          'Declutter nightstand'
        ],
        successMetrics: ['Bedroom feels quiet and dark', 'Fewer disruptions'],
        tips: ['Use a sleep mask as a fast fix']
      },
      {
        days: '3-4',
        theme: 'Comfort Upgrade',
        focus: 'Improve physical comfort',
        actions: [
          'Check pillow support',
          'Optimize mattress feel',
          'Add breathable bedding',
          'Test different sleep positions'
        ],
        successMetrics: ['Less tossing and turning', 'Better morning comfort'],
        tips: ['Rotate the mattress if needed']
      },
      {
        days: '5-7',
        theme: 'Maintain the Sanctuary',
        focus: 'Keep the bedroom sleep-only',
        actions: [
          'Remove work materials',
          'Keep the room cool nightly',
          'Create a pre-sleep tidy routine',
          'Protect the bedtime boundary'
        ],
        successMetrics: ['Bedroom feels relaxing', 'Consistent sleep environment'],
        tips: ['Use calming scents if helpful']
      }
    ]
  }

  private createGeneralProtocol(): SevenDayProtocolPhase[] {
    return [
      {
        days: '1-2',
        theme: 'Sleep Baseline',
        focus: 'Start with consistent timing',
        actions: [
          'Set a consistent wake time',
          'Dim lights 90 minutes before bed',
          'Keep caffeine earlier in the day',
          'Create a 10-minute wind-down'
        ],
        successMetrics: ['Wake time within 30 minutes', 'Wind-down started nightly'],
        tips: ['Keep the routine simple']
      },
      {
        days: '3-4',
        theme: 'Quality Boost',
        focus: 'Improve sleep depth',
        actions: [
          'Optimize room temperature',
          'Limit screens before bed',
          'Get morning light',
          'Add gentle movement during the day'
        ],
        successMetrics: ['Morning refreshment improves', 'Fewer disruptions'],
        tips: ['Use a sleep log to spot patterns']
      },
      {
        days: '5-7',
        theme: 'Consistency Lock',
        focus: 'Make the routine sustainable',
        actions: [
          'Keep the same weekend schedule',
          'Reinforce your top 2 habits',
          'Plan a low-stimulation evening',
          'Review your progress'
        ],
        successMetrics: ['Routine feels automatic', 'Energy is steadier'],
        tips: ['Reward yourself for sticking with it']
      }
    ]
  }

  private personalizeProtocolForPersona(protocol: SevenDayProtocolPhase[], persona: string): SevenDayProtocolPhase[] {
    const personalizations: Record<string, (phases: SevenDayProtocolPhase[]) => SevenDayProtocolPhase[]> = {
      digital_addict: (phases) => {
        phases.forEach((phase) => {
          phase.actions.push('Enable website blockers during wind-down')
          phase.tips.push('Try a short digital detox block on the weekend')
        })
        return phases
      },
      restless_mind: (phases) => {
        phases.forEach((phase) => {
          phase.actions.push('Add an evening worry journal (10 minutes)')
          phase.tips.push('Use the 5-4-3-2-1 grounding exercise if anxious')
        })
        return phases
      },
      night_owl: (phases) => {
        phases.forEach((phase) => {
          phase.actions.push('Get morning light within 30 minutes of waking')
          phase.tips.push('Shift bedtime 15 minutes earlier every 3 days')
        })
        return phases
      },
      parent: (phases) => {
        phases.forEach((phase) => {
          phase.actions.push('Take a short 20-minute recovery nap if possible')
          phase.tips.push('Split nighttime responsibilities when available')
        })
        return phases
      }
    }

    return personalizations[persona] ? personalizations[persona](protocol) : protocol
  }

  private getScoreRange(score: number): 'critical' | 'needs_work' | 'good' | 'excellent' {
    if (score < 50) return 'critical'
    if (score < 70) return 'needs_work'
    if (score < 85) return 'good'
    return 'excellent'
  }

  private formatPersonaName(persona: string): string {
    return persona
      .split('_')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  private formatChallengeDescription(challenge: PrimaryChallenge): string {
    switch (challenge.type) {
      case 'falling_asleep':
        return 'falling asleep faster'
      case 'staying_asleep':
        return 'staying asleep through the night'
      case 'screen_time':
        return 'reducing evening screen stimulation'
      case 'caffeine_timing':
        return 'moving caffeine earlier in the day'
      case 'stress_management':
        return 'managing evening stress signals'
      case 'schedule_consistency':
        return 'tightening up schedule consistency'
      case 'environment':
        return 'improving the sleep environment'
      case 'sleep_quality':
        return 'improving overall sleep quality'
      default:
        return 'optimizing your sleep habits'
    }
  }

  private getUseCaseForOption(quality: 'optimal' | 'good' | 'minimum'): string {
    if (quality === 'optimal') return 'Best recovery and energy'
    if (quality === 'good') return 'Solid on busy days'
    return 'Emergency option only'
  }

  private getPriorityForOption(quality: 'optimal' | 'good' | 'minimum'): number {
    if (quality === 'optimal') return 1
    if (quality === 'good') return 2
    return 3
  }

  private getIconForQuality(quality: 'optimal' | 'good' | 'minimum'): string {
    if (quality === 'optimal') return '🌟'
    if (quality === 'good') return '✅'
    return '⚠️'
  }

  private createResponseMap(): Record<string, string> {
    const map: Record<string, string> = {}
    this.assessment.responses.forEach((response) => {
      map[response.questionId] = response.answer
    })
    return map
  }
}
