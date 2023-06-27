export default class Message {
  private _message: string;
  private _sender: string;

  constructor(message: string, sender: string) {
    this._message = message;
    this._sender = sender;
  }

  get message() {
    return this._message;
  }

  get sender() {
    return this._sender;
  }
}
