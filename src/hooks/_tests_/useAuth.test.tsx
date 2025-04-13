// useAuth.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../useAuth';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../lib/features/authSlice';
import { User } from '../../types';

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
  },
  preloadedState: {
    auth: {
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={mockStore}>{children}</Provider>
);

describe('useAuth', () => {
  beforeEach(() => {
    // Clear localStorage and reset all mocks
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should have initial null user and not authenticated', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    
    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should login and logout user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      password: 'testpass',
      isAdmin: false,
    };

    act(() => {
      result.current.login(mockUser);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorage.getItem('isAuthenticated')).toBe('true');
    expect(JSON.parse(localStorage.getItem('user') || '')).toEqual(mockUser);

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('isAuthenticated')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
  });

  it('initializes auth state from localStorage', () => {
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      password: 'password',
      isAdmin: false,
    };

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(mockUser));

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles empty localStorage', () => {
    localStorage.clear();
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });

  it('handles invalid localStorage data', () => {
    localStorage.setItem('isAuthenticated', 'invalid');
    localStorage.setItem('user', 'invalid json');

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.user).toBeNull();
  });
});