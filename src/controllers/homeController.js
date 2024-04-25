
import fs from 'fs';
import constant from '../services/constant';
import deviceService from '../services/deviceService';
import mqttService from '../services/mqttService';
import eventService from '../services/eventService';
// import updateSensor from "../services/updateSensor"; 

function decodeDeviceNametoNumber(nameDevice) {
  switch (nameDevice) {
    case "AirSensor":
      return constant.TYPE_DHT_SENSOR;
    case "HumiSoilSensor":
      return constant.TYPE_SOIL_SENSOR;
    case "LightSensor":
      return constant.TYPE_LIGHT_SENSOR;
    case "PumpOutput":
      return constant.TYPE_DIGITAL_OUTPUT;
    case "LightOutput":
      return constant.TYPE_DIGITAL_OUTPUT;
    case "MistingOutput":
      return constant.TYPE_DIGITAL_OUTPUT;
    case "CurtainOutput":
      return constant.TYPE_DIGITAL_OUTPUT;
    default: return -1;
  }
}

function decodeDeviceNametoString(nameDevice) {
  switch (nameDevice) {
    case "AirSensor":
      return "Nhiệt độ và độ ẩm không khí";
    case "HumiSoilSensor":
      return "Độ ẩm đất";
    case "LightSensor":
      return "Cường độ ánh sáng";
    case "PumpOutput":
      return "Máy bơm";
    case "LightOutput":
      return "Đèn";
    case "MistingOutput":
      return "Máy phun sương";
    case "CurtainOutput":
      return "Rèm che nắng";
    default: return "";
  }
}
let getHomePage = async (req, res) => {
  try {
    return res.render('homePage.ejs');
  } catch (e) {
    console.log(e);
  }
}

let getDashBoard = async (req, res) => {
  //call service to get device according username and gardenID
  //TODO
  //Ex: list device id is
  const devices = [
    {
      deviceID: 1,
      value: "32.4,78",
      pin: "P19",
      type: "2", //Temp and humi air sensor
      deviceName: "Nhiệt độ và độ ẩm không khí"
    },
    {
      deviceID: 2,
      value: "34",
      pin: "P0",
      type: "0", //Light sensor
      deviceName: "Ánh sáng 1"
    },
    {
      deviceID: 3,
      value: "68",
      pin: "P1",
      type: "1", //Humi soil sensor
      deviceName: "Độ ẩm đất 1"
    },
    {
      deviceID: 4,
      value: "0",
      pin: "P2",
      type: "3", //Light output
      deviceName: "Đèn 1"
    },
    {
      deviceID: 5,
      value: "1",
      pin: "P3",
      type: "3", //Pump output
      deviceName: "Máy bơm 1"
    },
  ]
  return res.render(
    'dashBoard.ejs',
    { data: devices }
  );
  
}

let getDevices = async (req, res) => {
  //call service to get device according username and gardenID
  //TODO
  //Ex: list device id is
  const devices = [
    {
      deviceID: 1,
      value: "32.4,78",
      pin: "P19",
      type: "2", //Temp and humi air sensor
      deviceName: "Nhiệt độ và độ ẩm không khí"
    },
    {
      deviceID: 2,
      value: "34",
      pin: "P0",
      type: "0", //Light sensor
      deviceName: "Ánh sáng 1"
    },
    {
      deviceID: 3,
      value: "68",
      pin: "P1",
      type: "1", //Humi soil sensor
      deviceName: "Độ ẩm đất 1"
    },
    {
      deviceID: 4,
      value: "0",
      pin: "P2",
      type: "3", //Light output
      deviceName: "Đèn 1"
    },
    {
      deviceID: 5,
      value: "0",
      pin: "P3",
      type: "4", //Pump output
      deviceName: "Máy bơm 1"
    },
  ]
  //send response
  res.set({ "Access-Control-Allow-Origin": "*" });
  res.status(200).json({"data": devices})
}

const controlDevice = async (req, res) => {
  const gardenID = req.body.gardenID;
  const header = req.body.header;
  const typeDevice = req.body.typeDevice;
  const pin = req.body.pin;
  const value = req.body.value;
  const ack = Date.now()
  if (header == constant.HEADER_CONTROL_DEVICE) {
    const message = `${constant.HEADER_CONTROL_DEVICE}:${typeDevice}:${pin}:${value}:${ack}`
    //call mqttService for publish message to topic <gardenID>
    mqttService.publish(gardenID, message)
    
    const timeout = setTimeout(() => {
      res.status(200).json({ "result": "failed" });
    }, 3000)

    await eventService.mqttEvent.once(`${constant.HEADER_ACK}:${ack}`, () => {
      clearTimeout(timeout);
      //call service to add to database
      //TODO
      res.status(200).json({ "result": "success" });
    });
  } else {
    return res.status(400).json({ "result": "error" });
  }
  
}

const createDevice = async (req, res) => {
  const gardenID = req.body.gardenID;
  const data = req.body.data;
  const splitData = data.split(':');
  if (splitData.length != 3) return res.status(400).json({ "data": "error" });
  const header = splitData[0];
  const typeDevice = splitData[1];
  const pin = splitData[2];
  if (header == constant.HEADER_CREATE) {
    const message = `${constant.HEADER_CREATE}:${typeDevice}:${pin}`
    //call mqttService for publish message to topic <gardenID>
    mqttService.publish(gardenID, message);
    //call service to add to database
    //TODO

  } else {
    return res.status(400).json({ "data": "error" });
  }
  res.status(200).json({ "data": "create device" });
}

const createScheduler = async (req, res) => {
  const header = req.body.header;
  const typeDevice = req.body.typeDevice;
  const pin = req.body.pin;
  const action = req.body.action;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const gardenID = req.body.gardenID;

  if (header != constant.HEADER_CREATE_SCHEDULER) return res.status(400).json({ "data": "error" });
  
  const startTimeMinute = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
  const endTimeMinute = parseInt(endTime.split(':')[0]) * 60 + parseInt(endTime.split(':')[1]);
  
  //call mqttService for publish message to topic <gardenID>
  mqttService.publish(gardenID, `${constant.HEADER_CREATE_SCHEDULER}:${typeDevice}:${pin}:${action}:${startTimeMinute}:${endTimeMinute}`);
  //call service to add to database
  //add to database startTime with action is turn on
  //add to database endTime with action is turn off

  res.status(200).json({ "data": "create scheduler" });
}


let postDevice = async (req, res) => {
  
  let nameDevices = Array.isArray(req.body.nameDevice) ? req.body.nameDevice : [req.body.nameDevice];
  let pins = Array.isArray(req.body.pin) ? req.body.pin: [req.body.pin];

  // for (let i = 0; i < nameDevices.length; i++) {
  //   switch (nameDevices[i]) {
  //     case "AirSensor":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_DHT_SENSOR);
  //       break;
  //     case "HumiSoilSensor":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_SOIL_SENSOR);
  //       break;
  //     case "LightSensor":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_LIGHT_SENSOR);
  //       break;
  //     case "PumpOutput":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_DIGITAL_OUTPUT);
  //       break;
  //     case "LightOutput":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_DIGITAL_OUTPUT);
  //       break;
  //     case "MistingOutput":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_DIGITAL_OUTPUT);
  //       break;
  //     case "CurtainOutput":
  //       updateSensor.setInputPin(pins[i], constant.TYPE_DIGITAL_OUTPUT);
  //       break;
  //     default: break;
  //   }
  // }
  console.log(nameDevices)
  const devices = nameDevices.map((name, index) => {
    let typeDevice = decodeDeviceNametoNumber(name);
    if (typeDevice == -1) return null;
    if (typeDevice == constant.TYPE_DHT_SENSOR) {
      return {
        name: decodeDeviceNametoString(name),
        pin: pins[index],
        typeDevice: typeDevice,
        value: ["0", "0"]
      }
    } else {
      return {
        name: decodeDeviceNametoString(name),
        pin: pins[index],
        typeDevice: typeDevice,
        value: ["0"]
      }
    }
  }).flat().filter(device => device !== null);
  console.log(devices)
  // Tên tệp JSON
  const filePath = './src/jsonFile/devices.json';

  // Chuyển đối tượng thành chuỗi JSON
  const jsonData = JSON.stringify({ devices: devices }, null, 2); // null và 2 để định dạng dễ đọc

  // Ghi dữ liệu JSON vào tệp
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error('Error:', err);
      return res.send("Error", err);
    }
  });
  return res.send("dash-board post");
}
module.exports = {
  getHomePage: getHomePage,
  getDashBoard: getDashBoard,
  getDevices: getDevices,
  postDevice: postDevice,
  controlDevice: controlDevice,
  createDevice: createDevice,
  createScheduler: createScheduler,
}