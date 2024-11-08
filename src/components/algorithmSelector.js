// src/components/AlgorithmSelector.js
import React from 'react';

const AlgorithmSelector = ({ selected, onChange }) => {
  return (
    <div className="algorithm-selector">
      <label htmlFor="algorithm">Choose Your Algorithm:</label>
      <select
        id="algorithm"
        value={selected}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="Lines">Lines</option>
        <option value="Wave">Wave</option>
      </select>
    </div>
  );
};

export default AlgorithmSelector;
