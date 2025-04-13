import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../lib/features/authSlice';
import postsReducer from '../../lib/features/postsSlice';
import CommentComponent from '../Comment';
import { Comment, User } from '../../types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockComment: Comment = {
  id: 1,
  postId: 1,
  name: 'Test User',
  email: 'test@example.com',
  body: 'This is a test comment.',
};

const mockAdminUser: User = {
  id: 1,
  username: 'admin',
  password: 'password',
  isAdmin: true,
};

describe('CommentComponent', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  it('renders comment details', () => {
    const mockDelete = jest.fn();
    const store = configureStore({
      reducer: {
        auth: authReducer,
        posts: postsReducer,
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
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    expect(screen.getByText(mockComment.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.email)).toBeInTheDocument();
    expect(screen.getByText(mockComment.body)).toBeInTheDocument();
  });

  it('does not show delete button for non-admin users', () => {
    const mockDelete = jest.fn();
    const store = configureStore({
      reducer: {
        auth: authReducer,
        posts: postsReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: { ...mockAdminUser, isAdmin: false },
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument();
  });

  it('shows delete button for admin users', () => {
    const mockDelete = jest.fn();
    const store = configureStore({
      reducer: {
        auth: authReducer,
        posts: postsReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: mockAdminUser,
          loading: false,
          error: null,
        },
      },
    });

    // Mock localStorage to return admin user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'isAuthenticated') return 'true';
      if (key === 'user') return JSON.stringify(mockAdminUser);
      return null;
    });

    render(
      <Provider store={store}>
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls onDelete when delete button is clicked', () => {
    const mockDelete = jest.fn();
    const store = configureStore({
      reducer: {
        auth: authReducer,
        posts: postsReducer,
      },
      preloadedState: {
        auth: {
          isAuthenticated: true,
          user: mockAdminUser,
          loading: false,
          error: null,
        },
      },
    });

    // Mock localStorage to return admin user
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'isAuthenticated') return 'true';
      if (key === 'user') return JSON.stringify(mockAdminUser);
      return null;
    });

    render(
      <Provider store={store}>
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    deleteButton.click();
    expect(mockDelete).toHaveBeenCalledWith(mockComment.id);
  });
});