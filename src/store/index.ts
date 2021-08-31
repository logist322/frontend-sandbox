import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    id: 1,
  },

  actions: {
    changeId(context) {
      context.commit("incId");
    },
  },

  mutations: {
    incId(state) {
      state.id++;
    },
  },
};

export default new Vuex.Store<RootState>(store);
