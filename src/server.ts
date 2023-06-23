import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Storage from "../modules/storage/storage";
import { roomRouter } from "./routes/room";
dotenv.config();
const app = express();
const port = process.env.LOCAL_PORT;

app.use(cors());
app.use(express.json());

const socketServer = http.createServer(app);

app.use("/api/room", roomRouter);

const io = new Server(socketServer, {
  cors: {
    origin: `http://127.0.0.1:5173/`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (roomID: string) => {
    socket.join(roomID);
  });

  socket.on("send_message", (data) => {
    console.log(data);
  });
});

socketServer.listen(port, () => {
  Storage.instance;
  console.log("Socket Server Running");
});
