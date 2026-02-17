
import React from 'react';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'leads', label: 'Leads', icon: 'group' },
    { id: 'contacts', label: 'Contacts', icon: 'contact_page' },
    { id: 'accounts', label: 'Accounts', icon: 'corporate_fare' },
    { id: 'deals', label: 'Deals', icon: 'handshake' },
    { id: 'tasks', label: 'Tasks', icon: 'check_box' },
    { id: 'analytics', label: 'Analytics', icon: 'bar_chart' },
    { id: 'regional-reports', label: 'Global Reports', icon: 'public' },
    { id: 'users', label: 'User Mgmt', icon: 'manage_accounts' },
    { id: 'associate-dashboard', label: 'Associate View', icon: 'person_outline' },
    { id: 'settings', label: 'Settings', icon: 'settings' },
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-white border-r border-border-light flex flex-col">
      <div className="p-6 flex items-center gap-3">
        <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <span className="material-symbols-outlined text-2xl">dataset</span>
        </div>
        <div>
          <h1 className="text-sm font-bold text-slate-900 leading-none">SmartFlow CRM</h1>
          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Enterprise SaaS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-0.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 ${
              activePage === item.id
                ? 'bg-primary/10 text-primary font-bold shadow-sm'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${activePage === item.id ? 'fill-1' : ''}`}>
              {item.icon}
            </span>
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 mt-auto">
        <div className="bg-primary/5 rounded-2xl p-4 border border-primary/10">
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Workspace</p>
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-lg bg-indigo-100 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-sm">corporate_fare</span>
            </div>
            <span className="text-sm font-bold text-slate-700">Executive Team</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
