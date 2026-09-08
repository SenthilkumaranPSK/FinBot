import { 
  analyzeResumeATS, 
  verifyJobOrOffer, 
  evaluateInterviewAnswer, 
  calculateInHandSalary, 
  generateCoachResponse 
} from './src/services/aiPlacementEngine.js';
import { SAMPLE_RESUMES, PLACEMENT_DRIVES, BLACKLISTED_SCAMS } from './src/data/mockData.js';

let passed = 0;
let failed = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    passed++;
  } else {
    console.error(`❌ FAIL: ${testName}`);
    failed++;
  }
}

console.log('====================================================');
console.log('🛡️ RUNNING PLACE GAURD FULL ENGINE TEST SUITE');
console.log('====================================================\n');

// 1. Test Mock Data Integrity
console.log('--- 1. Testing Mock Data Sets ---');
assert(PLACEMENT_DRIVES.length >= 6, 'Placement drives contains at least 6 active drives');
assert(BLACKLISTED_SCAMS.length >= 3, 'Blacklist scam database contains threat intelligence');
assert(SAMPLE_RESUMES.weak && SAMPLE_RESUMES.strong, 'Sample resumes (weak and strong) are present');

// 2. Test ATS Resume Analyzer
console.log('\n--- 2. Testing ATS Resume Parser & Optimizer ---');
const weakAts = analyzeResumeATS(SAMPLE_RESUMES.weak.content, 'Software Engineer');
const strongAts = analyzeResumeATS(SAMPLE_RESUMES.strong.content, 'Fullstack Developer');

assert(weakAts.overallScore < 60, `Weak resume accurately scores low (${weakAts.overallScore}/100)`);
assert(strongAts.overallScore >= 85, `Optimized resume scores in top tier (${strongAts.overallScore}/100)`);
assert(strongAts.matchedKeywords.length > 5, `Keyword matching accurately detected skills: ${strongAts.matchedKeywords.length}`);
assert(strongAts.bulletImprovements.length > 0, 'AI 1-Click bullet rewriter generated improved suggestions');

// 3. Test Scam & Offer Letter Fraud Verifier
console.log('\n--- 3. Testing Scam & Fraud Guard ---');
const scamMessage = 'Congratulations! You are selected for Google SDE role. Please transfer Rs. 3,500 registration deposit via Telegram.';
const scamResult = verifyJobOrOffer(scamMessage);

assert(scamResult.trustScore < 50, `Scam detection flagged high risk (Trust Score: ${scamResult.trustScore}%)`);
assert(scamResult.redFlags.length >= 1, `Detected red flags: ${scamResult.redFlags.map(f => f.title).join(', ')}`);

const legitMessage = 'Official Placement Drive: Microsoft Campus Recruitment. Applied through official college TPO portal at careers@microsoft.com.';
const legitResult = verifyJobOrOffer(legitMessage);

assert(legitResult.trustScore >= 80, `Legitimate communication passed verification (Trust Score: ${legitResult.trustScore}%)`);

// 4. Test AI Mock Interview Answer Evaluator
console.log('\n--- 4. Testing AI Mock Interview Evaluator ---');
const shortAns = evaluateInterviewAnswer('Explain race conditions', 'It is when two threads write at once.');
assert(shortAns.score <= 50, `Short answer receives low depth score (${shortAns.score}/100)`);

const detailedAns = evaluateInterviewAnswer(
  'Explain race conditions', 
  'To handle race conditions under 10k users, we implement distributed locking using Redis with TTL or DB optimistic locking with a version column. We also buffer requests through a Kafka message queue to ensure serial execution without database deadlocks.'
);
assert(detailedAns.score >= 80, `Comprehensive answer receives strong hire score (${detailedAns.score}/100)`);
assert(detailedAns.modelAnswer.length > 20, 'Model answer key was generated');

// 5. Test Salary & Take-Home Calculator
console.log('\n--- 5. Testing CTC vs In-Hand Salary Engine ---');
const salary24LPA = calculateInHandSalary(24, 2, 8);
assert(salary24LPA.monthlyInHand > 80000, `Calculated monthly in-hand for 24 LPA: ₹${salary24LPA.monthlyInHand.toLocaleString('en-IN')}`);
assert(salary24LPA.takeHomePercentage > 40 && salary24LPA.takeHomePercentage < 90, `Take-home percentage is realistic: ${salary24LPA.takeHomePercentage}%`);

// 6. Test 24/7 AI Mentor Engine
console.log('\n--- 6. Testing 24/7 AI Placement Mentor Engine ---');
const dsaAdvice = generateCoachResponse('Can you explain dynamic programming patterns for leetcode?');
assert(dsaAdvice.text.includes('Pattern') || dsaAdvice.text.includes('Dynamic Programming'), 'AI Mentor generated DSA patterns advice');

const hrAdvice = generateCoachResponse('How to answer why should we hire you in HR round?');
assert(hrAdvice.text.includes('STAR') || hrAdvice.text.includes('Hire You'), 'AI Mentor generated HR STAR advice');

console.log('\n====================================================');
console.log(`🏁 TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
console.log('====================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
