import React from 'react';
import { motion } from 'framer-motion';
import { Target, Car, Home, GraduationCap, Plane, Plus, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import Confetti from 'react-confetti';

const goals = [
  { id: 1, title: 'Emergency Fund', icon: Target, current: 50000, target: 100000, color: 'text-success', bg: 'bg-success' },
  { id: 2, title: 'Dream Home', icon: Home, current: 250000, target: 2000000, color: 'text-primary', bg: 'bg-primary' },
  { id: 3, title: 'Europe Trip', icon: Plane, current: 80000, target: 150000, color: 'text-warning', bg: 'bg-warning' },
  { id: 4, title: 'New Car', icon: Car, current: 150000, target: 500000, color: 'text-error', bg: 'bg-error' },
];

const GoalCard = ({ title, icon: Icon, current, target, color, bg }) => {
  const percentage = Math.round((current / target) * 100);
  
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 relative overflow-hidden group cursor-pointer"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center bg-opacity-10 dark:bg-opacity-20", color, bg.replace('bg-', 'bg-').replace('-500', '-100'))}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Progress</p>
          <p className={cn("text-xl font-bold", color)}>{percentage}%</p>
        </div>
      </div>
      
      <h3 className="text-lg font-bold dark:text-white mb-2">{title}</h3>
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-3">
        <span>₹{current.toLocaleString()}</span>
        <span>₹{target.toLocaleString()}</span>
      </div>
      
      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 mb-4 overflow-hidden">
        <div className={cn("h-2.5 rounded-full", bg)} style={{ width: `${percentage}%` }}></div>
      </div>

      <button className="flex items-center text-sm font-semibold text-primary group-hover:underline">
        Fund Goal <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
};

export default function Goals() {
  const [showConfetti, setShowConfetti] = React.useState(false);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} onConfettiComplete={() => setShowConfetti(false)} className="fixed inset-0 z-50 pointer-events-none" />}
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Financial Goals</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Track and achieve your financial milestones.</p>
        </div>
        <button 
          onClick={() => setShowConfetti(true)} 
          className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Goal
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {goals.map((goal) => (
          <GoalCard key={goal.id} {...goal} />
        ))}
      </div>
    </motion.div>
  );
}
