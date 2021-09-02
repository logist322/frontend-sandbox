import { createURL, SERVER_OPTIONS } from "@/store/jason-utils";
import { expect } from "chai";

describe("jason-utils", () => {
  it("returns correct URL", () => {
    const testRoom = "room";
    const testUser = "user";

    const correctURL = SERVER_OPTIONS.SIGNAL_URL + testRoom + "/" + testUser + "?token=" + SERVER_OPTIONS.TOKEN;

    expect(createURL(testRoom, testUser)).equal(correctURL);
  });
});
