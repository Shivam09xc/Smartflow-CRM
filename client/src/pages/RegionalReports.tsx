
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const conversionData = [
  { name: 'NAM', value: 78 },
  { name: 'EUR', value: 62 },
  { name: 'APAC', value: 45 },
  { name: 'LATAM', value: 32 },
  { name: 'MEA', value: 54 },
];

const RegionalReports: React.FC = () => {
  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Regional Reports</h1>
          <p className="text-slate-500 mt-1 font-medium">Live revenue and conversion distribution across your organization.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => {
              const header = ['Region,Value,Growth'];
              const rows = [
                'North America,42,12',
                'Europe,28,8',
                'APAC,18,15',
                'Others,12,-2'
              ];
              const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "regional_report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02]">
            <span className="material-symbols-outlined text-sm">public</span>
            Global Filter
          </button>
        </div>
      </div>

      {/* Hero Map Section */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
          <div>
            <h3 className="font-black text-lg text-slate-900">Regional Revenue Density</h3>
            <p className="text-sm text-slate-500 font-medium">Real-time performance by geographic cluster</p>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aggregate Revenue</p>
              <p className="text-3xl font-black text-slate-900">$12,482,900</p>
            </div>
            <div className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-xl text-sm font-black">
              +14.2% ↑
            </div>
          </div>
        </div>
        <div className="h-[400px] w-full bg-slate-50 flex items-center justify-center relative p-8">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1337ec 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="w-full max-w-4xl opacity-20 dark:opacity-40 grayscale pointer-events-none">
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" alt="World Map" className="w-full h-full object-contain" />
          </div>
          {/* Stylized Hotspots */}
          <div className="absolute top-[30%] left-[25%] size-4 bg-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(19,55,236,0.5)]"></div>
          <div className="absolute top-[40%] left-[50%] size-3 bg-primary/60 rounded-full"></div>
          <div className="absolute top-[50%] right-[30%] size-3 bg-primary/40 rounded-full"></div>

          <div className="absolute bottom-8 right-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xl max-w-xs">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3">Top Region This Month</h4>
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold">NA</div>
              <div>
                <p className="text-sm font-black text-slate-900">North America</p>
                <p className="text-xs text-emerald-600 font-bold">$4,210,000 Volume</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 mb-8">Regional Conversion Rates</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={conversionData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis hide />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? '#1337ec' : '#e2e8f0'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h3 className="font-black text-lg text-slate-900 mb-6">Market Share Penetration</h3>
          <div className="space-y-6">
            {[
              { region: 'North America', share: 42, growth: 12 },
              { region: 'Europe', share: 28, growth: 8 },
              { region: 'APAC', share: 18, growth: 15 },
              { region: 'Others', share: 12, growth: -2 },
            ].map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-tighter">
                  <span className="text-slate-600">{m.region}</span>
                  <span className={m.growth > 0 ? 'text-emerald-600' : 'text-rose-500'}>{m.share}% ({m.growth > 0 ? '+' : ''}{m.growth}% Growth)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${m.share}%`, opacity: 1 - (i * 0.2) }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default RegionalReports;
