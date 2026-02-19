// Sleep Assessment Questions and Scoring Logic
// For Personalized Sleep Blueprint Lead Magnet

export const sleepAssessmentQuestions = [
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
        description: 'No consistent pattern, varies wildly'
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
        description: 'Above average, may indicate high sleep need'
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
        description: 'Significant sleep onset insomnia'
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
        description: 'Very late caffeine disrupting sleep architecture'
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
        label: 'I don\'t exercise regularly',
        score: 1,
        description: 'Lack of exercise may affect sleep quality'
      }
    ]
  }
];

// Category definitions
export const assessmentCategories = {
  sleep_patterns: {
    name: 'Sleep Patterns',
    description: 'Consistency and duration of your sleep schedule',
    maxScore: 6, // 2 questions × 3 points each
    weight: 0.25
  },
  sleep_quality: {
    name: 'Sleep Quality',
    description: 'How well you sleep and feel upon waking',
    maxScore: 9, // 3 questions × 3 points each
    weight: 0.30
  },
  lifestyle: {
    name: 'Lifestyle',
    description: 'Daily habits affecting sleep',
    maxScore: 9, // 3 questions × 3 points each
    weight: 0.25
  },
  environment: {
    name: 'Environment',
    description: 'Sleep setting and physical factors',
    maxScore: 6, // 2 questions × 3 points each
    weight: 0.20
  }
};

// Scoring and calculation functions
export function calculateAssessmentScore(responses) {
  const categoryScores = {};
  const categoryMaxScores = {};
  
  // Initialize scores
  Object.keys(assessmentCategories).forEach(category => {
    categoryScores[category] = 0;
    categoryMaxScores[category] = 0;
  });
  
  // Calculate scores for each response
  responses.forEach(response => {
    const question = sleepAssessmentQuestions.find(q => q.id === response.questionId);
    if (!question) return;
    
    const option = question.options.find(opt => opt.value === response.answer);
    if (!option) return;
    
    categoryScores[question.category] += option.score;
    categoryMaxScores[question.category] += 3; // Max score per question
  });
  
  // Calculate percentage scores
  const categoryPercentages = {};
  Object.keys(categoryScores).forEach(category => {
    const maxScore = categoryMaxScores[category];
    categoryPercentages[category] = maxScore > 0 ? (categoryScores[category] / maxScore) * 100 : 0;
  });
  
  // Calculate overall sleep score (weighted average)
  let totalWeightedScore = 0;
  let totalWeight = 0;
  
  Object.keys(categoryPercentages).forEach(category => {
    const weight = assessmentCategories[category].weight;
    totalWeightedScore += categoryPercentages[category] * weight;
    totalWeight += weight;
  });
  
  const overallSleepScore = Math.round(totalWeightedScore / totalWeight);
  
  return {
    overallSleepScore,
    categoryScores: categoryPercentages,
    rawCategoryScores: categoryScores,
    categoryMaxScores
  };
}

// Persona detection logic
export function detectSleepPersona(responses, categoryScores) {
  const responseMap = {};
  responses.forEach(response => {
    responseMap[response.questionId] = response.answer;
  });
  
  // Check for specific patterns
  const patterns = [];
  
  // Digital Addict pattern
  if (responseMap.screen_time === 'every_night' || responseMap.screen_time === 'frequently') {
    patterns.push({
      persona: 'digital_addict',
      confidence: responseMap.screen_time === 'every_night' ? 0.9 : 0.7,
      description: 'High screen time before bed disrupting sleep'
    });
  }
  
  // Restless Mind pattern
  if (responseMap.stress_levels === 'high' || responseMap.stress_levels === 'very_high') {
    patterns.push({
      persona: 'restless_mind',
      confidence: responseMap.stress_levels === 'very_high' ? 0.9 : 0.7,
      description: 'Evening stress and anxiety affecting sleep'
    });
  }
  
  // Night Owl pattern
  if (responseMap.sleep_consistency === 'inconsistent' || responseMap.sleep_consistency === 'completely_irregular') {
    if (responseMap.morning_refreshment === 'tired_functional' || responseMap.morning_refreshment === 'exhausted_groggy') {
      patterns.push({
        persona: 'night_owl',
        confidence: 0.8,
        description: 'Late schedule with morning grogginess'
      });
    }
  }
  
  // Early Bird pattern
  if (responseMap.sleep_consistency === 'very_consistent' && categoryScores.sleep_patterns > 80) {
    if (responseMap.morning_refreshment === 'very_refreshed' || responseMap.morning_refreshment === 'somewhat_refreshed') {
      patterns.push({
        persona: 'early_bird',
        confidence: 0.7,
        description: 'Consistent early schedule with good morning energy'
      });
    }
  }
  
  // Parent pattern
  if (responseMap.nighttime_awakenings === '3_4_times' || responseMap.nighttime_awakenings === '5_plus_times') {
    if (responseMap.sleep_duration === 'less_than_6' || responseMap.sleep_duration === '6_7_hours') {
      patterns.push({
        persona: 'parent',
        confidence: 0.8,
        description: 'Frequent awakenings with short sleep duration'
      });
    }
  }
  
  // Perfectionist pattern
  if (responseMap.stress_levels === 'high' || responseMap.stress_levels === 'very_high') {
    if (responseMap.sleep_latency === '20_30_minutes' || responseMap.sleep_latency === '30_plus_minutes') {
      patterns.push({
        persona: 'perfectionist',
        confidence: 0.8,
        description: 'High stress combined with difficulty falling asleep'
      });
    }
  }
  
  // Healthy Sleeper pattern
  if (categoryScores.overallSleepScore > 80) {
    patterns.push({
      persona: 'healthy_sleeper',
      confidence: 0.9,
      description: 'Strong sleep habits across all categories'
    });
  }
  
  // If no specific patterns detected, use score-based classification
  if (patterns.length === 0) {
    if (categoryScores.overallSleepScore > 80) {
      return {
        primaryPersona: 'healthy_sleeper',
        confidence: 0.7,
        description: 'Good sleep habits with room for optimization'
      };
    } else if (categoryScores.overallSleepScore > 60) {
      return {
        primaryPersona: 'general_optimizer',
        confidence: 0.6,
        description: 'Moderate sleep habits needing targeted improvement'
      };
    } else {
      return {
        primaryPersona: 'foundation_builder',
        confidence: 0.8,
        description: 'Needs to establish basic sleep habits first'
      };
    }
  }
  
  // Sort by confidence and return top persona
  patterns.sort((a, b) => b.confidence - a.confidence);
  
  return {
    primaryPersona: patterns[0].persona,
    confidence: patterns[0].confidence,
    description: patterns[0].description,
    secondaryPersonas: patterns.slice(1, 3).map(p => ({
      persona: p.persona,
      confidence: p.confidence
    }))
  };
}

// Primary challenge identification
export function identifyPrimaryChallenge(responses, categoryScores) {
  const challenges = [];
  
  // Check each category for low scores
  if (categoryScores.sleep_patterns < 50) {
    challenges.push({
      type: 'schedule_consistency',
      severity: 'high',
      priority: 1,
      description: 'Inconsistent sleep schedule disrupting circadian rhythm'
    });
  }
  
  if (categoryScores.sleep_quality < 50) {
    challenges.push({
      type: 'sleep_quality',
      severity: 'high',
      priority: 1,
      description: 'Poor sleep efficiency and restoration'
    });
  }
  
  // Check specific response patterns
  const responseMap = {};
  responses.forEach(response => {
    responseMap[response.questionId] = response.answer;
  });
  
  if (responseMap.sleep_latency === '30_plus