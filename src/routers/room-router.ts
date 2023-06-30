import express from "express";
import { CreateRoom, RoomData } from "../controllers/room";

export const roomRouter = express.Router();

roomRouter.post("/create", CreateRoom);
roomRouter.get("/:roomID", RoomData);
