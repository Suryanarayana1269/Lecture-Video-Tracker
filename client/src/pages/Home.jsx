import React from 'react';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/VideoPlayer';
import { logout } from '../services/authService';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', paddingTop: '30px' }}>
      <h1>Welcome to the Lecture Video Tracker 📚🎥</h1>

      <button onClick={handleLogout} style={{ margin: '10px', padding: '8px 16px' }}>
        Logout
      </button>

      <VideoPlayer
        userId="user123" // TEMP: Replace with dynamic user ID
        videoId="video001"
        videoSrc="/videos/sample-video-1080p.mp4"
      />
    </div>
  );
};

export default Home;