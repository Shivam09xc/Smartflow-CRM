import api from './api';
import { Deal } from '../types';

export const dealService = {
    getDeals: async () => {
        const response = await api.get('/deals');
        return response.data.data;
    },

    getDeal: async (id: string) => {
        const response = await api.get(`/deals/${id}`);
        return response.data.data;
    },

    createDeal: async (dealData: Partial<Deal>) => {
        const response = await api.post('/deals', dealData);
        return response.data.data;
    },

    updateDeal: async (id: string, dealData: Partial<Deal>) => {
        const response = await api.put(`/deals/${id}`, dealData);
        return response.data.data;
    },

    deleteDeal: async (id: string) => {
        const response = await api.delete(`/deals/${id}`);
        return response.data;
    }
};
