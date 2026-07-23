import { AuthTokens } from '@/types/authType';
import { createContext, useContext } from 'react';

type AuthContextValue = {
  isAuthenticated: boolean;
  login: (tokens: AuthTokens) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
