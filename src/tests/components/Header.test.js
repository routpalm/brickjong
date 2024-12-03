import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as routerHooks from 'react-router-dom';
import Header from 'src/components/Header';
import { useAuth } from 'src/AuthContext';
import '@testing-library/jest-dom';

jest.mock('src/AuthContext', () => ({
  useAuth: jest.fn()
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn()
}));

jest.mock('src/images/HomePage1.png', () => 'mocked-image-1');
jest.mock('src/images/HomePage2.png', () => 'mocked-image-2');

describe('Header Component', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    routerHooks.useNavigate.mockReturnValue(mockNavigate);
  });

  const renderHeader = (isAuthenticated = false) => {
    useAuth.mockReturnValue({ isAuthenticated });
    return render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Header />
      </MemoryRouter>
    );
  };

  it('renders all header elements correctly', () => {
    renderHeader();

    expect(screen.getByText('VisuaLoom')).toBeInTheDocument();
    expect(screen.getByText('Turn your photo gallery into something new.')).toBeInTheDocument();
    expect(screen.getByText('BEGIN')).toBeInTheDocument();

    expect(screen.getByAltText('Decorative pattern 1')).toBeInTheDocument();
    expect(screen.getByAltText('Decorative pattern 2')).toBeInTheDocument();
  });

  it('navigates to weave-artwork when authenticated user clicks BEGIN', () => {
    renderHeader(true);
    
    const beginButton = screen.getByText('BEGIN');
    fireEvent.click(beginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/weave-artwork');
  });

  it('navigates to home when unauthenticated user clicks BEGIN', () => {
    renderHeader(false);
    
    const beginButton = screen.getByText('BEGIN');
    fireEvent.click(beginButton);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('applies correct CSS classes', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toHaveClass('header');
    expect(screen.getByText('VisuaLoom')).toHaveClass('header-logo');
    expect(screen.getByText('Turn your photo gallery into something new.')).toHaveClass('header-slogan');
    expect(screen.getByText('BEGIN')).toHaveClass('cta-button');
    
    const images = screen.getAllByRole('img');
    images.forEach(img => {
      expect(img).toHaveClass('header-image');
    });
  });

  it('renders header images with correct attributes', () => {
    renderHeader();

    const image1 = screen.getByAltText('Decorative pattern 1');
    const image2 = screen.getByAltText('Decorative pattern 2');

    expect(image1).toHaveAttribute('src', 'mocked-image-1');
    expect(image2).toHaveAttribute('src', 'mocked-image-2');
  });

  it('maintains layout structure', () => {
    renderHeader();

    const leftSection = screen.getByText('VisuaLoom').closest('div');
    const rightSection = screen.getByAltText('Decorative pattern 1').closest('div');

    expect(leftSection).toHaveClass('header-left');
    expect(rightSection).toHaveClass('header-right');
  });
});