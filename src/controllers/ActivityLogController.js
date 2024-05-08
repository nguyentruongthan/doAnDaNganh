import ActivityLog from '../models/activityLog.js'; 
const addActivityLog =async (req, res) => {
  try {
    console.log(req.body);
    const newLog = new ActivityLog.ActivityLog({
        timestamp: new Date(),
        value: req.body.value,
        deviceID: req.body.deviceID
    });
    console.log(newLog);
    const savedLog = await newLog.save();
    res.status(200).json(savedLog);
  } catch (err) {
    res.status(500).json(err); //HTTP REQUEST CODE
  }
};
module.exports = addActivityLog