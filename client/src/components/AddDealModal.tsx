
import React, { useState } from 'react';
import { Deal, DealStage } from '../types';
import { dealService } from '../services/dealService';

interface AddDealModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDealAdded: (deal: Deal) => void;
}

const AddDealModal: React.FC<AddDealModalProps> = ({ isOpen, onClose, onDealAdded }) => {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState(0);
    const [stage, setStage] = useState<DealStage>(DealStage.PROSPECT);
    const [probability, setProbability] = useState(10);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Backend expects: title, value, stage, probability.
            // assignedTo and company are handled by backend controller (req.user)
            const newDeal = await dealService.createDeal({
                title,
                value,
                stage,
                probability
            });
            onDealAdded(newDeal);
            onClose();
            resetForm();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to create deal');
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setValue(0);
        setStage(DealStage.PROSPECT);
        setProbability(10);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Create New Deal</h3>
                        <p className="text-sm text-slate-500 font-medium">Add a new opportunity to your pipeline.</p>
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
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Deal Title</label>
                            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="e.g. Acme Corp Contract" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Value ($)</label>
                                <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="0.00" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Probability (%)</label>
                                <input type="number" min="0" max="100" value={probability} onChange={e => setProbability(Number(e.target.value))} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none" placeholder="50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Stage</label>
                            <select value={stage} onChange={e => setStage(e.target.value as DealStage)} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none bg-white">
                                {Object.values(DealStage).map(s => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                        <button disabled={loading} type="submit" className="flex-1 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? 'Creating...' : 'Create Deal'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddDealModal;
