/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/
import { pRandom } from "./pRandom.js";
export const Noisy2 = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;
  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();
    p.strokeCap(p.SQUARE);
    //console.log("loaded");
    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      console.log("'imageProcessed' event received in Sslines.");
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = () => {
    //console.log("loaded2");
    //p.background(220); // white background


    
  function npoint(x,y,colors){
    let n = 5 * p.noise(x/1,y/1);
    n = Math.floor(n);
    //console.log(n);
    //console.log(`x: ${x} y: ${y}`);
    p.fill(colors[n]);
    p.square(x,y,10);
  }




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    
    console.log(`Running Noisy pattern with ${colors[0]} and ${colors[1]}`);
   
  p.noiseSeed(randgen.next().value);    
  //p.strokeWeight(1);

  let h = randgen.next().value;
  for(let i = 0; i < p.width; i+=h){
    for(let j = 0; j < p.height; j+=h){
      npoint(i,j,colors);
      h = (randgen.next().value * randgen.next().value)/1000;

    }
  }

  

    
  }
};



