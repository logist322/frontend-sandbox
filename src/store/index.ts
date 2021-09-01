import init, {
  AudioTrackConstraints,
  ConnectionHandle,
  DeviceVideoTrackConstraints,
  Jason,
  JasonError,
  LocalMediaTrack,
  MediaKind,
  MediaStreamSettings,
  RemoteMediaTrack,
} from "medea-jason";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";

const SIGNAL_URL = "wss://frontend-sandbox-logist322.herokuapp.com/ws/";
const TOKEN = "helloworld";

const createURL = (
  signalURL: string,
  room: string,
  user: string,
  token: string
) => {
  return signalURL + room + "/" + user + "?token=" + token;
};

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    localStream: new MediaStream(),
    remoteStream: new MediaStream(),
    isAudioEnabled: true,
    isVideoEnabled: true,

    userId: "",
    roomId: "",
  },

  getters: {
    localStream(state) {
      return state.localStream;
    },

    remoteStream(state) {
      return state.remoteStream;
    },

    isAudioEnabled(state) {
      return state.isAudioEnabled;
    },

    isVideoEnabled(state) {
      return state.isVideoEnabled;
    },
  },

  actions: {
    setConnectionOptions({ commit }, { user, room }) {
      commit("setUserId", user);
      commit("setRoomId", room);
    },

    async initConnection({ commit, state }) {
      await init();

      commit("jasonInit");
      commit("roomInit");

      state.room?.on_failed_local_media(() => {
        return false;
      });

      state.room?.on_connection_loss(() => {
        return false;
      });

      state.room?.on_new_connection((connection: ConnectionHandle) => {
        console.log("Connected");

        connection.on_remote_track_added((track: RemoteMediaTrack) => {
          state.remoteStream.addTrack(track.get_track());
        });
      });

      const settings = new MediaStreamSettings();

      settings.device_video(new DeviceVideoTrackConstraints());
      settings.audio(new AudioTrackConstraints());

      const localTracks = await state.jason
        ?.media_manager()
        .init_local_tracks(settings)
        .catch((e: JasonError) => {
          console.log(e.name());
        });

      if (localTracks) {
        localTracks.forEach((track: LocalMediaTrack) => {
          track.kind() === MediaKind.Video
            ? state.localStream.addTrack(track.get_track())
            : false;
        });
      }

      await state.room?.set_local_media_settings(settings, false, false);

      state.room?.join(
        createURL(SIGNAL_URL, state.roomId, state.userId, TOKEN)
      );
    },

    toggleAudio({ commit, state }) {
      state.isAudioEnabled ? commit("disableAudio") : commit("enableAudio");
    },

    toggleVideo({ commit, state }) {
      state.isVideoEnabled ? commit("disableVideo") : commit("enableVideo");
    },

    killJason({ commit, state }) {
      if (state.room) {
        state.jason?.close_room(state.room);
      }

      state.jason?.dispose();

      commit("resetState");
    },
  },

  mutations: {
    setUserId(state, userId) {
      state.userId = userId;
    },

    setRoomId(state, roomId) {
      state.roomId = roomId;
    },

    jasonInit(state) {
      state.jason = new Jason();
    },

    roomInit(state) {
      state.room = state.jason?.init_room();
    },

    disableAudio(state) {
      state.room?.disable_audio().then(() => (state.isAudioEnabled = false));
    },

    enableAudio(state) {
      state.room?.enable_audio().then(() => (state.isAudioEnabled = true));
    },

    disableVideo(state) {
      state.room?.disable_video().then(() => (state.isVideoEnabled = false));
    },

    enableVideo(state) {
      state.room?.enable_video().then(() => (state.isVideoEnabled = true));
    },

    resetState(state) {
      state.localStream.getTracks().forEach((track) => {
        state.localStream.removeTrack(track);
      });
      state.remoteStream.getTracks().forEach((track) => {
        state.localStream.removeTrack(track);
      });
      state.isAudioEnabled = true;
      state.isVideoEnabled = true;

      state.userId = "";
      state.roomId = "";
    },
  },
};

export default new Vuex.Store<RootState>(store);
