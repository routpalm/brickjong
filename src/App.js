import React, { useEffect, useState, useRef } from 'react';
//import 'p5/lib/addons/p5.dom';
import * as p5 from 'p5';
//import './app.css';

import AlgorithmSelector from './components/algorithmSelector';
import FileUploader from './components/fileUploader';
import CanvasContainer from './components/canvasContainer';
import { LinesSketch } from './sketches/LinesSketch';
import { WaveOscillator } from './sketches/WaveOscillator';
import useImageProcessor from './hooks/useImageProcessor';

const App = () => {
  const { processImage, processedImageData } = useImageProcessor();
  const [algorithm, setAlgorithm] = useState('lines');
  const [description, setDescription] = useState('');
  const canvasRef = useRef();
  const [fileUploaded, setFileUploaded] = useState(false); 
  let currentSketch = useRef(null);

  const algorithmDescriptions = {
    lines: "Generates random colored lines based on the image's color palette.",
    wave: "Generates dynamic oscillating shapes with colors influenced by the uploaded image.",
  };

    // Update description based on selected algorithm
    useEffect(() => {
      setDescription(algorithmDescriptions[algorithm] || 'Select an algorithm to see its description.');
    }, [algorithm]);

  useEffect(() => {

    console.log("Algorithm selected:", algorithm);
    console.log("Processed image data:", processedImageData);

    if (!fileUploaded || !processedImageData || !processedImageData.colorPalette) {
      console.warn("Waiting for file upload and processed image data...");
      return;
    }

    if (currentSketch.current) {
      currentSketch.current.remove();
    }

    switch (algorithm) {
      case 'lines':
        currentSketch.current = new p5((p) => LinesSketch(p, processedImageData), canvasRef.current);
        break;
      case 'wave':
        currentSketch.current = new p5((p) => WaveOscillator(p, processedImageData), canvasRef.current);
        break;
      default:
        console.warn(`Unknown algorithm selected: ${algorithm}`);
    }

    return () => {
      if (currentSketch.current) {
        currentSketch.current.remove();
      }
    };
  }, [algorithm, fileUploaded, processedImageData]);

   // hadnle fupload
   const handleFileSelect = (file) => {
    setFileUploaded(true); // flag to true once a file is uploaded
    processImage(file);
  };

  return (
    <div className="App">
      <header>
        <h1>VisuaLoom</h1>
      </header>
      <AlgorithmSelector selected={algorithm} onChange={setAlgorithm} />
      <p>{description}</p>
      <FileUploader onFileSelect={handleFileSelect} />
      <CanvasContainer canvasRef={canvasRef} />
    </div>
  );
};

export default App;
