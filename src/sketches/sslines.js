/**
 * sslines.js
 * 
 * Author: Jordan Poppe
 * Nov. 8 2024
 * 
 * Purpose: Defines Overlapping Sines algorithm in algoritm generator
 * 
 * 
 * Part of image generator
 * 
 */ 

//import psuedorandom module
import { pRandom } from "./pRandom.js";

/**
 * Generates a sketch with sinusoidal, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const Sslines = (p,processedImageData, size = 512) => {
//p5 setup function initialized canvas and parameters
  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);//additonal parameters
    p.noLoop();
    p.strokeCap(p.SQUARE);
    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {

      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };
//p5 draw function executes overlapping sines algorithm
  p.draw = () => {

    /**
     * drawsin: draws a sin line across the image width
     * x,y (number) coordinates to start line from
     * colors array[][] array of rgb colors
     */

  function drawsin(x,y,colors){
    p.push();
    p.translate(x,y);//move origin to x,y


    p.beginShape();//begin shape
    for(let i = 0; i < p.width; i++){//loop across image width
      let c = 10;
      let j = c*p.sin(i);
      p.vertex(i,j*((randgen.next().value)/80));//point at each i with y being offset by sin
      
    }
    p.endShape();//leave shape open
    p.pop();
  }


    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette or pixelcluster is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    p.background(colors[4]);//set background
    let wnum = 100;//spacing between horizontal lines
    p.noFill();
    for(let i = 0; i < wnum*40; i+=40){//loop over image and draw sines across width
      
      let col = (randgen.next().value %5);//random color
      p.stroke(colors[col]);
      drawsin(0,i,colors);  //draw first set of lines
    }
    for(let i = 0; i < wnum*80;i+=80){
     let col = (randgen.next().value %5);//draw second set
      p.stroke(colors[col]);
      drawsin(p.width/col,i,colors);
    } 
    let c = randgen.next().value % 5
    if(c < 2) {
      p.fill(colors[5]);//generate circle as accent if c < 2
      p.circle(p.width/2 + 100*c,p.height/2 + 50*c,50*c);
      
      p.noFill();
    }
    



    p.noLoop();
  }
};



