const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
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

// Shared PDF generation helper
async function generatePdf({ firstName, email, calculatorData, assessmentData }) {
  const timestamp = Date.now();
  const filename = `sleep-blueprint-${timestamp}-${email.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
  const filepath = path.join(pdfDir, filename);
  const generationDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const html = buildHtml({ firstName, email, calculatorData, assessmentData, generationDate });

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true,
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.emulateMediaType('screen');
    await page.pdf({
      path: filepath,
      format: 'A4',
      printBackground: true,
      margin: { top: '40px', right: '40px', bottom: '40px', left: '40px' }
    });
  } finally {
    if (browser) await browser.close();
  }

  const serviceUrl = process.env.SERVICE_URL || '';
  return { filename, downloadUrl: `${serviceUrl}/download/${filename}` };
}

// Generate PDF endpoint
app.post('/generate-blueprint', async (req, res) => {
  try {
    const { firstName = 'Sleep Smarter User', email, calculatorData, assessmentData } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const result = await generatePdf({ firstName, email, calculatorData, assessmentData });
    res.json({ success: true, ...result, message: 'PDF generated successfully' });
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

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename="sleep-blueprint.pdf"');
  res.sendFile(filepath, (err) => {
    if (err) {
      console.error('Download error:', err);
      res.status(500).json({ error: 'Download failed' });
    }
  });
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeText(value, fallback) {
  if (value === null || value === undefined) return escapeHtml(fallback || '');
  if (typeof value === 'string' && value.trim() === '') return escapeHtml(fallback || '');
  return escapeHtml(value);
}

function normalizeScore(rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return null;
  const scaled = value <= 1 ? value * 100 : value;
  return Math.max(0, Math.min(100, Math.round(scaled)));
}

function formatCategoryLabel(key) {
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatBadge(text) {
  return text ? `<span class="badge">${escapeHtml(text)}</span>` : '';
}

function difficultyClass(value) {
  const normalized = String(value || '').toLowerCase();
  if (normalized.includes('easy')) return 'badge badge-easy';
  if (normalized.includes('hard')) return 'badge badge-hard';
  if (normalized.includes('medium') || normalized.includes('moderate')) return 'badge badge-medium';
  return 'badge';
}

function buildHtml(data) {
  const {
    firstName,
    email,
    calculatorData,
    assessmentData,
    generationDate
  } = data;

  const safeFirstName = safeText(firstName, 'there');

  const overallScoreValue = normalizeScore(
    assessmentData?.overallSleepScore ?? assessmentData?.sleepScore
  );

  const personaName = safeText(
    assessmentData?.personaName || assessmentData?.personaId,
    'Your Sleep Persona'
  );

  const personaDescription = safeText(
    assessmentData?.personaDescription || assessmentData?.description,
    'Every sleep journey is unique. This persona highlights your current sleep profile and the fastest path to improvement.'
  );

  const executiveSummary = assessmentData?.executiveSummary
    ? safeText(assessmentData.executiveSummary, '')
    : `Hi ${safeFirstName} — this blueprint distills your sleep data into a clear, personalized plan so you can wake up energized and focused.`;

  const primaryChallenge = assessmentData?.primaryChallenge
    ? safeText(assessmentData.primaryChallenge, '')
    : 'Clarify your biggest sleep bottleneck to unlock the largest gains first.';

  const categoryScores = assessmentData?.categoryScores || {};
  const categoryEntries = Object.entries(categoryScores).map(([key, value]) => {
    const score = normalizeScore(value) ?? 0;
    const level = score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Needs Work' : 'Critical';
    const barColor = score >= 80 ? '#2d6a4f' : score >= 60 ? '#a8dadc' : score >= 40 ? '#f4a261' : '#e76f51';
    return {
      label: formatCategoryLabel(key),
      score,
      level,
      barColor
    };
  });

  const scheduleSource = assessmentData?.sleepSchedule || calculatorData;
  const scheduleRecommendations = scheduleSource?.recommendations || scheduleSource?.results || [];
  const scheduleTips = scheduleSource?.personalizedTips || [];

  const quickWins = Array.isArray(assessmentData?.quickWins) ? assessmentData.quickWins : [];
  const sevenDayProtocol = Array.isArray(assessmentData?.sevenDayProtocol) ? assessmentData.sevenDayProtocol : [];

  const scheduleRows = scheduleRecommendations.length
    ? scheduleRecommendations.map((result) => {
        const quality = (result.quality || '').toLowerCase();
        const qualityMeta = {
          optimal: { label: 'Optimal', emoji: '✅', rowClass: 'row-optimal' },
          good: { label: 'Good', emoji: '🔵', rowClass: 'row-good' },
          minimum: { label: 'Minimum', emoji: '🟡', rowClass: 'row-minimum' }
        }[quality] || { label: 'Option', emoji: '🟢', rowClass: 'row-default' };

        const details = [
          result.hours ? `${result.hours} hours` : null,
          result.cycles ? `${result.cycles} cycles` : null,
          result.quality ? `${result.quality}` : null
        ].filter(Boolean).join(' · ');

        return `
          <tr class="${qualityMeta.rowClass}">
            <td class="cell-quality">${qualityMeta.emoji} ${qualityMeta.label}</td>
            <td class="cell-time">${safeText(result.time || 'Recommended time', 'Recommended time')}</td>
            <td class="cell-details">${safeText(details || result.useCase || 'Aligned with your target sleep window.', 'Aligned with your target sleep window.')}</td>
          </tr>
        `;
      }).join('')
    : `
        <tr class="row-default">
          <td class="cell-quality">🟢 Personalized</td>
          <td class="cell-time">Add your target time</td>
          <td class="cell-details">Complete the sleep calculator to unlock recommended bedtimes and wake times.</td>
        </tr>
      `;

  const scheduleTipsMarkup = scheduleTips.length
    ? scheduleTips.map((tip) => {
        const tipText = typeof tip === 'string' ? tip : tip.tip;
        const reason = typeof tip === 'string' ? '' : tip.reason;
        return `
          <div class="tip-item">
            <div class="tip-title">${safeText(tipText, 'Personalized tip')}</div>
            ${reason ? `<div class="tip-reason">${safeText(reason, '')}</div>` : ''}
          </div>
        `;
      }).join('')
    : `<div class="tip-item">Enter a target sleep time to receive custom tips.</div>`;

  const quickWinsMarkup = quickWins.length
    ? quickWins.map((win, index) => {
        const steps = Array.isArray(win.steps) && win.steps.length
          ? `<ol class="steps">${win.steps.map(step => `<li>${safeText(step, '')}</li>`).join('')}</ol>`
          : '<p class="muted">Steps will appear here once you complete the assessment.</p>';

        return `
          <div class="card quick-win">
            <div class="card-header">
              <div class="card-title">${index + 1}. ${safeText(win.title || 'Quick Win', 'Quick Win')}</div>
              <div class="badge-row">
                ${win.timing ? formatBadge(win.timing) : ''}
                ${win.expectedImpact ? formatBadge(win.expectedImpact) : ''}
                ${win.difficulty ? `<span class="${difficultyClass(win.difficulty)}">${safeText(win.difficulty, '')}</span>` : ''}
                ${win.timeRequired ? formatBadge(win.timeRequired) : ''}
              </div>
            </div>
            ${win.description ? `<p class="muted">${safeText(win.description, '')}</p>` : ''}
            ${steps}
          </div>
        `;
      }).join('')
    : `
        <div class="card quick-win">
          <div class="card-title">No quick wins yet</div>
          <p class="muted">Complete the Sleep Smarter assessment to unlock your personalized quick wins.</p>
        </div>
      `;

  const protocolMarkup = sevenDayProtocol.length
    ? sevenDayProtocol.map((phase, index) => {
        const actions = Array.isArray(phase.actions) && phase.actions.length
          ? `<ul class="list">${phase.actions.map(action => `<li>${safeText(action, '')}</li>`).join('')}</ul>`
          : '<p class="muted">Add your actions to see a full checklist.</p>';

        const metrics = Array.isArray(phase.successMetrics) && phase.successMetrics.length
          ? `<ul class="list">${phase.successMetrics.map(metric => `<li>${safeText(metric, '')}</li>`).join('')}</ul>`
          : '<p class="muted">Define success metrics to track progress.</p>';

        const tips = Array.isArray(phase.tips) && phase.tips.length
          ? `<ul class="list">${phase.tips.map(tip => `<li>${safeText(tip, '')}</li>`).join('')}</ul>`
          : '<p class="muted">Tips will be customized once your assessment is complete.</p>';

        return `
          <div class="timeline-card">
            <div class="timeline-index">Phase ${index + 1}</div>
            <div class="timeline-days">${safeText(phase.days || 'Days 1-2', 'Days 1-2')}</div>
            <div class="timeline-theme">${safeText(phase.theme || 'Foundation', 'Foundation')}</div>
            ${phase.focus ? `<div class="timeline-focus">${safeText(phase.focus, '')}</div>` : ''}
            <div class="timeline-columns">
              <div>
                <div class="mini-title">Actions</div>
                ${actions}
              </div>
              <div>
                <div class="mini-title">Success Metrics</div>
                ${metrics}
              </div>
              <div>
                <div class="mini-title">Tips</div>
                ${tips}
              </div>
            </div>
          </div>
        `;
      }).join('')
    : `
        <div class="timeline-card">
          <div class="timeline-days">Complete the assessment</div>
          <div class="timeline-theme">Your 7-day protocol will populate here.</div>
        </div>
      `;

  const scoreDisplay = overallScoreValue !== null
    ? `${overallScoreValue}`
    : '—';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sleep Smarter Blueprint</title>
  <style>
    :root {
      --navy: #1a1a2e;
      --dark-blue: #16213e;
      --purple: #4a4e69;
      --teal: #a8dadc;
      --light: #f1faee;
      --white: #ffffff;
      --border: #dfe7ec;
      --muted: #5f6c7b;
      --success: #2d6a4f;
      --warning: #f4a261;
      --danger: #e76f51;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      background: var(--light);
      color: var(--navy);
      line-height: 1.5;
    }

    h1, h2, h3, h4 {
      margin: 0;
    }

    .page {
      page-break-after: always;
      background: var(--light);
      padding: 24px;
      border-radius: 24px;
      border: 1px solid var(--border);
      min-height: 1040px;
      position: relative;
      overflow: hidden;
    }

    .page:last-child {
      page-break-after: auto;
    }

    .page-cover {
      background: linear-gradient(135deg, var(--navy), var(--dark-blue));
      color: var(--light);
      border: none;
    }

    .cover-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 16px;
      border-radius: 999px;
      background: rgba(241, 250, 238, 0.15);
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .logo {
      font-size: 28px;
      font-weight: 700;
      letter-spacing: 0.06em;
    }

    .tagline {
      font-size: 13px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--teal);
    }

    .cover-title {
      font-size: 42px;
      font-weight: 700;
      margin: 20px 0 12px;
    }

    .cover-subtitle {
      font-size: 18px;
      color: rgba(241, 250, 238, 0.85);
      margin-bottom: 28px;
    }

    .cover-meta {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      font-size: 14px;
    }

    .score-hero {
      margin-top: 32px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      align-items: center;
    }

    .score-circle {
      width: 180px;
      height: 180px;
      border-radius: 50%;
      border: 8px solid var(--teal);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: 700;
      color: var(--light);
      background: rgba(168, 218, 220, 0.12);
    }

    .score-label {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: rgba(241, 250, 238, 0.7);
    }

    .persona-card {
      background: rgba(241, 250, 238, 0.12);
      border: 1px solid rgba(168, 218, 220, 0.4);
      border-radius: 18px;
      padding: 20px;
    }

    .persona-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }

    .section-title {
      font-size: 22px;
      font-weight: 700;
      color: var(--dark-blue);
    }

    .card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 18px;
      box-shadow: 0 12px 30px rgba(22, 33, 62, 0.06);
      margin-bottom: 16px;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .grid-two {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
    }

    .grid-three {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }

    .score-bars {
      margin-top: 20px;
    }

    .score-bar {
      margin-bottom: 12px;
    }

    .score-bar-label {
      font-size: 13px;
      font-weight: 600;
      color: var(--dark-blue);
      margin-bottom: 6px;
      display: flex;
      justify-content: space-between;
    }

    .bar-track {
      height: 8px;
      border-radius: 999px;
      background: #e1e8ed;
      overflow: hidden;
    }

    .bar-fill {
      height: 100%;
      border-radius: 999px;
      background: linear-gradient(90deg, var(--teal), #6dbcc7, var(--purple));
    }

    .highlight {
      background: rgba(168, 218, 220, 0.3);
      border: 1px solid rgba(26, 26, 46, 0.1);
      border-radius: 16px;
      padding: 16px;
    }

    .callout {
      background: rgba(74, 78, 105, 0.08);
      border-left: 4px solid var(--purple);
      padding: 14px 16px;
      border-radius: 12px;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    th, td {
      text-align: left;
      padding: 10px 8px;
    }

    th {
      text-transform: uppercase;
      letter-spacing: 0.08em;
      font-size: 11px;
      color: var(--muted);
    }

    tr {
      border-bottom: 1px solid var(--border);
    }

    tr:last-child {
      border-bottom: none;
    }

    .row-optimal { background: rgba(45, 106, 79, 0.12); }
    .row-good { background: rgba(52, 152, 219, 0.12); }
    .row-minimum { background: rgba(244, 162, 97, 0.14); }
    .row-default { background: rgba(168, 218, 220, 0.1); }

    .cell-quality { font-weight: 600; }

    .tip-item {
      padding: 12px 14px;
      border-radius: 12px;
      background: rgba(26, 26, 46, 0.04);
      margin-bottom: 10px;
    }

    .tip-title { font-weight: 600; }
    .tip-reason { color: var(--muted); font-size: 12px; margin-top: 4px; }

    .quick-win .card-title { font-size: 16px; font-weight: 700; }

    .badge-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 10px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 11px;
      font-weight: 600;
      background: rgba(22, 33, 62, 0.08);
      color: var(--dark-blue);
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }

    .badge-easy { background: rgba(45, 106, 79, 0.18); color: var(--success); }
    .badge-medium { background: rgba(244, 162, 97, 0.2); color: #a35d2a; }
    .badge-hard { background: rgba(231, 111, 81, 0.2); color: var(--danger); }

    .steps {
      margin: 10px 0 0 18px;
      padding: 0;
    }

    .steps li { margin-bottom: 6px; }

    .timeline-card {
      background: var(--white);
      border-radius: 18px;
      border: 1px solid var(--border);
      padding: 18px;
      margin-bottom: 16px;
      box-shadow: 0 10px 20px rgba(22, 33, 62, 0.05);
      position: relative;
      page-break-inside: avoid;
      break-inside: avoid;
    }

    .timeline-index {
      position: absolute;
      top: 18px;
      right: 18px;
      background: var(--dark-blue);
      color: var(--light);
      padding: 6px 12px;
      border-radius: 999px;
      font-size: 11px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    .timeline-days {
      font-size: 20px;
      font-weight: 700;
      color: var(--purple);
    }

    .timeline-theme {
      font-size: 16px;
      font-weight: 600;
      margin-top: 6px;
    }

    .timeline-focus { color: var(--muted); margin-top: 4px; }

    .timeline-columns {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
      margin-top: 14px;
    }

    .mini-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 6px;
      color: var(--dark-blue);
    }

    .list { margin: 0; padding-left: 18px; }
    .list li { margin-bottom: 6px; }

    .product-card {
      background: var(--white);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 18px;
      box-shadow: 0 12px 24px rgba(22, 33, 62, 0.06);
    }

    .product-title {
      font-size: 17px;
      font-weight: 700;
      color: var(--dark-blue);
    }

    .product-price {
      font-weight: 700;
      color: var(--purple);
      margin-top: 4px;
    }

    .footer {
      text-align: center;
      color: var(--muted);
      font-size: 11px;
      margin-top: 24px;
    }

    .muted { color: var(--muted); font-size: 13px; }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 18px;
    }

    .page-header .logo { color: var(--dark-blue); font-size: 18px; }
    .page-header .tagline { color: var(--purple); font-size: 10px; }

    .page-number {
      font-size: 11px;
      color: var(--muted);
      text-transform: uppercase;
      letter-spacing: 0.2em;
    }
  </style>
</head>
<body>
  <section class="page page-cover">
    <div class="cover-badge">Sleep Smarter Blueprint</div>
    <div style="margin-top: 28px;">
      <div class="logo">Sleep Smarter</div>
      <div class="tagline">Evidence-Based Sleep Optimization</div>
    </div>
    <div class="cover-title">Your Personalized Sleep Blueprint</div>
    <div class="cover-subtitle">A premium, data-backed roadmap for deep, restorative sleep.</div>
    <div class="cover-meta">
      <div><strong>Generated for:</strong> ${safeText(firstName, 'Sleep Smarter User')}</div>
      <div><strong>Email:</strong> ${safeText(email, 'Not provided')}</div>
      <div><strong>Date:</strong> ${safeText(generationDate, 'Today')}</div>
    </div>
    <div class="score-hero">
      <div>
        <div class="score-label">Overall Sleep Score</div>
        <div class="score-circle">${scoreDisplay}</div>
        <div class="score-label">Out of 100</div>
      </div>
      <div class="persona-card">
        <div class="persona-title">${personaName}</div>
        <div>${personaDescription}</div>
      </div>
    </div>
    <div class="score-bars">
      <div style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: var(--teal);">Your Sleep Score Breakdown</div>
      <div style="font-size: 11px; color: rgba(241, 250, 238, 0.6); margin-bottom: 16px;">Based on your 10-question assessment, here's how you scored across four key areas:</div>
      ${categoryEntries.length ? `
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          ${categoryEntries.map((entry) => {
            const icon = entry.score >= 80 ? '✅' : entry.score >= 60 ? '👍' : entry.score >= 40 ? '⚠️' : '🔴';
            return `
              <tr style="border-bottom: 1px solid rgba(241, 250, 238, 0.1);">
                <td style="padding: 8px 0; color: var(--light); font-weight: 600;">${escapeHtml(entry.label)}</td>
                <td style="padding: 8px 0; color: var(--light); text-align: center;">${entry.score}%</td>
                <td style="padding: 8px 0; text-align: right;">
                  <span style="color: ${entry.barColor}; font-weight: 700;">${icon} ${escapeHtml(entry.level)}</span>
                </td>
              </tr>
            `;
          }).join('')}
        </table>
      ` : '<div class="muted">Complete the sleep assessment to see your category breakdown.</div>'}
    </div>
  </section>

  <section class="page">
    <div class="page-header">
      <div>
        <div class="logo">Sleep Smarter</div>
        <div class="tagline">Personalized Blueprint</div>
      </div>
      <div class="page-number">Page 2</div>
    </div>
    <div class="section-header">
      <div class="section-title">Executive Summary</div>
    </div>
    <div class="card highlight">
      ${executiveSummary}
    </div>
    <div class="section-header">
      <div class="section-title">Primary Challenge</div>
    </div>
    <div class="card callout">
      ${primaryChallenge}
    </div>
    <div class="section-header">
      <div class="section-title">Custom Sleep Schedule</div>
    </div>
    <div class="card">
      <p class="muted">
        ${scheduleSource?.mode === 'wakeup'
          ? `Target wake time: ${safeText(scheduleSource.targetTime || 'Not provided', 'Not provided')}`
          : scheduleSource?.mode === 'bedtime'
            ? `Target bedtime: ${safeText(scheduleSource.targetTime || 'Not provided', 'Not provided')}`
            : 'Add a target bedtime or wake time to personalize this schedule.'}
      </p>
      <table>
        <thead>
          <tr>
            <th>Quality</th>
            <th>Time</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          ${scheduleRows}
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="section-title" style="font-size: 16px; margin-bottom: 10px;">Personalized Schedule Tips</div>
      ${scheduleTipsMarkup}
    </div>
  </section>

  <section class="page">
    <div class="page-header">
      <div>
        <div class="logo">Sleep Smarter</div>
        <div class="tagline">Quick Wins</div>
      </div>
      <div class="page-number">Page 3</div>
    </div>
    <div class="section-header">
      <div class="section-title">Tonight’s Quick Wins</div>
    </div>
    <div class="grid-two">
      ${quickWinsMarkup}
    </div>
  </section>

  <section class="page">
    <div class="page-header">
      <div>
        <div class="logo">Sleep Smarter</div>
        <div class="tagline">7-Day Protocol</div>
      </div>
      <div class="page-number">Page 4</div>
    </div>
    <div class="section-header">
      <div class="section-title">Your 7-Day Sleep Reset</div>
    </div>
    ${protocolMarkup}
  </section>

  <section class="page">
    <div class="page-header">
      <div>
        <div class="logo">Sleep Smarter</div>
        <div class="tagline">Next Steps</div>
      </div>
      <div class="page-number">Page 5</div>
    </div>
    <div class="section-header">
      <div class="section-title">Recommended Resources</div>
    </div>
    <div class="grid-two">
      <div class="product-card">
        <div class="product-title">7-Day Sleep Reset Protocol</div>
        <div class="product-price">$17</div>
        <p class="muted">A guided plan to turn these recommendations into lasting habits.</p>
        <p class="muted">sleepsmarter.io/sleep-reset</p>
      </div>
      <div class="product-card">
        <div class="product-title">Sleep Smarter Masterclass</div>
        <div class="product-price">$67</div>
        <p class="muted">Deep-dive training on sleep science, routines, and performance.</p>
        <p class="muted">sleepsmarter.io/masterclass</p>
      </div>
    </div>
    <div class="card" style="margin-top: 18px;">
      <div class="section-title" style="font-size: 16px; margin-bottom: 8px;">Educational Disclaimer</div>
      <p class="muted">This blueprint is educational and does not replace professional medical advice. For medical concerns, consult a qualified healthcare provider.</p>
    </div>
    <div class="footer">
      © 2026 Sleep Smarter · Visit sleepsmarter.io for more resources
    </div>
  </section>
</body>
</html>
  `;
}

// ─── Kit Webhook Handler ────────────────────────────────────────────────────

const parseJSONField = (fieldValue, fallback) => {
  if (!fieldValue) return fallback;
  try {
    return typeof fieldValue === 'string' ? JSON.parse(fieldValue) : fieldValue;
  } catch (err) {
    console.warn('Failed to parse JSON field:', err.message);
    return fallback;
  }
};

// Kit webhook endpoint — fires on new subscriber activation
app.post('/webhook/kit', async (req, res) => {
  try {
    const { body } = req;
    console.log('Received Kit webhook:', JSON.stringify(body, null, 2));

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

    // Parse calculator data
    let calculatorData = null;
    if (fields.calculator_mode) {
      calculatorData = {
        mode: fields.calculator_mode,
        targetTime: fields.target_time,
        results: parseJSONField(fields.results_json, [])
      };
    }

    // Parse assessment data
    let assessmentData = null;
    const assessmentPayload =
      parseJSONField(fields.assessment_data_json, null) ||
      parseJSONField(fields.assessment_data, null) ||
      parseJSONField(fields.full_assessment_data, null);

    if (assessmentPayload) {
      assessmentData = assessmentPayload;
    } else if (fields.sleep_persona) {
      assessmentData = {
        personaId: fields.sleep_persona,
        personaName: fields.persona_name,
        confidence: parseInt(fields.persona_confidence, 10) || 0,
        recommendations: parseJSONField(fields.persona_recommendations, []),
        overallSleepScore: parseInt(fields.overall_sleep_score, 10) || undefined,
        categoryScores: parseJSONField(fields.category_scores, undefined),
        executiveSummary: fields.executive_summary,
        primaryChallenge: fields.primary_challenge,
        quickWins: parseJSONField(fields.quick_wins, undefined),
        sevenDayProtocol: parseJSONField(fields.seven_day_protocol, undefined),
        sleepSchedule: parseJSONField(fields.sleep_schedule, undefined)
      };
    }

    // Generate PDF using shared helper
    const result = await generatePdf({
      firstName: first_name || 'Sleep Smarter User',
      email: email_address,
      calculatorData,
      assessmentData
    });
    console.log(`PDF generated for ${email_address}: ${result.downloadUrl}`);

    // Return 200 always — Kit retries on non-2xx
    res.json({ success: true, message: 'PDF generated', ...result });

  } catch (error) {
    console.error('Webhook error:', error.message);
    res.status(200).json({
      success: false,
      error: error.message,
      note: 'Error logged, webhook acknowledged to prevent retries'
    });
  }
});

// Test endpoint — manual trigger for QA
app.post('/test/generate', async (req, res) => {
  try {
    const { firstName, email, calculatorData, assessmentData } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required' });

    const result = await generatePdf({
      firstName: firstName || 'Test User',
      email,
      calculatorData,
      assessmentData
    });
    res.json({ success: true, ...result });
  } catch (error) {
    console.error('Test generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ─── Start Server ────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`Sleep Blueprint PDF Service running on port ${PORT}`);
  console.log(`Health:    GET  /health`);
  console.log(`Generate:  POST /generate-blueprint`);
  console.log(`Webhook:   POST /webhook/kit`);
  console.log(`Lookup:    GET  /lookup?email=...`);
  console.log(`Download:  GET  /download/:filename`);
});
