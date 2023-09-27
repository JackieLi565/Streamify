import { Room } from "../types/types";

export class ServerCache {
  private _rooms: {
    [roomID: string]: Room;
  } = {};

  constructor() {
    console.log("This is a temp server cache for prod");
  }

  add(room: Room) {
    if (!this._rooms[room.roomID]) {
      this._rooms[room.roomID] = room;
    } else {
      throw new Error("Duplicate Room Detected");
    }
  }

  delete(roomID: string) {
    delete this._rooms[roomID];
  }

  get(roomID: string): Room | undefined {
    return this._rooms[roomID];
  }
}
