// Personalized Sleep Blueprint Recommendation Engine
// Generates customized recommendations based on assessment results

class SleepBlueprintRecommendationEngine {
  constructor(assessmentData, calculatorData, userProfile = {}) {
    this.assessment = assessmentData;
    this.calculator = calculatorData;
    this.userProfile = userProfile;
    
    // Extract key data
    this.sleepScore = assessmentData.overallSleepScore;
    this.categoryScores = assessmentData.categoryScores;
    this.primaryChallenge = assessmentData.primaryChallenge;
    this.persona = assessmentData.persona;
    this.responses = assessmentData.responses || {};
    
    // Initialize recommendation structures
    this.recommendations = {
      executiveSummary: '',
      quickWins: [],
      sleepSchedule: null,
      sevenDayProtocol: [],
      thirtyDayPlan: {},
      productRecommendations: [],
      trackingSystem: {}
    };
  }
  
  // Main method to generate all recommendations
  generateAllRecommendations() {
    this.recommendations.executiveSummary = this.generateExecutiveSummary();
    this.recommendations.quickWins = this.generateQuickWins();
    this.recommendations.sleepSchedule = this.generateSleepSchedule();
    this.recommendations.sevenDayProtocol = this.generateSevenDayProtocol();
    this.recommendations.thirtyDayPlan = this.generateThirtyDayPlan();
    this.recommendations.productRecommendations = this.generateProductRecommendations();
    this.recommendations.trackingSystem = this.generateTrackingSystem();
    
    return this.recommendations;
  }
  
  // Generate personalized executive summary
  generateExecutiveSummary() {
    const scoreRange = this.getScoreRange(this.sleepScore);
    const challenge = this.primaryChallenge;
    const personaName = this.formatPersonaName(this.persona.primaryPersona);
    
    const summaries = {
      critical: `Your sleep needs immediate attention. With a score of ${this.sleepScore}/100, you're experiencing significant sleep challenges. As a ${personaName}, we'll focus on establishing foundational habits to address your primary challenge: ${this.formatChallengeDescription(challenge)}.`,
      
      needs_work: `You have a solid foundation with specific areas for improvement. Your score of ${this.sleepScore}/100 indicates good sleep habits with room for optimization. As a ${personaName}, we'll target your primary challenge: ${this.formatChallengeDescription(challenge)} to help you achieve excellent sleep.`,
      
      good: `Your sleep is good but can be excellent. With a score of ${this.sleepScore}/100, you're already doing well. As a ${personaName}, we'll fine-tune your routine and address ${this.formatChallengeDescription(challenge)} to help you achieve optimal sleep performance.`,
      
      excellent: `Congratulations! You're already an excellent sleeper with a score of ${this.sleepScore}/100. As a ${personaName}, we'll focus on maintenance and peak performance optimization to ensure you continue enjoying high-quality, restorative sleep.`
    };
    
    return summaries[scoreRange] || summaries.needs_work;
  }
  
  // Generate quick wins for immediate implementation
  generateQuickWins() {
    const quickWins = [];
    const challenge = this.primaryChallenge;
    
    // Universal quick wins (apply to everyone)
    quickWins.push({
      id: 'temperature_optimization',
      title: 'Bedroom Temperature Optimization',
      description: 'Set your bedroom to the ideal temperature for sleep onset and maintenance',
      steps: [
        'Set thermostat to 67°F (19.5°C)',
        'Use breathable, natural fiber bedding',
        'Adjust based on personal comfort',
        'Consider a cooling mattress pad if you sleep hot'
      ],
      timing: 'Overnight, starting tonight',
      expectedImpact: 'Improve sleep efficiency by 15-20%',
      difficulty: 'easy',
      timeRequired: '5 minutes setup',
      science: 'Core body temperature needs to drop for sleep onset. 67°F is optimal for most people.'
    });
    
    // Challenge-specific quick wins
    switch(challenge) {
      case 'falling_asleep':
        quickWins.push({
          id: 'breathing_technique',
          title: '4-7-8 Breathing Technique',
          description: 'Calms the nervous system and reduces sleep latency',
          steps: [
            'Lie in bed with eyes closed',
            'Inhale quietly through nose for 4 seconds',
            'Hold breath for 7 seconds',
            'Exhale completely through mouth for 8 seconds',
            'Repeat 4 times'
          ],
          timing: '10 minutes before bedtime',
          expectedImpact: 'Reduce sleep latency by 40-50%',
          difficulty: 'easy',
          timeRequired: '5 minutes',
          science: 'Activates parasympathetic nervous system, reduces heart rate and blood pressure'
        });
        break;
        
      case 'screen_time':
        quickWins.push({
          id: 'digital_sunset',
          title: 'Digital Sunset Protocol',
          description: 'Eliminates blue light interference with melatonin production',
          steps: [
            '8:30 PM: Enable Night Shift/Blue Light Filter (100%)',
            '8:45 PM: Switch phone to grayscale mode',
            '9:00 PM: Charge phone outside bedroom',
            '9:15 PM: Listen to audiobook or podcast on speaker'
          ],
          timing: '60 minutes before bedtime',
          expectedImpact: 'Improve sleep quality by 25-30%',
          difficulty: 'medium',
          timeRequired: '60 minutes',
          science: 'Blue light suppresses melatonin by up to 50%. Removing screens allows natural melatonin production.'
        });
        break;
        
      case 'caffeine_timing':
        quickWins.push({
          id: 'caffeine_cutoff',
          title: 'Caffeine Cutoff Adjustment',
          description: 'Prevents caffeine from disrupting sleep architecture',
          steps: [
            'Move last caffeine consumption to 2 PM',
            'Switch to decaf or herbal tea after cutoff',
            'Increase water intake in afternoon',
            'Try caffeine alternatives like matcha (lower, sustained caffeine)'
          ],
          timing: '10+ hours before bedtime',
          expectedImpact: 'Reduce nighttime awakenings by 30-40%',
          difficulty: 'medium',
          timeRequired: 'Planning only',
          science: 'Caffeine has 5-6 hour half-life. Late consumption fragments sleep and reduces deep sleep.'
        });
        break;
        
      case 'stress_management':
        quickWins.push({
          id: 'worry_download',
          title: 'Evening Worry Download',
          description: 'Clears mental clutter before bed',
          steps: [
            '8:00 PM: Write down all worries/thoughts',
            'Categorize: Actionable vs. Uncontrollable',
            'Schedule time tomorrow for actionable items',
            'Visualize placing uncontrollable items in a "box" for the night'
          ],
          timing: '60-90 minutes before bedtime',
          expectedImpact: 'Reduce pre-sleep anxiety by 50%',
          difficulty: 'easy',
          timeRequired: '10-15 minutes',
          science: 'Externalizing worries reduces cognitive arousal and rumination.'
        });
        break;
    }
    
    // Persona-specific additional quick wins
    if (this.persona.primaryPersona === 'digital_addict') {
      quickWins.push({
        id: 'phone_bed_distance',
        title: 'Phone-Free Zone',
        description: 'Creates physical boundary between bed and devices',
        steps: [
          'Designate charging station outside bedroom',
          'Use analog alarm clock',
          'Keep phone at least 10 feet from bed',
          'Enable Do Not Disturb during sleep hours'
        ],
        timing: 'Starting tonight',
        expectedImpact: 'Reduce sleep interruptions by 60%',
        difficulty: 'medium',
        timeRequired: '5 minutes setup'
      });
    }
    
    if (this.persona.primaryPersona === 'restless_mind') {
      quickWins.push({
        id: 'body_scan',
        title: 'Progressive Muscle Relaxation',
        description: 'Reduces physical tension that accompanies mental stress',
        steps: [
          'Start at toes: Tense for 5 seconds, release',
          'Move upward: Calves, thighs, abdomen, chest',
          'Continue: Hands, arms, shoulders, neck, face',
          'Focus on sensation of relaxation after release'
        ],
        timing: '15 minutes before bedtime',
        expectedImpact: 'Reduce sleep latency by 35%',
        difficulty: 'easy',
        timeRequired: '10 minutes'
      });
    }
    
    return quickWins;
  }
  
  // Generate personalized sleep schedule based on calculator data
  generateSleepSchedule() {
    if (!this.calculator || !this.calculator.results) {
      return null;
    }
    
    const { mode, targetTime, results } = this.calculator;
    const personalizedSchedule = {
      mode,
      targetTime,
      recommendations: [],
      personalizedTips: []
    };
    
    // Process each sleep option
    results.forEach(result => {
      const recommendation = {
        time: result.time,
        cycles: result.cycles,
        hours: result.hours,
        quality: result.quality,
        useCase: this.getUseCaseForOption(result.quality),
        priority: this.getPriorityForOption(result.quality),
        icon: this.getIconForQuality(result.quality)
      };
      
      personalizedSchedule.recommendations.push(recommendation);
    });
    
    // Add personalized tips based on assessment
    if (this.primaryChallenge === 'falling_asleep') {
      personalizedSchedule.personalizedTips.push({
        tip: 'Set a "bedtime alarm" 30 minutes before your target bedtime to start wind-down routine',
        reason: 'Your assessment shows difficulty with sleep onset. This creates a consistent cue.'
      });
    }
    
    if (this.responses.sleep_consistency === 'inconsistent' || this.responses.sleep_consistency === 'completely_irregular') {
      personalizedSchedule.personalizedTips.push({
        tip: 'Focus on consistent wake time first, even on weekends',
        reason: 'Your schedule consistency needs improvement. Wake time anchors your circadian rhythm.'
      });
    }
    
    if (this.persona.primaryPersona === 'night_owl') {
      personalizedSchedule.personalizedTips.push({
        tip: 'Gradually shift bedtime earlier by 15 minutes every 3 days',
        reason: 'As a night owl, abrupt changes are difficult. Gradual adjustment is more sustainable.'
      });
    }
    
    return personalizedSchedule;
  }
  
  // Generate 7-day protocol based on primary challenge
  generateSevenDayProtocol() {
    const challenge = this.primaryChallenge;
    const persona = this.persona.primaryPersona;
    
    const protocolTemplates = {
      falling_asleep: this.createFallingAsleepProtocol(),
      staying_asleep: this.createStayingAsleepProtocol(),
      screen_time: this.createScreenTimeProtocol(),
      schedule_consistency: this.createConsistencyProtocol(),
      sleep_quality: this.createSleepQualityProtocol(),
      general_optimization: this.createGeneralProtocol()
    };
    
    let protocol = protocolTemplates[challenge] || protocolTemplates.general_optimization;
    
    // Personalize based on persona
    protocol = this.personalizeProtocolForPersona(protocol, persona);
    
    return protocol;
  }
  
  createFallingAsleepProtocol() {
    return [
      {
        days: '1-2',
        theme: 'Wind-Down Foundation',
        focus: 'Establish pre-sleep routine',
        actions: [
          'Digital sunset 60 min before bed',
          '4-7-8 breathing practice (4 cycles)',
          'Cool room to 67°F before bedtime',
          'Dim lights 90 min before bed'
        ],
        successMetrics: [
          'Sleep latency < 25 minutes',
          'Consistent routine start time'
        ],
        tips: [
          'Place a notepad by bed for "worry download"',
          'Try reading fiction (not work-related)'
        ]
      },
      {
        days: '3-4',
        theme: 'Cognitive Relaxation',
        focus: 'Calm racing thoughts',
        actions: [
          'Evening meditation (10 min)',
          'Gratitude journaling (3 things)',
          'Progressive muscle relaxation',
          'Body scan meditation in bed'
        ],
        successMetrics: [
          'Sleep latency < 20 minutes',
          'Reduced pre-sleep anxiety'
        ],
        tips: [
          'If thoughts race, get up and write them down',
          'Try "military method" counting technique'
        ]
      },
      {
        days: '5-7',
        theme: 'Habit Integration',
        focus: 'Combine techniques for consistency',
        actions: [
          'Combine breathing + meditation',
          'Track sleep latency daily',
          'Adjust timing based on results',
          'Celebrate 7-day streak'
        ],
        successMetrics: [
          'Sleep latency < 15 minutes',
          'Routine feels automatic'
        ],
        tips: [
          'Create checklist for consistency',
          'Reward yourself for sticking to routine'
        ]
      }
    ];
  }
  
  createScreenTimeProtocol() {
    return [
      {
        days: '1-2',
        theme: 'Digital Boundaries',
        focus: 'Establish screen-free periods',
        actions: [
          'No screens in bedroom (day or night)',
          'Digital sunset at 8:30 PM',
          'Phone charges outside bedroom',
          'Use analog alarm clock'
        ],
        successMetrics: [
          'Screen time after 8 PM < 30 min',
          'Bedroom is device-free zone'
        ],
        tips: [
          'Enable grayscale mode at 7 PM',
          'Delete most-used social apps temporarily'
        ]
      },
      {
        days: '3-4',
        theme: 'Alternative Activities',
        focus: 'Replace screen time with better options',
        actions: [
          'Evening walk after dinner',
          'Audiobook or podcast listening',
          'Board games or puzzles',
          'Reading physical books'
        ],
        successMetrics: [
          'Found 2+ enjoyable screen alternatives',
          'Evening feels more relaxed'
        ],
        tips: [
          'Join library for free books/audiobooks',
          'Try "screen-free Saturday" challenge'
        ]
      },
      {
        days: '5-7',
        theme: 'Sustainable Integration',
        focus: 'Maintain new habits long-term',
        actions: [
          'Review screen time reports',
          'Set app limits for problem apps',
          'Create "phone-free" family time',
          'Plan weekend screen-free activities'
        ],
        successMetrics: [
          'Screen time reduced by 50%',
          'Habits feel sustainable'
        ],
        tips: [
          'Use Freedom or similar app blockers',
          'Schedule screen time like any other appointment'
        ]
      }
    ];
  }
  
  // Personalize protocol based on persona
  personalizeProtocolForPersona(protocol, persona) {
    const personalizations = {
      digital_addict: (protocol) => {
        protocol.forEach(phase => {
          phase.actions.push('Enable website blockers during wind-down');
          phase.tips.push('Try "digital detox" weekend challenge');
        });
        return protocol;
      },
      
      restless_mind: (protocol) => {
        protocol.forEach(phase => {
          phase.actions.push('Evening worry journal (15 min before bed)');
          phase.tips.push('If anxious, practice "5-4-3-2-1" grounding technique');
        });
        return protocol;
      },
      
      night_owl: (protocol) => {
        protocol.forEach(phase => {
          phase.actions.push('Morning light exposure within 30 min of waking');
          phase.tips.push('Gradual adjustment (15 min earlier every 3 days)');
        });
        return protocol;
      },
      
      parent: (protocol) => {
        protocol.forEach(phase => {
          phase.actions.push('Nap when baby naps (20-30 min max)');
          phase.tips.push('Tag-team with partner for sleep shifts');
          // Adjust success metrics for parenting reality
          phase.successMetrics = phase.successMetrics.map(metric => 
            metric.replace('< 15 minutes', '< 30 minutes')
          );
        });
        return protocol;
      }
    };
    
    return personalizations[persona] ? personalizations[persona](protocol) : protocol;
  }
  
  // Generate 30-day improvement plan
  generateThirtyDayPlan() {
    const scoreRange = this.getScoreRange(this.sleepScore);
    const challenge = this.primaryChallenge;
    
    const planTemplates = {
      critical: this.createCritical30DayPlan(),
      needs_work: this.createNeedsWork30DayPlan(),
      good: this.createGood30DayPlan(),
      excellent: this.createExcellent30DayPlan()
    };
    
    let plan = planTemplates[scoreRange] || planTemplates.needs_work;
    
    // Add challenge-specific weekly focus
    plan = this.addChallengeFocusToPlan(plan, challenge);
    
    return plan;
  }
  
  createNeedsWork30DayPlan() {
    return {
      week1: {
        theme: 'Foundation Building',
        focus: 'Establish consistent sleep-wake schedule',
        dailyHabits: [
          'Wake at same time (±30 min)',
          'Morning sunlight 15 min',
          'Digital sunset 60 min before bed',
          'Bedtime within 1 hour of target'
        ],
        successMetrics: [
          'Schedule consistency ±45 min',
          'Screen time after 8 PM < 45 min',
          'Complete 5+ daily habits'
        ],
        reward: 'Blue light blocking glasses',
        rewardReason: 'Supports digital sunset habit',
        difficulty: 'medium'
      },
      week2: {
        theme: 'Environment Optimization',
        focus: 'Create ideal sleep sanctuary',
        dailyHabits: [
          'Bedroom temperature 67°F',
          'Complete darkness (blackout/mask)',
          'White noise if needed',
          'Comfortable bedding check'
        ],
        successMetrics: [
          'Sleep environment rating 8/10+',
          'Sleep efficiency > 80%',
          'Morning energy 3/5+'
        ],
        reward: 'Sleep meditation app subscription',
        rewardReason: 'Enhances wind-down routine',
        difficulty: 'easy'
      },
      week3: {
        theme: 'Routine Refinement',
        focus: 'Master pre-sleep wind-down',
        dailyHabits: [
