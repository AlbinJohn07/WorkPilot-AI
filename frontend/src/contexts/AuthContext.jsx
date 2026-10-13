import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { registerCompany, loginRequest, fetchCurrentUser, logoutRequest } from '../api/auth.js';
import { getAccess, getRefresh, setTokens, clearTokens } from '../utils/tokens.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(getAccess() ? 'loading' : 'anonymous'); // loading | authenticated | anonymous

  const loadUser = useCallback(async () => {
    const { data } = await fetchCurrentUser();
    setUser(data);
    setStatus('authenticated');
    return data;
  }, []);

  // Restore the session on page load.
  useEffect(() => {
    if (!getAccess()) return;
    loadUser().catch(() => {
      clearTokens();
      setUser(null);
      setStatus('anonymous');
    });
  }, [loadUser]);

  // The axios layer fires this when a token refresh fails.
  useEffect(() => {
    const onForcedLogout = () => { setUser(null); setStatus('anonymous'); };
    window.addEventListener('auth:logout', onForcedLogout);
    return () => window.removeEventListener('auth:logout', onForcedLogout);
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await loginRequest(email, password);
    setTokens(data);
    return loadUser();
  }, [loadUser]);

  const register = useCallback(async (payload) => {
    const { data } = await registerCompany(payload);
    if (data?.access) {
      setTokens(data);
      return loadUser();
    }
    // The register endpoint did not return tokens, so sign in with the same credentials.
    return login(payload.email, payload.password);
  }, [login, loadUser]);

  const logout = useCallback(async () => {
    const refresh = getRefresh();
    try { if (refresh) await logoutRequest(refresh); } catch { /* clear the session locally anyway */ }
    clearTokens();
    setUser(null);
    setStatus('anonymous');
  }, []);

  const value = useMemo(() => ({ user, status, login, register, logout }), [user, status, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
