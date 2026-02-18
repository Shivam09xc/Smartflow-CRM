
import React, { useState } from 'react';
import { Lead, LeadStatus } from '../types';
import { leadService } from '../services/leadService';

interface AddLeadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLeadAdded: (lead: Lead) => void;
}

const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose, onLeadAdded }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [organization, setOrganization] = useState('');
    const [value, setValue] = useState(0);
    const [source, setSource] = useState('Website');
    const [status, setStatus] = useState<LeadStatus>(LeadStatus.NEW);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const newLead = await leadService.createLead({
                name,
                email,
                phone,
                organization,
                source,
                status,
                value,
                assignedTo: undefined
            });
            onLeadAdded(newLead);
            onClose();
            resetForm();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create lead');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setOrganization('');
        setValue(0);
        setSource('Website');
        setStatus(LeadStatus.NEW);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Add New Lead</h3>
                        <p className="text-sm text-slate-500 font-medium">Capture a new potential customer.</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-white rounded-full"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {error && (
                    <div className="px-8 pt-4">
                        <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-bold">
                            {error}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                            <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Client Organization</label>
                            <input type="text" value={organization} onChange={e => setOrganization(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="Acme Corp" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email</label>
                            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone</label>
                            <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Estimated Value ($)</label>
                            <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="0.00" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Source</label>
                            <select value={source} onChange={e => setSource(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Social Media">Social Media</option>
                                <option value="Cold Call">Cold Call</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value as LeadStatus)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                                {Object.values(LeadStatus).map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                        <button disabled={loading} type="submit" className="flex-1 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating...' : 'Create Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLeadModal;
