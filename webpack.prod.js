const webpack = require("webpack");
const common = require("./webpack.common");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizer = require("optimize-css-assets-webpack-plugin");
const AssetsPlugin = require("assets-webpack-plugin");

// const PurgeCssPlugin = require("purgecss-webpack-plugin");
// const whitelister = require("purgecss-whitelister");
// const glob = require("glob-all");
const path = require("path");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  entry: {
    αbootstrapToc: "./node_modules/bootstrap-toc/dist/bootstrap-toc.js",
  },
  output: {
    filename: "[name].[contenthash].min.js",
    chunkFilename: "[id].[name].[contenthash].min.js",
    publicPath: "/dist/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ttf|otf)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].min.css",
      chunkFilename: "[name].[contenthash].min.css",
      sourceMap: true,
    }),
    new webpack.HashedModuleIdsPlugin(),
    // new AssetsPlugin({
    //   filename: "assets_toc.json",
    //   path: path.resolve(__dirname, "data/panaetius-theme"),
    //   prettyPrint: true,
    //   fullPath: false,
    // }),
    // new PurgeCssPlugin({
    //   paths: glob.sync([path.join(__dirname, "layouts") + "/**/*.html"], {
    //     nodir: true,
    //   }),
    //   whitelistPatterns: [/zoom/, /aos/, /table/, /thead/, /blockquote/, /img-fluid/, /code/, /highlight/],
    //   whitelistPatternsChildren: [/code/, /highlight/],
    //   whitelist: [
    //     whitelister("node_modules/aos/dist/aos.css"),
    //     whitelister("node_modules/bootstrap/dist/css/bootstrap.css")
    //   ],
    // }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false }),
      new CssMinimizer(),
    ],
  },
});
