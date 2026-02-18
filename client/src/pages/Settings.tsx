
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profile Settings</h1>
          <p className="text-slate-500 font-medium">Manage your personal account details and preferences.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-border-light rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">Cancel</button>
          <button className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">Save Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/10 to-indigo-500/10"></div>
        <div className="px-8 pb-8 -mt-12">
          <div className="flex items-end gap-6 mb-8">
            <div className="size-28 rounded-2xl border-4 border-white shadow-xl overflow-hidden bg-white">
              <img src="https://picsum.photos/seed/alex/120/120" className="w-full h-full object-cover" />
            </div>
            <div className="pb-2">
              <h2 className="text-2xl font-black text-slate-900">Alex Johnson</h2>
              <p className="text-sm text-slate-500 font-bold">Platform Administrator • Joined Oct 2023</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
              <input type="text" defaultValue="Alex Johnson" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-sm font-bold focus:ring-primary focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <input type="email" defaultValue="alex.johnson@enterprise.com" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-sm font-bold focus:ring-primary focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Job Title</label>
              <input type="text" defaultValue="Product Operations Lead" className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-sm font-bold focus:ring-primary focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Timezone</label>
              <select className="w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-sm font-bold focus:ring-primary focus:border-primary">
                <option>Eastern Standard Time (EST)</option>
                <option>Pacific Standard Time (PST)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-light p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-8">Notification Preferences</h3>
        <div className="space-y-6">
          {[
            { title: 'Security Alerts', desc: 'Get notified about login attempts and password changes.' },
            { title: 'Weekly Analytics Report', desc: 'A summary of your lead conversion and deal velocity.' },
            { title: 'Lead Assignments', desc: 'Notify me immediately when a new lead is assigned to me.' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between pb-6 border-b border-slate-50 last:border-0 last:pb-0">
              <div>
                <p className="font-bold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={i < 2} />
                <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-red-50/30 border border-red-100 rounded-2xl p-8">
        <h3 className="text-lg font-bold text-red-700 mb-2">Danger Zone</h3>
        <p className="text-sm text-red-600/70 font-medium mb-6">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-6 py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-all">Delete Account</button>
      </div>
    </div>
  );
};

export default Settings;
