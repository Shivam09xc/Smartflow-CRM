
import React from 'react';

const AssociateDashboard: React.FC = () => {
  return (
    <div className="p-8 max-w-[1440px] mx-auto w-full space-y-10">
      <header className="flex flex-col md:flex-row justify-between items-end gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Personal Focus</h1>
          <p className="text-slate-500 mt-1">Good morning, Alex. Here's your strategy for today.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-2 shadow-sm">
            <span className="material-symbols-outlined text-lg">calendar_today</span>
            My Schedule
          </button>
          <button className="bg-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">add</span>
            New Lead
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1 lg:col-span-2 bg-gradient-to-br from-primary to-[#0a1f8f] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Monthly Quota</span>
              <div className="flex items-baseline gap-4 mt-6">
                <h2 className="text-5xl font-black">$42,850</h2>
                <span className="text-emerald-400 font-bold flex items-center text-sm bg-white/10 px-2 py-0.5 rounded-lg">
                  +12.5% ↑
                </span>
              </div>
              <p className="text-white/70 text-sm mt-2">Quota Attainment: 85.7% of $50k target</p>
            </div>
            <div className="mt-12">
              <div className="flex justify-between text-xs mb-3 text-white/80 font-bold uppercase tracking-tighter">
                <span>Target Progress</span>
                <span>$7,150 remaining</span>
              </div>
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full shadow-[0_0_20px_rgba(52,211,153,0.6)] transition-all duration-1000" style={{ width: '85.7%' }}></div>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-8">
          <h3 className="text-slate-900 font-black uppercase text-xs tracking-widest text-slate-400">Quick Velocity</h3>
          <div className="space-y-6">
            {[
              { label: 'Calls Today', val: '24', icon: 'call', color: 'blue' },
              { label: 'Conversions', val: '08', icon: 'how_to_reg', color: 'orange' },
              { label: 'Pending Tasks', val: '14', icon: 'schedule', color: 'purple' },
            ].map((insight, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`size-12 rounded-2xl flex items-center justify-center bg-${insight.color}-50 text-${insight.color}-500`}>
                  <span className="material-symbols-outlined">{insight.icon}</span>
                </div>
                <div>
                  <p className="text-2xl font-black text-slate-900 leading-none">{insight.val}</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight mt-1">{insight.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div>
              <h3 className="text-lg font-bold text-slate-900">My Priority Leads</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-tighter">Ordered by Lead Score</p>
            </div>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: 'Jordan Smith', co: 'TechFlow Inc.', score: 98, status: 'Hot Lead' },
              { name: 'Maria Alvarez', co: 'Nexus Data', score: 74, status: 'Follow-up' },
              { name: 'Robert Kallis', co: 'Global Logistics', score: 42, status: 'Nurture' },
            ].map((lead, idx) => (
              <div key={idx} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900">{lead.name}</p>
                    <p className="text-xs text-slate-500">{lead.co} • Enterprise</p>
                  </div>
                  <div className="text-right">
                    <div className="px-2 py-1 rounded bg-emerald-50 text-emerald-600 text-[10px] font-black">{lead.score} SCORE</div>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tight">{lead.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-900">Today's Tasks</h3>
            <button className="material-symbols-outlined text-slate-400 hover:text-primary transition-colors">add_circle</button>
          </div>
          <div className="p-2 space-y-1">
            {[
              { title: 'Follow up with TechFlow re: Proposal', time: '2:00 PM', priority: 'High' },
              { title: 'Update CRM for Nexus Data contact', time: '5:00 PM', priority: 'Medium' },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-xl transition-all">
                <input className="size-5 rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{t.title}</p>
                  <p className="text-xs text-slate-400">Due by {t.time}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${t.priority === 'High' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-600'}`}>
                  {t.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssociateDashboard;
