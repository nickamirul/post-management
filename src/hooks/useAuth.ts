import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../lib/store';
import { login, logout } from '../lib/features/authSlice';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    
    if (storedAuth === 'true' && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(login(parsedUser));
      } catch {
        // Handle invalid JSON
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
    setLoading(false);
  }, [dispatch]);

  const handleLogin = (userData: User) => {
    dispatch(login(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};