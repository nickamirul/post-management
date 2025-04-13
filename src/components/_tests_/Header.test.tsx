import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../lib/features/authSlice';
import { useRouter } from 'next/navigation';
import * as useAuthModule from '../../hooks/useAuth';
import { User } from '../../types';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Header', () => {
  const mockPush = jest.fn();
  const mockLogout = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Setup mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
    });
    jest.clearAllMocks();
  });

  it('renders login button when not authenticated', () => {
    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: null,
      isAuthenticated: false,
      logout: mockLogout,
      login: mockLogin,
      loading: false,
    });

    const store = configureStore({
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

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('calls logout and redirects to login page when logout button is clicked', () => {
    const mockUser: User = {
      id: 1,
      username: 'testuser',
      password: 'testpass',
      isAdmin: false,
    };

    jest.spyOn(useAuthModule, 'useAuth').mockReturnValue({
      user: mockUser,
      isAuthenticated: true,
      logout: mockLogout,
      login: mockLogin,
      loading: false,
    });

    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: mockUser,
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});