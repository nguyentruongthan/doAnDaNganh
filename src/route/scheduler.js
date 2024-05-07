import schedulerController from '../controllers/schedulerController.js';
import express from "express";

const schedulerRouter = express.Router();
schedulerRouter.post('/', schedulerController.addScheduler);
schedulerRouter.get('/all/:outputID', schedulerController.getAllSchedulersByOutputID);
schedulerRouter.put('/:schedulerID', schedulerController.updateSchedulerByID);
schedulerRouter.get('/:schedulerID', schedulerController.getSchedulerByID);
schedulerRouter.delete('/:schedulerID', schedulerController.deleteSchedulerByID);
export default schedulerRouter;