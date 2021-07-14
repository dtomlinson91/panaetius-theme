// const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
// const CssMinimizer = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const PurgeCssPlugin = require("purgecss-webpack-plugin");
// const whitelister = require("purgecss-whitelister");
// const glob = require("glob-all");
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
