// Matches the Django urls: register/, login/, refresh/, verify/, me/, logout/
const PREFIX = import.meta.env.VITE_AUTH_PREFIX || '/accounts';

export const ENDPOINTS = {
  register: `${PREFIX}/register/`,
  login: `${PREFIX}/login/`,
  refresh: `${PREFIX}/refresh/`,
  verify: `${PREFIX}/verify/`,
  me: `${PREFIX}/me/`,
  logout: `${PREFIX}/logout/`,
};
