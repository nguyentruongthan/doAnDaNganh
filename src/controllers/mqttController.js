import MQTTClient from '../services/mqttClientService.js';


const brokerUrl = 'mqtt://io.adafruit.com';
const username = 'nguyentruongthan';
const password = 'aio_KTXk30ZbpnaglG14bWHDPGdiWKR0';
const topics = ['tempurature', 'humidity', 'light', 'nutnhan1', 'nutnhan2'];

const mqttClient = new MQTTClient(brokerUrl, username, password, topics);

module.exports = {
  
}