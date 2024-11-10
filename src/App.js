import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import 'p5/lib/addons/p5.dom';
import * as p5 from 'p5';
//import './app.css';

import AlgorithmSelector from './components/algorithmSelector';
import FileUploader from './components/fileUploader';
import CanvasContainer from './components/canvasContainer';
import { LinesSketch } from './sketches/LinesSketch';
import { WaveOscillator } from './sketches/WaveOscillator';
import { TruchetRound } from './sketches/truchetTriangles';
import { ConCirc } from './sketches/concirc'
import useImageProcessor from './hooks/useImageProcessor';
import GoogleAuthTest from './pages/googleAuthTest';
import Dashboard from './components/dashboard';

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
    rTruchet: "Truchet tile pattern with curves.",
    concirc: "Concentric circle pattern."
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
      case 'rTruchet':
        currentSketch.current = new p5((p) => TruchetRound(p,processedImageData), canvasRef.current);
        break;
      case 'concirc':
        currentSketch.current = new p5((p) => ConCirc(p,processedImageData), canvasRef.current);
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
    <Router>
      
      <Routes>
        {/* home route */}
        <Route
          path="/"
          element={
            <div className="App">
              <header>
                <h1>VisuaLoom</h1>
              </header>
              <nav>
                  <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/auth-test">Sign In</Link> 
              </nav>
              <AlgorithmSelector selected={algorithm} onChange={setAlgorithm} />
              <p>{description}</p>
              <FileUploader onFileSelect={handleFileSelect} />
              <CanvasContainer canvasRef={canvasRef} />
            </div>
          }
        />
        
        {/* google auth route */}
        <Route path="/auth-test" element={<GoogleAuthTest />} />
        {/* link to dashboard, which should be a protected page */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
