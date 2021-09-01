import init, {
  ConnectionHandle,
  Jason,
  JasonError,
  LocalMediaTrack,
  MediaKind,
  RemoteMediaTrack,
} from "medea-jason";
import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { createURL, getTracksSettings } from "./jason-utils";
import { RootState } from "./types";

Vue.use(Vuex);

export enum GETTERS {
  LOCAL_STREAM = "localStream",
  REMOTE_STREAM = "remoteStream",
  IS_AUDIO_ENABLED = "isAudioEnabled",
  IS_VIDEO_ENABLED = "isVideoEnabled",
  MEMBER_ID = "memberId",
}

export enum ACTIONS {
  SET_CONNECION_OPTIONS = "setConnectionOptions",
  INIT_CONNECTION = "initConnection",
  CONFIGURE_ROOM = "configureRoom",
  TOGGLE_AUDIO = "toggleAudio",
  TOGGLE_VIDEO = "toggleVideo",
  KILL_JASON = "killJason",
}

enum MUTATIONS {
  SET_USER_ID = "setUserId",
  SET_ROOM_ID = "setRoomId",
  JASON_INIT = "jasonInit",
  ROOM_INIT = "roomInit",
  DISABLE_AUDIO = "disableAudio",
  ENABLE_AUDIO = "enableAudio",
  DISABLE_VIDEO = "disableVideo",
  ENABLE_VIDEO = "enableVideo",
  RESET_STATE = "resetState",
  SET_MEMBER_ID = "setMemberId",
}

const store: StoreOptions<RootState> = {
  state: {
    localStream: new MediaStream(),
    remoteStream: new MediaStream(),
    isAudioEnabled: true,
    isVideoEnabled: true,
    memberId: "",

    userId: "",
    roomId: "",
  },

  getters: {
    [GETTERS.MEMBER_ID](state) {
      return state.memberId;
    },

    [GETTERS.LOCAL_STREAM](state) {
      return state.localStream;
    },

    [GETTERS.REMOTE_STREAM](state) {
      return state.remoteStream;
    },

    [GETTERS.IS_AUDIO_ENABLED](state) {
      return state.isAudioEnabled;
    },

    [GETTERS.IS_VIDEO_ENABLED](state) {
      return state.isVideoEnabled;
    },
  },

  actions: {
    [ACTIONS.SET_CONNECION_OPTIONS]({ commit }, { user, room }) {
      commit(MUTATIONS.SET_USER_ID, user);
      commit(MUTATIONS.SET_ROOM_ID, room);
    },

    async [ACTIONS.INIT_CONNECTION]({ commit, dispatch }) {
      await init();

      commit(MUTATIONS.JASON_INIT);
      commit(MUTATIONS.ROOM_INIT);

      await dispatch(ACTIONS.CONFIGURE_ROOM);
    },

    async [ACTIONS.CONFIGURE_ROOM]({ commit, state }) {
      state.room?.on_failed_local_media(() => {
        console.log("Local media failed");
      });

      state.room?.on_connection_loss(() => {
        console.log("Connection lost");
      });

      state.room?.on_new_connection((connection: ConnectionHandle) => {
        console.log("Connected");

        commit(MUTATIONS.SET_MEMBER_ID, {
          gotMember: connection.get_remote_member_id(),
        });

        connection.on_remote_track_added((track: RemoteMediaTrack) => {
          state.remoteStream.addTrack(track.get_track());
        });
      });

      const settings = getTracksSettings();

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

      state.room?.join(createURL(state.roomId, state.userId));
    },

    [ACTIONS.TOGGLE_AUDIO]({ commit, state }) {
      state.isAudioEnabled
        ? commit(MUTATIONS.DISABLE_AUDIO)
        : commit(MUTATIONS.ENABLE_AUDIO);
    },

    [ACTIONS.TOGGLE_VIDEO]({ commit, state }) {
      state.isVideoEnabled
        ? commit(MUTATIONS.DISABLE_VIDEO)
        : commit(MUTATIONS.ENABLE_VIDEO);
    },

    [ACTIONS.KILL_JASON]({ commit, state }) {
      if (state.room) {
        state.jason?.close_room(state.room);
      }

      state.jason?.dispose();

      commit(MUTATIONS.RESET_STATE);
    },
  },

  mutations: {
    [MUTATIONS.SET_USER_ID](state, userId) {
      state.userId = userId;
    },

    [MUTATIONS.SET_ROOM_ID](state, roomId) {
      state.roomId = roomId;
    },

    [MUTATIONS.SET_MEMBER_ID](state, { gotMember }) {
      state.memberId = gotMember;
    },

    [MUTATIONS.JASON_INIT](state) {
      state.jason = new Jason();
    },

    [MUTATIONS.ROOM_INIT](state) {
      state.room = state.jason?.init_room();
    },

    [MUTATIONS.DISABLE_AUDIO](state) {
      state.room?.disable_audio().then(() => (state.isAudioEnabled = false));
    },

    [MUTATIONS.ENABLE_AUDIO](state) {
      state.room?.enable_audio().then(() => (state.isAudioEnabled = true));
    },

    [MUTATIONS.DISABLE_VIDEO](state) {
      state.room?.disable_video().then(() => (state.isVideoEnabled = false));
    },

    [MUTATIONS.ENABLE_VIDEO](state) {
      state.room?.enable_video().then(() => (state.isVideoEnabled = true));
    },

    [MUTATIONS.RESET_STATE](state) {
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
