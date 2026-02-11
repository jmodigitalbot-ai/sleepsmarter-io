# Personalized Sleep Blueprint - Design Document

## Overview
A premium, personalized PDF lead magnet that users receive after submitting their email via the sleep calculator. The blueprint provides personalized sleep recommendations based on their calculator inputs.

## Calculator Inputs Available
1. **Mode**: `wakeup` or `bedtime`
2. **Target Time**: The time they entered (e.g., "07:00 AM")
3. **Results Array**: 3 sleep options with:
   - Time (formatted)
   - Cycles (4, 5, or 6)
   - Hours (6, 7.5, or 9)
   - Quality rating (optimal/good/minimum)

## Blueprint Content Structure

### 1. Cover Page
- "Your Personalized Sleep Blueprint"
- User's name (from email if available) or "Sleep Smarter User"
- Date generated
- Sleep Smarter logo
- Premium design elements

### 2. Executive Summary
- Personalized greeting
- Brief explanation of their sleep pattern based on inputs
- Key recommendation (which option to choose)

### 3. Your Custom Sleep Schedule
- Visual timeline showing their 3 sleep options
- Color-coded by quality (green/blue/yellow)
- Clear recommendation of which to use when

### 4. Sleep Cycle Science
- Simple explanation of 90-minute sleep cycles
- Why waking between cycles matters
- How their specific cycles work

### 5. 7-Day Sleep Optimization Protocol
**Daily actionable steps to improve sleep quality:**

**Day 1-2: Foundation**
- Digital sunset 1 hour before bed
- Consistent wake time
- Morning sunlight exposure

**Day 3-4: Environment**
- Ideal bedroom temperature (65-68°F)
- Complete darkness setup
- White noise/earplugs if needed

**Day 5-6: Routine**
- Pre-sleep wind-down ritual
- Caffeine cutoff time
- Evening hydration strategy

**Day 7: Integration**
- Review progress
- Adjust as needed
- Long-term maintenance plan

### 6. Troubleshooting Guide
- What to do if you miss your bedtime
- How to recover from poor sleep
- When to use "minimum" vs "optimal" cycles

### 7. Premium Resources
- Recommended sleep tracking apps
- Best sleep books/podcasts
- Sleep-friendly product recommendations (affiliate links)
- Sleep Smarter premium offer (future upsell)

### 8. About Sleep Smarter
- Mission statement
- Contact information
- Social media links

## Personalization Logic

### Based on Mode:
- **Wakeup Mode**: "Based on your need to wake at [TIME], here are your ideal bedtimes..."
- **Bedtime Mode**: "Based on your bedtime of [TIME], here are your ideal wake times..."

### Based on Quality Ratings:
- **Optimal (6 cycles)**: "Congratulations! You're aiming for optimal sleep. Stick with the green options for best results."
- **Good (5 cycles)**: "You're in the good range. The blue options work well for most schedules."
- **Minimum (4 cycles)**: "These are minimum viable options. Use yellow only when absolutely necessary."

### Based on Time:
- **Morning person** (wake before 7 AM): "Early riser tips"
- **Night owl** (bed after 11 PM): "Night owl optimization"
- **Shift worker**: Special considerations section

## PDF Generation Requirements

### Technical Stack:
- **Backend**: Node.js with Express
- **PDF Generation**: PDFKit or Puppeteer
- **Template Engine**: HTML/CSS with dynamic data injection
- **Storage**: Local filesystem or cloud storage
- **Email Delivery**: Kit API integration

### Data Flow:
1. User submits email via calculator form
2. Form sends to Kit with hidden fields containing calculator data
3. Webhook triggers PDF generation
4. PDF saved with unique ID
5. Email sent with download link
6. Follow-up sequence begins

### File Structure:
```
lead-magnet/
├── design/           # Design documents
├── templates/        # HTML templates
├── generator/        # PDF generation code
├── integration/      # Kit API integration
└── examples/         # Sample PDFs
```

## Integration with Existing Flow

### Current Flow:
1. User uses calculator
2. Gets results
3. Sees email capture
4. Submits email → Kit form #9066532
5. Gets success message

### Enhanced Flow:
1. User uses calculator
2. Gets results
3. Sees email capture
4. Submits email + calculator data (hidden fields)
5. Kit receives data + triggers webhook
6. PDF generated + email sent
7. User gets success message with "check email for blueprint"

### Hidden Fields to Add:
- `calculator_mode`: wakeup/bedtime
- `target_time`: 07:00
- `results_json`: JSON string of results array
- `optimal_time`: The green option time
- `cycles_preferred`: 4/5/6 based on selection

## Timeline
- **Day 1**: Design approval & template creation
- **Day 2**: PDF generation system
- **Day 3**: Kit integration & testing
- **Day 4**: Deployment & documentation

## Success Metrics
- Email capture conversion rate increase
- Open rate of blueprint email
- Download rate of PDF
- Follow-up sequence engagement
- Reduced unsubscribe rate