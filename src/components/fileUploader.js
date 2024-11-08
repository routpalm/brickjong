import React from 'react';

function FileUploader({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file); // call processImage only when a file is selected
    }
  };

  return (
    <div id="fileUpload">
      <label htmlFor="imageUpload">Upload an image:</label>
      <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default FileUploader;
