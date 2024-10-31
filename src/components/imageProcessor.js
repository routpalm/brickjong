import React from 'react';
import useImageProcessor from '../hooks/useImageProcessor';

const ImageProcessor = () => {
  const { processImage, processedImageData } = useImageProcessor();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processImage(file);
    }
  };

  return (
    <div>
      <label htmlFor="imageUpload">Upload an image:</label>
      <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} />
      {processedImageData && (
        <div>
          <h3>Processed image data:</h3>
          <pre>{JSON.stringify(processedImageData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ImageProcessor;
