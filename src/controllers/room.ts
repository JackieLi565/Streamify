import { Request, Response } from "express";
import { Room } from "../../modules/room/room";
import Storage from "../../modules/storage/storage";
const storage = Storage.instance;
/**
 *
 * @param req
 * @param res
 * @TODO
 *  generate room code
 *  create room
 *  add room to sotrage
 *  res code
 */
export async function CreateRoom(req: Request, res: Response) {
  const { method } = req;

  const code = "123";
  console.log("hit");
  try {
    if (method !== "POST") throw new Error("Inccorect HTTP Request Method");
    const room = new Room(code);
    storage.newRoom = room;
    console.log(storage.bucket);
    res.status(200).json({ code });
  } catch (e: any) {
    res.status(400).send("Error ... somewhere .. idk . where");
  }
}

export async function RoomData(req: Request, res: Response) {
  const { method, params } = req;
  console.log(params.roomID);

  try {
    if (method !== "GET") throw new Error("Inccorect HTTP Request Method");
    const roomID = params.roomID;
    const roomData = storage.getRoom(roomID);
    res.status(200).json({ roomData });
  } catch (e: any) {
    console.log(e.message);
    res.status(400).send(e.message);
  }
}
