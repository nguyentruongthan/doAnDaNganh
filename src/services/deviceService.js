import { mqttClient } from '../controllers/mqttClientController';
import constant from './constant';
//control device

const controlDevice = async (username, gardenID, typeDevice, pin, value) => {
  console.log("Control device: ", username, gardenID, typeDevice, pin, value);
  mqttClient.publish(gardenID, `${constant.HEADER_CONTROL_DEVICE}:${typeDevice}:${pin}:${value}`);
}

module.exports = {
  controlDevice: controlDevice,
}