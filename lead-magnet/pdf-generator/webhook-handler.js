const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Kit webhook verification
const KIT_WEBHOOK_SECRET = process.env.KIT_WEBHOOK_SECRET || 'test-secret';

// PDF Generator service URL
const PDF_GENERATOR_URL = process.env.PDF_GENERATOR_URL || 'http://localhost:3001';

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sleep-blueprint-webhook-handler' });
});

// Kit webhook endpoint
app.post('/webhook/kit', async (req, res) => {
  try {
    // Verify webhook (in production, verify signature)
    const { body } = req;
    
    console.log('Received Kit webhook:', JSON.stringify(body, null, 2));

    // Extract data from Kit webhook
    const { 
      subscriber: { 
        email_address, 
        first_name,
        fields = {}
      } 
    } = body;

    if (!email_address) {
      return res.status(400).json({ error: 'No email address provided' });
    }

    // Parse calculator data if available
    let calculatorData = null;
    let assessmentData = null;

    if (fields.calculator_mode) {
      calculatorData = {
        mode: fields.calculator_mode,
        targetTime: fields.target_time,
        results: fields.results_json ? JSON.parse(fields.results_json) : []
      };
    }

    if (fields.sleep_persona) {
      assessmentData = {
        personaId: fields.sleep_persona,
        personaName: fields.persona_name,
        confidence: parseInt(fields.persona_confidence) || 0,
        recommendations: fields.persona_recommendations ? JSON.parse(fields.persona_recommendations) : []
      };
    }

    // Generate PDF
    const pdfResponse = await axios.post(`${PDF_GENERATOR_URL}/generate-blueprint`, {
      firstName: first_name || 'Sleep Smarter User',
      email: email_address,
      calculatorData,
      assessmentData
    });

    console.log('PDF generated:', pdfResponse.data);

    // In production, you would:
    // 1. Store PDF URL in database
    // 2. Send email with download link
    // 3. Trigger follow-up sequence

    // For now, just log success
    res.json({ 
      success: true, 
      message: 'PDF generation triggered',
      pdfData: pdfResponse.data 
    });

  } catch (error) {
    console.error('Webhook error:', error.message);
    
    // Still return 200 to Kit to prevent retries
    // (Kit will retry on non-2xx responses)
    res.status(200).json({ 
      success: false, 
      error: error.message,
      note: 'Error logged, but webhook acknowledged to prevent retries'
    });
  }
});

// Test endpoint for manual triggering
app.post('/test/generate', async (req, res) => {
  try {
    const { firstName, email, calculatorData, assessmentData } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const pdfResponse = await axios.post(`${PDF_GENERATOR_URL}/generate-blueprint`, {
      firstName: firstName || 'Test User',
      email,
      calculatorData,
      assessmentData
    });

    res.json(pdfResponse.data);
  } catch (error) {
    console.error('Test generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Webhook Handler running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Kit webhook endpoint: http://localhost:${PORT}/webhook/kit`);
  console.log(`Test endpoint: http://localhost:${PORT}/test/generate`);
});