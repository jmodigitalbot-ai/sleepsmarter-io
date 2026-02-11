# Sleep Blueprint Integration Guide

## Overview
This document explains how to integrate the Personalized Sleep Blueprint PDF generation system with the existing sleepsmarter.io email capture flow.

## Current Flow
1. User uses sleep calculator
2. Gets results with 3 sleep options
3. Sees email capture form (Kit form #9066532)
4. Submits email → Kit receives subscription
5. User sees success message

## Enhanced Flow with Blueprint
1. User uses sleep calculator
2. Gets results with 3 sleep options
3. Sees email capture form with hidden fields
4. Submits email + calculator data → Kit receives data
5. Kit webhook triggers PDF generation
6. PDF generated and stored
7. Email sent with download link
8. User sees success message with "check email"

## Required Changes

### 1. Update EmailCapture Component
Add hidden fields to capture calculator data:

```tsx
// In EmailCapture.tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  if (!email) return

  setStatus('loading')
  setErrorMessage('')

  // Get calculator data from parent or context
  const calculatorData = {
    mode: 'wakeup' | 'bedtime', // from SleepCalculator
    targetTime: '07:00', // from SleepCalculator
    results: [...], // array of sleep options from SleepCalculator
    optimalTime: '9:30 PM', // best option
    preferredCycles: 6 // user preference if available
  }

  try {
    const response = await fetch(KIT_FORM_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        email_address: email,
        fields: {
          calculator_mode: calculatorData.mode,
          target_time: calculatorData.targetTime,
          results_json: JSON.stringify(calculatorData.results),
          optimal_time: calculatorData.optimalTime,
          cycles_preferred: calculatorData.preferredCycles
        }
      })
    })

    if (response.ok) {
      setStatus('success')
      setEmail('')
    } else {
      throw new Error('Subscription failed')
    }
  } catch {
    setStatus('error')
    setErrorMessage('Something went wrong. Please try again.')
  }
}
```

### 2. Pass Calculator Data to EmailCapture
Update SleepCalculator.tsx to pass data:

```tsx
// In SleepCalculator.tsx
<EmailCapture 
  calculatorData={{
    mode,
    targetTime: time,
    results,
    optimalTime: results.find(r => r.quality === 'optimal')?.time || '',
    preferredCycles: 6 // or user selection
  }} 
/>
```

### 3. Kit Webhook Configuration

#### Step 1: Deploy PDF Generator
Deploy the generator server to a hosting service (Vercel, Railway, Render, etc.):

```bash
cd /Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/funnel/lead-magnet/generator
npm install
npm start
```

#### Step 2: Configure Kit Webhook
In Kit dashboard (app.kit.com):
1. Go to Forms → Form #9066532
2. Navigate to Settings → Webhooks
3. Add new webhook:
   - URL: `https://your-deployed-service.com/webhook/kit`
   - Events: "Subscriber created"
   - Method: POST
   - Content Type: JSON

#### Step 3: Test Webhook
Use the test endpoint to verify:
```
GET https://your-deployed-service.com/test
```

### 4. Email Template Updates

#### Update Success Message in EmailCapture:
```tsx
if (status === 'success') {
  return (
    <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
      <span className="text-3xl mb-3 block">📋</span>
      <h3 className="text-lg font-semibold text-green-400 mb-2">
        Your Blueprint is on the way!
      </h3>
      <p className="text-[#f1faee]/70 text-sm mb-3">
        We're generating your Personalized Sleep Blueprint based on your results.
      </p>
      <p className="text-[#f1faee]/70 text-sm">
        Check your email in 2-3 minutes for your custom sleep schedule 
        and 7-day optimization protocol.
      </p>
    </div>
  )
}
```

#### Kit Email Automation:
Create an automation in Kit:
1. Trigger: Form submission
2. Action: Send email
3. Delay: 2 minutes (allow time for PDF generation)
4. Content: Include download link: `{{webhook_response.downloadUrl}}`

### 5. Environment Variables

Create `.env` file in generator directory:
```env
PORT=3001
NODE_ENV=production
KIT_API_KEY=your_kit_api_key
WEBHOOK_SECRET=your_webhook_secret
BASE_URL=https://your-deployed-service.com
```

### 6. Security Considerations

#### Webhook Verification:
```javascript
// In server.js, add webhook verification
const verifyKitWebhook = (req, res, next) => {
  const signature = req.headers['x-kit-signature'];
  const payload = JSON.stringify(req.body);
  
  // Verify signature using Kit's webhook secret
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');
    
  if (signature !== expectedSignature) {
    return res.status(401).json({ error: 'Invalid signature' });
  }
  
  next();
};

app.post('/webhook/kit', verifyKitWebhook, async (req, res) => {
  // ... existing webhook logic
});
```

#### Rate Limiting:
Add rate limiting to prevent abuse:
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/generate', limiter);
app.use('/webhook/kit', limiter);
```

### 7. Monitoring & Logging

#### Add logging middleware:
```javascript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});
```

#### Error tracking:
```javascript
// Log errors to file or service
const fs = require('fs');
const errorLogStream = fs.createWriteStream('errors.log', { flags: 'a' });

process.on('uncaughtException', (error) => {
  errorLogStream.write(`${new Date().toISOString()} ${error.stack}\n`);
});
```

### 8. Backup & Recovery

#### Database schema for tracking:
```sql
CREATE TABLE blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  calculator_mode VARCHAR(20) NOT NULL,
  target_time VARCHAR(10) NOT NULL,
  results_json TEXT NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  downloaded_at TIMESTAMP,
  download_count INTEGER DEFAULT 0
);
```

#### Regular backups:
```bash
# Backup generated PDFs
tar -czf blueprints-backup-$(date +%Y%m%d).tar.gz generated/

# Backup database
pg_dump sleep_blueprints > sleep-blueprints-$(date +%Y%m%d).sql
```

## Testing Checklist

### Frontend Tests:
- [ ] Calculator data correctly passed to EmailCapture
- [ ] Hidden fields included in Kit submission
- [ ] Success message updated
- [ ] Error handling intact

### Backend Tests:
- [ ] PDF generator server running
- [ ] Test endpoint works
- [ ] Webhook endpoint accepts data
- [ ] PDFs generated correctly
- [ ] Files served correctly

### Integration Tests:
- [ ] Kit webhook configured
- [ ] Webhook verification working
- [ ] Email automation configured
- [ ] Download links in emails

### Performance Tests:
- [ ] PDF generation < 5 seconds
- [ ] Concurrent generation handling
- [ ] File storage capacity
- [ ] Memory usage

## Deployment Steps

1. **Development Environment:**
   ```bash
   cd generator
   npm install
   npm run dev
   ```

2. **Production Deployment:**
   ```bash
   # Build and deploy to your hosting service
   git push production main
   ```

3. **Configuration:**
   - Set environment variables
   - Configure domain/SSL
   - Set up monitoring

4. **Go Live:**
   - Update Kit webhook URL
   - Update frontend with new EmailCapture
   - Monitor logs for issues
   - Test complete flow

## Troubleshooting

### Common Issues:

1. **PDF not generating:**
   - Check Puppeteer installation
   - Verify template file exists
   - Check write permissions

2. **Webhook not firing:**
   - Verify Kit webhook configuration
   - Check server logs
   - Test with curl: `curl -X POST https://your-service.com/webhook/kit`

3. **Email not sending:**
   - Check Kit automation
   - Verify download URL in email
   - Test email deliverability

4. **Performance issues:**
   - Implement caching
   - Add queue system for PDF generation
   - Optimize template rendering

### Support Contacts:
- Backend issues: Check server logs
- Frontend issues: Browser console
- Kit integration: Kit support
- Email issues: Email service provider

## Maintenance

### Regular Tasks:
- Monitor disk space for PDF storage
- Update dependencies monthly
- Backup database weekly
- Review error logs daily

### Scaling Considerations:
- Use CDN for PDF serving
- Implement job queue for generation
- Add caching layer
- Consider serverless architecture

## Success Metrics

Track these metrics to measure success:

1. **Conversion Rate:** Email submissions / Calculator uses
2. **PDF Generation Rate:** PDFs generated / Email submissions
3. **Download Rate:** PDF downloads / PDFs generated
4. **Engagement:** Email open rates, click-through rates
5. **Retention:** Repeat visitors, newsletter subscriptions

## Future Enhancements

1. **A/B Testing:** Different template designs
2. **Personalization:** More detailed user profiles
3. **Analytics:** Track blueprint usage patterns
4. **Mobile App:** Native PDF viewer
5. **Social Sharing:** Share blueprint on social media