import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faUndo } from '@fortawesome/free-solid-svg-icons';
import { createArtwork } from '../apiclient/artworks.js';


const Toolbar = ({ imageUrl, onRegenerate, onShare }) => {
  const handleDownload = () => {
    if (!imageUrl) {
      console.error('Image URL is undefined or empty');
      return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = () => {
    onShare(); 
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
        userId: 1,
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
      <div className="toolbar-button-container">
        <button onClick={handleSave}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span className="tooltip">Add To Gallery</span>
      </div>
      <div className="toolbar-button-container">
        <button onClick={handleShare}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <span className="tooltip">Share</span>
      </div>
      <div className="toolbar-button-container">
        <button onClick={handleDownload}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span className="tooltip">Download</span>
      </div>
      <div className="toolbar-button-container">
        <button onClick={onRegenerate}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <span className="tooltip">Back</span>
      </div>
    </div>)
}

export default Toolbar;

