// src/components/SeedItem.js
// Brick Jong
// purpose: represents a seed item in explore-seeds
// author: Tong Guan
// creation date: 10-12-2024

import React from 'react';

/**
 * renders a container for a generated art image (seed) with space for a button/info
 *
 * @returns {JSX.Element} a small container with space for an image, info, and a button
 */
const SeedItem = ({ imageSrc, seedName, onClick }) => {
  return (
    <div className="seed-item" onClick={onClick}>
      <img src={imageSrc} alt={seedName} className="seed-image" />
      <button className="seed-button">{seedName}</button>
    </div>
  );
};

export default SeedItem;
