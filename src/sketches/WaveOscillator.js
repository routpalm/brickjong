/**
 * WaveOscillator.js
 * 
 * Author: Nick Anthony
 * Oct. 30 2024
 * 
 * Purpose: Defines Waves algorithm in algoritm generator
 * 
 * 
 * Part of image generator
 * 
 */ 

//import psuedorandom module
import { pRandom } from "./pRandom.js";

/**
 * Generates a sketch with waves, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const WaveOscillator = (p, processedImageData, canvasSize=512) => {
  let angleOffset = 0;//initial parameters
  const numShapes = 15;
  const baseWaveRadius = canvasSize / 2 - 20; // Adjusted for canvas size
  let colorOffset = 0;
  //p5 setup function initializes canvas and parameters
  p.setup = () => {
    const canvas = p.createCanvas(canvasSize, canvasSize);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.angleMode(p.DEGREES);//additional paramters
    p.noFill();

    if (processedImageData && processedImageData.colorPalette) {
      initializeParameters(processedImageData);//wait for image to be processed
    }
  };
  //p5 draw function executes waves pattern
  p.draw = () => {
    p.background(15, 15, 35, 25);//set background
    p.translate(p.width / 2, p.height / 2);//move origin to middle of image
    colorOffset += 0.3;

    const colors = processedImageData?.colorPalette || ["rgb(255, 255, 255)"]; // Fallback to white

    for (let i = 0; i < numShapes; i++) {//loop through shapes and draw
      const strokeColor = colors[Math.floor(Math.random() * colors.length)];
      p.stroke(strokeColor);//set color

      p.beginShape();//being wave shape
      for (let angle = 0; angle < 360; angle += 5) {
        const offset = p.map(//loop through 360 degrees
          p.sin(angle * 2 + p.frameCount * 1.5 + i * 20),
          -1,
          1,
          -30,
          30
        );
        const x = (baseWaveRadius + offset) * p.cos(angle + angleOffset);
        const y = (baseWaveRadius + offset) * p.sin(angle + angleOffset);
        p.vertex(x, y);//x = cos y = sin
      }
      p.endShape(p.CLOSE);//close shape
    }

    angleOffset += 0.4; // Add rotation over time
  };

  function initializeParameters(data) {
    const { exifData } = data;
    if (exifData && exifData.dateTime) {
      // Set parameters based on EXIF data, if needed
    }
  }
};
