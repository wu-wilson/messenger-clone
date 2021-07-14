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
app.get(`/check_usernames/:username`, (req: Request, res: Response) => {
  const CHECK_USERNAMES_QUERY = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
  database.query(
    CHECK_USERNAMES_QUERY,
    [req.params.username],
    (err, result) => {
      if (err) {
        return res.send(err);
      } else {
        return res.send(result);
      }
    }
  );
});

// HTTP POST requests
app.post("/create_account", (req: Request, res: Response) => {
  const CREATE_ACCOUNT_QUERY = `INSERT INTO users (username, pass) VALUES ("${req.body.username}", "${req.body.password}")`;
  database.query(CREATE_ACCOUNT_QUERY, (err) => {
    if (err) {
      return res.send(err);
    }
  });
});
// HTTP PUT requests
// HTTP DELETE requests

// Listen on port 4000
http.listen(process.env.PORT, () => {
  console.log(`Server is listening on ${process.env.PORT}.`);
});
