import React, { useState } from 'react';
import { 
  Compass, 
  Plus, 
  Search, 
  X
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';

const STATUS_COLUMNS = ['Wishlist', 'Applied', 'OA Scheduled', 'Technical Round', 'Offered'];

export default function DriveRadar() {
  const { drives, updateDriveStatus, addCustomDrive } = usePlacement();
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' | 'list'
  const [selectedTier, setSelectedTier] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDriveDetail, setSelectedDriveDetail] = useState(null);

  // New Drive Form State
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newCTC, setNewCTC] = useState('');
  const [newTier, setNewTier] = useState('Super Dream');
  const [newDeadline, setNewDeadline] = useState('');

  const filteredDrives = drives.filter(d => {
    const matchesTier = selectedTier === 'All' || d.tier.toLowerCase().includes(selectedTier.toLowerCase());
    const matchesSearch = d.company.toLowerCase().includes(searchQuery.toLowerCase()) || d.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newCompany || !newRole) return;

    addCustomDrive({
      id: `drive-${Date.now()}`,
      company: newCompany,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(newCompany)}&background=10b981&color=fff`,
      role: newRole,
      tier: newTier,
      packageCTC: newCTC || '₹18.0 LPA',
      inHandEstimate: '₹1,05,000 / mo',
      type: 'Campus Drive',
      status: 'Applied',
      deadline: newDeadline || '2026-10-01',
      daysLeft: 10,
      eligibility: {
        minCGPA: 7.0,
        allowedBranches: ['CSE', 'IT', 'ECE'],
        maxBacklogs: 0,
        passingYear: 2026
      },
      location: 'Bengaluru / Hybrid',
      rounds: [
        { name: 'Online Assessment', status: 'Scheduled', date: 'Upcoming' },
        { name: 'Technical Round 1', status: 'Upcoming', date: 'TBD' }
      ],
      verified: true,
      safetyBadge: 'PlaceGuard Verified',
      description: 'Custom added placement application.'
    });

    setShowAddModal(false);
    setNewCompany('');
    setNewRole('');
    setNewCTC('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" /> PlaceGuard Drive Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Placement Drive Radar
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Track eligibility cutoffs, upcoming OA deadlines, and move applications across your recruitment stages.
          </p>
        </div>

        <button 
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/25 transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Custom Drive
        </button>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search companies, roles..."
              className="bg-transparent border-none outline-none text-xs ml-2 w-full dark:text-white placeholder:text-slate-400"
            />
          </div>

          <select 
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none"
          >
            <option value="All">All CTC Tiers</option>
            <option value="Super Dream">Super Dream (&gt;20 LPA)</option>
            <option value="Dream">Dream (10 - 20 LPA)</option>
            <option value="Service">Service / Digital</option>
          </select>
        </div>

        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
          <button 
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            Kanban Board
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            List View
          </button>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STATUS_COLUMNS.map((columnStatus) => {
            const columnDrives = filteredDrives.filter(d => d.status === columnStatus);
            return (
              <div key={columnStatus} className="bg-slate-100/70 dark:bg-slate-900/50 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 min-w-[240px] space-y-3">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {columnStatus}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {columnDrives.length}
                  </span>
                </div>

                <div className="space-y-3 min-h-[300px]">
                  {columnDrives.map((drive) => (
                    <div 
                      key={drive.id}
                      onClick={() => setSelectedDriveDetail(drive)}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500/50 cursor-pointer transition-all space-y-2.5"
                    >
                      <div className="flex items-center gap-2.5">
                        <img src={drive.logo} alt={drive.company} className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 border shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{drive.company}</h4>
                          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">{drive.tier}</span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-snug">
                        {drive.role}
                      </div>

                      <div className="text-xs font-black text-slate-900 dark:text-slate-100">
                        {drive.packageCTC.split('(')[0]}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                        <span>CGPA: {drive.eligibility?.minCGPA}+</span>
                        <span className="text-amber-500 font-semibold">{drive.daysLeft}d left</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
          {filteredDrives.map((drive) => (
            <div key={drive.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="flex items-center gap-3.5">
                <img src={drive.logo} alt={drive.company} className="w-12 h-12 rounded-xl object-contain bg-white p-1 border shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">{drive.company}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                      {drive.tier}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{drive.role}</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">{drive.packageCTC}</div>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <select 
                  value={drive.status}
                  onChange={(e) => updateDriveStatus(drive.id, e.target.value)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 outline-none"
                >
                  {STATUS_COLUMNS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>

                <button 
                  onClick={() => setSelectedDriveDetail(drive)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold hover:bg-teal-500 transition-colors"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drive Detail Modal */}
      {selectedDriveDetail && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={selectedDriveDetail.logo} alt={selectedDriveDetail.company} className="w-12 h-12 rounded-xl object-contain bg-white p-1 border shrink-0" />
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{selectedDriveDetail.company}</h3>
                  <div className="text-xs text-slate-500">{selectedDriveDetail.role} • {selectedDriveDetail.tier}</div>
                </div>
              </div>
              <button onClick={() => setSelectedDriveDetail(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Package Breakdown:</span>
                <p className="text-slate-600 dark:text-slate-400 font-semibold">{selectedDriveDetail.packageCTC}</p>
                <p className="text-emerald-600 dark:text-emerald-400 font-bold mt-1">Est. Take Home: {selectedDriveDetail.inHandEstimate}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Eligibility Criteria:</span>
                <p className="text-slate-600 dark:text-slate-400">Min CGPA: {selectedDriveDetail.eligibility?.minCGPA} | Max Backlogs: {selectedDriveDetail.eligibility?.maxBacklogs}</p>
                <p className="text-slate-600 dark:text-slate-400 mt-0.5">Branches: {selectedDriveDetail.eligibility?.allowedBranches?.join(', ')}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Recruitment Rounds:</span>
                <div className="space-y-1.5 mt-2">
                  {selectedDriveDetail.rounds?.map((r, i) => (
                    <div key={i} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span>{i + 1}. {r.name}</span>
                      <span className="font-bold text-emerald-500">{r.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedDriveDetail(null)}
              className="w-full py-3 rounded-xl bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Add Custom Drive Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Add Custom Placement Drive</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Company Name</label>
                <input 
                  type="text" 
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="e.g. Cisco Systems, Oracle" 
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Role</label>
                <input 
                  type="text" 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="e.g. Software Engineer / SDE-1" 
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Package CTC</label>
                  <input 
                    type="text" 
                    value={newCTC}
                    onChange={(e) => setNewCTC(e.target.value)}
                    placeholder="e.g. 24.0 LPA" 
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Tier Category</label>
                  <select 
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                  >
                    <option value="Super Dream">Super Dream</option>
                    <option value="Dream">Dream</option>
                    <option value="Service">Service / Digital</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">Application Deadline</label>
                <input 
                  type="date" 
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs dark:text-white outline-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold text-xs transition-colors"
              >
                Save to Placement Pipeline
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
