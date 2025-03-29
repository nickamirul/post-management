import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Notification from '../Notification';

describe('Notification Component', () => {
  const mockMessage = 'Test notification message';
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with the provided message', () => {
    render(<Notification message={mockMessage} onClose={mockOnClose} />);
    
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has the correct CSS classes for styling', () => {
    render(<Notification message={mockMessage} onClose={mockOnClose} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toHaveClass('fixed');
    expect(notification).toHaveClass('top-4');
    expect(notification).toHaveClass('right-4');
    expect(notification).toHaveClass('bg-green-500');
  });

  it('calls the onClose callback when the close button is clicked', () => {
    render(<Notification message={mockMessage} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button');
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility attributes', () => {
    render(<Notification message={mockMessage} onClose={mockOnClose} />);
    
    const notification = screen.getByRole('alert');
    expect(notification).toBeInTheDocument();
    expect(notification).toHaveAttribute('aria-live', 'polite');
    
    const closeButton = screen.getByRole('button');
    expect(closeButton).toHaveAttribute('aria-label', 'Close notification');
  });
});