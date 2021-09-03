module.exports = {
  publicPath: "./",

  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve("util/"),
      },
    },
  },
};
