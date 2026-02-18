
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Jan', actual: 4000, forecast: 4400 },
  { name: 'Feb', actual: 3000, forecast: 3200 },
  { name: 'Mar', actual: 2000, forecast: 2500 },
  { name: 'Apr', actual: 2780, forecast: 3000 },
  { name: 'May', actual: 1890, forecast: 2100 },
  { name: 'Jun', actual: 2390, forecast: 2800 },
];

const Analytics: React.FC = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Analytics & Reports</h1>
          <p className="text-slate-500 font-medium">Real-time data for your sales pipeline across all regions.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">download</span>
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', val: '$1,284,500', icon: 'payments', change: '+12.5%' },
          { label: 'Avg Deal Size', val: '$24,300', icon: 'contract', change: '+4.2%' },
          { label: 'Win Rate', val: '64.2%', icon: 'military_tech', change: '-1.8%' },
          { label: 'Sales Cycle', val: '32 Days', icon: 'hourglass_empty', change: '+8.1%' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-indigo-50 text-primary rounded-xl">
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${kpi.change.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                {kpi.change}
              </span>
            </div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.label}</p>
            <h4 className="text-2xl font-black text-slate-900 mt-1">{kpi.val}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h5 className="text-lg font-bold text-slate-900">Revenue Forecast vs Actual</h5>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="size-2 rounded-full bg-primary"></div> Actual</div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="size-2 rounded-full bg-slate-200"></div> Forecast</div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="forecast" fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="#1337ec" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <h5 className="text-lg font-bold text-slate-900 mb-6">Sales Rep Leaderboard</h5>
          <div className="space-y-6">
            {[
              { name: 'Sarah Jenkins', rev: '$342k', progress: 85, color: '#1337ec' },
              { name: 'Michael Chen', rev: '$285k', progress: 72, color: '#8b5cf6' },
              { name: 'Emily Blunt', rev: '$210k', progress: 55, color: '#f59e0b' },
              { name: 'David Ross', rev: '$198k', progress: 48, color: '#ef4444' },
            ].map((rep, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-slate-900">{rep.name}</span>
                  <span className="text-sm font-black text-primary">{rep.rev}</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${rep.progress}%`, backgroundColor: rep.color }}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-50 text-slate-400 text-xs font-black uppercase hover:bg-slate-50 transition-all">View Full Leaderboard</button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
