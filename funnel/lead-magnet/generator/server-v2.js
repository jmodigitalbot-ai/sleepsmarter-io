/**
 * Sleep Blueprint Generator Server v2
 * Enhanced with persona-based personalization, better error handling, and metrics
 */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const crypto = require('crypto');
const rateLimit = require('express-rate-limit');
const SleepBlueprintGeneratorV2 = require('./index-v2');

const app = express();
const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// ─── Middleware ─────────────────────────────────────────────
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} ${req.method} ${req.url} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Rate limiting
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests. Try again later.' }
});

const generateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: { error: 'Generation rate limit exceeded. Try again in a few minutes.' }
});

// Serve generated PDFs
app.use('/blueprints', express.static(path.join(__dirname, '../generated'), {
  maxAge: '7d',
  setHeaders: (res, filepath) => {
    res.setHeader('Content-Disposition', `attachment; filename="Sleep-Blueprint.pdf"`);
  }
}));

// ─── Generator Instance ────────────────────────────────────
const generator = new SleepBlueprintGeneratorV2();

// ─── Metrics ───────────────────────────────────────────────
const metrics = {
  totalGenerated: 0,
  totalErrors: 0,
  personaCounts: {},
  avgGenerationMs: 0,
  _times: [],
  
  record(result) {
    this.totalGenerated++;
    const persona = result.metadata?.persona || 'unknown';
    this.personaCounts[persona] = (this.personaCounts[persona] || 0) + 1;
    this._times.push(result.metadata?.generationTimeMs || 0);
    if (this._times.length > 100) this._times.shift();
    this.avgGenerationMs = Math.round(this._times.reduce((a, b) => a + b, 0) / this._times.length);
  },
  
  recordError() {
    this.totalErrors++;
  },
  
  toJSON() {
    return {
      totalGenerated: this.totalGenerated,
      totalErrors: this.totalErrors,
      successRate: this.totalGenerated > 0 
        ? `${((this.totalGenerated / (this.totalGenerated + this.totalErrors)) * 100).toFixed(1)}%`
        : 'N/A',
      avgGenerationMs: this.avgGenerationMs,
      personaDistribution: this.personaCounts
    };
  }
};

// ─── Webhook Verification ──────────────────────────────────
const verifyKitWebhook = (req, res, next) => {
  if (process.env.NODE_ENV !== 'production' || !process.env.WEBHOOK_SECRET) {
    return next();
  }

  const signature = req.headers['x-kit-signature'];
  if (!signature) {
    return res.status(401).json({ error: 'Missing webhook signature' });
  }

  const payload = JSON.stringify(req.body);
  const expected = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(payload)
    .digest('hex');

  if (signature !== expected) {
    console.error('Invalid webhook signature');
    return res.status(401).json({ error: 'Invalid webhook signature' });
  }

  next();
};

// ─── Routes ────────────────────────────────────────────────

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sleep Blueprint Generator v2',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    metrics: metrics.toJSON()
  });
});

// Test endpoint — generate with sample data for any persona
app.get('/test/:persona?', async (req, res) => {
  const personaId = req.params.persona || 'restless_mind';
  const validPersonas = [
    'restless_mind', 'digital_addict', 'chronotype_misfit',
    'environmentally_challenged', 'habitually_inconsistent',
    'stress_affected', 'physiologically_sensitive', 'undiagnosed'
  ];

  if (!validPersonas.includes(personaId)) {
    return res.status(400).json({
      error: `Invalid persona. Valid options: ${validPersonas.join(', ')}`
    });
  }

  try {
    const result = await generator.generatePersonalizedBlueprint({
      email: 'test@example.com',
      userName: 'Alex',
      calculatorData: {
        mode: 'wakeup',
        targetTime: '7:00 AM',
        results: [
          { time: '9:30 PM', cycles: 6, hours: 9, quality: 'optimal' },
          { time: '11:00 PM', cycles: 5, hours: 7.5, quality: 'good' },
          { time: '12:30 AM', cycles: 4, hours: 6, quality: 'minimum' }
        ]
      },
      assessmentData: {
        personaId,
        personaName: `Test: ${personaId}`,
        confidence: 85,
        recommendations: ['Test recommendation 1', 'Test recommendation 2'],
        description: 'Test generation'
      }
    });

    metrics.record(result);

    res.json({
      success: true,
      message: `Test PDF generated for persona: ${personaId}`,
      downloadUrl: `${BASE_URL}${result.downloadUrl}`,
      metadata: result.metadata,
      allPersonas: validPersonas
    });
  } catch (error) {
    metrics.recordError();
    console.error('Test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Kit webhook endpoint
app.post('/webhook/kit', webhookLimiter, verifyKitWebhook, async (req, res) => {
  try {
    console.log('Kit webhook received:', JSON.stringify(req.body, null, 2));

    const { email_address, first_name, fields = {} } = req.body;

    if (!email_address) {
      return res.status(400).json({ error: 'Missing email address' });
    }

    const result = await generator.generateFromWebhook({
      email_address,
      first_name,
      fields
    });

    metrics.record(result);

    console.log(`✅ Blueprint generated for ${email_address}: ${result.referenceId}`);

    res.json({
      success: true,
      referenceId: result.referenceId,
      downloadUrl: `${BASE_URL}${result.downloadUrl}`,
      metadata: result.metadata
    });

  } catch (error) {
    metrics.recordError();
    console.error('Webhook error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: 'Blueprint generation failed'
    });
  }
});

// Direct generation endpoint (for frontend or API calls)
app.post('/generate', generateLimiter, async (req, res) => {
  try {
    const {
      email,
      userName,
      firstName,
      mode,
      targetTime,
      results,
      personaId,
      personaName,
      personaConfidence,
      recommendations,
      description
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await generator.generatePersonalizedBlueprint({
      email,
      userName: userName || firstName || email.split('@')[0],
      calculatorData: {
        mode: mode || 'wakeup',
        targetTime: targetTime || '07:00',
        results: results || []
      },
      assessmentData: personaId ? {
        personaId,
        personaName: personaName || personaId,
        confidence: personaConfidence || 75,
        recommendations: recommendations || [],
        description: description || ''
      } : null
    });

    metrics.record(result);

    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    metrics.recordError();
    console.error('Generation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download by reference ID
app.get('/blueprint/:referenceId', async (req, res) => {
  try {
    const { referenceId } = req.params;
    const filePath = path.join(__dirname, '../generated', `${referenceId}.pdf`);

    try {
      await fs.access(filePath);
      res.download(filePath, `Sleep-Blueprint-${referenceId}.pdf`);
    } catch {
      res.status(404).json({ error: 'Blueprint not found' });
    }
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Admin: list generated blueprints
app.get('/admin/blueprints', async (req, res) => {
  try {
    const files = await fs.readdir(path.join(__dirname, '../generated'));
    const pdfFiles = files.filter(f => f.endsWith('.pdf')).sort().reverse();
    
    res.json({
      success: true,
      count: pdfFiles.length,
      recent: pdfFiles.slice(0, 20),
      metrics: metrics.toJSON()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: cleanup old files
app.post('/admin/cleanup', async (req, res) => {
  try {
    const maxAgeDays = req.body.maxAgeDays || 30;
    const cutoff = Date.now() - (maxAgeDays * 24 * 60 * 60 * 1000);
    const dir = path.join(__dirname, '../generated');
    const files = await fs.readdir(dir);
    let deleted = 0;

    for (const file of files) {
      if (!file.endsWith('.pdf')) continue;
      const stat = await fs.stat(path.join(dir, file));
      if (stat.mtimeMs < cutoff) {
        await fs.unlink(path.join(dir, file));
        deleted++;
      }
    }

    res.json({ success: true, deleted, maxAgeDays });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ─── Error Handling ────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    requestId: Date.now().toString(36)
  });
});

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    endpoints: {
      health: 'GET /health',
      test: 'GET /test/:persona?',
      webhook: 'POST /webhook/kit',
      generate: 'POST /generate',
      download: 'GET /blueprint/:referenceId',
      admin: 'GET /admin/blueprints'
    }
  });
});

// ─── Start ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Sleep Blueprint Generator v2 running on port ${PORT}`);
  console.log(`📊 Health: ${BASE_URL}/health`);
  console.log(`🧪 Test:   ${BASE_URL}/test/restless_mind`);
  console.log(`🔗 Hook:   ${BASE_URL}/webhook/kit`);
  console.log(`📁 Output: ${path.join(__dirname, '../generated')}`);
  console.log('');
  
  if (!process.env.WEBHOOK_SECRET) {
    console.warn('⚠️  WEBHOOK_SECRET not set — signature verification disabled');
  }
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});
