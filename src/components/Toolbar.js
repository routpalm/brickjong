// src/components/Toolbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowUp, faArrowDown, faUndo } from '@fortawesome/free-solid-svg-icons';

const Toolbar = ({ imageUrl, onRegenerate }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-artwork.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="toolbar">
      <div className="toolbar-button-container">
        <button onClick={onRegenerate}>
          <FontAwesomeIcon icon={faPlus} />
        </button> {/* Add to my gallery */}
        <span className="tooltip">Add To Gallery</span>
      </div>
      <div className="toolbar-button-container">
        <button>
          <FontAwesomeIcon icon={faArrowUp} />
        </button> {/* Share with my friend */}
        <span className="tooltip">Share<></></span>
      </div>
      <div className="toolbar-button-container">
        <button onClick={handleDownload}>
          <FontAwesomeIcon icon={faArrowDown} />
        </button> {/* Download */}
        <span className="tooltip">Download</span>
      </div>
      <div className="toolbar-button-container">
        <button onClick={() => onRegenerate()}>
          <FontAwesomeIcon icon={faUndo} />
        </button> {/* Go Back */}
        <span className="tooltip">Back</span>
      </div>
    </div>
  );
};

export default Toolbar;


