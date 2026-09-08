# 🛡️ Place Gaurd AI (PlaceGuard)

> **The Ultimate Campus Placement, Career Protection & AI Preparation Command Center.**

Place Gaurd is a fullstack AI-powered career protection and campus placement preparation platform built to shield students from fraudulent job scams while maximizing their conversion rate for Dream (>15 LPA) and Super Dream (>25 LPA) recruitment drives.

---

## 🌟 Key Features (100% Complete & Built)

### 1. 📄 AI Resume Shield & ATS Optimizer (`/resume-shield`)
- Multi-factor Applicant Tracking System (ATS) parser benchmarking against Taleo, Workday, and Greenhouse criteria.
- Real-time **keyword matching matrix** (Found vs. Missing critical skills).
- **Quantification & Impact detection** (scans for metrics, percentages, numbers).
- Weak action verb scanner with AI replacements.
- **1-Click AI Bullet Point Rewriter** (transforms passive lines into high-impact STAR bullets with copy-to-clipboard).
- One-click PDF / Audit report generator.

### 2. 🤖 AI Mock Interview Simulator (`/mock-interview`)
- Interactive technical (DSA, Systems, Fullstack) and HR behavioral interview simulator.
- Sequential contextual questioning with **live speech-to-text / typed response** handling.
- Instant real-time answer grading across **Clarity**, **Technical Depth**, **STAR Structure**, and **Confidence**.
- Model answer key and downloadable performance scorecard.

### 3. 🚨 Fake Job & Offer Letter Fraud Guard (`/scam-guard`)
- Multi-point legitimacy scanner checking for upfront registration fees, free email domains (`@gmail.com`), Telegram-only recruitment, and illegal educational certificate bonds.
- **PlaceGuard Legitimacy Risk Index** (Safe, Caution, High-Severity Scam).
- **Community Scam Blacklist**: Searchable database of reported fraud companies with real-time student broadcasting.

### 4. 🧭 Campus Placement Drive Radar & Pipeline (`/drives`)
- Comprehensive Kanban Board and List views for tracking application stages: *Wishlist → Applied → OA Scheduled → Technical Round → HR → Offered*.
- Filtering by package CTC tiers (*Super Dream*, *Dream*, *Core/Mass*), branch eligibility, and CGPA cutoffs.
- Add custom placement drives with deadline countdown timers.

### 5. 📈 Skill Gap Analyzer & 30-Day Sprint Roadmap (`/skill-gap`)
- Target company benchmarking against Google, Microsoft, Amazon, Atlassian, and TCS Digital.
- 4-week structured placement preparation sprint with interactive task checklists.
- Integrated quick diagnostic quizzes with instant explanations.

### 6. 💰 Salary, CTC & In-Hand Take Home Calculator (`/salary-insights`)
- Unmasks confusing CTC structures, 4-year stock vesting cliffs, and EPF deductions.
- Calculates exact monthly bank take-home pay under the **New Tax Regime (FY 2025-26)**.
- Top CTC traps and bond warning checklist.

### 7. 💬 24/7 Placement AI Mentor (`/coach`)
- Specialized chatbot mentor providing instant algorithmic hints, STAR behavioral interview formulas, and salary negotiation scripts.

### 8. 📚 Placement Resource Vault (`/vault`)
- High-yield placement cheat sheets, Top 100 SDE-1 DSA patterns, and standard Harvard/Stanford ATS resume templates.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS, Framer Motion, Lucide Icons, Recharts, Context API.
- **Backend:** Node.js, Express, MongoDB / In-Memory Fallback, `@google/generative-ai` (Google Gemini API).
- **Design:** Modern Glassmorphism, Dark Mode (Obsidian & Emerald Cyber Accents), Fully Responsive.

---

## 🚀 Quick Start & Installation

### 1. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

To test a production build:
```bash
npm run build
npm run preview
```

### 2. Backend Setup (Optional)
```bash
cd server
npm install
npm start
```
Runs on [http://localhost:5000](http://localhost:5000).

---

## 🔒 Security & Privacy
Place Gaurd respects user privacy and stores application pipelines, custom resumes, and interview evaluations locally using persistent browser state with zero third-party tracking.
