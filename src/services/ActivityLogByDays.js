import ActivityLog from '../models/activityLog.js'; 
const getDailyLog = async (req, res) => {
  try {
    const { deviceID, date } = req.params;
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Find Logs for that day
    const logs = await ActivityLog.find({
      deviceID,
      timestamp: { $gte: startOfDay, $lte: endOfDay }
    });

    res.status(200).json(logs);
  } catch (err) {
    console.error("Error fetching logs:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
  module.exports = getDailyLog;