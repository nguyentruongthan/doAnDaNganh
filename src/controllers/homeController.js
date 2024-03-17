import Service from '../services/service.js'; 
import MQTTClient from '../services/mqttClientService.js';
import server from '../server.js';

let getHomePage = async (req, res) => {
  try {
    return res.render('homePage.ejs');
  } catch (e) {
    console.log(e);
  }
}

let getDashBoard = async (req, res) => {
  let data = await Service.getSensorData();
  return res.render('dashBoard.ejs',
    { data: data }
  );
}

module.exports = {
  getHomePage: getHomePage,
  getDashBoard: getDashBoard,
}