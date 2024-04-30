import deviceModel from '../models/device.js';
import sensorModel from '../models/sensor.js';
import outputDeviceModel from '../models/outputDevice.js';
import constants from '../services/constant.js';

const addDevice = async (req, res) => {
  try {
    const newDevice = new deviceModel.Device(req.body);
    const saveDevice = await newDevice.save();

    const type = saveDevice.type;
    if (parseInt(type) < constants.TYPE_DIGITAL_OUTPUT) {//sensor
      const newSensor = new sensorModel.Sensor(saveDevice._id);
      const saveSensor = await newSensor.save();
      res.status(200).json({ sensor: saveSensor , device: saveDevice});
    } else { // output device
      const newOutputDevice = new outputDeviceModel.OutputDevice(saveDevice._id);
      const saveOutputDevice = await newOutputDevice.save();
      res.status(200).json({ outputDevice: saveOutputDevice , device: saveDevice});
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

const getAllDevicesByGardenID = async (req, res) => {
  try {
    const gardenID = req.params.gardenID;
    // console.log(gardenID);
    const devices = await deviceModel.Device.find({
      gardenID: gardenID
    })
    res.status(200).json(devices);
  }catch(err){
    res.status(500).json(err);
  }
}

const updateDeviceByDeviceID = async (req, res) => {
  try {
    const deviceID = req.params.deviceID;
    //find by deviceID
    const device = await deviceModel.Device.findById(deviceID);
    if(!device){
      res.status(404).json("Device not found");
    }
    if(device.type != req.body.type){
      res.status(400).json("Cannot update type of device");
    }
    //update device table
    await device.updateOne({
      $set : req.body
    })
    res.status(200).json("Update device successfully");
  } catch (err) {
    res.status(500).json(err);
  }
}

const getDeviceByID = async (req, res) => {
  try {
    const deviceID = req.params.deviceID;
    console.log(deviceID);
    const device = await deviceModel.Device.findById(deviceID);
    if(!device){
      res.status(404).json("Device not found");
    }
    res.status(200).json(device);
  } catch (err) {
    res.status(500).json(err);
  }
}
module.exports = {
  addDevice: addDevice,
  getAllDevicesByGardenID: getAllDevicesByGardenID,
  updateDeviceByDeviceID: updateDeviceByDeviceID,
  getDeviceByID: getDeviceByID
};