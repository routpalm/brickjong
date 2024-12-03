import React, { useEffect, useState, useRef } from 'react';
import p5 from 'p5';
import './MyGallery.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { mapJWTToUserId, getUserArtworks, getUserById } from '../apiclient/users.js';
import { deleteArtwork, getArtworkById } from '../apiclient/artworks.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import { ConCirc } from '../sketches/concirc.js';
import { Diagonals } from '../sketches/diags.js';
import { Sslines } from '../sketches/sslines.js';
import { TruchetRound } from '../sketches/truchetTriangles.js';
import { LinesSketch } from '../sketches/lines.js';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [likedArtworks, setLikedArtworks] = useState([]);
  const [filter, setFilter] = useState('my-artworks'); // 'my-artworks' or 'liked-artworks'
  const [userId, setUserId] = useState(null);
  const canvasRefs = useRef({});
  const canvasSize = 200;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchArtworks = async () => {
        try {
          const userArtworks = await getUserArtworks(userId);
          setArtworks(userArtworks);

          const user = await getUserById(userId);
          console.log("User: ", user);  
          const likes = user.likes;
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

  useEffect(() => {
    const displayedArtworks = filter === 'my-artworks' ? artworks : likedArtworks;

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

    displayedArtworks.forEach((artwork) => {
        createSketch(artwork);
    });
}, [filter, artworks, likedArtworks]);

  const createSketch = (artwork) => {
    const containerId = `gallery-canvas-${artwork.id}`;
    let container = canvasRefs.current[containerId];
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    // clear prev sketches
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

  const handleDelete = async (artworkId) => {
    try {
        await deleteArtwork(artworkId);
        console.log(`Deleting artwork ID: ${artworkId}...`);

        const containerId = `gallery-canvas-${artworkId}`;
        if (canvasRefs.current[containerId]) {
            const container = canvasRefs.current[containerId];
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
            delete canvasRefs.current[containerId];
        }
        setArtworks((prevArtworks) => prevArtworks.filter((art) => art.id !== artworkId));
        alert('Artwork deleted successfully!');
    } catch (error) {
        console.error('Failed to delete artwork:', error);
        alert('Failed to delete artwork. Please try again.');
    }
};

  return (
    <div className="my-gallery">
      <Navbar />
      <h1 className="gallery-title">My Gallery</h1>
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
