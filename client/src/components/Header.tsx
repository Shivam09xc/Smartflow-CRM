
import React from 'react';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  return (
    <header className="h-16 bg-white border-b border-border-light flex items-center justify-between px-8 z-10 shrink-0">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-slate-400"
            placeholder="Search analytics, leads or deals..."
            type="text"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full relative transition-colors group">
            <span className="material-symbols-outlined group-hover:text-primary transition-colors">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>

            {/* Simple CSS Hover Dropdown for demo */}
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 hidden group-hover:block z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50">
                <h5 className="font-bold text-slate-900 text-sm">Notifications</h5>
                <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {[
                  { title: 'New Lead Assigned', time: '2 min ago', icon: 'person_add', color: 'text-blue-500 bg-blue-50' },
                  { title: 'Deal moved to Proposal', time: '1 hour ago', icon: 'handshake', color: 'text-emerald-500 bg-emerald-50' },
                  { title: 'Server Maintenance', time: '5 hours ago', icon: 'dns', color: 'text-amber-500 bg-amber-50' }
                ].map((n, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 hover:bg-slate-50 rounded-xl cursor-pointer transition-colors">
                    <div className={`size-8 rounded-full flex items-center justify-center shrink-0 ${n.color}`}>
                      <span className="material-symbols-outlined text-sm font-bold">{n.icon}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{n.title}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </button>
        </div>
        <button
          onClick={onLogout}
          className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Logout"
        >
          <span className="material-symbols-outlined">logout</span>
        </button>
        <div className="h-8 w-px bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-900 leading-none">Alex Rivera</p>
            <p className="text-[11px] text-slate-500 mt-1 uppercase font-bold tracking-tight">Admin Account</p>
          </div>
          <div className="size-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100">
            <img
              src="https://picsum.photos/seed/alex/100/100"
              alt="Alex"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
