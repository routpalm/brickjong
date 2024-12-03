import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from 'src/AuthContext';
import Navbar from 'src/components/Navbar';

jest.mock('src/AuthContext', () => ({
  useAuth: jest.fn()
}));

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: jest.fn()
  };
});

const mockUseLocation = () => {
  const useLocation = require('react-router-dom').useLocation;
  useLocation.mockReturnValue({ pathname: '/' });
  return useLocation;
};

jest.mock('src/pages/SignIn', () => {
  return function MockSignIn({ onClose }) {
    return (
      <div data-testid="signin-modal">
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

describe('Navbar Component', () => {
  const mockSignOut = jest.fn();
  const useLocation = mockUseLocation();
  
  const mockAuthUser = {
    name: 'Test User',
    email: 'test@example.com'
  };

  beforeEach(() => {
    jest.clearAllMocks();
    useLocation.mockReturnValue({ pathname: '/' });
  });

  const renderNavbar = (isAuthenticated = false, pathname = '/') => {
    useLocation.mockReturnValue({ pathname });
    useAuth.mockReturnValue({
      isAuthenticated,
      user: isAuthenticated ? mockAuthUser : null,
      signOut: mockSignOut
    });

    return render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>
    );
  };

  describe('Rendering', () => {
    it('renders basic elements for unauthenticated user', () => {
      renderNavbar(false);

      expect(screen.getByTestId('team-name')).toHaveTextContent('Brick Jong');
      expect(screen.getByTestId('weave-artwork-button')).toBeInTheDocument();
      expect(screen.getByTestId('explore-seeds-button')).toBeInTheDocument();
      expect(screen.getByTestId('my-gallery-button')).toBeInTheDocument();
      expect(screen.getByTestId('sign-in-button')).toBeInTheDocument();
      expect(screen.getByTestId('home-button')).toBeInTheDocument();
    });

    it('renders authenticated user elements', () => {
      renderNavbar(true);

      expect(screen.getByTestId('user-button')).toHaveTextContent(mockAuthUser.name);
      expect(screen.queryByTestId('sign-in-button')).not.toBeInTheDocument();
      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    });

    it('applies active class to current route button', () => {
      renderNavbar(true, '/weave-artwork');
      expect(screen.getByTestId('weave-artwork-button')).toHaveClass('active-link');
    });
  });

  describe('Navigation', () => {
    it('navigates to home when home button is clicked', () => {
      renderNavbar(true);
      
      fireEvent.click(screen.getByTestId('home-button'));
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('shows sign in modal when protected route is clicked while unauthenticated', () => {
      renderNavbar(false);
      
      fireEvent.click(screen.getByTestId('weave-artwork-button'));
      expect(screen.getByTestId('signin-modal')).toBeInTheDocument();
    });

    it('navigates to protected route when authenticated', () => {
      renderNavbar(true);
      
      fireEvent.click(screen.getByTestId('explore-seeds-button'));
      expect(mockNavigate).toHaveBeenCalledWith('/explore-seeds');
    });
  });

  describe('Authentication', () => {
    it('shows sign in modal when sign in button is clicked', () => {
      renderNavbar(false);
      
      fireEvent.click(screen.getByTestId('sign-in-button'));
      expect(screen.getByTestId('signin-modal')).toBeInTheDocument();
    });

    it('calls signOut when sign out button is clicked', () => {
      renderNavbar(true);
      
      fireEvent.click(screen.getByTestId('sign-out-button'));
      expect(mockSignOut).toHaveBeenCalled();
    });

    it('toggles between user name and email when clicked', () => {
      renderNavbar(true);
      
      const userButton = screen.getByTestId('user-button');
      expect(userButton).toHaveTextContent(mockAuthUser.name);
      
      fireEvent.click(userButton);
      expect(userButton).toHaveTextContent(mockAuthUser.email);
      
      fireEvent.click(userButton);
      expect(userButton).toHaveTextContent(mockAuthUser.name);
    });

    it('closes sign in modal when authentication state changes', () => {
      const { rerender } = renderNavbar(false);
      
      fireEvent.click(screen.getByTestId('sign-in-button'));
      expect(screen.getByTestId('signin-modal')).toBeInTheDocument();
      
      useAuth.mockReturnValue({
        isAuthenticated: true,
        user: mockAuthUser,
        signOut: mockSignOut
      });
      
      rerender(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Navbar />
        </MemoryRouter>
      );
      
      expect(screen.queryByTestId('signin-modal')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies correct CSS classes', () => {
      renderNavbar(true);

      expect(screen.getByRole('navigation')).toHaveClass('navbar');
      expect(screen.getByTestId('team-name').parentElement).toHaveClass('navbar-left');
      expect(screen.getByTestId('weave-artwork-button').parentElement).toHaveClass('navbar-center');
      expect(screen.getByTestId('user-button').parentElement).toHaveClass('navbar-right');
    });
    
    it('applies active class to weave-artwork route', () => {
        renderNavbar(true, '/weave-artwork');
        expect(screen.getByTestId('weave-artwork-button')).toHaveClass('active-link');
        cleanup();
      });
  
      it('applies active class to explore-seeds route', () => {
        renderNavbar(true, '/explore-seeds');
        expect(screen.getByTestId('explore-seeds-button')).toHaveClass('active-link');
        cleanup();
      });
  
      it('applies active class to my-gallery route', () => {
        renderNavbar(true, '/my-gallery');
        expect(screen.getByTestId('my-gallery-button')).toHaveClass('active-link');
        cleanup();
      });
  
      it('applies active class to home route', () => {
        renderNavbar(true, '/');
        expect(screen.getByTestId('home-button')).toHaveClass('active-link');
        cleanup();
      });
  

    test.each([
        ['/weave-artwork', 'weave-artwork-button'],
        ['/explore-seeds', 'explore-seeds-button'],
        ['/my-gallery', 'my-gallery-button'],
        ['/', 'home-button']
      ])('applies active class to %s route', (pathname, buttonId) => {
        cleanup();
        renderNavbar(true, pathname);
        expect(screen.getByTestId(buttonId)).toHaveClass('active-link');
      });
  });
});