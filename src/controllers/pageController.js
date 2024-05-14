
import constant from '../services/constant';
import deviceService from '../services/deviceService';
import schedulerService from '../services/schedulerService';
import ruleService from '../services/ruleService';
import userService from '../services/userService';


let getDashBoard = async (req, res) => {
  //call service to get device according username
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);
  //call service get isAuto of username
  const isAuto = await userService.getIsAuto(username);
  return res.render(
    'dashBoard.ejs',
    {
      data: devices,
      isAuto: isAuto,
      username: username
    }
  );  
}

const getNhietDo = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const type = constant.TYPE_TEMP_SENSOR;
  //call service to get device
  const devices = await deviceService.getDevicesByUsernameAndType(username, type);
  if (devices.length === 0) {
    return res.status(404).json("Device not found");
  }
  return res.render(
    'nhietDo.ejs',
    {
      device: devices[0],
      username: username
    }
  );
}
const getDoAmKhongKhi = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const type = constant.TYPE_HUMIAIR_SENSOR;
  //call service to get device
  const devices = await deviceService.getDevicesByUsernameAndType(username, type);
  if (devices.length === 0) {
    return res.status(404).json("Device not found");
  }
  return res.render(
    'doAmKhongKhi.ejs',
    {
      device: devices[0],
      username: username
    }
  );
}
const getDoAmDat = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const type = constant.TYPE_SOIL_SENSOR;
  //call service to get device
  const devices = await deviceService.getDevicesByUsernameAndType(username, type);
  if (devices.length === 0) {
    return res.status(404).json("Device not found");
  }
  return res.render(
    'doAmDat.ejs',
    {
      device: devices[0],
      username: username
    }
  );
}
const getAnhSang = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const type = constant.TYPE_LIGHT_SENSOR;
  //call service to get device
  const devices = await deviceService.getDevicesByUsernameAndType(username, type);
  if (devices.length === 0) {
    return res.status(404).json("Device not found");
  }

  return res.render(
    'anhSang.ejs',
    {
      device: devices[0],
      username: username
    }
  );
}
const getLapLich = async (req, res) => {
  //get all scheduler by username
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);
  return res.render(
    'lapLich.ejs',
    {
      data: devices,
      username: username
    }
  )
}
const getCaiDatThoiGian = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);
  return res.render(
    'caiDatThoiGian.ejs',
    {
      data: devices,
      username: username
    }
  )
}

const getChinhSuaThoiGian = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const schedulerID = req.params.schedulerID;
  const scheduler = await schedulerService.getSchedulerByID(schedulerID);
  const devices = await deviceService.getAllDevicesByUsername(username);
  return res.render(
    'chinhSuaThoiGian.ejs',
    {
      scheduler: scheduler,
      devices: devices,
      username: username
    }
  )
}

const getDangNhap = async (req, res) => {
  const cookies = req.cookies;
  if (cookies.token) {
    return res.redirect('/dashBoard');
  }
  return res.render('dangNhap.ejs');
}

const getNguongCamBien = async (req, res) => {
  //get all device by username
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);

  return res.render(
    'nguongCamBien.ejs',
    {
      devices: devices,
      username: username
    }
  );
}
const getCaiDatNguongCamBien = async (req, res) => {
  //get all device by username
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);

  return res.render(
    'caiDatNguongCamBien.ejs',
    {
      devices: devices,
      username: username
    }
  );
}
const getChinhSuaNguongCamBien = async (req, res) => {
  // get all device by username
  const cookies = req.cookies;
  if (cookies.token == null) {
    return res.redirect('/dangNhap');
  }
  const token = cookies.token;
  const decodeToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
  const username = decodeToken.username;
  const devices = await deviceService.getAllDevicesByUsername(username);
  // get outputRule by outputRuleID
  const outputRuleID = req.params.outputRuleID;
  const outputRule = await ruleService.getOutputRuleByOutputRuleID(outputRuleID);
  // get sensorRule by outputRuleID
  const sensorRules = await ruleService.getSensorRuleByOutputRuleID(outputRuleID);
  return res.render(
    'chinhSuaNguongCamBien.ejs',
    {
      devices: devices,
      outputRule: outputRule,
      sensorRules: sensorRules,
      username: username
    }
  );
}


module.exports = {
  getDashBoard: getDashBoard,
  getNhietDo: getNhietDo,
  getDoAmKhongKhi: getDoAmKhongKhi,
  getDoAmDat: getDoAmDat,
  getAnhSang: getAnhSang,
  getLapLich: getLapLich,
  getCaiDatThoiGian: getCaiDatThoiGian,
  getChinhSuaThoiGian: getChinhSuaThoiGian,
  getDangNhap: getDangNhap,
  getNguongCamBien: getNguongCamBien,
  getCaiDatNguongCamBien: getCaiDatNguongCamBien,
  getChinhSuaNguongCamBien: getChinhSuaNguongCamBien
}