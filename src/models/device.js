import mongoose from 'mongoose';
const deviceSchema = new mongoose.Schema({
  deviceID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  pin: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  deviceName: {
    type: String,
    required: true
  },
  gardenID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garden"
  }
});


let Device = mongoose.model('Device', deviceSchema);

export default {
  Device: Device
}