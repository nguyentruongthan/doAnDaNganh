import userModel from '../models/user.js';
import deviceService from '../services/deviceService.js';
import jwt from 'jsonwebtoken';
import mqttService from '../services/mqttService.js';
import constant from '../services/constant.js';
const addUser = async (req, res) => {
  try {
    const newUser = new userModel.User(req.body);
    const saveUser = await newUser.save();
    deviceService.addDevice({
      type: 0,
      pin: "P0",
      deviceName: "Ánh sáng",
      username: req.body.username
    });
    deviceService.addDevice({
      type: 1,
      pin: "P1",
      deviceName: "Độ ẩm đất",
      username: req.body.username
    });
    deviceService.addDevice({
      type: 2,
      pin: "P19",
      deviceName: "Độ ẩm không khí",
      username: req.body.username
    });
    deviceService.addDevice({
      type: 3,
      pin: "P19",
      deviceName: "Nhiệt độ",
      username: req.body.username
    });
    res.status(200).json(saveUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

const loginUser = async (req, res) => {
  try {
    const user = await userModel.User.findOne({
      username: req.body.username
    });
    if (!user) {
      return res.status(404).json("User not found");
    }
    if(user.password !== req.body.password){
      return res.status(400).json("Wrong password");
    }
    const token = jwt.sign({ username: user.username }, 'your_secret_key', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
    return res.status(200).json({ message: 'Login successfully!' });
    // res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
const getIsAuto = async (req, res) => {
  try {
    const user = await userModel.User.findOne({ username: req.params.username });
    return res.status(200).json(user.isAuto);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
const updateIsAuto = async (req, res) => {
  try {
    const cookies = req.cookies;
    if (cookies.token == null) {
      return res.redirect('/dangNhap');
    }
    const token = cookies.token;
    const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
    const username = decodeToken.username;
    const user = await userModel.User.findOne({ username: req.params.username });
    user.isAuto = req.body.isAuto;
    await user.updateOne({
      $set: user
    });
    mqttService.publish(username, `${constant.HEADER_CREATE_IS_AUTO}:${user.isAuto}`);
    return res.status(200).json(user.isAuto);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
const logoutUser = async (req, res) => {
  console.log('logout')
  res.clearCookie('token');
  // return res.redirect('/api/user/login');
  return res.status(200).json({ message: 'Logout successfully!' });

}
module.exports = {
  addUser: addUser,
  loginUser: loginUser,
  getIsAuto: getIsAuto,
  updateIsAuto: updateIsAuto,
  logoutUser: logoutUser
};