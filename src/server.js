import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import SocketServices from './services/socketIOService';
require("dotenv").config();

let app = express();
const server = createServer(app);
const io = new Server(server);
global._io = io;
//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

viewEngine(app);
initWebRoutes(app);

// connectDB();
global._io.on('connection',
  SocketServices.connection)

let port = process.env.PORT || 6969;

server.listen(port, () => {
  console.log(`Server running at: http://localhost:${port}`);
});
