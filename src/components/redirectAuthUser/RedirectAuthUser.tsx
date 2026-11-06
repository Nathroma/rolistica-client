import useAuth from '@/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RedirectAuthUser = () => {
  const { isReady, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isReady) {
    return null;
  }

  if (isAuthenticated) {
    return <Navigate to="/selection" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RedirectAuthUser;
