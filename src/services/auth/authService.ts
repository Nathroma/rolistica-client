import {
  loginUser,
  logoutUser,
  refreshTokens,
  registerUser,
} from '@/services/auth/authApi';
import type {
  AuthTokens,
  LoginPayload,
  RegisterPayload,
} from '@/types/authType';
import { getAccessToken, setAccessToken } from '@/utils/tokenMemory';

const REFRESH_TOKEN_KEY = 'rolistica.refreshToken';
const LEGACY_ACCESS_TOKEN_KEY = 'rolistica.accessToken';

function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function setRefreshToken(token: string | null) {
  if (token === null) {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    return;
  }
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export const authService = {
  getAccessToken,

  isAuthenticated() {
    return getAccessToken() !== null;
  },

  setSession({ accessToken, refreshToken }: AuthTokens) {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  },

  clearSession() {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  },

  async login(payload: LoginPayload) {
    const tokens = await loginUser(payload);
    authService.setSession(tokens);
    return tokens;
  },

  async register(payload: RegisterPayload) {
    const tokens = await registerUser(payload);
    authService.setSession(tokens);
    return tokens;
  },

  async refreshSession() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const tokens = await refreshTokens(refreshToken);
    authService.setSession(tokens);
    return tokens.accessToken;
  },

  async bootstrap() {
    if (getAccessToken()) {
      return true;
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      return false;
    }

    try {
      await authService.refreshSession();
      return true;
    } catch {
      authService.clearSession();
      return false;
    }
  },

  async logout() {
    const accessToken = getAccessToken();
    try {
      if (accessToken) {
        await logoutUser(accessToken);
      }
    } catch {
      // Clear local session even if the API call fails.
    } finally {
      authService.clearSession();
    }
  },
};
