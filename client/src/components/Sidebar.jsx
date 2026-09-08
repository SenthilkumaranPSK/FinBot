import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileCheck2, 
  Bot, 
  ShieldAlert, 
  Compass, 
  TrendingUp, 
  Calculator, 
  BookOpen, 
  Settings,
  GraduationCap,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePlacement } from '../contexts/PlacementContext';

const NAV_ITEMS = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
  { path: '/resume-shield', icon: FileCheck2, label: 'Resume Shield ATS', badge: 'AI' },
  { path: '/mock-interview', icon: Bot, label: 'Mock AI Interview', badge: 'Live' },
  { path: '/scam-guard', icon: ShieldAlert, label: 'Scam & Offer Guard', badge: 'Alert' },
  { path: '/drives', icon: Compass, label: 'Drive Radar', badge: '3 New' },
  { path: '/skill-gap', icon: TrendingUp, label: 'Skill Gap & Roadmap', badge: null },
  { path: '/salary-insights', icon: Calculator, label: 'Salary & CTC Breakup', badge: null },
  { path: '/coach', icon: Sparkles, label: '24/7 AI Mentor', badge: null },
  { path: '/vault', icon: BookOpen, label: 'Placement Vault', badge: null },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const { profile } = usePlacement();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 270 : 84 }}
      className="hidden md:flex flex-col bg-white/95 dark:bg-[#0E131F]/95 backdrop-blur-md border-r border-slate-200 dark:border-slate-800/80 z-20 h-screen sticky top-0 transition-all duration-300 select-none shadow-sm"
    >
      {/* Brand Header */}
      <div className="h-18 flex items-center justify-between px-4 border-b border-slate-200/80 dark:border-slate-800/80 shrink-0">
        <NavLink to="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0 text-white font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                    Place <span className="text-emerald-500">Gaurd</span>
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800">
                    AI
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Campus Career Shield</span>
              </motion.div>
            )}
          </AnimatePresence>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-5 flex flex-col gap-1.5 px-3 overflow-y-auto">
        <div className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-3">
          {isOpen ? 'Placement Modules' : '•••'}
        </div>
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group text-sm font-medium relative
              ${isActive 
                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20 shadow-sm" 
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
              }
            `}
            title={item.label}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 shrink-0 transition-transform group-hover:scale-110 duration-200" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {isOpen && item.badge && (
              <span className={`
                text-[10px] font-bold px-2 py-0.5 rounded-full
                ${item.badge === 'Alert' 
                  ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-300 dark:border-rose-800 animate-pulse'
                  : item.badge === 'Live'
                  ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-300 dark:border-indigo-800'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                }
              `}>
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>

      {/* Student Readiness Badge in Sidebar */}
      {isOpen && (
        <div className="mx-3 my-2 p-3.5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-300">Readiness Score</span>
            <span className="text-xs font-bold text-emerald-400">{profile.readinessScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden mb-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
              style={{ width: `${profile.readinessScore}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>🔥 {profile.streakDays} Day Streak</span>
            <NavLink to="/profile" className="text-emerald-400 hover:underline flex items-center">
              View <ChevronRight className="w-3 h-3" />
            </NavLink>
          </div>
        </div>
      )}

      {/* Settings Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800/80">
        <NavLink
          to="/settings"
          className={({ isActive }) => `
            flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium
            ${isActive 
              ? "bg-slate-100 dark:bg-slate-800 text-emerald-500 font-semibold" 
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100"
            }
          `}
        >
          <Settings className="w-5 h-5 shrink-0" />
          {isOpen && <span className="whitespace-nowrap">Settings</span>}
        </NavLink>
      </div>
    </motion.aside>
  );
}