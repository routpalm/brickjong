// src/pages/MyGallery.js
import React, { useEffect, useState, useLayoutEffect } from 'react';
import p5 from 'p5';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import './MyGallery.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { getUserArtworks, mapJWTToUserId } from '../apiclient/users.js';
import { createLikeByParam } from '../apiclient/likes.js';
import { ConCirc } from '../sketches/concirc.js';
import { Diagonals } from '../sketches/diags.js';
import { Sslines } from '../sketches/sslines.js';
import { TruchetRound } from '../sketches/truchetTriangles.js';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [userId, setUserId] = useState(null);
  const canvasSize = 200; // Canvas size

  const createSketch = (artwork, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container with ID "${containerId}" not found`);
      return;
    }

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    if (artwork.algorithm === 'ConCirc') {
      new p5((p) => ConCirc(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'Wave') {
      new p5((p) => WaveOscillator(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'Diagonals') {
      new p5((p) => Diagonals(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'Sslines') {
      new p5((p) => Sslines(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'TruchetRound') {
      new p5((p) => TruchetRound(p, artwork, canvasSize), container);
    }else {
      console.warn(`Unknown algorithm: ${artwork.algorithm}`);
    }
  };

  const handleLike = async (artworkId) => {
    try {
      await createLikeByParam(userId, artworkId);
      alert('Artwork liked successfully!');
    } catch (error) {
      alert('Failed to like artwork. Please try again.');
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
        console.log("User ID set to:", id);
      } catch (error) {
        console.error('Failed to fetch user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const data = await getUserArtworks(userId);
          console.log("Fetched Artworks Data:", data);
          setArtworks(data);
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      };

      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    if (artworks.length > 0) {
      artworks.forEach((artwork) => {
        const containerId = `artwork-canvas-${artwork.id}`;
        console.log(`Creating sketch for container: ${containerId}`);
        createSketch(artwork, containerId);
      });
    }
  }, [artworks]);

  return (
    <div className="my-gallery">
      <Navbar />
      <h1 className="gallery-title">My Gallery</h1>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <div className="artwork-wrapper" key={artwork.id}>
            <div
              className="canvas-container"
              id={`artwork-canvas-${artwork.id}`}
            ></div>
            <button
              className="like-button"
              onClick={() => handleLike(artwork.id)}
            >
              Like
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyGallery;
