import mqtt from 'mqtt';
import db from '../models/index.js';

const brokerUrl = 'mqtt://io.adafruit.com';
const username = 'nguyentruongthan';
const password = 'aio_vuMN25byK98NvxriL7############7hAfLe5KyK';
const topics = ['tempurature', 'humidityair', 'light', 'nutnhan1', 'nutnhan2'];

class MQTTClient {
  constructor(brokerUrl, username, password, topics) {
    password = password.replace(/#/g, '');
    this.client = mqtt.connect(brokerUrl, {
      username: username,
      password: password,
    });

    this.client.on('connect', () => {
      console.log('Connected to Adafruit IO');
      topics.forEach(topic => {
        this.client.subscribe(`${username}/feeds/${topic}`, err => {
          if (err) {
            console.log(err);
          }
        });
      });
    });

    this.client.on('message', async (topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);
      // Xử lý dữ liệu nhận được tại đây
      topic = topic.split('/')[2];
      switch (topic) {
        case 'tempurature':
          // Lưu dữ liệu vào database
          await db.Temp.create({ value: message.toString() });
          // Send data to client through socket.io
          _io.emit('temp data', message.toString());
          break;
        case 'humidityair':
          // Lưu dữ liệu vào database
          await db.HumiAir.create({ value: message.toString() });
          // Send data to client through socket.io
          _io.emit('humi data', message.toString());
          break;
        case 'light':
          // Lưu dữ liệu vào database
          await db.Light.create({ value: message.toString() });
          // Send data to client through socket.io
          _io.emit('light data', message.toString());
          break;
        case 'nutnhan1':
          // Lưu dữ liệu vào database
          break;
        case 'nutnhan2':
          // Lưu dữ liệu vào database
          break;
        default:
          break;
      }
      
     
    });

    this.client.on('close', () => {
      console.log('Connection to Adafruit IO closed');
    });
  }
}
const mqttClient = new MQTTClient(brokerUrl, username, password, topics);

module.exports = {
  mqttClient: mqttClient,
};
