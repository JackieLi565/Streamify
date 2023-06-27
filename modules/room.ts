import Message from "./message";
import User from "./user";

export class Room {
  private _roomID: string;
  private _currentVideoLink = "";
  private _previousVideoLinks: string[] = [];
  private _userCount = 0;
  private _users: User[] = [];
  private _chat: Message[] = [];
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

  get chat() {
    return this._chat.map((MessageObject) => ({
      message: MessageObject.message,
      sender: MessageObject.sender,
    }));
  }

  newVideoLink(videoLink: string) {
    if (!this._currentVideoLink) {
      this._previousVideoLinks.push(this._currentVideoLink);
    }
    this._currentVideoLink = videoLink;
  }

  newMessage(message: { userID: string; message: string }) {
    try {
      this._chat.push(
        new Message(message.message, this.getUser(message.userID).Name)
      );
    } catch (e: any) {
      console.log(e.message);
    }
  }

  newUser(user: User) {
    this._userCount++;
    this._users.push(user);
  }

  removeUser(userID: string) {
    this._userCount--;
    this._users.filter((user) => user.ID !== userID);
  }

  getUser(userID: string) {
    for (const user of this._users) {
      if (user.ID === userID) return user;
    }
    throw new Error("No user found");
  }
}
