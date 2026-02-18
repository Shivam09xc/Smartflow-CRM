
import React from 'react';
import { MOCK_LEADS } from '../constants';
import { LeadStatus } from '../types';

interface ContactsProps {
  onSelectContact: (id: string) => void;
}

const Contacts: React.FC<ContactsProps> = ({ onSelectContact }) => {
  // Filtering for "Converted" leads as contacts for the MVP
  const contacts = MOCK_LEADS.filter(l => l.status === LeadStatus.CONVERTED || l.status === LeadStatus.QUALIFIED);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Contacts</h1>
          <p className="text-slate-500 font-medium">Detailed database of all your converted customers and key stakeholders.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
            <span className="material-symbols-outlined text-lg">add</span>
            New Contact
          </button>
        </div>
      </div>

      <div className="bg-white border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-border-light">
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Job Title / Company</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Email & Phone</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Lifecycle Stage</th>
                <th className="px-6 py-4 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {contacts.map((contact) => (
                <tr 
                  key={contact.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                  onClick={() => onSelectContact(contact.id)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold">
                        {contact.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{contact.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">Director of Ops</p>
                    <p className="text-xs text-slate-400">{contact.company}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-700">{contact.email}</p>
                    <p className="text-xs text-slate-400">{contact.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest">Customer</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600"><span className="material-symbols-outlined">more_horiz</span></button>
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

export default Contacts;
