/* eslint-disable @typescript-eslint/no-var-requires */
const {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} = require("@cucumber/cucumber");
const { start, close } = require("../utils/expr.js");
const webdriver = require("selenium-webdriver");
const { By } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const { expect } = require("chai");

let driver;
const caps = new webdriver.Capabilities("eager");

setDefaultTimeout(100 * 1000);

Before(() => {
  const options = new firefox.Options();
  options.setPreference("media.navigator.streams.fake", true);
  options.setPreference("media.navigator.permissions.disabled", true);

  driver = new webdriver.Builder()
    .withCapabilities(caps)
    .forBrowser("firefox")
    .setFirefoxOptions(options)
    .build();

  start();
});

Given("Opened login form", async () => {
  await driver.get("http://localhost:8000/");
});

When("input in RoomID {word}", async (word) => {
  await driver.findElement(By.css("[name='room_id']")).sendKeys(word);
});

When("input in UserID {word}", async (word) => {
  await driver.findElement(By.css("[name='user_id']")).sendKeys(word);
});

When("press {word} button", async (buttonType) => {
  let buttonClass;

  switch (buttonType) {
    case "join":
      buttonClass = ".login__button";
      break;

    case "audio":
      buttonClass = ".media-controls__item--audio button";
      break;

    case "video":
      buttonClass = ".media-controls__item--video button";
      break;

    default:
      buttonClass = ".media-controls__item--decline button";
      break;
  }
  await driver.executeScript(() => {
    document.dispatchEvent(new Event("mousemove"));
  });

  await driver.findElement(By.css(buttonClass)).click();
});

When("open new tab", async () => {
  await driver.switchTo().newWindow("tab");
  await driver.get("http://localhost:8000/");
});

When("wait {int}s", async (seconds) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, seconds * 1000);
  });
});

When("switch to the {int} tab", async (roomNumber) => {
  const handles = await driver.getAllWindowHandles();

  await driver.switchTo().window(handles[roomNumber - 1]);
});

Then("there is {word} in RoomID", async (word) => {
  const text = await driver
    .findElement(By.css("[name='room_id']"))
    .getAttribute("value");

  expect(text).equals(word);
});

Then("there is {word} in UserID", async (word) => {
  const text = await driver
    .findElement(By.css("[name='user_id']"))
    .getAttribute("value");

  expect(text).equals(word);
});

Then("redirect into room", async () => {
  const url = await driver.getCurrentUrl();

  expect(url).matches(/room$/);
});

Then("appear {word} video in {word} room", async (videoMode, roomNumber) => {
  const isLocal = videoMode === "local";

  roomNumber;

  const tracks = await driver.executeScript(function () {
    const videoElement = document.querySelector(`.room__${arguments[0]}-video`);

    return videoElement.srcObject.getTracks();
  }, videoMode);

  const existingTracks = {
    audio: false,
    video: false,
  };

  expect(tracks.length).greaterThanOrEqual(1);

  tracks.forEach((track) => {
    track.kind === "audio"
      ? (existingTracks.audio = true)
      : (existingTracks.video = true);
  });

  expect(existingTracks).to.eql(
    isLocal ? { audio: false, video: true } : { audio: true, video: true }
  );
});

Then("{word} {word} in {word} room", async (type, action, roomNumber) => {
  roomNumber;

  const tracks = await driver.executeScript(function () {
    const videoElement = document.querySelector(`.room__remote-video`);

    return videoElement.srcObject.getTracks();
  });

  console.log(tracks, action);

  const isRequiredTypeExists = tracks.some((track) => {
    console.log(action, type, track.kind === type, track.muted === false);
    return track.kind === type && track.muted === false;
  });

  expect(isRequiredTypeExists).equals(action === "appear");
});

After(() => {
  driver.quit();
  close();
});
