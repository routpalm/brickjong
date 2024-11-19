import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faUndo } from '@fortawesome/free-solid-svg-icons';

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

  return (
    <div className="toolbar">
      <div className="toolbar-button-container">
        <button onClick={onRegenerate}>
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
    </div>
  );
};

export default Toolbar;

