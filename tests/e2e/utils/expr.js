/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-var-requires */
const express = require("express");
const path = require("path");

const PORT = 8000;

const app = express();

app.use(express.static(path.resolve(path.resolve(), "dist")));

let server;

const start = () => {
  server = app.listen(PORT);
};

const close = () => {
  server.close();
};

module.exports = {
  start,
  close,
};
