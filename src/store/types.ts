import { Jason, RoomHandle } from "medea-jason";

export interface RootState {
  jason?: Jason;
  room?: RoomHandle;
  localStream: MediaStream;
  remoteStream: MediaStream;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  memberId: string;

  userId: string;
  roomId: string;
}
