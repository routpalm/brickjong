
/**
 * diags.js
 * 
 * Author: Jordan Poppe
 * Nov. 14 2024
 * 
 * Purpose: Defines Diagonals algorithm in image generator
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
 * Generates a sketch with diagonal lines and shapes, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const Diagonals = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;//variables for shape sizes


  /**
   * diag: draws a tile with a diagonal line and perhaps a shape
   * x,y (number) coordiantes to start shape at
   * size (number) size of tile to draw
   * colors: array of colors in rgb form
   * 
   */
  function diag(x,y,size,colors){
    //top left to bottom right of square
    p.stroke(colors[0]);
    
    p.line(x,y,x+size,y+size);//draw diagonal line

    p.stroke(colors[2]);
    p.strokeWeight(2);
    p.line(x+offset,y+offset,x+size-offset,y+size-offset);//draw inner line
    p.strokeWeight(10);
    p.stroke(colors[4]);
    p.noFill();
    p.square(x,y,size);
    let val = randgen.next().value + randgen.next().value;

    if(val/2 >128){addTriangle2(x,y,size,colors)};
  }
  /**
   * diag2: draws alternate tile with a diagonal line and perhaps a shape
   * x,y (number) coordiantes to start shape at
   * size (number) size of tile to draw
   * colors: array of colors in rgb form
   * 
   */
  function diag2(x,y,size,colors){
    //top right to bottom left of square

    p.stroke(colors[1]);
    p.line(x + size, y, x, y + size);

    p.stroke(colors[3]);
    p.strokeWeight(2);
    p.line(x + size - offset, y + offset, x + offset, y + size - offset);

    p.strokeWeight(10);
    p.stroke(colors[4]);
    p.noFill();
    p.square(x,y,size);
    let val = randgen.next().value + randgen.next().value;

    if(val/2 >128){addTriangle2(x,y,size,colors)};


    if (p.random(0, 1) > 0.5) addTriangle2(x, y, size, colors);
  }

    /**
   * addTriangle: draws a triangle
   * x,y (number) coordiantes to start shape at
   * size (number) size of tile to draw
   * colors: array of colors in rgb form
   * 
   */
  function addTriangle(x,y,size,colors){
    p.stroke(colors[3]);
    p.strokeWeight(5);
    let val = randgen.next().value + randgen.next().value;

    if(val/2 >128){
      p.triangle(x+size-(1*offset),y+(1*offset),x+size-(1*offset),y+size-(3*offset),x+(3*offset),y+(1*offset));

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
   * addTriangle2: draws alternate triangle
   * x,y (number) coordiantes to start shape at
   * size (number) size of tile to draw
   * colors: array of colors in rgb form
   * 
   */
  function addTriangle2(x,y,size,colors){

    p.stroke(colors[1]);
    p.strokeWeight(5);
    let val = randgen.next().value + randgen.next().value;
    if (val/2 > 128) {
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
  //draw function executes diagonals algorithm
  p.draw = () => {

    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    //fallback to black if pixelcluster is missing
    const randgen = pRandom(pixdata); //generator init
    p.background(colors[4]);//set background


    p.strokeWeight(10);//set draw thickness
    for (let x = p.width; x > 0-SQsize; x -= SQsize){
      for(let y = p.height; y > 0-SQsize; y -= SQsize){
        let val = randgen.next().value + randgen.next().value;//loop over row and cols by tile size
        if (val/2 > 128){
          diag(x,y,SQsize,colors);        //if pseudorandom value is a certain
          

        } else {
          diag2(x, y, SQsize, colors);
        }
      }
    }

    p.noLoop();
  };
};
