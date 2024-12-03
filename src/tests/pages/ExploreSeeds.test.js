import React from 'react';
import { render, screen, fireEvent, waitFor, act, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import ExploreSeeds from 'src/pages/ExploreSeeds';
import p5 from 'p5';


jest.mock('src/sketches/WaveOscillator', () => ({
  WaveOscillator: jest.fn()
}));
jest.mock('src/sketches/concirc', () => ({
  ConCirc: jest.fn()
}));
jest.mock('src/sketches/diags', () => ({
  Diagonals: jest.fn()
}));
jest.mock('src/sketches/sslines', () => ({
  Sslines: jest.fn()
}));
jest.mock('src/sketches/truchetTriangles', () => ({
  TruchetRound: jest.fn()
}));
jest.mock('src/sketches/lines', () => ({
  LinesSketch: jest.fn()
}));

jest.mock('p5');

jest.mock('src/apiclient/likes', () => ({
  createLikeByParam: jest.fn(),
  deleteLike: jest.fn()
}));

jest.mock('src/apiclient/users', () => ({
  mapJWTToUserId: jest.fn()
}));

jest.mock('src/apiclient/artworks', () => ({
  getArtworkById: jest.fn(),
  getRecentArtworksWithLikes: jest.fn()
}));

jest.mock('src/components/Navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});


jest.mock('src/components/MiniNavbar', () => {
  return function MockMiniNavbar({ onSearch, onFilterChange, currentFilter }) {
    return (
      <div data-testid="mini-navbar">
        <input
          data-testid="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
        <select
          data-testid="filter-select"
          value={currentFilter}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="mostLiked">Most Liked</option>
        </select>
      </div>
    );
  };
});

jest.mock('src/components/LoadingAnimation', () => {
  return function MockLoadingAnimation() {
    return <div data-testid="loading-animation">Loading...</div>;
  };
});

describe('ExploreSeeds Component', () => {
    const mockArtworks = [
      {
        id: 1,
        algorithm: 'ConCirc',
        user: { name: 'Test User 1' },
        likes: 5,
        userLiked: false,
        createdAt: '2024-01-01T00:00:00.000Z',
        colorPalette: JSON.stringify(['#000000', '#FFFFFF'])
      },
      {
        id: 2,
        algorithm: 'Wave',
        user: { name: 'Test User 2' },
        likes: 10,
        userLiked: true,
        createdAt: '2024-01-02T00:00:00.000Z',
        colorPalette: JSON.stringify(['#FF0000', '#00FF00'])
      }
    ];
  
    beforeEach(() => {
      jest.clearAllMocks();
      require('src/apiclient/artworks').getRecentArtworksWithLikes.mockResolvedValue(mockArtworks);
      require('src/apiclient/users').mapJWTToUserId.mockResolvedValue('test-user-id');
    });
  
    afterEach(() => {
      cleanup();
      jest.clearAllTimers();
      jest.useRealTimers();
    });
  
    const renderComponent = async () => {
      const result = render(
        <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ExploreSeeds />
        </MemoryRouter>
      );
      // Wait for initial data fetch and state updates
      await act(async () => {
        await Promise.resolve();
      });
      return result;
    };
  
    it('renders initial component with loading state', async () => {
      await renderComponent();
      expect(screen.getByTestId('loading-animation')).toBeInTheDocument();
    });
  
    it('displays artworks after loading', async () => {
      jest.useFakeTimers();
      await renderComponent();
  
      // Wait for loading state to resolve
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      // Verify loading is gone and content is present
      await waitFor(() => {
        expect(screen.queryByTestId('loading-animation')).not.toBeInTheDocument();
      });
  
      // Find algorithm elements by class name 
      const algorithmElements = screen.getAllByTestId('seed-algo');
      expect(algorithmElements).toHaveLength(2);
      expect(algorithmElements[0]).toHaveTextContent('Algorithm: Wave');
      expect(algorithmElements[1]).toHaveTextContent('Algorithm: ConCirc');
    });
  
    it('handles search functionality', async () => {
      jest.useFakeTimers();
      await renderComponent();
  
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      const searchInput = screen.getByTestId('search-input');
      
      await act(async () => {
        fireEvent.change(searchInput, { target: { value: 'ConCirc' } });
        jest.advanceTimersByTime(1500); // Wait for search debounce
      });
  
      const algorithmElements = screen.getAllByTestId('seed-algo');
      expect(algorithmElements).toHaveLength(1);
      expect(algorithmElements[0]).toHaveTextContent('Algorithm: ConCirc');
    });
  
    it('handles filter change', async () => {
      jest.useFakeTimers();
      await renderComponent();
  
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      const filterSelect = screen.getByTestId('filter-select');
      
      await act(async () => {
        fireEvent.change(filterSelect, { target: { value: 'mostLiked' } });
      });
  
      const likeCountElements = screen.getAllByTestId('like-count');
      const likeCounts = likeCountElements.map(el => Number(el.textContent));
      expect(likeCounts[0]).toBeGreaterThan(likeCounts[1]);
    });
  
    it('handles like/unlike functionality for authenticated user', async () => {
      const { createLikeByParam } = require('src/apiclient/likes');
      const { getArtworkById } = require('src/apiclient/artworks');
      
      getArtworkById.mockResolvedValue({
        ...mockArtworks[0],
        likes: []
      });
      createLikeByParam.mockResolvedValue({ id: 'like-1' });
  
      jest.useFakeTimers();
      await renderComponent();
  
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      const likeButton = screen.getAllByTestId('like-button')[1];
      
      await act(async () => {
        fireEvent.click(likeButton);
        await Promise.resolve();
      });
  
      expect(createLikeByParam).toHaveBeenCalledWith('test-user-id', 1);
    });
  
    it('creates p5 sketches for each artwork', async () => {
      jest.useFakeTimers();
      await renderComponent();
  
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      expect(p5).toHaveBeenCalled();
      expect(p5.mock.calls.length).toBe(2); // One for each artwork
    });
  
    it('shows alert when unauthenticated user tries to like', async () => {
      require('src/apiclient/users').mapJWTToUserId.mockResolvedValue(null);
      const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  
      jest.useFakeTimers();
      await renderComponent();
  
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });
  
      const likeButton = screen.getAllByTestId('like-button')[0];
      
      await act(async () => {
        fireEvent.click(likeButton);
      });
  
      expect(alertMock).toHaveBeenCalledWith('Please log in to like artworks.');
      alertMock.mockRestore();
    });
  });