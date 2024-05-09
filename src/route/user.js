import userController from '../controllers/userController.js';
import express from "express";

const userRouter = express.Router();
userRouter.post('/', userController.addUser);
userRouter.post('/login', userController.loginUser);
userRouter.get('/isAuto/:username', userController.getIsAuto);
userRouter.put('/isAuto/:username', userController.updateIsAuto);
export default userRouter;