import mqtt from 'mqtt';

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

  constructor(brokerUrl, mqttName, password) {
    console.log('init MQTT');
    this.client = mqtt.connect(brokerUrl, {
      username: mqttName,
      password: password,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT Broker');
      //subscribe to topic

      //fetch username
      //EX: data base has 2 user called 'qwe' and 'asd'
      //user 'qwe' has a farm called 'farm1' 
      //user 'asd' has a farm called 'farm2'
      let topics = [
        {
          username: 'qwe',
          gardens: ['farm1']
        },
        {
          username: 'asd',
          gardens: ['farm2']  
        }
      ];
      

      //fetch gardenID
      //format of topic is {mqttName}/feeds/{gardenID}

      topics.forEach(topic => {
        let gardens = topic.gardens
        gardens.forEach((garden) => {
          this.client.subscribe(`${mqttName}/feeds/${garden}`, (err) => {
            if (err) {
              console.log(err);
            }
          })
        })
      });
    });

    this.client.on('message', async (topic, message) => {
      //topic format is: {mqttName}/feeds/{gardenID}
      console.log(`Received message from ${topic}: ${message.toString()}`);
      // Xử lý dữ liệu nhận được tại đây
      let splitMessage = topic.split('/');
      // get gardenID
      let gardenID = splitMessage[2];

      
      // condition for username and gardenID
      //  message format: {header}:{data}
      _io.emit(`${gardenID}`, message);
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
const mqttClient = new MQTTClient(brokerUrl, "nguyentruongthan", 'xxxxx');
module.exports = {
  mqttClient,
};
