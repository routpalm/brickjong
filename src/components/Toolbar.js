// src/components/Toolbar.js
import React from 'react';
import { createArtwork } from '../apiclient/artworks.js';

const Toolbar = ({ imageUrl, onRegenerate }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = async () => {
    try {
      const processedImageData = JSON.parse(localStorage.getItem('processedImageData'));
      const selectedAlgorithm = localStorage.getItem('selectedAlgorithm');

      if (!processedImageData || !selectedAlgorithm) {
        alert('Artwork data not available.');
        return;
      }

      // destructure items from processedImageData
      const { exifData, colorPalette, pixelCluster } = processedImageData;

      // pass individual items as params to createArtwork
      const artworkData = {
        userId: userId,
        algorithm: selectedAlgorithm,
        exifData, // Camera and location metadata
        colorPalette, // Extracted color palette
        pixelCluster, // Random pixel clusters
      };

      await createArtwork(artworkData);
      alert('Artwork saved successfully!');
    } catch (error) {
      alert('Failed to save artwork. Please try again.');
    }
  };
  return (
    <div className="toolbar">
      <button onClick={handleSave}>+</button> {/* Add to my gallery */}
      <button>🔼</button> {/* Share with my friend  */}
      <button onClick={handleDownload}>⬇️</button> {/* Download */}
      <button onClick={() => onRegenerate()}>↩️</button> {/* Go Back */}
    </div>
  );
};

export default Toolbar;

