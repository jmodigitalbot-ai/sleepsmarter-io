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

// Lookup endpoint — find most recent PDF for an email
app.get('/lookup', (req, res) => {
  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: 'Email parameter required' });
  }

  const sanitizedEmail = email.replace(/[^a-zA-Z0-9]/g, '-');
  const files = fs.readdirSync(pdfDir)
    .filter(f => f.includes(sanitizedEmail) && f.endsWith('.pdf'))
    .sort()
    .reverse();

  if (files.length === 0) {
    return res.status(404).json({ error: 'No PDF found for this email' });
  }

  res.json({ downloadUrl: `/download/${files[0]}` });
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

  const accentColor = '#147E9E';
  const lightAccent = '#B6D7E5';
  const mutedText = '#4A4A4A';
  const pageWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;

  const safeText = (value, fallback = '') => {
    if (value === null || value === undefined) return fallback;
    return String(value);
  };

  const ensureSpace = (minHeight = 80) => {
    if (doc.y + minHeight > doc.page.height - doc.page.margins.bottom) {
      doc.addPage();
    }
  };

  const addDivider = () => {
    doc.moveDown(0.4);
    doc.strokeColor(lightAccent)
       .lineWidth(1)
       .moveTo(doc.page.margins.left, doc.y)
       .lineTo(doc.page.width - doc.page.margins.right, doc.y)
       .stroke();
    doc.moveDown(0.6);
    doc.strokeColor('black');
  };

  const addSectionTitle = (title) => {
    ensureSpace(90);
    doc.fillColor(accentColor)
       .font('Helvetica-Bold')
       .fontSize(16)
       .text(title);
    doc.fillColor('black')
       .moveDown(0.3);
    addDivider();
  };

  const renderLabelValue = (label, value) => {
    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(`${label}: `, { continued: true });
    doc.font('Helvetica')
       .fillColor(mutedText)
       .text(safeText(value, 'Not provided'))
       .fillColor('black')
       .moveDown(0.2);
  };

  // Cover / Header
  doc.fontSize(26)
     .font('Helvetica-Bold')
     .fillColor(accentColor)
     .text('Your Personalized Sleep Blueprint', { align: 'center' })
     .fillColor('black')
     .moveDown(0.6);

  doc.fontSize(12)
     .font('Helvetica')
     .text(`Generated for: ${safeText(firstName, 'Sleep Smarter User')}`, { align: 'center' })
     .text(`Email: ${safeText(email, 'Not provided')}`, { align: 'center' })
     .text(`Date: ${safeText(generationDate)}`, { align: 'center' })
     .moveDown(1);

  doc.fontSize(11)
     .font('Helvetica-Bold')
     .fillColor(accentColor)
     .text('Sleep Smarter', { align: 'center' })
     .fillColor('black')
     .font('Helvetica')
     .text('Evidence-Based Sleep Optimization', { align: 'center' })
     .moveDown(1.5);

  // Section 1: Sleep Score Overview
  addSectionTitle('1. Sleep Score Overview');

  if (assessmentData) {
    const overallScore = assessmentData.overallSleepScore ?? assessmentData.sleepScore;
    renderLabelValue('Overall Sleep Score', overallScore !== undefined ? `${overallScore} / 100` : 'Not provided');

    const personaIcon = safeText(assessmentData.personaIcon || assessmentData.icon, '');
    const personaName = safeText(assessmentData.personaName || assessmentData.personaId, 'Not provided');
    const personaDescription = safeText(assessmentData.personaDescription || assessmentData.description, '');

    doc.fontSize(12)
       .font('Helvetica-Bold')
       .text('Sleep Persona')
       .moveDown(0.2);

    doc.fontSize(11)
       .font('Helvetica-Bold')
       .text(`${personaIcon ? `${personaIcon} ` : ''}${personaName}`)
       .moveDown(0.2);

    if (personaDescription) {
      doc.fontSize(10)
         .font('Helvetica')
         .fillColor(mutedText)
         .text(personaDescription)
         .fillColor('black')
         .moveDown(0.4);
    }

    if (assessmentData.categoryScores) {
      doc.fontSize(11)
         .font('Helvetica-Bold')
         .text('Category Breakdown')
         .moveDown(0.3);

      const barWidth = Math.min(320, pageWidth * 0.7);
      const barHeight = 8;
      const categories = Object.entries(assessmentData.categoryScores);

      categories.forEach(([key, value]) => {
        const label = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
        const score = Math.max(0, Math.min(100, Number(value) || 0));

        doc.fontSize(10)
           .font('Helvetica')
           .text(`${label} (${score})`);

        const barX = doc.x;
        const barY = doc.y + 2;
        doc.rect(barX, barY, barWidth, barHeight)
           .strokeColor(lightAccent)
           .stroke();

        doc.rect(barX, barY, (barWidth * score) / 100, barHeight)
           .fillColor(accentColor)
           .fill();

        doc.fillColor('black')
           .moveDown(0.6);
      });
    }
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text('Assessment data was not provided. Complete the Sleep Smarter assessment to unlock your full blueprint.')
       .moveDown(0.5);
  }

  // Section 2: Executive Summary
  addSectionTitle('2. Executive Summary');

  const executiveSummary = assessmentData?.executiveSummary;
  if (executiveSummary) {
    doc.fontSize(11)
       .font('Helvetica')
       .text(executiveSummary)
       .moveDown(0.5);
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text(`Dear ${safeText(firstName, 'Sleep Smarter User')}, this personalized sleep blueprint is designed to help you optimize your sleep based on your unique patterns and challenges. Better sleep isn't about sleeping more—it's about sleeping smarter.`)
       .moveDown(0.5);
  }

  // Section 3: Primary Challenge
  addSectionTitle('3. Primary Challenge');

  if (assessmentData?.primaryChallenge) {
    doc.fontSize(11)
       .font('Helvetica')
       .text(assessmentData.primaryChallenge)
       .moveDown(0.3);
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text('Identify your primary sleep challenge to focus your efforts on the biggest opportunity for improvement.')
       .moveDown(0.3);
  }

  // Section 4: Custom Sleep Schedule
  addSectionTitle('4. Custom Sleep Schedule');

  const scheduleSource = assessmentData?.sleepSchedule || calculatorData;
  if (scheduleSource) {
    const modeText = scheduleSource.mode === 'wakeup'
      ? `Target wake time: ${safeText(scheduleSource.targetTime, 'Not provided')}`
      : `Target bedtime: ${safeText(scheduleSource.targetTime, 'Not provided')}`;

    doc.fontSize(11)
       .font('Helvetica')
       .text(modeText)
       .moveDown(0.3);

    const recommendations = scheduleSource.recommendations || scheduleSource.results || [];
    if (recommendations.length > 0) {
      recommendations.forEach((result) => {
        ensureSpace(40);
        const labelParts = [];
        if (result.icon) labelParts.push(result.icon);
        if (result.time) labelParts.push(result.time);
        const label = labelParts.join(' ');
        const details = [
          result.hours ? `${result.hours} hours` : null,
          result.cycles ? `${result.cycles} cycles` : null,
          result.quality ? `${result.quality}` : null
        ].filter(Boolean).join(', ');

        doc.fontSize(11)
           .font('Helvetica-Bold')
           .text(label || 'Recommendation')
           .font('Helvetica')
           .text(details ? `  ${details}` : '')
           .moveDown(0.2);

        if (result.useCase) {
          doc.fontSize(10)
             .fillColor(mutedText)
             .text(`  ${result.useCase}`)
             .fillColor('black')
             .moveDown(0.2);
        }
      });
    } else {
      doc.fontSize(10)
         .font('Helvetica-Oblique')
         .text('No schedule recommendations were provided.')
         .moveDown(0.3);
    }

    const tips = scheduleSource.personalizedTips || [];
    if (tips.length > 0) {
      doc.moveDown(0.3)
         .fontSize(11)
         .font('Helvetica-Bold')
         .text('Personalized Tips')
         .moveDown(0.2);

      tips.forEach((tip) => {
        ensureSpace(30);
        doc.fontSize(10)
           .font('Helvetica')
           .text(`• ${safeText(tip.tip || tip)}`);
        if (tip.reason) {
          doc.fontSize(9)
             .fillColor(mutedText)
             .text(`  ${tip.reason}`)
             .fillColor('black');
        }
        doc.moveDown(0.2);
      });
    }
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text('Add your target bedtime or wake time to receive a custom sleep schedule.')
       .moveDown(0.3);
  }

  // Section 5: Top Quick Wins
  addSectionTitle('5. Top Quick Wins');

  if (assessmentData?.quickWins?.length) {
    assessmentData.quickWins.forEach((win, index) => {
      ensureSpace(80);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text(`${index + 1}. ${safeText(win.title, 'Quick Win')}`)
         .moveDown(0.2);

      if (win.description) {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor(mutedText)
           .text(win.description)
           .fillColor('black')
           .moveDown(0.2);
      }

      renderLabelValue('Timing', win.timing || 'Not provided');
      renderLabelValue('Expected Impact', win.expectedImpact || 'Not provided');
      renderLabelValue('Difficulty', win.difficulty || 'Not provided');
      renderLabelValue('Time Required', win.timeRequired || 'Not provided');

      if (Array.isArray(win.steps) && win.steps.length > 0) {
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .text('Steps:')
           .moveDown(0.2);
        win.steps.forEach((step) => {
          doc.fontSize(10)
             .font('Helvetica')
             .text(`• ${safeText(step)}`)
             .moveDown(0.1);
        });
      }

      doc.moveDown(0.4);
    });
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text('No quick wins were provided. Complete the assessment for personalized quick actions you can take tonight.')
       .moveDown(0.4);
  }

  // Section 6: Full 7-Day Protocol
  addSectionTitle('6. Full 7-Day Protocol');

  if (assessmentData?.sevenDayProtocol?.length) {
    assessmentData.sevenDayProtocol.forEach((phase) => {
      ensureSpace(120);
      doc.fontSize(12)
         .font('Helvetica-Bold')
         .text(`${safeText(phase.days, 'Days')} - ${safeText(phase.theme, 'Protocol Phase')}`)
         .moveDown(0.2);

      if (phase.focus) {
        doc.fontSize(10)
           .font('Helvetica')
           .fillColor(mutedText)
           .text(`Focus: ${phase.focus}`)
           .fillColor('black')
           .moveDown(0.2);
      }

      if (Array.isArray(phase.actions) && phase.actions.length > 0) {
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .text('Actions')
           .moveDown(0.1);
        phase.actions.forEach((action) => {
          doc.fontSize(10)
             .font('Helvetica')
             .text(`• ${safeText(action)}`)
             .moveDown(0.1);
        });
      }

      if (Array.isArray(phase.successMetrics) && phase.successMetrics.length > 0) {
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .text('Success Metrics')
           .moveDown(0.1);
        phase.successMetrics.forEach((metric) => {
          doc.fontSize(10)
             .font('Helvetica')
             .text(`• ${safeText(metric)}`)
             .moveDown(0.1);
        });
      }

      if (Array.isArray(phase.tips) && phase.tips.length > 0) {
        doc.fontSize(10)
           .font('Helvetica-Bold')
           .text('Tips')
           .moveDown(0.1);
        phase.tips.forEach((tip) => {
          doc.fontSize(10)
             .font('Helvetica')
             .text(`• ${safeText(tip)}`)
             .moveDown(0.1);
        });
      }

      doc.moveDown(0.4);
    });
  } else {
    doc.fontSize(11)
       .font('Helvetica')
       .text('Your personalized 7-day protocol will appear here after completing the assessment.')
       .moveDown(0.4);
  }

  // Section 7: Product Recommendations
  addSectionTitle('7. Product Recommendations');

  doc.fontSize(11)
     .font('Helvetica')
     .text('If you want a deeper, guided experience, these Sleep Smarter resources can help you lock in the changes:')
     .moveDown(0.3);

  doc.fontSize(11)
     .font('Helvetica-Bold')
     .text('7-Day Sleep Reset Protocol - $17')
     .font('Helvetica')
     .text('A step-by-step implementation plan to solidify your routines.')
     .text('Learn more at `sleepsmarter.io/sleep-reset`')
     .moveDown(0.3);

  doc.fontSize(11)
     .font('Helvetica-Bold')
     .text('Sleep Smarter Masterclass - $67')
     .font('Helvetica')
     .text('A comprehensive masterclass for long-term, sustainable sleep upgrades.')
     .text('Learn more at `sleepsmarter.io/masterclass`')
     .moveDown(0.6);

  // Footer
  addDivider();
  doc.fontSize(9)
     .font('Helvetica-Oblique')
     .text('This blueprint is for educational purposes only and does not replace medical advice.', { align: 'center' })
     .moveDown(0.4);

  doc.fontSize(9)
     .font('Helvetica')
     .text('© 2026 Sleep Smarter. All rights reserved.', { align: 'center' });
}

// Start server
app.listen(PORT, () => {
  console.log(`PDF Generator running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
