import { expect } from "chai";
import { shallowMount } from "@vue/test-utils";
import LoginForm from "@/components/LoginForm.vue";

describe("LoginForm.vue", () => {
  it("renders props.msg when passed", () => {
    const wrapper = shallowMount(LoginForm);
    expect(wrapper.exists()).equal(true);
  });
});
