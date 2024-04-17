import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import SocketServices from './services/socketIOService';
import mqttClient from './controllers/mqttClientController';

require("dotenv").config();

let app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods:["GET", "POST"],
  }
});
global._io = io;
//config app
initWebRoutes(app);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);


app.use(
  cors({
    origin: "*",
    methods:["GET", "POST"],
  })
);

// connectDB();
global._io.on('connection',
  SocketServices.connection)

let port = process.env.PORT || 6969;

server.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
