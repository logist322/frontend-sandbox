import {
  AudioTrackConstraints,
  DeviceVideoTrackConstraints,
  MediaStreamSettings,
} from "medea-jason";

export enum SERVER_OPTIONS {
  SIGNAL_URL = "wss://frontend-sandbox-logist322.herokuapp.com/ws/",
  TOKEN = "helloworld",
}

export const createURL = (room: string, user: string): string => {
  return (
    SERVER_OPTIONS.SIGNAL_URL +
    room +
    "/" +
    user +
    "?token=" +
    SERVER_OPTIONS.TOKEN
  );
};

export const getTracksSettings = (): MediaStreamSettings => {
  const settings = new MediaStreamSettings();

  settings.device_video(new DeviceVideoTrackConstraints());
  settings.audio(new AudioTrackConstraints());

  return settings;
};
