import express, { Request } from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import client from "./lib/redis";
dotenv.config();
const app = express();
const port = process.env.LOCAL_PORT;

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: `http://127.0.0.1:5173/`,
    methods: ["GET", "POST"],
  },
});

/** WebSocket
 * Handle Chat comms
 * Handle Video PLayback
 */

app.get("/", async function (req, res) {
  await client.set("check", "bar");
  const value = await client.get("check");
  console.log(value);

  res.send("OK");
});

server.listen(port, () => {
  console.log("Socket Server Running");
});
