import { AuthContext } from '@/context/authUtils';
import { authService } from '@/services/auth/authService';
import type { AuthTokens } from '@/types/authType';
import { useCallback, useMemo, useState, type ReactNode } from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    authService.isAuthenticated()
  );

  const login = useCallback((tokens: AuthTokens) => {
    authService.setTokens(tokens);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    authService.clearTokens();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
