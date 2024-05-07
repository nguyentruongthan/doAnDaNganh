import addActivityLog from '../controllers/ActivityLogController.js';
import getLatestDeviceLog from '../services/ActivityLogByDeviceId.js';
import getHourlyLog from '../services/ActivityLogByHours.js';
import getDailyLog from '../services/ActivityLogByDays.js';
import express from "express";
const LogRouter = express.Router();
//ADD LOG
LogRouter.post("/", addActivityLog);
//GET LATEST DEVICE LOG
LogRouter.get("/:deviceID/latest", getLatestDeviceLog);
//GET DAILY LOG
LogRouter.get("/:deviceID/:date", getDailyLog);
//GET 2 HOURLY LOG
LogRouter.get("/:deviceID/:date/hourly", getHourlyLog);
module.exports = LogRouter;