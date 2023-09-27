export type Room = {
  // Sha25 hash
  roomID: string;
  // if the room is open or closed (open being true)
  status: boolean;
  // Map of all the users based on socketID and displayname
  members: {
    [userID: string]: string;
  };
  // Permissions of the room
  permissions: RoomPermissions;
  // username of the owner
  owner: string;
};

export type RoomPermissions = {
  // true being any user can change the video
  video: boolean;
  // true bring any user can start the party
  start: boolean;
};

export type Callback = {
  success: boolean;
  error: boolean;
  message?: string;
};

export type Message = {
  // sender display name
  sender: string;
  // sender web socket ID
  senderID: string;
  // message the user wants to send
  message: string;
  // Date time in milliseconds
  time: number;
};

export type CallbackFunc = (data: Callback) => void;
