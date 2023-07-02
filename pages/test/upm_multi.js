import React, { useState } from 'react';

const MultipleFileUploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the files
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('videos', selectedFiles[i]);
      console.log(selectedFiles[i]);
    }

    // Send the files to the backend API
    fetch('http://localhost:5298/admin/multiplevideoupload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Files uploaded successfully:', data);
        // Handle successful file upload
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Upload</button>
    </form>
  );
};

export default MultipleFileUploadForm;
