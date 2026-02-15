# Deployment Guide: Personalized Sleep Blueprint PDF Generator

## Overview
Two Node.js services:
1. **PDF Generator** (Port 3001): Generates personalized PDF blueprints
2. **Webhook Handler** (Port 3002): Receives Kit webhooks and triggers PDF generation

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- PM2 (optional, for process management)

### Setup
```bash
# Install dependencies
npm install

# Start services with PM2 (recommended)
npm install -g pm2
pm2 start ecosystem.config.js

# Or start manually
node index.js &          # PDF Generator on port 3001
node webhook-handler.js  # Webhook Handler on port 3002
```

### Test
```bash
node test-integration.js
```

## Production Deployment Options

### Option 1: Railway (Recommended)
Railway is ideal for Node.js services with separate deployments.

#### PDF Generator Service
1. Create new Railway project
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `node index.js`
5. Set environment variables:
   - `PORT=3001`
   - `NODE_ENV=production`
6. Deploy

#### Webhook Handler Service
1. Create another Railway project
2. Connect same GitHub repository
3. Set build command: `npm install`
4. Set start command: `node webhook-handler.js`
5. Set environment variables:
   - `PORT=3002`
   - `NODE_ENV=production`
   - `PDF_GENERATOR_URL=https://your-pdf-service.railway.app` (URL from PDF service)
   - `KIT_WEBHOOK_SECRET=your-actual-secret-from-kit`
6. Deploy

### Option 2: Vercel (Serverless Functions)
Note: Vercel is better for serverless, but we have persistent services.

1. Deploy as separate Vercel projects
2. Use `vercel.json` configuration
3. Set environment variables as above

### Option 3: Docker Containers
Deploy anywhere that supports Docker (AWS ECS, Google Cloud Run, etc.)

#### Build images:
```bash
# PDF Generator
docker build -t sleep-blueprint-pdf .

# Webhook Handler
docker build -f Dockerfile.webhook -t sleep-blueprint-webhook .
```

#### Run with Docker Compose:
```bash
docker-compose up -d
```

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
PDF_GENERATOR_URL=http://localhost:3001  # Change to deployed URL
KIT_WEBHOOK_SECRET=your-kit-webhook-secret
```

## Kit Webhook Configuration

1. Log into Kit dashboard
2. Go to Forms → Sleep Blueprint Form → Settings → Webhooks
3. Add webhook URL: `https://your-webhook-service.railway.app/webhook/kit`
4. Select event: `subscriber.created`
5. Save

## Testing Production Deployment

1. **Health checks:**
   - PDF Generator: `https://your-pdf-service.railway.app/health`
   - Webhook Handler: `https://your-webhook-service.railway.app/health`

2. **Test webhook:**
   ```bash
   curl -X POST https://your-webhook-service.railway.app/test/generate \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","email":"test@example.com"}'
   ```

3. **Test Kit integration:**
   - Submit the Sleep Blueprint form
   - Check webhook handler logs
   - Verify PDF is generated

## Monitoring & Logs

### Railway
- Use Railway dashboard for logs
- Set up alerts for service failures

### PM2 (if self-hosted)
```bash
# View logs
pm2 logs

# Monitor status
pm2 status

# View specific service
pm2 logs pdf-generator
```

## Storage Considerations

### PDF Storage
- PDFs are stored in `generated-pdfs/` directory
- In production, consider:
  - Cloud storage (S3, Google Cloud Storage)
  - CDN for PDF delivery
  - Automatic cleanup of old files

### Database (Future)
- Store user data and PDF references
- Track delivery status
- Enable analytics

## Scaling Considerations

1. **PDF Generator:**
   - CPU-intensive during PDF generation
   - Consider horizontal scaling
   - Implement request queue if needed

2. **Webhook Handler:**
   - Stateless, easy to scale
   - Ensure idempotency for duplicate webhooks

3. **Storage:**
   - Use external storage for PDFs
   - Implement caching for frequently accessed PDFs

## Security

1. **Webhook Verification:**
   - Always verify Kit webhook signatures
   - Use environment variable for secret

2. **API Protection:**
   - Rate limiting
   - CORS configuration
   - Input validation

3. **PDF Security:**
   - Validate user data before PDF generation
   - Sanitize filenames
   - Implement download authentication if needed

## Troubleshooting

### Common Issues

1. **PDF not generating:**
   - Check PDF generator health
   - Verify storage permissions
   - Check logs for errors

2. **Webhook not received:**
   - Verify Kit webhook configuration
   - Check webhook handler is accessible
   - Review webhook handler logs

3. **Services can't communicate:**
   - Verify `PDF_GENERATOR_URL` is correct
   - Check network/firewall settings
   - Test connectivity between services

### Log Locations
- PM2: `~/.pm2/logs/`
- Docker: `docker logs <container-name>`
- Railway: Railway dashboard logs

## Maintenance

### Regular Tasks
1. Monitor disk space for PDF storage
2. Update dependencies: `npm update`
3. Review and rotate secrets
4. Backup user data if stored

### Updates
1. Test changes locally first
2. Deploy to staging environment
3. Monitor production after deployment
4. Rollback if issues detected