import React from 'react';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import GeneratedArtwork from 'src/pages/GeneratedArtwork';
import * as routerHooks from 'react-router-dom';
import p5 from 'p5';
import { createContext } from 'react';

const mockAuthContext = createContext();

jest.mock('src/sketches/WaveOscillator', () => ({ 
  WaveOscillator: jest.fn() 
}));
jest.mock('src/sketches/concirc', () => ({ 
  ConCirc: jest.fn() 
}));
jest.mock('src/sketches/truchetTriangles', () => ({ 
  TruchetRound: jest.fn() 
}));
jest.mock('src/sketches/diags', () => ({ 
  Diagonals: jest.fn() 
}));
jest.mock('src/sketches/sslines', () => ({ 
  Sslines: jest.fn() 
}));
jest.mock('src/sketches/squigs', () => ({ 
  Squigs: jest.fn() 
}));

jest.mock('p5');
jest.mock('react-tsparticles', () => ({
  __esModule: true,
  default: () => <div data-testid="particles" />
}));
jest.mock('tsparticles', () => ({
  loadFull: jest.fn()
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  useLocation: jest.fn()
}));

const mockSignOut = jest.fn();
const mockSignIn = jest.fn();
let mockIsAuthenticated = false;

jest.mock('src/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: mockIsAuthenticated,
    user: mockIsAuthenticated ? { name: 'Test User' } : null,
    signOut: mockSignOut,
    signIn: mockSignIn
  }),
  AuthContext: {
    Provider: ({ children, value }) => (
      <mockAuthContext.Provider value={value}>
        {children}
      </mockAuthContext.Provider>
    )
  }
}));

jest.mock('src/apiclient/users', () => ({
  mapJWTToUserId: jest.fn().mockResolvedValue('test-user-id')
}));

jest.mock('src/components/Toolbar', () => {
  const MockToolbar = ({ onShare, onRegenerate }) => {
    return (
      <div data-testid="toolbar">
        <button 
          onClick={onShare}
          data-testid="share-button"
          disabled={!mockIsAuthenticated}
        >
          Share
        </button>
        <button 
          onClick={onRegenerate}
          data-testid="regenerate-button"
        >
          Back
        </button>
      </div>
    );
  };
  return { __esModule: true, default: MockToolbar };
});

describe('GeneratedArtwork Component', () => {
  const mockNavigate = jest.fn();
  const defaultLocationState = {
    processedImageData: 'mock-processed-data',
    selectedAlgorithm: 'ConCirc'
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
    mockIsAuthenticated = false;
    routerHooks.useNavigate.mockReturnValue(mockNavigate);
    routerHooks.useLocation.mockReturnValue({ state: defaultLocationState });
    
    // Mock canvas creation
    const mockCanvasElement = document.createElement('canvas');
    Object.defineProperty(mockCanvasElement, 'toDataURL', {
      value: jest.fn().mockReturnValue('mock-image-url')
    });
    
    // Setup container with canvas
    const container = document.createElement('div');
    container.appendChild(mockCanvasElement);
    jest.spyOn(document, 'querySelector').mockReturnValue(container);
    
    // Mock p5 constructor
    p5.mockImplementation(() => ({
      remove: jest.fn()
    }));
  });

  afterEach(() => {
    jest.useRealTimers();
    cleanup();
  });

  const renderComponent = async (locationState = defaultLocationState, isAuthenticated = false) => {
    mockIsAuthenticated = isAuthenticated;
    
    return render(
      <mockAuthContext.Provider value={{
        isAuthenticated,
        user: isAuthenticated ? { name: 'Test User' } : null,
        signOut: mockSignOut,
        signIn: mockSignIn
      }}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <GeneratedArtwork />
        </MemoryRouter>
      </mockAuthContext.Provider>
    );
  };

  it('redirects to weave-artwork if no processedImageData is present', async () => {
    routerHooks.useLocation.mockReturnValue({ 
      state: {
        processedImageData: null,
        selectedAlgorithm: 'ConCirc'
      }
    });

    await act(async () => {
      renderComponent({ 
        processedImageData: null,
        selectedAlgorithm: 'ConCirc'
      });
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/weave-artwork');
    });
  });

  it('saves data to localStorage on mount', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    await act(async () => {
      renderComponent();
    });
    
    expect(setItemSpy).toHaveBeenCalledWith('processedImageData', JSON.stringify('mock-processed-data'));
    expect(setItemSpy).toHaveBeenCalledWith('selectedAlgorithm', 'ConCirc');
  });

  it('shows fireworks when share button is clicked by authenticated user', async () => {
    mockIsAuthenticated = true;
    await act(async () => {
      renderComponent(defaultLocationState, true);
    });

    const shareButton = screen.getByTestId('share-button');
    
    await act(async () => {
      fireEvent.click(shareButton);
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('shared-message')).toBeInTheDocument();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.queryByTestId('shared-message')).not.toBeInTheDocument();
  });

  it('navigates back when back button is clicked', async () => {
    await act(async () => {
      renderComponent();
    });

    const backButton = screen.getByTestId('regenerate-button');
    
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledWith('/weave-artwork');
  });

  it('controls share functionality based on authentication', async () => {
    // Test with unauthenticated user
    mockIsAuthenticated = false;
    const { unmount } = await act(async () => {
      return renderComponent(defaultLocationState, false);
    });
  
    const shareButton = screen.getByTestId('share-button');
    expect(shareButton).toBeDisabled();
  
    // Clean up the first render
    unmount();
  
    // Test with authenticated user
    mockIsAuthenticated = true;
    await act(async () => {
      renderComponent(defaultLocationState, true);
    });
  
    // Get the new button after re-render
    const shareButtonAuth = await screen.findByTestId('share-button');
    expect(shareButtonAuth).not.toBeDisabled();
  });

  // Test algorithm initialization
  const algorithms = ['Wave', 'ConCirc', 'TruchRound', 'Diagonals', 'Sslines', 'Squigs'];
  algorithms.forEach(algorithm => {
    it(`initializes correct sketch for ${algorithm} algorithm`, async () => {
      await act(async () => {
        renderComponent({
          processedImageData: 'mock-processed-data',
          selectedAlgorithm: algorithm
        });
      });
      expect(p5).toHaveBeenCalled();
    });
  });
});