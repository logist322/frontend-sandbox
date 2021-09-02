/* eslint-disable @typescript-eslint/no-var-requires */
let webpackConfig = require("@vue/cli-service/webpack.config.js");

module.exports = function (config) {
  config.set({
    webpack: webpackConfig,

    basePath: "",

    frameworks: ["mocha"],

    files: ["tests/**/*.spec.ts"],

    exclude: [],

    preprocessors: {
      "**/*.spec.ts": ["webpack", "sourcemap", "coverage"],
    },

    reporters: ["spec", "coverage"],

    coverageReporter: {
      type: "text",
    },

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ["ChromeHeadless"],

    singleRun: false,

    concurrency: Infinity,
  });
};
