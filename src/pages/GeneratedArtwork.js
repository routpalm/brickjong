// src/pages/GeneratedArtwork.js
// Brick Jong
// purpose: show user's generated artwork after uploading and processing. 
// authors: Nicholas Anthony, Tong Guan
// Nick: image rendering & page mount
// Tong: Styling, page structure, particle effects, handling share/toolbar

import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// component imports
import Toolbar from '../components/Toolbar.js';
import Navbar from '../components/Navbar.js';

// styling imports
import Particles from 'react-tsparticles';
import './GeneratedArtwork.css';
import { loadFull } from 'tsparticles';


//sketch imports
import p5 from 'p5';
import { WaveOscillator } from '../sketches/WaveOscillator.js';
import { ConCirc } from "../sketches/concirc.js";
import { TruchetRound } from "../sketches/truchetTriangles.js";
import { Diagonals } from "../sketches/diags.js";
import { Sslines } from "../sketches/sslines.js";
import { Squigs } from "../sketches/squigs.js";
import { Noisy } from "../sketches/noise1.js";
import { Noisy2 } from "../sketches/noisy2.js"
import { Tunnel } from "../sketches/tunnel.js"



/**
 * renders the generated artwork page
 * arguments: none
 * returns: jsx element representing the generated artwork page
 * this component:
 *   - uses processed image data and selected algorithm passed via location state
 *   - sets up a p5.js sketch on a canvas to display the generated art
 *   - provides toolbar actions: save, share, download, and return
 *   - shows fireworks animation when sharing occurs
 */
const GeneratedArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(''); // holds a data url for the rendered canvas
  const [showFireworks, setShowFireworks] = useState(false); // controls fireworks animation
  const { processedImageData, selectedAlgorithm } = location.state || {};

  /**
   * initializes particles instance for tsparticles
   * @param {object} main - the tsparticles instance
   */
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  /**
   * handles sharing action by triggering fireworks animation temporarily
   */
  const handleShare = () => {
    setShowFireworks(true);
    setTimeout(() => {
      setShowFireworks(false);
    }, 3000);
  };

  useEffect(() => {
    // if no processed image data available, redirect user back to weave-artwork page
    if (!processedImageData) {
      navigate('/weave-artwork');
      return;
    }

    // store processed image data and selected algorithm in local storage for persistence
    localStorage.setItem('processedImageData', JSON.stringify(processedImageData));
    localStorage.setItem('selectedAlgorithm', selectedAlgorithm);

    // select appropriate sketch based on selectedAlgorithm
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
    } else if (selectedAlgorithm === 'Noisy2') {
      sketchInstance = new p5((p) => Noisy2(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Tunnel') {
      sketchInstance = new p5((p) => Tunnel(p, processedImageData), canvasRef.current);
    }

    /**
     * generates a data url from the rendered canvas for downloading
     */
    const generateImageUrl = () => {
      const canvas = canvasRef.current.querySelector('canvas');
      if (canvas) {
        const url = canvas.toDataURL('image/png');
        setImageUrl(url);
      }
    };

    // delay generating the image url to ensure canvas is rendered
    setTimeout(generateImageUrl, 1000);

    return () => {
      if (sketchInstance) sketchInstance.remove();
    };
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    // main container for generated artwork page
    <div className="generated-artwork">
      {/* conditionally display fireworks animation on share */}
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
          {/* container for p5.js sketch canvas */}
          <div className="artwork-container" ref={canvasRef} id="canvasContainer"></div>
        </div>
        <div className="toolbar-column">
          <div className="toolbar-container">
            {/* toolbar to handle saving, sharing, downloading, and going back */}
            <Toolbar
              imageUrl={imageUrl}
              onRegenerate={() => navigate('/weave-artwork')}
              onShare={handleShare} 
            />
          </div>
        </div>
      </div>
      {showFireworks && (
        // message displayed during fireworks to indicate sharing success
        <p className="shared-message" data-testid="shared-message">🎉🎉 Shared!</p>
      )}
    </div>
  );
};

export default GeneratedArtwork;