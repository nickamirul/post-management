import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../lib/store';
import { login, logout } from '../lib/features/authSlice';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  
  const [localAuth, setLocalAuth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true') {
      setLocalAuth(true);
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(login(parsedUser));
      }
    }
    setLoading(false);
  }, [dispatch]);

  const handleLogin = (userData: User) => {
    dispatch(login(userData));
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
    setLocalAuth(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setLocalAuth(false);
  };

  return {
    user,
    isAuthenticated: localAuth || isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout,
  };
};