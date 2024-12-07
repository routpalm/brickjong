/**
 * diags.js
 * 
 * Author: Jordan Poppe. Tong Guan
 * Nov. 26 2024
 * 
 * Purpose: Defines pseudorandom number in image generator
 * 
 * 
 * Part of image generator
 * 
 * 
 * pRandom: pseduorandom number generator using data extracted from image
 * Parameters:
 * pixdata: an array[][] of RGBA values
 */ 
export function* pRandom(pixdata) {
  // If pixdata is a string, parse it first
  const data = typeof pixdata === 'string' ? JSON.parse(pixdata) : pixdata;
  
  let length = data.length;//get length of array
  while(true) {//loop infinitely
    for(let i = 0; i < length; i++) {
      // Ensure we're accessing a valid array element
      if (Array.isArray(data[i])) {
        for(let j = 0; j < data[i].length; j++) {
          yield parseInt(data[i][j]);//yield number
        }
      }
    }
  }
}