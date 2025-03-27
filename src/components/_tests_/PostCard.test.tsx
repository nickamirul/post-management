import { render, screen } from '@testing-library/react';
import PostCard from '../PostCard';
import { Post } from '../../types';

const mockPost: Post = {
  id: 1,
  userId: 1,
  title: 'Test Post Title',
  body: 'This is a test post body content for testing purposes.',
};

describe('PostCard', () => {
  it('renders post title and truncated body', () => {
    render(<PostCard post={mockPost} />);
    
    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText(/This is a test post body content\.\.\./)).toBeInTheDocument();
  });

  it('contains a link to the post detail page', () => {
    render(<PostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${mockPost.id}`);
  });
});