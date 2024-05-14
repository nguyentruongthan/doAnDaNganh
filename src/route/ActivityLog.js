import express from "express";
import activityLogController from '../controllers/activityLogController.js';
const activityLogRouter = express.Router();
//ADD LOG
activityLogRouter.post("/", activityLogController.addActivityLog);
//GET LATEST DEVICE LOG
activityLogRouter.get("/:deviceID/latest", activityLogController.getLatestDeviceLog);
//GET DAILY LOG
activityLogRouter.get("/:deviceID/:date", activityLogController.getDailyLog);
//GET 2 HOURLY LOG
activityLogRouter.get("/:deviceID/:date/hourly", activityLogController.getHourlyLog);
module.exports = activityLogRouter;