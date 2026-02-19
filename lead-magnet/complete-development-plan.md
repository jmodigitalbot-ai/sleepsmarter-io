# Personalized Sleep Blueprint - Complete Development Plan

## Overview
This document outlines the complete development plan for the Personalized Sleep Blueprint lead magnet, addressing all four components requested:
1. Quiz flow and questions
2. Results interpretation framework  
3. Personalized content generation logic
4. Email capture and follow-up sequence

## 1. Quiz Flow and Questions

### Assessment Structure
**Total Questions:** 8-10 (optimized for completion rate)
**Time to Complete:** 2-3 minutes
**Flow:** Calculator → Results → Assessment → Email Capture → PDF Delivery

### Question Categories & Logic

#### Category 1: Sleep Patterns (2 questions)
**Q1: Sleep Consistency**
```
How consistent is your sleep schedule?
○ Very consistent (±30 minutes) 
○ Somewhat consistent (±1 hour)
○ Inconsistent (varies by 2+ hours)
○ Completely irregular
```

**Q2: Sleep Duration**
```
On average, how many hours do you sleep per night?
○ Less than 6 hours
○ 6-7 hours  
○ 7-8 hours
○ 8+ hours
```

#### Category 2: Sleep Quality (3 questions)
**Q3: Sleep Latency**
```
How long does it typically take you to fall asleep?
○ Less than 10 minutes
○ 10-20 minutes
○ 20-30 minutes
○ 30+ minutes
```

**Q4: Nighttime Awakenings**
```
How often do you wake up during the night?
○ Rarely or never
○ 1-2 times
○ 3-4 times
○ 5+ times
```

**Q5: Morning Refreshment**
```
How refreshed do you feel when you wake up?
○ Very refreshed and energetic
○ Somewhat refreshed
○ Tired but functional
○ Exhausted and groggy
```

#### Category 3: Lifestyle Factors (3 questions)
**Q6: Screen Time Before Bed**
```
How often do you use screens (phone, TV, computer) within 1 hour of bedtime?
○ Rarely or never
○ Occasionally (1-3 times/week)
○ Frequently (4-6 times/week)
○ Every night
```

**Q7: Caffeine Timing**
```
When do you typically have your last caffeinated drink?
○ Before 2 PM
○ 2-4 PM
○ 4-6 PM
○ After 6 PM
```

**Q8: Stress Levels**
```
How would you describe your stress levels in the evening?
○ Very low (rarely stressed)
○ Moderate (some stress)
○ High (frequently stressed)
○ Very high (constant stress)
```

#### Category 4: Environment (2 questions)
**Q9: Bedroom Environment**
```
How would you rate your sleep environment?
○ Excellent (dark, quiet, cool, comfortable)
○ Good (mostly conducive to sleep)
○ Fair (some issues)
○ Poor (many distractions/discomforts)
```

**Q10: Exercise Timing**
```
When do you typically exercise?
○ Morning (before noon)
○ Afternoon (12-5 PM)
○ Evening (5-9 PM)
○ Night (after 9 PM)
○ I don't exercise regularly
```

### Scoring System
- Each question: 0-3 points (0 = worst, 3 = best)
- Category scores: Sum of question points in category
- Overall Sleep Score: Average of category scores × 10 (0-100 scale)

### Persona Detection Logic
Based on response patterns, users are classified into one of 8 sleep personas:

1. **The Digital Addict** (High screen time, poor sleep latency)
2. **The Restless Mind** (High stress, frequent awakenings)  
3. **The Night Owl** (Late bedtime, morning grogginess)
4. **The Early Bird** (Early bedtime, inconsistent schedule)
5. **The Shift Worker** (Irregular schedule, poor consistency)
6. **The Parent** (Frequent awakenings, short sleep duration)
7. **The Perfectionist** (High stress, difficulty falling asleep)
8. **The Healthy Sleeper** (Good scores across categories)

## 2. Results Interpretation Framework

### Score Interpretation Matrix

#### Overall Sleep Score Ranges:
- **0-40 (Critical):** Significant sleep issues requiring immediate attention
- **41-60 (Needs Work):** Multiple areas for improvement
- **61-80 (Good):** Solid foundation with room for optimization  
- **81-100 (Excellent):** Well-established sleep habits

#### Category Score Analysis:
**Sleep Patterns (0-30):**
- <15: Inconsistent schedule disrupting circadian rhythm
- 15-22: Moderate consistency, room for improvement
- 23-30: Strong sleep-wake consistency

**Sleep Quality (0-30):**
- <15: Poor sleep efficiency and restoration
- 15-22: Adequate but not optimal sleep quality
- 23-30: High-quality, restorative sleep

**Lifestyle (0-30):**
- <15: Lifestyle factors significantly impairing sleep
- 15-22: Some lifestyle optimization needed
- 23-30: Sleep-supportive lifestyle habits

**Environment (0-30):**
- <15: Environment not conducive to quality sleep
- 15-22: Environment could be optimized
- 23-30: Excellent sleep environment

### Challenge Identification Algorithm

```javascript
function identifyPrimaryChallenge(assessment) {
  const challenges = [];
  
  // Check each category for low scores
  if (assessment.categoryScores.sleepPatterns < 18) {
    challenges.push({
      type: 'schedule_consistency',
      severity: 'high',
      priority: 1
    });
  }
  
  if (assessment.categoryScores.sleepQuality < 18) {
    challenges.push({
      type: 'sleep_efficiency',
      severity: 'high', 
      priority: 1
    });
  }
  
  if (assessment.responses.sleepLatency === '30+ minutes') {
    challenges.push({
      type: 'falling_asleep',
      severity: 'high',
      priority: 2
    });
  }
  
  if (assessment.responses.nighttimeAwakenings === '3-4 times' || 
      assessment.responses.nighttimeAwakenings === '5+ times') {
    challenges.push({
      type: 'staying_asleep',
      severity: 'medium',
      priority: 3
    });
  }
  
  if (assessment.responses.screenTime === 'Every night') {
    challenges.push({
      type: 'screen_time',
      severity: 'high',
      priority: 1
    });
  }
  
  if (assessment.responses.caffeineTiming === 'After 6 PM') {
    challenges.push({
      type: 'caffeine_timing',
      severity: 'medium',
      priority: 2
    });
  }
  
  // Sort by priority and severity
  challenges.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    if (a.severity === 'high' && b.severity !== 'high') return -1;
    if (b.severity === 'high' && a.severity !== 'high') return 1;
    return 0;
  });
  
  return challenges[0]?.type || 'general_optimization';
}
```

### Improvement Potential Calculation

```javascript
function calculateImprovementPotential(assessment) {
  const maxPossibleScore = 100;
  const currentScore = assessment.sleepScore;
  
  // Calculate theoretical maximum based on responses
  let theoreticalMax = maxPossibleScore;
  
  // Adjust based on constraints (e.g., shift work, parenting)
  if (assessment.responses.sleepConsistency === 'Completely irregular') {
    theoreticalMax -= 15; // Limited by schedule constraints
  }
  
  if (assessment.persona === 'The Parent') {
    theoreticalMax -= 10; // Limited by parenting responsibilities
  }
  
  // Calculate improvement potential
  const improvementPoints = theoreticalMax - currentScore;
  const improvementPercentage = (improvementPoints / theoreticalMax) * 100;
  
  return {
    points: Math.round(improvementPoints),
    percentage: Math.round(improvementPercentage),
    achievableScore: Math.round(theoreticalMax),
    timeframe: this.estimateTimeframe(improvementPoints)
  };
}
```

## 3. Personalized Content Generation Logic

### Recommendation Engine Architecture

```javascript
class SleepBlueprintRecommendationEngine {
  constructor(assessment, calculatorData) {
    this.assessment = assessment;
    this.calculatorData = calculatorData;
    this.primaryChallenge = this.identifyPrimaryChallenge();
    this.persona = this.detectPersona();
  }
  
  generateAllRecommendations() {
    return {
      executiveSummary: this.generateExecutiveSummary(),
      quickWins: this.generateQuickWins(),
      sleepSchedule: this.generateSleepSchedule(),
      sevenDayProtocol: this.generateSevenDayProtocol(),
      thirtyDayPlan: this.generateThirtyDayPlan(),
      productRecommendations: this.generateProductRecommendations(),
      trackingSystem: this.generateTrackingSystem()
    };
  }
  
  generateExecutiveSummary() {
    const score = this.assessment.sleepScore;
    const challenge = this.primaryChallenge;
    const persona = this.persona;
    
    const summaries = {
      critical: `Your sleep needs immediate attention. Based on your ${persona} profile, we'll focus on foundational habits first.`,
      needs_work: `You have solid sleep habits with specific areas for improvement. As a ${persona}, we'll optimize ${this.getChallengeDescription(challenge)}.`,
      good: `Your sleep is good but can be excellent. We'll fine-tune your routine for optimal performance.`,
      excellent: `You're already a great sleeper! Let's optimize for peak performance and maintenance.`
    };
    
    const scoreRange = this.getScoreRange(score);
    return summaries[scoreRange];
  }
  
  generateQuickWins() {
    const wins = [];
    const challenge = this.primaryChallenge;
    
    // Challenge-specific quick wins
    switch(challenge) {
      case 'falling_asleep':
        wins.push({
          title: '4-7-8 Breathing Technique',
          description: 'Reduces sleep latency by calming the nervous system',
          steps: ['Inhale 4 seconds', 'Hold 7 seconds', 'Exhale 8 seconds', 'Repeat 4 times'],
          timing: '10 minutes before bed',
          expectedImpact: 'Reduce sleep latency by 40%'
        });
        break;
        
      case 'screen_time':
        wins.push({
          title: 'Digital Sunset Protocol',
          description: 'Eliminates blue light interference with melatonin production',
          steps: ['Enable Night Shift at 8:30 PM', 'Switch to audiobook/podcast', 'Charge phone outside bedroom'],
          timing: '60 minutes before bed',
          expectedImpact: 'Improve sleep quality by 25%'
        });
        break;
        
      case 'caffeine_timing':
        wins.push({
          title: 'Caffeine Cutoff Adjustment',
          description: 'Prevents caffeine from disrupting sleep architecture',
          steps: ['Move last caffeine to 2 PM', 'Switch to decaf after cutoff', 'Increase water intake'],
          timing: '10+ hours before bedtime',
          expectedImpact: 'Reduce nighttime awakenings by 30%'
        });
        break;
    }
    
    // Universal quick wins
    wins.push({
      title: 'Bedroom Temperature Optimization',
      description: 'Ideal temperature for sleep onset and maintenance',
      steps: ['Set thermostat to 67°F', 'Use breathable bedding', 'Adjust based on comfort'],
      timing: 'Overnight',
      expectedImpact: 'Improve sleep efficiency by 15%'
    });
    
    return wins;
  }
  
  generateSleepSchedule() {
    const { calculatorData } = this;
    const { mode, targetTime, results } = calculatorData;
    
    return {
      mode,
      targetTime,
      recommendations: results.map(result => ({
        time: result.time,
        cycles: result.cycles,
        hours: result.hours,
        quality: result.quality,
        useCase: this.getUseCaseForOption(result.quality),
        priority: this.getPriorityForOption(result.quality)
      })),
      personalizedTip: this.getScheduleTip()
    };
  }
  
  generateSevenDayProtocol() {
    const challenge = this.primaryChallenge;
    
    const protocols = {
      falling_asleep: this.createFallingAsleepProtocol(),
      staying_asleep: this.createStayingAsleepProtocol(),
      screen_time: this.createScreenTimeProtocol(),
      schedule_consistency: this.createConsistencyProtocol(),
      general_optimization: this.createGeneralProtocol()
    };
    
    return protocols[challenge] || protocols.general_optimization;
  }
  
  createFallingAsleepProtocol() {
    return [
      {
        day: '1-2',
        focus: 'Wind-Down Routine',
        actions: [
          'Digital sunset 60 min before bed',
          '4-7-8 breathing practice',
          'Cool room to 67°F'
        ],
        successMetric: 'Sleep latency < 20 minutes'
      },
      {
        day: '3-4',
        focus: 'Cognitive Relaxation',
        actions: [
          'Evening meditation',
          'Gratitude journaling',
          'Progressive muscle relaxation'
        ],
        successMetric: 'Sleep latency < 15 minutes'
      },
      {
        day: '5-7',
        focus: 'Habit Integration',
        actions: [
          'Combine techniques',
          'Track progress',
          'Adjust as needed'
        ],
        successMetric: 'Consistent sleep onset'
      }
    ];
  }
  
  generateThirtyDayPlan() {
    return {
      week1: {
        theme: 'Foundation',
        goals: ['Consistent sleep schedule', 'Digital boundaries', 'Optimal environment'],
        metrics: ['Schedule consistency ±30 min', 'Screen time after 8 PM < 30 min'],
        reward: 'Blue light blocking glasses'
      },
      week2: {
        theme: 'Optimization',
        goals: ['Sleep quality improvement', 'Stress management', 'Routine refinement'],
        metrics: ['Sleep latency < 15 min', 'Morning energy 4/5+'],
        reward: 'Sleep meditation app subscription'
      },
      week3: {
        theme: 'Integration',
        goals: ['Habit automation', 'Progress tracking', 'Fine-tuning'],
        metrics: ['Protocol adherence > 80%', 'Sleep efficiency > 85%'],
        reward: 'White noise machine'
      },
      week4: {
        theme: 'Maintenance',
        goals: ['Long-term sustainability', 'Troubleshooting skills', 'Self-regulation'],
        metrics: ['Independent habit maintenance', 'Consistent improvement'],
        reward: 'Sleep tracking device'
      }
    };
  }
  
  generateProductRecommendations() {
    const challenge = this.primaryChallenge;
    const persona = this.persona;
    
    const products = {
      falling_asleep: [
        {
          name: 'Weighted Blanket',
          description: 'Deep pressure stimulation for anxiety reduction',
          relevance: 'High for restless mind persona',
          amazonLink: 'https://www.amazon.com/dp/B08XYZ123?tag=19830c0a-20',
          expectedImpact: 'Reduce sleep latency by 35%'
        },
        {
          name: 'Magnesium Glycinate',
          description: 'Muscle relaxation and nervous system calm',
          relevance: 'Medium for all personas',
          amazonLink: 'https://www.amazon.com/dp/B09ABC456?tag=19830c0a-20',
          expectedImpact: 'Improve sleep quality by 20%'
        }
      ],
      screen_time: [
        {
          name: 'Blue Light Blocking Glasses',
          description: 'Blocks melatonin-disrupting blue light',
          relevance: 'Critical for digital addict persona',
          amazonLink: 'https://www.amazon.com/dp/B07DEF789?tag=19830c0a-20',
          expectedImpact: 'Improve sleep onset by 25%'
        },
        {
          name: 'Analog Alarm Clock',
          description: 'Removes phone from bedtime equation',
          relevance: 'High for all screen-heavy users',
          amazonLink: 'https://www.amazon.com/dp/B06GHI123?tag=19830c0a-20',
          expectedImpact: 'Reduce pre-sleep stimulation by 40%'
        }
      ]
    };
    
    return products[challenge] || [];
  }
  
  generateTrackingSystem() {
    return {
      metrics: [
        {
          name: 'Sleep Latency',
          target: '< 15 minutes',
          trackingMethod: 'Manual timing or sleep tracker',
          importance: 'High'
        },
        {
          name: 'Sleep Efficiency',
          target: '> 85%',
          trackingMethod: '(Time asleep / Time in bed) × 100',
          importance: 'High'
        },
        {
          name: 'Morning Energy',
          target: '4-5/5 scale',
          trackingMethod: 'Daily self-rating',
          importance: 'Medium'
        },
        {
          name: 'Protocol Adherence',
          target: '> 80%',
          trackingMethod: 'Daily checklist completion',
          importance: 'Medium'
        }
      ],
      tools: [
        'Sleep diary template (provided)',
        'Phone screen time reports',
        'Weekly self-assessment survey',
        'Progress tracking spreadsheet'
      ],
      checkpoints: [
        'Day 3: Quick adjustment',
        'Week 1: Protocol review',
        'Week 2: Progress assessment',
        'Month 1: Comprehensive evaluation'
      ]
    };
  }
}
```

### PDF Template Personalization Rules

```javascript
const pdfPersonalizationRules = {
  // Based on sleep score
  scoreBased: {
    critical: {
      tone: 'urgent but supportive',
      focus: 'foundational habits',
      complexity: 'simple, step-by-step',
      visualStyle: 'clear, high-contrast'
    },
    needs_work: {
      tone: 'educational, encouraging',
      focus: 'specific improvements',
      complexity: 'moderate detail',
      visualStyle: 'informative, structured'
    },
    good: {
      tone: 'optimizing, refining',
      focus: 'fine-tuning',
      complexity: 'detailed, advanced',
      visualStyle: 'sophisticated