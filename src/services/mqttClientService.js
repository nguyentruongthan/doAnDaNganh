import mqtt from 'mqtt';

class MQTTClient {
  constructor(brokerUrl, username, password, topics) {
    this.client = mqtt.connect(brokerUrl, {
      username: username,
      password: password
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

    this.client.on('message', (topic, message) => {
      console.log(`Received message from ${topic}: ${message.toString()}`);
      // Xử lý dữ liệu nhận được tại đây
    });

    this.client.on('close', () => {
      console.log('Connection to Adafruit IO closed');
    });
  }
}

export default MQTTClient;
