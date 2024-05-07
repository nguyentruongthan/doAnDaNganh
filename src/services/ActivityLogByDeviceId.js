import Device from '../models/device.js'; 
import ActivityLog from '../models/activityLog.js'; 

const getLatestDeviceLog = async (req, res) => {
    try {
    const device = await Device.findById(req.params.deviceID);
      if (!device) {
        return res.status(404).json({ message: "Device not found" });
      }
    //get Latest Device Log
    const latestLog = await ActivityLog.findOne({ deviceID: req.params.deviceID }).sort({ timestamp: -1 }).exec();
      if (!latestLog) {
        return res.status(404).json({ message: "No activity log found for the specified device ID" });
      }
  
      res.status(200).json({ device, latestLog });
    } catch (err) {
      console.error("Error fetching latest activity log:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  module.exports = getLatestDeviceLog;