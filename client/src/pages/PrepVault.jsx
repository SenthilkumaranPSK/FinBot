import React from 'react';
import { 
  BookOpen, 
  FileText, 
  Code2, 
  Download, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Database,
  Cpu
} from 'lucide-react';

export default function PrepVault() {
  const resources = [
    {
      title: 'Top 100 SDE-1 DSA Coding Patterns (LeetCode Curated)',
      category: 'Algorithms & Coding',
      icon: Code2,
      desc: 'Master Two Pointers, Sliding Window, Graph DFS/BFS, and Dynamic Programming with optimal Java/C++/Python solutions.',
      tag: 'Tier-1 Essential',
      link: '#'
    },
    {
      title: 'Harvard & Stanford Standard Tech ATS Resume Templates',
      category: 'Resume & Branding',
      icon: FileText,
      desc: 'Tested and proven LaTeX & Word resume formats that achieve 90%+ parse accuracy on Taleo, Workday, and Greenhouse.',
      tag: '100% Free Download',
      link: '#'
    },
    {
      title: 'System Design Primer for Campus Placements (LLD & HLD)',
      category: 'Architecture',
      icon: Layers,
      desc: 'Design Rate Limiters, URL Shorteners, Parking Lots, and Elevator Systems with UML class diagrams & code blueprints.',
      tag: 'Super Dream Prep',
      link: '#'
    },
    {
      title: 'Core CS Interview Handbook (DBMS, OS, Computer Networks)',
      category: 'CS Fundamentals',
      icon: Database,
      desc: 'ACID properties, B+ Tree indexing, Virtual memory paging, Mutex locks, and TCP 3-way handshakes explained concisely.',
      tag: 'Campus Must-Have',
      link: '#'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> PlaceGuard Vault
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Placement Prep & Resource Vault
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Curated high-yield cheat-sheets, tested ATS resume templates, and top interview questions for campus recruitment.
          </p>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((res, i) => (
          <div key={i} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-emerald-500/50 transition-all flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <res.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {res.tag}
                </span>
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">{res.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{res.desc}</p>
            </div>

            <button 
              onClick={() => alert(`Downloading ${res.title}... Ready in seconds.`)}
              className="w-full py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" /> Download Resource Package
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
