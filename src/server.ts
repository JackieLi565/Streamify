import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import Storage from "../modules/storage";
import { roomRouter } from "./routers/room-router";
import User from "../modules/user";
import MessageHandler from "./socket-handlers/message-handler";
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
io.on("connection", (socket) => {
  const storage = Storage.instance;
  const userID = socket.id;

  socket.on(
    "join_room",
    ({ roomID, name }: { roomID: string; name: string }) => {
      try {
        const user = new User(userID, name, roomID);
        const room = storage.getRoom(roomID);
        room.newUser(user);
        socket.join(roomID);
        io.to(roomID).emit("receive_message", room.chat);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  );

  socket.on("leave_room", (roomID: string) => {
    try {
      const room = storage.getRoom(roomID);
      room.removeUser(socket.id);
      socket.leave(roomID);
    } catch (e: any) {
      console.log(e.message);
    }
  });

  MessageHandler(socket);
});

/** HTTP
 *
 */
app.use("/api/room", roomRouter);

server.listen(port, () => {
  Storage.instance;
  console.log("Socket Server Running");
});
