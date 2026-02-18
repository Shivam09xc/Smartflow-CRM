import React, { useState, useEffect } from 'react';
import { Deal } from '../types';
import { dealService } from '../services/dealService';
import { DealStage } from '../types';
import AddDealModal from '../components/AddDealModal';

const Deals: React.FC = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await dealService.getDeals();
        setDeals(data);
      } catch (error) {
        console.error('Error fetching deals', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleDealAdded = (newDeal: Deal) => {
    setDeals([newDeal, ...deals]);
    setIsAddModalOpen(false);
  };

  const handleDragStart = (id: string) => {
    setDraggedDealId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (stage: DealStage) => {
    if (!draggedDealId) return;

    const dealToUpdate = deals.find(d => d.id === draggedDealId);
    if (!dealToUpdate || dealToUpdate.stage === stage) return;

    // Optimistic update
    const updatedDeals = deals.map(d =>
      d.id === draggedDealId ? { ...d, stage } : d
    );
    setDeals(updatedDeals);
    setDraggedDealId(null);

    try {
      await dealService.updateDeal(draggedDealId, { stage });
    } catch (error) {
      console.error('Failed to update deal stage', error);
      // Revert on failure
      setDeals(deals);
    }
  };

  const stages = [
    { id: DealStage.PROSPECT, label: 'Prospect', color: 'slate' },
    { id: DealStage.QUALIFIED, label: 'Qualified', color: 'indigo' },
    { id: DealStage.PROPOSAL, label: 'Proposal', color: 'purple' },
    { id: DealStage.NEGOTIATION, label: 'Negotiation', color: 'amber' },
    { id: DealStage.WON, label: 'Won', color: 'emerald' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-8 pb-4 shrink-0 flex items-end justify-between border-b border-border-light bg-white">
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Pipeline Value</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-900">$4,280,500</h3>
              <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg">+12.5%</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Deals</span>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-black text-slate-900">42</h3>
              <span className="text-sm font-medium text-slate-500 uppercase tracking-tighter">In 5 stages</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border border-border-light px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50">
            <span className="material-symbols-outlined text-lg">filter_list</span>
            Filters
          </button>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            New Deal
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto p-8 custom-scrollbar">
        <div className="flex gap-6 h-full min-h-0">
          {stages.map((stage) => {
            const stageDeals = deals.filter(d => d.stage === stage.id);
            const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div
                key={stage.id}
                className="w-80 flex flex-col gap-4 flex-shrink-0"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(stage.id)}
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">{stage.label}</h4>
                    <span className="size-5 flex items-center justify-center rounded-full bg-slate-200 text-[10px] font-black text-slate-600">{stageDeals.length}</span>
                  </div>
                  <span className="text-xs font-black text-slate-400">${(totalValue / 1000).toFixed(0)}k</span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-1 custom-scrollbar">
                  {stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      draggable
                      onDragStart={() => handleDragStart(deal.id)}
                      className="bg-white p-5 rounded-2xl border border-border-light shadow-sm hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group active:cursor-grabbing"
                    >
                      <div className="mb-4 flex justify-between items-start">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-${stage.color}-100 text-${stage.color}-700`}>
                          {deal.stage === DealStage.WON ? 'Contract Signed' : 'Active'}
                        </span>
                        <button className="text-slate-300 hover:text-slate-500">
                          <span className="material-symbols-outlined">more_horiz</span>
                        </button>
                      </div>
                      <h5 className="text-sm font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">{deal.title}</h5>
                      <p className="text-xs text-slate-400 font-medium mb-4">{deal.company}</p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                        <div className="flex flex-col">
                          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Value</span>
                          <span className="text-sm font-black text-slate-900">${deal.value.toLocaleString()}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Prob.</span>
                          <span className="text-sm font-black text-primary">{deal.probability}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">add</span>
                    <span className="text-xs font-bold uppercase">Drop here</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AddDealModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onDealAdded={handleDealAdded}
      />
    </div>
  );
};

export default Deals;
