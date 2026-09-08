import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  FileCheck2,
  Bot,
  ShieldAlert,
  Clock, 
  Flame, 
  ChevronRight,
  Zap,
  Building2
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, AreaChart, Area } from 'recharts';

export default function Dashboard() {
  const { profile, drives, scams, resumeAnalysis } = usePlacement();

  // Pipeline counts
  const pipelineCounts = {
    wishlist: drives.filter(d => d.status === 'Wishlist').length,
    applied: drives.filter(d => d.status === 'Applied').length,
    oa: drives.filter(d => d.status === 'OA Scheduled').length,
    tech: drives.filter(d => d.status === 'Technical Round').length,
    offered: drives.filter(d => d.status === 'Offered').length,
  };

  // Readiness chart data
  const weeklyPrepData = [
    { day: 'Mon', problems: 4, mockScore: 78 },
    { day: 'Tue', problems: 6, mockScore: 82 },
    { day: 'Wed', problems: 5, mockScore: 85 },
    { day: 'Thu', problems: 8, mockScore: 80 },
    { day: 'Fri', problems: 7, mockScore: 88 },
    { day: 'Sat', problems: 10, mockScore: 92 },
    { day: 'Sun', problems: 6, mockScore: 84 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Welcome Banner & Readiness Index */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700/60 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> PlaceGuard Verified Student
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-400" /> {profile.streakDays} Days Streak
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {profile.name}! 🚀
            </h1>
            <p className="text-slate-300 text-sm mt-1 max-w-xl">
              Targeting <strong className="text-emerald-400">{profile.targetRole}</strong> at <strong className="text-emerald-400">{profile.targetCompanyTier}</strong>. You have 2 campus drive deadlines this week.
            </p>
          </div>

          {/* Placement Readiness Meter */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shrink-0">
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-400 transition-all duration-1000 ease-out"
                  strokeDasharray={`${profile.readinessScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-lg font-black">{profile.readinessScore}%</span>
                <span className="text-[8px] uppercase tracking-wider text-slate-300 font-bold">Ready</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">Placement Readiness</div>
              <div className="text-xs text-emerald-300 font-semibold mt-0.5">Top 5% in Campus</div>
              <Link to="/skill-gap" className="text-[11px] text-slate-300 hover:text-white underline mt-1 block">
                Boost Score →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Application Funnel Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <Link to="/drives" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-colors">
          <div className="text-xs font-semibold text-slate-400">Wishlist</div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{pipelineCounts.wishlist}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Exploring</div>
        </Link>
        <Link to="/drives" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-colors">
          <div className="text-xs font-semibold text-slate-400">Applied</div>
          <div className="text-2xl font-black text-indigo-500 mt-1">{pipelineCounts.applied}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">In Review</div>
        </Link>
        <Link to="/drives" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-colors">
          <div className="text-xs font-semibold text-slate-400">OA Scheduled</div>
          <div className="text-2xl font-black text-amber-500 mt-1">{pipelineCounts.oa}</div>
          <div className="text-[10px] text-amber-500 font-bold mt-0.5">Action Needed</div>
        </Link>
        <Link to="/drives" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-colors">
          <div className="text-xs font-semibold text-slate-400">Tech Interviews</div>
          <div className="text-2xl font-black text-teal-500 mt-1">{pipelineCounts.tech}</div>
          <div className="text-[10px] text-teal-500 font-bold mt-0.5">Round 2</div>
        </Link>
        <Link to="/drives" className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-500 transition-colors col-span-2 sm:col-span-1">
          <div className="text-xs font-semibold text-slate-400">Offers Secured</div>
          <div className="text-2xl font-black text-emerald-500 mt-1">{pipelineCounts.offered}</div>
          <div className="text-[10px] text-emerald-500 font-bold mt-0.5">🎉 1 Offer Ready</div>
        </Link>
      </div>

      {/* Main Grid: Urgent Drives & Placement Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Active Campus Drives & Weekly Progress */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Active Campus Drives with Deadlines */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-5 h-5 text-emerald-500" />
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Active Campus Drives</h3>
              </div>
              <Link to="/drives" className="text-xs font-bold text-emerald-500 hover:underline flex items-center">
                View All {drives.length} Drives <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {drives.slice(0, 3).map((drive) => (
                <div 
                  key={drive.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-emerald-500/50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-slate-200 dark:border-slate-700 shrink-0" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900 dark:text-white">{drive.company}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                          {drive.tier}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{drive.role}</div>
                      <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 mt-1">{drive.packageCTC}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{drive.status}</div>
                      <div className="text-[11px] text-amber-500 font-semibold flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {drive.daysLeft === 0 ? 'Offer Letter Ready' : `${drive.daysLeft} days left`}
                      </div>
                    </div>

                    <Link 
                      to="/drives"
                      className="px-3.5 py-2 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-emerald-500 dark:hover:bg-emerald-400 transition-colors shrink-0"
                    >
                      Track
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Practice & Mock Scores Chart */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Preparation Velocity</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Problems solved & AI Mock performance this week</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                +24% vs Last Week
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyPrepData}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      borderColor: '#334155',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px'
                    }} 
                  />
                  <Area type="monotone" dataKey="mockScore" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#scoreColor)" name="Mock Score (%)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Scam Guard Alert & Quick Action Hub */}
        <div className="space-y-8">
          
          {/* Quick Action Hub */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Quick Action Hub</h3>
            <div className="space-y-2.5">
              <Link 
                to="/resume-shield"
                className="p-3.5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-800/60 hover:bg-emerald-100/80 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <FileCheck2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Scan Resume ATS</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Current Score: {resumeAnalysis.overallScore}/100</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              </Link>

              <Link 
                to="/mock-interview"
                className="p-3.5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/60 dark:border-indigo-800/60 hover:bg-indigo-100/80 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Start AI Mock Interview</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Fullstack / DSA / HR Rounds</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </Link>

              <Link 
                to="/scam-guard"
                className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/60 dark:border-rose-800/60 hover:bg-rose-100/80 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Verify Offer / Job Letter</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Detect Fake HRs & Bonds</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-rose-600 dark:text-rose-400" />
              </Link>

              <Link 
                to="/salary-insights"
                className="p-3.5 rounded-2xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200/60 dark:border-cyan-800/60 hover:bg-cyan-100/80 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">CTC vs In-Hand Calculator</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400">Tax & Monthly In-hand breakup</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </Link>
            </div>
          </div>

          {/* Scam Guard Active Alerts */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Fraud Shield Radar</h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400 animate-pulse">
                Active
              </span>
            </div>

            <div className="space-y-3">
              {scams.slice(0, 2).map((scam) => (
                <div key={scam.id} className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <div className="flex items-center justify-between text-xs font-bold text-rose-700 dark:text-rose-400 mb-1">
                    <span>{scam.companyImpersonated}</span>
                    <span className="text-[10px] text-slate-400">{scam.reportedByUsers} reports</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {scam.scamTitle}
                  </p>
                </div>
              ))}
            </div>

            <Link 
              to="/scam-guard"
              className="mt-4 block text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors"
            >
              Report a Scam or Verify Job →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}