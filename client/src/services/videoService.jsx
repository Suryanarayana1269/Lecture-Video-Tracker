import axios from "axios";

const API_URL = "https://lecture-video-tracker.onrender.com/api/progress";

// Fetch video progress
export const getVideoProgress = async (userId, videoId) => {
  const { data } = await axios.get(`${API_URL}/get`, {
    params: { userId, videoId },
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return data;
};

// Save video progress
export const saveVideoProgress = async (userId, videoId, progressData) => {
  const { data } = await axios.post(
    `${API_URL}/save`,
    { userId, videoId, ...progressData },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return data;
};
