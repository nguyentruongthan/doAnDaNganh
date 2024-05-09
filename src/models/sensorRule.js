import mongoose from 'mongoose';
const sensorRuleSchema = new mongoose.Schema({
  
  outputRuleID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sensorID: {
    type: String,
    required: true
  },
  threshold: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
});


let SensorRule = mongoose.model('SensorRule', sensorRuleSchema);

export default {
  SensorRule: SensorRule
}