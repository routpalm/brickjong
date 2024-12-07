/**
 * noise2.js
 * 
 * Author: Jordan Poppe
 * Dec. 2 2024
 * 
 * Purpose: Defines Noise 2 algorithm in image generator
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

//import pseduorandom
import { pRandom } from "./pRandom.js";
/**
 * Generates a sketch with p5 noise, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const Noisy2 = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;
  //p5 setup function
  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);//canvas parameters
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
    let n = 5 * p.noise(x/1,y/1);//get noise value
    n = Math.floor(n);//set n tofloor

    p.fill(colors[n]); //set fill color
    p.square(x,y,10);//draw square of size 10 at x,y
  }




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    

  p.background(colors[5]);//set background color
  p.noiseSeed(randgen.next().value);    
  //set noise seed with image data so that p.noise is deterministic


  let h = randgen.next().value;//get prandom value
  for(let i = 0; i < p.width; i+=h){
    for(let j = 0; j < p.height; j+=h){//loop by random value
      npoint(i,j,colors); //draw colored point
      h = (randgen.next().value * randgen.next().value)/2000;//set next iteration value

    }
  }

  

    
  }
};



