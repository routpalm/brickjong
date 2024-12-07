/**
 * lines.js
 * ********* This algorithm is unused in our final project ***************
 * Author: Nick Anthony
 * Oct. 30 2024
 * 
 * Purpose: Defines lines algorithm in algoritm generator
 * 
 * 
 * Part of image generator
 * 
 */ 

//import psuedorandom module
import { pRandom } from "./pRandom.js";

/**
 * Generates a sketch with lines, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const LinesSketch = (p, processedImageData) => {
    const size = 512;
    const numlines = 8;//parameters for image generation
  
    p.setup = () => {
      const canvas = p.createCanvas(size, size);
      if (p._userNode) {
        canvas.parent(p._userNode); // Ensure correct parent
      } else {
        console.error("No parent node found for the canvas.");
      }
      p.colorMode(p.RGB, 255, 255, 255); // Set color mode to RGB
      p.noLoop();
  
      if (processedImageData && processedImageData.colorPalette) {
        p.redraw();
      }
    };
  
    p.draw = () => {
      p.background(220); // white background
  
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
  
      for (let i = 0; i < numlines; i++) {
        const chosenColor = colors[Math.floor(Math.random() * colors.length)];
        p.stroke(chosenColor);
        p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
        console.log(`Drawing line ${i + 1} with color ${chosenColor}`);
      }
  
      p.noLoop();
    };
  };
  