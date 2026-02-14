# Interactive Sleep Assessment - Technical Specification

## Overview
Standalone interactive assessment module that can be integrated with ScoreApp, Involve.me, or embedded directly into sleepsmarter.io.

## Core Functionality

### 1. Assessment Engine
- **Input:** User responses to sleep-related questions
- **Processing:** Scoring algorithm with weighted factors
- **Output:** Personalized sleep health score (0-100) + recommendations

### 2. Question Logic
- **Progressive Disclosure:** Show relevant follow-up questions based on responses
- **Branching Logic:** Different question paths for different sleep challenges
- **Conditional Scoring:** Weight questions based on severity indicators

### 3. Recommendation System
- **Tiered Recommendations:** Quick wins → 7-day protocol → Long-term optimization
- **Personalized Content:** Recommendations tailored to specific sleep issues
- **Actionable Steps:** Concrete, time-bound actions

## Technical Architecture

### Data Model

```javascript
// User Response Object
{
  userId: "uuid",
  sessionId: "session-uuid",
  responses: [
    {
      questionId: "q1",
      questionText: "What time do you typically wake up?",
      answer: "6:00-7:00 AM",
      timestamp: "2026-02-13T08:00:00Z",
      metadata: {
        category: "sleep_patterns",
        weight: 1.2,
        followUp: ["q2", "q3"]
      }
    }
  ],
  scores: {
    overall: 68,
    categories: {
      sleep_patterns: 75,
      sleep_quality: 60,
      lifestyle: 70,
      environment: 65
    }
  },
  recommendations: {
    quickWins: [...],
    sevenDayProtocol: [...],
    longTerm: [...]
  }
}
```

### Scoring Algorithm

```javascript
// Weighted scoring by category
const calculateScore = (responses) => {
  const weights = {
    sleep_patterns: 0.35,    // Most important
    sleep_quality: 0.30,     // Very important
    lifestyle: 0.20,         // Important
    environment: 0.15        // Somewhat important
  };
  
  let totalScore = 0;
  
  responses.forEach(response => {
    const category = response.metadata.category;
    const answerScore = calculateAnswerScore(response.answer);
    totalScore += answerScore * weights[category];
  });
  
  return Math.min(100, Math.max(0, totalScore));
};

// Answer scoring based on optimal ranges
const calculateAnswerScore = (answer) => {
  const scoringMap = {
    // Q1: Wake time
    "5:00-6:00 AM": 90,  // Optimal for circadian rhythm
    "6:00-7:00 AM": 85,  // Good
    "7:00-8:00 AM": 70,  // Average
    "8:00 AM+": 50,      // Suboptimal
    
    // Q2: Bedtime
    "9:00-10:00 PM": 95, // Optimal
    "10:00-11:00 PM": 85,
    "11:00 PM-12:00 AM": 70,
    "After midnight": 40,
    
    // ... etc for all questions
  };
  
  return scoringMap[answer] || 50;
};
```

## Integration Options

### Option A: ScoreApp Implementation

#### Setup Steps:
1. **Create Assessment:**
   - Use ScoreApp's questionnaire builder
   - Configure scoring logic in ScoreApp settings
   - Set up conditional branching

2. **Configure Lead Capture:**
   - Email collection at end of assessment
   - Integration with Kit/ConvertKit
   - Tagging based on sleep score

3. **PDF Delivery:**
   - Use ScoreApp's PDF generation
   - Dynamic fields from assessment responses
   - Email automation for delivery

4. **Embedding:**
   ```html
   <!-- ScoreApp embed code -->
   <div id="scoreapp-assessment" data-assessment-id="sleep-blueprint"></div>
   <script src="https://scoreapp.com/embed.js" async></script>
   ```

#### ScoreApp Features Used:
- ✅ Questionnaire builder with scoring
- ✅ Conditional logic
- ✅ PDF generation
- ✅ Email integration
- ✅ Analytics dashboard
- ✅ Mobile responsive

### Option B: Involve.me Implementation

#### Setup Steps:
1. **Create Interactive Content:**
   - Use Involve.me's drag-and-drop builder
   - Set up multi-step assessment
   - Configure scoring and calculations

2. **Personalization Logic:**
   - Create variables for user responses
   - Set up conditional content blocks
   - Configure recommendation engine

3. **Integration:**
   - Connect to email service
   - Set up webhooks for data capture
   - Configure payment gateways for upsells

4. **Embedding:**
   ```html
   <!-- Involve.me embed code -->
   <iframe 
     src="https://involve.me/sleepsmarter/assessment" 
     width="100%" 
     height="600"
     frameborder="0">
   </iframe>
   ```

#### Involve.me Features Used:
- ✅ Interactive content builder
- ✅ Calculations and scoring
- ✅ Conditional logic
- ✅ Payment integration
- ✅ Email automation
- ✅ A/B testing

### Option C: Custom React Component

#### Component Structure:
```typescript
// Assessment.tsx
interface AssessmentProps {
  onComplete: (results: AssessmentResults) => void;
  onProgress: (progress: number) => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onComplete, onProgress }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [progress, setProgress] = useState(0);
  
  // Question data
  const questions = [
    {
      id: "q1",
      text: "What time do you typically wake up?",
      type: "multiple-choice",
      options: [...],
      category: "sleep_patterns",
      weight: 1.2
    },
    // ... more questions
  ];
  
  const handleAnswer = (answer: string) => {
    const newResponses = [...responses, {
      questionId: questions[currentQuestion].id,
      answer,
      timestamp: new Date().toISOString()
    }];
    
    setResponses(newResponses);
    
    // Calculate next question based on branching logic
    const nextQuestion = calculateNextQuestion(currentQuestion, answer);
    setCurrentQuestion(nextQuestion);
    
    // Update progress
    const newProgress = Math.round((nextQuestion / questions.length) * 100);
    setProgress(newProgress);
    onProgress(newProgress);
    
    // If complete, calculate results
    if (nextQuestion >= questions.length) {
      const results = calculateResults(newResponses);
      onComplete(results);
    }
  };
  
  return (
    <div className="assessment-container">
      <ProgressBar progress={progress} />
      <Question 
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
    </div>
  );
};
```

#### Integration with Existing Stack:
1. **Add to SleepCalculator:**
   ```typescript
   // In SleepCalculator.tsx
   <Assessment 
     onComplete={(results) => {
       // Store results for PDF generation
       setAssessmentResults(results);
       // Show email capture with assessment data
       setShowEmailCapture(true);
     }}
     onProgress={(progress) => {
       // Update UI with progress
       setAssessmentProgress(progress);
     }}
   />
   ```

2. **Extend PDF Generator:**
   - Add assessment data to PDF template
   - Include personalized recommendations
   - Generate based on combined calculator + assessment data

3. **Update Email Integration:**
   - Send assessment results to Kit
   - Include in PDF generation webhook
   - Personalize email content based on score

## Question Bank (20 Questions)

### Category 1: Sleep Patterns (5 questions)
1. Wake time consistency
2. Bedtime consistency  
3. Sleep duration
4. Sleep latency (time to fall asleep)
5. Nighttime awakenings

### Category 2: Sleep Quality (5 questions)
6. Morning refreshment
7. Daytime sleepiness
8. Sleep satisfaction
9. Dream recall
10. Sleep continuity

### Category 3: Lifestyle Factors (5 questions)
11. Caffeine consumption
12. Alcohol consumption
13. Exercise timing
14. Meal timing
15. Stress levels

### Category 4: Sleep Environment (5 questions)
16. Bedroom temperature
17. Light exposure
18. Noise levels
19. Bed comfort
20. Electronic devices

## Recommendation Templates

### Quick Wins (Tonight):
```javascript
const quickWins = {
  "screen_usage_high": {
    title: "Implement Digital Sunset",
    description: "Based on your screen usage, stop using screens 60 minutes before bed.",
    action: "Set a reminder for [calculated_time] to put away devices.",
    science: "Blue light suppresses melatonin production by up to 50%."
  },
  "caffeine_late": {
    title: "Adjust Caffeine Cutoff",
    description: "Move your last caffeine to 2 PM instead of [current_time].",
    action: "Switch to decaf or herbal tea after 2 PM starting tomorrow.",
    science: "Caffeine has a 6-hour half-life and can disrupt sleep architecture."
  },
  // ... more quick wins
};
```

### 7-Day Protocol:
```javascript
const sevenDayProtocol = {
  day1: {
    focus: "Anchor Wake Time",
    action: "Set alarm for [optimal_wake_time] every day this week.",
    explanation: "Consistent wake times regulate your circadian rhythm.",
    tip: "Get sunlight within 30 minutes of waking."
  },
  day2: {
    focus: "Light Optimization",
    action: "10 minutes of morning sunlight + dim lights 2 hours before bed.",
    explanation: "Light is the primary regulator of your sleep-wake cycle.",
    tip: "Use blue light blocking glasses in the evening."
  },
  // ... days 3-7
};
```

## Analytics & Tracking

### Events to Track:
```javascript
const analyticsEvents = {
  ASSESSMENT_STARTED: "assessment_started",
  QUESTION_ANSWERED: "question_answered",
  ASSESSMENT_COMPLETED: "assessment_completed",
  SCORE_CALCULATED: "score_calculated",
  RECOMMENDATIONS_VIEWED: "recommendations_viewed",
  PDF_REQUESTED: "pdf_requested",
  PDF_DOWNLOADED: "pdf_downloaded"
};
```

### Metrics to Monitor:
1. **Completion Rate:** Started vs. completed assessments
2. **Average Score:** Distribution of sleep health scores
3. **Common Issues:** Most frequent sleep challenges
4. **Recommendation Engagement:** Which suggestions are most viewed
5. **Conversion Funnel:** Assessment → Email → PDF download

## A/B Testing Framework

### Test Variables:
1. **Question Order:** Different sequencing of questions
2. **Progress Indicators:** Different progress bar designs
3. **Scoring Display:** Different ways to show sleep score
4. **Recommendation Format:** Different presentation styles
5. **CTA Placement:** Different call-to-action positions

### Implementation:
```javascript
// A/B test configuration
const abTests = {
  questionOrder: {
    variantA: ["q1", "q2", "q3", "q4", "q5"], // Logical flow
    variantB: ["q5", "q1", "q3", "q2", "q4"], // Engagement-focused
    metric: "completion_rate"
  },
  scoringDisplay: {
    variantA: "numerical_score", // "68/100"
    variantB: "category_scores", // Breakdown by category
    variantC: "visual_meter", // Progress bar visualization
    metric: "time_on_page"
  }
};
```

## Performance Requirements

### Load Time:
- **Initial Load:** < 2 seconds
- **Question Transition:** < 200ms
- **Score Calculation:** < 100ms
- **PDF Generation:** < 5 seconds

### Concurrent Users:
- **Expected:** 100 concurrent assessments
- **Peak:** 500 concurrent assessments
- **Scaling:** Horizontal scaling for PDF generation

### Data Storage:
- **Response Storage:** 1KB per assessment
- **PDF Storage:** 500KB per PDF
- **Retention:** 90 days minimum
- **Backup:** Daily backups

## Security Considerations

### Data Protection:
- **PII Handling:** Email addresses stored encrypted
- **Response Anonymization:** Aggregate data for analytics
- **GDPR Compliance:** Cookie consent, data deletion requests
- **CCPA Compliance:** California consumer privacy rights

### Access Control:
- **API Authentication:** JWT tokens for API access
- **Rate Limiting:** Prevent abuse of PDF generation
- **Input Validation:** Sanitize all user inputs
- **XSS Prevention:** Content security policies

## Deployment Checklist

### Pre-Deployment:
- [ ] Complete question bank
- [ ] Implement scoring algorithm
- [ ] Create recommendation templates
- [ ] Design UI/UX mockups
- [ ] Set up analytics tracking
- [ ] Configure A/B tests

### Development:
- [ ] Build assessment component
- [ ] Implement branching logic
- [ ] Integrate with PDF generator
- [ ] Set up email automation
- [ ] Add error handling
- [ ] Implement caching

### Testing:
- [ ] Unit tests for scoring algorithm
- [ ] Integration tests with PDF generator
- [ ] Load testing for concurrent users
- [ ] Cross-browser compatibility
- [ ] Mobile responsiveness
- [ ] Accessibility testing

### Launch:
- [ ] Deploy to staging environment
- [ ] Test complete user journey
- [ ] Monitor performance metrics
- [ ] Gather user feedback
- [ ] Deploy to production
- [ ] Monitor error rates

## Maintenance Plan

### Daily:
- Monitor error logs
- Check PDF generation success rate
- Review completion metrics

### Weekly:
- Analyze A/B test results
- Review user feedback
- Update recommendation templates
- Backup assessment data

### Monthly:
- Update question bank based on trends
- Optimize scoring algorithm
- Review security measures
- Update dependencies

## Success Criteria

### Quantitative:
- **Completion Rate:** > 70% of started assessments
- **Average Score:** Baseline established within first month
- **PDF Download Rate:** > 60% of completed assessments
- **Email Open Rate:** > 40% for blueprint delivery
- **Upsell Conversion:** > 5% to $17 offer

### Qualitative:
- User feedback on assessment relevance
- Perceived value of recommendations
- Ease of use and engagement
- Willingness to share with others

## Next Steps

### Immediate (Week 1):
1. Choose implementation platform (ScoreApp vs Involve.me vs Custom)
2. Finalize question bank and scoring logic
3. Create UI/UX design mockups
4. Set up development environment

### Short-term (Week 2-3):
5. Build assessment interface
6. Implement scoring engine
7. Integrate with existing PDF generator
8. Set up email automation

### Medium-term (Week 4-6):
9. Launch MVP to small audience
10. Gather feedback and metrics
11. Implement A/B testing
12. Optimize based on data

### Long-term (Month 2+):
13. Expand question bank
14. Add advanced features (sleep tracking integration)
15. Scale infrastructure
16. Explore monetization pathways

---
**Status:** Specification Complete
**Priority:** High - Complements existing PDF generator
**Estimated Development Time:** 2-4 weeks depending on platform choice