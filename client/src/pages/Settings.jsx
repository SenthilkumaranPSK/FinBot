import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Key, 
  Bell, 
  ShieldCheck, 
  Save, 
  Check, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('placeguard_custom_api_key') || '');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [scamAlerts, setScamAlerts] = useState(true);
  const [tpoSync, setTpoSync] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('placeguard_custom_api_key', apiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all saved local placement data to factory defaults?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
            <SettingsIcon className="w-3.5 h-3.5 text-emerald-400" /> Preferences
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Place Gaurd Settings & Integrations
        </h1>
        <p className="text-slate-300 text-sm mt-1">
          Configure AI keys, alert preferences, TPO placement cell sync, and theme modes.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Appearance & Mode */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Interface & Theme</h3>
          
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-indigo-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Theme Mode</div>
                <div className="text-[11px] text-slate-400">Currently active: {theme === 'dark' ? 'Dark Obsidian' : 'Clean Light'}</div>
              </div>
            </div>

            <button 
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-white shadow-sm"
            >
              Switch to {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>

        {/* Custom AI Provider Key (Gemini / OpenAI) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-emerald-500" />
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">AI Engine Configuration</h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            PlaceGuard comes pre-equipped with an intelligent algorithmic engine. You can optionally supply your own Google Gemini API key for unrestricted cloud inference.
          </p>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1.5">Custom Gemini API Key (Optional)</label>
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy..." 
              className="w-full p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono dark:text-white outline-none"
            />
          </div>
        </div>

        {/* Notification Preferences */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Alert Preferences</h3>

          <div className="space-y-3">
            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Campus Drive Deadline Alerts (48h prior)</span>
              <input 
                type="checkbox" 
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 accent-emerald-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Real-time Scam & Fake HR Radar Broadcasts</span>
              <input 
                type="checkbox" 
                checked={scamAlerts}
                onChange={(e) => setScamAlerts(e.target.checked)}
                className="w-4 h-4 accent-rose-500"
              />
            </label>

            <label className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 cursor-pointer">
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">College Placement Cell (TPO) Automated Sync</span>
              <input 
                type="checkbox" 
                checked={tpoSync}
                onChange={(e) => setTpoSync(e.target.checked)}
                className="w-4 h-4 accent-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* Save & Reset Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <button 
            type="button"
            onClick={handleResetData}
            className="text-xs text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Local Data
          </button>

          <button 
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs transition-colors flex items-center justify-center gap-2"
          >
            {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Settings Saved!' : 'Save Preferences'}</span>
          </button>
        </div>

      </form>

    </div>
  );
}
