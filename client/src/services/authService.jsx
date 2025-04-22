import axios from "axios";

const API_URL = "https://lecture-video-tracker.onrender.com/api/auth";

// Login user and store token in localStorage
export const login = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", data.token); // Save token locally
    return data; // Return user data if needed
  } catch (error) {
    console.error("Login failed:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Signup user
export const signup = async (email, password) => {
  try {
    const { data } = await axios.post(`${API_URL}/signup`, { email, password });
    return data; // Return success message or user data
  } catch (error) {
    console.error("Signup failed:", error.response?.data?.message || error.message);
    throw error;
  }
};

// Logout user and remove token from localStorage
export const logout = () => {
  localStorage.removeItem("token");
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if the user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Returns true if token exists, false otherwise
};
