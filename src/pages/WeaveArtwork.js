// src/pages/WeaveArtwork.js
import React, { useState, useEffect } from 'react';
import AlgorithmSelector from '../components/AlgorithmSelector';
import FileUploader from '../components/FileUploader';
import useImageProcessor from '../hooks/useImageProcessor';
import { useNavigate } from 'react-router-dom';
import { LinesSketch } from '../sketches/LinesSketch';
import { WaveOscillator } from '../sketches/WaveOscillator';

const WeaveArtwork = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("Lines"); // Default with "Line" Algorithm
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
    <div className="weave-artwork">
      <h1>VisuaLoom</h1>
      <p>Choose Your Algorithm:</p>

      <AlgorithmSelector selected={selectedAlgorithm} onChange={handleAlgorithmChange} />

      <p>Please Upload Your Photo to Start Generating Your Unique Digital Art Work!</p>

      <FileUploader onFileSelect={handleFileUpload} isUploading={isUploading} />
    </div>
  );
};

export default WeaveArtwork;

