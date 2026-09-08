import React, { useState } from 'react';
import { 
  FileCheck2, 
  Sparkles, 
  Copy, 
  Check, 
  Download, 
  RefreshCw 
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';
import { SAMPLE_RESUMES } from '../data/mockData';

export default function ResumeShield() {
  const { activeResume, resumeAnalysis, scanResume } = usePlacement();
  const [resumeText, setResumeText] = useState(activeResume);
  const [targetRole, setTargetRole] = useState('Fullstack Developer');
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState(resumeAnalysis);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const res = scanResume(resumeText, targetRole);
      setAnalysis(res);
      setIsScanning(false);
    }, 400);
  };

  const handleLoadSample = (type) => {
    const text = type === 'strong' ? SAMPLE_RESUMES.strong.content : SAMPLE_RESUMES.weak.content;
    setResumeText(text);
    const res = scanResume(text, targetRole);
    setAnalysis(res);
  };

  const copyBullet = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
              <FileCheck2 className="w-3.5 h-3.5" /> PlaceGuard ATS Shield v2.4
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Resume ATS Analyzer & Optimizer
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Pass recruitment screening filters with automated keyword matching, quantifiable impact metrics, and AI bullet rewrites.
          </p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={() => handleLoadSample('weak')}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
          >
            Load Weak Sample (48%)
          </button>
          <button 
            onClick={() => handleLoadSample('strong')}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs font-bold transition-colors"
          >
            Load Top 1% Sample (94%)
          </button>
        </div>
      </div>

      {/* Main Grid: Editor & Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Resume Input & Target Role */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
            <div className="flex items-center justify-between mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Target Role
              </label>
              <select 
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none"
              >
                <option value="Software Engineer">Software Engineer (SDE-1)</option>
                <option value="Fullstack Developer">Fullstack Developer</option>
                <option value="Data Scientist / AI">Data Scientist / AI</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>

            <textarea 
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={22}
              className="w-full flex-1 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 resize-none leading-relaxed"
              placeholder="Paste your plain text resume here..."
            />

            <button 
              onClick={handleScan}
              disabled={isScanning}
              className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning ATS Filters...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Complete ATS Audit</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (7 Cols): ATS Score & Recommendations */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Overall Score Badge */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shrink-0 shadow-lg ${
                analysis.overallScore >= 80 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30' 
                  : analysis.overallScore >= 60 
                  ? 'bg-amber-500 text-white shadow-amber-500/30' 
                  : 'bg-rose-500 text-white shadow-rose-500/30'
              }`}>
                {analysis.overallScore}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">ATS Compatibility Score</h3>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    analysis.overallScore >= 80 
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}>
                    {analysis.ratingCategory}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{analysis.status}</p>
              </div>
            </div>

            <button 
              onClick={() => alert('PlaceGuard ATS Audit Report downloaded successfully!')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Download PDF Audit
            </button>
          </div>

          {/* Sub-Score Breakdown Meters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Keywords</div>
              <div className="text-xl font-extrabold text-emerald-500 mt-1">{analysis.breakdown.keywords}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{analysis.matchedKeywords.length} found</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Impact Metrics</div>
              <div className="text-xl font-extrabold text-indigo-500 mt-1">{analysis.breakdown.impact}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{analysis.metricsFound} metrics</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Action Verbs</div>
              <div className="text-xl font-extrabold text-teal-500 mt-1">{analysis.breakdown.actionVerbs}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">{analysis.foundStrongVerbs.length} strong</div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="text-xs font-semibold text-slate-400">Core Sections</div>
              <div className="text-xl font-extrabold text-amber-500 mt-1">{analysis.breakdown.sections}%</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Structure</div>
            </div>
          </div>

          {/* Keywords Match Matrix */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3">Industry Keywords Analysis for {targetRole}</h4>
            
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block mb-1.5">
                  ✓ Matched Keywords ({analysis.matchedKeywords.length})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.matchedKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {analysis.missingKeywords.length > 0 && (
                <div>
                  <span className="text-[11px] font-semibold text-rose-600 dark:text-rose-400 block mb-1.5">
                    ✗ Missing Critical Keywords ({analysis.missingKeywords.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-[11px] font-semibold text-rose-700 dark:text-rose-300">
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI 1-Click Bullet Point Enhancer */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-sm text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              <h4 className="font-extrabold text-sm">AI 1-Click Bullet Point Rewrites</h4>
            </div>

            <div className="space-y-4">
              {analysis.bulletImprovements.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs">
                  <div className="text-slate-400 mb-2">
                    <span className="font-bold text-rose-400">Before: </span> {item.original}
                  </div>
                  <div className="text-emerald-300 font-medium bg-emerald-950/40 p-3 rounded-xl border border-emerald-900/60 mb-2">
                    <span className="font-bold text-emerald-400">AI Optimized: </span> {item.improved}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-indigo-400">{item.impact}</span>
                    <button 
                      onClick={() => copyBullet(item.improved, idx)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedIndex === idx ? 'Copied!' : 'Copy Rewritten Bullet'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
