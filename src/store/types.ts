import { Jason, RoomHandle } from "medea-jason";

export interface RootState {
  jason?: Jason;
  room?: RoomHandle;
  localStream: MediaStream;
  remoteStream: MediaStream;
  isInited: boolean;

  userId: string;
  roomId: string;
}
