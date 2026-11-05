import { setAccessToken } from '@/utils/tokenMemory';
import axios from 'axios';

function useAuth() {
  const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password });
    if (res.status !== 200) {
      return 'failed';
    }
    setAccessToken(res.data.accessToken);
    return 'success';
  };
  const logout = () => setAccessToken(null);
  return { login, logout };
}

export default useAuth;
