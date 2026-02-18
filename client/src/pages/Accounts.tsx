
import React from 'react';

const Accounts: React.FC = () => {
  const accounts = [
    { name: 'Global Tech Solutions', industry: 'Software', employees: '500+', location: 'London, UK', rev: '$25M+' },
    { name: 'NexGen Retail', industry: 'E-commerce', employees: '200+', location: 'San Francisco, US', rev: '$12M+' },
    { name: 'Shield Cyber', industry: 'Cybersecurity', employees: '50+', location: 'Tel Aviv, IL', rev: '$5M+' },
    { name: 'TransWorld Corp', industry: 'Logistics', employees: '1000+', location: 'Hamburg, DE', rev: '$100M+' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Accounts</h1>
          <p className="text-slate-500 font-medium">Manage companies, organizations, and institutional clients.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Account
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {accounts.map((acc, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="size-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-primary group-hover:text-white transition-all">
              <span className="material-symbols-outlined text-2xl">corporate_fare</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{acc.name}</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{acc.industry}</p>
            
            <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Location</span>
                <span className="text-xs font-bold text-slate-700">{acc.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Size</span>
                <span className="text-xs font-bold text-slate-700">{acc.employees} Emps</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Revenue</span>
                <span className="text-xs font-black text-emerald-600">{acc.rev}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
