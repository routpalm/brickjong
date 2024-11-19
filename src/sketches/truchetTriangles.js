export const TruchetRound = (p,processedImageData) => {
  const size = 800;
  const SQsize = size/10;

  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();
    p.strokeCap(p.SQUARE);
    //console.log("loaded");
    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      console.log("'imageProcessed' event received in TruchetRound.");
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = () => {
    //console.log("loaded2");
    p.background(220); // white background




    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
      console.log(`Running round Truchet pattern with ${colors[0]} and ${colors[1]}`);
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
          p.stroke("white");
          p.strokeWeight(size/20)
          p.arc(x+size,y+size,size,size,p.PI,p.PI+p.HALF_PI);
          p.arc(x,y,size,size,2*p.PI,p.HALF_PI);
          //console.log("roundTruch1b");
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
          p.stroke("white");
          p.strokeWeight(size/20)
          p.arc(x+size,y,size,size,p.HALF_PI,p.PI);
          p.arc(x,y+size,size,size,p.PI+p.HALF_PI,2*p.PI);  
          //console.log("roundTruch2b");
        }


      for (let x = p.width; x > 0-SQsize; x -= SQsize){
        for(let y = p.height; y > 0-SQsize; y -= SQsize){
          let val = p.random();
          if (val > .5){
            roundTruch1b(x,y,SQsize);        
          
          } else {
            roundTruch2b(x,y,SQsize)
          }
      
        }
      }

      p.noLoop();
    }
  };

