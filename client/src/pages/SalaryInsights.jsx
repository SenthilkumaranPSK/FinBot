import React, { useState } from 'react';
import { 
  Calculator, 
  ShieldAlert 
} from 'lucide-react';
import { SALARY_BENCHMARKS } from '../data/mockData';
import { calculateInHandSalary } from '../services/aiPlacementEngine';

export default function SalaryInsights() {
  const [ctcLakhs, setCtcLakhs] = useState(24);
  const [annualBonus, setAnnualBonus] = useState(2);
  const [stocksFourYears, setStocksFourYears] = useState(8);

  const calc = calculateInHandSalary(ctcLakhs, annualBonus, stocksFourYears);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5" /> PlaceGuard In-Hand Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Salary, CTC & In-Hand Take Home Calculator
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Unmask confusing CTC structures, stock vesting cliffs, EPF deductions, and calculate your exact monthly bank salary.
          </p>
        </div>
      </div>

      {/* Main Grid: Interactive Calculator & Monthly Breakup */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 5 Cols: Input Controls */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Offer Package Components</h3>

          {/* CTC Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">Total Quoted CTC</span>
              <span className="text-cyan-600 dark:text-cyan-400 text-sm font-black">₹{ctcLakhs} LPA</span>
            </div>
            <input 
              type="range" 
              min={3} 
              max={60} 
              step={0.5}
              value={ctcLakhs}
              onChange={(e) => setCtcLakhs(parseFloat(e.target.value))}
              className="w-full accent-cyan-500"
            />
          </div>

          {/* Stocks Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">4-Year Total Stocks / RSUs</span>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-black">₹{stocksFourYears} LPA Total</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={30} 
              step={0.5}
              value={stocksFourYears}
              onChange={(e) => setStocksFourYears(parseFloat(e.target.value))}
              className="w-full accent-indigo-500"
            />
            <span className="text-[10px] text-slate-400 block">(Vests at ~₹{(stocksFourYears/4).toFixed(1)} LPA per year)</span>
          </div>

          {/* Joining Bonus Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-slate-600 dark:text-slate-400">1st Year Sign-on / Relocation Bonus</span>
              <span className="text-amber-600 dark:text-amber-400 text-sm font-black">₹{annualBonus} LPA</span>
            </div>
            <input 
              type="range" 
              min={0} 
              max={10} 
              step={0.5}
              value={annualBonus}
              onChange={(e) => setAnnualBonus(parseFloat(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs text-cyan-800 dark:text-cyan-300">
            <span className="font-bold">Calculated Base Salary: </span> ₹{calc.baseSalary} LPA (Excluding deferred stocks & bonuses)
          </div>
        </div>

        {/* Right 7 Cols: Monthly In-hand Card & Deductions */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* In-Hand Monthly Take-home Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-100">
                Estimated Monthly In-Hand Salary (Bank Credit)
              </span>
              <div className="text-4xl sm:text-5xl font-black mt-1">
                ₹{calc.monthlyInHand.toLocaleString('en-IN')} <span className="text-sm font-bold text-emerald-100">/ month</span>
              </div>
              <p className="text-xs text-emerald-100 mt-2">
                Under New Tax Regime (FY 2025-26) with standard deductions.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md text-center shrink-0">
              <div className="text-2xl font-black">{calc.takeHomePercentage}%</div>
              <div className="text-[10px] uppercase font-bold text-emerald-100">Of CTC In-Hand</div>
            </div>
          </div>

          {/* Monthly Deductions Breakdown */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Monthly Cashflow Breakdown</h4>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-500 font-medium">Gross Monthly Base</span>
                <span className="font-bold text-slate-900 dark:text-white">₹{calc.grossMonthly.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-500 font-medium">Income Tax (TDS Deduction)</span>
                <span className="font-bold text-rose-500">- ₹{calc.monthlyTax.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-500 font-medium">Employee Provident Fund (EPF 12%)</span>
                <span className="font-bold text-amber-500">- ₹{calc.monthlyPF.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="text-slate-500 font-medium">Professional Tax</span>
                <span className="font-bold text-slate-500">- ₹200</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTC Traps & Bonds Warning Shield */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <ShieldAlert className="w-5 h-5" />
          <h3 className="font-extrabold text-base">Top 4 "CTC Traps" Every Placement Student Must Watch For</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">1. Inflated Stock Grants with 1-Year Cliff</span>
            <p className="text-slate-400 leading-relaxed">Companies often quote 4 years of stocks as annual CTC. If you leave within 11 months, you get 0 shares.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">2. Joining Bonus Clawback Clauses</span>
            <p className="text-slate-400 leading-relaxed">Sign-on bonuses must be repaid in full with interest if you exit before completing 12-24 continuous months.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">3. Gratuity Included in CTC</span>
            <p className="text-slate-400 leading-relaxed">Gratuity is only payable after 5 uninterrupted years of service at the exact same firm.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1">
            <span className="font-bold text-white block">4. Mandatory Unpaid Training Periods</span>
            <p className="text-slate-400 leading-relaxed">Some firms reduce CTC to nominal ₹8k stipends during initial 3-6 months probation.</p>
          </div>
        </div>
      </div>

      {/* Campus CTC Tier Benchmarks Table */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">Campus Industry Package Benchmarks</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="pb-3 font-bold">Tier / Category</th>
                <th className="pb-3 font-bold">Quoted CTC</th>
                <th className="pb-3 font-bold">Fixed Base</th>
                <th className="pb-3 font-bold">In-Hand Take Home</th>
                <th className="pb-3 font-bold">Bond Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {SALARY_BENCHMARKS.map((bench, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white">{bench.tier}</td>
                  <td className="py-3.5 text-cyan-600 dark:text-cyan-400 font-bold">{bench.ctcRange}</td>
                  <td className="py-3.5">{bench.baseSalary}</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">{bench.firstYearTakeHomeMonthly}</td>
                  <td className="py-3.5">{bench.probationBond}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
