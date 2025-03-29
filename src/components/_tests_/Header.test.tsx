import { render, screen } from '@testing-library/react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { store } from '../../lib/store';
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

// Mock the auth context if you're using React context
// Or remove this if you're not using auth in your Header
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: () => ({
    user: null,
    isAuthenticated: false,
    logout: jest.fn()
  })
}));

describe('Header', () => {
  beforeEach(() => {
    // Setup mock router
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/'
    });
  });

  it('renders login button when not authenticated', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});