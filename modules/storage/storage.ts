import { Room } from "../room/room";

export default class Storage {
  private static _instance: Storage;
  private _bucket: Room[] = [];
  private _roomCount = 0;
  private _intervalID: NodeJS.Timer;

  static get instance() {
    return this._instance || (this._instance = new this());
  }

  constructor() {
    this._intervalID = setInterval(this.removeEmptyRoom, 10000);
  }

  set newRoom(room: Room) {
    this._bucket.push(room);
  }

  get roomCount() {
    return this._roomCount;
  }

  get bucket() {
    return this._bucket;
  }

  get isEmpty() {
    return this._bucket.length === 0;
  }

  removeEmptyRoom() {
    if (!this._bucket) return;
    this._bucket.filter((room) => !room.isEmpty);
  }

  stopRoomCollection() {
    try {
      clearInterval(this._intervalID);
    } catch {
      console.log("Failed to clear interval");
    }
  }

  getRoom(roomID: string): Room {
    for (const room of this._bucket) {
      if (room.roomID === roomID) {
        return room;
      }
    }
    throw new Error("Room not found");
  }
}
