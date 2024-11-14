// src/components/SeedItem.js
import React from 'react';

const SeedItem = ({ imageSrc, seedName, onClick }) => {
  return (
    <div className="seed-item" onClick={onClick}>
      <img src={imageSrc} alt={seedName} className="seed-image" />
      <button className="seed-button">{seedName}</button>
    </div>
  );
};

export default SeedItem;
