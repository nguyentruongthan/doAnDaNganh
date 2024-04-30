import deviceController from '../controllers/deviceController.js';
import express from "express";

const deviceRouter = express.Router();
deviceRouter.post('/', deviceController.addDevice);
deviceRouter.get('/all/:gardenID', deviceController.getAllDevicesByGardenID);
deviceRouter.put('/:deviceID', deviceController.updateDeviceByDeviceID);
deviceRouter.get('/:deviceID', deviceController.getDeviceByID);
export default deviceRouter;