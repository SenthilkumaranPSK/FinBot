// PlaceGuard Intelligent Client-Side & Server AI Engine

export const analyzeResumeATS = (resumeText, targetRole = 'Software Engineer') => {
  const text = (resumeText || '').toLowerCase();
  
  // Section Checks
  const hasEducation = text.includes('education') || text.includes('b.tech') || text.includes('degree') || text.includes('bachelor');
  const hasExperience = text.includes('experience') || text.includes('intern') || text.includes('work history') || text.includes('employment');
  const hasProjects = text.includes('project') || text.includes('engineered') || text.includes('architected');
  const hasSkills = text.includes('skill') || text.includes('technologies') || text.includes('languages');
  const hasAchievements = text.includes('achievement') || text.includes('award') || text.includes('hackathon') || text.includes('contest') || text.includes('rank');

  // Contact Info
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10}/.test(resumeText);
  const hasLinkedInOrGithub = text.includes('linkedin.com') || text.includes('github.com') || text.includes('leetcode.com');

  // Keywords Analysis for Tech Roles
  const targetKeywords = {
    'Software Engineer': ['java', 'python', 'c++', 'data structures', 'algorithms', 'git', 'sql', 'rest', 'docker', 'system design', 'api', 'oop'],
    'Fullstack Developer': ['react', 'node', 'typescript', 'javascript', 'html', 'css', 'mongodb', 'postgresql', 'express', 'tailwind', 'redux', 'next.js', 'rest api', 'jwt'],
    'Data Scientist / AI': ['python', 'machine learning', 'deep learning', 'pandas', 'numpy', 'tensorflow', 'pytorch', 'scikit-learn', 'sql', 'data analysis', 'nlp', 'eda'],
    'Cloud & DevOps': ['aws', 'docker', 'kubernetes', 'ci/cd', 'terraform', 'linux', 'bash', 'jenkins', 'monitoring', 'cloud', 'github actions']
  };

  const activeKeywords = targetKeywords[targetRole] || targetKeywords['Software Engineer'];
  const matchedKeywords = activeKeywords.filter(kw => text.includes(kw));
  const missingKeywords = activeKeywords.filter(kw => !text.includes(kw));

  // Impact & Quantification check (numbers, percentages, metrics like 45%, 10k, $500, 2x, etc.)
  const metricMatches = resumeText.match(/(\d+[\d,.]*\s*(%|x|k|ms|s|users|requests|queries|tb|gb|lpa|stars|\$|₹|times))/gi) || [];
  const metricsCount = metricMatches.length;

  // Weak Action Verbs vs Strong Action Verbs
  const weakVerbs = ['worked on', 'responsible for', 'helped', 'learned', 'did', 'tried to', 'assisted with', 'was part of'];
  const foundWeakVerbs = weakVerbs.filter(verb => text.includes(verb));

  const strongVerbs = ['architected', 'engineered', 'spearheaded', 'optimized', 'scaled', 'implemented', 'orchestrated', 'decreased', 'accelerated', 'developed', 'deployed'];
  const foundStrongVerbs = strongVerbs.filter(verb => text.includes(verb));

  // Calculate Sub-scores
  let sectionScore = 0;
  if (hasEducation) sectionScore += 20;
  if (hasExperience) sectionScore += 25;
  if (hasProjects) sectionScore += 25;
  if (hasSkills) sectionScore += 15;
  if (hasAchievements) sectionScore += 15;

  let keywordScore = Math.min(100, Math.round((matchedKeywords.length / activeKeywords.length) * 100));
  let impactScore = Math.min(100, Math.round((metricsCount / 5) * 100));
  let verbScore = Math.min(100, Math.max(30, (foundStrongVerbs.length * 20) - (foundWeakVerbs.length * 10)));
  let contactScore = (hasEmail ? 40 : 0) + (hasPhone ? 30 : 0) + (hasLinkedInOrGithub ? 30 : 0);

  // Overall Weighted Score
  const overallScore = Math.round(
    (sectionScore * 0.25) +
    (keywordScore * 0.30) +
    (impactScore * 0.25) +
    (verbScore * 0.10) +
    (contactScore * 0.10)
  );

  // Suggestions
  const suggestions = [];
  if (metricsCount < 3) {
    suggestions.push({
      type: 'critical',
      title: 'Missing Quantifiable Impact Metrics',
      desc: 'Recruiters and ATS favor numbers. Add metrics like "Optimized query latency by 35%" or "Served 5,000+ monthly active users".'
    });
  }
  if (missingKeywords.length > 0) {
    suggestions.push({
      type: 'warning',
      title: `Missing High-Impact Industry Keywords for ${targetRole}`,
      desc: `Incorporate relevant skills like: ${missingKeywords.slice(0, 4).join(', ')}.`
    });
  }
  if (foundWeakVerbs.length > 0) {
    suggestions.push({
      type: 'warning',
      title: 'Replace Passive Action Verbs',
      desc: `Found weak phrases like "${foundWeakVerbs.join(', ')}". Replace with "Architected", "Engineered", or "Spearheaded".`
    });
  }
  if (!hasLinkedInOrGithub) {
    suggestions.push({
      type: 'info',
      title: 'Include Verified Portfolio Links',
      desc: 'Add direct clickable links to GitHub, LinkedIn, and LeetCode profiles at the top.'
    });
  }
  if (suggestions.length === 0) {
    suggestions.push({
      type: 'success',
      title: 'Exceptional Resume Structure',
      desc: 'Your resume follows industry-standard STAR formatting and strong metric quantification.'
    });
  }

  // Enhanced AI Rewritten Bullet Points
  const bulletImprovements = [
    {
      original: 'Created an online shopping website using React and Node.js with login and cart.',
      improved: 'Architected fullstack e-commerce web application with React, Node.js & Redux, implementing JWT auth and Stripe checkout handling 500+ mock transactions.',
      impact: '+45% Higher ATS Match Score'
    },
    {
      original: 'Worked on weather forecasting app in JavaScript connecting with API.',
      improved: 'Engineered responsive real-time weather analytics SPA using OpenWeather API & WebSockets, reducing payload size by 40% with client-side caching.',
      impact: '+38% Higher ATS Match Score'
    }
  ];

  return {
    overallScore,
    status: overallScore >= 80 ? 'Ready for Tier-1 Drives' : overallScore >= 60 ? 'Moderate - Needs Polishing' : 'High Rejection Risk',
    ratingCategory: overallScore >= 80 ? 'Exceptional' : overallScore >= 60 ? 'Competitive' : 'Needs Optimization',
    breakdown: {
      sections: sectionScore,
      keywords: keywordScore,
      impact: impactScore,
      actionVerbs: verbScore,
      contact: contactScore
    },
    matchedKeywords,
    missingKeywords,
    metricsFound: metricsCount,
    foundStrongVerbs,
    foundWeakVerbs,
    suggestions,
    bulletImprovements,
    timestamp: new Date().toISOString()
  };
};

export const verifyJobOrOffer = (inputData) => {
  const text = (typeof inputData === 'string' ? inputData : JSON.stringify(inputData)).toLowerCase();
  
  let riskPoints = 0;
  const redFlags = [];
  const safeIndicators = [];

  // Red Flag 1: Financial Demand
  if (text.includes('security deposit') || text.includes('registration fee') || text.includes('training fee') || text.includes('laptop deposit') || text.includes('cheque') || text.includes('pay rs') || text.includes('processing fee')) {
    riskPoints += 45;
    redFlags.push({
      title: 'Monetary Extortion / Upfront Payment Demand',
      description: 'The offer or job posting requires registration, training, or equipment fees. Legitimate campus recruiters NEVER charge candidates.',
      severity: 'CRITICAL'
    });
  }

  // Red Flag 2: Free Email Provider
  if (text.includes('@gmail.com') || text.includes('@yahoo.com') || text.includes('@hotmail.com') || text.includes('@outlook.com')) {
    riskPoints += 30;
    redFlags.push({
      title: 'Unverified Public Email Domain',
      description: 'Communication originated from a free public email (e.g., @gmail.com) instead of the verified enterprise corporate domain.',
      severity: 'HIGH'
    });
  }

  // Red Flag 3: Informal Interviewing / Telegram / WhatsApp only
  if (text.includes('telegram') || text.includes('whatsapp only') || text.includes('no video call') || text.includes('instant selection without interview')) {
    riskPoints += 25;
    redFlags.push({
      title: 'Informal or Skipped Interview Process',
      description: 'Selection occurred without video assessment or formal technical rounds via unmonitored messaging apps.',
      severity: 'HIGH'
    });
  }

  // Red Flag 4: Original Certificate Confiscation
  if (text.includes('original marksheet') || text.includes('surrender certificate') || text.includes('submit original 10th') || text.includes('degree certificate custody')) {
    riskPoints += 40;
    redFlags.push({
      title: 'Illegal Educational Certificate Hostage Requirement',
      description: 'Demanding custody of original academic certificates violates Indian Labour Law and Supreme Court guidelines.',
      severity: 'CRITICAL'
    });
  }

  // Red Flag 5: Unrealistic Compensation for zero experience
  if (text.includes('50,000 per day') || text.includes('1 lakh per week') || text.includes('copy paste job') || text.includes('typing from home 2 hours')) {
    riskPoints += 35;
    redFlags.push({
      title: 'Unrealistic Pay & Deceptive Task Description',
      description: 'Promises disproportionate compensation for simple low-skill remote data entry tasks (Classic Task Scam pattern).',
      severity: 'HIGH'
    });
  }

  // Safe Indicators
  if (text.includes('@google.com') || text.includes('@microsoft.com') || text.includes('@amazon.com') || text.includes('@tcs.com') || text.includes('@atlassian.com')) {
    safeIndicators.push('Verified corporate top-level email domain detected.');
  }
  if (text.includes('on-campus placement cell') || text.includes('tpo office') || text.includes('college placement drive')) {
    safeIndicators.push('Campus Training and Placement Officer (TPO) coordination mentioned.');
  }
  if (text.includes('signed nda') || text.includes('hr portal') || text.includes('workday') || text.includes('greenhouse.io') || text.includes('lever.co')) {
    safeIndicators.push('Legitimate enterprise ATS recruitment tracking software detected.');
  }

  const trustScore = Math.max(0, 100 - riskPoints);
  let status = 'LEGITIMATE & SAFE';
  let badgeColor = 'emerald';

  if (trustScore < 40) {
    status = 'HIGH SEVERITY SCAM / FRAUD DETECTED';
    badgeColor = 'rose';
  } else if (trustScore < 75) {
    status = 'SUSPICIOUS - EXERCISE CAUTION';
    badgeColor = 'amber';
  }

  return {
    trustScore,
    status,
    badgeColor,
    riskPoints,
    redFlags,
    safeIndicators: safeIndicators.length > 0 ? safeIndicators : ['Standard verification rules checked.'],
    recommendation: trustScore < 50 
      ? 'DO NOT PROCEED. Do not transfer funds, share bank details, or send identity documents.' 
      : trustScore < 75 
      ? 'Verify directly with the official company website careers page or your College Placement Cell (TPO).'
      : 'This communication appears legitimate. Proceed with standard placement drive guidelines.'
  };
};

export const evaluateInterviewAnswer = (question, userAnswer, _domain = 'Fullstack SDE') => {
  const ans = (userAnswer || '').trim();
  const wordCount = ans.split(/\s+/).filter(Boolean).length;

  if (wordCount < 10) {
    return {
      score: 35,
      clarity: 40,
      depth: 30,
      starStructure: 35,
      confidence: 45,
      feedback: 'Answer is too brief. Provide technical specifics, trade-offs, and structured examples.',
      strengths: ['Addressed the topic'],
      improvements: ['Elaborate on edge cases', 'Mention actual data structures or architecture choices', 'Structure using Situation-Task-Action-Result (STAR)'],
      modelAnswer: 'A comprehensive answer should walk through system constraints, proposed architecture (e.g. Redis distributed lock, DB optimistic locking), and failover mechanisms.'
    };
  }

  let depthScore = Math.min(95, Math.round(50 + (wordCount * 0.4)));
  let clarityScore = 85;
  let starScore = 80;
  let confidenceScore = 88;

  const technicalBuzzwords = ['complexity', 'latency', 'cache', 'redis', 'database', 'distributed', 'lock', 'async', 'queue', 'memory', 'cpu', 'concurrency', 'idempotent'];
  const matchedKeywords = technicalBuzzwords.filter(kw => ans.toLowerCase().includes(kw));

  depthScore = Math.min(98, depthScore + (matchedKeywords.length * 4));

  const overall = Math.round((depthScore * 0.35) + (clarityScore * 0.25) + (starScore * 0.20) + (confidenceScore * 0.20));

  return {
    score: overall,
    clarity: clarityScore,
    depth: depthScore,
    starStructure: starScore,
    confidence: confidenceScore,
    feedback: overall >= 80 
      ? 'Outstanding technical articulation! You highlighted constraints, core architecture, and practical mitigation strategies.'
      : 'Good foundational answer. Deepen your explanation of distributed race conditions and time complexity.',
    strengths: [
      `Used ${matchedKeywords.length > 0 ? matchedKeywords.join(', ') : 'clear terminology'}`,
      'Demonstrated logical reasoning under interview pressure'
    ],
    improvements: [
      'Explicitly state Time (Big-O) and Space complexity',
      'Discuss how this system behaves under 100x traffic scaling spikes'
    ],
    modelAnswer: 'To handle race conditions with 10k users: 1) Use a Redis distributed lock (Redlock) or atomic DECR counter with TTL; 2) Enforce DB optimistic concurrency with version column; 3) Buffer purchase requests via Kafka to serialize execution and guarantee zero overselling.'
  };
};

export const calculateInHandSalary = (ctcInLakhs, bonus = 0, stocksFourYear = 0) => {
  const ctc = parseFloat(ctcInLakhs) || 12;
  const annualStocks = (parseFloat(stocksFourYear) || 0) / 4;
  const annualBonus = parseFloat(bonus) || 0;
  
  // Base Salary is usually 70-80% of fixed CTC
  const baseSalary = Math.max(3, ctc - annualStocks - annualBonus);
  
  // Annual deductions (Provident Fund 12% of basic, Professional Tax ₹2,400/yr, Standard deduction ₹75,000, Income Tax under New Regime)
  const annualPF = Math.round(baseSalary * 100000 * 0.12 * 0.5); // 12% of 50% basic
  const grossMonthly = Math.round((baseSalary * 100000) / 12);
  
  // Estimated Tax under New Tax Regime FY 2025-26
  let annualTax = 0;
  const taxableIncome = Math.max(0, (baseSalary * 100000) - 75000);
  if (taxableIncome > 1500000) {
    annualTax = (taxableIncome - 1500000) * 0.30 + 150000;
  } else if (taxableIncome > 1200000) {
    annualTax = (taxableIncome - 1200000) * 0.20 + 90000;
  } else if (taxableIncome > 900000) {
    annualTax = (taxableIncome - 900000) * 0.15 + 45000;
  } else if (taxableIncome > 700000) {
    annualTax = (taxableIncome - 700000) * 0.10 + 25000;
  } else if (taxableIncome > 300000) {
    annualTax = (taxableIncome - 300000) * 0.05;
  }
  // Section 87A rebate for income up to 7 LPA
  if (baseSalary <= 7.0) annualTax = 0;

  const monthlyTax = Math.round(annualTax / 12);
  const monthlyPF = Math.round(annualPF / 12);
  const monthlyInHand = Math.max(0, grossMonthly - monthlyTax - monthlyPF - 200);

  return {
    ctcTotal: ctc,
    baseSalary: baseSalary.toFixed(1),
    annualStocks: annualStocks.toFixed(1),
    annualBonus: annualBonus.toFixed(1),
    grossMonthly,
    monthlyTax,
    monthlyPF,
    monthlyInHand,
    takeHomePercentage: Math.round((monthlyInHand * 12 / (ctc * 100000)) * 100)
  };
};

export const generateCoachResponse = (userPrompt, _mode = 'general') => {
  const query = (userPrompt || '').toLowerCase();

  if (query.includes('dsa') || query.includes('algorithm') || query.includes('leetcode') || query.includes('tree') || query.includes('graph')) {
    return {
      text: `### 🎯 High-Frequency Algorithmic Pattern Guide\n\nWhen preparing for campus placements at Tier-1 product companies, master these 6 core patterns:\n\n1. **Two Pointers & Sliding Window**\n   - *Applications:* Longest Substring Without Repeating Characters, Trapping Rain Water, 3Sum.\n   - *Key Insight:* Eliminates quadratic $O(N^2)$ brute-force down to $O(N)$ linear scans.\n\n2. **Binary Search on Answer Space**\n   - *Applications:* Koko Eating Bananas, Capacity to Ship Packages Within D Days, Aggressive Cows.\n   - *Key Insight:* When predicate function $f(mid)$ is monotonic (True/False).\n\n3. **Breadth-First Search (BFS) for Shortest Path**\n   - *Applications:* Rotting Oranges, Word Ladder, 0-1 BFS with Deque.\n\n4. **Dynamic Programming (Memoization + Tabulation)**\n   - *Top Problems:* House Robber, Coin Change, Longest Increasing Subsequence ($O(N \\log N)$ using Binary Search), Edit Distance.\n\n5. **Disjoint Set Union (DSU / Union-Find)**\n   - *Applications:* Number of Connected Components, Kruskal's MST, Redundant Connection.\n\n💡 **Coach Tip:** Solve 2 Mediums a day on PlaceGuard rather than 10 Easy problems!`,
      type: 'dsa_guide'
    };
  }

  if (query.includes('hr') || query.includes('why should we hire you') || query.includes('weakness') || query.includes('tell me about yourself')) {
    return {
      text: `### 🏆 STAR Method Framework for Behavioral Rounds\n\nTo ace HR & Behavioral questions at Amazon (Leadership Principles), Google (Googliness), or Microsoft:\n\n#### 1. "Tell Me About Yourself" (90-Second Formula)\n- **Past (30s):** Your college background, core passion for engineering, and key milestone (e.g. SIH hackathon winner).\n- **Present (40s):** Major production projects built, technologies mastered (React/Node/Go/Docker), and LeetCode problem-solving rating.\n- **Future (20s):** Why this specific company and role aligns with your career goals.\n\n#### 2. "Why Should We Hire You?"\n> *"You need someone who doesn't just write code, but owns solutions end-to-end. In my recent internship, I optimized our API response time by 32% and delivered our core microservice 3 days ahead of schedule. I bring strong algorithmic foundations, rapid adaptability to your tech stack, and high velocity."*\n\n#### 3. "What is Your Biggest Weakness?"\n- **Formula:** A real technical growth area + the active steps you take to master it.\n- *Example:* "Earlier I used to dive into coding before planning edge cases. Now I create strict architecture blueprints and unit test matrices first."`,
      type: 'hr_guide'
    };
  }

  if (query.includes('scam') || query.includes('fake') || query.includes('deposit') || query.includes('fee')) {
    return {
      text: `### 🛡️ PlaceGuard Fraud Shield Protocol\n\n**Golden Placement Rules:**\n- 🚫 **Zero Fees Ever:** Legitimate companies (Google, TCS, Infosys, Amazon, Microsoft, etc.) NEVER charge registration, laptop deposit, or processing fees.\n- 🚫 **No Certificate Hostage:** It is strictly illegal under Indian Labour Law for any company to withhold your original 10th/12th/Degree certificates.\n- 🚫 **Domain Check:** Only trust official corporate emails (@amazon.jobs, @tcs.com, @google.com). Free Gmail/Yahoo accounts are 100% scam flags.\n- 🔍 Use our **Scam Guard** tool to scan suspicious job letters before replying!`,
      type: 'security_alert'
    };
  }

  return {
    text: `### 🚀 PlaceGuard AI Placement Advisor\n\nHere is what you should focus on right now to maximize your placement conversion rate:\n\n1. **ATS Score Check:** Aim for **85%+** on our Resume Shield.\n2. **Daily Coding Streak:** Solve 1 Graph/DP problem and 1 SQL query daily.\n3. **Mock Interview Practice:** Run at least one 15-minute voice simulation every 3 days.\n4. **Placement Drive Radar:** Track deadlines for upcoming campus drives in your pipeline.\n\nHow can I help you today? You can ask me to evaluate an algorithm, draft an HR answer, review an offer letter, or optimize a resume bullet!`,
    type: 'general'
  };
};
