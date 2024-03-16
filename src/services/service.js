
import db from '../models/index.js';

let getSensorData = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let temp = await db.Temp.findOne({
        order: [['createdAt', 'DESC']]
      });
      let humiAir = await db.HumiAir.findOne({
        order: [['createdAt', 'DESC']]
      });
      let light = await db.Light.findOne({
        order: [['createdAt', 'DESC']]
      });
      resolve({
        temp: temp,
        humiAir: humiAir,
        light: light,
      });
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
  getSensorData: getSensorData,
}