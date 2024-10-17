const fs = require('fs');
const exifReader = require('exifreader');
const sharp = require('sharp');
const vibrant = require('node-vibrant');


//file stuff
const filename = 'dumb.png'
const fb = fs.readFileSync(filename);

/* 
  parse exif data and convert to numerical values
*/

// extract
const tags = exifReader.load(fb, { expanded: true });

// to num
const exifToNum = {};

if (tags.gps) {
  exifToNum.latitude = tags.gps.Latitude;
  exifToNum.longitude = tags.gps.Longitude;
  console.log(`lat, long: ${exifToNum.latitude}, ${exifToNum.longitude}`);
}
if (tags.Make) {
  exifToNum.cameraMake = tags.Make.value.length; // Convert camera make to string length
  console.log(`camera make: ${exifToNum.cameraMake}`);
}
if (tags.DateTime) {
  const dateParts = tags.DateTime.value.split(':').join('').split(' ');
  exifToNum.dateTime = dateParts.map(Number); // e.g., [20231015, 123456]
  console.log(`datetime: ${exifToNum.dateTime}`);
}
console.log('EXIF Data:', exifToNum); // dump all data (just printin)

/*
  extract color palette
*/

let colorPalette = {};
vibrant.from(filename)
  .getPalette((err, palette) => {
    if (err) {
      console.error('err while extracting palette:', err);
      return;
    }

    console.log(`palette of ${filename}:`);

    for (const swatch in palette) {
      if (palette[swatch]) {
        const hex = palette[swatch].getHex();
        colorPalette[swatch] = hex;
        console.log(`${swatch}:`, hex);
      }
    }
  });
  
/* 
  extract pixel-related image data
*/
sharp(filename)
  .raw()
  .ensureAlpha()
  .toBuffer({ resolveWithObject: true })
  .then(({ data, info }) => {
    const { width, height, channels } = info;

    console.log(`image dimensions: ${width}x${height}, channels: ${channels}`);

    // get random pixel cluster -> array of RGBA values
    function randomCluster(data, width, height, clusterSize = 3) {
      const randomX = Math.floor(Math.random() * (width - clusterSize));
      const randomY = Math.floor(Math.random() * (height - clusterSize));

      const cluster = [];

      for (let y = 0; y < clusterSize; y++) {
        for (let x = 0; x < clusterSize; x++) {
          const index = ((randomY + y) * width + (randomX + x)) * channels;
          const pixel = data.slice(index, index + channels); // extract rgba values from pixel
          cluster.push(Array.from(pixel)); // add to array
        }
      }
      return cluster;
    }

    const pixelCluster = randomCluster(data, width, height, 3);
    console.log('random pixel cluster (RGBA):', pixelCluster);

    const everything = {
      exifData: exifToNum,
      pixelCluster: pixelCluster,
      colorPalette: colorPalette,
    };

    console.log('all data:', everything);
  })
  .catch(err => console.error('err while processing image:', err));
