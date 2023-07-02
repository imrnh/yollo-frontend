import React, { useState } from 'react';

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Send the file to the backend API
    fetch('http://localhost:5298/admin/fileupload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('File uploaded successfully:', data);
        // Handle successful file upload
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadForm;
