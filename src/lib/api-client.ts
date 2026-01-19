import axios from 'axios';
import { config } from '@/config';

export const apiClient = axios.create({
    baseURL: config.api.baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.headers['content-type']?.includes('text/html')) {
            return Promise.reject(new Error("API недоступне (отримано HTML). Перевірте налаштування MSW."));
        }
        return Promise.reject(error);
    }
);