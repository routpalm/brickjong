export function* pRandom(pixdata) {
  // If pixdata is a string, parse it first
  const data = typeof pixdata === 'string' ? JSON.parse(pixdata) : pixdata;
  
  let length = data.length;
  while(true) {
    for(let i = 0; i < length; i++) {
      // Ensure we're accessing a valid array element
      if (Array.isArray(data[i])) {
        for(let j = 0; j < data[i].length; j++) {
          yield parseInt(data[i][j]);
        }
      }
    }
  }
}