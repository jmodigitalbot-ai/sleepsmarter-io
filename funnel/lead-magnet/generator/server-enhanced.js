const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const SleepBlueprintGenerator = require('./index');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${req.ip}`);
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/webhook/kit', limiter);
app.use('/generate', limiter);

// Serve generated PDFs
app.use('/blueprints', express.static(path.join(__dirname, '../generated')));

// Initialize generator
const generator = new SleepBlueprintGenerator();

// Webhook signature verification
const verifyKitWebhook = (req, res, next) => {
  // Skip verification in development or if no secret is set
  if (process.env.NODE_ENV === 'development' || !process.env.WEBHOOK_SECRET) {
    return next();
  }

  const signature = req.headers['x-kit-signature'];
  if (!signature) {
    return res.status(401).json({ error: 'Missing webhook signature' });
  }

  const payload = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expectedSignature) {
    console.error('Invalid webhook signature:', { expected: expectedSignature, received: signature });
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  next();
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    service: 'Sleep Blueprint Generator',
    version: '1.0.0'
  });
});

// Test endpoint - generate PDF with sample data
app.get('/test', async (req, res) => {
  try {
    const sampleData = {
      email: 'test@example.com',
      calculator_mode: 'wakeup',
      target_time: '07:00',
      results_json: JSON.stringify([
        {
          time: '9:30 PM',
          cycles: 6,
          hours: 9,
          quality: 'optimal'
        },
        {
          time: '11:00 PM',
          cycles: 5,
          hours: 7.5,
          quality: 'good'
        },
        {
          time: '12:30 AM',
          cycles: 4,
          hours: 6,
          quality: 'minimum'
        }
      ]),
      optimal_time: '9:30 PM',
      cycles_preferred: 6
    };

    const result = await generator.generateFromCalculator(sampleData);
    res.json({
      success: true,
      message: 'Test PDF generated successfully',
      downloadUrl: `${process.env.BASE_URL || `http://localhost:${PORT}`}${result.downloadUrl}`,
      filePath: result.filePath,
      referenceId: result.referenceId
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Webhook endpoint for Kit integration
app.post('/webhook/kit', verifyKitWebhook, async (req, res) => {
  try {
    console.log('Kit webhook received:', JSON.stringify(req.body, null, 2));

    // Extract data from Kit webhook
    const { 
      email_address,
      fields = {}
    } = req.body;

    if (!email_address) {
      return res.status(400).json({ error: 'Missing email address' });
    }

    // Map Kit fields to our data structure
    const blueprintData = {
      email: email_address,
      calculator_mode: fields.calculator_mode || fields.mode || 'wakeup',
      target_time: fields.target_time || fields.time || '07:00',
      results_json: fields.results_json || '[]',
      optimal_time: fields.optimal_time || '',
      cycles_preferred: fields.cycles_preferred || 6
    };

    // Generate PDF
    const result = await generator.generateFromCalculator(blueprintData);

    // Log successful generation
    console.log(`PDF generated for ${email_address}: ${result.referenceId}`);

    res.json({
      success: true,
      message: 'Blueprint generated successfully',
      referenceId: result.referenceId,
      downloadUrl: `${process.env.BASE_URL || `http://localhost:${PORT}`}${result.downloadUrl}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      details: 'Failed to generate blueprint'
    });
  }
});

// Direct PDF generation endpoint
app.post('/generate', async (req, res) => {
  try {
    const {
      email,
      mode,
      targetTime,
      results,
      userName
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await generator.generatePDF({
      email,
      mode: mode || 'wakeup',
      targetTime: targetTime || '07:00',
      results: results || [],
      userName: userName || email.split('@')[0]
    });

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get PDF by reference ID
app.get('/blueprint/:referenceId', async (req, res) => {
  try {
    const { referenceId } = req.params;
    const filePath = path.join(__dirname, '../generated', `${referenceId}.pdf`);

    try {
      await fs.access(filePath);
      res.download(filePath, `Sleep-Blueprint-${referenceId}.pdf`);
    } catch (error) {
      res.status(404).json({ success: false, error: 'Blueprint not found' });
    }
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// List all generated blueprints (admin endpoint - protect in production)
app.get('/admin/blueprints', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, '../generated'));
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));
    
    res.json({
      success: true,
      count: pdfFiles.length,
      files: pdfFiles
    });
  } catch (error) {
    console.error('Admin error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ 
    success: false, 
    error: 'Internal server error',
    requestId: Date.now().toString(36)
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'GET /test',
      'POST /webhook/kit',
      'POST /generate',
      'GET /blueprint/:referenceId'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sleep Blueprint Generator running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🔗 Webhook endpoint: http://localhost:${PORT}/webhook/kit`);
  console.log(`📁 PDF storage: ${path.join(__dirname, '../generated')}`);
  
  if (!process.env.WEBHOOK_SECRET) {
    console.warn('⚠️  WEBHOOK_SECRET not set - webhook verification disabled');
  }
  
  if (process.env.NODE_ENV === 'production') {
    console.log('🌐 Production mode enabled');
  }
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Log to file in production
  if (process.env.NODE_ENV === 'production') {
    fs.appendFile('errors.log', `${new Date().toISOString()} ${error.stack}\n`);
  }
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});