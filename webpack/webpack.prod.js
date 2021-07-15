const common = require("./webpack.common");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  entry: {
    mainGlobal: path.resolve(__dirname, "../src/mainGlobal.js"),
  },
  module: {
    rules: [
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
      {
        test: require.resolve("bootstrap"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["bootstrap"],
            },
          },
        ],
      },
      {
        test: require.resolve("lunr"),
        use: [
          {
            loader: "expose-loader",
            options: {
              exposes: ["lunr"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new AssetsPlugin({
      filename: "assets.json",
      path: path.resolve(__dirname, "../data/panaetius-theme"),
      prettyPrint: true,
      fullPath: false,
    }),
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["../static/dist/*", "../data/panaetius-theme/*.json"],
    }),
  ],
});
