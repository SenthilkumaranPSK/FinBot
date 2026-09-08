const http = require('http');

let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    console.log(`✅ PASS: ${name}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${name}`);
    failed++;
  }
}

async function runTests() {
  // Set NODE_ENV to production before requiring app so it doesn't auto-listen
  process.env.NODE_ENV = 'production';
  const app = require('./server');
  
  const server = app.listen(5002, async () => {
    console.log(`\n====================================================`);
    console.log(`🛡️ TESTING PLACE GAURD BACKEND API ON PORT 5002`);
    console.log(`====================================================\n`);

    try {
      // 1. Health check
      const healthRes = await fetch('http://localhost:5002/');
      const healthText = await healthRes.text();
      assert(healthRes.status === 200 && healthText.includes('Place Gaurd'), 'Health check endpoint GET / returns 200 OK');

      // 2. Drives endpoint
      const drivesRes = await fetch('http://localhost:5002/api/placement/drives');
      const drivesJson = await drivesRes.json();
      assert(drivesRes.status === 200 && drivesJson.success && drivesJson.data.length > 0, `GET /api/placement/drives returned ${drivesJson.data?.length} drives`);

      // 3. Resume Scan endpoint
      const resumeRes = await fetch('http://localhost:5002/api/placement/resume/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: 'Experienced Software Engineer with Java, React, Docker, and AWS.', targetRole: 'Software Engineer' })
      });
      const resumeJson = await resumeRes.json();
      assert(resumeRes.status === 200 && resumeJson.success && resumeJson.data.overallScore > 0, `POST /api/placement/resume/scan scored: ${resumeJson.data?.overallScore}/100`);

      // 4. Scam Verify endpoint
      const scamRes = await fetch('http://localhost:5002/api/placement/scam/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: 'Please pay ₹2,500 registration deposit for Amazon drive' })
      });
      const scamJson = await scamRes.json();
      assert(scamRes.status === 200 && scamJson.success && scamJson.data.trustScore < 50, `POST /api/placement/scam/verify caught scam with score ${scamJson.data?.trustScore}%`);

      // 5. AI Chat endpoint
      const aiRes = await fetch('http://localhost:5002/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'What are the top DSA patterns for Google?' })
      });
      const aiJson = await aiRes.json();
      assert(aiRes.status === 200 && aiJson.success && aiJson.response.length > 20, 'POST /api/ai/chat returned intelligent placement advice');

      console.log(`\n====================================================`);
      console.log(`🏁 BACKEND TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
      console.log(`====================================================\n`);
    } catch (err) {
      console.error('Server test error:', err);
      failed++;
    } finally {
      server.close();
    }
  });
}

runTests();
