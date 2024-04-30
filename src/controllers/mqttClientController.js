import mqtt from 'mqtt';
import constant from '../services/constant';
import eventService from '../services/eventService';
import userServices from '../services/userServices';
const brokerUrl = 'mqtt://mqtt.ohstem.vn';


class MQTTClient {
  publish(topic, message) {
    if (!this.client || !this.client.connected) {
      console.error("Client is not initialized or not connected.");
      return;
    }
    // console.log("Publishing to mqtt");
    this.client.publish(`nguyentruongthan/feeds/${topic}`, message);
  }

  constructor(brokerUrl) {
    console.log('init MQTT');
    this.client = mqtt.connect(brokerUrl, {
      username: 'nguyentruongthan',
      password: '',
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      //subscribe to topic
      this.client.subscribe(`nguyentruongthan/feeds/+`, (err) => {
        if (err) {
          console.log(err);
        }
      })
    });

    this.client.on('message', async (topic, message) => {
      //topic format is: {nguyentruongthan}/feeds/{username}
      let username = topic.split('/')[2];
      if (username === "V1" || username === "V2") {
        return;
      }

      message = message.toString();
      console.log(`Received message from ${topic}: ${message.toString()}`);
      // Xử lý dữ liệu nhận được tại đây
      let splitMessage = message.toString().split(':');

      const header = splitMessage[0];
      if (header === constant.HEADER_SENSOR_VALUE.toString()) {
        //message format: {HEADER_SENSOR_VALUE}:{typeDevice}:{pin}:{value}
        _io.emit(`${username} ${constant.HEADER_SENSOR_VALUE}`, message);
      } else if (header === constant.HEADER_ACK.toString()) {
        eventService.mqttEvent.emit(`${message}`, "");
      }
      //  handle header:
      //    TODO
      //    HEADER_SENSOR_VALUE: receive data from sensor
      //      check data valid then call model to add to database and call controller socketIO to view
      //    HEADER_GET_DEVICE: receive request from IoTGateway, it request list COM Port and device
      //      TODO


      //-----------------remove code below after---------------
      // topic = topic.split('/')[2];
      
      // if (topic === 'farm1') {
      //   let splitMessage = message.toString().split(':');
      //   let header = splitMessage[0];
      //   switch (header) {
      //     case constant.HEADER_SENSOR_VALUE.toString(): //recv sensor data
      //       if (splitMessage.length < 4) {
      //         console.log("Recv sonsor data error");
      //         return;
      //       }
      //       let typeSensor = splitMessage[1]
      //       let pin = splitMessage[2]
      //       let value = splitMessage.slice(3)
            
      //       _io.emit(`data ${pin}`, value.join(':'));
      //       _io.emit(`data`, value.join(':'));
      //       break;
      //     case constant.HEADER_GET_DEVICE.toString(): //req for get infor of device
      //       if(splitMessage.length != 1){
      //         console.log("Recv get device error");
      //         return;
      //       }
      //       fs.readFile('./src/jsonFile/devices.json', 'utf-8', (err, data) => {
      //         if (err) {
      //           console.error('Error reading file:', err);
      //           return;
      //         }
      //         try {
      //           // Parse JSON string to object
      //           const jsonData = JSON.parse(data);
      //           if (jsonData.devices && Object.keys(jsonData.devices).length !== 0) {
      //             JSON.stringify(jsonData.devices)
      //             for (let device of jsonData.devices) {
      //               let pin = device.pin;
      //               let typeDevice = device.typeDevice;
      //               this.publish("nguyentruongthan/feeds/farm1",
      //                 `${constant.HEADER_CREATE}:${typeDevice}:${pin}`);
      //             }
      //           } else {
      //             this.publish("nguyentruongthan/feeds/farm1", "4:0");
      //           }
      //         } catch (error) {
      //           if (error instanceof SyntaxError && error.message === 'Unexpected end of JSON input') {
      //             this.publish("nguyentruongthan/feeds/farm1", "4:0");
      //           } else {
      //             console.error('Error parsing JSON data:', error);
      //             this.publish("nguyentruongthan/feeds/farm1", "4:0");
      //           }
      //         }
      //       })
      //       break;
      //   }
        
      // }
      //-----------------------------------------------------------
    });

    this.client.on('close', () => {
      console.log('Connection to MQTT Broker closed');
    });
  }
}
const mqttClient = new MQTTClient(brokerUrl);
module.exports = {
  mqttClient,
};
