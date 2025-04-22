import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ userId, videoId, videoSrc }) => {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [watchedIntervals, setWatchedIntervals] = useState([]);
  const [newIntervals, setNewIntervals] = useState([]);
  const [lastTime, setLastTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const [metadataLoaded, setMetadataLoaded] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  // Reset state when videoId changes
  useEffect(() => {
    setProgress(0);
    setWatchedIntervals([]);
    setNewIntervals([]);
    setLastTime(0);
    setVideoDuration(null);
    setMetadataLoaded(false);
    setIsVideoEnded(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, [videoId]);

  // Fetch progress from the backend
  const fetchProgress = async () => {
    try {
      const { data } = await axios.get("https://lecture-video-tracker.onrender.com/api/progress/get", {
        params: { userId, videoId },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (data) {
        const { progress, watchedIntervals, lastWatchedTime } = data;

        setProgress(progress || 0);
        setWatchedIntervals(watchedIntervals || []);
        setNewIntervals([]);

        return lastWatchedTime || 0;
      } else {
        setProgress(0);
        setWatchedIntervals([]);
        setNewIntervals([]);
        return 0;
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      setProgress(0);
      setWatchedIntervals([]);
      setNewIntervals([]);
      return 0;
    }
  };

  // Save progress to the backend
  const saveProgress = async () => {
    if (newIntervals.length === 0 || !videoDuration) return;

    try {
      await axios.post(
        "https://lecture-video-tracker.onrender.com/api/progress/save",
        {
          userId,
          videoId,
          newIntervals,
          videoDuration,
          lastWatchedTime: videoRef.current?.currentTime || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNewIntervals([]);
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // Merge overlapping intervals
  const mergeIntervals = (intervals) => {
    if (!intervals.length) return [];

    const sorted = intervals.sort((a, b) => a.start - b.start);
    const merged = [sorted[0]];

    for (let i = 1; i < sorted.length; i++) {
      const last = merged[merged.length - 1];
      const current = sorted[i];

      if (current.start <= last.end) {
        last.end = Math.max(last.end, current.end);
      } else {
        merged.push(current);
      }
    }

    return merged;
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!videoDuration) return;

    const merged = mergeIntervals([...watchedIntervals, ...newIntervals]);
    const watchedSeconds = merged.reduce((total, interval) => total + (interval.end - interval.start), 0);
    const rawProgress = Math.min((watchedSeconds / videoDuration) * 100, 100);

    setProgress(rawProgress.toFixed(2));
  };

  // Save progress periodically
  useEffect(() => {
    const interval = setInterval(() => {
      saveProgress();
    }, 5000);

    return () => clearInterval(interval);
  }, [newIntervals]);

  // Handle video metadata loading
  const handleLoadedMetadata = async () => {
    if (videoRef.current) {
      videoRef.current.volume = 1.0;
      setVideoDuration(videoRef.current.duration);
      setMetadataLoaded(true);

      const resumeTime = await fetchProgress();

      if (resumeTime > 0 && videoRef.current.duration > 0) {
        videoRef.current.currentTime = resumeTime;
        setLastTime(resumeTime);
      }
    }
  };

  // Handle time updates
  const handleTimeUpdate = () => {
    if (!metadataLoaded || isVideoEnded) return;

    const currentTime = videoRef.current.currentTime;

    if (currentTime > lastTime) {
      setNewIntervals((prev) => [...prev, { start: lastTime, end: currentTime }]);
      setLastTime(currentTime);
    }

    calculateProgress();
  };

  // Handle video pause
  const handlePause = () => {
    saveProgress();
  };

  // Prevent skipping ahead
  const handleSeeking = () => {
    const video = videoRef.current;
    const currentTime = video.currentTime;

    if (currentTime > lastTime) {
      alert("Skipping ahead is not allowed.");
      video.currentTime = lastTime;
    }
  };

  // Handle video end
  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    setProgress(100);
    setNewIntervals([]);
    setWatchedIntervals([{ start: 0, end: videoDuration }]);

    saveProgress();
  };

  return (
    <div style={{ padding: "20px" }}>
      <video
        controls
        width="800"
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPause={handlePause}
        onSeeking={handleSeeking}
        onEnded={handleVideoEnd}
      >
        <source src="/3.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      <div style={{ marginTop: "10px" }}>
        Progress: <strong>{progress}%</strong>
      </div>
    </div>
  );
};

export default VideoPlayer;
