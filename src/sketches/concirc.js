import { pRandom } from "./pRandom.js";
export const ConCirc = (p,processedImageData, size = 512) => {
  //const SQsize = size/10;

  p.setup = () => {
    const canvas = p.createCanvas(size, size);

    if (p._userNode) {
      canvas.parent(p._userNode); // Ensure correct parent
    } else {
      console.error("No parent node found for the canvas.");
    }
    p.colorMode(p.RGB);
    p.noLoop();

    // listen for imageProcessed event to proceed
    if (processedImageData && processedImageData.colorPalette) {
      p.redraw();
    }
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

    p.background(220); // white background


    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)","rgb(255,255,255)","rgb(0, 0, 0)","rgb(255,255,255)"]; // Fallback to black if colorPalette is missing
      const pixdata = processedImageData?.pixelCluster || ["rgb(0,0,0)"];    
      const randgen = pRandom(pixdata); //generator init
      let numcirc = (randgen.next().value + 10) % 20;
      p.background(colors[4]);


      for (let j = 0; j < numcirc; j++){
        let u = randgen.next().value;
        let v = randgen.next().value;
        let randX = (u*v)%(size);
        let randY = (randX*v)%(size);
        let randDia = (u*randY)%350;
        concirc(randDia,randX,randY,[colors[0],colors[1]]);

      }
      for (let j = 0; j < numcirc; j++){
    
        let a = randgen.next().value;
        let b = randgen.next().value;
        let randX = (a*a)%(size);
        let randY = (randX*b)%(size);
        let randDia = (a*randY)%350;
        concirc(randDia,randX,randY,[colors[2]+[j,j,j],colors[3]]);

      }    


      //---------
      p.noLoop();
    }
  };


