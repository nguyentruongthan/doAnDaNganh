import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});


let User = mongoose.model('User', userSchema);

export default {
  User: User
}