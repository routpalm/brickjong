/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/

export const Diagonals = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;

  function diag(x,y,size,colors){
    //top left to bottom right of square
    p.stroke(colors[0]);
    
    p.line(x,y,x+size,y+size);

    p.stroke(colors[2]);
    p.strokeWeight(2);
    p.line(x+offset,y+offset,x+size-offset,y+size-offset);
    p.strokeWeight(10);

    p.stroke(colors[4]);
    p.noFill();
    p.square(x,y,size);
    //p.square(x,y,x+size,y+size);
    
    if(p.random(0,1)>.5){addTriangle(x,y,size,colors)};
  }

  function diag2(x,y,size,colors){
    //top right to bottom left of square
    p.stroke(colors[1]);
    
    p.line(x+size,y,x,y+size);

    p.stroke(colors[3]);
    p.strokeWeight(2);
    p.line(x+size-offset,y+offset,x+offset,y+size-offset);
    p.strokeWeight(10);

    p.stroke(colors[4]);
    p.noFill();
    p.square(x,y,size);

    if(p.random(0,1)>.5){addTriangle2(x,y,size,colors)};//REMOVE ALL RANDOMS LATER

  }
  
  function addTriangle(x,y,size,colors){
    p.stroke(colors[3]);
    p.strokeWeight(5);
    if(p.random(0,1)>.5){
      p.triangle(x+size-(1*offset),y+(1*offset),x+size-(1*offset),y+size-(3*offset),x+(3*offset),y+(1*offset));
    } else {
      p.triangle(x+offset,y+(3*offset),x+offset,y+size-offset,x+size-(3*offset),y+size-offset);
    }
    p.strokeWeight(10);



  }

  function addTriangle2(x,y,size,colors){
    p.stroke(colors[1]);
    p.strokeWeight(5);
    if(p.random(0,1)>.5){
      p.triangle(x+(offset),y+size-(3*offset),x+offset,y+offset,x+size-(3*offset),y+offset);
    } else {
      p.triangle(x+size-offset,y+(3*offset),x+size-offset,y+size-offset,x+(3*offset),y+size-offset);
    }
    p.strokeWeight(10);
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

  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    canvas.parent('canvasContainer');
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();
    p.strokeCap(p.SQUARE);
    //console.log("loaded");
    // listen for imageProcessed event to proceed
    document.addEventListener("imageProcessed", function() {
      console.log("'imageProcessed' event received in Diagonals.");
      if (window.processedImageData) {
        p.redraw(); // draw
      }
    });
  };

  p.draw = () => {
    //console.log("loaded2");
    //p.background(220); // white background




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = processData(pixdata); //generator init
    p.background(colors[4]);
    console.log(`Running Diagonals pattern with ${colors[0]} and ${colors[1]}`);
    console.log(pixdata);

    p.strokeWeight(10);
    for (let x = p.width; x > 0-SQsize; x -= SQsize){
      for(let y = p.height; y > 0-SQsize; y -= SQsize){
        let val = p.random();
        if (val > .5){
          diag(x,y,SQsize,colors);
          console.log(`randgen: ${(randgen.next()).value}`);        
          
        } else {
          diag2(x,y,SQsize,colors)
        }
    
      }
    }

    p.noLoop();
  }
};



