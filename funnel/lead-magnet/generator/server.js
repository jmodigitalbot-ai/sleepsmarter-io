const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const SleepBlueprintGenerator = require('./index');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve generated PDFs
app.use('/blueprints', express.static(path.join(__dirname, '../generated')));

// Initialize generator
const generator = new SleepBlueprintGenerator();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
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
      downloadUrl: `http://localhost:${PORT}${result.downloadUrl}`,
      filePath: result.filePath
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Webhook endpoint for Kit integration
app.post('/webhook/kit', async (req, res) => {
  try {
    console.log('Kit webhook received:', req.body);

    // Extract data from Kit webhook
    const { 
      email_address,
      fields = {}
    } = req.body;

    // Map Kit fields to our data structure
    const blueprintData = {
      email: email_address,
      calculator_mode: fields.calculator_mode || fields.mode,
      target_time: fields.target_time || fields.time,
      results_json: fields.results_json,
      optimal_time: fields.optimal_time,
      cycles_preferred: fields.cycles_preferred
    };

    // Generate PDF
    const result = await generator.generateFromCalculator(blueprintData);

    // In a real implementation, you would:
    // 1. Store the PDF reference in your database
    // 2. Send an email with the download link
    // 3. Trigger any follow-up sequences

    res.json({
      success: true,
      message: 'Blueprint generated successfully',
      referenceId: result.referenceId,
      downloadUrl: `https://your-domain.com${result.downloadUrl}`
    });

  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ success: false, error: error.message });
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

    const result = await generator.generatePDF({
      email,
      mode,
      targetTime,
      results,
      userName
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Sleep Blueprint Generator running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Test endpoint: http://localhost:${PORT}/test`);
  console.log(`Webhook endpoint: http://localhost:${PORT}/webhook/kit`);
});