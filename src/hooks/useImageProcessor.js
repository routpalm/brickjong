import { useState } from 'react';
import ExifReader from 'exif-js';
import ColorThief from 'color-thief-browser';

const useImageProcessor = () => {
  const [processedImageData, setProcessedImageData] = useState(null);

  const processImage = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        // Extract EXIF data
        ExifReader.getData(image, function () {
          const exifData = {};
          const gpsData = ExifReader.getTag(this, 'GPSLatitude') && ExifReader.getTag(this, 'GPSLongitude');

          if (gpsData) {
            exifData.latitude = ExifReader.getTag(this, 'GPSLatitude');
            exifData.longitude = ExifReader.getTag(this, 'GPSLongitude');
          }
          exifData.cameraMake = ExifReader.getTag(this, 'Make');
          exifData.dateTime = ExifReader.getTag(this, 'DateTime');

          // Extract color palette using ColorThief
          const colorThief = new ColorThief();
          const colorPalette = colorThief.getPalette(image, 6).map(
            (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          );

          // Pixel extraction
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const pixelCluster = getRandomPixelCluster(imageData, 3);

          setProcessedImageData({
            exifData,
            colorPalette,
            pixelCluster,
          });
        });
      };
    };

    reader.readAsDataURL(file);
  };

  // Helper function to extract a cluster of random pixels
  const getRandomPixelCluster = (imageData, clusterSize = 3) => {
    const { data, width, height } = imageData;
    const randomX = Math.floor((width - clusterSize)/2);
    const randomY = Math.floor((height - clusterSize)/2);//set region to middle of image

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
