import React, { useEffect, useState, useRef } from 'react';
import p5 from 'p5';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './ExploreSeeds.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import MiniNavbar from '../components/MiniNavbar.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import { ConCirc } from '../sketches/concirc.js';
import { Diagonals } from '../sketches/diags.js';
import { Sslines } from '../sketches/sslines.js';
import { TruchetRound } from '../sketches/truchetTriangles.js';
import { LinesSketch } from '../sketches/lines.js';
import { createLikeByParam, deleteLike} from '../apiclient/likes.js';
import { mapJWTToUserId } from '../apiclient/users.js';
import { getArtworkById, getRecentArtworksWithLikes } from '../apiclient/artworks.js';
import apiClient from '../apiclient/apiClient.js';

const ExploreSeeds = () => {
  const navigate = useNavigate();
  const [seedData, setSeedData] = useState([]);
  const [sortOrder, setSortOrder] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [userId, setUserId] = useState(null);
  const [isLiking, setIsLiking] = useState(false);
  const canvasRefs = useRef({});
  const canvasSize = 200;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
        console.log('User ID set to:', id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };
    fetchUserId();
  }, []);


  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksWithLikes = await getRecentArtworksWithLikes();
        setSeedData(artworksWithLikes);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    seedData.forEach((seed) => {
      createSketch(seed);
    });
  }, [seedData]);

  const createSketch = (artwork) => {
    const containerId = `seed-canvas-${artwork.id}`;
    let container = canvasRefs.current[containerId];
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // Clear previous sketches
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (artwork.colorPalette && typeof artwork.colorPalette === 'string') {
      try {
        artwork.colorPalette = JSON.parse(artwork.colorPalette);
      } catch (error) {
        console.error('Failed to parse colorPalette:', error);
      }
    }

    const sketchMapping = {
      ConCirc: (p) => ConCirc(p, artwork, canvasSize),
      Wave: (p) => WaveOscillator(p, artwork, canvasSize),
      Diagonals: (p) => Diagonals(p, artwork, canvasSize),
      Sslines: (p) => Sslines(p, artwork, canvasSize),
      TruchRound: (p) => TruchetRound(p, artwork, canvasSize),
      Lines: (p) => LinesSketch(p, artwork, canvasSize),
    };

    if (sketchMapping[artwork.algorithm]) {
      new p5(sketchMapping[artwork.algorithm], container);
    } else {
      console.warn(`Unknown algorithm: ${artwork.algorithm}`);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);  
  };

  const handleFilterChange = (filter) => {
    setSortOrder(filter);
    if (filter === 'mostLiked') {
      setSeedData((prevData) => [...prevData].sort((a, b) => b.likes - a.likes));
    } else if (filter === 'newest') {
      setSeedData((prevData) => [...prevData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    }
  };

  const filteredSeeds = seedData
    .filter((seed) =>
      seed.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seed.algorithm?.toLowerCase().includes(searchQuery.toLowerCase()) 
    );

  
  const handleLike = async (artworkId) => {
    if (!userId) {
        alert('Please log in to like artworks.');
        return;
    }

    if (isLiking) {
        return;
    }

    console.log(`Handling like for artwork ID: ${artworkId}`);
    setIsLiking(true);

    try {
        const artworkDetails = await getArtworkById(artworkId);
        if (!artworkDetails) {
            console.error('Failed to fetch artwork details.');
            return;
        }

        // Check if the user already liked the artwork
        const userAlreadyLiked = artworkDetails.likes.some((like) => like.userId === userId);
        if (userAlreadyLiked) {
            console.warn(`User already liked artwork with ID: ${artworkId}. Cannot like again.`);
            alert('You have already liked this artwork.');
        } else {
            const response = await createLikeByParam(userId, artworkId);
            if (response && response.id) {
                console.log(`Like added for artworkId: ${artworkId}`);
                console.log(response);

                setSeedData((prevData) =>
                    prevData.map((item) =>
                        item.id === artworkId ? { ...item, userLiked: true, likes: item.likes + 1 } : item
                    )
                );
            } else {
                console.error('Failed to create like on server. Response:', response);
            }
        }
    } catch (error) {
        console.error('Failed to handle like operation:', error);
    } finally {
        setIsLiking(false);
    }
};


return (
  <div className="explore-seeds content">
    <Navbar />
    <MiniNavbar
      onSearch={handleSearch}
      onFilterChange={handleFilterChange}
      currentFilter={sortOrder}/>
    <div className="seeds-grid">
    {filteredSeeds && filteredSeeds.length > 0 ? (filteredSeeds.map((seed) => (
      <div className="seed-card" key={seed.id}>
        <div
          className="canvas-container"
          id={`seed-canvas-${seed.id}`}
          ref={(el) => (canvasRefs.current[`seed-canvas-${seed.id}`] = el)}/>
        <div className="seed-info">
          <div className="seed-info-header">
            <p className="seed-author">Creator: {seed.user?.name.split(' ')[0]}</p>
            <div className="like-section" onClick={() => handleLike(seed.id)}>
              <FontAwesomeIcon icon={seed.userLiked ? solidHeart : regularHeart} className="like-icon" />
              <span className="like-count">{seed.likes}</span>
            </div>
          </div>
          <p className="seed-algo">Algorithm: {seed.algorithm}</p>
        </div>
      </div>
    ))
  ) : (
    <p>No seeds found...</p>
  )}
</div>

    <Footer />
  </div>
);
};

export default ExploreSeeds;





