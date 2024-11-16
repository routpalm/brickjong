// src/pages/GeneratedArtwork.js
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar.js';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';

const GeneratedArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const { processedImageData, selectedAlgorithm } = location.state || {};

  useEffect(() => {
    if (!processedImageData) {
      navigate('/weave-artwork');
      return;
    }

     // save processedImageData to localStorage
     localStorage.setItem('processedImageData', JSON.stringify(processedImageData));
     localStorage.setItem('selectedAlgorithm', selectedAlgorithm);

    // Render the images based on selected algorithm
    let sketchInstance;
    if (selectedAlgorithm === 'Lines') {
      sketchInstance = new p5((p) => LinesSketch(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Wave') {
      sketchInstance = new p5((p) => WaveOscillator(p, processedImageData), canvasRef.current);
    }

    return () => {
      //Clean p5 instance for avoiding leak
      if (sketchInstance) sketchInstance.remove();
    };
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    <div className="generated-artwork">
      <h1>VisuaLoom</h1>
      <p>Congrats on Your New Algorithm Art Work!</p>

      <div className="artwork-container" ref={canvasRef} id="canvasContainer"></div>

      <Toolbar
        imageUrl={processedImageData.imageUrl}
        onRegenerate={() => navigate('/weave-artwork')}
      />
    </div>
  );
};

export default GeneratedArtwork;
