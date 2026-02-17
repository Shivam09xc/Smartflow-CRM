
import React from 'react';
import { MOCK_LEADS } from '../constants';
import { LeadStatus } from '../types';

interface LeadsProps {
  onSelectLead: (id: string) => void;
}

const Leads: React.FC<LeadsProps> = ({ onSelectLead }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-sm mb-1 uppercase tracking-wider">
            <span>Sales Pipeline</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span>Active Leads</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Leads Management</h1>
          <p className="text-slate-500 font-medium">Manage and track your active sales prospects across all channels.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-border-light rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-lg">file_download</span>
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Lead
          </button>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border-light flex flex-wrap gap-4 items-center bg-slate-50/30">
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
            <span className="material-symbols-outlined text-lg">tune</span>
            Quick Filters:
          </div>
          <select className="bg-white border-border-light rounded-lg text-xs font-bold text-slate-700 focus:ring-primary/20">
            <option>Source: All</option>
          </select>
          <select className="bg-white border-border-light rounded-lg text-xs font-bold text-slate-700 focus:ring-primary/20">
            <option>Status: Active</option>
          </select>
          <button className="ml-auto text-primary text-xs font-bold hover:underline">Clear all</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-border-light">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Lead Name</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Source</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Assigned To</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {MOCK_LEADS.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectLead(lead.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-indigo-100 flex items-center justify-center text-primary font-bold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{lead.name}</p>
                        <p className="text-xs text-slate-500 font-medium">{lead.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{lead.email}</p>
                    <p className="text-xs text-slate-400">{lead.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-300 text-lg">language</span>
                      <span className="text-sm font-medium text-slate-600">{lead.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      lead.status === LeadStatus.NEW ? 'bg-blue-100 text-blue-700' :
                      lead.status === LeadStatus.IN_PROGRESS ? 'bg-amber-100 text-amber-700' :
                      lead.status === LeadStatus.CONVERTED ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="size-6 rounded-full bg-slate-100 border border-white">
                        <img src={`https://picsum.photos/seed/${lead.assignedTo}/30/30`} className="rounded-full" />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{lead.assignedTo}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
