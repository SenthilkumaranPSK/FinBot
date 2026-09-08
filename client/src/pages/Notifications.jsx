import React, { useState } from 'react';
import { 
  Bell, 
  ShieldAlert, 
  Clock, 
  FileCheck2, 
  Bot, 
  CheckCheck, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { usePlacement } from '../contexts/PlacementContext';

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = usePlacement();
  const [filterType, setFilterType] = useState('all');

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-emerald-400" /> Notifications Feed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Placement & Threat Alerts
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Real-time updates on campus drive deadlines, scam reports, and AI interview evaluations.
          </p>
        </div>

        <button 
          onClick={markAllNotificationsRead}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-colors shrink-0"
        >
          <CheckCheck className="w-4 h-4 text-emerald-400" /> Mark All as Read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['all', 'scam', 'drive', 'resume'].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all shrink-0 ${
              filterType === type 
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800'
            }`}
          >
            {type === 'all' ? 'All Alerts' : `${type} alerts`}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden shadow-sm">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((n) => (
            <div 
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-5 flex items-start gap-4 transition-colors cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                !n.read ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                n.type === 'scam' 
                  ? 'bg-rose-500/10 text-rose-500' 
                  : n.type === 'drive'
                  ? 'bg-amber-500/10 text-amber-500'
                  : 'bg-emerald-500/10 text-emerald-500'
              }`}>
                {n.type === 'scam' ? <ShieldAlert className="w-5 h-5" /> : n.type === 'drive' ? <Clock className="w-5 h-5" /> : <FileCheck2 className="w-5 h-5" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">{n.title}</h4>
                  <span className="text-[11px] text-slate-400 shrink-0">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{n.message}</p>
              </div>

              {!n.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
              )}
            </div>
          ))
        ) : (
          <div className="p-12 text-center text-slate-400 text-xs">
            No notifications found in this category.
          </div>
        )}
      </div>

    </div>
  );
}
