import { pRandom } from "./pRandom.js";
export const ConCirc = (p,processedImageData, size = 512) => {
  //const SQsize = size/10;

  p.setup = () => {
    const canvas = p.createCanvas(size, size);
    console.log(`Canvas created with size: ${size}x${size}`);
    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.HSB, 360, 100, 100);
    p.noLoop();
    //p.strokeCap(p.SQUARE);
    //console.log("loaded");
    // listen for imageProcessed event to proceed
  };


  function concirc(num,x,y,colors){
  
  for(let i = 0; i < num; i++){
    if(i%10 < 5){
      p.stroke(colors[0]);
    } else {
      p.stroke(colors[1]);
    
    }
    p.circle(x,y,num-i);
    }
  }

  p.draw = () => {
    //console.log("loaded2");
    p.background(220); // white background
    



    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)","rgb(255,255,255)","rgb(0, 0, 0)","rgb(255,255,255)"]; // Fallback to black if colorPalette is missing
      const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
      const randgen = pRandom(pixdata); //generator init
      let numcirc = (randgen.next().value + 10) % 20;
      p.background(colors[4]);
      console.log(`Running Concentric Circle pattern with ${colors[0]} and ${colors[1]}`);
      console.log(numcirc);
      for (let j = 0; j < numcirc; j++){
        let u = randgen.next().value;
        let v = randgen.next().value;
        let randX = (u*v)%(size);
        let randY = (randX*v)%(size);
        let randDia = (u*randY)%350;
        concirc(randDia,randX,randY,[colors[0],colors[1]]);
        console.log("circle drawn");
      }
      for (let j = 0; j < numcirc; j++){
    
        let a = randgen.next().value;
        let b = randgen.next().value;
        let randX = (a*a)%(size);
        let randY = (randX*b)%(size);
        let randDia = (a*randY)%350;
        concirc(randDia,randX,randY,[colors[2]+[j,j,j],colors[3]]);
        console.log("circle drawn");
      }    


      //---------
      p.noLoop();
    }
  };


