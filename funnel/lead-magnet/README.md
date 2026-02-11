# Personalized Sleep Blueprint Lead Magnet

## Overview
A premium, personalized PDF lead magnet for sleepsmarter.io that users receive after submitting their email via the sleep calculator. The blueprint provides personalized sleep recommendations based on their calculator inputs.

## Project Structure
```
lead-magnet/
├── blueprint-design.md          # Content structure and design document
├── template.html               # HTML template for PDF generation
├── integration-guide.md        # Integration instructions
├── README.md                   # This file
├── generator/                  # PDF generation system
│   ├── index.js               # Main generator class
│   ├── server.js              # Express server with webhooks
│   ├── package.json           # Dependencies
│   ├── test.js                # Test suite
│   └── (node_modules/)        # Dependencies (after npm install)
└── generated/                  # Generated PDFs (created at runtime)
```

## Features

### 1. Personalized Content
- Custom sleep schedule based on calculator inputs
- 7-day sleep optimization protocol
- Troubleshooting guide
- Premium resources and recommendations

### 2. Technical Features
- Dynamic PDF generation with Puppeteer
- Handlebars templating engine
- Express.js web server
- Kit API integration via webhooks
- Secure file serving

### 3. Integration Features
- Seamless integration with existing email capture
- Webhook-based automation
- Email delivery with download links
- Tracking and analytics ready

## Quick Start

### 1. Installation
```bash
cd generator
npm install
```

### 2. Testing
```bash
# Run basic tests
node test.js

# Generate a test PDF
node index.js
```

### 3. Development Server
```bash
# Start the server
node server.js

# Test endpoints
curl http://localhost:3001/health
curl http://localhost:3001/test
```

## Integration with Sleepsmarter.io

### Frontend Changes Required:
1. Update `EmailCapture.tsx` to include hidden fields with calculator data
2. Pass calculator data from `SleepCalculator.tsx` to `EmailCapture`
3. Update success message to mention blueprint delivery

### Backend Deployment:
1. Deploy the generator server to a hosting service
2. Configure Kit webhook to point to your deployed service
3. Set up email automation in Kit

### Environment Variables:
Create `.env` file:
```env
PORT=3001
NODE_ENV=production
KIT_API_KEY=your_kit_api_key
WEBHOOK_SECRET=your_webhook_secret
BASE_URL=https://your-deployed-service.com
```

## API Endpoints

### Server Endpoints:
- `GET /health` - Health check
- `GET /test` - Generate test PDF
- `POST /webhook/kit` - Kit webhook integration
- `POST /generate` - Direct PDF generation
- `GET /blueprint/:id` - Download PDF by reference ID
- `GET /blueprints/:file.pdf` - Serve generated PDFs

### Webhook Payload Format:
```json
{
  "email_address": "user@example.com",
  "fields": {
    "calculator_mode": "wakeup",
    "target_time": "07:00",
    "results_json": "[...]",
    "optimal_time": "9:30 PM",
    "cycles_preferred": 6
  }
}
```

## Content Personalization

The blueprint personalizes content based on:

### Calculator Inputs:
- **Mode**: `wakeup` or `bedtime`
- **Target Time**: User's input time
- **Results**: Array of sleep options with quality ratings
- **Optimal Time**: Best sleep option

### Dynamic Sections:
1. **Executive Summary**: Personalized based on mode and time
2. **Sleep Schedule**: Color-coded options from calculator
3. **7-Day Protocol**: Generic but tailored recommendations
4. **Troubleshooting**: Mode-specific advice
5. **Pro Tips**: Based on user's sleep pattern

## Design Elements

### Visual Design:
- Premium gradient backgrounds
- Color-coded quality badges (green/blue/yellow)
- Clean, readable typography (Inter font)
- Responsive layout for PDF and screen
- Sleep Smarter branding throughout

### Content Sections:
1. Cover page with user information
2. Executive summary
3. Custom sleep schedule
4. Sleep cycle science
5. 7-day optimization protocol
6. Troubleshooting guide
7. Premium resources
8. Footer with contact info

## Performance Considerations

### PDF Generation:
- Average generation time: 2-3 seconds
- File size: ~200-300KB
- Caching recommended for high traffic

### Scaling:
- Implement job queue for PDF generation
- Use CDN for file serving
- Add Redis caching for templates
- Monitor memory usage with Puppeteer

## Security

### Implement:
1. Webhook signature verification
2. Rate limiting on endpoints
3. Input validation and sanitization
4. Secure file serving (no directory listing)
5. Regular dependency updates

### Environment Variables:
- Never commit API keys or secrets
- Use different keys for development/production
- Rotate keys regularly

## Monitoring & Maintenance

### Logging:
- Request logging middleware
- Error tracking
- PDF generation metrics
- Download statistics

### Regular Tasks:
- Monitor disk space for PDF storage
- Update dependencies monthly
- Backup generated files weekly
- Review error logs daily

### Alerting:
- PDF generation failures
- High error rates
- Disk space warnings
- Service downtime

## Success Metrics

Track these KPIs:

### Conversion Metrics:
- Email capture rate increase
- PDF generation success rate
- PDF download rate
- Email open/click rates

### Engagement Metrics:
- Time spent viewing PDF
- Protocol completion rate
- Return visitor rate
- Newsletter subscription rate

### Technical Metrics:
- PDF generation time
- Server response time
- Error rate
- Uptime percentage

## Troubleshooting

### Common Issues:

1. **PDF not generating:**
   - Check Puppeteer installation
   - Verify template file exists
   - Check write permissions

2. **Webhook not firing:**
   - Verify Kit configuration
   - Check server logs
   - Test with curl

3. **Email not sending:**
   - Check Kit automation
   - Verify download URL
   - Test email deliverability

4. **Performance issues:**
   - Implement caching
   - Add queue system
   - Optimize template

### Support:
- Backend: Check server logs
- Frontend: Browser console
- Kit: Kit support dashboard
- Email: Service provider logs

## Future Enhancements

### Planned Features:
1. A/B testing different templates
2. User preference tracking
3. Social sharing capabilities
4. Mobile app integration
5. Advanced analytics dashboard

### Technical Improvements:
1. Serverless architecture
2. CDN integration
3. Database for tracking
4. Real-time generation status
5. Bulk generation capabilities

## License
MIT License - see LICENSE file for details

## Support
For issues or questions:
1. Check the integration guide
2. Review server logs
3. Test with the test suite
4. Contact development team

## Changelog

### v1.0.0 (2026-02-09)
- Initial release
- PDF generation with Puppeteer
- Kit webhook integration
- Personalized template
- Complete documentation