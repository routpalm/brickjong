// src/sketches/diags.js
// Brick Jong
// purpose: generate diagonal patterns within grid squares using extracted color palettes
// author: Jordan Poppe
// creation date: 11-15-24

import { pRandom } from "./pRandom.js";

/**
 * Generates a grid-based sketch with diagonal lines and optional triangles, 
 * using colors derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const Diagonals = (p, processedImageData, size = 512) => {
  const SQsize = size / 10; // size of each grid square
  const offset = SQsize / 10; // small offset for lines and shapes

  /**
   * draws a diagonal line from top-left to bottom-right of a square, with additional embellishments.
   *
   * @param {number} x - x-coordinate of the square's top-left corner.
   * @param {number} y - y-coordinate of the square's top-left corner.
   * @param {number} size - size of the square.
   * @param {array} colors - array of colors for lines and shapes.
   */
  function diag(x, y, size, colors) {
    p.stroke(colors[0]);
    p.line(x, y, x + size, y + size);

    p.stroke(colors[2]);
    p.strokeWeight(2);
    p.line(x + offset, y + offset, x + size - offset, y + size - offset);

    p.strokeWeight(10);
    p.stroke(colors[4]);
    p.noFill();
    p.square(x, y, size);

    if (p.random(0, 1) > 0.5) addTriangle(x, y, size, colors);
  }

  /**
   * draws a diagonal line from top-right to bottom-left of a square, with additional embellishments.
   *
   * @param {number} x - x-coordinate of the square's top-left corner.
   * @param {number} y - y-coordinate of the square's top-left corner.
   * @param {number} size - size of the square.
   * @param {array} colors - array of colors for lines and shapes.
   */
  function diag2(x, y, size, colors) {
    p.stroke(colors[1]);
    p.line(x + size, y, x, y + size);

    p.stroke(colors[3]);
    p.strokeWeight(2);
    p.line(x + size - offset, y + offset, x + offset, y + size - offset);

    p.strokeWeight(10);
    p.stroke(colors[4]);
    p.noFill();
    p.square(x, y, size);

    if (p.random(0, 1) > 0.5) addTriangle2(x, y, size, colors);
  }

  /**
   * adds a triangle to the square as an additional decoration.
   *
   * @param {number} x - x-coordinate of the square's top-left corner.
   * @param {number} y - y-coordinate of the square's top-left corner.
   * @param {number} size - size of the square.
   * @param {array} colors - array of colors for the triangle.
   */
  function addTriangle(x, y, size, colors) {
    p.stroke(colors[3]);
    p.strokeWeight(5);
    if (p.random(0, 1) > 0.5) {
      p.triangle(
        x + size - offset,
        y + offset,
        x + size - offset,
        y + size - 3 * offset,
        x + 3 * offset,
        y + offset
      );
    } else {
      p.triangle(
        x + offset,
        y + 3 * offset,
        x + offset,
        y + size - offset,
        x + size - 3 * offset,
        y + size - offset
      );
    }
    p.strokeWeight(10);
  }

  /**
   * adds an alternate triangle pattern to the square.
   *
   * @param {number} x - x-coordinate of the square's top-left corner.
   * @param {number} y - y-coordinate of the square's top-left corner.
   * @param {number} size - size of the square.
   * @param {array} colors - array of colors for the triangle.
   */
  function addTriangle2(x, y, size, colors) {
    p.stroke(colors[1]);
    p.strokeWeight(5);
    if (p.random(0, 1) > 0.5) {
      p.triangle(
        x + offset,
        y + size - 3 * offset,
        x + offset,
        y + offset,
        x + size - 3 * offset,
        y + offset
      );
    } else {
      p.triangle(
        x + size - offset,
        y + 3 * offset,
        x + size - offset,
        y + size - offset,
        x + 3 * offset,
        y + size - offset
      );
    }
    p.strokeWeight(10);
  }

  // setup initializes the canvas and properties
  p.setup = function () {
    const canvas = p.createCanvas(size, size);
    if (p._userNode) {
      canvas.parent(p._userNode); // attach to parent node
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);
    p.noLoop();
    p.strokeCap(p.SQUARE);
  };

  // draw renders the diagonal patterns
  p.draw = () => {
    const colors =
      processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // fallback color
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];
    const randgen = pRandom(pixdata); // random generator initialization
    p.background(colors[4]);

    p.strokeWeight(10);
    for (let x = p.width; x > 0 - SQsize; x -= SQsize) {
      for (let y = p.height; y > 0 - SQsize; y -= SQsize) {
        const val = randgen.next().value;
        if (val > 128) {
          diag(x, y, SQsize, colors);
        } else {
          diag2(x, y, SQsize, colors);
        }
      }
    }

    p.noLoop();
  };
};
