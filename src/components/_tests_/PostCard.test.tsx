import { render, screen, fireEvent } from '@testing-library/react';
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
    expect(screen.getByText((content) => content.includes('This is a test post body content'))).toBeInTheDocument();
  });

  it('contains a link to the post detail page', () => {
    render(<PostCard post={mockPost} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/posts/${mockPost.id}`);
  });

  it('stops event propagation when clicking the "See post" button', () => {
    const mockOnClick = jest.fn();
    render(
      <div onClick={mockOnClick}>
        <PostCard post={mockPost} />
      </div>
    );
    
    const seePostButton = screen.getByText('See post');
    fireEvent.click(seePostButton);
    
    expect(mockOnClick).not.toHaveBeenCalled();
  });
});