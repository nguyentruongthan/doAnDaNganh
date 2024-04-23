import express from "express";
import homeController from "../controllers/homeController";



let router = express.Router();
let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/dash-board', homeController.getDashBoard);
  router.get('/api/devices', homeController.getDevices);
  router.post('/api/controlDevice', homeController.controlDevice);
  router.post('/api/createDevice', homeController.createDevice);
  router.post('/api/createScheduler', homeController.createScheduler);
  router.post('/devices', homeController.postDevice);
  return app.use("/", router)
}

module.exports = initWebRoutes;