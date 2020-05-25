const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  output: {
    filename: "[name].[contenthash].min.js",
    chunkFilename: "[id].[name].[contenthash].min.js",
    publicPath: "dist/",
  },
});
