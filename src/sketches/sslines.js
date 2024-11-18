/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/

export const Sslines = (p,processedImageData) => {
  const size = 800;
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

  function drawsin(x,y,colors){
    p.push();
    p.translate(x,y);
    /*
    if(y < p.height/4){
      p.stroke(colors[0]);;
    } else {
      p.stroke(colors[1]);
    }
    */

    p.beginShape();
    for(let i = 0; i < p.width; i++){
      let c = 50;
      let j = c*p.sin(i);
      p.vertex(i,j);
      
    }
    p.endShape(p.CLOSE);
    p.pop();
  }

  function* processData(pixdata){
      //make a generator or iterator?
      
      let length = pixdata.length;
      //index = index % length;
      //console.log(`index: ${index}`);
      while(true){
        for(let i = 0; i < length;i++){
          for(let j = 0; j < 4;j++){
            yield parseInt(pixdata[i][j]);
          }

        }
      }  //yield pixdata[index];
    }


    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = processData(pixdata); //generator init
    p.background(colors[4]);
    console.log(`Running Sslines pattern with ${colors[0]} and ${colors[1]}`);
    console.log(pixdata);
    let wnum = 100;
    p.noFill();
    for(let i = 0; i < wnum*20; i+=20){
      if(i < p.height/4){
        p.stroke(colors[0]);
      } else if (p.height/4 < i < p.height/2) {
        p.stroke(colors[1]);
      } else if (p.height/2 < i < 3*(p.height)/4) {
        p.stroke(colors[3]);
      } else {
        p.stroke(colors[4]);
      }
      drawsin(0,i,colors);
    }



    p.noLoop();
  }
};



