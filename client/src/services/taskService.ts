
import api from './api';
import { Task } from '../types';

export const taskService = {
    getTasks: async () => {
        const response = await api.get('/tasks');
        return response.data.data;
    },

    createTask: async (taskData: Partial<Task>) => {
        const response = await api.post('/tasks', taskData);
        return response.data.data;
    },

    updateTask: async (id: string, taskData: Partial<Task>) => {
        const response = await api.put(`/tasks/${id}`, taskData);
        return response.data.data;
    },

    deleteTask: async (id: string) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    }
};
