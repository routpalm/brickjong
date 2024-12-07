/**
 * noise1.js
 * 
 * Author: Jordan Poppe
 * Nov. 25 2024
 * 
 * Purpose: Defines Noise algorithm in algoritm generator
 * 
 * 
 * Part of image generator
 * 
 */ 



/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/
//import psuedorandom module
import { pRandom } from "./pRandom.js";
/**
 * Generates a sketch with p5 noise, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const Noisy = (p,processedImageData, size = 512) => {

  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);
    p.noLoop();
    p.strokeCap(p.SQUARE);

    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

//p5 draw function executes algorithm

  p.draw = () => {



    /**
     * npoint: draws a point with color set based on noise
     * Parameters:
     * x,y: (int) position on canvas to draw point
     * colors: array of colors in rgb[] format
     */
  function npoint(x,y,colors){
    let n = 5 * p.noise(x/100,y/100); //get noise value
    n = Math.floor(n);//make n an integer 
    p.stroke(colors[n]);//pick color based on noise value
    p.point(x,y); //draw colored point at x,y
  }




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing for color pallete and pixdata
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    

   //set noise seed with image data so that p.noise is deterministic
  p.noiseSeed(randgen.next().value);    

  for(let i = 0; i < p.width; i++){
    for(let j = 0; j < p.height; j++){//draw point pixel by pixel
      npoint(i,j,colors);

    }
  }

  

    
  }
};



