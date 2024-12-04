export function* pRandom(pixdata){
    
    let length = pixdata.length;
    while(true){
      for(let i = 0; i < length;i++){
        for(let j = 0; j < 4;j++){
          yield parseInt(pixdata[i][j]);
        }
      }
    }
  }
