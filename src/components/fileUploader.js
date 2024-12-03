// src/components/FileUploader.js
import React from 'react';

const FileUploader = ({ onFileSelect, isUploading }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <div id="fileUpload">
      {isUploading ? (
        <button className="upload-button" disabled>Uploading...</button>
      ) : (
        <label htmlFor="imageUpload" className="upload-button">
          Upload
          <input
            type="file"
            id="imageUpload"
            data-testid="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </label>
      )}
    </div>
  );
};

export default FileUploader;