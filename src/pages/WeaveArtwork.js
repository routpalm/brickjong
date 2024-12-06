// src/pages/WeaveArtwork.js
// Brick Jong
// purpose: returns a page element that provides users with the main functionality of the website: actually creating art. 
// images are processed here and parameters are sent to the GeneratedArtwork page.
// author: Tong Guan
// creation date: 11-04-24

import React, { useState, useEffect } from 'react';
import AlgorithmSelector from '../components/algorithmSelector.js';
import FileUploader from '../components/fileUploader.js';
import useImageProcessor from '../hooks/useImageProcessor.js';
import { useNavigate } from 'react-router-dom';
import './WeaveArtwork.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import DiaLines from '../images/DiaLines.png';
import SSLine from '../images/SSLine.png';
import Concirc from '../images/Concirc.png';
import TruRound from '../images/TruRound.png';
import Wave from '../images/Wave.png';
import Squigs from '../images/squigs.png';
import Noisy from '../images/Noisy.png';
import Noisy2 from '../images/Noisy2.png';
import Tunnel from '../images/Tunnel.png';


const algorithmImages = {
  "Wave": Wave,
  "Diagonals": DiaLines,
  "ConCirc":  Concirc,
  "TruchRound": TruRound,
  "Sslines" : SSLine,
  "Squigs": Squigs,
  "Noisy": Noisy,
  "Noisy2": Noisy2,
  "Tunnel" : Tunnel
};
/**
 * renders the weave artwork page
 * 
 * this component lets users pick an algorithm for art generation and upload an image to process.
 * after processing, it navigates to the generated-artwork page.
 *
 * @returns {JSX.Element} weave artwork page ui
 */
const WeaveArtwork = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("ConCirc"); // stores chosen algorithm, default "ConCirc"
  const [isUploading, setIsUploading] = useState(false); // indicates if an image upload is in progress
  const { processImage, processedImageData } = useImageProcessor();
  const navigate = useNavigate();

  /**
   * handles changes to the selected algorithm.
   * @param {string} algorithm - the newly chosen algorithm
   */
  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  /**
   * handles file upload event.
   * triggers image processing and sets uploading state during the process.
   * @param {File} file - the user-selected image file to process
   */
  const handleFileUpload = (file) => {
    setIsUploading(true);
    processImage(file);
    setIsUploading(false);
  };

  // once processedImageData is available, navigate to the generated-artwork page with state
  useEffect(() => {
    if (processedImageData) {
      navigate('/generated-artwork', {
        state: {
          processedImageData,
          selectedAlgorithm,
        },
      });
    }
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    // main container for the weave artwork page
    <div className="weave-artwork-page">
      <Navbar /> {/* top-level navigation bar */}
      <div className="weave-artwork-container">
        <div className="left-section">
          {/* show a representative image for the currently selected algorithm */}
          <img
            src={algorithmImages[selectedAlgorithm]}
            alt={`${selectedAlgorithm} example`}
            className="algorithm-image"
          />
        </div>
        <div className="right-section">
          <h1 className="page-title">VisuaLoom</h1>
          {/* algorithm selector dropdown */}
          <AlgorithmSelector selected={selectedAlgorithm} onChange={handleAlgorithmChange} />
          <p className="upload-instructions">
            Let's weave something new.
          </p>
          <FileUploader onFileSelect={handleFileUpload} isUploading={isUploading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeaveArtwork;