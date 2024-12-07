// ./src/components/algorithmSelector.js
// Brick Jong
// purpose: provides a dropdown component for selecting an algorithm used in the artwork generation process
// creation date: 2024-10-15
// authors: Nicholas Anthony
// part of the UI for the artwork generation feature, this component allows users to choose from a predefined set of algorithms to customize their artwork
// modifications: none

import React from 'react';

/**
 * renders a dropdown menu for selecting an algorithm.
 * 
 * @param {string} selected - the currently selected algorithm.
 * @param {Function} onChange - callback function to handle when the selected algorithm changes.
 * @returns {JSX.Element} the algorithm selector dropdown component.
 */
const AlgorithmSelector = ({ selected, onChange }) => {
  return (
    <div className="algorithm-selector">
      {/* dropdown label */}
      <label className="algorithm-label" htmlFor="algorithm">
        choose your algorithm:
      </label>

      {/* dropdown menu for algorithm selection */}
      <select
        id="algorithm"
        value={selected} // current selected algorithm
        onChange={(e) => onChange(e.target.value)} // handles changes in selection
        className="algorithm-dropdown"
      >
        <option value="Wave">Wave</option>
        <option value="ConCirc">Concentric Circles</option>
        <option value="TruchRound">Round Truchet</option>
        <option value="Diagonals">Diagonal Lines</option>
        <option value="Sslines">Overlapping Sines</option>
        <option value="Squigs">Squigs</option>
        <option value="Noisy">Noisy</option>
        <option value="Noisy2">Noisy 2</option>
        <option value="Tunnel">Tunnel</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
