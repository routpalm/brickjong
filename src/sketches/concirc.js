// src/sketches/concirc.js
// Brick Jong
// purpose: generate concentric circles using a custom random pixel cluster generator seeded by image data
// author: Jordan Poppe
// creation date: 11-15-24

import { pRandom } from "./pRandom.js";

/**
 * Generates a sketch with concentric circles, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const ConCirc = (p, processedImageData, size = 512) => {
  // setup function initializes the canvas and defines its properties
  p.setup = () => {
    const canvas = p.createCanvas(size, size);

    // check if canvas has a parent node to attach to
    if (p._userNode) {
      canvas.parent(p._userNode);
    } else {
      console.error("No parent node found for the canvas.");
    }

    p.colorMode(p.RGB);
    p.noLoop();

    // ensure image data exists before redrawing
    if (processedImageData && processedImageData.colorPalette) {
      p.redraw();
    }
  };

  /**
   * Draws concentric circles centered at (x, y) with alternating colors.
   *
   * @param {number} num - Diameter of the largest circle.
   * @param {number} x - x-coordinate of the circle center.
   * @param {number} y - y-coordinate of the circle center.
   * @param {array} colors - Array of alternating stroke colors.
   */
  function concirc(num, x, y, colors) {
    for (let i = 0; i < num; i++) {
      p.stroke(i % 10 < 5 ? colors[0] : colors[1]); // alternate stroke colors
      p.circle(x, y, num - i); // draw circle with decreasing diameter
    }
  }

  // draw function executes the concentric circle algorithm
  p.draw = () => {
    p.background(220); // set default white background

    // fallback values for missing processed image data
    const colors = processedImageData?.colorPalette || [
      "rgb(0, 0, 0)",
      "rgb(255,255,255)",
      "rgb(0, 0, 0)",
      "rgb(255,255,255)"
    ];
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];
    const randgen = pRandom(pixdata); // initialize random generator

    let numcirc = (randgen.next().value + 10) % 20; // determine number of circles
    p.background(colors[4]); // use fifth color as background

    // generate circles with random positioning and sizes
    for (let j = 0; j < numcirc; j++) {
      let u = randgen.next().value;
      let v = randgen.next().value;
      let randX = (u * v) % size;
      let randY = (randX * v) % size;
      let randDia = (u * randY) % 350;
      concirc(randDia, randX, randY, [colors[0], colors[1]]);
    }

    // generate secondary circles with variations
    for (let j = 0; j < numcirc; j++) {
      let a = randgen.next().value;
      let b = randgen.next().value;
      let randX = (a * a) % size;
      let randY = (randX * b) % size;
      let randDia = (a * randY) % 350;
      concirc(randDia, randX, randY, [colors[2] + [j, j, j], colors[3]]);
    }

    p.noLoop(); // stop continuous drawing
  };
};
