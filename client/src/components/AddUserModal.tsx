
import React, { useState } from 'react';
import { userService } from '../services/userService';
import { User } from '../types';

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUserAdded: (user: User) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onUserAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'User',
        team: 'General'
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const newUser = await userService.createUser(formData);
            onUserAdded(newUser);
            onClose();
            setFormData({ name: '', email: '', password: '', role: 'User', team: 'General' });
        } catch (error) {
            console.error('Failed to create user', error);
            alert('Failed to create user');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Add New User</h3>
                        <p className="text-sm text-slate-500 font-medium">Invite a team member to the platform.</p>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-white rounded-full transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Name</label>
                            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Full Name" />
                        </div>
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Email</label>
                            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="email@company.com" />
                        </div>
                        <div>
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Initial Password</label>
                            <input type="password" required value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="******" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Role</label>
                                <select value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none bg-white">
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                    <option value="Manager">Manager</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Team</label>
                                <input type="text" value={formData.team} onChange={e => setFormData({ ...formData, team: e.target.value })} className="w-full rounded-xl border-slate-200 p-3 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="e.g. Sales" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-6 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 px-6 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">
                            {loading ? 'Creating...' : 'Create User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
