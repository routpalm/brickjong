import { useState } from 'react';
import ExifReader from 'exif-js';
import Vibrant from 'node-vibrant';

const useImageProcessor = () => {
  const [processedImageData, setProcessedImageData] = useState(null);

  const processImage = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        ExifReader.getData(image, function () {
          const exifData = {};
          const gpsData =
            ExifReader.getTag(this, 'GPSLatitude') &&
            ExifReader.getTag(this, 'GPSLongitude');

          if (gpsData) {
            exifData.latitude = ExifReader.getTag(this, 'GPSLatitude');
            exifData.longitude = ExifReader.getTag(this, 'GPSLongitude');
          }
          exifData.cameraMake = ExifReader.getTag(this, 'Make');
          exifData.dateTime = ExifReader.getTag(this, 'DateTime');
          console.log('EXIF data:', exifData);

          Vibrant.from(image)
            .getPalette()
            .then((palette) => {
              const colorPalette = {};
              for (const swatch in palette) {
                if (palette[swatch]) {
                  colorPalette[swatch] = palette[swatch].getHex();
                }
              }
              console.log('Color Palette:', colorPalette);

              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              canvas.width = image.width;
              canvas.height = image.height;
              ctx.drawImage(image, 0, 0);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const pixelCluster = getRandomPixelCluster(imageData, 3);
              console.log('Random Pixel Cluster (RGBA):', pixelCluster);

              const processedData = {
                exifData,
                colorPalette,
                pixelCluster,
              };

              setProcessedImageData(processedData);
            })
            .catch((err) => {
              console.error('Error extracting color palette:', err);
            });
        });
      };
    };

    reader.readAsDataURL(file);
  };

  const getRandomPixelCluster = (imageData, clusterSize = 3) => {
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
  };

  return { processImage, processedImageData };
};

export default useImageProcessor;
