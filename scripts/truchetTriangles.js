size = 50;
canWidth = 800;
canHeight= 800;

function randColor(a, b){//returns 3-tuple of value a-b
  return [Math.round(random(a,b)),Math.round(random(a,b)),Math.round(random(a,b))] 
}

function complement(color1){
  
  return [255 - color1[0], 255 - color1[1], 255 - color1[2]] 
}

function roundTruch1a(x,y,size){
  fill(color1);
  noStroke();
  halfX = x + size/2
  halfY = y + size/2
  square(x,y,size);
  stroke(color2);
  strokeWeight(3)
  arc(x+size,y+size,size,size,PI,PI+HALF_PI);
  arc(x,y,size,size,2*PI,HALF_PI);
  //arc(x+size,y,size-3,size-3,HALF_PI,PI);
  //arc(x,y+size,size-3,size-3,PI+HALF_PI,2*PI);  
}


function roundTruch2a(x,y,size){
  fill(color1);
  noStroke();
  halfX = x + size/2
  halfY = y + size/2
  square(x,y,size);
  stroke(color2);
  strokeWeight(3)
  arc(x+size,y,size,size,HALF_PI,PI);
  arc(x,y+size,size,size,PI+HALF_PI,2*PI);  
}

function roundTruch1b(x,y,size){
  fill(color1);
  noStroke();
  halfX = x + size/2
  halfY = y + size/2
  square(x,y,size);
  stroke(color2);
  strokeWeight(size/3)
  arc(x+size,y+size,size,size,PI,PI+HALF_PI);
  arc(x,y,size,size,2*PI,HALF_PI);
  
  noFill();
  stroke("white");
  strokeWeight(size/20)
  arc(x+size,y+size,size,size,PI,PI+HALF_PI);
  arc(x,y,size,size,2*PI,HALF_PI);
}


function roundTruch2b(x,y,size){
  fill(color1);
  noStroke();
  halfX = x + size/2
  halfY = y + size/2
  square(x,y,size);
  stroke(color2);
  strokeWeight(size/3)
  arc(x+size,y,size,size,HALF_PI,PI);
  arc(x,y+size,size,size,PI+HALF_PI,2*PI);  
  noFill();
  stroke("white");
  strokeWeight(size/20)
  arc(x+size,y,size,size,HALF_PI,PI);
  arc(x,y+size,size,size,PI+HALF_PI,2*PI);  

}


function setup(){
  createCanvas(windowWidth,windowHeight);
  color1 = randColor(0,255);
  color2 = complement(color1);
  strokeCap(SQUARE)
for (x = width; x > 0-size; x -= size){
    for(y = height; y > 0-size; y -= size){
      val = random();
      if (val > .5){
          roundTruch1b(x,y,size);        
          
          } else {
            roundTruch2b(x,y,size)
          }
      
    }
  }
}


//old code ^^
//------------------------------------
//converted code vv

/*
  If the canvas can be redrawn by multipla p5 scripts, each script needs to be in instance mode, to avoid errors.
*/

function TruchetRound(p) {
  let size = 800;
  let numlines = 8;

  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();

    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      console.log("'imageProcessed' event received in TruchetRound.");
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = function() {
    p.background(220); // white background

    if (window.processedImageData) {
      // color palette 
      const palette = window.processedImageData.colorPalette;
      const colors = Object.values(palette).filter(color => color);

      // draw lines with colors from the palette
      for (let i = 0; i < numlines; i++) {
        let chosenColor = p.color(p.random(colors));
        p.stroke(chosenColor);
        p.line(p.random(p.width), p.random(p.height), p.random(p.width), p.random(p.height));
        console.log(`Drawing line ${i+1} with color ${chosenColor}`);
      }

      p.noLoop();
    }
  };
}
