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
        <option value="Wave">Wave</option>
        <option value="ConCirc">Conecentric Circles</option>
        <option value="TruchRound">Round Truchet</option>
        <option value="Diagonals">Diagonal Lines</option>
        <option value="Sslines">Overlapping Sines</option>
        <option value="Squigs">Squigs</option>
        <option value="Noisy">Noisy</option>
        <option value="Tunnel">Tunnel</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;

