// ./src/components/fileUploader.js
// Brick Jong
// purpose: provides a user interface for uploading image files and triggers a callback when a file is selected
// creation date: 2024-11-27
// authors: Tong Guan
// integrates with the parent component's state to handle file selection and uploading status

import React from 'react';
import './LoadingAnimation.css';

/**
 * renders a loading animation with a spinning circle and a message
 *
 * @returns {JSX.Element} a small container showing a rotating circle and text indicating that seeds are uploading
 */
const LoadingAnimation = () => {
  return (
    // wrapper div for loading animation
    <div className="loading-container">
      {/* circle representing the loading spinner */}
      <div className="loading-circle"></div>
      {/* message indicating ongoing upload */}
      <p>Seeds are uploading...</p>
    </div>
  );
};

export default LoadingAnimation;