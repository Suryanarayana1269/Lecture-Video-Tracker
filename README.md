# Lecture Video Tracker

Lecture Video Tracker is a web application designed to help users track their progress while watching lecture videos. It includes features for user authentication, video progress tracking, and an admin dashboard for analytics.

---
<img src="https://sdmntprwestus.oaiusercontent.com/files/00000000-a704-6230-958b-4337de1f2e6d/raw?se=2025-04-22T18%3A27%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=f896f106-6350-53ef-8385-418474c6c6d6&skoid=51916beb-8d6a-49b8-8b29-ca48ed86557e&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-22T04%3A30%3A06Z&ske=2025-04-23T04%3A30%3A06Z&sks=b&skv=2024-08-04&sig=J%2BPw6Lj0rdJspVJVqlqx46WHljoFgvBKWvogiU%2BeYJs%3D">
## Features

### User Features
- **Authentication**: Users can sign up, log in, and log out securely.
- **Video Progress Tracking**: Tracks watched intervals and calculates progress percentage.
- **Resume Playback**: Automatically resumes videos from the last watched position.

### Admin Features
- **Analytics Dashboard**: Displays user engagement and active user trends using charts.

---

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Vite**: For fast development and build tooling.
- **Chart.js**: For rendering analytics charts.
- **Framer Motion**: For animations.
- **React Router**: For routing.

### Backend
- **Node.js**: For server-side scripting.
- **Express.js**: For building RESTful APIs.
- **MongoDB**: For storing user and video progress data.
- **Mongoose**: For MongoDB object modeling.
- **JWT**: For user authentication.
- **bcrypt.js**: For password hashing.

---

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or cloud instance)

### Backend Setup
1. Navigate to the `server` directory:
   `cd server`
2. Install dependencies:
   Create a .env file in the server directory with the following variables:
   MONGO_URI=<your-mongodb-uri> 
   JWT_SECRET=<your-jwt-secret>

3.Frontend Setup
   Navigate to the `client` directory:
   `cd client`
   Install dependencies:
   `npm install`
   Start the development server:
   `npm run dev`

Note: There is no Pre-existed videos you have to upload your videos in client/public/ path and also update `/sample_video.mp4` video link in VideoPlayer.jsx at the last in the given image below:
<img src="![image](https://github.com/user-attachments/assets/586fec01-3cbe-48f6-a12b-a976e77f1fdf)">

### Project Structure
Client
client/
├── public/                # Static assets (e.g., videos, images)
├── src/                   # Source code
│   ├── components/        # Reusable React components
│   ├── pages/             # Page-level components
│   ├── services/          # API service functions
│   ├── App.jsx            # Main application component
│   ├── main.jsx           # Entry point
│   ├── index.css          # Global styles
├── package.json           # Frontend dependencies and scripts
├── vite.config.js         # Vite configuration
└── index.html             # HTML template

Server
server/
├── controllers/           # Business logic for routes
├── middleware/            # Middleware functions (e.g., authentication)
├── models/                # Mongoose schemas
├── routes/                # API route definitions
├── .env                   # Environment variables
├── server.js              # Entry point for the backend
├── package.json           # Backend dependencies and scripts

### API Endpoints
Authentication
POST /api/auth/signup: User signup.
POST /api/auth/login: User login.
Video Progress
GET /api/progress/get: Fetch video progress.
POST /api/progress/save: Save video progress.
Analytics
GET /api/analytics: Fetch analytics data (requires authentication).

### Screenshots and Demo Video
Home Page
<img alt="Home Page" src="C:\Users\surya\OneDrive\Pictures\Screenshots\Screenshot 2025-04-22 202400.png">
Admin Dashboard
<img alt="Admin Dashboard" src="C:\Users\surya\OneDrive\Pictures\Screenshots\Screenshot 2025-04-22 202709.png">

### Demo Video 
Watch the demo video to see the application in action:  
[![Watch the Demo](https://drive.google.com/file/d/1xPPzNP8O6-0olVmbKD5tjWJ_VOeS4Yi3/view?usp=drive_link)]

### Documentation
https://docs.google.com/document/d/179ZuxeC0_ox_XQcUkWXhp7q7ZZYhi6nv/edit?usp=drive_link&ouid=112556775906577700191&rtpof=true&sd=true

### Contact
For any questions or feedback, please contact:
Name: Suryanarayana Bodapati
Email: suryanarayanabodapati1269@gmail.com
GitHub: https://github.com/Suryanarayana1269/

### Future Enhancements
Add user profiles and preferences.
Implement a video library for browsing and selecting videos.
Provide advanced analytics for admins.
Optimize the UI for mobile devices.



