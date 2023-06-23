export class Room {
  private _roomID: string;
  private _currentVideoLink = "";
  private _previousVideoLinks: string[] = [];
  private _userCount = 0;
  private _users: string[] = [];
  private _cat: number;

  constructor(roomID: string) {
    this._roomID = roomID;
    this._currentVideoLink;
    this._cat = new Date().getTime();
  }

  get roomID() {
    return this._roomID;
  }

  get currentVideoLink() {
    return this._currentVideoLink;
  }

  get userCount() {
    return this._userCount;
  }

  get creationTime() {
    return this._cat;
  }

  get isEmpty() {
    return this._userCount === 0;
  }

  set videoLink(videoLink: string) {
    if (!this._currentVideoLink) {
      this._previousVideoLinks.push(this._currentVideoLink);
    }
    this._currentVideoLink = videoLink;
  }

  set userConnected(userDisplayName: string) {
    this._userCount++;
    this._users.push(userDisplayName);
  }

  set userDisconnected(userDisplayName: string) {
    this._userCount--;
    this._users.filter((user) => user !== userDisplayName);
  }
}
