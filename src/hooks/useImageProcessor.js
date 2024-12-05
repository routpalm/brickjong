// ./src/hooks/useImageProcessor.js
// Brick Jong
// purpose: provide image processing functionality to the Weave Artwork page and allow funneling to the art generator
// processes user-uploaded images to extract exif data, color palette, and pixel clusters
// author: Nicholas Anthony
// creation date: 09-25-2024


import { useState } from 'react';
import ExifReader from 'exif-js'; // used to extract exif metadata from images
import ColorThief from 'color-thief-browser'; // used to extract a color palette from images

/**
 * a custom hook that processes an image to extract metadata and generate processed image data.
 * it returns an object containing:
 *   - processedImageData: the extracted exif data, color palette, and pixel cluster
 *   - processImage: a function to initiate the image processing given a file
 *
 * @returns {{ processImage: function, processedImageData: object|null }} 
 * an object containing the processImage function and the processedImageData state
 */
const useImageProcessor = () => {
  const [processedImageData, setProcessedImageData] = useState(null);

  /**
   * processes the given file, reading it as an image and extracting metadata.
   * once loaded, it uses exifreader for exif data, colorthief for a color palette,
   * and a custom function to get a pixel cluster. updates processedImageData with the results.
   *
   * @param {File} file - the image file to be processed
   */
  const processImage = (file) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = () => {
        // extract exif data using exifreader
        ExifReader.getData(image, function () {
          const exifData = {};
          const gpsData = ExifReader.getTag(this, 'GPSLatitude') && ExifReader.getTag(this, 'GPSLongitude');

          if (gpsData) {
            exifData.latitude = ExifReader.getTag(this, 'GPSLatitude');
            exifData.longitude = ExifReader.getTag(this, 'GPSLongitude');
          }
          exifData.cameraMake = ExifReader.getTag(this, 'Make');
          exifData.dateTime = ExifReader.getTag(this, 'DateTime');

          // extract color palette using colorthief
          const colorThief = new ColorThief();
          const colorPalette = colorThief.getPalette(image, 6).map(
            (color) => `rgb(${color[0]}, ${color[1]}, ${color[2]})`
          );

          // extract a pixel cluster using getRandomPixelCluster
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

  /**
   * extracts a cluster of random pixels from the provided image data.
   * picks a region in the middle of the image and collects pixel data from a small square area.
   *
   * @param {ImageData} imageData - the image data retrieved from a canvas
   * @param {number} [clusterSize=3] - size of the pixel cluster (width and height of the sample region)
   * @returns {number[][]} an array of pixel data arrays, each containing RGBA values
   */
  const getRandomPixelCluster = (imageData, clusterSize = 3) => {
    const { data, width, height } = imageData;
    const randomX = Math.floor((width - clusterSize) / 2); // center region horizontally
    const randomY = Math.floor((height - clusterSize) / 2); // center region vertically

    const cluster = [];
    for (let y = 0; y < clusterSize; y++) {
      for (let x = 0; x < clusterSize; x++) {
        const index = ((randomY + y) * width + (randomX + x)) * 4;
        const pixel = data.slice(index, index + 4); // extract RGBA for one pixel
        cluster.push(Array.from(pixel));
      }
    }
    return cluster;
  };

  return { processImage, processedImageData };
};

export default useImageProcessor;
