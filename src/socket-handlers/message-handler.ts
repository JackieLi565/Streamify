import { Socket } from "socket.io";
import { io } from "../server";
import Storage from "../../modules/storage";

export default function MessageHandler(socket: Socket) {
  const storage = Storage.instance;
  const userID = socket.id;

  socket.on(
    "send_message",
    ({ roomID, message }: { roomID: string; message: string }) => {
      try {
        const room = storage.getRoom(roomID);
        room.newMessage({ userID, message });
        io.to(roomID).emit("receive_message", room.chat);
        console.log(room.chat);
      } catch (e: any) {
        console.log(e.message);
      }
    }
  );
}
