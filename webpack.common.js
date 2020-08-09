const webpack = require("webpack");
const path = require("path");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: { main: path.resolve(__dirname, "src/main.js") },
  output: {
    path: path.resolve(__dirname, "static/dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        // Exposes jQuery for use outside Webpack build
        test: require.resolve("jquery"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["$", "jQuery"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["static/dist/*"],
    }),
    new AssetsPlugin({
      filename: "assets.json",
      path: path.resolve(__dirname, "data/panaetius-theme"),
      prettyPrint: true,
      fullPath: false,
    }),
    new webpack.ProvidePlugin({
      // Provides jQuery for other JS bundled with Webpack
      $: "jquery",
      jquery: "jquery",
      // "window.$": "jquery",
      // "window.jQuery": "jquery",
    }),
  ],
};
