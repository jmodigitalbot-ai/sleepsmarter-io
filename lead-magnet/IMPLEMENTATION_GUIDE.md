# Personalized Sleep Blueprint - Implementation Guide

## Overview
This guide provides step-by-step instructions for implementing the complete Personalized Sleep Blueprint lead magnet system, including:
1. Assessment quiz integration
2. PDF generation with personalization
3. Email sequence automation
4. Tracking and optimization

## 1. Assessment Quiz Integration

### Frontend Implementation

#### Step 1: Add Assessment Component to Calculator
```javascript
// In SleepCalculator.tsx
import { SleepAssessment } from '../components/SleepAssessment';

// After calculator results, show assessment
{showResults && (
  <div className="mt-8">
    <SleepAssessment 
      onComplete={handleAssessmentComplete}
      calculatorData={{
        mode,
        targetTime,
        results: sleepOptions
      }}
    />
  </div>
)}
```

#### Step 2: Create Assessment Component
Create `SleepAssessment.tsx` with:
- 10-question assessment (from assessment-questions.js)
- Progress tracking
- Real-time scoring
- Results display

#### Step 3: Update Email Capture
```javascript
// Enhanced email capture with assessment data
const handleEmailSubmit = (email, firstName) => {
  const assessmentData = {
    sleepScore: calculatedScore,
    categoryScores,
    primaryChallenge,
    persona,
    responses: assessmentResponses
  };
  
  // Submit to Kit with hidden fields
  kitForm.submit({
    email,
    firstName,
    // Hidden fields
    sleep_score: calculatedScore,
    primary_challenge: primaryChallenge,
    sleep_persona: persona.primaryPersona,
    calculator_data: JSON.stringify(calculatorData),
    assessment_data: JSON.stringify(assessmentData)
  });
};
```

### Backend Implementation

#### Step 1: Update PDF Generator
Update `/lead-magnet/pdf-generator/index.js` to:
1. Accept assessment data in request
2. Use recommendation engine
3. Generate personalized PDF content

#### Step 2: Create Recommendation Engine
Add `recommendation-engine.js` to PDF generator with:
- Personalized content generation
- Challenge-specific recommendations
- Persona-based customization

#### Step 3: Update Webhook Handler
Update `webhook-handler.js` to:
1. Parse assessment data from Kit webhook
2. Call PDF generator with full data
3. Trigger email sequence

## 2. PDF Generation System

### Current System Enhancement

#### Step 1: Enhance PDF Content Generation
Update the `generatePDFContent` function in `index.js`:

```javascript
function generatePDFContent(doc, data) {
  const { assessmentData, calculatorData } = data;
  
  // Initialize recommendation engine
  const engine = new SleepBlueprintRecommendationEngine(
    assessmentData,
    calculatorData,
    { firstName: data.firstName, email: data.email }
  );
  
  const recommendations = engine.generateAllRecommendations();
  
  // Generate personalized PDF sections
  generateCoverPage(doc, data, recommendations);
  generateExecutiveSummary(doc, recommendations);
  generateQuickWins(doc, recommendations);
  generateSleepSchedule(doc, recommendations);
  generateSevenDayProtocol(doc, recommendations);
  generateThirtyDayPlan(doc, recommendations);
  generateProductRecommendations(doc, recommendations);
  generateTrackingSystem(doc, recommendations);
}
```

#### Step 2: Create PDF Template Functions
Create modular functions for each PDF section:
- `generateCoverPage.js`
- `generateQuickWins.js`
- `generateProtocol.js`
- etc.

#### Step 3: Add Personalization Tokens
Implement token replacement system:
```javascript
function personalizeContent(template, data) {
  const tokens = {
    '{{firstName}}': data.firstName,
    '{{persona}}': data.persona,
    '{{primaryChallenge}}': formatChallenge(data.primaryChallenge),
    '{{sleepScore}}': data.sleepScore,
    // ... more tokens
  };
  
  let content = template;
  Object.entries(tokens).forEach(([token, value]) => {
    content = content.replace(new RegExp(token, 'g'), value);
  });
  
  return content;
}
```

## 3. Email Sequence Implementation

### Kit Configuration

#### Step 1: Create Email Sequence
In Kit dashboard:
1. Create new sequence: "Sleep Blueprint 30-Day"
2. Add 7 emails with delays:
   - Email 1: Immediate
   - Email 2: 1 day
   - Email 3: 3 days
   - Email 4: 7 days
   - Email 5: 14 days (conditional)
   - Email 6: 21 days
   - Email 7: 30 days

#### Step 2: Configure Triggers
Set up automation rules:
- Email 1: Trigger on form submission
- Email 2-7: Time-based delays
- Conditional emails: Based on tags/engagement

#### Step 3: Add Personalization Fields
Update Kit form to include hidden fields:
- `sleep_score`
- `primary_challenge`
- `sleep_persona`
- `calculator_data`
- `assessment_data`

### Email Template Setup

#### Step 1: Create Email Templates
Use templates from `email-sequence-templates.js`:

```javascript
// Example: Email 1 template in Kit
const email1Template = {
  subject: "Your Personalized Sleep Blueprint is Ready, {{ subscriber.first_name }}!",
  body: `
Hi {{ subscriber.first_name }},

Congratulations on taking the first step toward better sleep!

Based on your assessment as a {{ subscriber.tags.sleep_persona }}, we've created your personalized Sleep Blueprint.

Your primary challenge is {{ subscriber.custom_fields.primary_challenge }} - we've designed specific solutions for this.

[Download Your Blueprint]({{ blueprint_download_url }})

Sleep well tonight,
The Sleep Smarter Team
  `
};
```

#### Step 2: Implement Dynamic Content
Use Kit's merge tags and conditional content:

```liquid
{% if subscriber.custom_fields.sleep_score > 80 %}
  Congratulations! You're already an excellent sleeper.
{% elsif subscriber.custom_fields.sleep_score > 60 %}
  You have a solid foundation with room for optimization.
{% else %}
  Let's work on establishing foundational sleep habits.
{% endif %}
```

#### Step 3: Set Up Tracking
Add UTM parameters and tracking pixels:
- `utm_source=email`
- `utm_medium=email`
- `utm_campaign=sleep_blueprint`
- `utm_content=email_{{email_number}}`

## 4. Integration Testing

### Test 1: End-to-End Flow
```bash
# 1. Start services
cd pdf-generator
npm start

cd ../webhook-handler
npm start

# 2. Test PDF generation
curl -X POST http://localhost:3001/generate-blueprint \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "email": "test@example.com",
    "calculatorData": {
      "mode": "wakeup",
      "targetTime": "07:00",
      "results": [...]
    },
    "assessmentData": {
      "sleepScore": 68,
      "primaryChallenge": "falling_asleep",
      "persona": "digital_addict",
      "responses": {...}
    }
  }'
```

### Test 2: Webhook Integration
```bash
# Simulate Kit webhook
curl -X POST http://localhost:3002/webhook/kit \
  -H "Content-Type: application/json" \
  -H "X-Kit-Signature: test" \
  -d '{
    "event": "subscriber.created",
    "subscriber": {
      "email": "test@example.com",
      "first_name": "Test",
      "custom_fields": {
        "sleep_score": "68",
        "primary_challenge": "falling_asleep",
        "sleep_persona": "digital_addict"
      }
    }
  }'
```

### Test 3: Email Sequence
1. Submit test form on calculator
2. Verify webhook fires
3. Check PDF generation
4. Verify email 1 sends
5. Monitor subsequent emails

## 5. Deployment Checklist

### Backend Services
- [ ] PDF Generator deployed (Railway/Vercel)
- [ ] Webhook Handler deployed
- [ ] Environment variables configured
- [ ] Health checks passing
- [ ] Logging set up

### Frontend Integration
- [ ] Assessment component added to calculator
- [ ] Email capture updated with hidden fields
- [ ] Form submission tested
- [ ] Error handling implemented

### Kit Configuration
- [ ] Form updated with hidden fields
- [ ] Webhook configured
- [ ] Email sequence created
- [ ] Merge tags tested
- [ ] Automation rules set

### Testing
- [ ] End-to-end flow tested
- [ ] PDF generation tested
- [ ] Email delivery tested
- [ ] Personalization verified
- [ ] Mobile responsiveness checked

## 6. Monitoring & Optimization

### Key Metrics to Track
1. **Conversion Metrics:**
   - Calculator completion rate
   - Assessment completion rate
   - Email capture conversion rate
   - PDF download rate

2. **Engagement Metrics:**
   - Email open rates
   - Email click-through rates
   - PDF open/read time
   - Protocol start/completion rates

3. **Performance Metrics:**
   - PDF generation time
   - Email delivery time
   - Error rates
   - User satisfaction (surveys)

### Optimization Opportunities

#### A/B Testing Ideas:
1. **Assessment Length:** 8 vs 10 questions
2. **Email Timing:** Morning vs evening sends
3. **Subject Lines:** Personalization level
4. **CTA Placement:** Single vs multiple CTAs
5. **PDF Format:** Text-heavy vs visual

#### Personalization Improvements:
1. **Dynamic Content:** Based on engagement level
2. **Challenge Progression:** Adjust based on progress
3. **Seasonal Adjustments:** Summer vs winter recommendations
4. **Life Events:** Travel, stress periods, holidays

## 7. Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: PDF Not Generating
**Symptoms:** Webhook fires but no PDF created
**Solutions:**
1. Check PDF generator logs
2. Verify file permissions
3. Check disk space
4. Validate input data format

#### Issue 2: Emails Not Sending
**Symptoms:** PDF generated but no email received
**Solutions:**
1. Check Kit webhook configuration
2. Verify email sequence triggers
3. Check spam folder
4. Test with different email address

#### Issue 3: Personalization Not Working
**Symptoms:** Generic content in PDF/emails
**Solutions:**
1. Verify hidden field data in Kit
2. Check merge tag syntax
3. Validate assessment data format
4. Test with complete assessment

#### Issue 4: Performance Issues
**Symptoms:** Slow PDF generation or email delays
**Solutions:**
1. Optimize PDF generation code
2. Implement caching
3. Use CDN for PDF downloads
4. Queue long-running tasks

### Debug Commands
```bash
# Check service status
curl http://localhost:3001/health
curl http://localhost:3002/health

# Check logs
tail -f pdf-generator/logs/app.log
tail -f webhook-handler/logs/app.log

# Test specific components
node test-assessment-scoring.js
node test-recommendation-engine.js
node test-pdf-generation.js
```

## 8. Success Measurement

### Phase 1: Launch (Week 1-2)
- **Goal:** System operational, basic testing complete
- **Success Criteria:**
  - PDF generation works for all personas
  - Email sequence delivers correctly
  - No critical bugs reported
  - User feedback collected

### Phase 2: Optimization (Week 3-4)
- **Goal:** Improve conversion and engagement
- **Success Criteria:**
  - Email open rate > 40%
  - PDF download rate > 70%
  - Assessment completion rate > 80%
  - Positive user feedback

### Phase 3: Scale (Month 2+)
- **Goal:** Integrate with broader funnel
- **Success Criteria:**
  - Increased email list growth
  - Higher conversion to paid offers
  - Reduced unsubscribe rate
  - Positive ROI on development

## 9. Next Steps After Implementation

### Short-term (Next 30 days):
1. Monitor daily metrics
2. Collect user feedback
3. Fix any reported issues
4. Begin A/B testing

### Medium-term (Next 90 days):
1. Analyze engagement patterns
2. Optimize based on data
3. Expand personalization
4. Integrate with other offers

### Long-term (Next 6 months):
1. Add advanced features
2. Expand to other niches
3. Build community features
4. Develop premium version

## 10. Support & Maintenance

### Regular Maintenance Tasks:
- **Weekly:** Check error logs, review metrics
- **Monthly:** Update content, optimize based on data
- **Quarterly:** Full system review, update dependencies

### Support Channels:
1. **Technical Issues:** GitHub repository issues
2. **User Support:** Email support@sleepsmarter.io
3. **Feature Requests:** Community feedback forum
4. **Emergency:** On-call rotation for critical issues

### Documentation Updates:
- Keep this guide updated with changes
- Document new features and configurations
- Maintain troubleshooting knowledge base
- Update deployment procedures

---

**Implementation Status:** [ ] Planning | [ ] In Progress | [x] Complete  
**Last Updated:** 2026-02-19  
**Version:** 1.0  
**Next Review:** 2026-03-19