// GeneratedArtwork.js
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar.js';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch.js';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import Navbar from '../components/Navbar.js';
import Particles from 'react-tsparticles';
import './GeneratedArtwork.css';
import { loadFull } from 'tsparticles';

const GeneratedArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const { processedImageData, selectedAlgorithm } = location.state || {};

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  useEffect(() => {
    if (!processedImageData) {
      navigate('/weave-artwork');
      return;
    }

    let sketchInstance;
    if (selectedAlgorithm === 'Lines') {
      sketchInstance = new p5((p) => LinesSketch(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Wave') {
      sketchInstance = new p5((p) => WaveOscillator(p, processedImageData), canvasRef.current);
    }

    return () => {
      if (sketchInstance) sketchInstance.remove();
    };
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    <div className="generated-artwork">
      <Particles
        id="tsparticles"
        className="particles-background"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 300,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 50,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              directions: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <Navbar />
      <div className="column-container">
        <div className="artwork-column">
          <div className="artwork-container" ref={canvasRef} id="canvasContainer"></div>
        </div>
        <div className="toolbar-column">
          <div className="toolbar-container">
            <Toolbar
              imageUrl={processedImageData?.imageUrl}
              onRegenerate={() => navigate('/weave-artwork')}
            />
          </div>
        </div>
      </div>
      <p className="congrats-message">Congrats on Your New Algorithm Art Work!</p>
    </div>
  );
};

export default GeneratedArtwork;