/**
 * squigs.js
 * 
 * Author: Jordan Poppe
 * Nov. 18 2024
 * 
 * Purpose: Defines squigs algorithm in image generator
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
export const Squigs = (p,processedImageData, size = 512) => {
  //p5 setup function
  p.setup = function() {
    let canvas = p.createCanvas(size, size,p.WEBGL);
    p.angleMode(p.DEGREES);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);//canvas parameters
    p.noLoop();
    p.strokeCap(p.SQUARE);
    document.addEventListener("imageProcessed", function() {
      
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };
  //p5 draw function executes squigs pattern
  p.draw = () => {
    /**
     * sircle: draws a circle in 3d space with random perturbatioins to z dimension
     * x,y (number) position to center circle at
     * size (number) diameter of sircle
     * colors array[][] array of colors from pixel data. rgba format
     */
    function sircle(x,y,size,colors) {
      p.beginShape();//begin circular shape
      for(let i = 0; i < 360; i++){//loop over all 360 degrees
        let u = size * p.cos(i);//u = x and v = y
        let v = size * p.sin(i);
        let z = size * p.sin((360-i)*randgen.next().value%5);//z offset by pseduorandom value
        p.vertex(u,v,z);//make point at x y z coordinates
        
      }
      p.endShape(p.CLOSE); //end shape and close end to beginning
    }



 



      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    p.background(colors[5]);

    //set background and shapes to hollow
    p.noFill();
    

    p.rotateX(60);//rotate camera 60 degrees in x axis
    let MaxDiameter = p.width/2;//max diaeter of a cirlce is half the image width
    let spacing = 36; //multiple of 360, space between circles
    for(let i = 0; i < MaxDiameter; i+=spacing){//place circles within max diameter
      p.stroke(colors[randgen.next().value%5]);
      p.strokeWeight(randgen.next().value%8);//set random color and line thickness
      sircle(0,0,i,colors);
      
    }

    p.noLoop();//do not redraw
  }
};
