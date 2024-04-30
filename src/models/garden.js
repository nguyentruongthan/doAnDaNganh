import mongoose from 'mongoose';
const gardenSchema = new mongoose.Schema({
  gardenID: {
    type: mongoose.Schema.Types.ObjectId,
    // required: true
  },
  gardenName: {
    type: String,
    required: true
  },
  comport: {
    type: String,
    required: true
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});


let Garden = mongoose.model('Garden', gardenSchema);

export default {
  Garden: Garden
}