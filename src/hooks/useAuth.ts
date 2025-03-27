import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../lib/store';
import { login, logout } from '../lib/features/authSlice';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogin = (userData: User) => {
    dispatch(login(userData));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
  };
};