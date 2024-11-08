// src/components/Toolbar.js
import React from 'react';

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
      <button onClick={onRegenerate}>+</button> {/* Add to my gallery */}
      <button>🔼</button> {/* Share with my friend  */}
      <button onClick={handleDownload}>⬇️</button> {/* Download */}
      <button onClick={() => onRegenerate()}>↩️</button> {/* Go Back */}
    </div>
  );
};

export default Toolbar;
