import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import MediaControls from "@/components/MediaControls.vue";

chai.use(sinonChai);

describe("RoomInterface.vue", () => {
  const localVue = createLocalVue();

  localVue.use(Vuex);

  const toggleVideo = sinon.stub();
  const toggleAudio = sinon.stub();

  const store = new Vuex.Store({
    actions: {
      toggleVideo,
      toggleAudio,
    },
  });

  const wrapper = shallowMount(MediaControls, { store, localVue });

  it("is vue instanse", () => {
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it("contains injected class", async () => {
    const testClass = "testClass";

    await wrapper.setProps({ className: testClass });

    expect(wrapper.find(".media-controls").classes(testClass)).to.true;
  });

  it("contains 3 buttons", () => {
    expect(wrapper.findAll(".media-controls__item button").length).equals(3);
  });

  it("video button call 'toggeVideo'", () => {
    wrapper.find(".media-controls__item--video button").trigger("click");

    expect(toggleVideo).called;
  });

  it("audio button call 'toggeAudio'", () => {
    wrapper.find(".media-controls__item--audio button").trigger("click");

    expect(toggleAudio).called;
  });

  it("decline button call 'decline'", () => {
    const decline = sinon.stub();

    wrapper.setMethods({ decline });
    wrapper.find(".media-controls__item--decline button").trigger("click");

    expect(decline).called;
  });
});
