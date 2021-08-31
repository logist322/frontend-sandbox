import { Jason, RoomHandle } from "medea-jason";

export interface RootState {
  jason?: Jason;
  room?: RoomHandle;
  localStream: MediaStream;
  remoteStream: MediaStream;

  userId: string;
  roomId: string;
}
