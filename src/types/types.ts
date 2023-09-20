export type Room = {
  // Sha25 hash
  roomID: string;
  // if the room is open or closed (open being true)
  status: boolean;
  // Array of users
  members: string[];
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
