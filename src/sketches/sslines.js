/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/
import { pRandom } from "./pRandom.js";
export const Sslines = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;
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
    //console.log("loaded");
    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {

      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = () => {

  function drawsin(x,y,colors){
    p.push();
    p.translate(x,y);


    p.beginShape();
    for(let i = 0; i < p.width; i++){
      let c = 10;
      let j = c*p.sin(i);
      p.vertex(i,j*((randgen.next().value)/80));
      
    }
    p.endShape();
    p.pop();
  }


    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    p.background(colors[4]);
    let wnum = 100;
    p.noFill();
    for(let i = 0; i < wnum*40; i+=40){
      
      let col = (randgen.next().value %5);
      p.stroke(colors[col]);
      drawsin(0,i,colors);
    }
    for(let i = 0; i < wnum*80;i+=80){
     let col = (randgen.next().value %5);
      p.stroke(colors[col]);
      drawsin(p.width/col,i,colors);
    } 
    let c = randgen.next().value % 5
    if(c < 2) {//not working atm
      p.fill(colors[5]);
      p.circle(p.width/2 + 100*c,p.height/2 + 50*c,50*c);
      //p.circle(50,50,50);
      p.noFill();
    }
    



    p.noLoop();
  }
};



