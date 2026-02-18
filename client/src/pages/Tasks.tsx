
import React, { useState, useMemo, useEffect } from 'react';
import { Task } from '../types';
import AddTaskModal from '../components/AddTaskModal';
import { taskService } from '../services/taskService';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'none' | 'high-first' | 'low-first'>('none');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getTasks();
      // Ensure data is array, if backend returns wrapped
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const priorityWeight: Record<string, number> = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  const processedTasks = useMemo(() => {
    let result = [...tasks];

    // Apply Filter
    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Apply Sort
    if (sortOrder === 'high-first') {
      result.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    } else if (sortOrder === 'low-first') {
      result.sort((a, b) => priorityWeight[a.priority] - priorityWeight[b.priority]);
    }

    return result;
  }, [tasks, sortOrder, priorityFilter]);

  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks]);
    setIsModalOpen(false);
  };

  const toggleSort = () => {
    if (sortOrder === 'none') setSortOrder('high-first');
    else if (sortOrder === 'high-first') setSortOrder('low-first');
    else setSortOrder('none');
  };

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-600 text-white border-red-700 shadow-md shadow-red-200';
      case 'Medium':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Task Management</h1>
          <p className="text-slate-500 font-medium">Prioritize your workflow and boost sales productivity.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl h-11">
            <button className="px-4 flex items-center gap-2 rounded-lg bg-white shadow-sm text-primary font-bold text-sm">
              <span className="material-symbols-outlined text-[20px]">format_list_bulleted</span>
              List
            </button>
            <button className="px-4 flex items-center gap-2 rounded-lg text-slate-500 hover:text-slate-900 font-bold text-sm transition-all">
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              Calendar
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-11 px-6 bg-primary text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            Add Task
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border-light shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border-light flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30">
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {['SJ', 'MT', 'HD'].map((initials, i) => (
                <div key={i} className="size-8 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-primary">
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm font-bold text-slate-500">Showing <span className="text-slate-900">{processedTasks.length} tasks</span></p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-border-light shadow-sm">
              <span className="material-symbols-outlined text-sm text-slate-400">filter_alt</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="border-none p-0 text-xs font-bold text-slate-600 focus:ring-0 cursor-pointer"
              >
                <option value="All">Priority: All</option>
                <option value="High">High Only</option>
                <option value="Medium">Medium Only</option>
                <option value="Low">Low Only</option>
              </select>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-border-light shadow-sm hover:border-primary/30 transition-colors">
              <span className="material-symbols-outlined text-sm text-slate-400">sort</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="border-none p-0 text-xs font-bold text-slate-600 focus:ring-0 cursor-pointer"
              >
                <option value="none">Sort: Default</option>
                <option value="high-first">Priority: High to Low</option>
                <option value="low-first">Priority: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-border-light">
                <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded text-primary focus:ring-primary" /></th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Task Details</th>
                <th
                  className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center cursor-pointer hover:text-primary transition-colors select-none"
                  onClick={toggleSort}
                >
                  <div className="flex items-center justify-center gap-1">
                    Priority
                    <span className={`material-symbols-outlined text-xs transition-all ${sortOrder !== 'none' ? 'text-primary' : 'opacity-0 group-hover:opacity-100'}`}>
                      {sortOrder === 'high-first' ? 'arrow_downward' : sortOrder === 'low-first' ? 'arrow_upward' : 'unfold_more'}
                    </span>
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Related Entity</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest">Due Date</th>
                <th className="px-6 py-4 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-6 py-4 w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light">
              {processedTasks.map((task) => (
                <tr
                  key={task.id}
                  className={`hover:bg-slate-50/50 transition-all group relative border-l-4 ${task.priority === 'High'
                    ? 'bg-red-50/20 border-l-red-600'
                    : 'border-l-transparent'
                    }`}
                >
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded text-primary focus:ring-primary" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {task.priority === 'High' ? (
                        <div className="flex items-center justify-center size-7 rounded-full bg-red-600 text-white shadow-lg shadow-red-200 animate-pulse shrink-0">
                          <span className="material-symbols-outlined text-[18px] font-black">priority_high</span>
                        </div>
                      ) : (
                        <div className="size-7 flex items-center justify-center shrink-0">
                          <div className={`size-2 rounded-full ${task.priority === 'Medium' ? 'bg-amber-400' : 'bg-blue-400'}`}></div>
                        </div>
                      )}
                      <div>
                        <p className={`text-sm font-bold ${task.status === 'Completed' ? 'text-slate-400 line-through' :
                          task.priority === 'High' ? 'text-red-900' : 'text-slate-900'
                          } group-hover:text-primary transition-colors`}>
                          {task.title}
                        </p>
                        {task.priority === 'High' && (
                          <span className="text-[9px] font-black text-red-600 uppercase tracking-tighter bg-red-100 px-1.5 py-0.5 rounded">Action Required</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all group-hover:scale-110 ${getPriorityStyles(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-lg text-slate-400">link</span>
                      <span className="text-sm font-bold text-slate-700">{task.relatedEntity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <p className={`text-sm font-bold ${task.dueDate && new Date(task.dueDate).toDateString() === new Date().toDateString()
                          ? 'text-red-600'
                          : 'text-slate-600'
                        }`}>
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      task.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-300 hover:text-slate-600">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
              {processedTasks.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
                    <p className="font-bold">No tasks found matching your filters.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default Tasks;
