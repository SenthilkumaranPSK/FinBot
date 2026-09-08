export const VERIFIED_COMPANIES = [
  {
    id: 'comp-1',
    name: 'Google',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    trustScore: 99,
    category: 'Product / Super Dream',
    avgPackage: '32.5 LPA',
    tier: 'Tier-1 FAANG',
    verifiedEmailDomains: ['@google.com'],
    activeDrives: 2,
    hiringRoles: ['Software Engineer', 'Associate Product Manager', 'Data Scientist'],
    scamRisk: 'None',
    officialCareersUrl: 'https://careers.google.com'
  },
  {
    id: 'comp-2',
    name: 'Microsoft',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
    trustScore: 99,
    category: 'Product / Super Dream',
    avgPackage: '28.0 LPA',
    tier: 'Tier-1 Product',
    verifiedEmailDomains: ['@microsoft.com'],
    activeDrives: 3,
    hiringRoles: ['SDE-1', 'Support Engineer', 'Data Engineer'],
    scamRisk: 'None',
    officialCareersUrl: 'https://careers.microsoft.com'
  },
  {
    id: 'comp-3',
    name: 'Amazon',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    trustScore: 98,
    category: 'Product / Super Dream',
    avgPackage: '30.0 LPA',
    tier: 'Tier-1 FAANG',
    verifiedEmailDomains: ['@amazon.com', '@amazon.jobs'],
    activeDrives: 1,
    hiringRoles: ['Software Development Engineer', 'Cloud Support Associate'],
    scamRisk: 'High Impersonation Risk (Watch for fake telegram drives)',
    officialCareersUrl: 'https://amazon.jobs'
  },
  {
    id: 'comp-4',
    name: 'Atlassian',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg',
    trustScore: 99,
    category: 'Product / Super Dream',
    avgPackage: '45.0 LPA',
    tier: 'Tier-1 Super Dream',
    verifiedEmailDomains: ['@atlassian.com'],
    activeDrives: 1,
    hiringRoles: ['Graduate SDE', 'Site Reliability Engineer'],
    scamRisk: 'None',
    officialCareersUrl: 'https://atlassian.com/company/careers'
  },
  {
    id: 'comp-5',
    name: 'TCS (Tata Consultancy Services)',
    logo: 'https://ui-avatars.com/api/?name=TCS&background=1e3a8a&color=fff',
    trustScore: 97,
    category: 'Mass / Service & Digital',
    avgPackage: '3.6 - 9.0 LPA',
    tier: 'Service & Digital / Prime',
    verifiedEmailDomains: ['@tcs.com'],
    activeDrives: 4,
    hiringRoles: ['Ninja (3.6 LPA)', 'Digital (7.0 LPA)', 'Prime (9.0 LPA)'],
    scamRisk: 'High Impersonation Risk (Scammers ask Rs. 2,500 registration fee)',
    officialCareersUrl: 'https://nextstep.tcs.com'
  },
  {
    id: 'comp-6',
    name: 'Goldman Sachs',
    logo: 'https://ui-avatars.com/api/?name=GS&background=0284c7&color=fff',
    trustScore: 99,
    category: 'FinTech / Super Dream',
    avgPackage: '25.0 LPA',
    tier: 'Investment Banking Tech',
    verifiedEmailDomains: ['@gs.com', '@goldmansachs.com'],
    activeDrives: 1,
    hiringRoles: ['Analyst - Engineering', 'Quantitative Strategist'],
    scamRisk: 'None',
    officialCareersUrl: 'https://goldmansachs.com/careers'
  }
];

export const PLACEMENT_DRIVES = [
  {
    id: 'drive-1',
    company: 'Atlassian',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/confluence/confluence-original.svg',
    role: 'Graduate Software Engineer (SDE-1)',
    tier: 'Super Dream',
    packageCTC: '45.0 LPA (Base: 22 LPA, Stocks: $25k, Bonus: 4 LPA)',
    inHandEstimate: '₹1,55,000 / mo',
    type: 'Campus Drive',
    status: 'Applied',
    deadline: '2026-09-18',
    daysLeft: 5,
    eligibility: {
      minCGPA: 8.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'AI&DS'],
      maxBacklogs: 0,
      passingYear: 2026
    },
    location: 'Bengaluru / Remote',
    rounds: [
      { name: 'Online Assessment (HackerRank)', status: 'Cleared', date: '2026-09-02' },
      { name: 'System Design & Craft Demo', status: 'Scheduled', date: '2026-09-20' },
      { name: 'Values & Cultural Fit', status: 'Upcoming', date: '2026-09-24' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'Build enterprise collaboration software powering Jira, Confluence, and Trello with world-class engineering standards.'
  },
  {
    id: 'drive-2',
    company: 'Microsoft',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg',
    role: 'Software Development Engineer',
    tier: 'Super Dream',
    packageCTC: '28.5 LPA (Base: 16 LPA + 8L Stocks + Joining Bonus)',
    inHandEstimate: '₹1,22,000 / mo',
    type: 'Campus Drive',
    status: 'OA Scheduled',
    deadline: '2026-09-15',
    daysLeft: 2,
    eligibility: {
      minCGPA: 7.5,
      allowedBranches: ['All Engineering Branches with CS Minor'],
      maxBacklogs: 0,
      passingYear: 2026
    },
    location: 'Hyderabad / Noida',
    rounds: [
      { name: 'Coding Assessment (Codility)', status: 'Scheduled', date: '2026-09-15' },
      { name: 'DSA & Problem Solving', status: 'Upcoming', date: '2026-09-22' },
      { name: 'Managerial & System Architecture', status: 'Upcoming', date: '2026-09-25' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'Work with Azure, Teams, Windows, and generative AI copilot integrations across global infrastructure.'
  },
  {
    id: 'drive-3',
    company: 'Amazon',
    logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
    role: 'Software Development Engineer - AWS',
    tier: 'Super Dream',
    packageCTC: '32.0 LPA (Base: 18 LPA + Stocks + Relocation)',
    inHandEstimate: '₹1,35,000 / mo',
    type: 'Campus Drive',
    status: 'Technical Round',
    deadline: '2026-09-12',
    daysLeft: 1,
    eligibility: {
      minCGPA: 7.0,
      allowedBranches: ['CSE', 'IT', 'ECE', 'EEE'],
      maxBacklogs: 0,
      passingYear: 2026
    },
    location: 'Bengaluru / Hyderabad',
    rounds: [
      { name: 'Online Assessment (Debug + DSA + Work Styles)', status: 'Cleared', date: '2026-08-28' },
      { name: 'Technical Round 1 (Trees & Graphs)', status: 'Cleared', date: '2026-09-06' },
      { name: 'Technical Round 2 (DP & Low-Level Design)', status: 'Scheduled', date: '2026-09-14' },
      { name: 'Bar Raiser & Leadership Principles', status: 'Upcoming', date: '2026-09-18' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'Design distributed high-availability services serving 300M+ AWS customers worldwide.'
  },
  {
    id: 'drive-4',
    company: 'Goldman Sachs',
    logo: 'https://ui-avatars.com/api/?name=GS&background=0284c7&color=fff',
    role: 'Summer Technology Analyst',
    tier: 'Super Dream',
    packageCTC: '25.0 LPA + ₹1,00,000/mo Internship Stipend',
    inHandEstimate: '₹1,18,000 / mo',
    type: 'Off-Campus / National Contest',
    status: 'Wishlist',
    deadline: '2026-09-25',
    daysLeft: 12,
    eligibility: {
      minCGPA: 7.0,
      allowedBranches: ['All Disciplines'],
      maxBacklogs: 0,
      passingYear: 2026
    },
    location: 'Bengaluru / Mumbai',
    rounds: [
      { name: 'Aptitude & Math Section', status: 'Upcoming', date: '2026-09-28' },
      { name: 'Advanced DSA & CS Core', status: 'Upcoming', date: '2026-10-05' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'Solve quantitative computing, ultra low-latency trading engines, and financial analytics challenges.'
  },
  {
    id: 'drive-5',
    company: 'TCS (Tata Consultancy Services)',
    logo: 'https://ui-avatars.com/api/?name=TCS&background=1e3a8a&color=fff',
    role: 'TCS Digital & Prime Specialist Programmer',
    tier: 'Dream',
    packageCTC: '7.5 LPA - 9.0 LPA',
    inHandEstimate: '₹58,000 - ₹72,000 / mo',
    type: 'National Qualifier (NQT)',
    status: 'Offered',
    deadline: '2026-08-30',
    daysLeft: 0,
    eligibility: {
      minCGPA: 6.5,
      allowedBranches: ['All B.Tech/B.E/M.Tech'],
      maxBacklogs: 1,
      passingYear: 2026
    },
    location: 'Pan India (Chennai / Pune / Bengaluru)',
    rounds: [
      { name: 'NQT Foundation + Advanced Coding', status: 'Cleared', date: '2026-08-15' },
      { name: 'Technical & Managerial Interview', status: 'Cleared', date: '2026-08-25' },
      { name: 'HR & Document Verification', status: 'Cleared', date: '2026-09-01' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'Core digital business transformation working on cloud, enterprise Java, and AI modernization.'
  },
  {
    id: 'drive-6',
    company: 'Uber',
    logo: 'https://ui-avatars.com/api/?name=Uber&background=000&color=fff',
    role: 'Backend Systems Engineer',
    tier: 'Super Dream',
    packageCTC: '48.0 LPA (Base: 24 LPA + $30k RSU + Sign-on)',
    inHandEstimate: '₹1,75,000 / mo',
    type: 'Campus Drive',
    status: 'Wishlist',
    deadline: '2026-09-30',
    daysLeft: 17,
    eligibility: {
      minCGPA: 8.0,
      allowedBranches: ['CSE', 'IT'],
      maxBacklogs: 0,
      passingYear: 2026
    },
    location: 'Bengaluru / Hyderabad',
    rounds: [
      { name: 'Online Coding Challenge', status: 'Upcoming', date: '2026-10-02' },
      { name: 'Distributed Systems & Microservices', status: 'Upcoming', date: '2026-10-08' }
    ],
    verified: true,
    safetyBadge: 'PlaceGuard Verified 100% Safe',
    description: 'High-throughput real-time routing algorithms, dispatch microservices, and geo-spatial analytics.'
  }
];

export const BLACKLISTED_SCAMS = [
  {
    id: 'scam-1',
    scamTitle: 'Fake "Amazon Off-Campus HR" Telegram Drive',
    companyImpersonated: 'Amazon India',
    senderEmail: 'hr.recruitment@amazon-careers-portal.in (FAKE)',
    suspiciousIndicators: [
      'Requested ₹2,999 for "Laptop security deposit & background check fee"',
      'Telegram-only voice interview without video verification',
      'Instant offer letter sent within 30 minutes without technical evaluation',
      'Unofficial domain name (.in free registrar, not amazon.jobs)'
    ],
    reportedByUsers: 142,
    severity: 'Severe Fraud (Financial Extortion)',
    dateReported: '2026-09-05',
    verifiedFake: true,
    advice: 'Never pay any fee for campus placement. Real tech companies never ask for registration or security deposits.'
  },
  {
    id: 'scam-2',
    scamTitle: 'Fake "Google Data Entry / AI Prompt Evaluator" WhatsApp Scam',
    companyImpersonated: 'Google',
    senderEmail: 'google-hr-support@gmail.com (FAKE)',
    suspiciousIndicators: [
      'Used free @gmail.com address impersonating VP of HR',
      'Promised ₹45,000/month for 2 hours of daily typing from mobile',
      'Asked candidate to share OTP and bank account details for payroll setup before joining'
    ],
    reportedByUsers: 289,
    severity: 'Severe Fraud (Phishing & Identity Theft)',
    dateReported: '2026-09-03',
    verifiedFake: true,
    advice: 'Google only communicates through @google.com email domains and official Google Careers portal.'
  },
  {
    id: 'scam-3',
    scamTitle: 'Predatory 3-Year Bond Traps with ₹4 Lakh Penalty',
    companyImpersonated: 'Unverified Tier-3 Shadow Consultancies',
    senderEmail: 'placement@tech-innovators-hub.org',
    suspiciousIndicators: [
      '36-month mandatory bond demanding original 10th/12th/Degree certificates',
      '₹4,00,000 cheque guarantee required before starting 6-month unpaid training',
      'Monthly salary reduced to ₹8,000 during mandatory 1-year probation'
    ],
    reportedByUsers: 76,
    severity: 'High Danger (Certificate Hostage / Illegal Bond)',
    dateReported: '2026-08-29',
    verifiedFake: true,
    advice: 'Supreme Court & Indian Labour Law prohibit holding original educational certificates. Do not surrender certificates.'
  }
];

export const SAMPLE_RESUMES = {
  weak: {
    title: 'Needs Improvement (Score: 48/100)',
    role: 'Software Engineer Fresher',
    content: `John Doe
Email: john1234@gmail.com | Phone: 9876543210

Objective:
Hardworking and passionate student looking for a challenging position in a reputed IT company where I can learn new skills and contribute to company growth.

Education:
B.Tech in Computer Science, ABC College of Engineering (2022 - 2026)
CGPA: 7.8

Technical Skills:
- Programming: C, C++, Java, Python, HTML, CSS, JavaScript
- Databases: MySQL, MongoDB
- Tools: VS Code, Git

Projects:
1. E-Commerce Website
- Created an online shopping website using React and Node.js.
- Implemented user login and registration with authentication.
- Added cart system and product listings.
- Worked hard on frontend and backend integration.

2. Weather App
- Built a weather forecasting app in JavaScript.
- Connected with OpenWeather API to fetch temperature and rainfall.
- Designed responsive user interface.

Achievements:
- Participated in college coding contest.
- Member of Computer Science Club.`
  },
  strong: {
    title: 'Optimized Top 1% ATS (Score: 94/100)',
    role: 'Fullstack Software Engineer',
    content: `Alex Chen
alex.chen@email.com | +91-9876543210 | linkedin.com/in/alexchen | github.com/alexchen | LeetCode: Top 4% (Rating 1940)

EDUCATION
B.Tech in Computer Science and Engineering | National Institute of Technology (2022 – 2026)
CGPA: 8.92/10.0 | Relevant Coursework: Data Structures & Algorithms, Distributed Systems, DBMS, Operating Systems, Computer Networks

TECHNICAL SKILLS
Languages: Java, TypeScript, C++, Python, SQL, Go
Frameworks & Libraries: React.js, Next.js, Node.js, Express, Spring Boot, TailwindCSS, Redux Toolkit
Databases & Cloud: PostgreSQL, MongoDB, Redis (Caching), AWS (EC2, S3, Lambda), Docker, Kubernetes, Kafka
Developer Tools: Git, GitHub Actions (CI/CD), Postman, Linux CLI, Jest, Prometheus

EXPERIENCE / INTERNSHIPS
Software Engineering Intern | CloudScale Labs (May 2025 – July 2025)
- Engineered a distributed rate-limiter in Go and Redis handling 45,000+ requests/sec, reducing API latency by 32%.
- Designed and migrated 8 REST microservices to containerized Docker workflows on AWS ECS, slashing server costs by $1,400/month.
- Automated end-to-end CI/CD pipeline using GitHub Actions, cutting staging deployment cycle time from 28 minutes to 4.5 minutes.

PRODUCTION PROJECTS
Distributed Real-time Collaborative Code Editor (Next.js, WebSockets, Redis, WebRTC)
- Architected operational transformation algorithm supporting 50+ concurrent users with sub-20ms synchronization latency.
- Implemented isolated code execution sandbox using Docker containers with 1.2s timeout safety limits and memory fencing.
- Integrated PostgreSQL with Prisma ORM, implementing Redis caching layer achieving 99.8% cache hit ratio on active documents.

High-Performance Event Ticketing Platform (Spring Boot, Kafka, PostgreSQL, TailwindCSS)
- Prevented race condition overselling during peak traffic spikes using distributed Redis locks and optimistic concurrency control.
- Processed 10,000+ mock transactions in load testing with JMeter under 200ms p99 latency threshold.

AWARDS & COMPETITIVE PROGRAMMING
- Global Rank 340 out of 28,000+ participants in Google Kickstart Round D.
- Solved 650+ algorithmic problems across LeetCode & Codeforces (Knight Badge, Max Rating: 1940).
- Winner, Smart India Hackathon (SIH 2024) - Built AI disaster response dispatch coordination system.`
  }
};

export const MOCK_INTERVIEW_QUESTIONS = {
  'Fullstack SDE': [
    {
      id: 'q1',
      category: 'System Architecture',
      question: 'Explain how you would handle race conditions when 10,000 users try to book the last remaining 5 concert tickets simultaneously.',
      idealPoints: [
        'Distributed locking with Redis (Redlock or SETNX with TTL)',
        'Database optimistic locking with version column vs pessimistic locking (SELECT FOR UPDATE)',
        'Message queue buffering (Kafka/RabbitMQ) to serialize purchase requests',
        'Idempotency keys to prevent duplicate deductions'
      ]
    },
    {
      id: 'q2',
      category: 'Data Structures & Algorithms',
      question: 'How do you detect a cycle in a directed graph vs an undirected graph? Walk me through the time and space complexity.',
      idealPoints: [
        'Directed: DFS with recursion stack tracking (3 states: Unvisited, Visiting, Visited) or Kahns algorithm (Topological sort BFS)',
        'Undirected: Disjoint Set Union (DSU / Union-Find) or standard BFS/DFS checking parent node',
        'Time Complexity: O(V + E)',
        'Space Complexity: O(V) for visited set / recursion stack'
      ]
    },
    {
      id: 'q3',
      category: 'Behavioral / STAR',
      question: 'Tell me about a time when you had a technical disagreement with a teammate during a project deadline. How did you resolve it?',
      idealPoints: [
        'Situation: Clarify the specific project context and stakes',
        'Task: The conflicting approaches and why opinions differed',
        'Action: Data-driven benchmarking or proof-of-concept testing instead of emotional arguments',
        'Result: Team cohesion, successful delivery, and learnings'
      ]
    }
  ],
  'Core DSA & CS Fundamentals': [
    {
      id: 'q4',
      category: 'Operating Systems',
      question: 'What is the difference between a Process and a Thread? What is Context Switching overhead, and how does Virtual Memory work?',
      idealPoints: [
        'Process has separate virtual address space; Threads in same process share heap, data, code segment but have individual stacks and registers',
        'Context switching: saving CPU registers & program counter, flushing TLB cache causing cache misses',
        'Virtual memory uses MMU (Memory Management Unit) and Page Tables to map virtual to physical RAM with paging/swapping'
      ]
    },
    {
      id: 'q5',
      category: 'DBMS & SQL',
      question: 'Explain the four ACID properties with real banking transaction examples. What is the difference between Clustered and Non-Clustered Indexes?',
      idealPoints: [
        'Atomicity (All-or-nothing rollback), Consistency (Schema rules & constraints held), Isolation (Concurrency levels e.g. Read Committed, Serializable), Durability (WAL commit log saved to disk)',
        'Clustered Index determines physical order of rows on disk (only 1 per table e.g. Primary Key)',
        'Non-clustered Index is a separate B+ tree storing pointers to actual data rows'
      ]
    }
  ]
};

export const SALARY_BENCHMARKS = [
  {
    tier: 'Tier-1 Super Dream (Atlassian, Google, Uber, DE Shaw)',
    ctcRange: '₹30 - 55 LPA',
    baseSalary: '₹18 - 26 LPA',
    firstYearTakeHomeMonthly: '₹1,35,000 - ₹1,85,000',
    stocksPerYear: '₹8 - 18 LPA (4-yr vesting)',
    signOnBonus: '₹2 - 5 LPA',
    probationBond: '0 Months (No Bond)'
  },
  {
    tier: 'Tier-2 Product & FinTech (Microsoft, Amazon, Cisco, Oracle, GS)',
    ctcRange: '₹18 - 28 LPA',
    baseSalary: '₹14 - 18 LPA',
    firstYearTakeHomeMonthly: '₹1,05,000 - ₹1,30,000',
    stocksPerYear: '₹4 - 8 LPA',
    signOnBonus: '₹1.5 - 3 LPA',
    probationBond: '0 Months (No Bond)'
  },
  {
    tier: 'Tier-3 Digital & High-Growth Startups (TCS Digital, Cognizant GenC Elevate, Startups)',
    ctcRange: '₹7 - 14 LPA',
    baseSalary: '₹6.5 - 11 LPA',
    firstYearTakeHomeMonthly: '₹52,000 - ₹82,000',
    stocksPerYear: '₹0 - 2 LPA',
    signOnBonus: '₹50,000',
    probationBond: '0 - 12 Months'
  },
  {
    tier: 'Mass & Regular Services (TCS Ninja, Infosys, Wipro, Accenture)',
    ctcRange: '₹3.5 - 4.5 LPA',
    baseSalary: '₹3.0 - 3.8 LPA',
    firstYearTakeHomeMonthly: '₹24,000 - ₹31,000',
    stocksPerYear: '₹0',
    signOnBonus: '₹0',
    probationBond: '12 - 24 Months'
  }
];

export const PLACEMENT_ROADMAP_30_DAYS = [
  {
    week: 'Week 1: Algorithmic Foundations & High-Frequency Patterns',
    days: [
      { day: 'Day 1-2', topic: 'Two Pointers & Sliding Window Patterns (Max Sum Subarray, 3Sum, Trap Rain Water)', done: true },
      { day: 'Day 3-4', topic: 'Binary Search Mastery (Search in Rotated Sorted Array, Median of Two Arrays)', done: true },
      { day: 'Day 5-6', topic: 'Tree Traversals (BFS, DFS, Lowest Common Ancestor, Binary Tree Max Path Sum)', done: true },
      { day: 'Day 7', topic: 'Weekly Mock Assessment & Time Management Drill (3 questions in 60 mins)', done: false }
    ]
  },
  {
    week: 'Week 2: Graphs, Dynamic Programming & Concurrency',
    days: [
      { day: 'Day 8-9', topic: 'Graph Algorithms (Dijkstras, Kahns Topo Sort, Disjoint Set Union)', done: false },
      { day: 'Day 10-11', topic: '1D & 2D Dynamic Programming (Coin Change, Longest Common Subsequence, 0/1 Knapsack)', done: false },
      { day: 'Day 12-13', topic: 'Operating Systems: Threads, Mutex, Deadlocks, Page Replacement Algorithms', done: false },
      { day: 'Day 14', topic: 'Core CS Aptitude: Probability, Permutations, Speed-Distance & Logical Puzzles', done: false }
    ]
  },
  {
    week: 'Week 3: Low-Level System Design & Database Deep-Dive',
    days: [
      { day: 'Day 15-16', topic: 'Object-Oriented Design (SOLID principles, Factory, Strategy, Observer Pattern)', done: false },
      { day: 'Day 17-18', topic: 'Design Parking Lot, Rate Limiter & URL Shortener (LLD class diagrams)', done: false },
      { day: 'Day 19-20', topic: 'SQL Queries, Joins, Indexing B+ Trees & Database Normalization (1NF to BCNF)', done: false },
      { day: 'Day 21', topic: 'Live AI Mock Technical Round with PlaceGuard Interviewer', done: false }
    ]
  },
  {
    week: 'Week 4: HR Behavioral Mastery, STAR Framing & Final Polishing',
    days: [
      { day: 'Day 22-24', topic: 'Craft 5 Rock-Solid STAR Stories (Leadership, Conflict, Technical Failure, Innovation)', done: false },
      { day: 'Day 25-26', topic: 'Company-Specific Research: Values, Recent Products, Tech Stack & CEO vision', done: false },
      { day: 'Day 27-28', topic: 'ATS Resume Final Audit (Score 90%+) & LinkedIn Profile Polish', done: false },
      { day: 'Day 29-30', topic: 'Final Full-Length Simulation (OA + Tech 1 + Tech 2 + HR) & Offer Celebration!', done: false }
    ]
  }
];
