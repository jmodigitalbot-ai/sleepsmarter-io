const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const { buildTemplateData } = require('../content-engine');

class SleepBlueprintGeneratorV2 {
  constructor(options = {}) {
    this.templatePath = options.templatePath || path.join(__dirname, '../template-v2.html');
    this.fallbackTemplatePath = path.join(__dirname, '../template.html');
    this.outputDir = options.outputDir || path.join(__dirname, '../generated');
    this.chromePath = options.chromePath || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    this._templateCache = null;
    this._templateMtime = null;
    this.ensureOutputDir();
    this._registerHelpers();
  }

  async ensureOutputDir() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('Error creating output directory:', error);
    }
  }

  _registerHelpers() {
    // Register Handlebars helpers
    handlebars.registerHelper('eq', (a, b) => a === b);
    handlebars.registerHelper('gt', (a, b) => a > b);
    handlebars.registerHelper('lt', (a, b) => a < b);
    handlebars.registerHelper('or', (a, b) => a || b);
    handlebars.registerHelper('json', (obj) => JSON.stringify(obj));
    handlebars.registerHelper('ifCond', function(v1, operator, v2, options) {
      switch (operator) {
        case '==': return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '>=': return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '<=': return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        default: return options.inverse(this);
      }
    });
  }

  generateReferenceId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `SS-${timestamp}-${random}`.toUpperCase();
  }

  formatDate() {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  async getTemplate() {
    // Template caching with mtime check
    try {
      const stat = await fs.stat(this.templatePath);
      if (this._templateCache && this._templateMtime === stat.mtimeMs) {
        return this._templateCache;
      }
      const content = await fs.readFile(this.templatePath, 'utf-8');
      this._templateCache = handlebars.compile(content);
      this._templateMtime = stat.mtimeMs;
      return this._templateCache;
    } catch (error) {
      console.warn('V2 template not found, falling back to v1:', error.message);
      const content = await fs.readFile(this.fallbackTemplatePath, 'utf-8');
      return handlebars.compile(content);
    }
  }

  /**
   * Generate a personalized blueprint PDF
   * 
   * @param {Object} options
   * @param {string} options.email - User email
   * @param {string} options.userName - User's first name
   * @param {Object} options.calculatorData - Calculator results { mode, targetTime, results }
   * @param {Object} options.assessmentData - Assessment results { personaId, personaName, confidence, recommendations, description }
   * @returns {Object} { success, referenceId, filePath, fileName, downloadUrl }
   */
  async generatePersonalizedBlueprint({ email, userName, calculatorData, assessmentData }) {
    const referenceId = this.generateReferenceId();
    const generationDate = this.formatDate();
    const startTime = Date.now();

    console.log(`[${referenceId}] Generating personalized blueprint for ${email}`);
    console.log(`[${referenceId}] Persona: ${assessmentData?.personaId || 'unknown'} (${assessmentData?.confidence || 'N/A'}% confidence)`);

    // Build template data using content engine
    const templateData = buildTemplateData({
      userName: userName || (email ? email.split('@')[0] : 'Sleep Smarter User'),
      calculatorData,
      assessmentData,
      referenceId,
      generationDate
    });

    try {
      // Compile template
      const template = await this.getTemplate();
      const htmlContent = template(templateData);

      // Launch browser and generate PDF
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: this.chromePath,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
      });

      const page = await browser.newPage();
      
      // Set viewport for consistent rendering
      await page.setViewport({ width: 800, height: 1100 });
      
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0',
        timeout: 15000
      });

      // Generate PDF
      const outputPath = path.join(this.outputDir, `${referenceId}.pdf`);
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0'
        }
      });

      await browser.close();

      const duration = Date.now() - startTime;
      const fileStats = await fs.stat(outputPath);
      
      console.log(`[${referenceId}] PDF generated in ${duration}ms (${(fileStats.size / 1024).toFixed(0)}KB)`);

      return {
        success: true,
        referenceId,
        filePath: outputPath,
        fileName: `${referenceId}.pdf`,
        downloadUrl: `/blueprints/${referenceId}.pdf`,
        metadata: {
          persona: assessmentData?.personaId || 'undiagnosed',
          personaName: assessmentData?.personaName || 'The Complex Sleeper',
          sleepScore: templateData.sleepScore,
          generationTimeMs: duration,
          fileSizeKB: Math.round(fileStats.size / 1024)
        }
      };

    } catch (error) {
      console.error(`[${referenceId}] Generation failed:`, error);
      throw error;
    }
  }

  /**
   * Generate from Kit webhook data (backward-compatible)
   */
  async generateFromWebhook(webhookData) {
    const {
      email_address,
      first_name,
      fields = {}
    } = webhookData;

    // Parse calculator results
    let results = [];
    try {
      results = JSON.parse(fields.results_json || '[]');
    } catch (e) {
      console.warn('Failed to parse results_json:', e.message);
    }

    // Parse assessment data
    let assessmentData = null;
    if (fields.sleep_persona) {
      let recommendations = [];
      try {
        recommendations = JSON.parse(fields.persona_recommendations || '[]');
      } catch (e) {
        // recommendations stay empty
      }

      assessmentData = {
        personaId: fields.sleep_persona,
        personaName: fields.persona_name || 'Unknown',
        confidence: parseInt(fields.persona_confidence) || 75,
        recommendations,
        description: ''
      };
    }

    return this.generatePersonalizedBlueprint({
      email: email_address,
      userName: first_name || (email_address ? email_address.split('@')[0] : null),
      calculatorData: {
        mode: fields.calculator_mode || 'wakeup',
        targetTime: fields.target_time || '07:00',
        results
      },
      assessmentData
    });
  }

  /**
   * Generate from direct API call (backward-compatible with v1)
   */
  async generateFromCalculator(data) {
    const {
      email,
      calculator_mode,
      target_time,
      results_json,
      optimal_time,
      cycles_preferred,
      // v2 fields
      sleep_persona,
      persona_name,
      persona_confidence,
      persona_recommendations
    } = data;

    let results = [];
    try {
      results = JSON.parse(results_json || '[]');
    } catch (e) {
      console.warn('Failed to parse results_json:', e.message);
    }

    let assessmentData = null;
    if (sleep_persona) {
      let recommendations = [];
      try {
        recommendations = JSON.parse(persona_recommendations || '[]');
      } catch (e) {}

      assessmentData = {
        personaId: sleep_persona,
        personaName: persona_name || 'Unknown',
        confidence: parseInt(persona_confidence) || 75,
        recommendations,
        description: ''
      };
    }

    return this.generatePersonalizedBlueprint({
      email,
      calculatorData: {
        mode: calculator_mode || 'wakeup',
        targetTime: target_time || '07:00',
        results
      },
      assessmentData
    });
  }

  /**
   * Legacy v1 compatibility
   */
  async generatePDF(userData) {
    return this.generatePersonalizedBlueprint({
      email: userData.email,
      userName: userData.userName,
      calculatorData: {
        mode: userData.mode || 'wakeup',
        targetTime: userData.targetTime || '07:00',
        results: userData.results || []
      },
      assessmentData: userData.assessmentData || null
    });
  }
}

// CLI test mode
if (require.main === module) {
  const generator = new SleepBlueprintGeneratorV2();

  // Test with each persona
  const testPersona = process.argv[2] || 'restless_mind';
  
  const testData = {
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
      personaId: testPersona,
      personaName: `Test Persona (${testPersona})`,
      confidence: 82,
      recommendations: [
        'Practice bedtime meditation',
        'Create a wind-down routine',
        'Try progressive muscle relaxation'
      ],
      description: 'Test persona for PDF generation'
    }
  };

  console.log(`\nGenerating test blueprint for persona: ${testPersona}\n`);
  
  generator.generatePersonalizedBlueprint(testData)
    .then(result => {
      console.log('\n✅ PDF generated successfully:');
      console.log(`   Reference: ${result.referenceId}`);
      console.log(`   File: ${result.filePath}`);
      console.log(`   Size: ${result.metadata.fileSizeKB}KB`);
      console.log(`   Time: ${result.metadata.generationTimeMs}ms`);
      console.log(`   Persona: ${result.metadata.personaName}`);
      console.log(`   Score: ${result.metadata.sleepScore}/100`);
    })
    .catch(error => {
      console.error('\n❌ Generation failed:', error);
      process.exit(1);
    });
}

module.exports = SleepBlueprintGeneratorV2;
