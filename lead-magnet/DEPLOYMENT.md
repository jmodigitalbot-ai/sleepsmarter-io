# Personalized Sleep Blueprint - Deployment Guide

## What We've Built

### 1. Frontend Components (React)
- **SleepAssessment.tsx** - Dynamic assessment questionnaire (7 questions)
- **Updated SleepCalculator.tsx** - Integrated assessment flow
- **Updated EmailCapture.tsx** - Enhanced with assessment data

### 2. Backend Services (Node.js)
- **PDF Generator** (Port 3001) - Generates personalized PDFs
- **Webhook Handler** (Port 3002) - Processes Kit webhooks

### 3. Assessment Logic
- 8 sleep personas with detection rules
- Weighted scoring algorithm
- Personalized recommendations

## Deployment Steps

### Step 1: Deploy Backend Services

#### Option A: Railway.app (Recommended)
```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Create new project
railway init

# 4. Deploy PDF Generator
cd pdf-generator
railway up --service pdf-generator

# 5. Deploy Webhook Handler  
railway up --service webhook-handler

# 6. Set environment variables
railway variables set \
  KIT_WEBHOOK_SECRET=your-secret \
  NODE_ENV=production
```

#### Option B: Vercel (Serverless Functions)
1. Create `api/` directory in sleepsmarter.io app
2. Move PDF generator logic to serverless functions
3. Deploy with `vercel --prod`

#### Option C: DigitalOcean/Render (Traditional)
```bash
# 1. Clone repository
git clone <repo-url>
cd sleep-blueprint-pdf

# 2. Install dependencies
npm install

# 3. Set up PM2
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 4. Set up Nginx reverse proxy
# (See README for config)
```

### Step 2: Configure Kit Webhook

1. Go to [Kit Dashboard](https://app.kit.com)
2. Navigate to Forms → Form #9066532 → Settings → Webhooks
3. Add webhook URL:
   - Development: `http://localhost:3002/webhook/kit`
   - Production: `https://your-domain.com/webhook/kit`
4. Select event: `subscriber.created`
5. Save webhook

### Step 3: Update Frontend Deployment

1. Build and deploy sleepsmarter.io app:
```bash
cd ./projects/utility-website-portfolio/sleepsmarter.io/app
npm run build
vercel --prod
```

2. Verify calculator shows assessment flow
3. Test full user journey

### Step 4: Test Integration

#### Test 1: Manual PDF Generation
```bash
cd ./projects/utility-website-portfolio/sleepsmarter.io/lead-magnet/pdf-generator
node test-integration.js
```

#### Test 2: End-to-End Flow
1. Visit sleepsmarter.io/calculator
2. Use calculator → Get results
3. Take assessment → Get persona
4. Submit email → Check webhook logs
5. Verify PDF generation

#### Test 3: Kit Webhook Test
1. Use Kit's webhook testing feature
2. Send test payload
3. Verify PDF is generated

## Environment Variables

### PDF Generator (.env)
```env
PORT=3001
NODE_ENV=production
```

### Webhook Handler (.env)
```env
PORT=3002
NODE_ENV=production
KIT_WEBHOOK_SECRET=your-secret-key
PDF_GENERATOR_URL=http://localhost:3001  # or your deployed URL
```

## Monitoring & Maintenance

### Logs
```bash
# Railway
railway logs

# PM2
pm2 logs

# Manual
tail -f logs/*.log
```

### Health Checks
- PDF Generator: `GET /health`
- Webhook Handler: `GET /health`

### Storage
- PDFs stored in `generated-pdfs/`
- Consider cloud storage (S3) for production
- Implement cleanup job for old PDFs

## Troubleshooting

### Common Issues

#### 1. Webhook not firing
- Check Kit webhook configuration
- Verify server is accessible
- Check CORS settings

#### 2. PDF generation fails
- Check PDFKit installation
- Verify file permissions
- Check disk space

#### 3. Assessment not showing
- Check React component imports
- Verify state management
- Check browser console for errors

#### 4. Email not sending
- Check Kit form configuration
- Verify webhook payload
- Check server logs

### Debug Commands
```bash
# Check services
curl http://localhost:3001/health
curl http://localhost:3002/health

# Test PDF generation
curl -X POST http://localhost:3001/generate-blueprint \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","firstName":"Test"}'

# Check logs
journalctl -u pdf-generator.service
```

## Scaling Considerations

### 1. High Traffic
- Add load balancing
- Implement request queue
- Use CDN for PDF downloads

### 2. Storage
- Move PDFs to S3/Cloud Storage
- Implement TTL cleanup
- Add compression

### 3. Performance
- Cache common PDF templates
- Optimize image assets
- Implement CDN caching

### 4. Reliability
- Add retry logic for webhooks
- Implement dead letter queue
- Add monitoring alerts

## Security

### 1. Webhook Security
- Validate Kit webhook signatures
- Implement rate limiting
- Use HTTPS in production

### 2. PDF Security
- Sanitize user input
- Validate file paths
- Implement download limits

### 3. Data Privacy
- Don't store PII in logs
- Implement data retention policy
- Secure environment variables

## Next Steps After Deployment

1. **Monitor conversion rates** - Compare with/without assessment
2. **A/B test** - Different assessment questions
3. **Optimize PDF content** - Based on user feedback
4. **Add analytics** - Track PDF downloads
5. **Implement email delivery** - Send PDF via email automatically

## Support

For issues:
1. Check logs: `railway logs` or `pm2 logs`
2. Test endpoints: Use health check endpoints
3. Verify configuration: Kit webhook, environment variables
4. Contact: Document issues in GitHub repository