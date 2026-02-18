
import api from './api';
import { User } from '../types';

export const userService = {
    getUsers: async () => {
        const response = await api.get('/users');
        return response.data.data;
    },

    createUser: async (userData: Partial<User> & { password?: string }) => {
        const response = await api.post('/users', userData);
        return response.data.data;
    }
};
