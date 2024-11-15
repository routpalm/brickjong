// src/pages/WeaveArtwork.js
import React, { useState, useEffect } from 'react';
import AlgorithmSelector from '../components/algorithmSelector.js';
import FileUploader from '../components/fileUploader.js';
import useImageProcessor from '../hooks/useImageProcessor.js';
import { useNavigate } from 'react-router-dom';
import './WeaveArtwork.css';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';
import SampleAlgo1 from '../images/bauhaus.png';
import SampleAlgo2 from '../images/spiro.jpg';

const algorithmImages = {
  "Lines": SampleAlgo1,
  "Wave": SampleAlgo2,
};

const WeaveArtwork = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Lines"); // Default algorithm is "Lines"
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
            Upload Your Photo to Create ✨!
          </p>
          <FileUploader onFileSelect={handleFileUpload} isUploading={isUploading} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default WeaveArtwork;


