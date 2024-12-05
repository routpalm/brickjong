import { pRandom } from "./pRandom.js";
export const TruchetRound = (p,processedImageData, size = 512) => {
  const SQsize = size/10;

  p.setup = () => {
    const canvas = p.createCanvas(size, size);
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

  p.draw = () => {

    p.background(220); // white background




    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
      const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
      const randgen = pRandom(pixdata); //generator init

          function roundTruch1b(x,y,size){
          p.fill(colors[0]);
          p.noStroke();
          let halfX = x + size/2
          let halfY = y + size/2
          p.square(x,y,size);
          p.stroke(colors[1]);
          p.strokeWeight(size/3)
          p.arc(x+size,y+size,size,size,p.PI,p.PI+p.HALF_PI);
          p.arc(x,y,size,size,2*p.PI,p.HALF_PI);
          
          p.noFill();
          p.stroke(colors[2]);
          p.strokeWeight(size/20)
          p.arc(x+size,y+size,size,size,p.PI,p.PI+p.HALF_PI);
          p.arc(x,y,size,size,2*p.PI,p.HALF_PI);
          
        }


        function roundTruch2b(x,y,size){
          p.fill(colors[0]);
          p.noStroke();
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


      for (let x = p.width; x > 0-SQsize; x -= SQsize){
        for(let y = p.height; y > 0-SQsize; y -= SQsize){
          let val = randgen.next().value;
          if (val > 128){
            roundTruch1b(x,y,SQsize);        
          
          } else {
            roundTruch2b(x,y,SQsize)
          }
      
        }
      }

      p.noLoop();
    }
  };

