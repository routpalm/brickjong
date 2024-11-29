import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; //Mock React Router
import AppRoutes from 'src/routes/AppRoutes';
import { useAuth } from 'src/AuthContext';
import '@testing-library/jest-dom'; 

jest.mock('src/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Homepage Rendering with AppRoutes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Navbar, Header, FeaturedImages, and Footer in Homepage route', () => {
    useAuth.mockReturnValue({ 
      isAuthenticated: true, 
      user: { name: 'Test User', email: 'testuser@example.com' } 
    });

    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();

    expect(screen.getByText(/VisuaLoom/i)).toBeInTheDocument(); 
    expect(screen.getByText(/Turn your photo gallery into something new\./i)).toBeInTheDocument(); 

    expect(screen.getByAltText(/Sample Artwork 2/i)).toBeInTheDocument(); 


    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('Info & Articles')).toBeInTheDocument();
    expect(screen.getByText('Privacy & Terms')).toBeInTheDocument();
    expect(screen.getByText('Contact Us')).toBeInTheDocument();
  });
});

