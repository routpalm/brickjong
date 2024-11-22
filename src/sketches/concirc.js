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
    let numcirc = p.random(10,20);



    
      // color palette 
      const colors = processedImageData?.colorPalette || ["rgb(0, 0, 0)","rgb(255,255,255)","rgb(0, 0, 0)","rgb(255,255,255)"]; // Fallback to black if colorPalette is missing
      p.background(colors[4]);
      console.log(`Running Concentric Circle pattern with ${colors[0]} and ${colors[1]}`);
      console.log(numcirc);
      for (let j = 0; j < numcirc; j++){
    
        let randX = p.random(50,size-50);
        let randY = p.random(50,size-50);
        let randDia = p.random(100,350);
        concirc(randDia,randX,randY,[colors[0],colors[1]]);
        console.log("circle drawn");
      }
      for (let j = 0; j < numcirc; j++){
    
        let randX = p.random(50,size-50);
        let randY = p.random(50,size-50);
        let randDia = p.random(100,350);
        concirc(randDia,randX,randY,[colors[2]+[j,j,j],colors[3]]);
        console.log("circle drawn");
      }    


      //---------
      p.noLoop();
    }
  };




//--------------
/*

  





function circpoints(x,y,r,t){
  //returns points traced around circle
  xp = floor(sin(t)*r);
  yp = floor(cos(t)*r);
  return [xp,yp];
  
}

function draw() {
  //translate(windowWidth/2,windowHeight/2);
  background(220);
  colors = [color(50,190,150),color(190,50,50)]
  colors2 = [color(120,0,120),color(100,100,100)]
  numcirc = randint(5,15);
  for (j = 0; j < numcirc; j++){
    
    randX = randint(50,350);
    randY = randint(50,350);
    randDia = randint(50,150);
    concirc(randDia,randX,randY,colors);
    }
  for (j = 0; j < numcirc; j++){
    
    randX = randint(50,350);
    randY = randint(50,350);
    randDia = randint(50,150);
    concirc(randDia,randX,randY,colors2);
    }    
  
    for(k = 0; k < 1; k++){
    points = circpoints(0,0,150,k);
    console.log(points)
    point(points);
    //console.log(j,circpoints(randX,randY,randDia/2,j));
  }
  noLoop();
}
*/