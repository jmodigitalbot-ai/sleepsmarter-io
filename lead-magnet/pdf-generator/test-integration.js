const axios = require('axios');

async function testPDFGeneration() {
  const testData = {
    firstName: 'John',
    email: 'john@example.com',
    calculatorData: {
      mode: 'wakeup',
      targetTime: '07:00',
      results: [
        {
          time: '10:15 PM',
          cycles: 5,
          hours: 7.5,
          quality: 'optimal'
        },
        {
          time: '11:45 PM',
          cycles: 4,
          hours: 6,
          quality: 'good'
        },
        {
          time: '1:15 AM',
          cycles: 3,
          hours: 4.5,
          quality: 'minimum'
        }
      ]
    },
    assessmentData: {
      personaId: 'restless_mind',
      personaName: 'The Restless Mind',
      confidence: 85,
      recommendations: [
        'Practice bedtime meditation (10 minutes)',
        'Keep a worry journal in the evening',
        'Try progressive muscle relaxation',
        'Create a pre-sleep wind-down routine'
      ],
      description: 'You struggle with racing thoughts, anxiety, or rumination at bedtime. Your mind has trouble "switching off" when it\'s time to sleep.'
    }
  };

  try {
    console.log('Testing PDF generation...');
    
    // Test direct PDF generation
    const pdfResponse = await axios.post('http://localhost:3001/generate-blueprint', testData);
    console.log('PDF Generation Response:', pdfResponse.data);

    // Test webhook handler
    const webhookResponse = await axios.post('http://localhost:3002/test/generate', testData);
    console.log('Webhook Test Response:', webhookResponse.data);

    console.log('\n✅ Integration test completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Start the PDF generator: node index.js');
    console.log('2. Start the webhook handler: node webhook-handler.js');
    console.log('3. Configure Kit webhook to point to: http://your-server:3002/webhook/kit');
    console.log('4. Test the frontend integration');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run test
testPDFGeneration();