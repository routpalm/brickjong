// src/pages/MyGallery.js
// Brick Jong
// purpose: crucial page of ux where users can see their saved and liked artworks. fetches artworks from backend through 
// the API and redraws sketches inside instantiated canvas containers
// author: Nicholas Anthony
// creation date: 11-14-24

import React, { useEffect, useState, useRef } from 'react';

import './MyGallery.css';

// component imports
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

// api imports
import { mapJWTToUserId, getUserArtworks, getUserById } from '../apiclient/users.js';
import { deleteArtwork, getArtworkById } from '../apiclient/artworks.js';

// sketch imports
import p5 from 'p5';
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

/**
 * renders the my gallery page
 * arguments: none
 * returns: jsx element representing the user's gallery page
 * this component:
 *   - fetches user's own artworks and liked artworks from the backend after user id is obtained
 *   - lets the user switch between viewing 'my-artworks' and 'liked-artworks'
 *   - uses p5.js sketches to display each artwork visually
 *   - allows deletion of user-owned artworks
 *   - depends on auth state to determine which artworks to fetch
 */
const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [filter, setFilter] = useState('my-artworks'); // either 'my-artworks' or 'liked-artworks'
  const [userId, setUserId] = useState(null);
  const canvasRefs = useRef({});
  const canvasSize = 200;

  // fetch user id on mount by mapping jwt to user id
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
      } catch (error) {
        console.error('failed to fetch user id:', error);
      }
    };
    fetchUserId();
  }, []);

  // once userId is set, fetch user artworks and liked artworks
  useEffect(() => {
    if (userId) {
      const fetchArtworks = async () => {
        try {
          const userArtworks = await getUserArtworks(userId);
          setArtworks(userArtworks);

          const user = await getUserById(userId);
          //console.log("user: ", user);
          const likes = user.likes;

          // fetch each liked artwork by id
          const likedArtworks = await Promise.all(
            likes.map((like) => getArtworkById(like.artworkId))
          );
          setLikedArtworks(likedArtworks);
        } catch (error) {
          console.error('error fetching artworks or likes:', error);
        }
      };
      fetchArtworks();
    }
  }, [userId]);

  // whenever filter, artworks, or likedArtworks change, update displayed sketches
  useEffect(() => {
    const displayedArtworks = filter === 'my-artworks' ? artworks : likedArtworks;

    // remove sketches for artworks no longer displayed
    Object.keys(canvasRefs.current).forEach((key) => {
      const id = key.split('gallery-canvas-')[1];
      if (!displayedArtworks.find((artwork) => artwork.id === parseInt(id))) {
        const container = canvasRefs.current[key];
        if (container) {
          while (container.firstChild) {
            container.removeChild(container.firstChild);
          }
          delete canvasRefs.current[key];
        }
      }
    });

    // create sketches for the currently displayed artworks
    displayedArtworks.forEach((artwork) => {
      createSketch(artwork);
    });
  }, [filter, artworks, likedArtworks]);

  /**
   * creates a p5 sketch inside the corresponding container for the given artwork
   * @param {Object} artwork - an object containing artwork details, including 'algorithm' and 'colorPalette'
   * no return value, but updates the dom by rendering the sketch in the container
   */
  const createSketch = (artwork) => {
    const containerId = `gallery-canvas-${artwork.id}`;
    let container = canvasRefs.current[containerId];
    if (!container) {
      console.error(`container with id "${containerId}" not found`);
      return;
    }

    // clear previous sketches from container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // parse colorPalette if needed
    if (artwork.colorPalette && typeof artwork.colorPalette === 'string') {
      try {
        artwork.colorPalette = JSON.parse(artwork.colorPalette);
      } catch (error) {
        console.error('failed to parse colorPalette:', error);
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
      console.warn(`unknown algorithm: ${artwork.algorithm}`);
    }
  };

  /**
   * handles deleting a user's own artwork from the backend and updates the ui accordingly
   * @param {number} artworkId - the id of the artwork to delete
   */
  const handleDelete = async (artworkId) => {
    try {
      await deleteArtwork(artworkId);
      console.log(`deleting artwork id: ${artworkId}...`);

      const containerId = `gallery-canvas-${artworkId}`;
      if (canvasRefs.current[containerId]) {
        const container = canvasRefs.current[containerId];
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
        delete canvasRefs.current[containerId];
      }
      setArtworks((prevArtworks) => prevArtworks.filter((art) => art.id !== artworkId));
      alert('artwork deleted successfully!');
    } catch (error) {
      console.error('failed to delete artwork:', error);
      alert('failed to delete artwork. please try again.');
    }
  };

  return (
    // main container for my gallery page
    <div className="my-gallery">
      <Navbar />
      <h1 className="gallery-title">my gallery</h1>
      <div className="filter-buttons">
        <button
          onClick={() => setFilter('my-artworks')}
          className={filter === 'my-artworks' ? 'active' : ''}
        >
          My Artworks
        </button>
        <button
          onClick={() => setFilter('liked-artworks')}
          className={filter === 'liked-artworks' ? 'active' : ''}
        >
          Liked Artworks
        </button>
      </div>
      <div className="gallery-grid">
        {(filter === 'my-artworks' ? artworks : likedArtworks).map((artwork) => (
          <div className="gallery-wrapper" key={artwork.id}>
            <div
              className="canvas-container"
              id={`gallery-canvas-${artwork.id}`}
              ref={(el) => (canvasRefs.current[`gallery-canvas-${artwork.id}`] = el)}
            ></div>
            {filter === 'my-artworks' && (
              <button
                className="delete-button"
                onClick={() => handleDelete(artwork.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyGallery;