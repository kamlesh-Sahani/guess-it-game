import dotenv from "dotenv"
import express from "express";
import http from "http";
import socket from "./socket.js";
dotenv.config();


const app = express();

const server = http.createServer(app);

// socket init;

const rooms = {};
socket(server,rooms);

server.listen(4500,()=>{
    console.log(`server is running on port 4500`)
})
