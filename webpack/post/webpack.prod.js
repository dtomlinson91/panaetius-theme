const common = require("../webpack.common");
const merge = require("webpack-merge");
const AssetsPlugin = require("assets-webpack-plugin");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  entry: {
    mainPosts: path.resolve(__dirname, "../../src/mainPosts.js"),
    αbootstrapToc: path.resolve(
      __dirname,
      "../../node_modules/bootstrap-toc/dist/bootstrap-toc.js"
    ),
  },
  plugins: [
    new AssetsPlugin({
      filename: "assets_toc.json",
      path: path.resolve(__dirname, "../../data/panaetius-theme"),
      prettyPrint: true,
      fullPath: false,
    }),
  ],
});
