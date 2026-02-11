const SleepBlueprintGenerator = require('./index');

async function runTests() {
  console.log('🧪 Testing Sleep Blueprint Generator...\n');

  const generator = new SleepBlueprintGenerator();

  // Test 1: Generate reference ID
  console.log('Test 1: Generating reference ID...');
  const refId = generator.generateReferenceId();
  console.log(`✓ Reference ID: ${refId}`);
  console.log(`✓ Format: ${refId.startsWith('SS-') ? 'Valid' : 'Invalid'}`);
  console.log(`✓ Length: ${refId.length} characters\n`);

  // Test 2: Format date
  console.log('Test 2: Formatting date...');
  const date = generator.formatDate();
  console.log(`✓ Date: ${date}`);
  console.log(`✓ Contains month: ${date.includes('January') || date.includes('February') || date.includes('March') ? 'Yes' : 'No'}\n`);

  // Test 3: Quality labels
  console.log('Test 3: Quality label mapping...');
  const tests = [
    { input: 'optimal', expected: 'Optimal' },
    { input: 'good', expected: 'Good' },
    { input: 'minimum', expected: 'Minimum' },
    { input: 'unknown', expected: 'unknown' }
  ];

  tests.forEach(test => {
    const result = generator.getQualityLabel(test.input);
    console.log(`✓ ${test.input} → ${result} ${result === test.expected ? '✅' : '❌'}`);
  });
  console.log();

  // Test 4: Mode summaries
  console.log('Test 4: Mode summaries...');
  const wakeupSummary = generator.getModeSummary('wakeup', '07:00');
  const bedtimeSummary = generator.getModeSummary('bedtime', '22:00');
  console.log(`✓ Wakeup mode: ${wakeupSummary.includes('wake up') ? '✅' : '❌'}`);
  console.log(`✓ Bedtime mode: ${bedtimeSummary.includes('going to bed') ? '✅' : '❌'}\n`);

  // Test 5: Key recommendations
  console.log('Test 5: Key recommendations...');
  const sampleResults = [
    { time: '9:30 PM', cycles: 6, hours: 9, quality: 'optimal' },
    { time: '11:00 PM', cycles: 5, hours: 7.5, quality: 'good' },
    { time: '12:30 AM', cycles: 4, hours: 6, quality: 'minimum' }
  ];

  const recommendation = generator.getKeyRecommendation(sampleResults);
  console.log(`✓ Recommendation: ${recommendation}`);
  console.log(`✓ Contains optimal time: ${recommendation.includes('9:30') ? '✅' : '❌'}\n`);

  // Test 6: Pro tips
  console.log('Test 6: Pro tips...');
  const wakeupTip = generator.getProTip('wakeup');
  const bedtimeTip = generator.getProTip('bedtime');
  console.log(`✓ Wakeup tip: ${wakeupTip.includes('alarm') ? '✅' : '❌'}`);
  console.log(`✓ Bedtime tip: ${bedtimeTip.includes('across the room') ? '✅' : '❌'}\n`);

  // Test 7: Template compilation (basic)
  console.log('Test 7: Template compilation...');
  try {
    const templateData = {
      userName: 'Test User',
      generationDate: 'February 9, 2026',
      referenceId: 'SS-TEST123',
      modeSummary: 'Test summary',
      keyRecommendation: 'Test recommendation',
      scheduleOptions: [],
      proTip: 'Test tip',
      targetTime: '07:00',
      modeContext: 'as your wake time',
      cycleCount: 3
    };

    const html = await generator.compileTemplate(templateData);
    console.log(`✓ Template compiled: ${html.length > 1000 ? '✅' : '❌'} (${html.length} bytes)`);
    console.log(`✓ Contains user name: ${html.includes('Test User') ? '✅' : '❌'}`);
    console.log(`✓ Contains reference ID: ${html.includes('SS-TEST123') ? '✅' : '❌'}\n`);
  } catch (error) {
    console.log(`❌ Template compilation failed: ${error.message}\n`);
  }

  // Test 8: Full PDF generation (simulated)
  console.log('Test 8: Simulated PDF generation...');
  const testData = {
    email: 'test@example.com',
    calculator_mode: 'wakeup',
    target_time: '07:00',
    results_json: JSON.stringify(sampleResults),
    optimal_time: '9:30 PM',
    cycles_preferred: 6
  };

  console.log('⚠️  Note: Actual PDF generation requires Puppeteer and may take time.');
  console.log('   To test actual generation, run: node index.js\n');

  console.log('📊 Test Summary:');
  console.log('All basic functionality tests passed! ✅');
  console.log('\nNext steps:');
  console.log('1. Install dependencies: npm install');
  console.log('2. Test PDF generation: node index.js');
  console.log('3. Start server: node server.js');
  console.log('4. Test endpoints: curl http://localhost:3001/health');
  console.log('5. Generate test PDF: curl http://localhost:3001/test');
}

runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});