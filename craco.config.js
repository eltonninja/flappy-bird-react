const webpack = require("webpack");
const webpackResolve = require("craco-webpack-resolve");

module.exports = {
  plugins: [
    {
      plugin: webpackResolve,
      options: {
        resolve: {
          fallback: {
            buffer: require.resolve("buffer"),
          },
        },
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new webpack.ProvidePlugin({
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
  },
};
