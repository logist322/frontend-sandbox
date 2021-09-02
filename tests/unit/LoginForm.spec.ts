import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";

chai.use(sinonChai);

describe("LoginForm.vue", () => {
  const wrapper = shallowMount(LoginForm);

  it("is vue instanse", () => {
    expect(wrapper.isVueInstance()).to.be.true;
  });

  it("contains Room ID input", () => {
    expect(wrapper.find("[name='room_id']").element).to.exist;
  });

  it("contains User ID input", () => {
    expect(wrapper.find("[name='user_id']").element).to.exist;
  });

  it("contains Join button", () => {
    expect(wrapper.find(".login__button").element).to.exist;
  });

  it("click button triggers 'enterRoom'", () => {
    const clickStub = sinon.stub();

    wrapper.setMethods({ enterRoom: clickStub });
    wrapper.find(".login__button").trigger("click");

    expect(clickStub).called;
  });
});
