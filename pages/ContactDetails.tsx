
import React, { useState, useEffect } from 'react';
import { MOCK_LEADS, MOCK_DEALS } from '../constants';
import { aiService } from '../geminiService';

interface ContactDetailsProps {
  leadId: string;
  onBack: () => void;
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ leadId, onBack }) => {
  const lead = MOCK_LEADS.find(l => l.id === leadId);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('timeline');
  const [notes, setNotes] = useState<string[]>(['Negotiation started with CFO.', 'Interested in the higher-tier cloud package.']);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    if (lead) {
      handleGetInsights();
    }
  }, [leadId]);

  const handleGetInsights = async () => {
    if (!lead) return;
    setIsAiLoading(true);
    const insights = await aiService.getLeadInsights(lead.name, lead.company, lead.status);
    setAiInsights(insights || "No insights found.");
    setIsAiLoading(false);
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      setNotes([newNote, ...notes]);
      setNewNote('');
    }
  };

  if (!lead) return <div>Lead not found</div>;

  return (
    <div className="p-8 space-y-8 max-w-[1440px] mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-colors">
        <span className="material-symbols-outlined">arrow_back</span>
        Back to List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-border-light p-8 shadow-sm text-center">
            <div className="relative mb-6 inline-block">
              <div className="size-28 rounded-3xl border-4 border-white shadow-xl overflow-hidden bg-indigo-50 flex items-center justify-center">
                <span className="text-3xl font-black text-primary">{lead.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="absolute bottom-1 right-1 size-6 rounded-full border-4 border-white bg-emerald-500"></div>
            </div>
            <h2 className="text-2xl font-black text-slate-900">{lead.name}</h2>
            <p className="text-slate-500 font-bold text-sm mt-1">VP of Operations at {lead.company}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">{lead.status}</span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider">Enterprise</span>
            </div>

            <div className="mt-8 space-y-4 text-left pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">mail</span>
                <span className="text-sm font-medium">{lead.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">call</span>
                <span className="text-sm font-medium">{lead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <span className="material-symbols-outlined text-lg">location_on</span>
                <span className="text-sm font-medium">San Francisco, CA</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <button className="w-full bg-primary text-white py-3 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl">send</span>
                Send Email
              </button>
              <button className="w-full border border-border-light text-slate-700 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl">edit</span>
                Edit Details
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-border-light p-6 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Custom Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['Cloud Migrator', 'Decision Maker', 'Q4 Budget'].map(tag => (
                <span key={tag} className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-[10px] font-bold text-slate-600">{tag}</span>
              ))}
              <button className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 text-[10px] font-bold text-slate-400 hover:text-primary hover:border-primary transition-all">+ Add Tag</button>
            </div>
          </div>
        </div>

        {/* Center Activity & Insights */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insights Bar */}
          <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-primary/10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined">bolt</span>
                  <h3 className="text-sm font-black uppercase tracking-widest">AI Strategic Insights</h3>
                </div>
                <button 
                  onClick={handleGetInsights}
                  disabled={isAiLoading}
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-[10px] font-bold uppercase transition-all"
                >
                  {isAiLoading ? 'Analyzing...' : 'Refresh Insights'}
                </button>
              </div>
              <div className="text-sm font-medium leading-relaxed opacity-90">
                {isAiLoading ? (
                  <div className="flex items-center gap-2 py-2">
                    <div className="animate-spin size-4 border-2 border-white/50 border-t-white rounded-full"></div>
                    Generating high-level strategic intelligence...
                  </div>
                ) : (
                  <div className="whitespace-pre-line">{aiInsights}</div>
                )}
              </div>
            </div>
          </div>

          {/* Detailed Tabs */}
          <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
            <div className="flex border-b border-border-light">
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'timeline' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600'}`}>
                Timeline
              </button>
              <button 
                onClick={() => setActiveTab('notes')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'notes' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600'}`}>
                Notes
              </button>
              <button 
                onClick={() => setActiveTab('docs')}
                className={`flex-1 py-4 text-sm font-bold transition-all ${activeTab === 'docs' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-slate-400 hover:text-slate-600'}`}>
                Attachments
              </button>
            </div>

            <div className="p-8">
              {activeTab === 'timeline' && (
                <div className="space-y-8 relative">
                  <div className="absolute left-[51px] top-12 bottom-12 w-0.5 bg-slate-100"></div>
                  {[
                    { title: 'Outbound Call - Connected', time: '2 hours ago', content: 'Discussed the upcoming Q4 expansion plans.', icon: 'call', color: 'emerald' },
                    { title: 'Email Received: "Re: Pricing Proposal"', time: 'Yesterday', content: 'Hi Sarah, thanks for the proposal...', icon: 'mail', color: 'blue' },
                  ].map((activity, i) => (
                    <div key={i} className="flex gap-6 relative">
                      <div className={`size-10 rounded-full bg-${activity.color}-100 text-${activity.color}-600 flex items-center justify-center border-4 border-white shadow-sm shrink-0 z-10`}>
                        <span className="material-symbols-outlined text-xl">{activity.icon}</span>
                      </div>
                      <div className="flex-1 bg-slate-50/50 p-5 rounded-2xl border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-bold text-slate-900">{activity.title}</h4>
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{activity.time}</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">{activity.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a private note..." 
                      className="flex-1 rounded-xl border-slate-200 text-sm focus:ring-primary focus:border-primary"
                    />
                    <button onClick={handleAddNote} className="px-6 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20">Post</button>
                  </div>
                  <div className="space-y-4">
                    {notes.map((note, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50/30">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="size-5 rounded-full bg-slate-200"></div>
                          <span className="text-xs font-bold text-slate-900">Alex Johnson</span>
                          <span className="text-[10px] text-slate-400 ml-auto">Just now</span>
                        </div>
                        <p className="text-sm text-slate-600">{note}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'Service Agreement.pdf', size: '2.4 MB' },
                    { name: 'Architecture_Diagram.png', size: '1.1 MB' },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer group">
                      <div className="size-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">description</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-900 group-hover:text-primary">{doc.name}</p>
                        <p className="text-[10px] font-bold text-slate-400">{doc.size}</p>
                      </div>
                      <button className="text-slate-300 hover:text-primary"><span className="material-symbols-outlined">download</span></button>
                    </div>
                  ))}
                  <button className="col-span-2 border-2 border-dashed border-slate-100 rounded-xl p-8 text-slate-400 hover:border-primary/50 hover:text-primary transition-all">
                    <span className="material-symbols-outlined block text-3xl mb-2">upload_file</span>
                    <span className="text-xs font-bold uppercase">Click or Drag to Upload</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
