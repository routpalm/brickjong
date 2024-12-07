/**
 * tunnel.js
 * 
 * Author: Jordan Poppe
 * Nov. 25 2024
 * 
 * Purpose: Defines Tunnel algorithm in image generator
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
//import pseudorandom image generator
import { pRandom } from "./pRandom.js";
/**
 * Generates a sketch with circular shapes, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */

export const Tunnel = (p,processedImageData, size = 512) => {
  //p5 setup function
  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    p.angleMode(p.DEGREES);
    
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
  //draw function executes tunnel algorithm
  p.draw = () => {
  /**
   * DrawStar: draws 7 circles in a star formation
   * x,y (number) position to center shape at
   * size (number) diameter of circle group
   * 
   */
  function DrawStar(x,y,size){
    p.push();
    p.translate(x,y);//move origin to x,y
    for(let i = 0; i < 7; i++){ //loop 7 times
      p.circle(x,y+(size/4),size/5);
      p.rotate(360/7);    //rotate 360/7 degrees after making circle
    }
    p.noFill();//hollow outer circle

    p.circle(x,y,size);
    p.pop();
  }




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    

  p.background(colors[5]);//set color
  p.translate(p.width/2,p.height/2);//move origin from upper left to center of canvas
  for(let j = 0; j < p.height*80; j+=80){ 
    let c = randgen.next().value % 5; //pick color at random
    p.fill(colors[c]);
    p.stroke(colors[c]);//change color

    DrawStar(0,0,j);//tunnnel pattern
  }
  


    
  }
};



