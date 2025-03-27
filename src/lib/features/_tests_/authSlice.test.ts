import authReducer, { login, logout } from '../authSlice';
import { User } from '../../../types';

describe('authSlice', () => {
  const initialState = {
    user: null,
    isAuthenticated: false,
  };

  const mockUser: User = {
    id: 1,
    username: 'testuser',
    password: 'testpass',
    isAdmin: false,
  };

  it('should handle initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle login', () => {
    const actual = authReducer(initialState, login(mockUser));
    expect(actual.user).toEqual(mockUser);
    expect(actual.isAuthenticated).toBe(true);
  });

  it('should handle logout', () => {
    const loggedInState = {
      user: mockUser,
      isAuthenticated: true,
    };
    const actual = authReducer(loggedInState, logout());
    expect(actual.user).toBeNull();
    expect(actual.isAuthenticated).toBe(false);
  });
});