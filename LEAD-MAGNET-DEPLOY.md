# Lead Magnet Deployment Plan
## Sleep Blueprint PDF Generator for sleepsmarter.io

## Current State Assessment

### ✅ What's Built:
1. **PDF Generator Server** (`/funnel/lead-magnet/generator/`)
   - Puppeteer + Handlebars PDF generation
   - Express server with webhook endpoints
   - Template HTML/CSS for blueprint design
   - Test suite and sample data

2. **Updated EmailCapture Component** (`/funnel/lead-magnet/EmailCapture-updated.tsx`)
   - Enhanced to pass calculator data to Kit
   - Updated success message for blueprint delivery
   - Error handling and loading states

3. **Documentation Complete:**
   - Integration guide
   - Deployment checklist
   - Design specifications
   - Template files

### ⚠️ What's Missing:
1. **Server Deployment** - Generator not deployed to production
2. **Kit Webhook Configuration** - Not set up in Kit dashboard
3. **Frontend Integration** - Updated EmailCapture not in production app
4. **Email Automation** - Kit automation not configured for blueprint delivery
5. **Monitoring & Logging** - Not implemented

## Deployment Requirements

### 1. Server Deployment (Backend)
**Location:** `/Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/funnel/lead-magnet/generator/`

**Options:**
- **Vercel** (Recommended for Node.js, free tier available)
- **Railway** (Good for background jobs)
- **Render** (Simple deployment)
- **DigitalOcean/AWS** (More control, more setup)

**Steps:**
```bash
cd /Users/jmodigital/clawd/projects/utility-website-portfolio/sleepsmarter.io/funnel/lead-magnet/generator
npm install
# Deploy to chosen platform
```

**Environment Variables Needed:**
```env
PORT=3001
NODE_ENV=production
BASE_URL=https://your-deployed-service.com
# Optional for enhanced security:
KIT_API_KEY=your_kit_api_key
WEBHOOK_SECRET=your_webhook_secret
```

### 2. Frontend Updates
**File to Update:** `/app/src/components/EmailCapture.tsx`

**Changes Needed:**
1. Replace current EmailCapture.tsx with updated version from `/funnel/lead-magnet/EmailCapture-updated.tsx`
2. Update SleepCalculator.tsx to pass calculator data to EmailCapture

**SleepCalculator.tsx Update:**
```tsx
// In SleepCalculator.tsx, replace:
<EmailCapture />

// With:
<EmailCapture 
  calculatorData={{
    mode,
    targetTime: time,
    results,
    optimalTime: results.find(r => r.quality === 'optimal')?.time || '',
    preferredCycles: 6
  }} 
/>
```

### 3. Kit Configuration
**Form ID:** `9066532` (existing form)

**Steps in Kit Dashboard:**
1. Go to Forms → Form #9066532
2. Settings → Webhooks → Add Webhook
3. Configure:
   - URL: `https://your-deployed-service.com/webhook/kit`
   - Events: "Subscriber created"
   - Method: POST
   - Content Type: JSON

**Email Automation Setup:**
1. Create automation triggered by form submission
2. Delay: 2 minutes (allow PDF generation time)
3. Email content should include download link: `{{webhook_response.downloadUrl}}`
4. Subject: "Your Personalized Sleep Blueprint"
5. From: Sleep Smarter <hello@sleepsmarter.io>

### 4. Testing Flow
**Complete User Journey:**
1. User visits sleepsmarter.io
2. Uses sleep calculator
3. Gets results with 3 options
4. Submits email via updated EmailCapture
5. Kit receives data with hidden fields
6. Kit webhook triggers PDF generation
7. PDF generated and stored
8. Email sent with download link (2 min delay)
9. User downloads blueprint

## Step-by-Step Deployment Plan

### Phase 1: Local Testing (Day 1)
**Backend:**
```bash
cd generator
npm install
node test.js  # Test PDF generation
node server.js  # Start local server
# Test endpoints:
curl http://localhost:3001/health
curl http://localhost:3001/test
```

**Frontend:**
1. Backup current EmailCapture.tsx
2. Copy updated EmailCapture.tsx to app
3. Update SleepCalculator.tsx to pass data
4. Test locally with calculator

### Phase 2: Staging Deployment (Day 2)
**Server Deployment:**
1. Deploy generator to staging environment
2. Set environment variables
3. Test endpoints on staging URL

**Kit Staging Setup:**
1. Create test form in Kit
2. Configure webhook to staging URL
3. Test complete flow

**Frontend Staging:**
1. Deploy updated frontend to staging
2. Test complete user journey

### Phase 3: Production Deployment (Day 3)
**Server Production:**
1. Deploy to production environment
2. Configure production environment variables
3. Set up monitoring/alerting

**Kit Production:**
1. Update production form (#9066532) webhook
2. Configure email automation with 2-minute delay
3. Test with real submission

**Frontend Production:**
1. Merge updated EmailCapture component
2. Deploy to production
3. Monitor for errors

### Phase 4: Monitoring & Optimization (Day 4-7)
1. Set up error tracking (Sentry, etc.)
2. Monitor PDF generation success rate
3. Track email delivery and download rates
4. Optimize performance as needed

## Critical Code Changes

### 1. EmailCapture.tsx Update
**Current:**
```tsx
// Simple email-only submission
body: JSON.stringify({
  email_address: email
})
```

**Updated:**
```tsx
// Include calculator data
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
```

### 2. Success Message Update
**Current:**
```tsx
<h3 className="text-lg font-semibold text-green-400 mb-2">
  Check your inbox!
</h3>
```

**Updated:**
```tsx
<h3 className="text-lg font-semibold text-green-400 mb-2">
  Your Blueprint is on the way!
</h3>
<p className="text-[#f1faee]/70 text-sm">
  Check your email in 2-3 minutes for your custom sleep schedule 
  and 7-day optimization protocol.
</p>
```

## Technical Considerations

### 1. PDF Generation Performance
- **Expected time:** < 5 seconds per PDF
- **Concurrency:** Handle multiple requests simultaneously
- **Memory:** Puppeteer can be memory-intensive
- **Solution:** Implement queue system if volume increases

### 2. File Storage
- **Location:** `generated/` directory in server
- **Backup:** Regular backups needed
- **Cleanup:** Consider automatic cleanup of old files
- **CDN:** Optional for faster downloads

### 3. Webhook Reliability
- **Retry logic:** Implement in server
- **Verification:** Add webhook signature verification
- **Logging:** Log all webhook events
- **Monitoring:** Track success/failure rates

### 4. Email Deliverability
- **Delay:** 2 minutes allows PDF generation
- **Spam:** Ensure emails don't go to spam
- **Tracking:** Monitor open/click/download rates
- **Fallback:** Provide alternative download method

## Rollback Plan

### If PDF generation fails:
1. Disable webhook in Kit dashboard
2. Revert to original EmailCapture component
3. Update success message to remove blueprint mention
4. Investigate and fix generator
5. Re-enable when fixed

### If server crashes:
1. Redirect traffic to backup server
2. Send maintenance notification
3. Fix primary server
4. Restore from backups if needed
5. Resume service

### If email delivery fails:
1. Check Kit automation status
2. Verify email service
3. Test with alternative email
4. Update email template if needed
5. Monitor deliverability

## Success Metrics

### Technical Metrics:
- ✅ PDF generation success rate > 95%
- ✅ Average generation time < 5 seconds
- ✅ Server uptime > 99.5%
- ✅ Webhook success rate > 98%

### Business Metrics:
- 📈 Email capture conversion rate increase
- 📈 PDF download rate > 60%
- 📈 Email open rate > 40%
- 📈 Newsletter subscription growth
- 📈 Positive user feedback

## Timeline

### Day 1 (Today):
- [ ] Complete local testing
- [ ] Fix any issues found
- [ ] Prepare deployment packages

### Day 2 (Tomorrow AM):
- [ ] Deploy server to staging
- [ ] Configure Kit staging webhook
- [ ] Deploy frontend to staging
- [ ] Test complete flow

### Day 2 (Tomorrow PM):
- [ ] Deploy server to production
- [ ] Configure Kit production webhook
- [ ] Deploy frontend to production
- [ ] Monitor initial traffic

### Day 3-7:
- [ ] Monitor performance
- [ ] Optimize as needed
- [ ] Review metrics
- [ ] Make adjustments

## Required Resources

### 1. Development:
- Access to sleepsmarter.io codebase
- Access to Kit dashboard
- Deployment platform credentials

### 2. Testing:
- Test email addresses
- Browser testing tools
- Performance monitoring tools

### 3. Monitoring:
- Error tracking service (Sentry)
- Server monitoring (hosting provider)
- Email analytics (Kit)

## Risk Assessment

### High Risk:
- **PDF generation fails under load** - Implement queue system
- **Webhooks lost/delayed** - Add retry logic and logging
- **Email deliverability issues** - Monitor and adjust

### Medium Risk:
- **User experience disruption** - Have rollback plan ready
- **Performance issues** - Monitor and optimize
- **Data loss** - Implement regular backups

### Low Risk:
- **Minor UI issues** - Quick fixes possible
- **Template rendering issues** - Test thoroughly

## Contact Information

### Technical Support:
- **Backend:** Server logs, error tracking
- **Frontend:** Browser console, user reports
- **Kit:** Support dashboard, documentation
- **Email:** Service provider logs

### Escalation Path:
1. Check logs and documentation
2. Contact development team
3. Contact hosting provider
4. Contact Kit support
5. Contact email service provider

## Notes

### Dependencies:
- Kit form #9066532 must remain active
- Calculator data structure must remain consistent
- Email service must be reliable
- Server must have sufficient resources

### Assumptions:
- Users will wait 2-3 minutes for email
- PDF files will be downloaded, not viewed inline
- Kit webhooks are reliable
- Email deliverability is good

### Next Steps:
1. Begin local testing immediately
2. Choose deployment platform
3. Schedule deployment window
4. Communicate changes to team

---
**Last Updated:** 2026-02-10  
**Status:** Ready for Deployment  
**Priority:** High (Need live by tomorrow)