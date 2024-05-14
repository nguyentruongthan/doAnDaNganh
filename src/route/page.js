import express from "express";
import homeController from "../controllers/pageController";
const pageRouter = express.Router();

pageRouter.get('/dashBoard', homeController.getDashBoard);
pageRouter.get('/nhietDo', homeController.getNhietDo);
pageRouter.get('/doAmKhongKhi', homeController.getDoAmKhongKhi);
pageRouter.get('/doAmDat', homeController.getDoAmDat);
pageRouter.get('/anhSang', homeController.getAnhSang);
pageRouter.get('/lapLich', homeController.getLapLich);
pageRouter.get('/caiDatThoiGian', homeController.getCaiDatThoiGian);
pageRouter.get('/chinhSuaThoiGian/:schedulerID', homeController.getChinhSuaThoiGian);
pageRouter.get('/dangNhap', homeController.getDangNhap);
pageRouter.get('/nguongCamBien', homeController.getNguongCamBien);
pageRouter.get('/caiDatNguongCamBien', homeController.getCaiDatNguongCamBien);
pageRouter.get('/chinhSuaNguongCamBien/:outputRuleID', homeController.getChinhSuaNguongCamBien);

module.exports = pageRouter;