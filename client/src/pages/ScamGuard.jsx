import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Plus, 
  Sparkles,
  X
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';
import { verifyJobOrOffer } from '../services/aiPlacementEngine';

export default function ScamGuard() {
  const { scams, reportScam } = usePlacement();
  
  const [inputText, setInputText] = useState('Urgent: Congratulations! You are selected for Amazon Off-campus SDE role. Please deposit ₹2,999 for background verification & laptop dispatch. Join our Telegram group for joining details.');
  const [verificationResult, setVerificationResult] = useState(() => verifyJobOrOffer('Urgent: Congratulations! You are selected for Amazon Off-campus SDE role. Please deposit ₹2,999 for background verification & laptop dispatch. Join our Telegram group for joining details.'));
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [searchFilter, setSearchFilter] = useState('');
  const [showReportModal, setShowReportModal] = useState(false);

  // New Scam Report Form State
  const [reportTitle, setReportTitle] = useState('');
  const [reportCompany, setReportCompany] = useState('');
  const [reportEmail, setReportEmail] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const res = verifyJobOrOffer(inputText);
      setVerificationResult(res);
      setIsVerifying(false);
    }, 400);
  };

  const handleReportSubmit = (e) => {
    e.preventDefault();
    if (!reportTitle || !reportCompany) return;

    reportScam({
      scamTitle: reportTitle,
      companyImpersonated: reportCompany,
      senderEmail: reportEmail || 'unknown@suspicious-domain.com',
      suspiciousIndicators: [reportDetails || 'Reported by student during campus placement drive'],
      severity: 'Severe Fraud (Community Reported)'
    });

    setShowReportModal(false);
    setReportTitle('');
    setReportCompany('');
    setReportEmail('');
    setReportDetails('');
  };

  const filteredScams = scams.filter(s => 
    s.scamTitle.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.companyImpersonated.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> PlaceGuard Scam Radar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Offer Letter & Fake Job Fraud Guard
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Detect fake Telegram drives, phishing offer letters, illegal certificate bonds, and deposit extortion scams in seconds.
          </p>
        </div>

        <button 
          onClick={() => setShowReportModal(true)}
          className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Report a Fraud
        </button>
      </div>

      {/* Main Verification Analyzer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Input Area */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Paste Job Offer / Email / WhatsApp Text
          </label>
          
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 font-mono text-xs text-slate-800 dark:text-slate-200 outline-none focus:ring-2 focus:ring-rose-500 resize-none leading-relaxed"
            placeholder="Paste suspicious text or job offer details here..."
          />

          <button 
            onClick={handleVerify}
            disabled={isVerifying || !inputText.trim()}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-bold text-sm shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{isVerifying ? 'Scanning Threat Signals...' : 'Analyze Legitimacy Score'}</span>
          </button>
        </div>

        {/* Right 7 Cols: Legitimacy Score & Red Flags */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Trust Meter Card */}
          <div className={`p-6 rounded-3xl border shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${
            verificationResult.trustScore < 50 
              ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900' 
              : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
          }`}>
            <div className="flex items-center gap-4">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl shrink-0 shadow-lg ${
                verificationResult.trustScore < 50 
                  ? 'bg-rose-500 text-white shadow-rose-500/30' 
                  : 'bg-emerald-500 text-white shadow-emerald-500/30'
              }`}>
                {verificationResult.trustScore}%
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  PlaceGuard Legitimacy Index
                </span>
                <h3 className={`font-black text-lg ${verificationResult.trustScore < 50 ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
                  {verificationResult.status}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{verificationResult.recommendation}</p>
              </div>
            </div>
          </div>

          {/* Red Flag Assessment List */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Threat Indicators Detected</h4>
            
            {verificationResult.redFlags.length > 0 ? (
              <div className="space-y-3">
                {verificationResult.redFlags.map((flag, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">{flag.title}</span>
                      <p className="text-xs text-rose-600 dark:text-rose-400 mt-0.5 leading-relaxed">{flag.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                  No critical scam markers found. Communication matches authentic placement protocols.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Community Blacklist & Reported Scams Database */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Community Blacklist & Scam Database</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Crowdsourced & verified fraudulent companies targeting campus drives</p>
          </div>

          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-1.5 border border-slate-200 dark:border-slate-700 w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search blacklisted scams..."
              className="bg-transparent border-none outline-none text-xs ml-2 w-full dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScams.map((scam) => (
            <div key={scam.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400">{scam.companyImpersonated}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                  {scam.reportedByUsers} Reports
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{scam.scamTitle}</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{scam.advice || scam.suspiciousIndicators[0]}</p>
              <div className="text-[10px] text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
                Reported: {scam.dateReported}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Report a Fake Placement Scam</h3>
              <button onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Company Impersonated</label>
                <input 
                  type="text" 
                  value={reportCompany}
                  onChange={(e) => setReportCompany(e.target.value)}
                  placeholder="e.g. Amazon, TCS, Google" 
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Scam Headline / Summary</label>
                <input 
                  type="text" 
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g. Demanding ₹3,000 for training kit via Telegram" 
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Sender Email / Phone (Optional)</label>
                <input 
                  type="text" 
                  value={reportEmail}
                  onChange={(e) => setReportEmail(e.target.value)}
                  placeholder="e.g. hr.amazon-recruit@gmail.com" 
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Details & Evidence</label>
                <textarea 
                  value={reportDetails}
                  onChange={(e) => setReportDetails(e.target.value)}
                  rows={4} 
                  placeholder="Describe the exact message and requirements asked..."
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition-colors"
              >
                Broadcast to Community Shield
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
