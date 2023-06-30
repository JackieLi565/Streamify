export default class User {
  private _SocketID: string;
  private _DisplayName: string;
  private _currentRoom: string;

  constructor(SocketID: string, DisplayName: string, RoomID: string) {
    this._DisplayName = DisplayName;
    this._SocketID = SocketID;
    this._currentRoom = RoomID;
  }

  get currentRoom() {
    return this._currentRoom;
  }

  get Name() {
    return this._DisplayName;
  }

  get ID() {
    return this._SocketID;
  }
}
