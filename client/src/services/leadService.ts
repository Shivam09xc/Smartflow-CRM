import api from './api';
import { Lead } from '../types';

export const leadService = {
    getLeads: async () => {
        const response = await api.get('/leads');
        // Backend returns { success: true, count: number, data: Lead[] }
        return response.data.data;
    },

    getLead: async (id: string) => {
        const response = await api.get(`/leads/${id}`);
        return response.data.data;
    },

    createLead: async (leadData: Partial<Lead>) => {
        const response = await api.post('/leads', leadData);
        return response.data.data;
    },

    updateLead: async (id: string, leadData: Partial<Lead>) => {
        const response = await api.put(`/leads/${id}`, leadData);
        return response.data.data;
    },

    deleteLead: async (id: string) => {
        const response = await api.delete(`/leads/${id}`);
        return response.data;
    }
};
