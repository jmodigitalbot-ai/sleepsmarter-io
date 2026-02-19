/**
 * Comprehensive test suite for Sleep Blueprint Generator v2
 */
const SleepBlueprintGeneratorV2 = require('./index-v2');
const { buildTemplateData, PERSONA_CONTENT, calculateSleepScore } = require('../content-engine');
const path = require('path');
const fs = require('fs').promises;

const PERSONAS = Object.keys(PERSONA_CONTENT);
const runAll = process.argv.includes('--all');

async function testContentEngine() {
  console.log('\n─── Testing Content Engine ───\n');
  
  let passed = 0;
  let failed = 0;
  
  // Test all personas have required fields
  for (const personaId of PERSONAS) {
    const persona = PERSONA_CONTENT[personaId];
    const required = ['displayName', 'tagline', 'colorAccent', 'icon', 'summary', 'rootCause', 'quickWins', 'sevenDayProtocol', 'productRecs', 'avoidList'];
    
    for (const field of required) {
      if (!persona[field]) {
        console.error(`  ❌ ${personaId} missing: ${field}`);
        failed++;
      }
    }
    
    // Validate quick wins structure
    if (persona.quickWins.length < 2) {
      console.error(`  ❌ ${personaId} has < 2 quick wins`);
      failed++;
    } else {
      for (const win of persona.quickWins) {
        if (!win.title || !win.steps || !win.science || !win.impact) {
          console.error(`  ❌ ${personaId} quick win "${win.title}" missing fields`);
          failed++;
        }
      }
    }
    
    // Validate protocol
    const protocolDays = ['day1','day2','day3','day4','day5','day6','day7'];
    for (const day of protocolDays) {
      if (!persona.sevenDayProtocol[day]) {
        console.error(`  ❌ ${personaId} protocol missing: ${day}`);
        failed++;
      } else if (!persona.sevenDayProtocol[day].focus || !persona.sevenDayProtocol[day].action) {
        console.error(`  ❌ ${personaId} protocol ${day} missing focus/action`);
        failed++;
      }
    }
    
    passed++;
    console.log(`  ✅ ${personaId}: all fields present`);
  }
  
  // Test buildTemplateData
  const data = buildTemplateData({
    userName: 'Test User',
    calculatorData: {
      mode: 'wakeup',
      targetTime: '7:00 AM',
      results: [
        { time: '9:30 PM', cycles: 6, hours: 9, quality: 'optimal' }
      ]
    },
    assessmentData: {
      personaId: 'restless_mind',
      personaName: 'The Restless Mind',
      confidence: 80,
      recommendations: [],
      description: ''
    },
    referenceId: 'SS-TEST',
    generationDate: 'Test Date'
  });
  
  if (data.personaName && data.sleepScore && data.quickWins && data.protocol) {
    console.log('  ✅ buildTemplateData: produces valid output');
    passed++;
  } else {
    console.error('  ❌ buildTemplateData: missing fields in output');
    failed++;
  }
  
  // Test sleep score calculation
  const score1 = calculateSleepScore({ personaId: 'restless_mind', confidence: 80 });
  const score2 = calculateSleepScore({ personaId: 'physiologically_sensitive', confidence: 80 });
  const score3 = calculateSleepScore(null);
  
  if (score1 > score2) {
    console.log(`  ✅ Sleep scores: restless_mind (${score1}) > physiologically_sensitive (${score2})`);
    passed++;
  } else {
    console.error(`  ❌ Sleep scores unexpected: ${score1} vs ${score2}`);
    failed++;
  }
  
  if (score3 === 65) {
    console.log(`  ✅ Default score: ${score3}`);
    passed++;
  }
  
  console.log(`\n  Content Engine: ${passed} passed, ${failed} failed`);
  return failed === 0;
}

async function testPDFGeneration() {
  console.log('\n─── Testing PDF Generation ───\n');
  
  const generator = new SleepBlueprintGeneratorV2();
  let passed = 0;
  let failed = 0;
  
  const personasToTest = runAll ? PERSONAS : ['restless_mind', 'digital_addict'];
  
  for (const personaId of personasToTest) {
    try {
      const result = await generator.generatePersonalizedBlueprint({
        email: `test-${personaId}@example.com`,
        userName: 'Test User',
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
          personaName: PERSONA_CONTENT[personaId].displayName,
          confidence: 82,
          recommendations: ['Test rec'],
          description: 'Test'
        }
      });
      
      // Verify file exists
      const stat = await fs.stat(result.filePath);
      
      if (result.success && stat.size > 50000) {
        console.log(`  ✅ ${personaId}: ${result.referenceId} (${result.metadata.fileSizeKB}KB, ${result.metadata.generationTimeMs}ms)`);
        passed++;
      } else {
        console.error(`  ❌ ${personaId}: file too small (${stat.size} bytes)`);
        failed++;
      }
      
      // Clean up test file
      await fs.unlink(result.filePath).catch(() => {});
      
    } catch (error) {
      console.error(`  ❌ ${personaId}: ${error.message}`);
      failed++;
    }
  }
  
  // Test without assessment data (fallback)
  try {
    const result = await generator.generatePersonalizedBlueprint({
      email: 'test-fallback@example.com',
      calculatorData: {
        mode: 'bedtime',
        targetTime: '11:00 PM',
        results: [
          { time: '5:14 AM', cycles: 4, hours: 6, quality: 'minimum' },
          { time: '6:44 AM', cycles: 5, hours: 7.5, quality: 'good' },
          { time: '8:14 AM', cycles: 6, hours: 9, quality: 'optimal' }
        ]
      },
      assessmentData: null
    });
    
    if (result.success) {
      console.log(`  ✅ fallback (no persona): ${result.referenceId} (${result.metadata.fileSizeKB}KB)`);
      passed++;
    }
    await fs.unlink(result.filePath).catch(() => {});
  } catch (error) {
    console.error(`  ❌ fallback: ${error.message}`);
    failed++;
  }
  
  // Test webhook format
  try {
    const result = await generator.generateFromWebhook({
      email_address: 'webhook-test@example.com',
      first_name: 'Webhook',
      fields: {
        calculator_mode: 'wakeup',
        target_time: '06:30',
        results_json: JSON.stringify([
          { time: '9:00 PM', cycles: 6, hours: 9, quality: 'optimal' }
        ]),
        sleep_persona: 'stress_affected',
        persona_name: 'The Stress-Affected',
        persona_confidence: '78'
      }
    });
    
    if (result.success) {
      console.log(`  ✅ webhook format: ${result.referenceId}`);
      passed++;
    }
    await fs.unlink(result.filePath).catch(() => {});
  } catch (error) {
    console.error(`  ❌ webhook format: ${error.message}`);
    failed++;
  }
  
  console.log(`\n  PDF Generation: ${passed} passed, ${failed} failed`);
  return failed === 0;
}

async function main() {
  console.log('╔══════════════════════════════════════════╗');
  console.log('║  Sleep Blueprint Generator v2 - Tests    ║');
  console.log('╚══════════════════════════════════════════╝');
  
  if (runAll) {
    console.log('\n  Mode: FULL (all personas)');
  } else {
    console.log('\n  Mode: QUICK (2 personas — use --all for full)');
  }
  
  const contentOk = await testContentEngine();
  const pdfOk = await testPDFGeneration();
  
  console.log('\n════════════════════════════════════════════');
  if (contentOk && pdfOk) {
    console.log('  ✅ ALL TESTS PASSED');
  } else {
    console.log('  ❌ SOME TESTS FAILED');
    process.exit(1);
  }
  console.log('════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
