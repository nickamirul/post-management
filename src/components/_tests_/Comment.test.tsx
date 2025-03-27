import { render, screen } from '@testing-library/react';
import CommentComponent from '../Comment';
import { Comment } from '../../types';

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
    render(<CommentComponent comment={mockComment} onDelete={mockDelete} />);
    
    expect(screen.getByText(mockComment.name)).toBeInTheDocument();
    expect(screen.getByText(mockComment.email)).toBeInTheDocument();
    expect(screen.getByText(mockComment.body)).toBeInTheDocument();
  });

  it('does not show delete button for non-admin users', () => {
    const mockDelete = jest.fn();
    render(<CommentComponent comment={mockComment} onDelete={mockDelete} />);
    
    expect(screen.queryByText('Delete')).not.toBeInTheDocument();
  });
});