const express = require('express');
const router = express.Router();

// Mock placement database in server memory for fallback
const mockDrives = [
  {
    id: 'drive-1',
    company: 'Atlassian',
    role: 'Graduate Software Engineer (SDE-1)',
    tier: 'Super Dream',
    packageCTC: '45.0 LPA',
    status: 'Applied',
    deadline: '2026-09-18'
  },
  {
    id: 'drive-2',
    company: 'Microsoft',
    role: 'Software Development Engineer',
    tier: 'Super Dream',
    packageCTC: '28.5 LPA',
    status: 'OA Scheduled',
    deadline: '2026-09-15'
  }
];

// 1. Get all placement drives
router.get('/drives', (req, res) => {
  res.json({ success: true, count: mockDrives.length, data: mockDrives });
});

// 2. Scan ATS Resume endpoint
router.post('/resume/scan', (req, res) => {
  const { resumeText, targetRole } = req.body;
  if (!resumeText) {
    return res.status(400).json({ success: false, message: 'Resume text is required' });
  }

  // Server-side ATS analysis simulation
  const wordCount = resumeText.split(/\s+/).length;
  const score = Math.min(96, Math.max(45, Math.round(50 + (wordCount * 0.1))));

  res.json({
    success: true,
    data: {
      overallScore: score,
      status: score >= 80 ? 'Ready for Tier-1 Drives' : 'Needs Optimization',
      role: targetRole || 'Software Engineer',
      timestamp: new Date().toISOString()
    }
  });
});

// 3. Verify Job / Offer Letter for Scams
router.post('/scam/verify', (req, res) => {
  const { text } = req.body;
  const content = (text || '').toLowerCase();
  
  const hasFee = content.includes('deposit') || content.includes('fee') || content.includes('pay');
  const hasFreeEmail = content.includes('@gmail.com') || content.includes('@yahoo.com');
  const trustScore = hasFee ? 15 : hasFreeEmail ? 45 : 95;

  res.json({
    success: true,
    data: {
      trustScore,
      status: trustScore < 50 ? 'HIGH RISK FRAUD' : 'VERIFIED SAFE',
      flagsDetected: hasFee ? ['Upfront payment demanded'] : []
    }
  });
});

module.exports = router;
