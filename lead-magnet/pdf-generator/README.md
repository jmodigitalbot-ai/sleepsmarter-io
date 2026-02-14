# Personalized Sleep Blueprint PDF Generator

This service generates personalized PDF blueprints for Sleep Smarter lead magnet.

## Architecture

```
Frontend (React) → Kit Form → Webhook Handler → PDF Generator → Email Delivery
```

## Services

### 1. PDF Generator (Port 3001)
- Generates personalized PDFs based on user data
- Stores PDFs in `generated-pdfs/` directory
- Provides download endpoints

### 2. Webhook Handler (Port 3002)
- Receives webhooks from Kit when users sign up
- Processes user data and triggers PDF generation
- Can integrate with email delivery services

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Start services

**Option A: Separate terminals**
```bash
# Terminal 1: PDF Generator
node index.js

# Terminal 2: Webhook Handler  
node webhook-handler.js
```

**Option B: Using PM2 (production)**
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### 3. Test the integration
```bash
node test-integration.js
```

## API Endpoints

### PDF Generator (3001)
- `POST /generate-blueprint` - Generate PDF
- `GET /download/:filename` - Download PDF
- `GET /health` - Health check

### Webhook Handler (3002)
- `POST /webhook/kit` - Kit webhook endpoint
- `POST /test/generate` - Test endpoint
- `GET /health` - Health check

## Kit Webhook Configuration

1. Go to Kit dashboard
2. Navigate to Forms → Your Form → Settings → Webhooks
3. Add webhook URL: `http://your-server:3002/webhook/kit`
4. Select events: `subscriber.created`

## Data Flow

1. User submits calculator form with assessment data
2. Frontend sends data to Kit form with hidden fields
3. Kit triggers webhook to our handler
4. Handler extracts data and calls PDF generator
5. PDF generator creates personalized blueprint
6. Handler can:
   - Store PDF URL in database
   - Send email with download link
   - Trigger follow-up sequence

## Environment Variables

Create `.env` file:

```env
# PDF Generator
PORT=3001
NODE_ENV=production

# Webhook Handler  
PORT=3002
KIT_WEBHOOK_SECRET=your-secret-key
PDF_GENERATOR_URL=http://localhost:3001

# Email Service (future)
SENDGRID_API_KEY=your-key
EMAIL_FROM=sarah@sleepsmarter.io
```

## Production Deployment

### 1. Set up reverse proxy (Nginx)
```nginx
server {
    listen 80;
    server_name api.sleepsmarter.io;

    location /pdf/ {
        proxy_pass http://localhost:3001/;
        proxy_set_header Host $host;
    }

    location /webhook/ {
        proxy_pass http://localhost:3002/;
        proxy_set_header Host $host;
    }
}
```

### 2. Set up SSL (Let's Encrypt)
```bash
sudo certbot --nginx -d api.sleepsmarter.io
```

### 3. Configure Kit webhook
- URL: `https://api.sleepsmarter.io/webhook/kit`
- Secret: Use environment variable

## PDF Customization

Edit `generatePDFContent()` function in `index.js` to:
- Change layout and styling
- Add more personalized sections
- Include affiliate product recommendations
- Add custom branding

## Monitoring

Check logs:
```bash
# PM2 logs
pm2 logs

# Service logs
tail -f generated-pdfs/generation.log
```

## Troubleshooting

### PDF not generating
1. Check if services are running: `pm2 status`
2. Check logs: `pm2 logs pdf-generator`
3. Test manually: `node test-integration.js`

### Webhook not received
1. Check Kit webhook configuration
2. Verify server is accessible from internet
3. Check webhook handler logs

### PDF download fails
1. Check file permissions in `generated-pdfs/`
2. Verify filename exists
3. Check disk space