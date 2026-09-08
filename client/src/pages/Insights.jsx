import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Activity, AlertCircle } from 'lucide-react';

const categoryData = [
  { name: 'Housing', value: 15000, color: '#00ADEF' },
  { name: 'Food', value: 8000, color: '#28C76F' },
  { name: 'Transport', value: 4000, color: '#FF9F43' },
  { name: 'Entertainment', value: 3000, color: '#EA5455' },
  { name: 'Utilities', value: 2500, color: '#8B5CF6' },
];

export default function Insights() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold dark:text-white">Financial Insights</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Deep dive into your spending patterns.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Spending by Category Pie Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-bold dark:text-white mb-6">Spending by Category</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => `₹${value}`}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Highlights & AI Summary */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-lg text-white">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> AI Summary
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Your spending in <strong>Food & Dining</strong> has increased by 15% this month compared to last month. Consider utilizing our AI budget planner to keep it in check.
            </p>
            <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
              <TrendingDown className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="text-xs text-gray-400">Total Savings</p>
                <p className="text-lg font-bold">₹12,400</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold dark:text-white mb-4">Anomalies Detected</h2>
            <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/50">
              <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-800 dark:text-red-300">Unusual Subscription Charge</p>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">₹1,499 was charged by Netflix, which is ₹500 more than your usual plan.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
