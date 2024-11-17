// src/pages/MyGallery.js
import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import './MyGallery.css';
import { getUserArtworks } from '../apiclient/users.js';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const userId = 1; // Replace with actual user ID
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
    const fetchData = async () => {
      try {
        const data = await getUserArtworks(userId);
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    artworks.forEach((artwork) => {
      const containerId = `artwork-canvas-${artwork.id}`;
      createSketch(artwork, containerId);
    });
  }, [artworks, canvasSize]); // recreate sketches if artworks or canvas size changes

  return (
    <div className="my-gallery">
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
    </div>
  );
};

export default MyGallery;
