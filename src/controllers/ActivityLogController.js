import ActivityLog from '../models/activityLog.js'; 
const addActivityLog =async (req, res) => {
    try {
      const newLog = new ActivityLog(req.body);
      const savedLog = await newLog.save();
      res.status(200).json(savedLog);
    } catch (err) {
      res.status(500).json(err); //HTTP REQUEST CODE
    }
  };
  module.exports = addActivityLog