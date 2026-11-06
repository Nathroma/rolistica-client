import { useAuthContext } from '@/contexts/AuthContext';

function useAuth() {
  return useAuthContext();
}

export default useAuth;
