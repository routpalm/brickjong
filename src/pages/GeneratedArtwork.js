import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar.js';
import p5 from 'p5';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import { ConCirc } from "../sketches/concirc.js";
import { TruchetRound } from "../sketches/truchetTriangles.js";
import { Diagonals } from "../sketches/diags.js";
import { Sslines } from "../sketches/sslines.js";
import { Squigs } from "../sketches/squigs.js";
import { Noisy } from "../sketches/noise1.js"
import { Tunnel } from "../sketches/tunnel.js"
import Navbar from '../components/Navbar.js';
import Particles from 'react-tsparticles';
import './GeneratedArtwork.css';
import { loadFull } from 'tsparticles';





const GeneratedArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(''); 
  const [showFireworks, setShowFireworks] = useState(false); 
  const { processedImageData, selectedAlgorithm } = location.state || {};

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleShare = () => {
    setShowFireworks(true); 
    setTimeout(() => {
      setShowFireworks(false); 
    }, 3000);
  };

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
    if (selectedAlgorithm === 'Wave') {
      sketchInstance = new p5((p) => WaveOscillator(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'ConCirc') {
      sketchInstance = new p5((p) => ConCirc(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'TruchRound') {
      sketchInstance = new p5((p) => TruchetRound(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Diagonals') {
      sketchInstance = new p5((p) => Diagonals(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Sslines') {
      sketchInstance = new p5((p) => Sslines(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Squigs') {
      sketchInstance = new p5((p) => Squigs(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Noisy') {
      sketchInstance = new p5((p) => Noisy(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Tunnel') {
      sketchInstance = new p5((p) => Tunnel(p, processedImageData), canvasRef.current);
    } 

    const generateImageUrl = () => {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        setImageUrl(url);
      }
    };
  
    setTimeout(generateImageUrl, 1000);

    return () => {
      if (sketchInstance) sketchInstance.remove();
    };
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    <div className="generated-artwork">
      {showFireworks ? (
        <Particles
          id="tsparticles-fireworks"
          className="fireworks-background"
          init={particlesInit}
          options={{
            particles: {
              number: { value: 500 },
              color: { value: ["#EADDFF", "#AF52DE", "#71358F"] }, 
              shape: { type: "circle" },
              opacity: { value: 1 },
              size: { value: { min: 3, max: 5 } },
              move: {
                enable: true,
                speed: 6,
                direction: "none",
                outModes: {
                  default: "destroy"
                },
              },
            },
            interactivity: {
              detectsOn: "canvas",
              events: {
                onclick: { enable: true, mode: "push" },
                resize: true
              },
              modes: {
                push: { quantity: 4 },
              }
            },
            detectRetina: true,
          }}
        />
      ) : (
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
      )}
      <Navbar />
      <div className="column-container">
        <div className="artwork-column">
          <div className="artwork-container" ref={canvasRef} id="canvasContainer"></div>
        </div>
        <div className="toolbar-column">
          <div className="toolbar-container">
            <Toolbar
              imageUrl={imageUrl}
              onRegenerate={() => navigate('/weave-artwork')}
              onShare={handleShare} 
            />
          </div>
        </div>
      </div>
      {showFireworks && (
        <p className="shared-message">🎉🎉 Shared!</p>
      )}
    </div>
  );
};

export default GeneratedArtwork;
