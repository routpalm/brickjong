/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/

export const Tunnel = (p,processedImageData, size = 512) => {
  const SQsize = size/10;
  const offset = SQsize/10;
  p.setup = function() {
    let canvas = p.createCanvas(size, size);
    p.angleMode(p.DEGREES);
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
    console.log("loaded2");
    //p.background(220); // white background

  function* processData(pixdata){
    
    let length = pixdata.length;
    while(true){
      for(let i = 0; i < length;i++){
        for(let j = 0; j < 4;j++){
          yield parseInt(pixdata[i][j]);
        }

      }
    }
  }

    
  function DrawStar(x,y,size){
    p.push();
    p.translate(x,y);
    for(let i = 0; i < 7; i++){
      p.circle(x,y+(size/4),size/5);
      p.rotate(360/7);    
    }
    p.noFill();

    p.circle(x,y,size);
    p.pop();
  }




    
      // color palette 
    const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)"]; // Fallback to black if colorPalette is missing
    const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
    const randgen = processData(pixdata); //generator init
    
    console.log(`Running Noisy pattern with ${colors[0]} and ${colors[1]}`);
  p.background(colors[5]);
  p.translate(p.width/2,p.height/2);
  for(let j = 0; j < p.height*80; j+=80){
    let c = randgen.next().value % 5; 
    p.fill(colors[c]);
    p.stroke(colors[c]);
    //console.log(c);
    //console.log(pixdata);
    DrawStar(0,0,j);
  }
  
  //p.cirlce(50,50,50)

    
  }
};



