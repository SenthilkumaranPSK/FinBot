import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  BookOpen, 
  Award, 
  ChevronRight, 
  Building2,
  Code2,
  Check
} from 'lucide-react';
import { PLACEMENT_ROADMAP_30_DAYS } from '../data/mockData';

export default function SkillGap() {
  const [targetCompany, setTargetCompany] = useState('Google');
  const [roadmap, setRoadmap] = useState(PLACEMENT_ROADMAP_30_DAYS);
  const [activeQuizIndex, setActiveQuizIndex] = useState(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState(null);

  const toggleDayTopic = (weekIndex, dayIndex) => {
    setRoadmap(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[weekIndex].days[dayIndex].done = !next[weekIndex].days[dayIndex].done;
      return next;
    });
  };

  const totalTasks = roadmap.reduce((acc, week) => acc + week.days.length, 0);
  const completedTasks = roadmap.reduce((acc, week) => acc + week.days.filter(d => d.done).length, 0);
  const progressPercent = Math.round((completedTasks / totalTasks) * 100);

  const quizQuestions = [
    {
      q: 'What is the optimal time complexity to find the Longest Increasing Subsequence (LIS)?',
      options: ['O(N^2) using standard DP', 'O(N log N) using Binary Search & Patience Sorting', 'O(N) using Sliding Window', 'O(2^N) Recursion'],
      correct: 1,
      explanation: 'LIS can be solved in O(N log N) using binary search (std::lower_bound or bisect_left in Python) to build the tails array.'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" /> PlaceGuard 30-Day Sprint
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Skill Gap Analyzer & Placement Roadmap
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Compare your algorithmic & CS core readiness against {targetCompany} benchmarks and follow a structured 4-week sprint.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold">Target Firm:</label>
          <select 
            value={targetCompany}
            onChange={(e) => setTargetCompany(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 text-amber-300 border border-slate-700 outline-none"
          >
            <option value="Google">Google (Tier-1 FAANG)</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Amazon">Amazon (AWS)</option>
            <option value="Atlassian">Atlassian</option>
            <option value="TCS Digital">TCS Digital / Prime</option>
          </select>
        </div>
      </div>

      {/* Progress & Gap Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Sprint Completion</div>
            <div className="text-3xl font-black text-amber-500 mt-1">{progressPercent}%</div>
            <div className="text-xs text-slate-500 mt-0.5">{completedTasks} of {totalTasks} milestones</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Target className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">DSA Pattern Mastery</div>
            <div className="text-3xl font-black text-emerald-500 mt-1">12/15</div>
            <div className="text-xs text-slate-500 mt-0.5">High-frequency patterns</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <Code2 className="w-7 h-7" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-400">Core CS Benchmarking</div>
            <div className="text-3xl font-black text-indigo-500 mt-1">88%</div>
            <div className="text-xs text-slate-500 mt-0.5">OS, DBMS, CN & LLD</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* 30-Day Sprint Roadmap Weeks */}
      <div className="space-y-6">
        <h3 className="font-extrabold text-xl text-slate-900 dark:text-white">
          30-Day Placement Sprint Curriculum
        </h3>

        <div className="space-y-6">
          {roadmap.map((weekData, wIdx) => (
            <div key={wIdx} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  {weekData.week}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  {weekData.days.filter(d => d.done).length}/{weekData.days.length} Done
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {weekData.days.map((dayItem, dIdx) => (
                  <div 
                    key={dIdx}
                    onClick={() => toggleDayTopic(wIdx, dIdx)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                      dayItem.done 
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="mt-0.5">
                      {dayItem.done ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-amber-500 block">{dayItem.day}</span>
                      <p className="text-xs font-medium mt-0.5 leading-relaxed">{dayItem.topic}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Concept Quiz Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white border border-indigo-500/20 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400" />
          <h4 className="font-bold text-sm text-indigo-300 uppercase tracking-wider">Quick Placement Diagnostic Quiz</h4>
        </div>

        <p className="text-sm font-semibold">{quizQuestions[0].q}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quizQuestions[0].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedQuizAnswer(idx)}
              className={`p-3.5 rounded-2xl text-xs font-medium text-left border transition-all ${
                selectedQuizAnswer === idx
                  ? idx === quizQuestions[0].correct
                    ? 'bg-emerald-900/60 border-emerald-500 text-white'
                    : 'bg-rose-900/60 border-rose-500 text-white'
                  : 'bg-slate-900/60 border-slate-700 hover:border-slate-500 text-slate-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        {selectedQuizAnswer !== null && (
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
            <span className="font-bold text-emerald-400">Explanation: </span> {quizQuestions[0].explanation}
          </div>
        )}
      </div>

    </div>
  );
}
