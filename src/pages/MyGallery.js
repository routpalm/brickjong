// src/pages/MyGallery.js
import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import './MyGallery.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import { getUserArtworks, mapJWTToUserId } from '../apiclient/users.js';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const [userId, setUserId] = useState(null);
  const canvasSize = 200; // Canvas size

  const createSketch = (artwork, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }
    console.log(`creating sketch with c_id: ${containerId}`);
    // Clear any existing content in the container
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Create the appropriate sketch
    if (artwork.algorithm === 'Lines') {
      new p5((p) => LinesSketch(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'Wave') {
      new p5((p) => WaveOscillator(p, artwork, canvasSize), container);
    }
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        console.log('Mapped User ID:', id);
        setUserId(id); // Update state with user ID
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
          setArtworks(data);
        } catch (error) {
          console.error('Error fetching artworks:', error);
        }
      };

      fetchData();
    }
  }, [userId]);

  useEffect(() => {
    artworks.forEach((artwork) => {
      const containerId = `artwork-canvas-${artwork.id}`;
      createSketch(artwork, containerId);
    });
  }, [artworks, canvasSize]); // recreate sketches if artworks or canvas size changes

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
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default MyGallery;
