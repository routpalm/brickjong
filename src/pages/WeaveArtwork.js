// src/pages/WeaveArtwork.js
import React, { useState, useEffect } from 'react';
import AlgorithmSelector from '../components/algorithmSelector.js';
import FileUploader from '../components/FileUploader.js';
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


const algorithmImages = {
  "Wave": Wave,
  "Diagonals": DiaLines,
  "ConCirc":  Concirc,
  "TruchRound": TruRound,
  "Sslines" : SSLine
};

const WeaveArtwork = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("ConCirc"); // Default algorithm is "ConCirc"
  const [isUploading, setIsUploading] = useState(false);
  const { processImage, processedImageData } = useImageProcessor();
  const navigate = useNavigate();

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const handleFileUpload = (file) => {
    setIsUploading(true);
    processImage(file);
    setIsUploading(false);
  };

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
    <div className="weave-artwork-page">
      <Navbar />
      <div className="weave-artwork-container">
        <div className="left-section">
          <img
            src={algorithmImages[selectedAlgorithm]}
            alt={`${selectedAlgorithm} Example`}
            className="algorithm-image"
          />
        </div>
        <div className="right-section">
          <h1 className="page-title">VisuaLoom</h1>
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


