/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/
import { pRandom } from "./pRandom.js";
export const Squigs = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;
  p.setup = function() {
    let canvas = p.createCanvas(size, size,p.WEBGL);
    p.angleMode(p.DEGREES);
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
    //console.log("loaded2");
    //p.background(220); // white background

    function sircle(x,y,size,colors) {
      p.beginShape();
      for(let i = 0; i < 360; i++){
        //let b = i * size;
        /*
        let u = p.cos(i*size);
        let v = p.sin(i*size);
        let z = p.sin(i*size);
        /*/
        let u = size * p.cos(i);
        let v = size * p.sin(i);
        //let z = size/5 * p.sin(i*2);
        //let z = (size + (360-i)) * p.sin(i*randgen.next().value%5);//p.stroke(colors[randgen.next().value%5]);
        let z = size * p.sin((360-i)*randgen.next().value%5);//p.stroke(colors[randgen.next().value%5]);
        p.vertex(u,v,z);
        //p.vertex(u,v);
      }
      p.endShape(p.CLOSE);
    }



 



      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = pRandom(pixdata); //generator init
    p.background(colors[5]);

    //p.translate(p.width/2,p.height/2);
    p.noFill();
    

    p.rotateX(60);
    let MaxDiameter = p.width/2;
    let spacing = 36; //multiple of 360
    for(let i = 0; i < MaxDiameter; i+=spacing){
      p.stroke(colors[randgen.next().value%5]);
      p.strokeWeight(randgen.next().value%8);
      sircle(0,0,i,colors);
      
    }

    p.noLoop();
  }
};
