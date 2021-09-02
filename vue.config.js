module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve("util/"),
      },
    },
  },
};
