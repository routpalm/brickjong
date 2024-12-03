import React from 'react';
import './LoadingAnimation.css';

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="loading-circle"></div>
      <p>Seeds are uploading...</p>
    </div>
  );
};

export default LoadingAnimation;
