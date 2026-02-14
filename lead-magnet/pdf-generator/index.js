const express = require('express');
const cors = require('cors');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure directories exist
const pdfDir = path.join(__dirname, 'generated-pdfs');
if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir, { recursive: true });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'sleep-blueprint-pdf-generator' });
});

// Generate PDF endpoint
app.post('/generate-blueprint', async (req, res) => {
  try {
    const {
      firstName = 'Sleep Smarter User',
      email,
      calculatorData,
      assessmentData
    } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `sleep-blueprint-${timestamp}-${email.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
    const filepath = path.join(pdfDir, filename);

    // Create PDF
    const doc = new PDFDocument({
      size: 'A4',
      margin: 50,
      info: {
        Title: 'Personalized Sleep Blueprint',
        Author: 'Sleep Smarter',
        Subject: 'Personalized sleep optimization guide',
        Keywords: 'sleep, blueprint, optimization, personalized',
        Creator: 'Sleep Smarter PDF Generator',
        CreationDate: new Date()
      }
    });

    // Pipe to file
    const stream = fs.createWriteStream(filepath);
    doc.pipe(stream);

    // Generate PDF content
    generatePDFContent(doc, {
      firstName,
      email,
      calculatorData,
      assessmentData,
      generationDate: new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    });

    // Finalize PDF
    doc.end();

    // Wait for stream to finish
    stream.on('finish', () => {
      res.json({
        success: true,
        filename,
        downloadUrl: `/download/${filename}`,
        message: 'PDF generated successfully'
      });
    });

    stream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(500).json({ error: 'Failed to generate PDF' });
    });

  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Download endpoint
app.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(pdfDir, filename);

  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.download(filepath, 'sleep-blueprint.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ error: 'Download failed' });
    }
  });
});

// PDF content generation function
function generatePDFContent(doc, data) {
  const {
    firstName,
    email,
    calculatorData,
    assessmentData,
    generationDate
  } = data;

  // Add header
  doc.fontSize(24)
     .font('Helvetica-Bold')
     .text('Your Personalized Sleep Blueprint', { align: 'center' })
     .moveDown(0.5);

  doc.fontSize(12)
     .font('Helvetica')
     .text(`Generated for: ${firstName}`, { align: 'center' })
     .text(`Email: ${email}`, { align: 'center' })
     .text(`Date: ${generationDate}`, { align: 'center' })
     .moveDown(1);

  // Add Sleep Smarter branding
  doc.fontSize(10)
     .text('Sleep Smarter - Evidence-Based Sleep Optimization', { align: 'center' })
     .moveDown(2);

  // Section 1: Executive Summary
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .text('1. Executive Summary', { underline: true })
     .moveDown(0.5);

  doc.fontSize(11)
     .font('Helvetica')
     .text(`Dear ${firstName},`, { continued: true })
     .text(' This personalized sleep blueprint is designed to help you optimize your sleep based on your unique patterns and challenges. Better sleep isn\'t about sleeping more—it\'s about sleeping smarter.')
     .moveDown(1);

  // Section 2: Your Sleep Profile (from assessment)
  if (assessmentData) {
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .text('2. Your Sleep Profile', { underline: true })
       .moveDown(0.5);

    doc.fontSize(14)
       .font('Helvetica-Bold')
       .text(`Primary Profile: ${assessmentData.personaName}`)
       .moveDown(0.3);

    doc.fontSize(11)
       .font('Helvetica')
       .text(assessmentData.description)
       .moveDown(0.5);

    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('Personalized Recommendations:')
       .moveDown(0.3);

    assessmentData.recommendations.forEach((rec, index) => {
      doc.fontSize(11)
         .font('Helvetica')
         .text(`• ${rec}`)
         .moveDown(0.2);
    });

    doc.moveDown(1);
  }

  // Section 3: Your Custom Sleep Schedule (from calculator)
  if (calculatorData) {
    doc.fontSize(16)
       .font('Helvetica-Bold')
       .text('3. Your Custom Sleep Schedule', { underline: true })
       .moveDown(0.5);

    const modeText = calculatorData.mode === 'wakeup' 
      ? `Based on your need to wake up at ${calculatorData.targetTime}, here are your optimal bedtimes:`
      : `Based on your bedtime of ${calculatorData.targetTime}, here are your optimal wake times:`;

    doc.fontSize(11)
       .font('Helvetica')
       .text(modeText)
       .moveDown(0.5);

    calculatorData.results.forEach((result, index) => {
      let qualityText = '';
      let color = 'black';
      
      switch(result.quality) {
        case 'optimal':
          qualityText = 'Optimal (Recommended)';
          color = 'green';
          break;
        case 'good':
          qualityText = 'Good';
          color = 'blue';
          break;
        case 'minimum':
          qualityText = 'Minimum (Use occasionally)';
          color = 'orange';
          break;
      }

      doc.fontSize(11)
         .font('Helvetica-Bold')
         .text(`${result.time}`, { continued: true })
         .font('Helvetica')
         .text(` - ${result.hours} hours, ${result.cycles} cycles`)
         .moveDown(0.1);

      doc.fontSize(10)
         .font('Helvetica-Oblique')
         .fillColor(color)
         .text(`  ${qualityText}`)
         .fillColor('black')
         .moveDown(0.3);
    });

    doc.moveDown(1);
  }

  // Section 4: 7-Day Sleep Optimization Protocol
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .text('4. 7-Day Sleep Optimization Protocol', { underline: true })
     .moveDown(0.5);

  const protocol = [
    { day: 'Day 1', focus: 'Anchor Your Wake Time', action: 'Set and maintain a consistent wake time' },
    { day: 'Day 2', focus: 'Light Exposure Optimization', action: 'Get 10-15 minutes of morning sunlight' },
    { day: 'Day 3', focus: 'Caffeine & Nutrition', action: 'No caffeine after 2 PM, light dinner 3 hours before bed' },
    { day: 'Day 4', focus: 'Digital Sunset', action: 'No screens 60 minutes before bed' },
    { day: 'Day 5', focus: 'Environment Optimization', action: 'Set bedroom temperature to 65-68°F (18-20°C)' },
    { day: 'Day 6', focus: 'Wind-Down Routine', action: 'Create a 30-minute pre-sleep relaxation routine' },
    { day: 'Day 7', focus: 'Integration & Maintenance', action: 'Review progress and create maintenance plan' }
  ];

  protocol.forEach(item => {
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(`${item.day}: ${item.focus}`)
       .moveDown(0.1);

    doc.fontSize(10)
       .font('Helvetica')
       .text(`  ${item.action}`)
       .moveDown(0.3);
  });

  doc.moveDown(1);

  // Section 5: Quick Wins (Tonight)
  doc.fontSize(16)
     .font('Helvetica-Bold')
     .text('5. Quick Wins (Do These Tonight)', { underline: true })
     .moveDown(0.5);

  const quickWins = [
    'Drop bedroom temperature to 67°F (19°C)',
    'Practice 4-7-8 breathing: Inhale 4s, Hold 7s, Exhale 8s (repeat 4x)',
    'Write tomorrow\'s to-do list 60 minutes before bed',
    'Put your phone in another room overnight',
    'Take a warm shower 90 minutes before bed'
  ];

  quickWins.forEach((win, index) => {
    doc.fontSize(11)
       .font('Helvetica')
       .text(`• ${win}`)
       .moveDown(0.2);
  });

  doc.moveDown(2);

  // Footer
  doc.fontSize(10)
     .font('Helvetica-Oblique')
     .text('This blueprint is for educational purposes only. Consult your healthcare provider for medical advice.', { align: 'center' })
     .moveDown(0.5);

  doc.fontSize(9)
     .font('Helvetica')
     .text('© 2026 Sleep Smarter. All rights reserved.', { align: 'center' });
}

// Start server
app.listen(PORT, () => {
  console.log(`PDF Generator running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});