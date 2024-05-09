import userModel from '../models/user.js';

const getAllUsers = async () => {
  try {
    const users = await userModel.User.find();
    return users;
  } catch (err) {
    console.log(err);
    return err;
  }
}
const getIsAuto = async (username) => {
  try {
    const user = await userModel.User.findOne({ username: username });
    return user.isAuto;
  } catch (err) {
    console.log(err);
    return err;
  }
}
module.exports = {
  getAllUsers: getAllUsers,
  getIsAuto: getIsAuto
}