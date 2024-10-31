import React from 'react';

function fileUploader({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };

  return (
    <div id="fileUpload">
      <label htmlFor="imageUpload">Upload an image:</label>
      <input type="file" id="imageUpload" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

export default fileUploader;
