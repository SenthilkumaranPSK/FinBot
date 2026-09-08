import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Link, Outlet } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function AppLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F17] transition-colors duration-300 flex">
      {/* PlaceGuard Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <Navbar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Floating 24/7 AI Placement Mentor Button */}
      <Link 
        to="/coach" 
        className="fixed bottom-6 right-6 px-4 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white rounded-full flex items-center gap-2.5 shadow-[0_10px_30px_rgba(16,185,129,0.4)] hover:scale-105 hover:shadow-[0_15px_35px_rgba(16,185,129,0.5)] transition-all z-40 border border-white/20 font-semibold text-sm group"
        title="Open 24/7 Placement AI Mentor"
      >
        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        <span className="hidden sm:inline">Ask AI Mentor</span>
      </Link>
    </div>
  );
}
