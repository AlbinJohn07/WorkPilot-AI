import api from './axios.js';
import { ENDPOINTS } from './endpoints.js';

export const registerCompany = (payload) => api.post(ENDPOINTS.register, payload, { skipAuth: true });
export const loginRequest = (email, password) => api.post(ENDPOINTS.login, { email, password }, { skipAuth: true });
export const verifyToken = (token) => api.post(ENDPOINTS.verify, { token }, { skipAuth: true });
export const fetchCurrentUser = () => api.get(ENDPOINTS.me);
export const logoutRequest = (refresh) => api.post(ENDPOINTS.logout, { refresh });
