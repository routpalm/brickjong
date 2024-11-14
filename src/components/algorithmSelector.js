// src/components/AlgorithmSelector.js
import React from 'react';

const AlgorithmSelector = ({ selected, onChange }) => {
  return (
    <div className="algorithm-selector">
      <label className="algorithm-label" htmlFor="algorithm">Choose Your Algorithm:</label>
      <select
        id="algorithm"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="algorithm-dropdown"
      >
        <option value="Lines">Lines</option>
        <option value="Wave">Wave</option>
        <option value="rTruchet">Round Truchet Tile</option>
        <option value="concirc">Concentric Circles</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;

