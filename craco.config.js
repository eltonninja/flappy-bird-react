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
        new webpack.DefinePlugin({
          "process.env.REACT_APP_SERVER_HOST": JSON.stringify(
            process.env.REACT_APP_SERVER_HOST
          ),
          "process.env.REACT_APP_API_URL": JSON.stringify(
            process.env.REACT_APP_API_URL
          ),
          "process.env.REACT_APP_PRIZE_WALLET": JSON.stringify(
            process.env.REACT_APP_PRIZE_WALLET
          ),
          "process.env.REACT_APP_PURCHASE_AMOUNT": JSON.stringify(
            process.env.REACT_APP_PURCHASE_AMOUNT
          ),
        }),
      ],
    },
  },
};
