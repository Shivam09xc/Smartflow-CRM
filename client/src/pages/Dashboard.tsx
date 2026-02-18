

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { analyticsService } from '../services/analyticsService';

const data = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 7000 },
  { name: 'Jun', revenue: 6000 },
  { name: 'Jul', revenue: 8500 },
];

const pieData = [
  { name: 'Organic', value: 45 },
  { name: 'Referral', value: 25 },
  { name: 'Social', value: 20 },
  { name: 'Other', value: 10 },
];

const COLORS = ['#1337ec', '#8b5cf6', '#f59e0b', '#ef4444'];

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeDeals: 0,
    pipelineValue: 0,
    conversionRate: '0%',
    wonDeals: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await analyticsService.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Executive Overview</h2>
          <p className="text-slate-500 font-medium">Real-time performance metrics</p>
        </div>
        <button className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          <span className="material-symbols-outlined">download</span>
          Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Leads', val: stats.totalLeads, change: '+12.5%', icon: 'person_add', color: 'blue' },
          { label: 'Converted', val: stats.conversionRate, change: '+2.1%', icon: 'sync_alt', color: 'purple' },
          { label: 'Active Deals', val: stats.activeDeals, change: '+5.4%', icon: 'handshake', color: 'orange' },
          { label: 'Pipeline', val: `$${stats.pipelineValue.toLocaleString()}`, change: '+18.2%', icon: 'payments', color: 'emerald' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${kpi.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  kpi.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                    kpi.color === 'orange' ? 'bg-orange-50 text-orange-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                <span className="material-symbols-outlined">{kpi.icon}</span>
              </div>
              <span className="text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-lg">{kpi.change}</span>
            </div>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{kpi.label}</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{loading ? '...' : kpi.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-slate-900">Revenue Forecast vs Actual</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="size-2 rounded-full bg-primary"></div> Actual</div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400"><div className="size-2 rounded-full bg-slate-200"></div> Forecast</div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1337ec" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1337ec" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontWeight: 'bold', color: '#1337ec' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1337ec" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-1">Lead Source</h3>
          <p className="text-sm text-slate-500 mb-8">Acquisition distribution</p>
          <div className="h-[250px] w-full relative flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <p className="text-2xl font-black text-slate-900">2.4k</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Inbound</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-xs font-bold text-slate-600">{item.name} Search</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Sales Pipeline Stages</h3>
          <div className="space-y-4">
            {[
              { label: 'New Leads', val: '12,840', width: '100%', opacity: '20' },
              { label: 'Qualified', val: '9,230', width: '75%', opacity: '40' },
              { label: 'Proposal', val: '4,120', width: '50%', opacity: '60' },
              { label: 'Closed Won', val: '342', width: '25%', opacity: '100' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="w-full h-12 bg-slate-50 rounded-lg overflow-hidden flex items-center px-6">
                  <div
                    className={`absolute inset-y-0 left-0 bg-primary border-l-4 border-primary transition-all duration-700`}
                    style={{ width: step.width, opacity: parseInt(step.opacity) / 100 }}
                  ></div>
                  <div className={`relative z-10 w-full flex justify-between items-center ${parseInt(step.opacity) > 70 ? 'text-white' : 'text-slate-700'}`}>
                    <span className="text-sm font-bold">{step.label}</span>
                    <span className="text-sm font-bold">{step.val}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-border-light shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Top Sales Reps</h3>
          <div className="space-y-6">
            {[
              { initials: 'JD', name: 'Jane Doe', progress: 85, rev: '$1.2M', color: 'bg-primary' },
              { initials: 'MS', name: 'Marcus Smith', progress: 72, rev: '$940k', color: 'bg-orange-500' },
              { initials: 'LL', name: 'Lucy Liu', progress: 68, rev: '$820k', color: 'bg-emerald-500' },
            ].map((rep, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-900 font-bold border border-slate-200">
                  {rep.initials}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 leading-none">{rep.name}</p>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className={`${rep.color} h-full transition-all duration-1000`} style={{ width: `${rep.progress}%` }}></div>
                  </div>
                </div>
                <span className="text-sm font-black text-slate-900">{rep.rev}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-xl border-2 border-slate-50 text-slate-400 text-xs font-black uppercase hover:bg-slate-50 transition-all">
            View Full Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
