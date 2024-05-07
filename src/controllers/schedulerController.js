import schedulerModel from '../models/scheduler.js';
import outputDeviceModel from '../models/outputDevice.js';
import schedulerService from '../services/schedulerService.js';
const addScheduler = async (req, res) => {
  try {
    const outputDevice = await outputDeviceModel.OutputDevice.exists({ deviceID: req.body.outputID });
    if (!outputDevice) {
      return res.status(400).json({ error: "Invalid outputID" });
    }

    const newScheduler = new schedulerModel.Scheduler(req.body);
    const saveScheduler = await newScheduler.save();

    return res.status(200).json({scheduler: saveScheduler});
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllSchedulersByOutputID = async (req, res) => {
  try {
    const outputID = req.params.outputID;
    const schedulers = await schedulerService.getAllSchedulersByOutputID(outputID);
    return res.status(200).json(schedulers);
  }catch(err){
    res.status(500).json(err);
  }
}

const updateSchedulerByID = async (req, res) => {
  try {
    const schedulerID = req.params.schedulerID;
    //find by schedulerID
    const scheduler = await schedulerModel.Scheduler.findById(schedulerID);
    if(!scheduler){
      return res.status(404).json("Scheduler not found");
    }
    if(scheduler.type != req.body.type){
      return res.status(400).json("Cannot update scheduler");
    }
    //update device table
    await scheduler.updateOne({
      $set : req.body
    })
    res.status(200).json("Update scheduler successfully");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getSchedulerByID = async (req, res) => {
  try {
    const schedulerID = req.params.schedulerID;
    const scheduler = await schedulerService.getSchedulerByID(schedulerID);
    if(!scheduler){
      return res.status(404).json("Scheduler not found");
    }
    res.status(200).json(scheduler);
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteSchedulerByID = async (req, res) => {
  try {
    const schedulerID = req.params.schedulerID;
    const scheduler = await schedulerModel.Scheduler.findByIdAndDelete(schedulerID);
    if (!scheduler) {
      res.status(404).json("Scheduler not found");
    }
    res.status(200).json(scheduler);
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = {
  addScheduler: addScheduler,
  getAllSchedulersByOutputID: getAllSchedulersByOutputID,
  deleteSchedulerByID: deleteSchedulerByID,
  updateSchedulerByID: updateSchedulerByID,
  getSchedulerByID: getSchedulerByID
};