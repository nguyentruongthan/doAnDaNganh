import express from "express";
import homeController from "../controllers/homeController";



let router = express.Router();
let initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/dashBoard', homeController.getDashBoard);
  router.get('/api/devices', homeController.getDevices);
  router.post('/api/controlDevice', homeController.controlDevice);
  router.post('/api/createDevice', homeController.createDevice);
  router.post('/api/createScheduler', homeController.createScheduler);
  router.get('/api/getScheduler', homeController.getScheduler);
  router.post('/devices', homeController.postDevice);
  router.get('/nhietDo', homeController.getNhietDo);
  router.get('/doAmKhongKhi', homeController.getDoAmKhongKhi);
  router.get('/doAmDat', homeController.getDoAmDat);
  router.get('/anhSang', homeController.getAnhSang);
  router.get('/lapLich', homeController.getLapLich);
  router.get('/caiDatThoiGian', homeController.getCaiDatThoiGian);
  router.get('/chinhSuaThoiGian/:schedulerID', homeController.getChinhSuaThoiGian);
  router.get('/dangNhap', homeController.getDangNhap);
  return app.use("/", router)
}

module.exports = initWebRoutes;