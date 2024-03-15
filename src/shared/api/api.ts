import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage';

export const $api = axios.create({
    baseURL: __API__,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}`
    return config;
})

$api.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.post<{accessToken:string}>(`${__API__}/auth/refresh-token`, {withCredentials: true})
            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.accessToken);
            return $api.request(originalRequest);
        } catch (e) {
        }
    }
    throw error;
})
