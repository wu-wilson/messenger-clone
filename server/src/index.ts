import express, { Request, Response } from "express";
import cors from "cors";
import { json as bodyParser } from "body-parser";
import mysql2 from "mysql2";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

// Set up Server
const app = express();
app.use(cors());
app.use(bodyParser());

const http = createServer(app);
const io = new Server(http, {
  cors: {
    origin: [`${process.env.DOMAIN}`],
  },
});

// After connection is established...
io.on("connection", (socket: Socket) => {});

// Create database connection
const database = mysql2.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

// Test database connection
database.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database.");
  }
});

// HTTP GET requests
// HTTP POST requests
// HTTP PUT requests
// HTTP DELETE requests

// Listen on port 4000
http.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}.`);
});
