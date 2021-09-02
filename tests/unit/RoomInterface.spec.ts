import { expect } from "chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import RoomInterface from "@/components/RoomInterface.vue";

describe("RoomInterface.vue", () => {
  const testName = "Ivan";

  const localVue = createLocalVue();

  localVue.use(Vuex);

  const store = new Vuex.Store({
    state: {
      memberId: testName,
      isVideoEnabled: false,
    },

    getters: {
      memberId(state) {
        return state.memberId;
      },

      isVideoEnabled(state) {
        return state.isVideoEnabled;
      },
    },
  });

  const wrapper = shallowMount(RoomInterface, { store, localVue });

  it("is vue instanse", () => {
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it("contains Remote video element", () => {
    expect(wrapper.find(".room__remote-video").element).to.exist;
  });

  it("contains Local video element", () => {
    expect(wrapper.find(".room__local-video").element).to.exist;
  });

  it("display partner`s name", () => {
    expect(wrapper.find(".room__name p").text()).equal(testName);
  });

  it("hide local video", () => {
    expect(wrapper.find(".room__local-video").isVisible()).to.be.false;
  });
});
