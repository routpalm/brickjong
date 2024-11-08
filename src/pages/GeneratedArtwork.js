// src/pages/GeneratedArtwork.js
import React, { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar';
import p5 from 'p5';
import { LinesSketch } from '../sketches/LinesSketch';
import { WaveOscillator } from '../sketches/WaveOscillator';

const GeneratedArtwork = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const { processedImageData, selectedAlgorithm } = location.state || {};

  useEffect(() => {
    if (!processedImageData) {
      // 没有图像数据则返回到 Weave Artwork 页面
      navigate('/weave-artwork');
      return;
    }

    // 根据选择的算法来渲染图像
    let sketchInstance;
    if (selectedAlgorithm === 'Lines') {
      sketchInstance = new p5((p) => LinesSketch(p, processedImageData), canvasRef.current);
    } else if (selectedAlgorithm === 'Wave') {
      sketchInstance = new p5((p) => WaveOscillator(p, processedImageData), canvasRef.current);
    }

    return () => {
      // 清除 p5 实例，避免内存泄漏
      if (sketchInstance) sketchInstance.remove();
    };
  }, [processedImageData, selectedAlgorithm, navigate]);

  return (
    <div className="generated-artwork">
      <h1>VisuaLoom</h1>
      <p>Congrats on Your New Algorithm Art Work!</p>

      <div className="artwork-container" ref={canvasRef} id="canvasContainer"></div>

      <Toolbar
        imageUrl={processedImageData.imageUrl}
        onRegenerate={() => navigate('/weave-artwork')}
      />
    </div>
  );
};

export default GeneratedArtwork;
