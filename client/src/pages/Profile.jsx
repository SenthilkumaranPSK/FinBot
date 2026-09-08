import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Save, 
  Check 
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';

export default function Profile() {
  const { profile, setProfile, resumeAnalysis } = usePlacement();
  const [formData, setFormData] = useState(profile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setProfile(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Placement Passport Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white border border-slate-700 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-emerald-500/30 shrink-0">
            {formData.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold">{formData.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> PlaceGuard Verified
              </span>
            </div>
            <p className="text-xs text-slate-300">{formData.degree}</p>
            <p className="text-xs text-slate-400 mt-0.5">{formData.college} • Batch {formData.batch}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
          <div>
            <div className="text-xs text-slate-300 font-medium">Readiness Index</div>
            <div className="text-2xl font-black text-emerald-400 mt-0.5">{formData.readinessScore}%</div>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div>
            <div className="text-xs text-slate-300 font-medium">ATS Resume Score</div>
            <div className="text-2xl font-black text-indigo-400 mt-0.5">{resumeAnalysis.overallScore}/100</div>
          </div>
        </div>
      </div>

      {/* Edit Profile Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Academic & Placement Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Campus Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">University / College</label>
            <input 
              type="text" 
              value={formData.college}
              onChange={(e) => setFormData({ ...formData, college: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Degree & Branch</label>
            <input 
              type="text" 
              value={formData.degree}
              onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">CGPA (Cumulative)</label>
            <input 
              type="text" 
              value={formData.cgpa}
              onChange={(e) => setFormData({ ...formData, cgpa: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Target Job Role</label>
            <input 
              type="text" 
              value={formData.targetRole}
              onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">LeetCode / CP Rating</label>
            <input 
              type="text" 
              value={formData.leetcodeRating}
              onChange={(e) => setFormData({ ...formData, leetcodeRating: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">GitHub Profile Link</label>
            <input 
              type="text" 
              value={formData.github}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
            />
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end">
          <button 
            type="submit"
            className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs transition-colors flex items-center gap-2"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Placement Passport Saved!' : 'Save Passport Changes'}</span>
          </button>
        </div>
      </form>

    </div>
  );
}
