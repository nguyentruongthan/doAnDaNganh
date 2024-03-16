import Service from '../services/service.js'; 
import MQTTClient from '../services/mqttClientService.js';


const brokerUrl = 'mqtt://io.adafruit.com';
const username = 'nguyentruongthan';
const password = 'aio_vuMN25byK98NvxriL7############7hAfLe5KyK';
const topics = ['tempurature', 'humidity', 'light', 'nutnhan1', 'nutnhan2'];

const mqttClient = new MQTTClient(brokerUrl, username, password, topics);

let getHomePage = async (req, res) => {
  try {
    return res.render('homePage.ejs', {
    });
  } catch (e) {
    console.log(e);
  }
}

let getDashBoard = async (req, res) => {
  let data = await Service.getSensorData();
  return res.render('dashBoard.ejs', {
    data: data,
  });
}

module.exports = {
  getHomePage: getHomePage,
  getDashBoard: getDashBoard,
}