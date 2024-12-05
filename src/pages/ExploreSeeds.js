// src/pages/ExploreSeeds.js
// Brick Jong
// purpose: provide an explore seeds page, where users can see other users' creations and like/unlike them as well as filter 
// authors: Nicholas Anthony, Tong Guan
// Nick: Fetched user IDs & artworks, provided initial container logic for rendering
// Tong: Styling, liking/unliking functionality, search and filter functionality
// creation date: 11-01-2024

import React, { useEffect, useState, useRef } from 'react';
import p5 from 'p5';

// styling imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import './ExploreSeeds.css';

// components
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import MiniNavbar from '../components/MiniNavbar.js';
import LoadingAnimation from '../components/LoadingAnimation.js';

//sketches 
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

// api client imports
import { createLikeByParam, deleteLike } from '../apiclient/likes.js';
import { mapJWTToUserId } from '../apiclient/users.js';
import { getArtworkById, getRecentArtworksWithLikes } from '../apiclient/artworks.js';

/**
 * renders the explore-seeds page
 * arguments: none
 * returns: jsx element representing the explore seeds page
 * this component:
 *  - fetches recent artworks and shows them in a grid
 *  - allows searching by username or algorithm
 *  - enables filtering by newest or most liked
 *  - lets authenticated users like/unlike artworks
 *  - uses loading animations, search states, and filters to improve ux
 */
const ExploreSeeds = () => {
  const [seedData, setSeedData] = useState([]); // holds all fetched artworks
  const [filteredSeeds, setFilteredSeeds] = useState([]); // holds artworks after applying search/filter
  const [sortOrder, setSortOrder] = useState('newest'); // current filter choice: 'newest' or 'mostLiked'
  const [userId, setUserId] = useState(null); // authenticated user id if available
  const [isLoading, setIsLoading] = useState(true); // loading state for artworks
  const [searchQuery, setSearchQuery] = useState(''); // current search query
  const [isSearching, setIsSearching] = useState(false); // indicates if a search is in progress
  const [isLiking, setIsLiking] = useState(false); // indicates if a like operation is ongoing
  const canvasRefs = useRef({}); // holds refs to canvas containers for each artwork
  const canvasSize = 200; // dimension for the generated artwork canvases

  // fetch user id on mount by mapping JWT to user id
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
        console.log('user id set to:', id);
      } catch (error) {
        console.error('failed to fetch user id:', error);
      }
    };
    fetchUserId();
  }, []);

  // fetch artworks after user is set or on mount to populate page
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const artworksWithLikes = await getRecentArtworksWithLikes();

        // simulates loading delay to show loading animation
        setTimeout(() => {
          setSeedData(artworksWithLikes);
          handleFilterChange(sortOrder, artworksWithLikes);
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        console.error('error fetching artworks:', error);
        setIsLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  // create sketches whenever filteredSeeds changes
  useEffect(() => {
    filteredSeeds.forEach((seed) => {
      createSketch(seed);
    });
  }, [filteredSeeds]);

  /**
   * creates a p5.js sketch for a given artwork inside its designated container
   * @param {Object} artwork - the artwork data including algorithm and colorPalette
   */
  const createSketch = (artwork) => {
    const containerId = `seed-canvas-${artwork.id}`;
    let container = canvasRefs.current[containerId];
    if (!container) {
      console.error(`container with id "${containerId}" not found`);
      return;
    }

    // clear previous sketch from container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // parse colorPalette if it's a string
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
      Tunnel: (p) => Tunnel(p, artwork, canvasSize),
      Squigs: (p) => Squigs(p, artwork, canvasSize),
      Noisy: (p) => Noisy(p, artwork, canvasSize),
      Noisy2: (p) => Noisy2(p, artwork, canvasSize)
    };

    if (sketchMapping[artwork.algorithm]) {
      new p5(sketchMapping[artwork.algorithm], container);
    } else {
      console.warn(`Unknown algorithm: ${artwork.algorithm}`);
    }
  };

  /**
   * handles searching by username or algorithm
   * sets a search query and after a delay, filters the seedData
   * @param {string} query - the search query
   */
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    // simulate a delay to show searching process
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

  /**
   * handles filter changes between 'newest' and 'mostLiked'
   * sorts the provided data array and updates filteredSeeds
   * @param {string} filter - the chosen filter
   * @param {Object[]} [data=seedData] - the data to be filtered and sorted
   */
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

  /**
   * handles liking or unliking an artwork
   * checks if user is logged in, ensures no repeated like actions simultaneously,
   * fetches the artwork details, checks if user already liked it, and either removes or adds a like accordingly
   * updates the UI to reflect the like/unlike status
   * @param {number} artworkId - id of the artwork to like/unlike
   */
  const handleLike = async (artworkId) => {
    if (!userId) {
      alert('Please log in to like artworks.');
      return;
    }

    if (isLiking) {
      return; // avoid repeated liking
    }

    setIsLiking(true);

    try {
      const artwork = await getArtworkById(artworkId);
      if (!artwork) {
        console.error('failed to fetch artwork details.');
        return;
      }

      const userLike = artwork.likes.find((like) => like.userId === userId);

      if (userLike) {
        // user already liked artwork, ask if they want to unlike
        const Unlike = window.confirm(
          'You have already liked this artwork. Do you want to unlike it?'
        );

        if (Unlike) {
          await deleteLike(userLike.id);
          console.log(`like removed for likeId: ${userLike.id}`);

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
        // user has not liked artwork, create a like
        const response = await createLikeByParam(userId, artworkId);
        if (response && response.id) {
          console.log(`like added for artworkId: ${artworkId}`);

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
          console.error('failed to create like on server.');
        }
      }
    } catch (error) {
      console.error('failed to handle like/unlike operation:', error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    // main container for the explore seeds page
    <div className="explore-seeds content">
      <Navbar />
      {/* mini navbar for search and filter controls */}
      <MiniNavbar
        onSearch={handleSearch}
        onFilterChange={handleFilterChange}
        currentFilter={sortOrder}
      />
      {/* show loading or searching animation, otherwise display seeds */}
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