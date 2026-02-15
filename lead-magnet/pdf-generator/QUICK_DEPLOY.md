# Quick Deploy: Sleep Blueprint PDF Generator

## 5-Minute Railway Deployment

### Step 1: Deploy PDF Generator
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Environment Variables**:
     - `PORT=3001`
     - `NODE_ENV=production`
5. Deploy and note the URL (e.g., `https://pdf-generator.up.railway.app`)

### Step 2: Deploy Webhook Handler
1. Create another Railway project
2. Same repository
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `node webhook-handler.js`
   - **Environment Variables**:
     - `PORT=3002`
     - `NODE_ENV=production`
     - `PDF_GENERATOR_URL=https://pdf-generator.up.railway.app` (URL from Step 1)
     - `KIT_WEBHOOK_SECRET=your-kit-secret` (get from Kit dashboard)
4. Deploy and note the URL (e.g., `https://webhook-handler.up.railway.app`)

### Step 3: Configure Kit Webhook
1. Log into [Kit dashboard](https://kit.com)
2. Go to Forms → Sleep Blueprint Form → Settings → Webhooks
3. Add webhook:
   - **URL**: `https://webhook-handler.up.railway.app/webhook/kit`
   - **Event**: `subscriber.created`
4. Save

### Step 4: Test
```bash
# Test PDF generator
curl https://pdf-generator.up.railway.app/health

# Test webhook handler  
curl https://webhook-handler.up.railway.app/health

# Test PDF generation
curl -X POST https://webhook-handler.up.railway.app/test/generate \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","email":"test@example.com"}'
```

## Environment Variables Cheat Sheet

### PDF Generator (.env)
```env
PORT=3001
NODE_ENV=production
```

### Webhook Handler (.env)
```env
PORT=3002
NODE_ENV=production
PDF_GENERATOR_URL=https://your-pdf-service.railway.app
KIT_WEBHOOK_SECRET=your-actual-secret
```

## Troubleshooting Quick Fixes

### Service not starting
```bash
# Check logs in Railway dashboard
# Verify PORT environment variable
# Test locally: node index.js
```

### Webhook not received
1. Check Kit webhook is enabled
2. Verify webhook handler URL is correct
3. Test with curl command above

### PDF not generating
1. Check PDF generator health
2. Verify `PDF_GENERATOR_URL` is correct
3. Check Railway logs for errors

## Need Help?
- Check `DEPLOYMENT.md` for detailed instructions
- Review `DEPLOYMENT_SUMMARY.md` for known issues
- Test locally first: `node test-integration.js`