/*
0. Vibrant
1. Light Vibrant
2. Dark Vibrant
3. Muted
4. Light Muted
5. Dark Muted
*/

export const Squigs = (p,processedImageData) => {
  const size = 512;
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
    console.log(`Running Squigs pattern with ${colors[0]} and ${colors[1]}`);
    console.log(pixdata);




    p.noLoop();
  }
};


/*function setup() {
  createCanvas(400, 400);
  translate(width/2,height/2);
  angleMode(DEGREES);
}

function squigs(x,y,colors){
  fill("blue");
  //let c = 50
  
  for(let j = 0; j < 10; j++){
    beginShape();
    let b = j * 10;
    for(let i = 0;  i < 360; i++){
      let u = sin(x*b);
      let v = cos(y*b);
      vertex(u,v);
    }
  }
  endShape(CLOSE);
}

function draw() {
  background(220);
  translate(width/2,height/2);
  squigs(0,0);
} */
