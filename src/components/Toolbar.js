// src/components/Toolbar.js
// Brick Jong
// purpose: provides a toolbar for the Generated Artwork page that allows users to save, share, download, and go back
// authors: Nicholas Anthony, Tong Guan
// Nick: JWT mapping for grabbing user ID, handling saving
// Tong: Styling, download and share functions
// creation date: 10-20-24

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faUndo } from '@fortawesome/free-solid-svg-icons';
import { createArtwork } from '../apiclient/artworks.js';
import { mapJWTToUserId } from '../apiclient/users.js';

/**
 * renders a toolbar component for the generated artwork page
 * arguments:
 *  - imageUrl: string representing the url of the generated image
 *  - onRegenerate: callback function triggered when user wants to go back and possibly regenerate artwork
 *  - onShare: callback function triggered when user wants to share the artwork
 * returns:
 *  - jsx element representing the toolbar
 */
const Toolbar = ({ imageUrl, onRegenerate, onShare }) => {
  const [userId, setUserId] = useState(null);

  /**
   * effect hook runs on mount, fetching user id from jwt
   * updates userId state when successful
   */
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await mapJWTToUserId();
        setUserId(id);
      } catch (error) {
        console.error('failed to fetch user id:', error);
      }
    };
    fetchUserId();
  }, []);

  /**
   * handles downloading the current generated image
   * checks if imageUrl is valid before creating an anchor element and simulating a click
   */
  const handleDownload = () => {
    if (!imageUrl) {
      console.error('image url is undefined or empty');
      return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  /**
   * handles sharing action by triggering the onShare callback passed from the parent
   * lets the parent handle actual share logic
   */
  const handleShare = () => {
    onShare();
  };

  /**
   * handles saving the current generated artwork to the backend
   * retrieves processed image data from local storage, along with selected algorithm
   * sends data to createArtwork api call
   * alerts user on success or failure
   */
  const handleSave = async () => {
    try {
      const processedImageData = JSON.parse(localStorage.getItem('processedImageData'));
      const selectedAlgorithm = localStorage.getItem('selectedAlgorithm');

      if (!processedImageData || !selectedAlgorithm) {
        alert('artwork data not available.');
        return;
      }

      const { exifData, colorPalette, pixelCluster } = processedImageData;

      const artworkData = {
        userId: userId,
        algorithm: selectedAlgorithm,
        exifData,
        colorPalette,
        pixelCluster,
      };
      await createArtwork(artworkData);
      //alert('artwork saved successfully!');
    } catch (error) {
      alert('Your session has expired. Please log out and sign back in.');
    }
  };

  return (
    // main toolbar container
    <div className="toolbar">
      {/* save button */}
      <div className="toolbar-button-container">
        <button onClick={handleSave}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <span className="tooltip">Add to Gallery</span>
      </div>

      {/* share button */}
      <div className="toolbar-button-container">
        <button onClick={handleShare}>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
        <span className="tooltip">Share</span>
      </div>

      {/* download button */}
      <div className="toolbar-button-container">
        <button onClick={handleDownload}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button>
        <span className="tooltip">Download</span>
      </div>

      {/* back/regenerate button */}
      <div className="toolbar-button-container">
        <button onClick={onRegenerate}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
        <span className="tooltip">Back</span>
      </div>
    </div>
  );
};

export default Toolbar;