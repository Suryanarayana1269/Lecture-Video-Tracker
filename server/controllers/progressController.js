import Progress from "../models/Progress.js";

function mergeIntervals(intervals) {
  intervals.sort((a, b) => a.start - b.start);
  const merged = [];

  for (let interval of intervals) {
    if (!merged.length || merged[merged.length - 1].end < interval.start) {
      merged.push({ start: interval.start, end: interval.end });
    } else {
      merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, interval.end);
    }
  }
  return merged;
}

export const saveProgress = async (req, res) => {
  const { videoId, newIntervals, videoDuration, lastWatchedTime } = req.body;
  const userId = req.user.id; // From authMiddleware

  try {
    // Find the progress document for the user and video
    let progressDoc = await Progress.findOne({ userId, videoId });

    // If no document exists, create a new one
    if (!progressDoc) {
      progressDoc = new Progress({
        userId,
        videoId,
        watchedIntervals: [],
        progress: 0,
        lastWatchedTime: 0,
      });
    }

    // Merge the new intervals with the existing ones
    const allIntervals = [...progressDoc.watchedIntervals, ...newIntervals];
    const mergedIntervals = mergeIntervals(allIntervals);

    // Calculate the total watched time and progress percentage
    const watchedSeconds = mergedIntervals.reduce((total, interval) => total + (interval.end - interval.start), 0);
    let rawProgress = (watchedSeconds / videoDuration) * 100;

    if (rawProgress >= 99.5) {
      rawProgress = 100;
    }

    const progressPercent = Math.min(rawProgress, 100);

    // Update the document with the new data
    progressDoc.watchedIntervals = mergedIntervals;
    progressDoc.progress = progressPercent.toFixed(2);
    progressDoc.lastWatchedTime = lastWatchedTime || progressDoc.lastWatchedTime;

    // Save the updated document
    await progressDoc.save();

    // Respond with the updated progress data
    res.json({
      progress: progressDoc.progress,
      watchedIntervals: mergedIntervals,
      lastWatchedTime: progressDoc.lastWatchedTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getProgress = async (req, res) => {
  const { videoId } = req.query;
  const userId = req.user.id; // From authMiddleware

  try {
    // Find the progress document for the user and video
    const progressDoc = await Progress.findOne({ userId, videoId });

    // If no document exists, return default progress data
    if (!progressDoc) {
      return res.json({ progress: 0, watchedIntervals: [], lastWatchedTime: 0 });
    }

    // Respond with the progress data
    res.json({
      progress: progressDoc.progress,
      watchedIntervals: progressDoc.watchedIntervals,
      lastWatchedTime: progressDoc.lastWatchedTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};