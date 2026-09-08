import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileCheck2, 
  Bot, 
  ShieldAlert, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  GraduationCap, 
  AlertTriangle, 
  Calculator, 
  Layers, 
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { SAMPLE_RESUMES } from '../data/mockData';
import { analyzeResumeATS, verifyJobOrOffer } from '../services/aiPlacementEngine';

export default function LandingPage() {
  const { theme, toggleTheme } = useTheme();
  
  // Interactive Live Demo states on landing page
  const [demoTab, setDemoTab] = useState('ats'); // 'ats' | 'scam' | 'interview'
  const [demoResumeText, setDemoResumeText] = useState(SAMPLE_RESUMES.strong.content);
  const [demoAtsResult, setDemoAtsResult] = useState(() => analyzeResumeATS(SAMPLE_RESUMES.strong.content, 'Software Engineer'));
  
  const [demoScamText, setDemoScamText] = useState('Urgent: Congratulations! You are selected for Amazon Off-campus SDE role. Please deposit ₹2,999 for background verification & laptop dispatch. Join our Telegram group for joining details.');
  const [demoScamResult, setDemoScamResult] = useState(() => verifyJobOrOffer('Urgent: Congratulations! You are selected for Amazon Off-campus SDE role. Please deposit ₹2,999 for background verification & laptop dispatch. Join our Telegram group for joining details.'));

  const handleTestAts = (isSampleWeak = false) => {
    const text = isSampleWeak ? SAMPLE_RESUMES.weak.content : SAMPLE_RESUMES.strong.content;
    setDemoResumeText(text);
    setDemoAtsResult(analyzeResumeATS(text, 'Software Engineer'));
  };

  const handleTestScam = (isLegit = false) => {
    const sample = isLegit 
      ? 'Official Invitation: National Institute of Technology On-Campus Placement Drive for Microsoft SDE-1. Recruiter: careers@microsoft.com. Formal 3-round technical assessment on Codility portal.'
      : 'Urgent: Congratulations! You are selected for Amazon Off-campus SDE role. Please deposit ₹2,999 for background verification & laptop dispatch. Join our Telegram group for joining details.';
    setDemoScamText(sample);
    setDemoScamResult(verifyJobOrOffer(sample));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] text-slate-900 dark:text-white selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-[#0B0F17]/80 border-b border-slate-200/80 dark:border-slate-800/80 px-6 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight">
              Place <span className="text-emerald-500">Gaurd</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
            <a href="#features" className="hover:text-emerald-500 transition-colors">Features</a>
            <a href="#live-demo" className="hover:text-emerald-500 transition-colors">Live Demo</a>
            <a href="#scam-radar" className="hover:text-emerald-500 transition-colors">Fraud Shield</a>
            <a href="#roadmap" className="hover:text-emerald-500 transition-colors">30-Day Sprint</a>
            <a href="#testimonials" className="hover:text-emerald-500 transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link 
              to="/dashboard"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] flex items-center gap-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Live Threat Alert & Placement Marquee Ticker */}
      <div className="bg-slate-900 text-slate-200 py-2.5 px-4 text-xs font-medium border-b border-slate-800 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex items-center gap-6 animate-marquee whitespace-nowrap">
          <span className="flex items-center gap-1.5 text-rose-400 font-bold">
            <ShieldAlert className="w-4 h-4 animate-pulse text-rose-500" /> 
            LIVE ALERT: Fake "Amazon HR Telegram Drive" blocked (142 reports)
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" /> 
            50,000+ Students Protected Across 120+ Tier-1/2/3 Campuses
          </span>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Sparkles className="w-4 h-4" /> 
            PlaceGuard ATS Engine upgraded to GPT-4o & Gemini 2.0 multi-factor parser
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/20 to-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-bold mb-6 shadow-sm"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>The #1 Campus Placement & Career Protection Command Center</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
          >
            Shield Your Placement Journey. <br />
            <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 bg-clip-text text-transparent">
              Defeat Rejections & Fraud.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal"
          >
            Place Gaurd combines <strong>AI Resume ATS Scoring</strong>, <strong>Real-time Voice/Text Mock Interviews</strong>, <strong>Fake Job Scam Shield</strong>, and <strong>Campus Drive Trackers</strong> to help you land Dream & Super-Dream offers with 100% confidence.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/resume-shield"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-base shadow-xl shadow-emerald-500/25 transition-all hover:scale-105 flex items-center justify-center gap-2.5"
            >
              <FileCheck2 className="w-5 h-5" />
              <span>Scan Resume ATS (Free)</span>
            </Link>

            <Link 
              to="/mock-interview"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-emerald-500 text-slate-800 dark:text-white font-bold text-base shadow-sm transition-all hover:scale-105 flex items-center justify-center gap-2.5"
            >
              <Bot className="w-5 h-5 text-indigo-500" />
              <span>Start AI Mock Interview</span>
            </Link>
          </motion.div>

          {/* Quick Stat Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-emerald-500">99.4%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Scam Detection Accuracy</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-indigo-500">+38%</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Avg. ATS Score Boost</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-teal-500">4,800+</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Mock Rounds Completed</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-black text-amber-500">₹45 LPA</div>
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">Top Offer Secured</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Live Demo Widget Section */}
      <section id="live-demo" className="py-20 px-6 lg:px-12 bg-slate-100/70 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Interactive Test Drive
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">Experience PlaceGuard AI Instantly</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base mt-2">
              Try our core AI algorithms right now without signing in.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
              <button 
                onClick={() => setDemoTab('ats')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${demoTab === 'ats' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                1. AI Resume ATS Checker
              </button>
              <button 
                onClick={() => setDemoTab('scam')}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${demoTab === 'scam' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`}
              >
                2. Fake Job & Scam Verifier
              </button>
            </div>
          </div>

          {/* Tab 1: ATS Demo */}
          {demoTab === 'ats' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Resume Sample Text</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleTestAts(true)} 
                      className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 font-semibold"
                    >
                      Load Weak (48%)
                    </button>
                    <button 
                      onClick={() => handleTestAts(false)} 
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 font-semibold"
                    >
                      Load Top 1% (94%)
                    </button>
                  </div>
                </div>
                <textarea 
                  value={demoResumeText} 
                  onChange={(e) => {
                    setDemoResumeText(e.target.value);
                    setDemoAtsResult(analyzeResumeATS(e.target.value, 'Software Engineer'));
                  }}
                  rows={10} 
                  className="w-full p-4 text-xs font-mono rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-slate-300 resize-none"
                  placeholder="Paste your resume content here..."
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 mb-4">
                    <div>
                      <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">PlaceGuard ATS Match Score</div>
                      <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{demoAtsResult.overallScore}/100</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                      {demoAtsResult.status}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Keyword Density</span>
                      <span className="text-emerald-500">{demoAtsResult.breakdown.keywords}%</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Quantifiable Metrics & Impact</span>
                      <span className="text-indigo-500">{demoAtsResult.breakdown.impact}%</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-500">Action Verbs Strength</span>
                      <span className="text-teal-500">{demoAtsResult.breakdown.actionVerbs}%</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Top AI Recommendation:</span>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                      {demoAtsResult.suggestions[0]?.desc || 'Resume format is well-optimized for recruitment crawlers.'}
                    </p>
                  </div>
                </div>

                <Link 
                  to="/resume-shield"
                  className="mt-4 w-full py-3 text-center rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Full Resume Shield Optimizer</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}

          {/* Tab 2: Scam Demo */}
          {demoTab === 'scam' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200">Suspicious Offer / Message</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleTestScam(false)} 
                      className="text-xs px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 hover:bg-rose-200 font-semibold"
                    >
                      Load Scam Sample
                    </button>
                    <button 
                      onClick={() => handleTestScam(true)} 
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 font-semibold"
                    >
                      Load Verified Sample
                    </button>
                  </div>
                </div>
                <textarea 
                  value={demoScamText} 
                  onChange={(e) => {
                    setDemoScamText(e.target.value);
                    setDemoScamResult(verifyJobOrOffer(e.target.value));
                  }}
                  rows={8} 
                  className="w-full p-4 text-xs font-mono rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-rose-500 dark:text-slate-300 resize-none"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <div className={`flex items-center justify-between p-4 rounded-2xl border mb-4 ${demoScamResult.trustScore < 50 ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400' : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400'}`}>
                    <div>
                      <div className="text-xs font-bold uppercase">PlaceGuard Trust Score</div>
                      <div className="text-3xl font-black">{demoScamResult.trustScore}%</div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 dark:bg-slate-900 shadow-sm">
                      {demoScamResult.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {demoScamResult.redFlags.length > 0 ? (
                      demoScamResult.redFlags.map((flag, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium">
                          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                          <span>{flag.title}</span>
                        </div>
                      ))
                    ) : (
                      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>No severe fraud patterns detected. Verified safe communication.</span>
                      </div>
                    )}
                  </div>
                </div>

                <Link 
                  to="/scam-guard"
                  className="mt-4 w-full py-3 text-center rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open Full Scam Guard Database</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Core Feature Matrix */}
      <section id="features" className="py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Complete Placement Ecosystem
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 tracking-tight">
              Everything You Need to Secure Your Dream Offer
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base mt-3">
              Eliminate guesswork with AI-driven intelligence at every single stage of your campus recruitment lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCheck2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">AI Resume Shield & ATS Scanner</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Parse your resume through Tier-1 ATS algorithms (Taleo, Workday, Greenhouse). Get instant keyword matching, impact scores, and 1-click bullet point rewrites.
              </p>
              <Link to="/resume-shield" className="text-xs font-bold text-emerald-500 flex items-center gap-1.5 hover:underline">
                Optimize My Resume <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">AI Mock Interview Simulator</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Practice technical DSA, system design, and behavioral STAR rounds with an interactive AI interviewer. Receive live speech clarity, depth scores, and ideal answers.
              </p>
              <Link to="/mock-interview" className="text-xs font-bold text-indigo-500 flex items-center gap-1.5 hover:underline">
                Start Mock Interview <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldAlert className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Fake Job & Scam Shield</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Protect yourself from Telegram recruitment frauds, illegal certificate bonds, and phishing offer letters with our 10-point legitimacy radar and community blacklist.
              </p>
              <Link to="/scam-guard" className="text-xs font-bold text-rose-500 flex items-center gap-1.5 hover:underline">
                Verify Job Letter <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Layers className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Campus Drive Radar & Pipeline</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Track all upcoming campus drives in a Kanban board. Filter by CGPA cutoff, branches, package tiers (Super Dream / Dream / Mass), and never miss a deadline.
              </p>
              <Link to="/drives" className="text-xs font-bold text-teal-500 flex items-center gap-1.5 hover:underline">
                Explore Drives <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Skill Gap & 30-Day Sprint Roadmap</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Pick your dream company (Google, Amazon, Microsoft, TCS Digital) and receive a personalized 30-day curriculum with high-frequency coding patterns and quizzes.
              </p>
              <Link to="/skill-gap" className="text-xs font-bold text-amber-500 flex items-center gap-1.5 hover:underline">
                Build My Roadmap <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 text-cyan-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calculator className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">CTC vs In-Hand Take Home Breakup</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                Unmask hidden stock vesting traps, 3-year retention bonds, PF deductions, and calculate exact monthly bank credit under the latest New Tax Regime.
              </p>
              <Link to="/salary-insights" className="text-xs font-bold text-cyan-500 flex items-center gap-1.5 hover:underline">
                Calculate Real In-Hand <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-6 lg:px-12 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <GraduationCap className="w-16 h-16 mx-auto mb-6 text-emerald-400" />
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Ready to Secure Your Placement Season?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal">
            Join thousands of engineering and management students who use Place Gaurd to ace technical interviews, boost ATS scores, and avoid predatory scams.
          </p>
          <Link 
            to="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-base shadow-xl shadow-emerald-500/30 transition-transform hover:scale-105"
          >
            <span>Launch Place Gaurd Command Center</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 lg:px-12 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-500" />
            <span className="font-bold text-sm text-slate-900 dark:text-white">Place Gaurd AI</span>
            <span>— The Campus Placement & Career Protection System</span>
          </div>
          <div>
            © {new Date().getFullYear()} Place Gaurd. Built for ambitious students worldwide.
          </div>
        </div>
      </footer>
    </div>
  );
}