import React, { useState } from 'react';

const VideoUploadForm = () => {
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleBannerChange = (event) => {
    setSelectedBanner(event.target.files[0]);
  };


  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoChange = (event) => {
    setSelectedVideo(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create a FormData object to send the video file
    const formData = new FormData();
    formData.append('banner', selectedBanner);
    formData.append('video', selectedVideo);
    formData.append('title', 'dick');

    // Send the video file to the backend API
    fetch('http://localhost:5298/admin/videoupload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Video uploaded successfully:', data);
        // Handle successful video upload
      })
      .catch((error) => {
        console.error('Error uploading video:', error);
        // Handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type='file' onChange={handleBannerChange} />
      <input type="file" accept="video/*" onChange={handleVideoChange} />
      <button type="submit">Upload Video</button>
    </form>
  );
};

export default VideoUploadForm;
