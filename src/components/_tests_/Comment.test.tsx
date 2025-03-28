import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../lib/features/authSlice';
import postsReducer from '../../lib/features/postsSlice';
import CommentComponent from '../Comment';
import { Comment } from '../../types';

const mockStore = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

const mockComment: Comment = {
  id: 1,
  postId: 1,
  name: 'Test User',
  email: 'test@example.com',
  body: 'This is a test comment.',
};

describe('CommentComponent', () => {
  it('renders comment details', () => {
    const mockDelete = jest.fn();
    render(
      <Provider store={mockStore}>
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    expect(screen.getByText(mockComment.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.email)).toBeInTheDocument();
    expect(screen.getByText(mockComment.body)).toBeInTheDocument();
  });

  it('does not show delete button for non-admin users', () => {
    const mockDelete = jest.fn();
    render(
      <Provider store={mockStore}>
        <CommentComponent comment={mockComment} onDelete={mockDelete} />
      </Provider>
    );
    
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});