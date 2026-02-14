#!/usr/bin/env node

/**
 * Enhanced Sleep Blueprint PDF Generator v2.0
 * Generates personalized, interactive PDFs with actionable insights
 * based on sleep calculator results and assessment data.
 */

const fs = require('fs').promises;
const path = require('path');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const QRCode = require('qrcode');

class EnhancedSleepBlueprintGenerator {
  constructor() {
    this.templatePath = path.join(__dirname, 'templates/enhanced-blueprint.html');
    this.outputDir = path.join(__dirname, '../generated/v2');
    this.assetsDir = path.join(__dirname, 'assets');
    this.ensureDirectories();
    
    // Register Handlebars helpers
    this.registerHelpers();
  }
  
  async ensureDirectories() {
    const dirs = [this.outputDir, this.assetsDir];
    for (const dir of dirs) {
      try {
        await fs.mkdir(dir, { recursive: true });
      } catch (error) {
        console.error(`Error creating directory ${dir}:`, error);
      }
    }
  }
  
  registerHelpers() {
    // Helper for conditional content
    handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
    
    // Helper for array iteration with index
    handlebars.registerHelper('eachWithIndex', function(array, options) {
      let result = '';
      for (let i = 0; i < array.length; i++) {
        result += options.fn({ ...array[i], index: i, isFirst: i === 0, isLast: i === array.length - 1 });
      }
      return result;
    });
    
    // Helper for quality color class
    handlebars.registerHelper('qualityClass', function(quality) {
      const classes = {
        'optimal': 'optimal',
        'good': 'good',
        'minimum': 'minimum'
      };
      return classes[quality] || '';
    });
    
    // Helper for quality label
    handlebars.registerHelper('qualityLabel', function(quality) {
      const labels = {
        'optimal': 'Optimal',
        'good': 'Good',
        'minimum': 'Minimum'
      };
      return labels[quality] || quality;
    });
  }
  
  generateReferenceId() {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 8);
    return `SSV2-${timestamp}-${random}`.toUpperCase();
  }
  
  formatDate() {
    return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  
  /**
   * Calculate insights from assessment data
   */
  calculateInsights(assessment) {
    if (!assessment) return {};
    
    const insights = {
      circadianType: 'intermediate',
      sleepEfficiency: 85,
      recoveryNeed: 'moderate',
      chronotypeAlignment: 'aligned',
      improvementPotential: 32,
      riskFactors: []
    };
    
    // Determine circadian type based on responses
    if (assessment.responses) {
      const wakeTime = assessment.responses.wakeTimeConsistency;
      const bedtime = assessment.responses.bedtimeConsistency;
      
      if (wakeTime === 'early_consistent' && bedtime === 'early_consistent') {
        insights.circadianType = 'early_bird';
      } else if (wakeTime === 'late_consistent' && bedtime === 'late_consistent') {
        insights.circadianType = 'night_owl';
      }
    }
    
    // Calculate sleep efficiency
    if (assessment.responses?.sleepLatency && assessment.responses?.nighttimeAwakenings) {
      let efficiency = 85; // Base
      
      if (assessment.responses.sleepLatency === '30+_minutes') efficiency -= 10;
      if (assessment.responses.sleepLatency === '20-30_minutes') efficiency -= 5;
      
      if (assessment.responses.nighttimeAwakenings === '4-5_times') efficiency -= 10;
      if (assessment.responses.nighttimeAwakenings === '5+_times') efficiency -= 15;
      
      insights.sleepEfficiency = Math.max(50, Math.min(95, efficiency));
    }
    
    // Determine recovery need based on sleep score
    if (assessment.sleepScore) {
      if (assessment.sleepScore < 40) insights.recoveryNeed = 'high';
      else if (assessment.sleepScore < 60) insights.recoveryNeed = 'moderate';
      else if (assessment.sleepScore < 80) insights.recoveryNeed = 'low';
      else insights.recoveryNeed = 'minimal';
    }
    
    // Identify risk factors
    if (assessment.responses) {
      if (assessment.responses.screenUsage === 'frequent' || assessment.responses.screenUsage === 'always') {
        insights.riskFactors.push('High screen time before bed');
      }
      if (assessment.responses.caffeineTiming === 'evening') {
        insights.riskFactors.push('Late caffeine consumption');
      }
      if (assessment.responses.stressLevels === 'high' || assessment.responses.stressLevels === 'very_high') {
        insights.riskFactors.push('Elevated stress levels');
      }
      if (assessment.responses.bedroomEnvironment === 'not_conducive') {
        insights.riskFactors.push('Suboptimal sleep environment');
      }
    }
    
    // Calculate improvement potential
    insights.improvementPotential = 100 - (assessment.sleepScore || 68);
    
    return insights;
  }
  
  /**
   * Generate personalized recommendations
   */
  generateRecommendations(userProfile, insights) {
    const recommendations = {
      quickWins: [],
      sevenDayProtocol: [],
      longTermOptimization: [],
      personalizedPlan: []
    };
    
    const { assessment } = userProfile;
    const primaryChallenge = assessment?.primaryChallenge || 'falling_asleep';
    
    // Quick wins based on primary challenge
    recommendations.quickWins = this.getQuickWinsForChallenge(primaryChallenge, assessment?.responses);
    
    // 7-day protocol based on sleep score
    const scoreRange = this.getScoreRange(assessment?.sleepScore || 68);
    recommendations.sevenDayProtocol = this.getProtocolForScoreRange(scoreRange, primaryChallenge);
    
    // Long-term optimization based on lifestyle factors
    recommendations.longTermOptimization = this.getLifestyleOptimizations(assessment?.responses);
    
    // Personalized 30-day plan
    recommendations.personalizedPlan = this.create30DayPlan(
      recommendations.quickWins,
      recommendations.sevenDayProtocol,
      recommendations.longTermOptimization,
      insights
    );
    
    return recommendations;
  }
  
  getQuickWinsForChallenge(challenge, responses) {
    const quickWins = {
      falling_asleep: [
        {
          id: 'fw1',
          title: '4-7-8 Breathing Exercise',
          description: 'Calms nervous system and reduces sleep latency',
          steps: [
            'Inhale quietly through nose for 4 seconds',
            'Hold breath for 7 seconds',
            'Exhale completely through mouth for 8 seconds',
            'Repeat 4 times'
          ],
          timing: '10 minutes before bed',
          science: 'Activates parasympathetic nervous system'
        },
        {
          id: 'fw2',
          title: 'Cool Room Optimization',
          description: 'Lower room temperature for faster sleep onset',
          steps: [
            'Set thermostat to 67°F (19.5°C)',
            'Use light bedding',
            'Consider cooling mattress pad if needed'
          ],
          timing: '1 hour before bed',
          science: 'Core body temperature drop triggers sleepiness'
        }
      ],
      staying_asleep: [
        {
          id: 'sw1',
          title: 'White Noise Setup',
          description: 'Mask disruptive noises that cause awakenings',
          steps: [
            'Download white noise app (e.g., White Noise Lite)',
            'Set volume to 50-60 dB',
            'Place phone across the room'
          ],
          timing: 'All night',
          science: 'Creates consistent auditory environment'
        },
        {
          id: 'sw2',
          title: 'Hydration Timing Adjustment',
          description: 'Prevent nighttime bathroom trips',
          steps: [
            'Stop drinking fluids 90 minutes before bed',
            'Have last small sip at 8:30 PM',
            'Use bathroom right before getting in bed'
          ],
          timing: 'Evening',
          science: 'Reduces bladder pressure during sleep'
        }
      ],
      waking_early: [
        {
          id: 'ew1',
          title: 'Early Morning Light Block',
          description: 'Prevent premature awakening from light',
          steps: [
            'Install blackout curtains',
            'Use sleep mask',
            'Cover electronic device lights'
          ],
          timing: 'All night',
          science: 'Light suppresses melatonin production'
        }
      ],
      poor_quality: [
        {
          id: 'qw1',
          title: 'Sleep Position Optimization',
          description: 'Improve sleep architecture and reduce tossing',
          steps: [
            'Use supportive pillow for neck alignment',
            'Consider side sleeping if you snore',
            'Place pillow between knees if side sleeping'
          ],
          timing: 'When getting in bed',
          science: 'Proper alignment reduces micro-awakenings'
        }
      ]
    };
    
    // Add screen-related quick win if applicable
    if (responses?.screenUsage === 'frequent' || responses?.screenUsage === 'always') {
      quickWins[challenge].push({
        id: 'screen1',
        title: 'Digital Sunset Implementation',
        description: 'Reduce blue light exposure before bed',
        steps: [
          'Enable Night Shift/Blue Light Filter at 8:30 PM',
          'Switch to audiobook/podcast after 9:00 PM',
          'Charge phone outside bedroom'
        ],
        timing: '60 minutes before bed',
        science: 'Blue light suppresses melatonin by up to 50%'
      });
    }
    
    return quickWins[challenge] || quickWins.falling_asleep;
  }
  
  getScoreRange(score) {
    if (score < 40) return 'critical';
    if (score < 60) return 'needs_work';
    if (score < 80) return 'good';
    return 'excellent';
  }
  
  getProtocolForScoreRange(scoreRange, primaryChallenge) {
    const protocols = {
      critical: [
        { day: 1, focus: 'Consistent Wake Time', action: 'Set alarm for same time every day' },
        { day: 2, focus: 'Morning Sunlight', action: '15 minutes outside within 30 min of waking' },
        { day: 3, focus: 'Caffeine Cutoff', action: 'No caffeine after 12 PM' },
        { day: 4, focus: 'Digital Sunset', action: 'No screens 60 min before bed' },
        { day: 5, focus: 'Bedroom Environment', action: 'Optimize temperature, light, noise' },
        { day: 6, focus: 'Wind-down Routine', action: '30-min pre-sleep relaxation' },
        { day: 7, focus: 'Progress Review', action: 'Assess improvements and adjust' }
      ],
      needs_work: [
        { day: 1, focus: 'Wake Time Anchor', action: 'Wake within 30 min of target daily' },
        { day: 2, focus: 'Light Exposure', action: '10 min morning sun + dim lights evening' },
        { day: 3, focus: 'Caffeine Timing', action: 'Last caffeine by 2 PM' },
        { day: 4, focus: 'Screen Management', action: 'Blue light filter + 45-min cutoff' },
        { day: 5, focus: 'Sleep Sanctuary', action: 'Complete bedroom optimization' },
        { day: 6, focus: 'Evening Ritual', action: 'Personalized wind-down routine' },
        { day: 7, focus: 'Habit Integration', action: 'Choose 3 habits to maintain' }
      ],
      good: [
        { day: 1, focus: 'Fine-tuning', action: 'Adjust wake time by 15 min if needed' },
        { day: 2, focus: 'Light Optimization', action: 'Maximize morning, minimize evening light' },
        { day: 3, focus: 'Nutrition Timing', action: 'Last meal 3 hours before bed' },
        { day: 4, focus: 'Digital Hygiene', action: 'Screen-free bedroom policy' },
        { day: 5, focus: 'Stress Management', action: 'Evening meditation or journaling' },
        { day: 6, focus: 'Sleep Quality', action: 'Track and optimize sleep stages' },
        { day: 7, focus: 'Maintenance Plan', action: 'Create sustainable sleep routine' }
      ],
      excellent: [
        { day: 1, focus: 'Maintenance', action: 'Review and reinforce good habits' },
        { day: 2, focus: 'Prevention', action: 'Identify and address potential issues' },
        { day: 3, focus: 'Optimization', action: 'Fine-tune for peak performance' },
        { day: 4, focus: 'Education', action: 'Learn one new sleep science fact' },
        { day: 5, focus: 'Sharing', action: 'Help someone else improve their sleep' },
        { day: 6, focus: 'Advanced Techniques', action: 'Try sleep tracking or biohacking' },
        { day: 7, focus: 'Long-term Planning', action: 'Set 90-day sleep goals' }
      ]
    };
    
    return protocols[scoreRange] || protocols.needs_work;
  }
  
  getLifestyleOptimizations(responses) {
    const optimizations = [];
    
    if (!responses) return optimizations;
    
    if (responses.screenUsage === 'frequent' || responses.screenUsage === 'always') {
      optimizations.push({
        category: 'Digital Wellness',
        recommendations: [
          'Implement "phone-free" hours (8 PM - 8 AM)',
          'Use blue light blocking glasses after sunset',
          'Create screen-free zones in home'
        ]
      });
    }
    
    if (responses.caffeineTiming === 'evening' || responses.caffeineTiming === 'after_4pm') {
      optimizations.push({
        category: 'Caffeine Management',
        recommendations: [
          'Gradually move caffeine cutoff earlier (15 min/day)',
          'Switch to decaf after 12 PM',
          'Try caffeine alternatives (matcha, yerba mate)'
        ]
      });
    }
    
    if (responses.stressLevels === 'high' || responses.stressLevels === 'very_high') {
      optimizations.push({
        category: 'Stress Reduction',
        recommendations: [
          'Daily 10-minute meditation practice',
          'Evening gratitude journal',
          'Progressive muscle relaxation before bed'
        ]
      });
    }
    
    if (responses.bedroomEnvironment === 'somewhat_comfortable' || 
        responses.bedroomEnvironment === 'not_conducive') {
      optimizations.push({
        category: 'Sleep Environment',
        recommendations: [
          'Invest in quality mattress and pillows',
          'Install blackout curtains',
          'Use white noise machine or app'
        ]
      });
    }
    
    return optimizations;
  }
  
  create30DayPlan(quickWins, protocol, optimizations, insights) {
    const plan = [];
    
    // Week 1: Foundation (Days 1-7)
    plan.push({
      week: 1,
      focus: 'Establish Foundation',
      goals: [
        'Implement 2 quick wins consistently',
        'Complete 7-day sleep reset protocol',
        'Track sleep schedule daily'
      ],
      successMetrics: [
        'Bedtime within 30 min of target',
        'Wake time within 30 min of target',
        'Complete protocol days 1-7'
      ]
    });
    
    // Week 2: Environment (Days 8-14)
    plan.push({
      week: 2,
      focus: 'Optimize Environment',
      goals: [
        'Create perfect sleep sanctuary',
        'Establish digital sunset routine',
        'Master wind-down ritual'
      ],
      successMetrics: [
        'Bedroom score 8/10 or higher',
        'Screen-free 60 min before bed',
        'Sleep latency <15 minutes'
      ]
    });
    
    // Week 3: Habit Formation (Days 15-21)
    plan.push({
      week: 3,
      focus: 'Habit Formation',
      goals: [
        'Automate sleep routine',
        'Integrate stress management',
        'Optimize nutrition timing'
      ],
      successMetrics: [
        '80%+ routine adherence',
        'Morning energy 4/5 or higher',
        'Consistent sleep efficiency >85%'
      ]
    });
    
    // Week 4: Maintenance (Days 22-30)
    plan.push({
      week: 4,
      focus: 'Maintenance & Growth',
      goals: [
        'Solidify long-term habits',
        'Address remaining challenges',
        'Plan for continued improvement'
      ],
      successMetrics: [
        'Habit automation complete',
        'Sleep score improvement >10 points',
        'Created personal maintenance plan'
      ]
    });
    
    return plan;
  }
  
  /**
   * Prepare visualization data for template
   */
  prepareVisualizations(userProfile, insights) {
    const { calculator, assessment } = userProfile;
    
    // Sleep score chart data
    const sleepScoreChart = {
      overall: assessment?.sleepScore || 68,
      categories: [
        { name: 'Sleep Patterns', score: assessment?.categoryScores?.sleepPatterns || 75 },
        { name: 'Sleep Quality', score: assessment?.categoryScores?.sleepQuality || 60 },
        { name: 'Lifestyle', score: assessment?.categoryScores?.lifestyle || 70 },
        { name: 'Environment', score: assessment?.categoryScores?.environment || 65 }
      ]
    };
    
    // Sleep cycle timeline
    const sleepCycleTimeline = {
      cycles: calculator?.results?.map(result => ({
        time: result.time,
        cycles: result.cycles,
        quality: result.quality,
        duration: result.hours * 60 // Convert to minutes
      })) || [],
      optimalCycle: calculator?.results?.find(r => r.quality === 'optimal') || { time: '9:30 PM', cycles: 6 }
    };
    
    // Circadian curve data
    const circadianCurve = {
      type: insights.circadianType,
      optimalSleepWindow: {
        start: '10:00 PM',
        end: '7:00 AM',
        peakDeepSleep: '12:00 AM - 2:00 AM'
      },
      energyLevels: [
        { time: '6:00 AM', energy: 30 },
        { time: '9:00 AM', energy: 85 },
        { time: '12:00 PM', energy: 75 },
        { time: '3:00 PM', energy: 65 },
        { time: '6:00 PM', energy: 70 },
        { time: '9:00 PM', energy: 50 },
        { time: '12:00 AM', energy: 20 }
      ]
    };
    
    // Progress tracker
    const progressTracker = {
      weeks: [
        { week: 1, focus: 'Foundation', completed: false },
        { week: 2, focus: 'Environment', completed: false },
        { week: 3, focus: 'Habits', completed: false },
        { week: 4, focus: 'Maintenance', completed: false }
      ],
      milestones: [
        { day: 7, milestone: 'Complete 7-day protocol' },
        { day: 14, milestone: 'Establish sleep sanctuary' },
        { day: 21, milestone: 'Form 3 key habits' },
        { day: 30, milestone: 'Achieve sleep goals' }
      ]
    };
    
    // Challenge matrix
    const challengeMatrix = {
      primary: assessment?.primaryChallenge || 'falling_asleep',
      challenges: [
        { challenge: 'Falling asleep', severity: 'high', solutions: 3 },
        { challenge: 'Staying asleep', severity: 'medium', solutions: 2 },
        { challenge: 'Waking early', severity: 'low', solutions: 1 },
        { challenge: 'Poor quality', severity: 'medium', solutions: 2 }
      ]
    };
    
    return {
      sleepScoreChart,
      sleepCycleTimeline,
      circadianCurve,
      progressTracker,
      challengeMatrix
    };
  }
  
  /**
   * Generate QR codes for resources
   */
  async generateQRCodes(email) {
    const baseUrl = 'https://sleepsmarter.io';
    const qrCodes = {};
    
    const resources = {
      community: `${baseUrl}/community?ref=${email}`,
      resources: `${baseUrl}/resources?ref=${email}`,
      coaching: `${baseUrl}/coaching?ref=${email}`,
      tracker: `${baseUrl}/tracker?ref=${email}`
    };
    
    // Generate QR codes as data URLs
    for (const [key, url] of Object.entries(resources)) {
      try {
        const dataUrl = await QRCode.toDataURL(url, {
          width: 200,
          margin: 1,
          color: {
            dark: '#16213e',
            light: '#ffffff'
          }
        });
        qrCodes[key] = dataUrl;
      } catch (error) {
        console.error(`Error generating QR code for ${key}:`, error);
        qrCodes[key] = '';
      }
    }
    
    return qrCodes;
  }
  
  /**
   * Compile and render HTML template
   */
  async compileTemplate(templateData) {
    try {
      // Read template file
      const templateContent = await fs.readFile(this.templatePath, 'utf-8');
      
      // Compile with Handlebars
      const template = handlebars.compile(templateContent);
      
      // Render with data
      return template(templateData);
    } catch (error) {
      console.error('Error compiling template:', error);
      
      // Fallback to basic template if enhanced template not found
      if (error.code === 'ENOENT') {
        console.log('Enhanced template not found, using basic template');
        return this.createBasicTemplate(templateData);
      }
      
      throw error;
    }
  }
  
  /**
   * Create basic template as fallback
   */
  createBasicTemplate(data) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #16213e; }
          .user-info { background: #f1faee; padding: 20px; border-radius: 10px; }
        </style>
      </head>
      <body>
        <h1>Your Sleep Blueprint</h1>
        <div class="user-info">
          <p>Generated for: ${data.userName}</p>
          <p>Date: ${data.generationDate}</p>
          <p>Sleep Score: ${data.assessment?.sleepScore || 'N/A'}/100</p>
        </div>
        <p>Your personalized sleep blueprint is being generated. Please check back later for the enhanced version.</p>
      </body>
      </html>
    `;
  }
  
  /**
   * Generate enhanced PDF from user profile
   */
  async generateEnhancedPDF(userProfile) {
    try {
      console.log('Generating enhanced PDF for:', userProfile.email);
      
      // Calculate insights
      const insights = this.calculateInsights(userProfile.assessment);
      
      // Generate recommendations
      const recommendations = this.generateRecommendations(userProfile, insights);
      
      // Prepare visualizations
      const visualizations = this.prepareVisualizations(userProfile, insights);
      
      // Generate QR codes
      const qrCodes = await this.generateQRCodes(userProfile.email);
      
      // Generate reference ID
      const referenceId = this.generateReferenceId();
      const generationDate = this.formatDate();
      
      // Prepare template data
      const templateData = {
        // User info
        userName: userProfile.firstName || userProfile.email.split('@')[0],
        email: userProfile.email,
        generationDate,
        referenceId,
        
        // Calculator data
        calculator: userProfile.calculator || {},
        
        // Assessment data
        assessment: userProfile.assessment || {},
        
        // Generated content
        insights,
        recommendations,
        visualizations,
        qrCodes,
        
        // Helper flags
        hasAssessment: !!userProfile.assessment,
        hasQuickWins: recommendations.quickWins.length > 0,
        hasOptimizations: recommendations.longTermOptimization.length > 0,
        riskFactorsCount: insights.riskFactors?.length || 0
      };
      
      // Compile template
      const htmlContent = await this.compileTemplate(templateData);
      
      // Launch browser for PDF generation
      const browser = await puppeteer.launch({
        headless: 'new',
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
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
      
      console.log(`✅ Enhanced PDF generated: ${outputPath}`);
      
      // Track generation event
      this.trackGenerationEvent(userProfile, referenceId, 'success');
      
      return {
        success: true,
        referenceId,
        filePath: outputPath,
        fileName: `${referenceId}.pdf`,
        downloadUrl: `/blueprints/v2/${referenceId}.pdf`,
        metadata: {
          generationDate,
          sleepScore: userProfile.assessment?.sleepScore,
          primaryChallenge: userProfile.assessment?.primaryChallenge,
          quickWinsCount: recommendations.quickWins.length
        }
      };
      
    } catch (error) {
      console.error('Error generating enhanced PDF:', error);
      
      // Track error event
      this.trackGenerationEvent(userProfile, null, 'error', error.message);
      
      throw error;
    }
  }
  
  /**
   * Generate PDF from calculator data (backward compatibility)
   */
  async generateFromCalculator(data) {
    // Map calculator data to user profile format
    const userProfile = {
      email: data.email,
      firstName: data.email ? data.email.split('@')[0] : 'Sleep Smarter User',
      calculator: {
        mode: data.calculator_mode || data.mode,
        targetTime: data.target_time || data.targetTime,
        results: data.results_json ? JSON.parse(data.results_json) : [],
        optimalTime: data.optimal_time,
        preferredCycles: data.cycles_preferred
      }
    };
    
    return this.generateEnhancedPDF(userProfile);
  }
  
  /**
   * Generate PDF with assessment data
   */
  async generateWithAssessment(userData) {
    const userProfile = {
      email: userData.email,
      firstName: userData.firstName || userData.email.split('@')[0],
      calculator: userData.calculator,
      assessment: userData.assessment
    };
    
    return this.generateEnhancedPDF(userProfile);
  }
  
  /**
   * Track PDF generation events
   */
  trackGenerationEvent(userProfile, referenceId, status, error = null) {
    const event = {
      timestamp: new Date().toISOString(),
      userId: userProfile.email,
      referenceId,
      status,
      error,
      metadata: {
        hasAssessment: !!userProfile.assessment,
        hasCalculator: !!userProfile.calculator,
        sleepScore: userProfile.assessment?.sleepScore
      }
    };
    
    // In production, send to analytics service
    console.log('📊 Generation Event:', JSON.stringify(event, null, 2));
    
    // Log to file for debugging
    this.logEventToFile(event);
  }
  
  async logEventToFile(event) {
    const logPath = path.join(this.outputDir, 'generation-log.jsonl');
    const logEntry = JSON.stringify(event) + '\n';
    
    try {
      await fs.appendFile(logPath, logEntry);
    } catch (error) {
      console.error('Error logging event:', error);
    }
  }
  
  /**
   * Test function with sample data
   */
  async testGeneration() {
    console.log('🧪 Testing enhanced PDF generation...');
    
    const sampleProfile = {
      email: 'test@example.com',
      firstName: 'Test',
      calculator: {
        mode: 'wakeup',
        targetTime: '07:00',
        results: [
          { time: '9:30 PM', cycles: 6, hours: 9, quality: 'optimal' },
          { time: '11:00 PM', cycles: 5, hours: 7.5, quality: 'good' },
          { time: '12:30 AM', cycles: 4, hours: 6, quality: 'minimum' }
        ],
        optimalTime: '9:30 PM',
        preferredCycles: 6
      },
      assessment: {
        sleepScore: 68,
        categoryScores: {
          sleepPatterns: 75,
          sleepQuality: 60,
          lifestyle: 70,
          environment: 65
        },
        primaryChallenge: 'falling_asleep',
        secondaryChallenge: 'screen_time',
        responses: {
          wakeTimeConsistency: 'inconsistent',
          bedtimeConsistency: 'somewhat_consistent',
          sleepLatency: '20-30_minutes',
          nighttimeAwakenings: '2-3_times',
          morningRefreshment: 'tired',
          daytimeSleepiness: 'frequent',
          screenUsage: 'frequent',
          caffeineTiming: 'after_4pm',
          bedroomEnvironment: 'somewhat_comfortable',
          stressLevels: 'moderate'
        }
      }
    };
    
    try {
      const result = await this.generateEnhancedPDF(sampleProfile);
      console.log('✅ Test generation successful!');
      console.log('Result:', result);
      return result;
    } catch (error) {
      console.error('❌ Test generation failed:', error);
      throw error;
    }
  }
}

// Command line interface
if (require.main === module) {
  const generator = new EnhancedSleepBlueprintGenerator();
  
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'test':
      generator.testGeneration()
        .then(result => {
          console.log('Test completed successfully');
          process.exit(0);
        })
        .catch(error => {
          console.error('Test failed:', error);
          process.exit(1);
        });
      break;
      
    case 'generate':
      // Parse JSON data from command line or file
      const dataArg = args[1];
      let userData;
      
      try {
        if (dataArg.startsWith('{')) {
          // JSON string directly
          userData = JSON.parse(dataArg);
        } else if (dataArg.endsWith('.json')) {
          // JSON file
          const fileContent = fs.readFileSync(dataArg, 'utf-8');
          userData = JSON.parse(fileContent);
        } else {
          throw new Error('Invalid data format. Provide JSON string or .json file path');
        }
        
        generator.generateEnhancedPDF(userData)
          .then(result => {
            console.log(JSON.stringify(result, null, 2));
            process.exit(0);
          })
          .catch(error => {
            console.error('Generation failed:', error);
            process.exit(1);
          });
      } catch (error) {
        console.error('Error parsing input:', error);
        process.exit(1);
      }
      break;
      
    case 'help':
    default:
      console.log(`
Enhanced Sleep Blueprint PDF Generator v2.0
Usage: node pdf-generator.js [command] [options]

Commands:
  test           - Generate test PDF with sample data
  generate <data> - Generate PDF from JSON data (string or file path)
  help          - Show this help message

Examples:
  node pdf-generator.js test
  node pdf-generator.js generate '{"email":"test@example.com","calculator":{...}}'
  node pdf-generator.js generate data.json

Data Format:
  {
    "email": "user@example.com",
    "firstName": "Optional",
    "calculator": {
      "mode": "wakeup",
      "targetTime": "07:00",
      "results": [...]
    },
    "assessment": {
      "sleepScore": 68,
      "primaryChallenge": "falling_asleep",
      "responses": {...}
    }
  }
      `);
      break;
  }
}

module.exports = EnhancedSleepBlueprintGenerator;