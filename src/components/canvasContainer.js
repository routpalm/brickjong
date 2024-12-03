// ./src/components/canvasContainer.js
// purpose: provides a reusable component for rendering a container element for a canvas, using a reference for direct DOM manipulation
// creation date: 2024-11-24
// authors: Nicholas Anthony
// this component acts as a wrapper for p5.js sketches, e.g consistent structure for canvas-related DOM elements
// modifications: none

import React from 'react';

/**
 * renders a container for a canvas element.
 *
 * @param {Object} props - the properties passed to the component.
 * @param {Object} props.canvasRef - a React ref to attach to the canvas container div, enabling external control of the canvas.
 * @returns {JSX.Element} a container element for the canvas.
 */
function CanvasContainer({ canvasRef }) {
  return (
    // div to house the canvas, with a ref for DOM manipulation
    <div id="canvasContainer" ref={canvasRef}></div>
  );
}

export default CanvasContainer;
