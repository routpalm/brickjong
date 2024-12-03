import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MiniNavbar from 'src/components/MiniNavbar';

describe('MiniNavbar Component', () => {
  const mockOnSearch = jest.fn();
  const mockOnFilterChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderMiniNavbar = (currentFilter = 'newest') => {
    return render(
      <MiniNavbar
        onSearch={mockOnSearch}
        onFilterChange={mockOnFilterChange}
        currentFilter={currentFilter}
      />
    );
  };

  it('renders all elements correctly', () => {
    renderMiniNavbar();

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    expect(screen.getByText('Newest')).toBeInTheDocument();
    expect(screen.getByText('Most Liked')).toBeInTheDocument();
  });

  it('handles search input correctly', () => {
    renderMiniNavbar();
    
    const searchInput = screen.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'test search' } });

    expect(mockOnSearch).toHaveBeenCalledWith('test search');
  });

  it('applies correct active class to newest filter when selected', () => {
    renderMiniNavbar('newest');

    const newestButton = screen.getByText('Newest');
    const mostLikedButton = screen.getByText('Most Liked');

    expect(newestButton).toHaveClass('mini-navbar-button', 'active');
    expect(mostLikedButton).toHaveClass('mini-navbar-button');
    expect(mostLikedButton).not.toHaveClass('active');
  });

  it('applies correct active class to most liked filter when selected', () => {
    renderMiniNavbar('mostLiked');

    const newestButton = screen.getByText('Newest');
    const mostLikedButton = screen.getByText('Most Liked');

    expect(mostLikedButton).toHaveClass('mini-navbar-button', 'active');
    expect(newestButton).toHaveClass('mini-navbar-button');
    expect(newestButton).not.toHaveClass('active');
  });

  it('calls onFilterChange with correct value when newest is clicked', () => {
    renderMiniNavbar('mostLiked');
    
    const newestButton = screen.getByText('Newest');
    fireEvent.click(newestButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('newest');
  });

  it('calls onFilterChange with correct value when most liked is clicked', () => {
    renderMiniNavbar('newest');
    
    const mostLikedButton = screen.getByText('Most Liked');
    fireEvent.click(mostLikedButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith('mostLiked');
  });

  it('applies correct CSS classes to container elements', () => {
    const { container } = renderMiniNavbar();

    expect(container.firstChild).toHaveClass('mini-navbar');
    expect(screen.getByPlaceholderText('Search')).toHaveClass('mini-navbar-search');
    expect(screen.getByText('Newest').parentElement).toHaveClass('mini-navbar-filters');
  });

  it('does not trigger filter change when clicking already active filter', () => {
    renderMiniNavbar('newest');
    
    const newestButton = screen.getByText('Newest');
    fireEvent.click(newestButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  });
});