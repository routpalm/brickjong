import React, { useEffect, useState, useRef } from 'react';
//import 'p5/lib/addons/p5.dom';
import * as p5 from 'p5';
//import './app.css';

import AlgorithmSelector from './components/algorithmSelector';
import FileUploader from './components/fileUploader';
import CanvasContainer from './components/canvasContainer';
import ImageProcessor from './components/imageProcessor';
import LinesSketch from './sketches/LinesSketch';
import WaveOscillator from './sketches/WaveOscillator';
import useImageProcessor from './hooks/useImageProcessor';

const App = () => {
  const { processImage, processedImageData } = useImageProcessor();
  const [algorithm, setAlgorithm] = useState('lines');
  const [description, setDescription] = useState('');
  const canvasRef = useRef();
  let currentSketch = useRef(null);

  const algorithmDescriptions = {
    lines: "Generates random colored lines based on the image's color palette.",
    wave: "Generates dynamic oscillating shapes with colors influenced by the uploaded image.",
  };

  useEffect(() => {
    if (algorithmDescriptions[algorithm]) {
      setDescription(algorithmDescriptions[algorithm]);
    } else {
      setDescription('Select an algorithm to see its description.');
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
  }, [algorithm, processedImageData]);

  return (
    <div className="App">
      <header>
        <h1>VisuaLoom</h1>
      </header>
      <AlgorithmSelector selected={algorithm} onChange={setAlgorithm} />
      <p>{description}</p>
      <FileUploader onFileSelect={processImage} />
      <ImageProcessor />
      <CanvasContainer canvasRef={canvasRef} />
    </div>
  );
};

export default App;
