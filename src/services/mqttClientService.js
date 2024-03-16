import mqtt from 'mqtt';
import db from '../models/index.js';

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
          break;
        case 'humidity':
          await db.Humi.create({ value: message.toString() });
          // Lưu dữ liệu vào database
          break;
        case 'light':
          await db.Light.create({ value: message.toString() });
          // Lưu dữ liệu vào database
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

export default MQTTClient;
