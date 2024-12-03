// ./src/components/fileUploader.js
// purpose: provides a user interface for uploading image files and triggers a callback when a file is selected
// creation date: 2024-10-03
// authors: Nicholas Anthony
// integrates with the parent component's state to handle file selection and uploading status
// modifications: none

import React from 'react';

/**
 * renders a file uploader component for selecting image files.
 *
 * @param {function} onFileSelect - callback triggered when a file is selected by the user
 * @param {boolean} isUploading - indicates if a file upload process is in progress, disabling the upload button
 * @returns {JSX.Element} file uploader UI
 */
const FileUploader = ({ onFileSelect, isUploading }) => {
  /**
   * handles the file selection event, retrieves the selected file, and triggers the provided callback.
   *
   * @param {object} event - the change event triggered when the user selects a file
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // retrieves the first selected file
    if (file) {
      onFileSelect(file); // triggers the callback with the selected file
    }
  };

  return (
    // wrapper div for the file uploader component
    <div id="fileUpload">
      {/* shows an upload button, which is disabled during an upload process */}
      {isUploading ? (
        <button className="upload-button" disabled>
          Uploading...
        </button>
      ) : (
        <label htmlFor="imageUpload" className="upload-button">
          Upload
          <input
            type="file" // input field for selecting files
            id="imageUpload" // identifier for the input element
            data-testid="imageUpload" // test ID for testing purposes
            accept="image/*" // restricts file selection to images only
            onChange={handleFileChange} // handles file selection
            style={{ display: 'none' }} // hides the input field, leaving only the styled label visible
          />
        </label>
      )}
    </div>
  );
};

export default FileUploader;
