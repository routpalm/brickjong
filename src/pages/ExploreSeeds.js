import React, { useEffect, useState, useRef } from 'react';
import p5 from 'p5';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './ExploreSeeds.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import MiniNavbar from '../components/MiniNavbar.js';
import LoadingAnimation from '../components/LoadingAnimation.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import { ConCirc } from '../sketches/concirc.js';
import { Diagonals } from '../sketches/diags.js';
import { Sslines } from '../sketches/sslines.js';
import { TruchetRound } from '../sketches/truchetTriangles.js';
import { LinesSketch } from '../sketches/lines.js';
import { Squigs } from "../sketches/squigs.js";
import { Noisy } from "../sketches/noise1.js";
import { Noisy2 } from "../sketches/noisy2.js"
import { Tunnel } from "../sketches/tunnel.js"
import { createLikeByParam, deleteLike } from '../apiclient/likes.js';
import { mapJWTToUserId } from '../apiclient/users.js';
import { getArtworkById, getRecentArtworksWithLikes } from '../apiclient/artworks.js';

const ExploreSeeds = () => {
  const [seedData, setSeedData] = useState([]);
  const [filteredSeeds, setFilteredSeeds] = useState([]); 
  const [sortOrder, setSortOrder] = useState('newest');
  const [userId, setUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
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

        // Loading Animation
        setTimeout(() => {
          setSeedData(artworksWithLikes);
          handleFilterChange(sortOrder, artworksWithLikes); 
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching artworks:', error);
        setIsLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  useEffect(() => {
    filteredSeeds.forEach((seed) => {
      createSketch(seed);
    });
  }, [filteredSeeds]);

  const createSketch = (artwork) => {
    const containerId = `seed-canvas-${artwork.id}`;
    let container = canvasRefs.current[containerId];
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // Clear Previous Sketches
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
      Tunnel: (p) => Tunnel(p,artwork, canvasSize),
      Squigs: (p) => Squigs(p, artwork, canvasSize),
      Noisy: (p) => Noisy(p,artwork, canvasSize),
      Noisy2: (p) => Noisy2(p, artwork, canvasSize)
    };

    if (sketchMapping[artwork.algorithm]) {
      new p5(sketchMapping[artwork.algorithm], container);
    } else {
      console.warn(`Unknown algorithm: ${artwork.algorithm}`);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Save time for the search result to draw
    setTimeout(() => {
      const filteredData = seedData.filter(
        (seed) =>
          seed.user?.name.toLowerCase().includes(query.toLowerCase()) ||
          seed.algorithm?.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredSeeds(filteredData); 
      setIsSearching(false); 
    }, 1500);
  };

  const handleFilterChange = (filter, data = seedData) => {
    setSortOrder(filter);

    let updatedFilteredSeeds = [...data];
    if (filter === 'mostLiked') {
      updatedFilteredSeeds.sort((a, b) => b.likes - a.likes);
    } else if (filter === 'newest') {
      updatedFilteredSeeds.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredSeeds(updatedFilteredSeeds);
  };

  const handleLike = async (artworkId) => {
    if (!userId) {
      alert('Please log in to like artworks.');
      return;
    }
  
    if (isLiking) {
      return; // Avoid repeated Liking
    }
  
    setIsLiking(true);
  
    try {
      const artwork = await getArtworkById(artworkId);
      if (!artwork) {
        console.error('Failed to fetch artwork details.');
        return;
      }
  
      const userLike = artwork.likes.find((like) => like.userId === userId);
  
      if (userLike) {
        const Unlike = window.confirm(
          'You have already liked this artwork. Do you want to unlike it?'
        );
  
        if (Unlike) {
          await deleteLike(userLike.id);
          console.log(`Like removed for likeId: ${userLike.id}`);
  
          setTimeout(() => {
            const updatedData = seedData.map((item) =>
              item.id === artworkId
                ? { ...item, userLiked: false, likes: item.likes - 1 }
                : item
            );
            setSeedData(updatedData);
            handleFilterChange(sortOrder, updatedData);
          }, 500);
        }
      } else {
        const response = await createLikeByParam(userId, artworkId);
        if (response && response.id) {
          console.log(`Like added for artworkId: ${artworkId}`);
  
          setTimeout(() => {
            const updatedData = seedData.map((item) =>
              item.id === artworkId
                ? { ...item, userLiked: true, likes: item.likes + 1 }
                : item
            );
            setSeedData(updatedData);
            handleFilterChange(sortOrder, updatedData);
          }, 500);
        } else {
          console.error('Failed to create like on server.');
        }
      }
    } catch (error) {
      console.error('Failed to handle like/unlike operation:', error);
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
        currentFilter={sortOrder}
      />
      {isLoading || isSearching ? ( 
        <LoadingAnimation />
      ) : (
        <div className="seeds-grid">
          {filteredSeeds && filteredSeeds.length > 0 ? (
            filteredSeeds.map((seed) => (
              <div className="seed-card" key={seed.id}>
                <div
                  className="canvas-container"
                  id={`seed-canvas-${seed.id}`}
                  ref={(el) => (canvasRefs.current[`seed-canvas-${seed.id}`] = el)}
                />
                <div className="seed-info">
                  <div className="seed-info-header">
                    <p className="seed-author">
                      Creator: {seed.user?.name.split(' ')[0]}
                    </p>
                    <div
                      className="like-section"
                      data-testid="like-button"
                      onClick={() => handleLike(seed.id)}
                    >
                      <FontAwesomeIcon
                        icon={seed.userLiked ? solidHeart : regularHeart}
                        className="like-icon"
                      />
                      <span className="like-count" data-testid="like-count">{seed.likes}</span>
                    </div>
                  </div>
                  <p className="seed-algo" data-testid="seed-algo">Algorithm: {seed.algorithm}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No seeds found...</p>
          )}
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ExploreSeeds;




