import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
// import client from "./lib/redis"; // redis disabled for production use as a lack of auth on the app
import {
  Callback,
  CallbackFunc,
  Message,
  Room,
  RoomPermissions,
} from "./types/types";
import generateRandomHash from "./utils/generateHash/generateHash";
import { ServerCache } from "./db/cache";
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

const sc = new ServerCache();

io.on("connection", (socket) => {
  const clientID = socket.id;
  /**
   *
   * @param { string } roomID
   * @param { boolean } state true means the video should be playing, false means the video should paused
   */
  async function Media(roomID: string, state: boolean) {
    socket.to(roomID).emit("media");
  }
  socket.on("media", Media);

  /**
   *
   * @param { string } roomNumber
   * @param { Message } message // only pass one message in at a time, DO NOT PASS IN AN ARRAY OF MESSAGES
   * @param { CallbackFunc } callback
   */
  async function Chat(
    roomID: string,
    message: Message,
    callback: CallbackFunc
  ) {
    const room = sc.get(roomID);
    try {
      if (!room) throw new Error(`Room ${roomID} does not exists`);
      socket.to(roomID).emit("chat", message);
    } catch (e: any) {
      const responseData: Callback = {
        success: false,
        error: true,
        message: e.message,
      };
      callback(responseData);
    }
  }
  socket.on("chat", Chat);

  /**
   * @param { string } roomNumber generated by sha25 hash
   * @param { string } userDisplayName
   * @param { CallbackFunc } callback returns the state if the user is able to join the server or not.
   * When a user requests to join a room, redis client will chekc if the room exists in the cache
   */
  async function JoinRoom(
    roomNumber: string,
    userDisplayName: string,
    callback: CallbackFunc
  ) {
    const room = sc.get(roomNumber);

    try {
      if (!room) throw new Error(`Room ${roomNumber} does not exists`);

      if (!room.status)
        throw new Error(`Room ${roomNumber} has already started`);

      if (room.members[clientID]) throw new Error("Duplicate User Attempt");

      room.members[clientID] = userDisplayName;
      socket.join(room.roomID);

      const responseData: Callback = {
        success: true,
        error: false,
        message: `Successfully Joined Room ${room.roomID}`,
      };

      callback(responseData);
    } catch (e: any) {
      const responseData: Callback = {
        success: false,
        error: true,
        message: e.message,
      };
      callback(responseData);
    }
  }
  socket.on("join-room", JoinRoom);

  /**
   *
   * @param { string } roomID
   * @param { CallbackFunc } callback
   */
  async function LeaveRoom(roomID: string, callback: CallbackFunc) {
    const room = sc.get(roomID);

    try {
      if (!room) throw new Error(`Room ${roomID} does not exists`);

      if (!room.status) throw new Error(`Room ${roomID} has already started`);

      delete room.members[clientID];

      socket.leave(room.roomID);

      const responseData: Callback = {
        success: true,
        error: false,
        message: `Successfully Left Room ${room.roomID}`,
      };

      callback(responseData);
    } catch (e: any) {
      const responseData: Callback = {
        success: false,
        error: true,
        message: e.message,
      };
      callback(responseData);
    }
  }
  socket.on("leave-room", LeaveRoom);

  /**
   * @param { String } userDisplayName
   * @param { RoomPermissions } permissions
   * @param { CallbackFunc } callback returns the state if the user is able to join the server or not.
   */
  async function CreateRoom(
    userDisplayName: string,
    permissions: RoomPermissions,
    callback: CallbackFunc
  ) {
    const newRoom: Room = {
      roomID: generateRandomHash(8),
      status: false,
      members: {
        clientID: userDisplayName,
      },
      permissions,
      owner: clientID,
    };

    try {
      sc.add(newRoom);

      const responseData: Callback = {
        success: true,
        error: false,
        message: `Successfully Created Room ${newRoom.roomID}`,
      };

      callback(responseData);
    } catch {
      const responseData: Callback = {
        success: false,
        error: true,
        message: `Failed to Created Room ${newRoom.roomID}`,
      };

      callback(responseData);
    }
  }
  socket.on("create-room", CreateRoom);
});

server.listen(port, () => {
  console.log("Socket Server Running");
});
