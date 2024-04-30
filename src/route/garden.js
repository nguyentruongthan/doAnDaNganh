import gardenController from '../controllers/gardenController.js';
import express from "express";

const gardenRouter = express.Router();
gardenRouter.post('/', gardenController.addGarden);
// gardenRouter.post('/login', gardenController.loginUser);
export default gardenRouter;