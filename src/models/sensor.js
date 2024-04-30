import mongoose from 'mongoose';
const sensorSchema = new mongoose.Schema({
  deviceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Device"
  }
});


let Sensor = mongoose.model('Sensor', sensorSchema);

export default {
  Sensor: Sensor
}