import { setAccessToken } from '@/utils/tokenMemory';
import axios from 'axios';

function useAuth() {
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post('http://localhost:3000/v1/auth/login', {
        email,
        password,
      });
      if (res.status !== 200) {
        return 'failed';
      }
      setAccessToken(res.data.accessToken);
    } catch {
      return 'failed';
    }
  };
  const logout = () => setAccessToken(null);
  return { login, logout };
}

export default useAuth;
