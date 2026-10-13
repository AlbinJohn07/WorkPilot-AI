import axios from 'axios';
import { ENDPOINTS } from './endpoints.js';
import { getAccess, getRefresh, setTokens, clearTokens } from '../utils/tokens.js';

const baseURL = import.meta.env.VITE_API_URL || '';

const api = axios.create({ baseURL, headers: { 'Content-Type': 'application/json' }, timeout: 15000 });

// Pass { skipAuth: true } on public calls (login, register, refresh) to skip the token and refresh logic.
api.interceptors.request.use((config) => {
  const token = getAccess();
  if (token && !config.skipAuth) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshing = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || !original || original._retry || original.skipAuth) {
      return Promise.reject(error);
    }
    const refresh = getRefresh();
    if (!refresh) return Promise.reject(error);

    original._retry = true;
    try {
      // One refresh request is shared by every call that fails at the same time.
      refreshing = refreshing || axios.post(`${baseURL}${ENDPOINTS.refresh}`, { refresh }).finally(() => { refreshing = null; });
      const { data } = await refreshing;
      setTokens({ access: data.access, refresh: data.refresh });
      original.headers.Authorization = `Bearer ${data.access}`;
      return api(original);
    } catch {
      clearTokens();
      window.dispatchEvent(new Event('auth:logout'));
      return Promise.reject(error);
    }
  }
);

export default api;
