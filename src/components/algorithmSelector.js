// ./src/components/algorithmSelector.js
// purpose: provides a dropdown component for selecting an algorithm used in the artwork generation process
// creation date: 2024-11-24
// authors: Nicholas Anthony, Tong Guan
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
        <option value="Wave">wave</option>
        <option value="ConCirc">concentric circles</option>
        <option value="TruchRound">round truchet</option>
        <option value="Diagonals">diagonal lines</option>
        <option value="Sslines">overlapping sines</option>
        <option value="Squigs">squigs</option>
        <option value="Noisy">noisy</option>
        <option value="Noisy2">noisy 2</option>
        <option value="Tunnel">tunnel</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
