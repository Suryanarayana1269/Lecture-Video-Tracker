import Progress from "../models/Progress.js";

export const getAnalytics = async (req, res) => {
  try {
    const stats = await Progress.aggregate([
      {
        $group: {
          _id: "$videoId",
          avgProgress: { $avg: "$progress" },
          userCount: { $sum: 1 }
        }
      },
      {
        $sort: { avgProgress: -1 }
      }
    ]);

    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
