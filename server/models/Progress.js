// filepath: d:\NewTrackUserEngagement\server\models\Progress.js
import mongoose from "mongoose";

const intervalSchema = new mongoose.Schema({
  start: Number,
  end: Number,
});

const progressSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    videoId: String,
    watchedIntervals: [intervalSchema],
    progress: Number,
    lastWatchedTime: { type: Number, default: 0 },
  },
  { versionKey: false } // Disable versioning
);

export default mongoose.model("Progress", progressSchema);