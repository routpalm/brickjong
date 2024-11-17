// src/pages/MyGallery.js
import React, { useEffect, useState } from 'react';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import './MyGallery.css';
import { getUserArtworks } from '../apiclient/users.js';

const MyGallery = () => {
  const [artworks, setArtworks] = useState([]);
  const userId = 1; // Replace with dynamic user ID
  const canvasSize = 200; // Set canvas size dynamically

  const createSketch = (artwork, container) => {
    let sketchInstance;

    if (artwork.algorithm === 'Lines') {
      sketchInstance = new p5((p) => LinesSketch(p, artwork, canvasSize), container);
    } else if (artwork.algorithm === 'Wave') {
      sketchInstance = new p5((p) => WaveOscillator(p, artwork, canvasSize), container);
    }

    return sketchInstance;
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
      const container = document.getElementById(`artwork-canvas-${artwork.id}`);
      if (container) {
        createSketch(artwork, container);
      }
    });
  }, [artworks, canvasSize]);

  return (
    <div className="my-gallery">
      <h1 className="gallery-title">My Gallery</h1>
      <div className="artwork-grid">
        {artworks.map((artwork) => (
          <div className="artwork-wrapper" key={artwork.id}>
            <div className="canvas-container" id={`artwork-canvas-${artwork.id}`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyGallery;
