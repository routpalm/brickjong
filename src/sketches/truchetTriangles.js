/**
 * truchetTriangles.js
 * 
 * Author: Jordan Poppe
 * Nov. 8 2024
 * 
 * Purpose: Defines Round Truchet algorithm in algoritm generator
 * https://en.wikipedia.org/wiki/Truchet_tiles
 * 
 * Part of image generator
 * 
 */ 

//import psuedorandom module
import { pRandom } from "./pRandom.js";
//generates a sketch with truchet tiles that featue curved details
/**
 * Generates a sketch with diagonal lines and shapes, using colors and patterns derived from processed image data.
 *
 * @param {object} p - p5.js instance for the sketch.
 * @param {object} processedImageData - Contains image-derived data such as color palette and pixel clusters.
 * @param {number} [size=512] - The canvas size in pixels (default is 512x512).
 */
export const TruchetRound = (p,processedImageData, size = 512) => {
  const SQsize = size/10;//tile size
//p5 setup function initializes canvas and other properties
  p.setup = () => {
    const canvas = p.createCanvas(size, size);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);
    p.noLoop();//don't loop sketch
    p.strokeCap(p.SQUARE);

    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {

      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };
  //p5 draw function executes truchet tile algorithm
  p.draw = () => {

    p.background(220); // white background




    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette or pixelcluster is missing
      const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
      const randgen = pRandom(pixdata); //generator init

          /**
           * roundTruch1b: Draws a truchet tile with a curved pattern on it
           * x,y (number): starting position of tile 
           * size (number): side length of tile
           * 
           */
          function roundTruch1b(x,y,size){
          p.fill(colors[0]);//set color
          p.noStroke();
          let halfX = x + size/2//halfway points
          let halfY = y + size/2
          p.square(x,y,size); //tile background
          p.stroke(colors[1]);
          p.strokeWeight(size/3)
          p.arc(x+size,y+size,size,size,p.PI,p.PI+p.HALF_PI);//draw arcs
          p.arc(x,y,size,size,2*p.PI,p.HALF_PI);
          
          p.noFill();
          p.stroke(colors[2]);//change color and size and draw the arcs again
          p.strokeWeight(size/20)
          p.arc(x+size,y+size,size,size,p.PI,p.PI+p.HALF_PI);
          p.arc(x,y,size,size,2*p.PI,p.HALF_PI);
          
        }

        //define alternate tile
        function roundTruch2b(x,y,size){
          p.fill(colors[0]);
          p.noStroke();//same as above function
          let halfX = x + size/2
          let halfY = y + size/2
          p.square(x,y,size);
          p.stroke(colors[1]);
          p.strokeWeight(size/3)
          p.arc(x+size,y,size,size,p.HALF_PI,p.PI);
          p.arc(x,y+size,size,size,p.PI+p.HALF_PI,2*p.PI);  
          p.noFill();
          p.stroke(colors[2]);
          p.strokeWeight(size/20)
          p.arc(x+size,y,size,size,p.HALF_PI,p.PI);
          p.arc(x,y+size,size,size,p.PI+p.HALF_PI,2*p.PI);  
          
        }

        //place tiles in rows and cols
      for (let x = p.width; x > 0-SQsize; x -= SQsize){
        for(let y = p.height; y > 0-SQsize; y -= SQsize){
          let val = randgen.next().value+randgen.next().value;
          //use average of two values
          if (val/2 > (128){
            roundTruch1b(x,y,SQsize);        
          
          } else {
            roundTruch2b(x,y,SQsize)
          }
      
        }
      }
      //don't redraw 
      p.noLoop();
    }
  };

