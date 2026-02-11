const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');

class SleepBlueprintGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, '../template.html');
    this.outputDir = path.join(__dirname, '../generated');
    this.ensureOutputDir();
  }

  async ensureOutputDir() {
    try {
      await fs.mkdir(this.outputDir, { recursive: true });
    } catch (error) {
      console.error('Error creating output directory:', error);
    }
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

  getQualityLabel(quality) {
    const labels = {
      'optimal': 'Optimal',
      'good': 'Good',
      'minimum': 'Minimum'
    };
    return labels[quality] || quality;
  }

  getModeSummary(mode, targetTime) {
    if (mode === 'wakeup') {
      return `You need to wake up at ${targetTime}. Based on this, we've calculated your ideal bedtimes to ensure you wake up feeling refreshed.`;
    } else {
      return `You're going to bed at ${targetTime}. Based on this, we've calculated your ideal wake times to maximize sleep quality.`;
    }
  }

  getKeyRecommendation(results) {
    const optimal = results.find(r => r.quality === 'optimal');
    if (optimal) {
      return `Aim for ${optimal.time} (${optimal.cycles} cycles) for optimal sleep whenever possible.`;
    }
    return 'Choose the option that best fits your schedule while prioritizing sleep quality.';
  }

  getProTip(mode) {
    if (mode === 'wakeup') {
      return 'Set multiple alarms: one for your ideal bedtime as a reminder, and another for your wake time.';
    } else {
      return 'Place your alarm clock across the room so you have to get out of bed to turn it off.';
    }
  }

  getModeContext(mode) {
    return mode === 'wakeup' ? 'as your wake time' : 'as your bedtime';
  }

  async compileTemplate(data) {
    try {
      const templateContent = await fs.readFile(this.templatePath, 'utf-8');
      const template = handlebars.compile(templateContent);
      return template(data);
    } catch (error) {
      console.error('Error compiling template:', error);
      throw error;
    }
  }

  async generatePDF(userData) {
    const {
      email,
      mode = 'wakeup',
      targetTime = '07:00',
      results = [],
      userName = 'Sleep Smarter User'
    } = userData;

    // Generate metadata
    const referenceId = this.generateReferenceId();
    const generationDate = this.formatDate();

    // Process results for template
    const scheduleOptions = results.map(result => ({
      time: result.time,
      cycles: result.cycles,
      hours: result.hours,
      quality: result.quality,
      qualityLabel: this.getQualityLabel(result.quality),
      recommendation: result.quality === 'optimal' 
        ? 'Recommended for daily use' 
        : result.quality === 'good'
        ? 'Good alternative'
        : 'Use occasionally'
    }));

    // Prepare template data
    const templateData = {
      userName,
      generationDate,
      referenceId,
      modeSummary: this.getModeSummary(mode, targetTime),
      keyRecommendation: this.getKeyRecommendation(results),
      scheduleOptions,
      proTip: this.getProTip(mode),
      targetTime,
      modeContext: this.getModeContext(mode),
      cycleCount: results.length
    };

    try {
      // Launch browser
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();

      // Generate HTML from template
      const htmlContent = await this.compileTemplate(templateData);

      // Set HTML content
      await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
      });

      // Generate PDF
      const outputPath = path.join(this.outputDir, `${referenceId}.pdf`);
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '40px',
          right: '40px',
          bottom: '40px',
          left: '40px'
        }
      });

      await browser.close();

      console.log(`PDF generated: ${outputPath}`);
      return {
        success: true,
        referenceId,
        filePath: outputPath,
        fileName: `${referenceId}.pdf`,
        downloadUrl: `/blueprints/${referenceId}.pdf`
      };

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  }

  async generateFromCalculator(data) {
    // This method handles data from the sleep calculator
    const {
      email,
      calculator_mode,
      target_time,
      results_json,
      optimal_time,
      cycles_preferred
    } = data;

    // Parse results JSON
    let results = [];
    try {
      results = JSON.parse(results_json || '[]');
    } catch (error) {
      console.error('Error parsing results JSON:', error);
    }

    return this.generatePDF({
      email,
      mode: calculator_mode,
      targetTime: target_time,
      results,
      userName: email ? email.split('@')[0] : 'Sleep Smarter User'
    });
  }
}

// Example usage
if (require.main === module) {
  const generator = new SleepBlueprintGenerator();

  // Example data matching calculator output
  const exampleData = {
    email: 'user@example.com',
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

  generator.generateFromCalculator(exampleData)
    .then(result => {
      console.log('PDF generated successfully:', result);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

module.exports = SleepBlueprintGenerator;