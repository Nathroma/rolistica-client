import { AuthContext } from '@/hooks/useAuth';
import { authService } from '@/services/auth/authService';
import type { LoginPayload, RegisterPayload } from '@/types/authType';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      const authenticated = await authService.bootstrap();
      if (!cancelled) {
        setIsAuthenticated(authenticated);
        setIsReady(true);
      }
    };

    void bootstrap();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    await authService.login(payload);
    setIsAuthenticated(true);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    await authService.register(payload);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      isReady,
      isAuthenticated,
      login,
      register,
      logout,
    }),
    [isReady, isAuthenticated, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
