import mongoose from 'mongoose';
const outputRuleSchema = new mongoose.Schema({
  
  outputID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  action: {
    type: String,
    required: true
  },
});


let OutputRule = mongoose.model('OutputRule', outputRuleSchema);

export default {
  OutputRule: OutputRule
}