import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from '../page';
import { Provider } from 'react-redux';
import { store } from '../../../../lib/store';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../hooks/useAuth';

// Mock the dynamic import of Lottie
jest.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => () => null,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock the useAuth hook
jest.mock('../../../../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      user: null,
    });
  });

  it('renders login form', () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // Check for input fields by placeholder text
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    // Check for login button by text
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('shows error on invalid login', async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );

    // Use placeholder text to find inputs
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, {
      target: { value: 'wronguser' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  it('redirects to posts page on successful login', async () => {
    render(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    
    const usernameInput = screen.getByPlaceholderText('Username');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: 'Login' });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/posts');
    });
  });
});