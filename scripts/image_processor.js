let processedImageData = null; // global var

function processImage(file) {
  const reader = new FileReader();
  
  reader.onload = function(event) {
    const image = new Image();
    image.src = event.target.result;

    image.onload = function() {
      
      EXIF.getData(image, function() {
        //get exif data (lat, long, make of camera (if applicable), timestamp)
        const exifData = {};
        const gpsData = EXIF.getTag(this, "GPSLatitude") && EXIF.getTag(this, "GPSLongitude");

        if (gpsData) {
          exifData.latitude = EXIF.getTag(this, "GPSLatitude");
          exifData.longitude = EXIF.getTag(this, "GPSLongitude");
        }
        exifData.cameraMake = EXIF.getTag(this, "Make");
        exifData.dateTime = EXIF.getTag(this, "DateTime");
        console.log("EXIF data:", exifData);

        // palette extraction
        Vibrant.from(image).getPalette().then(palette => {
          const colorPalette = {};
          for (const swatch in palette) {
            if (palette[swatch]) {
              colorPalette[swatch] = palette[swatch].getHex();
            }
          }
          console.log("Color Palette:", colorPalette);

          // pixel extraction
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixelCluster = getRandomPixelCluster(imageData, 3);
          console.log("Random Pixel Cluster (RGBA):", pixelCluster);

          processedImageData = {
            exifData,
            colorPalette,
            pixelCluster,
          };

          window.processedImageData = processedImageData;

          // custom event to signal successful processed image
          const event = new Event('imageProcessed');
          document.dispatchEvent(event);
        }).catch(err => {
          console.error("Error extracting color palette:", err);
        });
      });
    };
  };

  reader.readAsDataURL(file);
}

// given image data, function will return rgba pixel cluster values
function getRandomPixelCluster(imageData, clusterSize = 3) {
  const { data, width, height } = imageData;
  const randomX = Math.floor(Math.random() * (width - clusterSize));
  const randomY = Math.floor(Math.random() * (height - clusterSize));

  const cluster = [];
  for (let y = 0; y < clusterSize; y++) {
    for (let x = 0; x < clusterSize; x++) {
      const index = ((randomY + y) * width + (randomX + x)) * 4;
      const pixel = data.slice(index, index + 4); // RGBA values
      cluster.push(Array.from(pixel));
    }
  }
  return cluster;
}