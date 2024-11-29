import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import WeaveArtwork from 'src/pages/WeaveArtwork';
import useImageProcessor from 'src/hooks/useImageProcessor';
import * as routerHooks from 'react-router-dom';
import { createContext } from 'react';

const mockAuthContext = createContext();

jest.mock('src/hooks/useImageProcessor');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('src/AuthContext', () => ({
  useAuth: () => ({
    isAuthenticated: false,
    user: null,
    signOut: jest.fn(),
    signIn: jest.fn()
  }),
  AuthContext: {
    Provider: ({ children, value }) => (
      <mockAuthContext.Provider value={value}>
        {children}
      </mockAuthContext.Provider>
    )
  }
}));

jest.mock('src/images/DiaLines.png', () => 'mocked-diagonal-lines');
jest.mock('src/images/SSLine.png', () => 'mocked-ss-line');
jest.mock('src/images/Concirc.png', () => 'mocked-concirc');
jest.mock('src/images/TruRound.png', () => 'mocked-truround');
jest.mock('src/images/Wave.png', () => 'mocked-wave');
jest.mock('src/images/squigs.png', () => 'mocked-squigs');

describe('WeaveArtwork Component', () => {
  const mockNavigate = jest.fn();
  const mockProcessImage = jest.fn();
  const defaultAuthValue = {
    isAuthenticated: false,
    user: null,
    signOut: jest.fn(),
    signIn: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    routerHooks.useNavigate.mockReturnValue(mockNavigate);
    useImageProcessor.mockReturnValue({
      processImage: mockProcessImage,
      processedImageData: null
    });
  });

  const renderComponent = (authContextValue = defaultAuthValue) => {
    return render(
      <mockAuthContext.Provider value={authContextValue}>
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <WeaveArtwork />
        </MemoryRouter>
      </mockAuthContext.Provider>
    );
  };

  it('renders the component with default algorithm selected', () => {
    renderComponent();
    expect(screen.getByText('VisuaLoom')).toBeInTheDocument();
    expect(screen.getByText("Let's weave something new.")).toBeInTheDocument();
    expect(screen.getByAltText('ConCirc Example')).toBeInTheDocument();
  });

  it('changes algorithm when a new one is selected', async () => {
    renderComponent();
    const algorithmSelect = screen.getByRole('combobox');
    await act(async () => {
      fireEvent.change(algorithmSelect, { target: { value: 'Wave' } });
    });
    expect(screen.getByAltText('Wave Example')).toBeInTheDocument();
  });

  it('handles file upload correctly', async () => {
    renderComponent();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('imageUpload');
    
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    
    expect(mockProcessImage).toHaveBeenCalledWith(file);
  });

  it('navigates to generated artwork page when processing is complete', async () => {
    const processedImageData = 'processed-image-data';
    useImageProcessor.mockReturnValue({
      processImage: mockProcessImage,
      processedImageData: processedImageData
    });

    renderComponent();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/generated-artwork', {
        state: {
          processedImageData,
          selectedAlgorithm: 'ConCirc'
        }
      });
    });
  });

  it('shows upload button in default state', () => {
    renderComponent();
    const uploadLabel = screen.getByText('Upload');
    const fileInput = screen.getByTestId('imageUpload');
    
    expect(uploadLabel).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute('type', 'file');
    expect(fileInput).toHaveAttribute('accept', 'image/*');
  });

  it('handles file upload process', async () => {
    renderComponent();
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    const fileInput = screen.getByTestId('imageUpload');
    
    await act(async () => {
      fireEvent.change(fileInput, { target: { files: [file] } });
    });
    
    expect(mockProcessImage).toHaveBeenCalledWith(file);
    expect(mockProcessImage).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when user is authenticated', () => {
    const authenticatedContext = {
      ...defaultAuthValue,
      isAuthenticated: true,
      user: { name: 'Test User' }
    };
    
    renderComponent(authenticatedContext);
    expect(screen.getByText('VisuaLoom')).toBeInTheDocument();
  });
});